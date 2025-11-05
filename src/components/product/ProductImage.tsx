import Image from "next/image";

type AllowedAspect = "1/1" | "4/3" | "3/2" | "16/9";

interface ProductImageProps {
  imageUrl: string;
  altText?: string;
  aspectRatio?: AllowedAspect; // constrained to known ratios for Tailwind classes
  className?: string;
}

const ratioToClass: Record<AllowedAspect, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
};

export const ProductImage = ({
  imageUrl,
  altText = "Product Image",
  aspectRatio = "1/1",
  className = "",
}: ProductImageProps) => {
  const aspectClass = ratioToClass[aspectRatio] || "aspect-square";
  return (
    <div className={`relative w-full ${aspectClass} ${className}`}>
      <Image src={imageUrl} alt={altText} fill className="object-cover" />
    </div>
  );
};
