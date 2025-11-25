import { ShoppingCart } from "lucide-react";
import { AddToCartButton } from "@/components/common/AddToCartButton";

interface ProductActionsProps {
  productId: string;
  quantity?: number;
  onAddToCart?: (productId: string, quantity: number) => void;
  className?: string;
  showLabels?: boolean;
}

export function ProductActions({
  productId,
  quantity = 1,
  onAddToCart,
  className = "",
  showLabels = false,
}: ProductActionsProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <AddToCartButton
        productId={productId}
        quantity={quantity}
        className="inline-flex items-center gap-2"
        onAddToCart={onAddToCart}
      />
      {showLabels && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </div>
      )}
    </div>
  );
}
