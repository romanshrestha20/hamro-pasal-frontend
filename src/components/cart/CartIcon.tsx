"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" aria-label="View cart">
      <div className="relative flex items-center justify-center transition-colors text-foreground hover:text-primary">
        <ShoppingBag size={22} />
        
        {totalItems > 0 && (
          <span
            className="
              absolute -top-2 -right-2 w-5 h-5 text-[10px] leading-none 
              font-bold flex items-center justify-center rounded-full 
              bg-error text-white border border-background
            "
          >
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
}
