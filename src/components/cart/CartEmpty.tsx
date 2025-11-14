"use client";

import Link from "next/link";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center p-10 text-center">
      <p className="mt-4 text-gray-500">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
      >
        Shop Products
      </Link>
    </div>
  );
}
