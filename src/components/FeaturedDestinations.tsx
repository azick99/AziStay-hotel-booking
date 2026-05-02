import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    city: "Santorini",
    country: "Greece",
    flag: "🇬🇷",
    image:
      "https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=1200",
    hotelCount: 142,
  },
  {
    city: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    hotelCount: 318,
  },
  {
    city: "Kyoto",
    country: "Japan",
    flag: "🇯🇵",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    hotelCount: 207,
  },
  {
    city: "Marrakech",
    country: "Morocco",
    flag: "🇲🇦",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80",
    hotelCount: 95,
  },
  {
    city: "New York",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    hotelCount: 524,
  },
  {
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    hotelCount: 276,
  },
];

export default function FeaturedDestinations() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-500 mb-2">
              Explore the world
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Popular Destinations
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm sm:text-base">
              Hand-picked locations loved by our travelers
            </p>
          </div>
          <button
            onClick={() => navigate("/search")}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-3 transition-all duration-200 shrink-0"
          >
            View all destinations <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {destinations.map((dest) => (
            <button
              key={dest.city}
              onClick={() =>
                navigate(`/search?destination=${encodeURIComponent(dest.city)}`)
              }
              className="group relative overflow-hidden rounded-2xl aspect-3/4 sm:aspect-2/3 lg:aspect-3/4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {/* Background image */}
              <img
                src={dest.image}
                alt={dest.city}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Gradient overlay — darkens on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 group-hover:via-black/40 transition-all duration-300" />

              {/* Flag — top right */}
              <span className="absolute top-3 right-3 text-lg drop-shadow-md">
                {dest.flag}
              </span>

              {/* Text — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <div className="text-white font-display font-bold text-base leading-tight">
                  {dest.city}
                </div>
                <div className="text-white/70 text-xs mt-0.5">
                  {dest.hotelCount} hotels
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile "view all" link */}
        <div className="mt-6 flex justify-center sm:hidden">
          <button
            onClick={() => navigate("/search")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400"
          >
            View all destinations <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
