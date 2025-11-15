"use client";

import { useMemo, KeyboardEvent, useState } from "react";
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
  onCategorySelect = () => {},
  className = "",
  emptyMessage = "No categories found",
}: CategoriesSidebarProps) {
  const [open, setOpen] = useState(false);
  const { categories, products, loading, error } = useProductContext();

  // Compute product counts
  const { totalCount, countsByCategory } = useMemo(() => {
    const map = new Map<string, number>();
    let total = 0;

    for (const p of products) {
      total++;
      if (!Array.isArray(p?.categories)) continue;
      p.categories.forEach((c) => {
        if (c?.id) {
          map.set(c.id, (map.get(c.id) ?? 0) + 1);
        }
      });
    }

    return { totalCount: total, countsByCategory: map };
  }, [products]);

  // Keyboard accessibility
  const handleKey = (e: KeyboardEvent<HTMLDivElement>, id: string | null) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCategorySelect(id);
    }
  };

  const baseItemClasses =
    "w-full text-left px-3 py-2 rounded-md transition-colors select-none flex items-center justify-between cursor-pointer";

  const selectedClasses =
    "bg-bright-blue-100 dark:bg-bright-blue-900/40 text-bright-blue-700 dark:text-bright-blue-400 font-medium border border-bright-blue-300 dark:border-bright-blue-700";

  const unselectedClasses =
    "text-gray-700 dark:text-gray-300 hover:bg-soft-lavender-300 dark:hover:bg-gray-700";

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
            <div
              role="option"
              tabIndex={0}
              aria-selected={selectedCategory === null}
              onClick={() => onCategorySelect(null)}
              onKeyDown={(e) => handleKey(e, null)}
              className={`${baseItemClasses} ${
                selectedCategory === null ? selectedClasses : unselectedClasses
              }`}
            >
              <span>All Products</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {totalCount}
              </span>
            </div>

            {/* Individual Categories */}
            {categories.map((category) => {
              const count = countsByCategory.get(category.id) ?? 0;
              const isSelected = selectedCategory === category.id;

              return (
                <div
                  key={category.id}
                  role="option"
                  tabIndex={0}
                  aria-selected={isSelected}
                  onClick={() => onCategorySelect(category.id)}
                  onKeyDown={(e) => handleKey(e, category.id)}
                  className={`${baseItemClasses} ${
                    isSelected ? selectedClasses : unselectedClasses
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
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
