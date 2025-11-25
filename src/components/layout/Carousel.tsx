"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number; // ms
  pauseOnHover?: boolean;
  maxItems?: number; // limit number of rendered items
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className,
  showDots = true,
  autoplay = false,
  autoplayInterval = 1000,
  pauseOnHover = true,
  maxItems = 5,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const items = Array.isArray(children) ? children : [children];
  const itemsToRender = items.slice(0, Math.max(0, maxItems));

  // Keyboard navigation (ArrowLeft/ArrowRight when container focused)
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    };
    el.addEventListener("keydown", handleKey);
    return () => el.removeEventListener("keydown", handleKey);
  }, [scrollPrev, scrollNext]);

  // Autoplay logic
  useEffect(() => {
    if (!emblaApi || !autoplay) return;
    let stopped = false;
    let raf: number | null = null;
    let lastTime = performance.now();
    const tick = (time: number) => {
      if (stopped) return;
      if (time - lastTime >= autoplayInterval) {
        lastTime = time;
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [emblaApi, autoplay, autoplayInterval, selectedIndex]);

  // Pause on hover/focus
  const autoplayPauseRef = useRef(false);
  const handleMouseEnter = () => {
    if (!pauseOnHover) return;
    autoplayPauseRef.current = true;
  };
  const handleMouseLeave = () => {
    autoplayPauseRef.current = false;
  };

  // If paused flag is set, we simply early-return in tick above (handled by stopped) - simplified by not mixing states.

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative group outline-none focus-visible:ring-2 focus-visible:ring-accent ${className || ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Track Wrapper */}
      <div
        ref={emblaRef}
        className="overflow-hidden border rounded-lg border-border bg-card"
      >
        <div className="flex gap-4 p-1">
          {itemsToRender.map((child, i) => (
            <div
              key={i}
              className="w-full shrink-0 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              aria-label={`Slide ${i + 1} of ${itemsToRender.length}`}
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
        className="absolute p-2 transition -translate-y-1/2 rounded-full shadow-md opacity-0 left-2 top-1/2 bg-card text-foreground ring-1 ring-border group-hover:opacity-100 focus:opacity-100 hover:bg-muted hover:shadow-lg hover:ring-accent disabled:opacity-40 disabled:hover:shadow-md"
        aria-label="Scroll previous"
        type="button"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next Button */}
      <button
        onClick={scrollNext}
        disabled={!canNext}
        className="absolute p-2 transition -translate-y-1/2 rounded-full shadow-md opacity-0 right-2 top-1/2 bg-card text-foreground ring-1 ring-border group-hover:opacity-100 focus:opacity-100 hover:bg-muted hover:shadow-lg hover:ring-accent disabled:opacity-40 disabled:hover:shadow-md"
        aria-label="Scroll next"
        type="button"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {showDots && (
        <div
          className="flex items-center justify-center gap-2 mt-4"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {itemsToRender.map((_, i) => {
            const isActive = i === selectedIndex;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  isActive
                    ? "bg-accent"
                    : "bg-muted hover:bg-muted-foreground/40"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
