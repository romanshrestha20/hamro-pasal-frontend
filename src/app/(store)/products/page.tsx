"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useProductContext } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useFavorite } from "@/context/FavoriteContext";

import toast from "react-hot-toast";

import ProductFilters, { FilterState } from "@/components/filters/ProductFilters";
import CategoriesSidebar from "@/components/layout/CategoriesSidebar";
import ViewModeToggle from "@/components/filters/ViewModeToggle";
import ActiveFiltersBar from "@/components/filters/ActiveFilterBar";
import EmptyState from "@/components/filters/EmptyState";

import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductList } from "@/components/product/ProductList";

import HomeCarousel from "@/components/layout/HomeCarousel";

/* ================================================================
   PAGE: Products
================================================================= */
export default function ProductsPage() {
  const router = useRouter();

  const { products, categories, loading, error } = useProductContext();
  const { fetchProductsByCategory, fetchAllProducts } = useProductContext();

  /* ================================================================
     Search Query from URL
  ================================================================= */
  const [searchQuery, setSearchQuery] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get("q") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    const handler = () => {
      try {
        const q = new URLSearchParams(window.location.search).get("q") || "";
        setSearchQuery(q);
      } catch {
        setSearchQuery("");
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  /* ================================================================
     Filter State
  ================================================================= */
  const [filters, setFilters] = useState<FilterState>({
    categoryId: null,
    search: "",
    sortBy: "newest",
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /* ================================================================
     View Mode
  ================================================================= */
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  /* ================================================================
     Clear Search
  ================================================================= */
  const clearSearch = () => {
    router.push("/products");
    setSearchQuery("");
    setFilters((prev) => ({ ...prev, search: "" }));
  };

  /* ================================================================
     Category Select
  ================================================================= */
  const handleCategorySelect = async (id: string | null) => {
    setSelectedCategory(id);

    if (!id) return fetchAllProducts(); // Reset

    const res = await fetchProductsByCategory(id);
    if (!res.success) toast.error(res.error);
  };

  /* ================================================================
     Filter + Sort Logic
  ================================================================= */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    const activeCategory = selectedCategory || filters.categoryId;

    if (activeCategory) {
      list = list.filter((p) =>
        p.categories?.some((cat) => cat.id === activeCategory)
      );
    }

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.description, ...(p.tags || [])].some((field) =>
          field.toLowerCase().includes(q)
        )
      );
    }

    switch (filters.sortBy) {
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "priceLowHigh":
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "priceHighLow":
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "nameAZ":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return list;
  }, [products, filters, selectedCategory]);

  /* ================================================================
     Loading States
  ================================================================= */
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="w-10 h-10 border-2 border-blue-600 rounded-full border-b-transparent animate-spin" />
        <p className="mt-4 text-gray-500">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-semibold text-red-500">
          Failed to load products
        </p>
        <p className="text-gray-500">{error}</p>
      </div>
    );

  /* ================================================================
     MAIN UI
  ================================================================= */
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      {/* ----------------- Hero Carousel ----------------- */}
      <div className="mb-10">
        <HomeCarousel products={filteredProducts} />
      </div>

      {/* ----------------- Top Filter Controls ----------------- */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Products</h2>

        <div className="flex items-center gap-3 p-2 bg-card text-card-foreground">
          <ViewModeToggle mode={viewMode} onChange={setViewMode} />

          <ProductFilters
            initialState={{
              categoryId: selectedCategory,
              search: searchQuery,
            }}
            showSearch={false}
            onChange={setFilters}
          />
        </div>
      </div>

      {/* ----------------- Active Filters ----------------- */}
      <ActiveFiltersBar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory || undefined}
        categoryName={categories.find((c) => c.id === selectedCategory)?.name}
        onClearSearch={clearSearch}
        onClearCategory={() => setSelectedCategory(null)}
        onClearAll={() => {
          setSelectedCategory(null);
          clearSearch();
        }}
      />

      {/* ----------------- Main Layout ----------------- */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <CategoriesSidebar
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* Product Area */}
        <div className="flex-1 min-h-[400px]">
          {filteredProducts.length === 0 ? (
            <EmptyState
              searchQuery={filters.search}
              selectedCategory={selectedCategory || undefined}
              onClearSearch={clearSearch}
              onClearCategory={() => setSelectedCategory(null)}
            />
          ) : viewMode === "grid" ? (
            <ProductGrid products={filteredProducts} columns={4} />
          ) : (
            <ProductList products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
