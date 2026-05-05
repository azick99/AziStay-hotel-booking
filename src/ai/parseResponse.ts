// src/ai/parseResponse.ts
import type { TripSuggestion, AIHotel, ItineraryDay } from "@/types/ai.types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600";

// ── Raw shapes coming from the AI (unknown structure) ────────────
interface RawHotel {
  name?: unknown;
  location?: unknown;
  pricePerNight?: unknown;
  stars?: unknown;
  matchReason?: unknown;
  amenities?: unknown;
  image?: unknown;
}

interface RawItineraryDay {
  day?: unknown;
  title?: unknown;
  morning?: unknown;
  afternoon?: unknown;
  evening?: unknown;
}

interface RawBudget {
  accommodation?: unknown;
  food?: unknown;
  activities?: unknown;
  total?: unknown;
}

interface RawTripResponse {
  message?: unknown;
  destination?: unknown;
  duration?: unknown;
  hotels?: unknown;
  itinerary?: unknown;
  budgetBreakdown?: RawBudget;
}

// ── Helpers ──────────────────────────────────────────────────────
const str = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : fallback;
const num = (v: unknown, fallback = 0) =>
  typeof v === "number" ? v : Number(v) || fallback;
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const strs = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

// ── Main parser ──────────────────────────────────────────────────
export function parseAIResponse(raw: string): TripSuggestion {
  // Strip markdown code blocks if model adds them anyway
  const cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  // Find the outermost JSON object
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in AI response");
  }

  const parsed = JSON.parse(cleaned.slice(start, end + 1)) as RawTripResponse;

  const destination = str(parsed.destination, "Your destination");

  const hotels: AIHotel[] = arr(parsed.hotels)
    .slice(0, 3)
    .map((h): AIHotel => {
      const hotel = h as RawHotel;
      return {
        name: str(hotel.name, "Luxury Hotel"),
        location: str(hotel.location, destination),
        pricePerNight: num(hotel.pricePerNight, 200),
        stars: num(hotel.stars, 4),
        matchReason: str(hotel.matchReason, "Great match for your trip"),
        amenities:
          strs(hotel.amenities).length > 0
            ? strs(hotel.amenities)
            : ["WiFi", "Pool"],
        image: str(hotel.image, FALLBACK_IMAGE),
      };
    });

  const itinerary: ItineraryDay[] = arr(parsed.itinerary).map(
    (d, i): ItineraryDay => {
      const day = d as RawItineraryDay;
      return {
        day: num(day.day, i + 1),
        title: str(day.title, `Day ${i + 1}`),
        morning: str(day.morning, "Morning exploration"),
        afternoon: str(day.afternoon, "Afternoon activities"),
        evening: str(day.evening, "Evening dining"),
      };
    },
  );

  const budget = parsed.budgetBreakdown ?? {};

  return {
    message: str(parsed.message, "Here are my top picks for your trip!"),
    destination,
    duration: num(parsed.duration, 5),
    hotels,
    itinerary,
    budgetBreakdown: {
      accommodation: num(budget.accommodation, 0),
      food: num(budget.food, 0),
      activities: num(budget.activities, 0),
      total: num(budget.total, 0),
    },
  };
}
