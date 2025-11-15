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
    <div className="flex flex-wrap items-center gap-2">
      {searchQuery ? (
        <button
          onClick={onClearSearch}
          className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-white border rounded-full hover:bg-gray-50"
        >
          <span>Search: &quot;{searchQuery}&quot;</span>
          <X className="w-4 h-4 text-gray-500" />
        </button>
      ) : null}

      {selectedCategory ? (
        <button
          onClick={onClearCategory}
          className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-white border rounded-full hover:bg-gray-50"
        >
          <span>Category: {categoryName ?? selectedCategory}</span>
          <X className="w-4 h-4 text-gray-500" />
        </button>
      ) : null}

      <button
        onClick={onClearAll}
        className="inline-flex items-center px-3 py-1 text-sm text-gray-700 bg-white border rounded-full hover:bg-gray-50"
      >
        Clear All
      </button>
    </div>
  );
}
