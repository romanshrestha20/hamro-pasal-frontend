"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Header from "../ui/Header";
import { Button } from "../ui";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

export default function CartSummary() {
  const { totalItems, subtotal, loading } = useCart();
  const { isAuthenticated } = useAuth(); // assuming useAuth hook exists
  const [promo, setPromo] = useState("");

  const discount = 0; // placeholder for promo logic
  const total = Math.max(0, subtotal - discount);
  const formatCurrency = (v: number) => v.toFixed(2);

  return (
    <aside className="w-full p-6 bg-white border rounded-lg shadow-lg">
      <Header title="Order Summary" />

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Items</span>
          <span className="font-medium text-gray-900">{totalItems}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            ${formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Discount</span>
          <span className="font-medium text-gray-900">
            -${discount.toFixed(2)}
          </span>
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs text-gray-500">Promo code</label>
          <div className="flex gap-2 mt-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Enter code"
              className="flex-1 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-bright-blue-300"
            />
            <Button
              onClick={() => {
                /* apply promo - placeholder */
              }}
              className="px-4 py-2 text-white rounded-md bg-bright-blue-600"
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button
            className={`w-full py-3 rounded-xl font-medium text-white 
      bg-black hover:bg-gray-900 active:scale-[0.98]
      transition-all duration-200 shadow-sm`}
            disabled={loading || totalItems === 0}
            onClick={() => {
              toast.error(
                isAuthenticated
                  ? "Checkout functionality not implemented yet."
                  : "Please log in to proceed to checkout."
              );
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                Processing...
              </span>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
