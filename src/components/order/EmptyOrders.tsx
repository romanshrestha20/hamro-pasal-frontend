"use client";

import { ShoppingBag } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";

export default function EmptyOrders() {
  return (
    <EmptyState
      icon={<ShoppingBag className="w-16 h-16" />}
      title="No Orders Found"
      description="You have not placed any orders yet. Start shopping to place your first order!"
      action={{
        label: "Start Shopping",
        href: "/products",
      }}
    />
  );
}
