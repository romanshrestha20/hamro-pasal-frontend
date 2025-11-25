"use client";

import { useMemo, KeyboardEvent } from "react";
import { useProductContext } from "@/context/ProductContext";

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
    "w-full text-left px-3 py-2 rounded-md select-none flex items-center justify-between cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  const selectedClasses =
    "bg-muted text-foreground font-medium border border-accent";

  const unselectedClasses = "text-muted-foreground hover:bg-muted";

  return (
    <aside className={`lg:w-64 shrink-0 ${className}`}>
      <div
        className="sticky p-4 border rounded-lg shadow-sm top-20 bg-card text-card-foreground"
        role="navigation"
        aria-label="Filter by category"
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Categories
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-accent" />
          </div>
        ) : error ? (
          <div className="p-3 text-sm rounded-md text-error bg-error/10">
            {error}
          </div>
        ) : categories.length === 0 ? (
          <p className="py-4 text-sm text-center text-muted-foreground">
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
              <span className="text-sm text-muted-foreground">
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
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
