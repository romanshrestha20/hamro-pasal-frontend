"use client";

import Header from "@/components/ui/Header";
import { useProductContext } from "@/context/ProductContext";
import CategoryCard from "@/components/product/CategoryCard";

export default function CategoryPage() {
  const { categories, loading } = useProductContext();

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <Header title="Categories" />

      {loading && (
        <p className="mt-4 text-sm text-muted-foreground">
          Loading categories...
        </p>
      )}

      {!loading && (!categories || categories.length === 0) && (
        <p className="mt-4 text-sm text-muted-foreground">
          No categories available.
        </p>
      )}

      {!loading && categories && categories.length > 0 && (
        <div className="mt-6">
          <CategoryCard />
        </div>
      )}
    </div>
  );
}
