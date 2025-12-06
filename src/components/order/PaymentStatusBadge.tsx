"use client";

import { PaymentStatus } from "@/lib/types";
import { Badge } from "@/components/ui";

const VARIANT_MAP: Record<
  PaymentStatus,
  "warning" | "success" | "error" | "secondary"
> = {
  PENDING: "warning",
  PAID: "success",
  FAILED: "error",
  REFUNDED: "secondary",
};

export default function PaymentStatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  return <Badge variant={VARIANT_MAP[status]}>{status}</Badge>;
}
