"use client";

import ProfileAvatar from "./ProfileAvatar";
import type { User } from "@/lib/types";

export const UserAvatar = ({
  user,
  size = "sm",
}: {
  user?: Partial<User> | null;
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  const name = user?.firstName ?? "User";
  return <ProfileAvatar src={user?.profilePicture} alt={name} size={size} />;
};
