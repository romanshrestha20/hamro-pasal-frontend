"use client";

import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "@/components/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import UserForm from "@/components/forms/UserForm";

export default function ProfilePage() {
  const { user, loading, isAuthenticated, refreshUser } = useAuth();

  const handleProfileImageUpdated = async (newUrl: string) => {
    console.log("Profile image updated:", newUrl);
    // Refresh user data to show the new profile picture
    await refreshUser();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Profile Not Found
            </h1>
            <p className="text-gray-600">
              Please sign in to view your profile.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="px-6 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated - show profile
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl px-4 py-12 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
          <UserProfile
            user={user}
            editable={true}
            avatarSize="lg"
            onProfileUpdated={handleProfileImageUpdated}
            rightTitle="Profile details"
            rightSubtitle="Basic information about your account"
          />

          {/* Action Buttons */}
        </div>

        {/* Additional Info Cards */}
        <div className="grid gap-6 mt-6 md:grid-cols-2">
          {/* Account Info */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Account Type:</span>
                <span className="ml-2 font-medium text-gray-700">
                  {user.isAdmin ? "Admin" : "Customer"}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Member Since:</span>
                <span className="ml-2 font-medium text-gray-700">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Last Updated:</span>
                <span className="ml-2 font-medium text-gray-700">
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
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                href="/orders"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors rounded-md hover:bg-gray-50"
              >
                View Orders
              </Link>
              <Link
                href="/favorites"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors rounded-md hover:bg-gray-50"
              >
                My Favorites
              </Link>
              <Link
                href="/cart"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors rounded-md hover:bg-gray-50"
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
