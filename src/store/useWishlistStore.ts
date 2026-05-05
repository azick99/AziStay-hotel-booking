import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  items: string[];
  toggleWishlist: (hotelId: string) => void;
  removeFromWishlist: (hotelId: string) => void;
  clearWishlist: () => void;
  hasWishlisted: (hotelId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (hotelId: string) =>
        set((state) => {
          const isSaved = state.items.includes(hotelId);
          return {
            items: isSaved
              ? state.items.filter((id) => id !== hotelId)
              : [...state.items, hotelId],
          };
        }),

      removeFromWishlist: (hotelId: string) =>
        set((state) => ({
          items: state.items.filter((id) => id !== hotelId),
        })),

      clearWishlist: () => set({ items: [] }),

      hasWishlisted: (hotelId: string) => get().items.includes(hotelId),
    }),
    {
      name: "azistay-wishlist",
    },
  ),
);
