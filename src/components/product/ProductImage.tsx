import Image from "next/image";

type AllowedAspect = "1/1" | "4/3" | "3/2" | "16/9";

interface ProductImageProps {
  imageUrl: string;
  altText?: string;
  aspectRatio?: AllowedAspect;
  className?: string;
  priority?: boolean;
}

const ratioToClass: Record<AllowedAspect, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
};

export const ProductImage = ({
  imageUrl,
  altText = "Product image",
  aspectRatio = "1/1",
  className = "",
  priority = false,
}: ProductImageProps) => {
  const aspectClass = ratioToClass[aspectRatio] || "aspect-square";

  // Fallback for missing/invalid URLs
  const validUrl =
    typeof imageUrl === "string" && imageUrl.trim() !== ""
      ? imageUrl
      : "/placeholder-product.png";

  // Disable Next.js optimization for local backend images
  const shouldUnoptimize =
    validUrl.includes("localhost") || validUrl.includes("127.0.0.1");

  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${aspectClass} ${className}`}>
      <Image
        src={validUrl}
        alt={altText}
        fill
        priority={priority}
        unoptimized={shouldUnoptimize}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
};
