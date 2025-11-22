import { User } from "@/lib/types";
import { UserAvatar } from "../user";

export const AvatarWithName = ({ user }: { user: Partial<User> }) => {
  const u = user;
  const displayName = u?.firstName || u?.lastName || u?.email || "User";

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <UserAvatar user={u} size="sm" />
      <span className="hidden text-sm font-medium text-gray-700 sm:inline">
        {displayName}
      </span>
    </div>
  );
};
