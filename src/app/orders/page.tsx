"use client";

import Link from "next/link";
import { useEffect } from "react";
import OrderHistoryList from "@/components/order/OrderHistoryList";
import { useOrder } from "@/context/OrderContext";
import { useAuth } from "@/hooks/useAuth";

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const { orders, loading, error, fetchUserOrders } = useOrder();

  // Refetch orders when a user session becomes available
  useEffect(() => {
    if (!user) return;
    fetchUserOrders();
  }, [user, fetchUserOrders]);

  if (!user) {
    return (
      <main className="max-w-4xl min-h-screen px-4 py-12 mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Order History</h1>
        <p className="text-muted-foreground">
          Please sign in to view your orders.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary/90"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl min-h-screen px-4 py-12 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Order History</h1>
      <OrderHistoryList
        orders={orders ?? null}
        loading={loading}
        error={error}
      />
    </main>
  );
}
