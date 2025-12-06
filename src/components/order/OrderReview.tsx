"use client";

import type { Order, OrderItem, ShippingAddress, Payment } from "@/lib/types";
import OrderItemList from "./OrderItemList";
import OrderSummary from "./OrderSummary";
import ShippingAddressCard from "./ShippingAddressCard";
import PaymentInfoCard from "./PaymentInfoCard";

interface OrderReviewProps {
  order?: Order;
  items?: OrderItem[];
  shippingAddress?: ShippingAddress | null;
  payment?: Payment | null;
  subtotal?: string | number;
  tax?: string | number;
  discount?: string | number;
  shippingFee?: string | number;
  total?: string | number;
  className?: string;
}

export default function OrderReview({
  order,
  items,
  shippingAddress,
  payment,
  subtotal,
  tax,
  discount,
  shippingFee,
  total,
  className = "",
}: OrderReviewProps) {
  // Use order data if provided, otherwise use individual props
  const displayItems = order?.orderItems ?? items ?? [];
  const displayAddress = order?.shippingAddress ?? shippingAddress;
  const displayPayment = order?.payment ?? payment;

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h2 className="text-2xl font-bold mb-4">Review Your Order</h2>
        <p className="text-muted-foreground">
          Please review your order details before placing your order.
        </p>
      </div>

      {/* Order Items */}
      <div className="border rounded-lg p-4 bg-card">
        <h3 className="text-lg font-semibold mb-4">Items</h3>
        <OrderItemList items={displayItems} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Shipping Address */}
        <ShippingAddressCard address={displayAddress} />

        {/* Payment Info */}
        {displayPayment && <PaymentInfoCard payment={displayPayment} />}
      </div>

      {/* Order Summary */}
      <OrderSummary
        order={order}
        subtotal={subtotal}
        tax={tax}
        discount={discount}
        shippingFee={shippingFee}
        total={total}
      />
    </div>
  );
}
