import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { currentStep: 1 | 2 | 3 };

const STEPS = [
  { n: 1, label: "Your Stay" },
  { n: 2, label: "Your Details" },
  { n: 3, label: "Summary" },
];

export default function BookingSteps({ currentStep }: Props) {
  return (
    <div className="flex items-center w-full max-w-lg mx-auto">
      {STEPS.map((step, i) => {
        const done    = currentStep > step.n;
        const active  = currentStep === step.n;
        const future  = currentStep < step.n;

        return (
          <div key={step.n} className="flex items-center flex-1 last:flex-none">
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  done   && "bg-brand-500 text-white",
                  active && "bg-brand-500 text-white ring-4 ring-brand-100 dark:ring-brand-900",
                  future && "bg-neutral-100 dark:bg-neutral-800 text-neutral-400"
                )}
              >
                {done ? <Check className="w-4 h-4" /> : step.n}
              </div>
              <span
                className={cn(
                  "text-xs font-semibold whitespace-nowrap",
                  active  ? "text-brand-600 dark:text-brand-400" : "text-neutral-400"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-5 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <div
                  className="h-full bg-brand-500 transition-all duration-500"
                  style={{ width: done ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}