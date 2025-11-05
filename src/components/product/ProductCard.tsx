import Link from "next/link";
import { ProductActions } from "./ProductActions";
import { ProductImage } from "./ProductImage";
import { ProductPrice } from "./ProductPrice";
import { ProductTitle } from "./ProductTitle";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onWishList: () => void;
  showActions?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onWishList,
  showActions = true,
}: ProductCardProps) {
  const imageUrl =
    product.image || product.images?.[0]?.url || "/placeholder-product.png";
  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

  return (
    <div className="group p-4 border rounded-2xl hover:shadow-lg transition-shadow duration-300 bg-white">
      <Link href={`/products/${product.id}`} className="block">
        <ProductImage imageUrl={imageUrl} altText={product.name} />
        <div className="mt-3">
          <ProductTitle title={product.name} />
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {product.description}
            </p>
          )}
          <ProductPrice price={price} />
        </div>
      </Link>
      {showActions && (
        <div className="mt-3">
          <ProductActions onAddToCart={onAddToCart} onWishList={onWishList} />
        </div>
      )}
    </div>
  );
}
