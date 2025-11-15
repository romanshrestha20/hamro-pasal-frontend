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

import type { Product } from "@/lib/types";
import { Search } from "lucide-react";

export default function ProductsPage() {
  const router = useRouter();

  const { products, categories, loading, error } = useProductContext();
  const { fetchProductsByCategory, fetchAllProducts } = useProductContext();
  const { addToCart } = useCart();
  const { addFavorite } = useFavorite();

  /* -------------------------------
     URL Search Query
  --------------------------------*/
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

  /* -------------------------------
     Filter State
  --------------------------------*/
  const [filters, setFilters] = useState<FilterState>({
    categoryId: null,
    search: "",
    sortBy: "newest",
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /* -------------------------------
     View Mode
  --------------------------------*/
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  /* -------------------------------
     Add to Cart + Wishlist
  --------------------------------*/
  const handleAddToCart = async (product: Product) => {
    const res = await addToCart(product.id, 1);
    res.success
      ? toast.success(`${product.name} added to cart!`)
      : toast.error(res.error);
  };

  const handleWishList = async (product: Product) => {
    const res = await addFavorite(product.id);
    res.success
      ? toast.success(`${product.name} added to wishlist!`)
      : toast.error(res.error);
  };

  /* -------------------------------
     Clear Search
  --------------------------------*/
  const clearSearch = () => {
    router.push("/products");
    setSearchQuery("");
    setFilters((prev) => ({ ...prev, search: "" }));
  };

  /* -------------------------------
     Category Select
  --------------------------------*/
  const handleCategorySelect = async (id: string | null) => {
    setSelectedCategory(id);
    if (!id) return fetchAllProducts();

    const res = await fetchProductsByCategory(id);
    if (!res.success) toast.error(res.error);
  };

  /* -------------------------------
     Filter + Sort Logic
  --------------------------------*/
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

  /* -------------------------------
     Loading
  --------------------------------*/
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="w-10 h-10 border-2 border-blue-600 rounded-full border-b-transparent animate-spin"></div>
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

  /* -------------------------------
     Main UI
  --------------------------------*/
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* View mode toggle */}
        <ViewModeToggle mode={viewMode} onChange={setViewMode} />

        {/* Filters */}
        <ProductFilters
          initialState={{
            categoryId: selectedCategory,
            search: searchQuery,
          }}
          showSearch={false}
          onChange={setFilters}
        />
      </div>

      {/* Active Filters */}
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

      <div className="flex flex-col gap-8 mt-8 lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <CategoriesSidebar
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* Product List / Grid */}
        <div className="flex-1 min-h-[400px]">
          {filteredProducts.length === 0 ? (
            <EmptyState
              searchQuery={filters.search}
              selectedCategory={selectedCategory || undefined}
              onClearSearch={clearSearch}
              onClearCategory={() => setSelectedCategory(null)}
            />
          ) : viewMode === "grid" ? (
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onWishList={handleWishList}
              columns={4}
            />
          ) : (
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onWishList={handleWishList}
            />
          )}
        </div>
      </div>
    </div>
  );
}
