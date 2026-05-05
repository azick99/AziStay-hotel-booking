import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { getTripPlan } from "@/ai/geminiClient";

export function useChat() {
  const {
    messages,
    currentTrip,
    isLoading,
    error,
    addMessage,
    setLoading,
    setError,
    setCurrentTrip,
    clearChat,
  } = useChatStore();

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    addMessage({ role: "user", content });
    setLoading(true);

    try {
      const tripData = await getTripPlan(content, messages);

      addMessage({
        role: "assistant",
        content: tripData.message,
        tripData,
      });

      setCurrentTrip(tripData);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      addMessage({
        role: "assistant",
        content: "Sorry, I ran into an issue. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    currentTrip,
    isLoading,
    error,
    sendMessage,
    clearChat,
    bottomRef,
  };
}
