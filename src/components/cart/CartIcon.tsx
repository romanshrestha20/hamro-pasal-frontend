"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { i } from "framer-motion/m";

export default function CartIcon() {
  const { totalItems } = useCart();

  //Simplify to always render and show 0 when no items, or keep as-is to avoid render before provider mounts.


  return (
    <Link href="/cart" aria-label="View cart">
      <div className="relative">
        <ShoppingBag size={24} />
        {totalItems > 0 && (
          <span className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full -top-2 -right-2">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
}
