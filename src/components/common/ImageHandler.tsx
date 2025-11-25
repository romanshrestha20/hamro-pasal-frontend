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
 * ImageHandler Component (Theme-Aware)
 * Validates image URLs and provides fallback UI for missing images.
 * Works with Next.js Image component.
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

  // If valid image: render Next.js <Image />
  if (validSrc) {
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

  /* -------------------------------------------------------------
     FALLBACK UI (Theme-Aware)
  ------------------------------------------------------------- */

  const fallbackClass = `
    flex items-center justify-center 
    bg-muted text-muted-foreground 
    border border-border
    ${className}
  `;

  const fallbackFixedSize =
    !fill && width && height ? `w-[${width}px] h-[${height}px]` : "";

  return (
    <div className={`${fallbackClass} ${fallbackFixedSize}`.trim()}>
      {fallbackIcon || <span className="text-sm">{fallbackText}</span>}
    </div>
  );
};

export default ImageHandler;
