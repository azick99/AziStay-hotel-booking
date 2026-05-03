import type { Hotel, Room } from "@/types/hotel.types";
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

  setBooking: (data: Partial<BookingState>) => void;
  setGuestDetails: (details: BookingGuest) => void;
  setBookingRef: (ref: string) => void;
  clearBooking: () => void;
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

      setBooking: (data) => set((state) => ({ ...state, ...data })),

      setGuestDetails: (details) => set({ guestDetails: details }),

      setBookingRef: (ref) => set({ bookingRef: ref }),

      clearBooking: () => set(initialState),
    }),
    { name: "azistay-booking" }
  )
);

export function generateBookingRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segment = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `WDR-${segment(6)}`;
}

export function calcNights(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const diff = (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(1, Math.round(diff));
}