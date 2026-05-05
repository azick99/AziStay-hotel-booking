// src/types/ai.types.ts
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  tripData?: TripSuggestion;
  timestamp: Date;
  isLoading?: boolean;
}

export interface AIHotel {
  name: string;
  location: string;
  pricePerNight: number;
  stars: number;
  matchReason: string;
  amenities: string[];
  image?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  activities: number;
  total: number;
}

export interface TripSuggestion {
  message: string;
  destination: string;
  duration: number;
  hotels: AIHotel[];
  itinerary: ItineraryDay[];
  budgetBreakdown: BudgetBreakdown;
}
