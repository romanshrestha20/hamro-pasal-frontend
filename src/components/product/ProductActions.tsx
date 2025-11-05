import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductActionsProps {
  onAddToCart: () => void;
  onWishList: () => void;
  className?: string;
  showLabels?: boolean;
}

export function ProductActions({
  onAddToCart,
  onWishList,
  className = "",
  showLabels = false,
}: ProductActionsProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        onClick={onAddToCart}
        label="Add to Cart"
        className="flex-1"
        aria-label="Add to cart"
      >
        <ShoppingCart className="w-4 h-4" />
        {showLabels && <span className="ml-2">Add to Cart</span>}
      </Button>
      <Button
        variant="outline"
        onClick={onWishList}
        label="Add to Wishlist"
        aria-label="Add to wishlist"
      >
        <Heart className="w-4 h-4" />
      </Button>
    </div>
  );
}
