"use client";

import { useState } from "react";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { Button } from "../ui";

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  enabled?: boolean;
}

interface PaymentMethodSelectorProps {
  value?: string;
  onChange: (methodId: string) => void;
  methods?: PaymentMethod[];
  disabled?: boolean;
  className?: string;
}

const DEFAULT_METHODS: PaymentMethod[] = [
  {
    id: "COD",
    name: "Cash on Delivery",
    description: "Pay when you receive your order",
    icon: <Banknote className="w-5 h-5" />,
    enabled: true,
  },
  {
    id: "CARD",
    name: "Credit/Debit Card",
    description: "Pay securely with your card",
    icon: <CreditCard className="w-5 h-5" />,
    enabled: true,
  },
  {
    id: "ESEWA",
    name: "eSewa",
    description: "Pay with eSewa wallet",
    icon: <Wallet className="w-5 h-5" />,
    enabled: true,
  },
  {
    id: "KHALTI",
    name: "Khalti",
    description: "Pay with Khalti wallet",
    icon: <Wallet className="w-5 h-5" />,
    enabled: true,
  },
];

export default function PaymentMethodSelector({
  value,
  onChange,
  methods = DEFAULT_METHODS,
  disabled = false,
  className = "",
}: PaymentMethodSelectorProps) {
  const [selected, setSelected] = useState(value);

  const handleSelect = (methodId: string) => {
    setSelected(methodId);
    onChange(methodId);
  };

  const enabledMethods = methods.filter((m) => m.enabled !== false);

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>

      <div className="grid gap-3">
        {enabledMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => handleSelect(method.id)}
            disabled={disabled}
            className={`
              flex items-start gap-4 p-4 border-2 rounded-lg transition-all
              hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                selected === method.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }
            `}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
              {method.icon}
            </div>

            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">{method.name}</p>
              {method.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {method.description}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selected === method.id ? "border-primary" : "border-muted-foreground"}
                `}
              >
                {selected === method.id && (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
