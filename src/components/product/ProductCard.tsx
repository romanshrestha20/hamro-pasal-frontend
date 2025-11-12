"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorite } from "@/context/FavoriteContext";
import { ProductImage } from "./ProductImage";
import { ProductTitle } from "./ProductTitle";
import { ProductPrice } from "./ProductPrice";
import { ProductActions } from "./ProductActions";
import type { Product } from "@/lib/types";
import { Button } from "../ui";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  showActions?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  showActions = true,
}: ProductCardProps) {
  const { toggleFavorite, isFavoritedLocal } = useFavorite();
  const isFavorited = isFavoritedLocal(product.id);

  const imageUrl =
    product.image || product.images?.[0]?.url || "/placeholder-product.png";
  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

  /** Handle wishlist toggle (uses global FavoriteContext) */
  const handleToggleFavorite = (e?: React.MouseEvent) => {
    e?.preventDefault(); // Prevent navigation on click from <Link>
    toggleFavorite(product.id);
  };

  return (
    <div className="relative p-4 transition-shadow duration-300 bg-white border rounded-2xl hover:shadow-lg group">
      {/* --- Product link and image --- */}
      <Link href={`/products/${product.id}`} className="block">
        <ProductImage imageUrl={imageUrl} altText={product.name} />

        {/* --- Favorite button overlay --- */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-3 right-3"
        >
          <Heart
            className={`h-6 w-6 transition ${
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* --- Details --- */}
        <div className="mt-3">
          <ProductTitle title={product.name} />
          {product.description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}
          <ProductPrice price={price} />
        </div>
      </Link>

      {/* --- Actions --- */}
      {showActions && (
        <div className="flex gap-2 mt-3">
          <ProductActions onAddToCart={onAddToCart} />
          <Button
            variant={isFavorited ? "default" : "outline"}
            onClick={() => handleToggleFavorite()}
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
