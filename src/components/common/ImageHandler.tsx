"use client";

import Image from "next/image";

export const ImageHandler = ({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  fallbackText = "No Image",
}: {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  fallbackText?: string;
}) => {
  // Only allow valid URLs: local, blob, or Cloudinary
  const valid =
    src &&
    (src.startsWith("blob") ||
      src.startsWith("/") ||
      src.startsWith("https://res.cloudinary.com"));

  if (!valid) {
    return (
      <div
        className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
        style={{
          width: fill ? "100%" : width,
          height: fill ? "100%" : height,
        }}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <Image
      src={src!}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      loading="eager" // optional for above-the-fold images
    />
  );
};
