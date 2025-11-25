"use client";

import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import CartEmpty from "@/components/cart/CartEmpty";
import Link from "next/link";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

export default function CartPage() {
  const { items, loading, error, subtotal } = useCart();

  if (loading) return <LoadingState label="Loading cart..." />;
  if (error) return <ErrorState message="Failed to load cart" subMessage={error} />;

  return (
    <main className="min-h-screen bg-background pb-28 lg:pb-0">
      {/* Top Section */}
      <div className="px-3 py-6 mx-auto max-w-7xl sm:px-4 md:py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* Summary */}
          <aside className="order-2 w-full max-w-full lg:max-w-sm lg:order-1 lg:sticky lg:top-24 lg:self-start">
            <CartSummary />
          </aside>

          {/* Items */}
          <section className="flex-1 order-1 lg:order-2">
            <header className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-bold sm:text-3xl text-foreground">
                  Cart
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Review your items & checkout
                </p>
              </div>
            </header>

            {items.length === 0 ? (
              <CartEmpty />
            ) : (
              <div className="border rounded-lg shadow-sm bg-card border-border">
                <ul className="divide-y divide-border">
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
        <div
          className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between px-4 py-3 border-t shadow-lg  bg-card border-border lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex flex-col leading-tight">
            <span className="text-xs text-muted-foreground">Subtotal</span>
            <span className="text-base font-semibold text-foreground">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="px-5 py-2 text-sm font-semibold transition-colors rounded-md  bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
          >
            Checkout
          </Link>
        </div>
      )}
    </main>
  );
}
