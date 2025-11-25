"use client";

import { Carousel } from "@/components/layout/Carousel";
import { Product } from "@/lib/types";
import { ProductImage } from "@/components/product/ProductImage";
import Link from "next/link";

interface HomeCarouselProps {
  products: Product[];
}

export default function HomeCarousel({ products }: HomeCarouselProps) {
  return (
    <Carousel maxItems={5}>
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
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="relative flex flex-col items-center justify-center h-48 gap-2 p-4 overflow-hidden transition-colors rounded-lg group hover:bg-muted bg-card"
            aria-label={`View ${product.name}`}
          >
            <ProductImage imageUrl={imageUrl} altText={product.name} />

            {/* Price (always visible) */}
            {price != null && !Number.isNaN(price) && (
              <span className="text-sm font-semibold ">
                ${price.toFixed(2)}
              </span>
            )}

            {/* Hover Overlay */}
            <div
              className=" absolute bottom-3 left-2 max-w-[70%] 
                bg-accent/80 backdrop-blur-sm text-accent-foreground
                p-2 rounded-md opacity-0 group-hover:opacity-100
                transition-opacity duration-200 ease-out space-y-1"
              aria-hidden="true"
            >
              {/* Product Name */}
              <p className="text-sm font-semibold leading-tight line-clamp-2">
                {product.name}
              </p>

              {/* Product Description */}
              {product.description && (
                <p className="text-xs leading-snug text-muted-foreground line-clamp-3">
                  {product.description}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </Carousel>
  );
}
