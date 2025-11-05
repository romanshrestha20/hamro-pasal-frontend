import Image from "next/image";
import type { Product } from "@/lib/types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onWishList: (product: Product) => void;
  className?: string;
  emptyMessage?: string;
}

export function ProductList({
  products,
  onAddToCart,
  onWishList,
  className = "",
  emptyMessage = "No products found",
}: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
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
            className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
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
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => onWishList(product)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
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
