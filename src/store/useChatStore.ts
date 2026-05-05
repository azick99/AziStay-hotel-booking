// src/store/useChatStore.ts
import { create } from "zustand";
import type { ChatMessage, TripSuggestion } from "@/types/ai.types";

interface ChatState {
  messages: ChatMessage[];
  currentTrip: TripSuggestion | null;
  isLoading: boolean;
  error: string | null;

  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  setLoading: (v: boolean) => void;
  setError: (v: string | null) => void;
  setCurrentTrip: (v: TripSuggestion | null) => void;
  clearChat: () => void;
}

const uid = () => Math.random().toString(36).slice(2, 9);

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentTrip: null,
  isLoading: false,
  error: null,

  addMessage: (msg) =>
    set((s) => ({
      messages: [...s.messages, { ...msg, id: uid(), timestamp: new Date() }],
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setCurrentTrip: (currentTrip) => set({ currentTrip }),

  clearChat: () =>
    set({ messages: [], currentTrip: null, error: null, isLoading: false }),
}));
