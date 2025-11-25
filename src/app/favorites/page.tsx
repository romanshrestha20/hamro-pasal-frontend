"use client";

import { useFavorite } from "@/context/FavoriteContext";
import { ProductGrid } from "@/components/product";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

export default function FavoriteList() {
  const { favorites, loading, error } = useFavorite();

  const products = favorites
    .map((fav) => fav.product)
    .filter((product) => !!product);

  /* -------------------- Loading -------------------- */
  if (loading) return <LoadingState label="Loading favorites..." />;

  /* -------------------- Error ---------------------- */
  if (error)
    return (
      <ErrorState
        message="Failed to load favorites"
        subMessage={error}
        onRetry={() => window.location.reload()}
      />
    );

  /* -------------------- Empty State ---------------- */
  if (!products.length)
    return (
      <div className="p-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          My Favorite Products
        </h2>
        <p className="text-muted-foreground">
          No favorite products found.
        </p>
      </div>
    );

  /* -------------------- Favorites List ------------- */
  return (
    <section className="p-6 transition-colors bg-background">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        My Favorite Products
      </h2>

      <ProductGrid
        products={products}
        onAddToCart={(product) => console.log("Add to cart:", product)}
      />
    </section>
  );
}
