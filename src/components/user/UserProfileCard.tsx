"use client";

import type { User } from "@/lib/types";
import { UserAvatar } from "@/components/user";

interface UserProfileCardProps {
  user: User;
  className?: string;
  showEmail?: boolean;
}

export default function UserProfileCard({
  user,
  className = "",
  showEmail = false,
}: UserProfileCardProps) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <UserAvatar user={user} size="md" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{fullName}</p>
        {showEmail && (
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        )}
      </div>
    </div>
  );
}
