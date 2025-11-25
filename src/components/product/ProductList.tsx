import Image from "next/image";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { FavoriteButton } from "../common/FavoriteButton";

interface ProductListProps {
  products?: Product[];
  className?: string;
  emptyMessage?: string;
}

export function ProductList({
  products = [],
  className = "",
  emptyMessage = "No products found",
}: ProductListProps) {
  if (!products.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
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

        const inStock = product.stock > 0;

        return (
          <div
            key={product.id}
            className="flex gap-4 p-4 transition-shadow border rounded-lg  border-border bg-card text-card-foreground hover:shadow-md"
          >
            {/* -------------------------------
                LEFT: Product Image
            -------------------------------- */}
            <div className="relative w-32 h-32 shrink-0">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>

            {/* -------------------------------
                RIGHT: Content + Actions
            -------------------------------- */}
            <div className="flex flex-col justify-between flex-1">
              {/* --- Title + Stock --- */}
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {product.name}
                </h3>

                <span
                  className={`text-sm ${
                    inStock ? "text-success" : "text-error"
                  }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>

                {product.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>

              {/* --- Price + Buttons --- */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-foreground">
                  ${price.toFixed(2)}
                </span>

                <div className="flex items-center gap-3">
                  <Button disabled={!inStock}>Add to Cart</Button>
                  <FavoriteButton productId={product.id} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
