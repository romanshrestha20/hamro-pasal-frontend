"use client";

import type { Payment } from "@/lib/types";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { InfoRow } from "@/components/ui";

export default function PaymentInfoCard({
  payment,
}: {
  payment: Payment | null | undefined;
}) {
  if (!payment) return null;

  return (
    <Card variant="bordered">
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <InfoRow label="Provider" value={payment.provider ?? "N/A"} />
        <InfoRow
          label="Amount"
          value={`$${Number(payment.amount).toFixed(2)}`}
        />
        {payment.transactionId && (
          <InfoRow label="Transaction ID" value={payment.transactionId} />
        )}
        <div className="mt-3">
          <PaymentStatusBadge status={payment.status} />
        </div>
      </CardContent>
    </Card>
  );
}
