"use client";

import Link from "next/link";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { Order } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui";

interface OrderHistoryItemProps {
  order: Order;
  loading?: boolean;
  className?: string;
}

export default function OrderHistoryItem({
  order,
  className,
}: OrderHistoryItemProps) {
  const createdAtDate = order.createdAt ? new Date(order.createdAt) : null;

  return (
    <Card variant="elevated" padding="lg" hover className={className}>
      <div className="flex items-center justify-between">
        <CardHeader className="mb-0">
          <CardTitle>Order #{order.id}</CardTitle>
          <CardDescription>
            Placed on{" "}
            {createdAtDate
              ? createdAtDate.toLocaleDateString()
              : "Unknown date"}
          </CardDescription>
        </CardHeader>

        <Link
          href={`/orders/${order.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Details →
        </Link>
      </div>

      <CardFooter className="mt-4">
        <OrderStatusBadge status={order.status} />
        {order.payment && <PaymentStatusBadge status={order.payment.status} />}

        <span className="ml-auto font-medium">
          Total: ${Number(order.total).toFixed(2)}
        </span>
      </CardFooter>
    </Card>
  );
}
