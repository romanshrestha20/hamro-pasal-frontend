"use client";

import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import CartEmpty from "@/components/cart/CartEmpty";
import Link from "next/link";

export default function CartPage() {
  const { items, loading, error, subtotal } = useCart();

  if (loading) return <p className="p-10 text-center">Loading cart...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

  return (
    <main className="min-h-screen bg-gray-50 pb-28 lg:pb-0">
      {/* Top Section */}
      <div className="px-3 py-6 mx-auto max-w-7xl sm:px-4 md:py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* Summary (Mobile below products, sticky only on desktop) */}
          <aside className="order-2 w-full max-w-full lg:max-w-sm lg:order-1 lg:sticky lg:top-24 lg:self-start">
            <CartSummary />
          </aside>

          {/* Items */}
          <section className="flex-1 order-1 lg:order-2">
            <header className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Cart
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Review your items & checkout
                </p>
              </div>

            
            </header>

            {items.length === 0 ? (
              <CartEmpty />
            ) : (
              <div className="bg-white border rounded-lg shadow-sm">
                <ul className="divide-y">
                  {items.map((item) => (
                    <li key={item.id} className="px-3 py-4 sm:px-6">
                      <CartItemRow item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Sticky Checkout (Mobile Only) */}
      {items.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-t shadow-lg lg:hidden"
             style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <div className="flex flex-col leading-tight">
            <span className="text-xs text-gray-500">Subtotal</span>
            <span className="text-base font-semibold text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="px-5 py-2 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-900 active:scale-95"
          >
            Checkout
          </Link>
        </div>
      )}
    </main>
  );
}

