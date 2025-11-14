"use client";

import type { ReactNode } from "react";

type SearchResultProps = {
  results?: any[];
  renderItem: (item: any) => ReactNode;
  emptyText?: string;
  keyExtractor?: (item: any, index: number) => string | number;
};

export function SearchResult({
  results = [],
  renderItem,
  emptyText = "No results found",
  keyExtractor,
}: SearchResultProps) {
  if (!results || results.length === 0) {
    return <p className="text-gray-500">{emptyText}</p>;
  }

  return (
    <div className="space-y-4">
      {results.map((item, idx) => {
        const key = keyExtractor?.(item, idx) ?? item?.id ?? idx;
        return (
          <div key={String(key)} className="pb-4 border-b border-gray-200">
            {renderItem(item)}
          </div>
        );
      })}
    </div>
  );
}
