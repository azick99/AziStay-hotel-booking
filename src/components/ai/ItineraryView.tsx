import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sun, Sunset, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ItineraryDay } from "@/types/ai.types";

interface Props {
  itinerary: ItineraryDay[];
  destination: string;
}

interface TimeSlot {
  label: string;
  key:   keyof Pick<ItineraryDay, "morning" | "afternoon" | "evening">;
  icon:  React.ReactNode;
  color: string;
}

const TIME_SLOTS: TimeSlot[] = [
  {
    label: "Morning",
    key:   "morning",
    icon:  <Sun className="w-3.5 h-3.5" />,
    color: "text-amber-500",
  },
  {
    label: "Afternoon",
    key:   "afternoon",
    icon:  <Sunset className="w-3.5 h-3.5" />,
    color: "text-orange-500",
  },
  {
    label: "Evening",
    key:   "evening",
    icon:  <Moon className="w-3.5 h-3.5" />,
    color: "text-brand-500",
  },
];

export default function ItineraryView({ itinerary, destination }: Props) {
  const [openDay, setOpenDay] = useState<number>(1);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-neutral-900
                       dark:text-white text-lg">
          Your {itinerary.length}-Day Itinerary
        </h3>
        <span className="text-xs text-neutral-400 bg-neutral-100
                         dark:bg-neutral-800 px-2.5 py-1 rounded-full">
          {destination}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {itinerary.map((day) => (
          <div
            key={day.day}
            className="bg-white dark:bg-neutral-900 rounded-2xl border
                       border-neutral-200 dark:border-neutral-800 overflow-hidden"
            style={{ boxShadow: "var(--shadow-xs)" }}
          >
            {/* Day header — clickable accordion */}
            <button
              onClick={() =>
                setOpenDay(openDay === day.day ? -1 : day.day)
              }
              className="w-full flex items-center justify-between px-4 py-3.5
                         hover:bg-neutral-50 dark:hover:bg-neutral-800/50
                         transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-brand-500 text-white
                                 text-xs font-bold flex items-center justify-center
                                 shrink-0">
                  {day.day}
                </span>
                <span className="font-semibold text-sm text-neutral-900
                                 dark:text-white text-left">
                  {day.title}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-neutral-400 transition-transform duration-200",
                  openDay === day.day && "rotate-180",
                )}
              />
            </button>

            {/* Accordion body */}
            <AnimatePresence initial={false}>
              {openDay === day.day && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 flex flex-col gap-3 border-t
                                  border-neutral-100 dark:border-neutral-800 pt-3">
                    {TIME_SLOTS.map(({ label, key, icon, color }) => (
                      <div key={key} className="flex gap-3">
                        <div className={cn(
                          "flex items-center gap-1 text-xs font-semibold w-24 shrink-0 mt-0.5",
                          color,
                        )}>
                          {icon}
                          {label}
                        </div>
                        <p className="text-sm text-neutral-600
                                      dark:text-neutral-400 leading-relaxed">
                          {day[key]}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}