"use client";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  columns?: 2 | 3 | 4 | 5;
  className?: string;
  emptyMessage?: string;
}

const gridColsMap = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
};

export function ProductGrid({
  products,
  onAddToCart,
  columns = 4,
  className = "",
  emptyMessage = "No products found",
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridColsMap[columns]} gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          onWishList={() => {}}
          key={product.id}
          product={product}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}
