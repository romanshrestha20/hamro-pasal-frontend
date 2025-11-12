import Image from "next/image";
import React from "react";

 interface ImageHandlerProps {
   src?: string | null;
   alt: string;
   width?: number;
   height?: number;
   fill?: boolean;
   className?: string;
   priority?: boolean;
   fallbackIcon?: React.ReactNode;
   fallbackText?: string;
 }

/**
 * ImageHandler Component
 * Validates image URLs and provides fallback UI for invalid/missing images
 * Works with Next.js Image component
 */
export const ImageHandler: React.FC<ImageHandlerProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  fallbackIcon,
  fallbackText = "No Image",
}) => {
  // Validate image URL - must be absolute URL or start with /
  const isValidImageUrl = (url: string | null | undefined): url is string => {
    if (!url || typeof url !== "string") return false;
    return (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    );
  };

  const validSrc = isValidImageUrl(src) ? src : null;

  // If we have a valid image, render Next.js Image
  if (validSrc) {
    // For local backend images, use unoptimized to avoid Next.js image optimization issues
    const isLocalBackend =
      validSrc.includes("localhost:4000") ||
      validSrc.includes("127.0.0.1:4000");

    return (
      <Image
        src={validSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={className}
        priority={priority}
        unoptimized={isLocalBackend}
      />
    );
  }

  // Fallback UI for invalid/missing images
  const fallbackClassName = fill
    ? `flex items-center justify-center bg-gray-200 ${className}`
    : `flex items-center justify-center bg-gray-200 ${className}`;

  const fallbackStyle =
    !fill && width && height ? `w-[${width}px] h-[${height}px]` : "";

  return (
    <div className={`${fallbackClassName} ${fallbackStyle}`.trim()}>
      {fallbackIcon || (
        <span className="text-sm text-gray-400">{fallbackText}</span>
      )}
    </div>
  );
};

export default ImageHandler;
