"use client";

import { useState, useMemo } from "react";
import { useProductContext } from "@/context/ProductContext";
import CategoriesSidebar from "@/components/layout/CategoriesSidebar";
import { SortDropdown } from "./SortDropdown";
import SearchBar from "./SearchBar";

export interface FilterState {
  categoryId: string | null;
  sortBy:
    | "priceLowHigh"
    | "priceHighLow"
    | "nameAZ"
    | "nameZA"
    | "newest"
    | string;
  search: string;
}

interface ProductFiltersProps {
  onChange?: (filters: FilterState) => void;
  initialState?: Partial<FilterState>;
  showSidebar?: boolean;
  showSearch?: boolean;
}

export default function ProductFilters({
  onChange,
  initialState = {},
  showSidebar = false,
  showSearch = true,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categoryId: initialState.categoryId || null,
    sortBy: initialState.sortBy || "newest",
    search: initialState.search || "",
  });

  const handleFilterChange = (updated: Partial<FilterState>) => {
    const newFilters = {
      ...filters,
      ...updated,
    };
    setFilters(newFilters);
    if (onChange) {
      onChange(newFilters);
    }
  };
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
      {showSidebar && (
        <CategoriesSidebar
          selectedCategory={filters.categoryId}
          onCategorySelect={(categoryId) => handleFilterChange({ categoryId })}
        />
      )}

      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {showSearch && (
            <SearchBar
              placeholder="Search products..."
              defaultValue={filters.search}
              onSearch={(query: string) =>
                handleFilterChange({ search: query })
              }
              className="flex-1"
            />
          )}
          <SortDropdown
            value={filters.sortBy}
            onChange={(sortBy) => handleFilterChange({ sortBy })}
          />
        </div>
      </div>
    </div>
  );
}
