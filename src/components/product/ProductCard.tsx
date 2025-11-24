"use client";

import Link from "next/link";
import { ProductImage } from "./ProductImage";
import { ProductTitle } from "./ProductTitle";
import { ProductPrice } from "./ProductPrice";
import { ProductActions } from "./ProductActions";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { FavoriteButton } from "../common/FavoriteButton";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  showActions?: boolean;
  onWishList?: (product: Product) => void;
  className?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  showActions = true,
  onWishList,
}: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  // Compose add-to-cart handler: prefer prop, else use context
  const handleAddToCart = () => {
    if (onAddToCart) return onAddToCart();
    return addToCart(product.id, 1);
  };

  // Determine image URL and price
  const imageUrl =
    product.image || product.images?.[0]?.url || "/placeholder-product.png";
  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

  return (
    <div className="relative p-4 transition-shadow duration-300 bg-white border rounded-2xl hover:shadow-lg group">
      {/* Product link and image */}
      <Link href={`/products/${product.id}`} className="block">
        <ProductImage imageUrl={imageUrl} altText={product.name} />

        <FavoriteButton productId={product.id} />

        {/* )} */}

        {/* Details */}
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

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 mt-3">
          {/* prefer a passed handler so pages can override (analytics, toasts), else use cart context */}
          <ProductActions onAddToCart={handleAddToCart} />
        </div>
      )}
    </div>
  );
}
