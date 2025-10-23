"use client";

import React from "react";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import UserProfile from "@/components/UserProfile";
import DashboardCard from "@/components/DashboardCard";
import LogoutButton from "@/components/LogoutButton";
import Button from "@/components/Button";
import GuestState from "@/components/GuestState";

const DashboardPage = () => {
  const { user, loading, error, isAuthenticated } = useUser();
  const { handleLogout } = useLogout();

  if (!user && loading) {
    return <LoadingState message="Loading your dashboard..." />;
  }

  if (!user && !loading) {
    return <GuestState />;
  }

  if (!user && isAuthenticated) {
    return <GuestState />;
  }

  if (!user && error) {
    return <ErrorState message={error} redirectPath="/auth/login" />;
  }

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading your dashboard...</div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <Button
            label="Go Back"
            onClick={() => (window.location.href = "/auth/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome back, {user?.firstName || user?.email}!
      </p>

      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
          Note: {error}
        </div>
      )}

      <DashboardCard
        title="Your Profile"
        actionButton={<LogoutButton onLogout={handleLogout} />}
      >
        <UserProfile user={user!} />

        <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Stats</h3>
        <p className="text-gray-600 mb-6">
          Here you can find your statistics and insights.
        </p>
      </DashboardCard>
    </div>
  );
};

export default DashboardPage;
