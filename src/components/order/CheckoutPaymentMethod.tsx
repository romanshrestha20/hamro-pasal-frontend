"use client";

import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { Button } from "../ui";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function CheckoutPaymentMethod({ onNext, onBack }: Props) {
  const { createPayment, currentOrder } = useOrder();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedMethod || !currentOrder) return;

    setLoading(true);
    try {
      await createPayment(currentOrder.id, {
        provider: selectedMethod,
        method: selectedMethod,
      });
      onNext();
    } catch (error) {
      console.error("Payment creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PaymentMethodSelector
        value={selectedMethod}
        onChange={setSelectedMethod}
        disabled={loading}
      />

      <div className="flex gap-3">
        <Button
          variant="secondary"
          onClick={onBack}
          disabled={loading}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedMethod || loading}
          className="flex-1"
        >
          {loading ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
