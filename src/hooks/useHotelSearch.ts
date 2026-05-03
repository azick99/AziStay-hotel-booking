import { useMemo } from "react";
import { mockHotels } from "@/data/mockHotels";
import type { Amenity } from "@/types/hotel.types";

export type SortOption =
  | "price_asc"
  | "price_desc"
  | "rating_desc"
  | "most_reviewed";

export type Filters = {
  priceMin: number;
  priceMax: number;
  stars: number[];
  categories: string[];
  amenities: Amenity[];
  sortBy: SortOption;
};

export const DEFAULT_FILTERS: Filters = {
  priceMin: 0,
  priceMax: 2000,
  stars: [],
  categories: [],
  amenities: [],
  sortBy: "rating_desc",
};

export function useHotelSearch(filters: Filters, destination: string) {
  return useMemo(() => {
    let results = [...mockHotels];

    if (destination.trim()) {
      const q = destination.toLowerCase();
      results = results.filter(
        (h) =>
          h.location.city.toLowerCase().includes(q) ||
          h.location.country.toLowerCase().includes(q) ||
          h.name.toLowerCase().includes(q),
      );
    }

    results = results.filter(
      (h) =>
        h.pricePerNight >= filters.priceMin &&
        h.pricePerNight <= filters.priceMax,
    );

    if (filters.stars.length > 0)
      results = results.filter((h) => filters.stars.includes(h.stars));

    if (filters.categories.length > 0)
      results = results.filter((h) => filters.categories.includes(h.category));

    if (filters.amenities.length > 0)
      results = results.filter((h) =>
        filters.amenities.every((a) => h.amenities.includes(a)),
      );

    switch (filters.sortBy) {
      case "price_asc":
        results.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price_desc":
        results.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "rating_desc":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "most_reviewed":
        results.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return results;
  }, [filters, destination]);
}

export function countActiveFilters(filters: Filters): number {
  let count = 0;
  if (filters.priceMin !== DEFAULT_FILTERS.priceMin) count++;
  if (filters.priceMax !== DEFAULT_FILTERS.priceMax) count++;
  if (filters.stars.length > 0) count++;
  if (filters.categories.length > 0) count++;
  if (filters.amenities.length > 0) count++;
  return count;
}
