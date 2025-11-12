"use client";

import ProfileAvatar from "./ProfileAvatar";

interface UserAvatarProps {
  user?: {
    firstName?: string;
    name?: string;
    profilePicture?: string | null;
  };
  size?: "sm" | "md" | "lg" | "xl";
  showFallbackText?: boolean;
  uploading?: boolean;
}

export default function UserAvatar({
  user,
  size = "sm",
  showFallbackText = true,
  uploading = false,
}: UserAvatarProps) {
  if (!user) {
    return (
      <ProfileAvatar
        alt="Guest"
        fallbackText={showFallbackText ? "G" : ""}
        size={size}
        uploading={uploading}
      />
    );
  }

  const name = user.name || user.firstName || "User";
  const imageSrc = user.profilePicture || null;

  return (
    <ProfileAvatar
      uploading={uploading}
      src={imageSrc}
      alt={name}
      fallbackText={showFallbackText ? name.charAt(0).toUpperCase() : ""}
      size={size}
    />
  );
}
