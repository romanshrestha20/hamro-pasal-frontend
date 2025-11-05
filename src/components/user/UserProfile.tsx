"use client";
import type { User } from "@/lib/types";
import {
  ProfileAvatar,
  ProfileDetails,
  ProfileImageUpload,
} from "@/components/user";
import { useProfileImage } from "@/hooks/userProfileImage";

interface UserProfileProps {
  user: User;
  editable?: boolean;
  onProfileUpdated?: (newUrl: string) => void;
  avatarSize?: "sm" | "md" | "lg" | "xl";
}

const UserProfile = ({
  user,
  editable = true,
  onProfileUpdated,
  avatarSize = "md",
}: UserProfileProps) => {
  const { previewImage, uploading, error, handleFileSelected } =
    useProfileImage({
      onSuccess: onProfileUpdated,
    });

  const displayImageSrc = previewImage || user?.profilePicture;
  const displayName = user?.firstName || "User";

  return (
    <div className="space-y-4 mb-6">
      {/* Profile Picture Section */}
      <div className="flex items-center gap-4">
        <ProfileAvatar
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
      </div>

      {/* User Details Section */}
      <ProfileDetails user={user} />
    </div>
  );
};

export default UserProfile;
