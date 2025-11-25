"use client";

import { X, Plus, Minus } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui";
import { ProductImage } from "../product/ProductImage";
import { FavoriteButton } from "../common/FavoriteButton";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQty, removeItem, loading } = useCart();
  const product = item.product;

  if (!product) {
    return (
      <div className="flex flex-col gap-4 py-4 opacity-70 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-md bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="w-2/3 h-4 rounded bg-muted" />
            <div className="w-full h-3 rounded bg-muted" />
            <div className="w-1/2 h-3 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  const imageUrl =
    product.image || product.images?.[0]?.url || "/placeholder-product.png";

  const price =
    typeof product.price === "string" ? parseFloat(product.price) : product.price;

  const total = (price ?? 0) * item.quantity;

  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between text-card-foreground">
      {/* LEFT: image + info */}
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-20 h-20 overflow-hidden rounded-md bg-muted sm:w-24 sm:h-24 shrink-0">
          <ProductImage imageUrl={imageUrl} altText={product.name} aspectRatio="1/1" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground line-clamp-1">
            {product.name}
          </h3>

          {product.description && (
            <p className="mt-1 text-xs line-clamp-2 sm:line-clamp-1 text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* Mobile price */}
          <div className="mt-2 text-sm font-medium text-foreground sm:hidden">
            ${price?.toFixed(2)}
          </div>

          {/* Desktop price + stock */}
          <div className="hidden gap-3 mt-2 text-sm sm:flex text-muted-foreground">
            <span className="font-medium text-foreground">${price?.toFixed(2)}</span>
            <span className="opacity-60">•</span>
            <span className="text-xs">{product.stock ?? 0} in stock</span>
          </div>
        </div>
      </div>

      {/* RIGHT: qty + total + remove */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
        {/* Quantity Control */}
        <div className="flex items-center gap-0 overflow-hidden border rounded-md border-border bg-card">
          <Button
            variant="icon"
            size="sm"
            onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
            disabled={loading || item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </Button>

          <div className="px-3 py-1 text-sm font-medium text-foreground min-w-[32px] text-center">
            {item.quantity}
          </div>

          <Button
            variant="icon"
            size="sm"
            onClick={() => updateQty(item.id, item.quantity + 1)}
            disabled={loading}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </Button>
        </div>

        {/* Total + Remove */}
        <div className="flex items-center gap-4 sm:gap-2">
          <div className="text-sm font-semibold text-foreground">
            ${total.toFixed(2)}
          </div>

          <Button
            variant="icon"
            onClick={() => removeItem(item.id)}
            disabled={loading}
            aria-label="Remove from cart"
            className="hover:bg-error/10 text-error"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Wishlist */}
        <FavoriteButton productId={product.id} />
      </div>
    </div>
  );
}
