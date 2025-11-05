"use client";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { logout, loading, error } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      
      <Button
        label="Logout"
        className="bg-red-600 hover:bg-red-700 text-white"
        onClick={logout}
      />
    </div>
  );
}
