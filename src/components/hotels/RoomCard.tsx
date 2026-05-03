import { Users, BedDouble, Maximize2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Room = {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  beds: string;
  size: number;
  images: string[];
  amenities: string[];
  available: boolean;
};

type Props = {
  room: Room;
  selected: boolean;
  onSelect: (room: Room) => void;
};

export default function RoomCard({ room, selected, onSelect }: Props) {
  return (
    <motion.div
      layout
      className={cn(
        "flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden border-2 transition-all duration-200",
        selected
          ? "border-brand-500 shadow-lg shadow-brand-500/10"
          : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700",
        !room.available && "opacity-60",
      )}
      style={{ boxShadow: selected ? "var(--shadow-brand)" : undefined }}
    >
      {/* Image */}
      <div className="relative sm:w-56 shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        {!room.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-danger-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 bg-white dark:bg-neutral-900 p-5 gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-display font-semibold text-neutral-900 dark:text-white text-lg leading-snug">
              {room.name}
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 leading-relaxed">
              {room.description}
            </p>
          </div>
          {selected && (
            <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0 mt-0.5" />
          )}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5" /> {room.size} m²
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5" /> {room.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Up to {room.maxGuests} guests
          </span>
        </div>

        {/* Amenity tags */}
        <div className="flex flex-wrap gap-1.5">
          {room.amenities.map((a) => (
            <Badge
              key={a}
              variant="secondary"
              className="text-[11px] font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-0"
            >
              {a}
            </Badge>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-2 mt-auto border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wide mb-0.5">
              From
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                ${room.pricePerNight}
              </span>
              <span className="text-xs text-neutral-400">/night</span>
            </div>
          </div>

          <Button
            onClick={() => room.available && onSelect(room)}
            disabled={!room.available}
            className={cn(
              "rounded-xl font-semibold transition-all duration-200",
              selected
                ? "bg-brand-500 hover:bg-brand-600 text-white"
                : "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-700",
            )}
          >
            {!room.available
              ? "Sold Out"
              : selected
                ? "Selected ✓"
                : "Select Room"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
