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
            className="relative flex flex-col items-center justify-center h-48 gap-2 p-4 overflow-hidden transition bg-gray-100 rounded-lg group hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            aria-label={`View ${product.name}`}
          >
            <ProductImage imageUrl={imageUrl} altText={product.name} />

            {/* Price (always visible) */}
            {price != null && !Number.isNaN(price) && (
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                ${price.toFixed(2)}
              </span>
            )}

            {/* Hover Overlay */}
            <div
              className="absolute bottom-3 left-2 max-w-[70%] bg-black/70 backdrop-blur-sm text-white p-2 rounded-md 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out space-y-1"
              aria-hidden="true"
            >
              {/* Product Name */}
              <p className="text-sm font-semibold leading-tight line-clamp-2">
                {product.name}
              </p>

              {/* Product Description */}
              {product.description && (
                <p className="text-xs leading-snug text-gray-200 line-clamp-3">
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
