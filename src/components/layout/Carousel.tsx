"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
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
    queueMicrotask(onSelect); 
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className={`relative group ${className || ""}`}>
      {/* Wrapper */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {children.map((child, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={scrollPrev}
        disabled={!canPrev}
        className="absolute p-2 transition -translate-y-1/2 bg-white rounded-full shadow-lg opacity-0  left-2 top-1/2 dark:bg-neutral-900 hover:scale-110 hover:shadow-xl disabled:opacity-30 disabled:hover:scale-100 group-hover:opacity-100"
        aria-label="Scroll previous"
        type="button"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next Button */}
      <button
        onClick={scrollNext}
        disabled={!canNext}
        className="absolute p-2 transition -translate-y-1/2 bg-white rounded-full shadow-lg opacity-0  right-2 top-1/2 dark:bg-neutral-900 hover:scale-110 hover:shadow-xl disabled:opacity-30 disabled:hover:scale-100 group-hover:opacity-100"
        aria-label="Scroll next"
        type="button"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
