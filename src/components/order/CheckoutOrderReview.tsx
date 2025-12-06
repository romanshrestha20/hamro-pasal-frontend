"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";
import OrderReview from "./OrderReview";
import { Button } from "@/components/ui";

interface CheckoutOrderReviewProps {
  onBack: () => void;
}

export default function CheckoutOrderReview({
  onBack,
}: CheckoutOrderReviewProps) {
  const router = useRouter();
  const { currentOrder } = useOrder();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!currentOrder) return;

    setLoading(true);
    try {
      // Order is already created and updated throughout the flow
      // Just clear cart and navigate to success page
      clearCart();
      router.push(`/orders/${currentOrder.id}/success`);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentOrder) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrderReview order={currentOrder} />

      <div className="flex gap-3 pt-4 border-t">
        <Button
          variant="secondary"
          onClick={onBack}
          disabled={loading}
          className="flex-1"
        >
          Back to Payment
        </Button>
        <Button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="flex-1"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
