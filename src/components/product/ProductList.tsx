import Image from "next/image";
import type { Product } from "@/lib/types";

interface ProductListProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
  onWishList?: (product: Product) => void;
  className?: string;
  emptyMessage?: string;
}

export function ProductList({
  products = [],
  onAddToCart = () => {},
  onWishList = () => {},
  className = "",
  emptyMessage = "No products found",
}: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {products.map((product) => {
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
            key={product.id}
            className="flex gap-4 p-4 transition-shadow bg-white border rounded-lg hover:shadow-md"
          >
            <div className="relative w-32 h-32 shrink-0">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              {product.description && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
                {product.stock > 0 ? (
                  <span className="text-sm text-green-600">In Stock</span>
                ) : (
                  <span className="text-sm text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
                className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                onClick={() => onWishList(product)}
                className="px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Wishlist
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
