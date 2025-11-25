"use client";

import { X } from "lucide-react";

export default function ActiveFiltersBar({
  searchQuery,
  selectedCategory,
  categoryName,
  onClearSearch,
  onClearCategory,
  onClearAll,
}: {
  searchQuery?: string;
  selectedCategory?: string;
  categoryName?: string;
  onClearSearch: () => void;
  onClearCategory: () => void;
  onClearAll: () => void;
}) {
  const hasAny = Boolean(searchQuery) || Boolean(selectedCategory);
  if (!hasAny) return null;

  const baseChipClasses =
    "inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-border bg-card text-card-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      {/* 🔍 Search Filter */}
      {searchQuery && (
        <button onClick={onClearSearch} className={baseChipClasses}>
          <span>Search: &quot;{searchQuery}&quot;</span>
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      )}

      {/* 📂 Category Filter */}
      {selectedCategory && (
        <button onClick={onClearCategory} className={baseChipClasses}>
          <span>Category: {categoryName ?? selectedCategory}</span>
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      )}

      {/* 🧹 Clear All */}
      <button
        onClick={onClearAll}
        className="inline-flex items-center px-3 py-1 text-sm transition-colors border rounded-full  border-border bg-card text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Clear All
      </button>
    </div>
  );
}
