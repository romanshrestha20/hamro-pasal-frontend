"use client";

import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "@/components/user";
import Link from "next/link";
import LoadingState from "@/components/common/LoadingState";

export default function ProfilePage() {
  const { user, loading, isAuthenticated, refreshUser } = useAuth();

  const handleProfileImageUpdated = async (newUrl: string) => {
    console.log("Profile image updated:", newUrl);
    await refreshUser(); // Refresh user data to reflect new profile image
  };

  /* ================================================================
     Loading state
  ================================================================= */
  if (loading) return <LoadingState />;
  /* ================================================================
     Not Authenticated
  ================================================================= */
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-background">
        <div className="w-full max-w-md p-8 space-y-6 text-center border shadow-sm bg-card rounded-xl border-border">
          <h1 className="text-2xl font-bold text-foreground">
            Profile Not Found
          </h1>
          <p className="text-muted-foreground">
            Please sign in to view your profile.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2 transition rounded-lg text-primary-foreground bg-primary hover:opacity-90"
            >
              Sign In
            </Link>

            <Link
              href="/"
              className="px-6 py-2 transition border rounded-lg text-foreground border-border hover:bg-muted"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }


  /* ================================================================
     Authenticated User
  ================================================================= */
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl px-4 py-12 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="p-8 border rounded-lg shadow-sm bg-card border-border">
          <UserProfile
            user={user}
            editable={true}
            avatarSize="lg"
            onProfileUpdated={handleProfileImageUpdated}
            rightTitle="Profile details"
            rightSubtitle="Basic information about your account"
          />
        </div>

        {/* Additional Cards */}
        <div className="grid gap-6 mt-6 md:grid-cols-2">
          {/* Account Information */}
          <div className="p-6 border rounded-lg shadow-sm bg-card border-border">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Account Information
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Account Type:</span>
                <span className="ml-2 font-medium text-foreground">
                  {user.isAdmin ? "Admin" : "Customer"}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground">Member Since:</span>
                <span className="ml-2 font-medium text-foreground">
                  {user.createdAt &&
                    new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="ml-2 font-medium text-foreground">
                  {new Date(user.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 border rounded-lg shadow-sm bg-card border-border">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Quick Actions
            </h2>

            <div className="space-y-2">
              <Link
                href="/orders"
                className="block px-4 py-2 text-sm transition rounded-md text-foreground hover:bg-muted"
              >
                View Orders
              </Link>

              <Link
                href="/favorites"
                className="block px-4 py-2 text-sm transition rounded-md text-foreground hover:bg-muted"
              >
                My Favorites
              </Link>

              <Link
                href="/cart"
                className="block px-4 py-2 text-sm transition rounded-md text-foreground hover:bg-muted"
              >
                Shopping Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
