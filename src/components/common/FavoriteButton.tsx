import { useFavorite } from "@/context/FavoriteContext";
import { useAuth } from "@/hooks/useAuth";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast/headless";

interface FavoriteButtonProps {
  className?: string;
  productId: string;
  onWishList?: (productId: string) => void;
}

export const FavoriteButton = ({
  className,
  productId,
}: FavoriteButtonProps) => {
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavoritedLocal } = useFavorite();
  const isFavorited = isFavoritedLocal(productId);

  const handleToggleFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    toggleFavorite(productId);

    if (!isAuthenticated) {
      return toast.error("You must be logged in to save favorites");
    }
  };
  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className="absolute top-3 right-3"
    >
      <Heart
        className={`h-6 w-6 transition ${
          isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
        }`}
      />
    </button>
  );
};
