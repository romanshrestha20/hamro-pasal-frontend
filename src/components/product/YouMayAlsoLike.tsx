"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/lib/types/Product";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface YouMayAlsoLikeProps {
  products: Product[];
  categoryId?: string;
  productId: string;
}

export default function YouMayAlsoLike({
  products,
  categoryId,
  productId,
}: YouMayAlsoLikeProps) {
  const related = useMemo(() => {
    if (!products?.length) return [];
    return products
      .filter((p) => {
        if (p.id === productId) return false;
        if (!categoryId) return true;
        return p.categories?.some((c) => c.id === categoryId);
      })
      .slice(0, 8);
  }, [products, productId, categoryId]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Defer initial select to next microtask to avoid synchronous setState warning
    queueMicrotask(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!related.length) return null;

  return (
    <section aria-label="Recommended products" className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">You May Also Like</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Scroll previous products"
            className="p-2 text-gray-600 transition-colors rounded-md disabled:opacity-30 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Scroll next products"
            className="p-2 text-gray-600 transition-colors rounded-md disabled:opacity-30 hover:bg-gray-100"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {related.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_75%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
