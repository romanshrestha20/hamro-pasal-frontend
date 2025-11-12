import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useFavorite } from "@/context/FavoriteContext";

interface ProductActionsProps {
  onAddToCart: () => void;

  className?: string;
  showLabels?: boolean;
}

export function ProductActions({
  onAddToCart,
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
    </div>
  );
}


