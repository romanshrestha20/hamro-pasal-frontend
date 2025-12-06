"use client";

import type { Order } from "@/lib/types";
import { Card, CardContent, InfoRow, Divider } from "@/components/ui";

export default function OrderInvoiceSummary({ order }: { order: Order }) {
  return (
    <Card variant="bordered">
      <CardContent>
        <InfoRow
          label="Subtotal"
          value={`$${Number(order.subtotal).toFixed(2)}`}
        />
        <InfoRow label="Tax" value={`$${Number(order.tax).toFixed(2)}`} />
        {Number(order.discount) > 0 && (
          <InfoRow
            label="Discount"
            value={`-$${Number(order.discount).toFixed(2)}`}
            labelClassName="text-green-600"
          />
        )}
        <InfoRow
          label="Shipping"
          value={`$${Number(order.shippingFee).toFixed(2)}`}
        />

        <Divider className="my-3" />

        <InfoRow
          label="Total"
          value={`$${Number(order.total).toFixed(2)}`}
          className="text-lg font-semibold"
        />
      </CardContent>
    </Card>
  );
}
