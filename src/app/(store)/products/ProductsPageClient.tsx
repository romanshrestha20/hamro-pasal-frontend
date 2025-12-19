"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { useProductContext } from "@/context/ProductContext";
import { usePagination } from "@/hooks/usePagination";

import ProductFilters, {
  FilterState,
} from "@/components/filters/ProductFilters";
import CategoriesSidebar from "@/components/layout/CategoriesSidebar";
import ViewModeToggle from "@/components/filters/ViewModeToggle";
import ActiveFiltersBar from "@/components/filters/ActiveFilterBar";
import EmptyState from "@/components/filters/EmptyState";
import HomeCarousel from "@/components/layout/HomeCarousel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductList } from "@/components/product/ProductList";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import Pagination from "@/components/common/Pagination";

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    products,
    categories,
    loading,
    error,
    fetchAllProducts,
    fetchProductsByCategory,
  } = useProductContext();

  /* ---------------- URL Search ---------------- */
  const searchQuery = searchParams.get("q") ?? "";

  /* ---------------- Filters ---------------- */
  const [filters, setFilters] = useState<FilterState>({
    categoryId: null,
    search: "",
    sortBy: "newest",
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  /* ---------------- Sync URL → State ---------------- */
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchQuery }));
  }, [searchQuery]);

  /* ---------------- Category ---------------- */
  const handleCategorySelect = async (id: string | null) => {
    setSelectedCategory(id);

    if (!id) {
      fetchAllProducts();
      return;
    }

    const res = await fetchProductsByCategory(id);
    if (!res.success) toast.error(res.error);
  };

  const clearSearch = () => router.push("/products");

  /* ---------------- Filtering ---------------- */
  const filteredProducts = useMemo(() => {
    let list = [...products];
    const activeCategory = selectedCategory ?? filters.categoryId;

    if (activeCategory) {
      list = list.filter((p) =>
        p.categories?.some((c) => c.id === activeCategory)
      );
    }

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.description, ...(p.tags ?? [])].some((f) =>
          f.toLowerCase().includes(q)
        )
      );
    }

    switch (filters.sortBy) {
      case "priceLowHigh":
        return list.sort((a, b) => Number(a.price) - Number(b.price));
      case "priceHighLow":
        return list.sort((a, b) => Number(b.price) - Number(a.price));
      case "nameAZ":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "nameZA":
        return list.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [products, filters, selectedCategory]);

  /* ---------------- Pagination ---------------- */
  const { page, setPage, paginated, totalPages } = usePagination(
    filteredProducts,
    12
  );

  /* ---------------- States ---------------- */
  if (loading) return <LoadingState label="Loading products..." />;

  if (error) {
    return (
      <ErrorState
        message="Failed to load products"
        subMessage={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl bg-background">
      <HomeCarousel products={filteredProducts} />

      {/* Header */}
      <div className="flex items-center justify-between my-6">
        <h2 className="text-2xl font-bold">Products</h2>

        <div className="flex gap-3">
          <ViewModeToggle mode={viewMode} onChange={setViewMode} />
          <ProductFilters
            initialState={{ categoryId: selectedCategory, search: searchQuery }}
            showSearch={false}
            onChange={setFilters}
          />
        </div>
      </div>

      {/* Active Filters */}
      <ActiveFiltersBar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory ?? undefined}
        categoryName={categories.find((c) => c.id === selectedCategory)?.name}
        onClearSearch={clearSearch}
        onClearCategory={() => setSelectedCategory(null)}
        onClearAll={() => {
          setSelectedCategory(null);
          clearSearch();
        }}
      />

      {/* Layout */}
      <div className="flex gap-6">
        <aside className="hidden lg:block">
          <CategoriesSidebar
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </aside>

        <main className="flex-1 min-h-[400px]">
          {!filteredProducts.length ? (
            <EmptyState
              searchQuery={filters.search}
              selectedCategory={selectedCategory ?? undefined}
              onClearSearch={clearSearch}
              onClearCategory={() => setSelectedCategory(null)}
            />
          ) : viewMode === "grid" ? (
            <ProductGrid products={paginated} columns={4} />
          ) : (
            <ProductList products={paginated} />
          )}
        </main>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
