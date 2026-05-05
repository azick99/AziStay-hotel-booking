import { Link } from "react-router-dom";
import {
  Wifi,
  Dumbbell,
  Car,
  Waves,
  Utensils,
  Sparkles,
  MapPin,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import WishlistButton from "@/components/hotels/WishlistButton";
import LazyImage from "@/components/ui/LazyImage";

type HotelCardProps = {
  hotel: {
    id: string;
    name: string;
    location: { city: string; country: string };
    stars: number;
    rating: number;
    reviewCount: number;
    pricePerNight: number;
    images: string[];
    amenities: string[];
    badge?: string;
    featured?: boolean;
    category?: string;
  };
};

const amenityConfig: Record<string, { icon: React.ReactNode; label: string }> =
  {
    wifi: { icon: <Wifi className="w-3.5 h-3.5" />, label: "WiFi" },
    gym: { icon: <Dumbbell className="w-3.5 h-3.5" />, label: "Gym" },
    parking: { icon: <Car className="w-3.5 h-3.5" />, label: "Parking" },
    pool: { icon: <Waves className="w-3.5 h-3.5" />, label: "Pool" },
    restaurant: {
      icon: <Utensils className="w-3.5 h-3.5" />,
      label: "Restaurant",
    },
    spa: { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Spa" },
  };

const ratingColor = (r: number) => {
  if (r >= 9) return "bg-emerald-500 text-white";
  if (r >= 7) return "bg-amber-400 text-neutral-900";
  return "bg-neutral-400 text-white";
};

const ratingLabel = (r: number) => {
  if (r >= 9.5) return "Exceptional";
  if (r >= 9) return "Superb";
  if (r >= 8) return "Excellent";
  return "Good";
};

export default function HotelCard({ hotel }: HotelCardProps) {
  const topAmenities = hotel.amenities
    .filter((a) => amenityConfig[a])
    .slice(0, 3);

  return (
    <Link
      to={`/hotel/${hotel.id}`}
      className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-4/3">
        <LazyImage
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          wrapperClassName="absolute inset-0"
        />

        <div className="absolute top-3 right-3 z-10">
          <WishlistButton hotelId={hotel.id} />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

        {/* Stars badge */}
        <div className="absolute top-3 left-3 flex items-center gap-0.5 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 fill-amber-400 text-amber-400"
            />
          ))}
        </div>

        {/* Category badge */}
        {hotel.featured && (
          <div className="absolute top-3 right-3 bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
            Featured
          </div>
        )}

        {/* Location pill on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
          <MapPin className="w-3 h-3" />
          {hotel.location.city}, {hotel.location.country}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name */}
        <h3 className="font-display font-semibold text-base text-neutral-900 dark:text-white leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
          {hotel.name}
        </h3>

        {/* Rating row */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-md",
              ratingColor(hotel.rating),
            )}
          >
            {hotel.rating.toFixed(1)}
          </span>
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            {ratingLabel(hotel.rating)}
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            ({hotel.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Amenity icons */}
        {topAmenities.length > 0 && (
          <div className="flex items-center gap-3">
            {topAmenities.map((key) => {
              const item = amenityConfig[key];
              return (
                <div
                  key={key}
                  title={item.label}
                  className="flex items-center gap-1 text-neutral-400 dark:text-neutral-500 text-xs"
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wide mb-0.5">
              From
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-neutral-900 dark:text-white">
                ${hotel.pricePerNight}
              </span>
              <span className="text-xs text-neutral-400">/night</span>
            </div>
          </div>
          <span className="inline-flex items-center bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
            View Hotel
          </span>
        </div>
      </div>
    </Link>
  );
}
