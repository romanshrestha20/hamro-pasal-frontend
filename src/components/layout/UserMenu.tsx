"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { UserAvatar } from "../user";
import DropDown, {
  DropdownItem,
  DropdownDivider,
} from "@/components/ui/DropDown";
import { User } from "@/lib/types/User";



export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();

  // Handles the case where the user is completely undefined/null
  // (e.g., still loading or not logged in)
  if (!user) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Sign In
      </Link>
    );
  }

  const u = user as unknown as Partial<User>;
  const displayName = u?.firstName || u?.lastName || u?.email || "User";

  // The main return statement uses a ternary operator wrapped in {}
  return (
    <>
      {isAuthenticated ? (
        <DropDown
          trigger={
            <div className="flex items-center gap-2 cursor-pointer">
              <UserAvatar user={u} size="sm" />
              <span className="hidden text-sm font-medium text-gray-700 sm:inline">
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

          {/* <DropdownItem
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
          </DropdownItem> */}

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
          <DropdownItem
            href="/favorites"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          >
            Favorites
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
      ) : (
        <DropDown
          trigger={
            // Added missing 'trigger=' key
            <div className="flex items-center gap-2 cursor-pointer">
              <UserAvatar user={u} size="sm" />
              <span className="hidden text-sm font-medium text-gray-700 sm:inline">
                Guest
              </span>
            </div>
          }
          align="right"
        >
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">Guest</p>
            <p className="text-xs text-gray-500">Please sign in</p>
          </div>

          <DropdownItem
            href="/login"
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
                  // Added missing strokeWidth prop value
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            }
          >
            Sign In
          </DropdownItem>
        </DropDown>
      )}
    </>
  );
}
