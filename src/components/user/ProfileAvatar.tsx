"use client";

import { ImageHandler } from "@/components/common/ImageHandler";
import type { User } from "@/lib/types";

const ProfileAvatar = ({
  src,
  alt,
  size = "md",
  uploading = false,
}: {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  uploading?: boolean;
}) => {
  const sizeMap = {
    sm: "w-12 h-12 text-lg",
    md: "w-20 h-20 text-xl",
    lg: "w-32 h-32 text-4xl",
    xl: "w-40 h-40 text-5xl",
  };

  const initial = alt.trim()[0]?.toUpperCase() ?? "?";

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-muted ${sizeMap[size]}`}
    >
      {src ? (
        <ImageHandler src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full font-semibold">
          {initial}
        </div>
      )}

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/50">
          Uploading...
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
