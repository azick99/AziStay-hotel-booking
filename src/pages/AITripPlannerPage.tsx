// src/pages/AITripPlannerPage.tsx
import { Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import ChatWindow from "@/components/ai/ChatWindow";
import ResultsPanel from "@/components/ai/ResultsPanel";
import { useChat } from "@/hooks/useChat";

export default function AITripPlannerPage() {
  const {
    messages,
    currentTrip,
    isLoading,
    error,
    sendMessage,
    clearChat,
    bottomRef,
  } = useChat();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 mt-10">
      {/* ── Page Header ── */}
      <div
        className="bg-white dark:bg-neutral-900 border-b
                      border-neutral-200 dark:border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center
                              justify-center"
              >
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1
                  className="font-display text-2xl sm:text-3xl font-bold
                               text-neutral-900 dark:text-white"
                >
                  AI Trip Planner
                </h1>
                <p className="text-sm text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                  Powered by Google Gemini
                </p>
              </div>
            </div>
            <p
              className="text-neutral-500 dark:text-neutral-400 text-sm
                          max-w-xl mt-1 ml-13"
            >
              Describe your dream trip in natural language and get personalised
              hotel recommendations, a day-by-day itinerary, and a budget
              estimate.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col xl:flex-row gap-6 h-full">
          {/* ── Left: Chat ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:w-105 shrink-0"
          >
            {/* Sticky chat on desktop */}
            <div
              className="xl:sticky xl:top-24"
              style={{ height: "calc(100vh - 220px)" }}
            >
              <ChatWindow
                messages={messages}
                isLoading={isLoading}
                error={error}
                onSend={sendMessage}
                onClear={clearChat}
                bottomRef={bottomRef}
              />
            </div>
          </motion.div>

          {/* ── Right: Results ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 min-w-0"
          >
            {currentTrip ? (
              <ResultsPanel trip={currentTrip} />
            ) : (
              // Placeholder when no trip generated yet
              <div
                className="flex flex-col items-center justify-center
                              min-h-10 gap-4 text-center px-8"
              >
                <div
                  className="w-20 h-20 rounded-3xl bg-neutral-100
                                dark:bg-neutral-800 flex items-center
                                justify-center"
                >
                  <Sparkles
                    className="w-8 h-8 text-neutral-300
                                       dark:text-neutral-600"
                  />
                </div>
                <div>
                  <h3
                    className="font-display font-semibold text-neutral-400
                                 dark:text-neutral-500 text-xl mb-2"
                  >
                    Your trip plan will appear here
                  </h3>
                  <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
                    Start a conversation on the left. The AI will generate hotel
                    picks, a full itinerary, and a budget breakdown for your
                    trip.
                  </p>
                </div>
                {/* Feature pills */}
                <div className="grid grid-cols-3 gap-3 mt-4 w-full max-w-sm">
                  {[
                    { icon: "🏨", label: "3 Hotel Picks" },
                    { icon: "🗺️", label: "Day Itinerary" },
                    { icon: "💰", label: "Budget Estimate" },
                  ].map(({ icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 p-3
                                 bg-white dark:bg-neutral-900 rounded-2xl
                                 border border-neutral-200 dark:border-neutral-800"
                    >
                      <span className="text-xl">{icon}</span>
                      <span
                        className="text-xs text-neutral-500 font-medium
                                       text-center leading-tight"
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
