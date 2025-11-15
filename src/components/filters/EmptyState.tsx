"use client";

import { Search } from "lucide-react";

export default function EmptyState({
  searchQuery,
  selectedCategory,
  onClearSearch,
  onClearCategory,
}: {
  searchQuery?: string;
  selectedCategory?: string;
  onClearSearch: () => void;
  onClearCategory: () => void;
}) {
  return (
    <div className="py-12 text-center">
      <div className="inline-block p-4 mb-4 rounded-full bg-soft-lavender-300">
        <Search className="w-12 h-12 text-gray-400" />
      </div>

      <h3 className="text-xl font-semibold">No products found</h3>

      <p className="mb-4 text-gray-600">
        {searchQuery
          ? `Nothing matches "${searchQuery}"`
          : selectedCategory
            ? `No products in this category`
            : `No products available`}
      </p>

      <div className="flex flex-col justify-center gap-2 sm:flex-row">
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2 text-white bg-blue-600 rounded"
          >
            Clear search
          </button>
        )}

        {selectedCategory && (
          <button
            onClick={onClearCategory}
            className="px-4 py-2 border rounded"
          >
            View all categories
          </button>
        )}
      </div>
    </div>
  );
}
