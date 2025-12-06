"use client";

import type { Order } from "@/lib/types";

interface OrderSummaryProps {
  order?: Order;
  subtotal?: string | number;
  tax?: string | number;
  discount?: string | number;
  shippingFee?: string | number;
  total?: string | number;
  className?: string;
}

export default function OrderSummary({
  order,
  subtotal,
  tax,
  discount,
  shippingFee,
  total,
  className = "",
}: OrderSummaryProps) {
  // Use order values if provided, otherwise use individual props
  const displaySubtotal = order?.subtotal ?? subtotal ?? "0";
  const displayTax = order?.tax ?? tax ?? "0";
  const displayDiscount = order?.discount ?? discount ?? "0";
  const displayShipping = order?.shippingFee ?? shippingFee ?? "0";
  const displayTotal = order?.total ?? total ?? "0";

  const formatPrice = (value: string | number) => {
    return Number(value).toFixed(2);
  };

  return (
    <div className={`p-4 space-y-3 border rounded-lg bg-card ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium">${formatPrice(displaySubtotal)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Tax</span>
        <span className="font-medium">${formatPrice(displayTax)}</span>
      </div>

      {Number(displayDiscount) > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-green-600">Discount</span>
          <span className="font-medium text-green-600">
            -${formatPrice(displayDiscount)}
          </span>
        </div>
      )}

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Shipping</span>
        <span className="font-medium">${formatPrice(displayShipping)}</span>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>${formatPrice(displayTotal)}</span>
      </div>
    </div>
  );
}
