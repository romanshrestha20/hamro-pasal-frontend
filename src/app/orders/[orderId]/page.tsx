"use client";

import { useEffect, use } from "react";
import { useOrder } from "@/context/OrderContext";
import PaymentStatusBadge from "@/components/order/PaymentStatusBadge";
import OrderTrackingTimeline from "@/components/order/OrderTrackingTimeline";
import OrderItemList from "@/components/order/OrderItemList";
import OrderInvoiceSummary from "@/components/order/OrderInvoiceSummary";
import ShippingAddressCard from "@/components/order/ShippingAddressCard";
import PaymentInfoCard from "@/components/order/PaymentInfoCard";
import { Button } from "@/components/ui/Button";

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { currentOrder, fetchOrderById, cancelOrder, loading } = useOrder();
  const { orderId } = use(params);

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId, fetchOrderById]);

  if (loading || !currentOrder) {
    return (
      <main className="max-w-4xl p-6 mx-auto">
        <p className="text-center text-muted-foreground">Loading order...</p>
      </main>
    );
  }

  const order = currentOrder;

  return (
    <main className="max-w-4xl p-6 mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">Order #{order.id}</h1>

        <div className="flex flex-wrap gap-3">
          {order.payment && (
            <PaymentStatusBadge status={order.payment.status} />
          )}
        </div>
      </section>

      {/* Tracking Timeline */}
      <OrderTrackingTimeline status={order.status} />

      {/* Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <ShippingAddressCard address={order.shippingAddress} />
        <PaymentInfoCard payment={order.payment} />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Items</h2>
        <OrderItemList items={order.orderItems} />
      </section>

      <section>
        <OrderInvoiceSummary order={order} />
      </section>

      {/* Cancel Order Button (Only if pending or processing) */}
      {(order.status === "PENDING" || order.status === "PROCESSING") && (
        <Button
          variant="primary"
          className="w-full md:w-auto"
          onClick={() => cancelOrder(order.id)}
        >
          Cancel Order
        </Button>
      )}
    </main>
  );
}
