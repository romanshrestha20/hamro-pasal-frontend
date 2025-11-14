"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, loading } = useCart();

  return (
    <>
      {/* Trigger button in header */}
      <button onClick={() => setOpen(true)} className="relative">
        🛒
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white border-l shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <Button onClick={() => setOpen(false)} aria-label="Close cart">
            <X />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
          {loading ? (
            <p className="py-6 text-center">Loading...</p>
          ) : items.length ? (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-10">
              <p className="text-center text-gray-600">Your cart is empty</p>
              <div className="mt-4 text-center">
                <Link
                  href="/products"
                  className="text-bright-blue-600 hover:underline"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <CartSummary />

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="block w-full py-2 mt-3 text-center text-white bg-black rounded-md"
          >
            Go to Cart Page →
          </Link>
        </div>
      </aside>
    </>
  );
}
