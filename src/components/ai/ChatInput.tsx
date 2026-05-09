import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Props {
  onSend: (msg: string) => void;
  isLoading: boolean;
  /** Quick-start chips; show only for an empty conversation */
  showSuggestionChips?: boolean;
}

const SUGGESTIONS = [
  "Romantic 5-day trip to Santorini, budget $400/night",
  "Family vacation in Bali for 7 days, 2 adults 2 kids",
  "Luxury solo trip to Tokyo, no budget limit",
  "Beach getaway in Maldives for a honeymoon, 6 nights",
  "Cultural trip to Marrakech for 4 days under $200/night",
];

export default function ChatInput({
  onSend,
  isLoading,
  showSuggestionChips = false,
}: Props) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 rounded-b-2xl flex flex-col gap-3">
      {/* Suggestion chips — only before the first message */}
      {showSuggestionChips && !value && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setValue(s)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full border border-neutral-200
                         dark:border-neutral-700 text-neutral-500 dark:text-neutral-400
                         hover:border-brand-400 hover:text-brand-600
                         dark:hover:border-brand-600 dark:hover:text-brand-400
                         transition-colors duration-150 disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex gap-3 items-end">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Describe your dream trip..."
          rows={2}
          disabled={isLoading}
          className="resize-none rounded-xl text-sm flex-1
                     border-neutral-200 dark:border-neutral-700
                     focus-visible:ring-brand-500
                     disabled:opacity-50"
        />
        <Button
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          className={cn(
            "rounded-xl h-58px w-12 shrink-0 p-0",
            "bg-brand-500 hover:bg-brand-600 text-white",
            "disabled:opacity-40 transition-all duration-200",
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
      <p className="text-xs text-neutral-400 text-left">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
