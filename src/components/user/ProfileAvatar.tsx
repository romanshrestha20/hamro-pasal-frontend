import ImageHandler from "../common/ImageHandler";

interface ProfileAvatarProps {
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
}: ProfileAvatarProps) => {
  const sizeClass = sizeClasses[size];
  const initial = alt?.[0]?.toUpperCase() || "U";

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
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold">
          {initial}
        </div>
      )}

      {/* Loading Overlay */}
      {uploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-white text-xs font-medium">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
