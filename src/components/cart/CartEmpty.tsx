"use client";

import Link from "next/link";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center p-10 text-center text-card-foreground">
      <p className="mt-4 text-muted-foreground">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>

      <Link
        href="/products"
        className="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium transition-all duration-200 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
      >
        Shop Products
      </Link>
    </div>
  );
}
