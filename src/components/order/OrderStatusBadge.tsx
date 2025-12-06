"use client";

import { OrderStatus } from "@/lib/types";
import { Badge } from "@/components/ui";

const VARIANT_MAP: Record<
  OrderStatus,
  "warning" | "info" | "default" | "success" | "error"
> = {
  PENDING: "warning",
  PROCESSING: "info",
  SHIPPED: "default",
  DELIVERED: "success",
  CANCELED: "error",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge variant={VARIANT_MAP[status]}>{status}</Badge>;
}
