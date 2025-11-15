"use client";

import { X, Plus, Minus } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui";
import { ProductImage } from "../product";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQty, removeItem, loading } = useCart();

  const imageUrl =
    item.product.image ||
    item.product.images?.[0]?.url ||
    "/placeholder-product.png";
  const toNumber = (v: unknown): number =>
    typeof v === "string" ? parseFloat(v) : typeof v === "number" ? v : 0;
  const unitPrice = toNumber(
    (item as unknown as { unitPrice?: number | string }).unitPrice ??
      item.product?.price
  );

  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 overflow-hidden bg-gray-100 rounded-md shrink-0">
          <ProductImage
            imageUrl={imageUrl}
            aspectRatio="1/1"
            altText={item.product.name}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {item.product.name}
          </h3>
          {item.product.description && (
            <p className="mt-1 text-xs text-gray-500 line-clamp-2">
              {item.product.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-700">
            <span className="font-medium">${unitPrice.toFixed(2)}</span>
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {item.product.stock ?? 0} in stock
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="flex items-center gap-2 overflow-hidden bg-white border rounded-md">
          <Button
            type="button"
            onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
            disabled={loading || item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.product.name}`}
            className="px-3 py-2"
          >
            <Minus size={14} />
          </Button>

          <div className="px-4 text-sm font-medium text-gray-700">
            {item.quantity}
          </div>

          <Button
            type="button"
            onClick={() => updateQty(item.id, item.quantity + 1)}
            disabled={loading}
            aria-label={`Increase quantity of ${item.product.name}`}
            className="px-3 py-2"
          >
            <Plus size={14} />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-900">
            ${(unitPrice * item.quantity).toFixed(2)}
          </div>
          <Button
            type="button"
            onClick={() => removeItem(item.id)}
            disabled={loading}
            className="px-2 text-red-600 bg-white hover:text-red-800"
            aria-label={`Remove ${item.product.name} from cart`}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
