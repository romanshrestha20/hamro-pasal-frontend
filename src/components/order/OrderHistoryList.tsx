"use client";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyOrders from "./EmptyOrders";
import OrderHistoryItem from "./OrderHistoryItem";
import { Order } from "@/lib/types";

interface OrderHistoryListProps {
  orders?: Order[] | null;
  loading?: boolean;
  error?: string | null;
}

export default function OrderHistoryList({
  orders = null,
  loading = false,
  error = null,
}: OrderHistoryListProps) {
  if (loading) return <LoadingState label="Loading your orders..." />;

  if (error)
    return <ErrorState message="Failed to load orders" subMessage={error} />;

  if (!orders || orders.length === 0) return <EmptyOrders />;

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderHistoryItem order={order} key={order.id} />
      ))}
    </div>
  );
}
