import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import HotelCard from "@/components/hotels/HotelCard";
import { useWishlistStore } from "@/store/useWishlistStore";
import { getHotelById } from "@/data/mockHotels";

export default function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.items);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const hotels = wishlist
    .map((id) => getHotelById(id))
    .filter((hotel): hotel is NonNullable<typeof hotel> => Boolean(hotel));

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              Saved Hotels
            </p>
            <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-white">
              Your Wishlist
            </h1>
          </div>
          {hotels.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="rounded-xl"
            >
              Clear Wishlist
            </Button>
          )}
        </div>

        {hotels.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300 mb-6">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="font-semibold text-xl text-neutral-900 dark:text-white mb-2">
              Nothing saved yet
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              Save your favorite hotels as you browse and they’ll appear here.
            </p>
            <Button
              asChild
              className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white"
            >
              <Link to="/search">Browse hotels</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
