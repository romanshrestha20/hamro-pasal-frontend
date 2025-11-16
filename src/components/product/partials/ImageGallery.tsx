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
  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg aspect-square">
        <Image
          src={images[selectedIndex]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, idx) => (
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
                src={img}
                alt={`${productName} ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
