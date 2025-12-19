"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/lib/types";
import { ProfileAvatar, ProfileDetails } from "@/components/user";
import ProfileImageDialog from "@/components/user/ProfileImageDialog";
import UserForm from "@/components/forms/UserForm";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useProfileImage } from "@/hooks/userProfileImage";
import { useRouter } from "next/navigation";
import { Button } from "../ui";
import { ChangePasswordDialog } from "../auth/ChangePasswordDialog";
import { div } from "framer-motion/m";

interface UserProfileProps {
  user: User;
  editable?: boolean;
  onProfileUpdated?: (newUrl: string) => void;
  avatarSize?: "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
  className?: string;
  leftActions?: ReactNode;
  rightTitle?: string;
  rightSubtitle?: string;
}

const UserProfile = ({
  user,
  editable = true,
  onProfileUpdated,
  avatarSize = "md",
  children,
  className,
  leftActions,
  rightTitle,
  rightSubtitle,
}: UserProfileProps) => {
  const { updateUser, refreshUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  /* ----------------------------------------------------
     Image Upload Hook
  ---------------------------------------------------- */
  const { previewImage, uploading, uploadFile, removeProfileImage } =
    useProfileImage({
      onSuccess: async (url) => {
        onProfileUpdated?.(url);
        await refreshUser(); // Refresh user data to get new Cloudinary URL
      },
      onRemove: async () => {
        await refreshUser();
      },
    });
  const [openImageDialog, setOpenImageDialog] = useState(false);

  const displayImageSrc = previewImage || user.profilePicture;
  const displayName = `${user.firstName} ${user.lastName ?? ""}`.trim();

  /* ----------------------------------------------------
     Save Profile
  ---------------------------------------------------- */
  const handleSubmit = async (formData: Partial<User>) => {
    const toastId = toast.loading("Saving changes...");

    try {
      const result = await updateUser(user.id, formData, {
        onSuccess: () => router.push("/profile"),
      });

      if (result.success) {
        toast.success("Profile updated", { id: toastId });
        setIsEditing(false);
        await refreshUser();
      } else {
        toast.error(result.error || "Failed to update profile", {
          id: toastId,
        });
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("An error occurred", { id: toastId });
    }
  };
  const handleDeleteUserProfileImage = async () => {
    await removeProfileImage();
  };
  /* ----------------------------------------------------
     UI
  ---------------------------------------------------- */
  return (
    <div className={"mb-6" + (className ? ` ${className}` : "")}>
      <div className="grid items-start gap-6 md:grid-cols-[auto,1fr]">
        {/* --------------------------------------
            LEFT — Avatar + Upload
        --------------------------------------- */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          <ProfileAvatar
            src={displayImageSrc}
            alt={displayName}
            size={avatarSize}
            uploading={uploading}
          />

          {editable && (
            <div className="flex items-center mt-2">
              <Button
                variant="outline"
                onClick={() => setOpenImageDialog(true)}
              >
                Change Photo
              </Button>

              <Button
                variant="secondary"
                className="ml-2"
                disabled={!user.profilePicture && !previewImage}
                onClick={handleDeleteUserProfileImage}
              >
                Remove Photo
              </Button>
            </div>
          )}

          {leftActions && <div className="w-full">{leftActions}</div>}
        </div>

        {/* --------------------------------------
            RIGHT — Details / Edit Form
        --------------------------------------- */}
        <div>
          {(rightTitle || rightSubtitle) && (
            <div className="mb-4">
              {rightTitle && (
                <h2 className="text-lg font-semibold text-foreground">
                  {rightTitle}
                </h2>
              )}
              {rightSubtitle && (
                <p className="text-sm text-muted-foreground">{rightSubtitle}</p>
              )}
            </div>
          )}

          {isEditing ? (
            <div>
              <UserForm
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                address={user.address}
                phone={user.phone}
                loading={uploading}
                onSubmit={handleSubmit}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <>
              {/* Profile Details */}
              {children ?? <ProfileDetails user={user} />}

              {/* Edit / Logout Buttons */}
              {editable && (
                <div className="flex gap-4 pt-6 mt-8 border-t border-border">
                  <ChangePasswordDialog />

                  <Button onClick={() => setIsEditing(true)}>Edit</Button>

                  <Button
                    onClick={() => logout()}
                    variant="outline"
                    className="text-error"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ProfileImageDialog
        open={openImageDialog}
        onClose={() => setOpenImageDialog(false)}
        onUpload={async (file) => {
          await uploadFile(file);
          await refreshUser();
          setOpenImageDialog(false);
        }}
      />
    </div>
  );
};

export default UserProfile;
