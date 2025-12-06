"use client";

import { X, Plus, Minus } from "lucide-react";
import type { OrderItem } from "@/lib/types";
import { Button } from "../ui";
import Image from "next/image";

interface OrderItemListProps {
  items: OrderItem[];
  editable?: boolean;
  showRemove?: boolean;
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
  loading?: boolean;
  className?: string;
}

export default function OrderItemList({
  items,
  editable = false,
  showRemove = false,
  onQuantityChange,
  onRemove,
  loading = false,
  className = "",
}: OrderItemListProps) {
  if (!items || items.length === 0) {
    return (
      <div className={`flex flex-col gap-4 py-4 ${className}`}>
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <p>No items to display</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (itemId: string, delta: number) => {
    const item = items.find((i) => i.id === itemId);
    if (!item || !onQuantityChange) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    onQuantityChange(itemId, newQuantity);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((item) => {
        const subtotal = Number(item.subtotal);
        const unitPrice = Number(item.unitPrice);

        return (
          <div
            key={item.id}
            className="flex flex-col gap-4 py-4 border-b last:border-b-0 sm:flex-row sm:items-center sm:justify-between text-card-foreground"
          >
            {/* LEFT: image + info */}
            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="w-16 h-16 overflow-hidden rounded-md bg-muted sm:w-20 sm:h-20 shrink-0 relative">
                {item.productImage ? (
                  <Image
                    src={item.productImage}
                    alt={item.productName || "Product"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground line-clamp-2">
                  {item.productName || "Unknown Product"}
                </h3>

                {item.variantName && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.variantName}
                  </p>
                )}

                <div className="mt-2 text-sm text-muted-foreground">
                  <span>
                    {item.quantity} × ${unitPrice.toFixed(2)}
                  </span>
                </div>

                {/* Mobile: show subtotal */}
                <div className="mt-2 text-sm font-semibold text-foreground sm:hidden">
                  ${subtotal.toFixed(2)}
                </div>
              </div>
            </div>

            {/* RIGHT: quantity controls + total + remove */}
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
              {/* Quantity Controls (if editable) */}
              {editable && onQuantityChange && (
                <div className="flex items-center gap-2 border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={loading || item.quantity <= 1}
                    aria-label="Decrease quantity"
                    className="h-8 w-8 p-0"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="min-w-[2rem] text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, 1)}
                    disabled={loading}
                    aria-label="Increase quantity"
                    className="h-8 w-8 p-0"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              )}

              {/* Subtotal + Remove */}
              <div className="flex items-center gap-4 sm:gap-2">
                <p className="font-semibold text-foreground hidden sm:block">
                  ${subtotal.toFixed(2)}
                </p>

                {showRemove && onRemove && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(item.id)}
                    disabled={loading}
                    aria-label={`Remove ${item.productName} from list`}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X size={18} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Loading skeleton
export function OrderItemListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-4 py-4 border-b animate-pulse"
        >
          <div className="w-16 h-16 rounded-md bg-muted sm:w-20 sm:h-20 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="w-2/3 h-4 rounded bg-muted" />
            <div className="w-full h-3 rounded bg-muted" />
            <div className="w-1/2 h-3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
