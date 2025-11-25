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

  // If user doesn't exist → Reveal Sign In button
  if (!user) {
    return (
      <Link
        href="/login"
        className="
          px-4 py-2 font-medium rounded-lg
          bg-primary text-primary-foreground
          hover:bg-primary/90 active:scale-[0.97]
          transition-colors
        "
      >
        Sign In
      </Link>
    );
  }

  const u = user as Partial<User>;
  const displayName = u?.firstName || u?.lastName || u?.email || "User";

  return (
    <>
      {isAuthenticated ? (
        <DropDown
          trigger={
            <div className="flex items-center gap-2 cursor-pointer">
              <UserAvatar user={u} size="sm" />
              <span className="hidden text-sm font-medium text-foreground sm:inline">
                {displayName}
              </span>
            </div>
          }
          align="right"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-card">
            <p className="text-sm font-medium text-foreground">{displayName}</p>
            <p className="text-xs truncate text-muted-foreground">{u?.email}</p>
          </div>

          <DropdownItem href="/profile" icon={<ProfileIcon />}>
            My Profile
          </DropdownItem>

          <DropdownItem href="/orders" icon={<BagIcon />}>
            My Orders
          </DropdownItem>

          <DropdownItem href="/favorites" icon={<StarIcon />}>
            Favorites
          </DropdownItem>

          <DropdownDivider />

          <DropdownItem
            onClick={logout}
            className="text-error hover:bg-error/10"
            icon={<LogoutIcon />}
          >
            Sign Out
          </DropdownItem>
        </DropDown>
      ) : (
        <DropDown
          trigger={
            <div className="flex items-center gap-2 cursor-pointer">
              <UserAvatar user={u} size="sm" />
              <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
                Guest
              </span>
            </div>
          }
          align="right"
        >
          <div className="px-4 py-3 border-b border-border bg-card">
            <p className="text-sm font-medium text-foreground">Guest</p>
            <p className="text-xs text-muted-foreground">Please sign in</p>
          </div>

          <DropdownItem href="/login" icon={<LoginIcon />}>
            Sign In
          </DropdownItem>
        </DropDown>
      )}
    </>
  );
}

/* 🎨 Shared Menu Icons */
const iconClass = "w-4 h-4 text-muted-foreground";
const ProfileIcon = () => (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const BagIcon = () => (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);
const StarIcon = () => (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
const LogoutIcon = () => (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);
const LoginIcon = () => (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);
