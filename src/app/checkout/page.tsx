"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";

import CheckoutStepper from "@/components/order/CheckoutStepper";
import CheckoutAddressForm from "@/components/order/CheckoutAddressForm";
import CheckoutPaymentMethod from "@/components/order/CheckoutPaymentMethod";
import CheckoutOrderReview from "@/components/order/CheckoutOrderReview";

export default function CheckoutPage() {
  const { items } = useCart();
  const { createOrder, currentOrder } = useOrder();

  const [step, setStep] = useState(1);

  // 1️⃣ Create order automatically when arriving on checkout
  useEffect(() => {
    if (items.length === 0) return;
    if (!currentOrder) {
      createOrder({
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      });
    }
  }, [items, currentOrder, createOrder]);

  // Redirect if empty cart
  if (items.length === 0) {
    return (
      <main className="py-20 text-center text-muted-foreground">
        Your cart is empty.
      </main>
    );
  }

  return (
    <main className="max-w-3xl p-6 mx-auto space-y-10">
      <CheckoutStepper currentStep={step} />

      {step === 1 && <CheckoutAddressForm onNext={() => setStep(2)} />}

      {step === 2 && (
        <CheckoutPaymentMethod
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && <CheckoutOrderReview onBack={() => setStep(2)} />}
    </main>
  );
}
