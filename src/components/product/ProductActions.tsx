import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
  const handleAddToCart = () => {
    // Prefer caller's handler (e.g., ProductCard) which knows the product id
    onAddToCart();
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        onClick={handleAddToCart}
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
