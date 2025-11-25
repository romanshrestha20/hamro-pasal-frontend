"use client";

import { useMemo, KeyboardEvent } from "react";
import { useProductContext } from "@/context/ProductContext";
import { cn } from "@/lib/utils";

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

  /* Count products per category */
  const { totalCount, countsByCategory } = useMemo(() => {
    const map = new Map<string, number>();
    let total = 0;

    for (const p of products) {
      total++;
      if (!Array.isArray(p?.categories)) continue;
      p.categories.forEach((c) => {
        if (c?.id) map.set(c.id, (map.get(c.id) ?? 0) + 1);
      });
    }

    return { totalCount: total, countsByCategory: map };
  }, [products]);

  const handleKey = (e: KeyboardEvent<HTMLDivElement>, id: string | null) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCategorySelect(id);
    }
  };

  return (
    <aside className={cn("lg:w-64 shrink-0", className)}>
      <div
        className="sticky p-4 border rounded-lg shadow-sm  top-20 border-border bg-card text-card-foreground"
        role="navigation"
        aria-label="Filter by category"
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Categories
        </h2>

        {/* ─────────── States ─────────── */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-b-2 rounded-full border-accent animate-spin" />
          </div>
        )}

        {error && (
          <div className="p-3 text-sm rounded-md bg-error/10 text-error">
            {error}
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <p className="py-4 text-sm text-center text-muted-foreground">
            {emptyMessage}
          </p>
        )}

        {/* ─────────── Category List ─────────── */}
        {!loading && !error && categories.length > 0 && (
          <div role="listbox" aria-label="Product categories" className="space-y-2">
            {[
              { id: null, name: "All Products", count: totalCount },
              ...categories.map((c) => ({
                id: c.id,
                name: c.name,
                count: countsByCategory.get(c.id) ?? 0,
              })),
            ].map(({ id, name, count }) => {
              const isSelected = selectedCategory === id;

              return (
                <div
                  key={id ?? "all"}
                  role="option"
                  tabIndex={0}
                  aria-selected={isSelected}
                  onClick={() => onCategorySelect(id)}
                  onKeyDown={(e) => handleKey(e, id)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md select-none cursor-pointer transition-colors border border-transparent",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    isSelected
                      ? "bg-muted text-foreground border-border font-medium"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span>{name}</span>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
