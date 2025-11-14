"use client";

import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import CartEmpty from "@/components/cart/CartEmpty";
import Link from "next/link";

export default function CartPage() {
  const { items, loading, error } = useCart();

  if (loading) return <p className="p-10 text-center">Loading cart...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row">
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Shopping Cart
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Review your items and proceed to checkout
                </p>
              </div>
              <div className="hidden sm:block">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:shadow"
                >
                  Continue shopping
                </Link>
              </div>
            </div>

            {items.length === 0 ? (
              <CartEmpty />
            ) : (
              <div className="bg-white border divide-y rounded-lg shadow-sm">
                {items.map((item) => (
                  <div key={item.id} className="px-6 py-4">
                    <CartItemRow item={item} />
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="w-full max-w-md lg:sticky lg:top-24">
            <CartSummary />
          </aside>
        </div>
      </div>
    </main>
  );
}
