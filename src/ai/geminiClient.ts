import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import type { ChatMessage, TripSuggestion } from "@/types/ai.types";
import { TRIP_PLANNER_SYSTEM_PROMPT } from "./prompts";
import { parseAIResponse } from "./parseResponse";

// Gemini model — gemini-1.5-flash is free tier and very fast
const MODEL_NAME = "gemini-2.5-flash-lite";

// Safety settings — relax to avoid blocking travel content
const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

export async function getTripPlan(
  userMessage: string,
  history: ChatMessage[],
): Promise<TripSuggestion> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY — add it to your .env file");
  }

  // Init Gemini client
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: TRIP_PLANNER_SYSTEM_PROMPT,
  });

  // Build chat history (Gemini uses "user" | "model" roles).
  // Include assistant bubbles via their visible `content` (intro text), not raw JSON — keeps multi-turn context.
  // Cap length so multi-turn stays within context limits
  const geminiHistory = history
    .filter((m) => !m.isLoading && m.content.trim())
    .slice(-24)
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  // Start chat session with history
  const chat = model.startChat({
    history: geminiHistory,
    safetySettings: SAFETY_SETTINGS,
    generationConfig: {
      temperature: 0.88,
      maxOutputTokens: 2048,
      // Force JSON output
      responseMimeType: "application/json",
    },
  });

  // Send message
  const result = await chat.sendMessage(userMessage);
  const response = result.response;
  const text = response.text();

  if (!text) throw new Error("Empty response from Gemini");

  return parseAIResponse(text);
}
