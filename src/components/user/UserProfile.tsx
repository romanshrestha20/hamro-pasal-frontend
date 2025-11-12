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
  children?: ReactNode; // Optional right-side content slot
  className?: string; // Wrapper class customization
  leftActions?: ReactNode; // Content under avatar/upload (e.g., Remove Photo)
  rightTitle?: string; // Optional right column title
  rightSubtitle?: string; // Optional right column subtitle
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
  const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
  const router = useRouter();
  // Handle user form submission
  const handleSubmit = async (formData: Partial<User>) => {
    const toastId = toast.loading("Saving changes...");
    try {
      const result = await updateUser(user.id, formData, {
        onSuccess: () => {
          router.push("/profile");
        },
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
  const { previewImage, uploading, error, handleFileSelected } =
    useProfileImage({
      onSuccess: onProfileUpdated,
    });

  const displayImageSrc = previewImage || user?.profilePicture;
  const displayName =
    `${user?.firstName ?? "User"} ${user?.lastName ?? ""}`.trim();

  return (
    <div className={"mb-6" + (className ? ` ${className}` : "")}>
      <div className="grid items-start gap-6 md:grid-cols-[auto,1fr]">
        {/* Left: Avatar + Upload */}
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

        {/* Right: Details (or custom content) */}
        <div>
          {(rightTitle || rightSubtitle) && (
            <div className="mb-4">
              {rightTitle && (
                <h2 className="text-lg font-semibold text-gray-900">
                  {rightTitle}
                </h2>
              )}
              {rightSubtitle && (
                <p className="text-sm text-gray-600">{rightSubtitle}</p>
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

              <div className="mt-3">
                <button
                  type="button"
                  className="px-3 py-1 mr-2 text-sm text-gray-700 bg-gray-100 rounded"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {children ?? <ProfileDetails user={user} />}
              {editable && (
                <div className="flex gap-4 pt-6 mt-8 border-t border-gray-200">
                  <Button
                    label="Edit"
                    type="button"
                    className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    label="Sign Out"
                    variant="danger"
                    onClick={() => router.push("/logout")}
                    className="px-6 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                  />
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
