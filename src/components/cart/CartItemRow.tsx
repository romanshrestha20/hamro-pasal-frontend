"use client";

import { X, Plus, Minus } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui";
import { ProductImage } from "../product";
import { FavoriteButton } from "../common/FavoriteButton";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQty, removeItem, loading } = useCart();
  const product = item.product as Partial<CartItem["product"]> | undefined;

  const imageUrl =
    product?.image || product?.images?.[0]?.url || "/placeholder-product.png";
  const toNumber = (v: unknown): number =>
    typeof v === "string" ? parseFloat(v) : typeof v === "number" ? v : 0;
  const unitPrice = toNumber(
    (item as unknown as { unitPrice?: number | string }).unitPrice ??
      product?.price
  );

  if (!product) {
    return (
      <div className="flex flex-col gap-4 py-4 opacity-70 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 bg-gray-100 rounded-md" />
          <div className="flex-1 space-y-2">
            <div className="w-2/3 h-4 bg-gray-200 rounded" />
            <div className="w-full h-3 bg-gray-200 rounded" />
            <div className="w-1/2 h-3 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: image + info */}
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-20 h-20 overflow-hidden bg-gray-100 rounded-md sm:w-24 sm:h-24 shrink-0">
          <ProductImage
            imageUrl={imageUrl}
            aspectRatio="1/1"
            altText={product.name || "Product"}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">
            {product.name}
          </h3>

          {product.description && (
            <p className="mt-1 text-xs text-gray-500 line-clamp-2 sm:line-clamp-1">
              {product.description}
            </p>
          )}

          {/* Price under title on mobile */}
          <div className="mt-2 text-sm font-medium text-gray-900 sm:hidden">
            ${unitPrice.toFixed(2)}
          </div>

          <div className="items-center hidden gap-3 mt-2 text-sm text-gray-700 sm:flex">
            <span className="font-medium">${unitPrice.toFixed(2)}</span>
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {product.stock ?? 0} in stock
            </span>
          </div>
        </div>
      </div>

      {/* Right: qty + total + remove */}
      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-2">
        {/* Quantity control (bigger touch target on mobile) */}
        <div className="flex items-center gap-1 overflow-hidden bg-white border rounded-md">
          <Button
            type="button"
            onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
            disabled={loading || item.quantity <= 1}
            aria-label={`Decrease quantity of ${product.name}`}
            className="px-3 py-2 sm:px-2"
          >
            <Minus size={16} />
          </Button>

          <div className="px-3 py-1 text-sm font-medium text-gray-700 min-w-[2rem] text-center">
            {item.quantity}
          </div>

          <Button
            type="button"
            onClick={() => updateQty(item.id, item.quantity + 1)}
            disabled={loading}
            aria-label={`Increase quantity of ${product.name}`}
            className="px-3 py-2 sm:px-2"
          >
            <Plus size={16} />
          </Button>
        </div>

        {/* Price total + remove button */}
        <div className="flex items-center gap-4 sm:gap-2">
          <div className="text-sm font-semibold text-gray-900">
            ${(unitPrice * item.quantity).toFixed(2)}
          </div>

          <Button
            type="button"
            onClick={() => removeItem(item.id)}
            disabled={loading}
            className="p-2 text-red-600 bg-white hover:text-red-800"
            aria-label={`Remove ${product.name} from cart`}
          >
            <X size={18} />
          </Button>
        </div>
        {product?.id && <FavoriteButton productId={product.id} />}
      </div>
    </div>
  );
}
