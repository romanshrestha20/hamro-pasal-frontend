"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Header from "../ui/Header";
import { Button } from "../ui";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function CartSummary() {
  const router = useRouter();
  const { totalItems, subtotal, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const [promo, setPromo] = useState("");

  const discount = 0; // placeholder for promo logic
  const total = Math.max(0, subtotal - discount);

  const formatCurrency = (v: number) => v.toFixed(2);
 const handleCheckout = () => {
   if (!isAuthenticated) {
     // redirect user to login page, then back to checkout
     router.push("/login?redirect=/checkout");
     return;
   }

   if (totalItems === 0) {
     toast.error("Your cart is empty.");
     return;
   }

   router.push("/checkout");
 };
  return (
    <aside className="w-full p-6 transition-colors border rounded-lg shadow-lg border-border bg-card text-card-foreground">
      <Header title="Order Summary" />

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Items</span>
          <span className="font-medium text-foreground">{totalItems}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            ${formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Discount</span>
          <span className="font-medium text-error">
            -${discount.toFixed(2)}
          </span>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-lg font-semibold text-foreground">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Promo Input */}
        <div className="mt-4">
          <label className="block text-xs text-muted-foreground">
            Promo code
          </label>
          <div className="flex gap-2 mt-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Enter code"
              className="flex-1 px-3 py-2 transition-colors border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
            />
            <Button
              onClick={() => {}}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="
              w-full py-3 rounded-xl font-medium shadow-sm
              bg-primary text-primary-foreground hover:bg-primary/90
              active:scale-[0.98] transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed
            "
            disabled={loading || totalItems === 0}
            onClick={handleCheckout}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 rounded-full border-primary-foreground border-t-transparent animate-spin" />
                Processing...
              </span>
            ) : (
              "Proceed to Checkout"
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}
