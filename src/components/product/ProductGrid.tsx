"use client";

import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
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
  columns = 4,
  className = "",
  emptyMessage = "No products found",
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center transition-colors">
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridColsMap[columns]} gap-6 transition-colors ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
