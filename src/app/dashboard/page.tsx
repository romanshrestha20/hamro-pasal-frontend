"use client";

import { ProductList } from "@/components/product/ProductList";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { logout, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-b-2 rounded-full animate-spin border-bright-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading products...
          </p>
        </div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <ProductList />
      <Button
        label="Logout"
        className="text-white bg-red-600 hover:bg-red-700"
        onClick={logout}
      />
    </div>
  );
}
