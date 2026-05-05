import type { Hotel, Room } from "@/types/hotel.types";
import type { CompletedBooking } from "@/types/booking.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BookingGuest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
};

export type BookingState = {
  hotel: Hotel | null;
  room: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestDetails: BookingGuest | null;
  bookingRef: string | null;
  bookingHistory: CompletedBooking[];

  setBooking: (data: Partial<BookingState>) => void;
  setGuestDetails: (details: BookingGuest) => void;
  setBookingRef: (ref: string) => void;
  addBookingHistory: (booking: CompletedBooking) => void;
  clearBooking: () => void;
  clearBookingHistory: () => void;
};

const initialState = {
  hotel: null,
  room: null,
  checkIn: "",
  checkOut: "",
  guests: 1,
  guestDetails: null,
  bookingRef: null,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,
      bookingHistory: [],

      setBooking: (data) => set((state) => ({ ...state, ...data })),

      setGuestDetails: (details) => set({ guestDetails: details }),

      setBookingRef: (ref) => set({ bookingRef: ref }),

      addBookingHistory: (booking) =>
        set((state) => ({
          bookingHistory: [...state.bookingHistory, booking],
        })),

      clearBooking: () => set(initialState),

      clearBookingHistory: () => set({ bookingHistory: [] }),
    }),
    { name: "azistay-booking" },
  ),
);

export function generateBookingRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segment = (len: number) =>
    Array.from(
      { length: len },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  return `WDR-${segment(6)}`;
}

// src/store/useBookingStore.ts

export function calcNights(checkIn: string, checkOut: string): number {
  // Guard — if either date is missing return 0
  if (!checkIn || !checkOut) return 0;

  try {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    // Guard — if dates are invalid return 0
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    const diff = end.getTime() - start.getTime();
    const nights = Math.round(diff / (1000 * 60 * 60 * 24));

    // Guard — never return negative nights
    return Math.max(0, nights);
  } catch {
    return 0;
  }
}
