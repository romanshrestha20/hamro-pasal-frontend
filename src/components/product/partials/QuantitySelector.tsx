"use client";
import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  stock: number;
  onChange: (newQuantity: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  stock,
  onChange,
}) => {
  const adjust = (delta: number) => {
    const next = quantity + delta;
    if (next >= 1 && next <= stock) onChange(next);
  };
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold text-gray-900">Quantity</h3>
      <div className="flex items-center gap-3">
        <button
          onClick={() => adjust(-1)}
          disabled={quantity <= 1}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
          type="button"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-lg font-medium text-center min-w-12">
          {quantity}
        </span>
        <button
          onClick={() => adjust(1)}
          disabled={quantity >= stock}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
          type="button"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
