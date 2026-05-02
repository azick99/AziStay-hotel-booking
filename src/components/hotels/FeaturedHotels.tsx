import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredHotels } from "@/data/mockHotels";
import HotelCard from "@/components/hotels/HotelCard";

export default function FeaturedHotels() {
  // Show first 4 featured hotels
  const hotels = featuredHotels.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-500 mb-2">
              Handpicked for you
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Featured Hotels
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm sm:text-base">
              Extraordinary stays selected by our travel experts
            </p>
          </div>
          <Link
            to="/search"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-3 transition-all duration-200 shrink-0"
          >
            View all hotels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            View All Hotels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Desktop CTA button */}
        <div className="mt-10 hidden sm:flex justify-center">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 hover:border-brand-400 dark:hover:border-brand-500 text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 font-semibold text-sm px-8 py-3 rounded-xl transition-all duration-200"
          >
            View All Hotels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
