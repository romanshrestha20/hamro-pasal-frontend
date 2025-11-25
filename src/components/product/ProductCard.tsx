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
  className = "",
}: ProductCardProps) {
  const imageUrl =
    product.image ||
    product.images?.[0]?.url ||
    "/placeholder-product.png";

  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

  return (
    <div
      className={`
        relative flex flex-col h-full p-4 rounded-2xl border border-border 
        bg-card text-card-foreground transition-shadow duration-300 
        hover:shadow-lg group ${className}
      `}
    >
      {/* -------------------------------
          PRODUCT IMAGE + LINK
      -------------------------------- */}
      <Link href={`/products/${product.id}`} className="block">
        <ProductImage
          imageUrl={imageUrl}
          altText={product.name}
          className="object-cover w-full h-40 rounded-xl"
        />

        {/* -------------------------------
            PRODUCT INFO
        -------------------------------- */}
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

      {/* -------------------------------
          ACTION BUTTONS
      -------------------------------- */}
      {showActions && (
        <div className="flex gap-2 pt-3 mt-auto">
          <AddToCartButton productId={product.id} />
          <FavoriteButton productId={product.id} />
        </div>
      )}
    </div>
  );
}
