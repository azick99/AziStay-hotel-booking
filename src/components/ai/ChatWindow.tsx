import { Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import ChatMessageBubble from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import type { ChatMessage } from "@/types/ai.types";

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onSend: (msg: string) => void;
  onClear: () => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

// Empty state shown before first message
function EmptyState() {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center
                    gap-4 px-6 py-12 text-center"
    >
      <div
        className="w-16 h-16 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20
                      flex items-center justify-center"
      >
        <Sparkles className="w-8 h-8 text-brand-500" />
      </div>
      <div>
        <h3
          className="font-display font-bold text-neutral-900 dark:text-white
                       text-xl mb-2"
        >
          Your AI Travel Concierge
        </h3>
        <p
          className="text-sm text-neutral-500 dark:text-neutral-400
                      max-w-xs leading-relaxed"
        >
          Describe your dream trip and I'll suggest the perfect hotels, build a
          day-by-day itinerary, and estimate your budget.
        </p>
      </div>
      <div className="flex flex-col gap-2 text-xs text-neutral-400 mt-2">
        <span>✈️ Tell me your destination & dates</span>
        <span>🏨 I'll find 3 perfectly matched hotels</span>
        <span>🗺️ Get a full itinerary & budget breakdown</span>
      </div>
    </div>
  );
}

export default function ChatWindow({
  messages,
  isLoading,
  error,
  onSend,
  onClear,
  bottomRef,
}: Props) {
  return (
    <div
      className="flex flex-col h-full bg-white dark:bg-neutral-900
                    rounded-2xl border border-neutral-200 dark:border-neutral-800
                    overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b
                      border-neutral-100 dark:border-neutral-800"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl bg-brand-500 flex items-center
                          justify-center"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm text-neutral-900 dark:text-white">
              AziStay AI
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-500
                               animate-pulse"
              />
              <span className="text-xs text-neutral-400">Online</span>
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-neutral-400 hover:text-neutral-700
                       dark:hover:text-white h-8 w-8 p-0 rounded-xl"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto py-4 flex flex-col gap-4
                      min-h-0"
      >
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <ChatMessageBubble
                  key={msg.id}
                  message={msg}
                />
              ))}
            </AnimatePresence>
            {isLoading && <TypingIndicator />}
          </>
        )}

        {/* Error message */}
        {error && (
          <div
            className="mx-4 px-4 py-3 bg-danger-50 dark:bg-danger-900/20
                          border border-danger-200 dark:border-danger-800
                          rounded-xl text-sm text-danger-600 dark:text-danger-400"
          >
            ⚠️ {error}
          </div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSend={onSend}
        isLoading={isLoading}
      />
    </div>
  );
}
