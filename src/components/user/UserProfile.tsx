"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/lib/types";
import {
  ProfileAvatar,
  ProfileDetails,
  ProfileImageUpload,
} from "@/components/user";
import UserForm from "@/components/forms/UserForm";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useProfileImage } from "@/hooks/userProfileImage";
import { useRouter } from "next/navigation";
import { Button } from "../ui";

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
  const { updateUser, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

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

  /* ----------------------------------------------------
     Image Upload Hook
  ---------------------------------------------------- */
  const { previewImage, uploading, error, handleFileSelected } =
    useProfileImage({ onSuccess: onProfileUpdated });

  const displayImageSrc = previewImage || user.profilePicture;
  const displayName = `${user.firstName} ${user.lastName ?? ""}`.trim();

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
            user={user}
            src={displayImageSrc}
            alt={displayName}
            size={avatarSize}
            uploading={uploading}
          />

          {editable && (
            <ProfileImageUpload
              uploading={uploading}
              error={error}
              onFileSelect={handleFileSelected}
            />
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
                loading={uploading}
                onSubmit={handleSubmit}
              />

              <div className="flex gap-3 mt-3">
                {/* Cancel */}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Profile Details */}
              {children ?? <ProfileDetails user={user} />}

              {/* Edit / Logout Buttons */}
              {editable && (
                <div className="flex gap-4 pt-6 mt-8 border-t border-border">
                  <Button onClick={() => setIsEditing(true)}>Edit</Button>

                  <Button onClick={() => router.push("/logout")}>
                    Sign Out
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
