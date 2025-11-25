"use client";
import Image from "next/image";
import React from "react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  productName,
  selectedIndex,
  onSelect,
}) => {
  // Fallback to placeholder if src is empty, null, undefined
  const safeSrc =
    images[selectedIndex]?.trim() && images[selectedIndex] !== ""
      ? images[selectedIndex]
      : "/placeholder-product.png";

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg aspect-square">
        <Image
          src={safeSrc}
          alt={productName}
          fill
          className="object-cover"
          priority
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, idx) => {
            const thumb =
              img?.trim() && img !== "" ? img : "/placeholder-product.png";
            return (
              <button
                key={idx}
                onClick={() => onSelect(idx)}
                className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                  selectedIndex === idx
                    ? "border-blue-600 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-label={`Select image ${idx + 1}`}
                type="button"
              >
                <Image
                  src={thumb}
                  alt={`${productName} ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
