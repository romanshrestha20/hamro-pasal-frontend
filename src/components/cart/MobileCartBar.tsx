"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileCartBar() {
  const { totalItems, subtotal } = useCart();

  // Hide bar if cart empty
  if (!totalItems) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-card border-t border-border shadow-lg",
        "md:hidden animate-in slide-in-from-bottom-2 duration-300"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <ShoppingCart size={20} className="text-foreground" />
          <div className="text-sm font-medium text-card-foreground">
            {totalItems} item{totalItems > 1 ? "s" : ""} —{" "}
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <Link
          href="/cart"
          className="px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
