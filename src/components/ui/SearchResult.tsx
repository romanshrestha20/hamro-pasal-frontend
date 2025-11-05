"use client";

import { Link } from "expo-router";

interface SearchResultProps {
 results: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyText?: string;
}

export function SearchResult({
  results,
  renderItem,
  emptyText = "No results found",
}: SearchResultProps) {
  if (results.length === 0) {
    return <p className="text-gray-500">{emptyText}</p>;
  }

  return (
    <div className="space-y-4">
      {results.map((item) => (
        <div key={item.id} className="border-b border-gray-200 pb-4">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
