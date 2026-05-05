import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  hotelId: string;
  className?: string;
}

export default function WishlistButton({
  hotelId,
  className,
}: WishlistButtonProps) {
  const isSaved = useWishlistStore((state) => state.items.includes(hotelId));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(hotelId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full p-2 transition-all duration-200 shadow-sm",
        isSaved
          ? "bg-white text-rose-500 shadow-lg hover:bg-white"
          : "bg-black/60 text-white hover:bg-black/70",
        className,
      )}
      aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn("w-5 h-5", isSaved ? "fill-current" : "stroke-current")}
      />
    </button>
  );
}
