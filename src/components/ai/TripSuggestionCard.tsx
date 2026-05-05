import { useNavigate } from "react-router-dom";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { AIHotel } from "@/types/ai.types";

interface Props {
  hotel: AIHotel;
  index: number;
}

export default function TripSuggestionCard({ hotel, index }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-neutral-900 rounded-2xl border
                 border-neutral-200 dark:border-neutral-800
                 overflow-hidden flex flex-col"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform
                     duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600";
          }}
        />
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-neutral-900/95
                        backdrop-blur-sm rounded-xl px-3 py-1.5
                        border border-white/20 shadow-md">
          <span className="font-bold text-brand-600 dark:text-brand-400 text-sm">
            ${hotel.pricePerNight}
          </span>
          <span className="text-neutral-400 text-xs">/night</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="font-display font-semibold text-neutral-900
                         dark:text-white text-base leading-snug">
            {hotel.name}
          </h4>
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <MapPin className="w-3 h-3" />
            {hotel.location}
          </div>
        </div>

        {/* Match reason */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400
                      leading-relaxed bg-neutral-50 dark:bg-neutral-800
                      rounded-xl px-3 py-2.5 italic">
          "{hotel.matchReason}"
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 4).map((a) => (
            <span
              key={a}
              className="text-xs px-2 py-0.5 rounded-full
                         bg-brand-50 dark:bg-brand-900/30
                         text-brand-700 dark:text-brand-300"
            >
              {a}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={() => navigate("/search")}
          className="w-full mt-auto bg-brand-500 hover:bg-brand-600
                     text-white rounded-xl text-sm font-semibold"
        >
          View Similar Hotels
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </motion.div>
  );
}