"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductGrid, ProductList } from "@/components/product";
import { useProductContext } from "@/context/ProductContext";
import { Search, Grid3x3, List, X } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import CategoriesSidebar from "@/components/layout/CategoriesSidebar";
import ProductFilters, {
  FilterState,
} from "@/components/filters/ProductFilters";

export default function ProductsPage() {
  const { products, categories, loading, error } = useProductContext();
  const { fetchProductsByCategory, fetchAllProducts } = useProductContext();

  const [filters, setFilters] = useState<FilterState>({
    categoryId: null,
    sortBy: "newest",
    search: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Derive search query from URL params
  const searchQuery = searchParams.get("q") || "";

  const handleAddToCart = (product: Product) => {
    // TODO: Integrate with cart context when available
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishList = (product: Product) => {
    // TODO: Implement wishlist functionality
    toast.success(`${product.name} added to wishlist!`);
  };

  const clearSearch = () => {
    router.push("/products");
  };

  const handleCategorySelect = async (categoryId: string | null) => {
    setSelectedCategory(categoryId);

    if (!categoryId) {
      await fetchAllProducts();
    } else {
      const response = await fetchProductsByCategory(categoryId);
      if (!response.success) toast.error(response.error);
    }
  };
  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (filters.categoryId || selectedCategory) {
      filtered = filtered.filter((p) =>
        p.categories?.some(
          (cat) => cat.id === (selectedCategory || filters.categoryId)
        )
      );
    }

    // Filter by search query
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sorting products
    switch (filters.sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "priceLowHigh":
      case "price-asc":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "priceHighLow":
      case "price-desc":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "nameAZ":
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, filters]);

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-b-2 rounded-full animate-spin border-bright-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <div className="inline-block p-4 mb-4 rounded-full bg-vivid-red-100 dark:bg-vivid-red-900/30">
            <svg
              className="w-12 h-12 text-vivid-red-600 dark:text-vivid-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-vivid-red-600 dark:text-vivid-red-400">
            Error loading products
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        {/* <h1 className="mb-4 text-3xl font-bold text-english-violet-500 dark:text-antique-white-500">
          Products
        </h1> */}

        {/* View Toggle */}
        <div className="flex justify-end mb-auto">
          <div className="flex gap-2 p-1 border rounded-lg bg-soft-lavender-200 dark:bg-gray-800 border-soft-lavender-400 dark:border-gray-700">
            <Button
              label="Grid"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-bright-blue-500 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-soft-lavender-300 dark:hover:bg-gray-700"
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 className="w-4 h-4" />
              Grid
            </Button>
            <Button
              label="List"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-bright-blue-500 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-soft-lavender-300 dark:hover:bg-gray-700"
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
              List
            </Button>
            <ProductFilters
              onChange={(f) => {
                setFilters(f);
              }}
              showSearch={false}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>

          {/* Active Filters */}
          {(searchQuery || selectedCategory) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-400 dark:text-gray-500">•</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-sm border rounded-full bg-bright-blue-100 dark:bg-bright-blue-900/30 text-bright-blue-700 dark:text-bright-blue-400 border-bright-blue-300 dark:border-bright-blue-700">
                  <Search className="w-3 h-3" />
                  Search: &quot;{searchQuery}&quot;
                  <button
                    onClick={clearSearch}
                    className="ml-1 transition-colors hover:text-bright-blue-800 dark:hover:text-bright-blue-300"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-sm border rounded-full bg-pale-periwinkle-200 dark:bg-pale-periwinkle-900/30 text-bright-blue-700 dark:text-pale-periwinkle-400 border-pale-periwinkle-300 dark:border-pale-periwinkle-700">
                  Category:{" "}
                  {categories.find((c) => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-1 transition-colors hover:text-bright-blue-800 dark:hover:text-pale-periwinkle-300"
                    aria-label="Clear category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {(searchQuery || selectedCategory) && (
                <button
                  onClick={() => {
                    clearSearch();
                    setSelectedCategory(null);
                  }}
                  className="text-sm text-gray-600 underline transition-colors dark:text-gray-400 hover:text-bright-blue-600 dark:hover:text-bright-blue-400"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <CategoriesSidebar
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* Products Grid/List */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <div className="inline-block p-4 mb-4 rounded-full bg-soft-lavender-300 dark:bg-gray-800">
                <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                No products found
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                {searchQuery ? (
                  <>
                    We couldn&apos;t find any products matching &quot;
                    {searchQuery}&quot;
                    {selectedCategory && " in this category"}
                  </>
                ) : selectedCategory ? (
                  "No products available in this category"
                ) : (
                  "No products available at the moment"
                )}
              </p>
              {(searchQuery || selectedCategory) && (
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="px-4 py-2 text-white transition-colors rounded-lg shadow-sm bg-bright-blue-600 dark:bg-bright-blue-500 hover:bg-bright-blue-700 dark:hover:bg-bright-blue-600"
                    >
                      Clear search
                    </button>
                  )}
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="px-4 py-2 text-gray-700 transition-colors border rounded-lg dark:text-gray-300 border-soft-lavender-500 dark:border-gray-600 hover:bg-soft-lavender-200 dark:hover:bg-gray-800"
                    >
                      View all categories
                    </button>
                  )}
                </div>
              )}
            </div>
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
        </main>
      </div>
    </div>
  );
}
