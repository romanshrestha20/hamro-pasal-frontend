"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, loading } = useCart();

  return (
    <>
      {/* Trigger */}
      <Button
        onClick={() => setOpen(true)}
        aria-label="Open cart"
        className="relative p-2 transition-colors text-foreground hover:text-primary"
      >
        <ShoppingBag className="w-5 h-5" />
      </Button>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md z-50",
          "bg-card text-card-foreground border-l border-border shadow-xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <Button variant="ghost" onClick={() => setOpen(false)} aria-label="Close cart">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
          {loading ? (
            <p className="py-6 text-center text-muted-foreground">Loading...</p>
          ) : items.length ? (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-muted-foreground">Your cart is empty</p>
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="inline-block mt-4 text-primary hover:underline"
              >
                Continue shopping →
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <CartSummary />

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="block w-full py-2 mt-3 text-center transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Go to Cart →
          </Link>
        </div>
      </aside>
    </>
  );
}
