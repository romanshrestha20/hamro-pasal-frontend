"use client";

import ProfileAvatar from "./ProfileAvatar";

interface UserAvatarProps {
  user?: {
    firstName?: string;
    name?: string;
    image?: string | null;
    avatarUrl?: string | null;
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
  const imageSrc = user.image || user.avatarUrl || null;

  return (
    <ProfileAvatar
      src={imageSrc}
      alt={name}
      fallbackText={showFallbackText ? name.charAt(0).toUpperCase() : ""}
      size={size}
    />
  );
}
