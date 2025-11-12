"use client";

import { useMemo } from "react";
import { useProductContext } from "@/context/ProductContext";
import { Button } from "../ui";

interface CategoriesSidebarProps {
  selectedCategory?: string | null;
  onCategorySelect?: (categoryId: string | null) => void;
  className?: string;
  emptyMessage?: string;
}

export default function CategoriesSidebar({
  selectedCategory = null,
  onCategorySelect = () => {}, // default no-op
  className = "",
  emptyMessage = "No categories found",
}: CategoriesSidebarProps) {
  const { categories, products, loading, error } = useProductContext();

  // Build a map of categoryId -> product count (memoized for perf)
  const { totalCount, countsByCategory } = useMemo(() => {
    const counts = new Map<string, number>();
    let total = 0;

    for (const p of products) {
      total += 1;
      const cats = p?.categories;
      if (!cats || !Array.isArray(cats) || cats.length === 0) {
        continue;
      }
      for (const c of cats) {
        if (c?.id) {
          counts.set(c.id, (counts.get(c.id) ?? 0) + 1);
        }
      }
    }

    return { totalCount: total, countsByCategory: counts };
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) =>
      p.categories?.some((cat) => cat.id === selectedCategory)
    );
  }, [products, selectedCategory]);

  return (
    <aside className={`lg:w-64 shrink-0 ${className}`}>
      <div
        className="sticky p-4 bg-white border rounded-lg shadow-sm top-20 dark:bg-gray-800 border-soft-lavender-500 dark:border-gray-700"
        role="navigation"
        aria-label="Filter by category"
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Categories
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-bright-blue-500" />
          </div>
        ) : error ? (
          <div className="p-3 text-sm rounded-md text-vivid-red-600 dark:text-vivid-red-400 bg-vivid-red-50 dark:bg-vivid-red-900/20">
            {error}
          </div>
        ) : categories.length === 0 ? (
          <p className="py-4 text-sm text-center text-gray-500 dark:text-gray-400">
            {emptyMessage}
          </p>
        ) : (
          <div
            role="listbox"
            aria-label="Product categories"
            className="space-y-2"
          >
            {/* All Products */}
            <Button
              label="All Product"
              type="button"
              onClick={() => onCategorySelect(null)}
              disabled={loading}
              role="option"
              aria-selected={selectedCategory === null ? "true" : "false"}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-bright-blue-500 ${
                selectedCategory === null
                  ? "bg-bright-blue-100 dark:bg-bright-blue-900/40 text-bright-blue-700 dark:text-bright-blue-400 font-medium border border-bright-blue-300 dark:border-bright-blue-700"
                  : "text-gray-700 dark:text-gray-300 hover:bg-soft-lavender-300 dark:hover:bg-gray-700"
              }`}
            >
              All Products
              <span className="float-right text-sm">{totalCount}</span>
            </Button>

            {/* Individual categories */}
            {categories.map((category) => {
              const count = countsByCategory.get(category.id) ?? 0;
              const isSelected = selectedCategory === category.id;
              return (
                <div
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  role="option"
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-bright-blue-500 ${
                    isSelected
                      ? "bg-bright-blue-100 dark:bg-bright-blue-900/40 text-bright-blue-700 dark:text-bright-blue-400 font-medium border border-bright-blue-300 dark:border-bright-blue-700"
                      : "text-gray-700 dark:text-gray-300 hover:bg-soft-lavender-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.name}
                  <span className="float-right text-sm text-gray-500 dark:text-gray-400">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
