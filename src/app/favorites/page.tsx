"use client";

import { useFavorite } from "@/context/FavoriteContext";
import { ProductCard, ProductGrid } from "@/components/product";

export default function FavoriteList() {
  const { favorites, loading, error } = useFavorite();

  const products = favorites
    .map((fav) => fav.product)
    .filter((product) => !!product); // guard against undefined 
  
  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">My Favorite Products</h2>

      {loading && <p>Loading favorites...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && products.length === 0 && <p>No favorite products found.</p>}

      <ProductGrid
        products={products}
        onAddToCart={(product) => console.log("Add to cart:", product)}
      />
    </div>
  );
}