import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import TripSuggestionCard from "./TripSuggestionCard";
import ItineraryView from "./ItineraryView";
import BudgetBreakdown from "./BudgetBreakdown";
import type { TripSuggestion } from "@/types/ai.types";

interface Props {
  trip: TripSuggestion;
}

export default function ResultsPanel({ trip }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 pb-6"
    >
      {/* Destination header */}
      <div className="flex items-center gap-3 px-1">
        <div
          className="w-9 h-9 rounded-xl bg-brand-500 flex items-center
                        justify-center shrink-0"
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="font-display font-bold text-neutral-900 dark:text-white text-xl">
            {trip.destination}
          </h2>
          <p className="text-sm text-neutral-400">
            {trip.duration} day{trip.duration > 1 ? "s" : ""} · AI recommended
          </p>
        </div>
      </div>

      {/* Hotel cards */}
      <div>
        <h3
          className="font-semibold text-neutral-900 dark:text-white mb-3 text-sm
                       uppercase tracking-widest "
        >
          Top Hotel Picks
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {trip.hotels.map((hotel, i) => (
            <TripSuggestionCard
              key={hotel.name}
              hotel={hotel}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Budget */}
      <BudgetBreakdown
        budget={trip.budgetBreakdown}
        duration={trip.duration}
      />

      {/* Itinerary */}
      <ItineraryView
        itinerary={trip.itinerary}
        destination={trip.destination}
      />
    </motion.div>
  );
}
