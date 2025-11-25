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

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      {searchQuery ? (
        <button
          onClick={onClearSearch}
          className="inline-flex items-center gap-2 px-3 py-1 text-sm border rounded-full bg-card text-card-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>Search: &quot;{searchQuery}&quot;</span>
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      ) : null}

      {selectedCategory ? (
        <button
          onClick={onClearCategory}
          className="inline-flex items-center gap-2 px-3 py-1 text-sm border rounded-full bg-card text-card-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>Category: {categoryName ?? selectedCategory}</span>
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      ) : null}

      <button
        onClick={onClearAll}
        className="inline-flex items-center px-3 py-1 text-sm border rounded-full bg-card text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Clear All
      </button>
    </div>
  );
}
