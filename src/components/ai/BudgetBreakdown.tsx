import { motion } from "framer-motion";
import { Hotel, Utensils, Ticket, Wallet } from "lucide-react";
import type { BudgetBreakdown as BudgetBreakdownType } from "@/types/ai.types";

interface Props {
  budget:   BudgetBreakdownType;
  duration: number;
}

export default function BudgetBreakdown({ budget, duration }: Props) {
  const items = [
    {
      label: "Accommodation",
      value: budget.accommodation,
      icon:  <Hotel className="w-4 h-4" />,
      color: "bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400",
      bar:   "bg-brand-500",
    },
    {
      label: "Food & Dining",
      value: budget.food,
      icon:  <Utensils className="w-4 h-4" />,
      color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
      bar:   "bg-amber-500",
    },
    {
      label: "Activities",
      value: budget.activities,
      icon:  <Ticket className="w-4 h-4" />,
      color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
      bar:   "bg-emerald-500",
    },
  ];

  const maxVal = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border
                    border-neutral-200 dark:border-neutral-800 p-5
                    flex flex-col gap-4"
         style={{ boxShadow: "var(--shadow-card)" }}>

      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-neutral-900
                       dark:text-white text-lg">
          Budget Estimate
        </h3>
        <span className="text-xs text-neutral-400">
          {duration} day{duration > 1 ? "s" : ""}
        </span>
      </div>

      {/* Breakdown bars */}
      <div className="flex flex-col gap-3">
        {items.map(({ label, value, icon, color, bar }, i) => (
          <div key={label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`p-1.5 rounded-lg ${color}`}>{icon}</span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {label}
                </span>
              </div>
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                ${value.toLocaleString()}
              </span>
            </div>
            {/* Animated bar */}
            <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${bar}`}
                initial={{ width: 0 }}
                animate={{ width: `${(value / maxVal) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-3 border-t
                      border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800
                           text-neutral-600 dark:text-neutral-400">
            <Wallet className="w-4 h-4" />
          </span>
          <span className="font-semibold text-neutral-900 dark:text-white">
            Estimated Total
          </span>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-brand-500">
            ${budget.total.toLocaleString()}
          </span>
          <p className="text-xs text-neutral-400">
            ~${Math.round(budget.total / duration)}/day
          </p>
        </div>
      </div>
    </div>
  );
}