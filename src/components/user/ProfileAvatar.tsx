import ImageHandler from "../common/ImageHandler";
import { User } from "@/lib/types";

interface ProfileAvatarProps {
  user?: User | null;
  src?: string | null;
  alt: string;
  fallbackText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  uploading?: boolean;
}

const sizeClasses = {
  sm: "w-12 h-12 text-lg",
  md: "w-20 h-20 text-2xl",
  lg: "w-32 h-32 text-4xl",
  xl: "w-40 h-40 text-5xl",
};

const ProfileAvatar = ({
  src,
  alt,
  fallbackText,
  size = "md",
  uploading = false,
  user,
}: ProfileAvatarProps) => {
  const sizeClass = sizeClasses[size];
  const initial =
    alt?.[0]?.toUpperCase() || user?.firstName?.[0]?.toUpperCase() || "?";

  return (
    <div
      className={`relative ${sizeClass} rounded-full overflow-hidden bg-gray-200`}
    >
      {src ? (
        <ImageHandler
          src={src}
          alt={alt}
          fill
          className="object-cover"
          fallbackText={fallbackText || "No Image Available"}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full font-semibold text-gray-500">
          {initial}
        </div>
      )}

      {/* Loading Overlay */}
      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span className="text-xs font-medium text-white">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
