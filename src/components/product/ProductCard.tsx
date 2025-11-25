"use client";

import Link from "next/link";
import { ProductImage } from "./ProductImage";
import { ProductTitle } from "./ProductTitle";
import { ProductPrice } from "./ProductPrice";
import type { Product } from "@/lib/types";
import { FavoriteButton } from "../common/FavoriteButton";
import { AddToCartButton } from "../common/AddToCartButton";

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  showActions = true,
}: ProductCardProps) {
  const imageUrl =
    product.image || product.images?.[0]?.url || "/placeholder-product.png";

  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

  return (
    <div
      className="relative flex flex-col h-full p-4 transition-shadow duration-300 border rounded-2xl border-border bg-card hover:shadow-lg group text-card-foreground"
    >
      {/* Product link + image */}
      <Link href={`/products/${product.id}`} className="block">
        <ProductImage className="object-cover w-full h-40 rounded-xl"  imageUrl={imageUrl} altText={product.name} />

        {/* Details */}
        <div className="mt-3">
          <ProductTitle title={product.name} />

          {product.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}

          <ProductPrice price={price} />
        </div>
      </Link>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 mt-auto">
          <AddToCartButton productId={product.id} />
          <FavoriteButton productId={product.id} />
        </div>
      )}
    </div>
  );
}
