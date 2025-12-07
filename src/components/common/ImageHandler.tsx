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
  const valid =
    src &&
    (src.startsWith("http") || src.startsWith("/") || src.startsWith("blob"));

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

  // Check if image is from localhost/127.0.0.1
  const isLocalhost =
    src && (src.includes("localhost:") || src.includes("127.0.0.1:"));

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      unoptimized={isLocalhost}
    />
  );
};
