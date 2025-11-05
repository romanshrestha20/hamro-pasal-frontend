"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { UserAvatar } from "../user";
import DropDown, {
  DropdownItem,
  DropdownDivider,
} from "@/components/ui/DropDown";

type MinimalUser = {
  email?: string;
  name?: string;
  firstName?: string;
  image?: string | null;
  avatarUrl?: string | null;
};

export function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Sign In
      </Link>
    );
  }

  const u = user as unknown as Partial<MinimalUser>;
  const displayName = u?.firstName || u?.name || u?.email || "User";

  return (
    <DropDown
      trigger={
        <div className="flex items-center gap-2 cursor-pointer">
          <UserAvatar user={u} size="sm" />
          <span className="hidden sm:inline text-sm text-gray-700 font-medium">
            {displayName}
          </span>
        </div>
      }
      align="right"
    >
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-900">{displayName}</p>
        <p className="text-xs text-gray-500 truncate">{u?.email}</p>
      </div>

      <DropdownItem
        href="/profile"
        icon={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        }
      >
        My Profile
      </DropdownItem>

      <DropdownItem
        href="/dashboard"
        icon={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        }
      >
        Dashboard
      </DropdownItem>

      <DropdownItem
        href="/orders"
        icon={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        }
      >
        My Orders
      </DropdownItem>

      <DropdownDivider />

      <DropdownItem
        onClick={logout}
        className="text-red-600 hover:bg-red-50"
        icon={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        }
      >
        Sign Out
      </DropdownItem>
    </DropDown>
  );
}
