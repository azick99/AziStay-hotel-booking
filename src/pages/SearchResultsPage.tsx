import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, SearchX } from "lucide-react";
import { format, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import SearchBar from "@/components/SearchBar";
import HotelCard from "@/components/hotels/HotelCard";
import FilterSidebar from "@/components/hotels/FilterSidebar";

import { useHotelSearch, countActiveFilters } from "@/hooks/useHotelSearch";
import HotelCardSkeleton from "@/components/hotels/HotelSkeleton";
import { useFilterStore } from "@/store/filterStore.ts";

import { Search, ChevronDown } from "lucide-react";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  // Read URL params
  const destination = searchParams.get("destination") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = searchParams.get("guests") ?? "1";

  // Zustand filter state
  const { filters, updateFilter, clearFilters } = useFilterStore();
  const activeFilterCount = countActiveFilters(filters);

  // Filtered + sorted results
  const hotels = useHotelSearch(filters, destination);

  // Fake 800ms loading on mount / destination change
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, [destination]);

  // Format dates for results header
  const formatDate = (iso: string) => {
    try {
      return format(parseISO(iso), "MMM d");
    } catch {
      return iso;
    }
  };

  const resultsLabel = [
    destination && `Hotels in ${destination}`,
    checkIn && checkOut && `${formatDate(checkIn)} – ${formatDate(checkOut)}`,
    guests && `${guests} guest${Number(guests) > 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="min-h-screen  bg-neutral-50 dark:bg-neutral-950">
      {/* ── Sticky Search Bar Header ── */}
      {/* ── Sticky Collapsible Search Bar ── */}
      <div
        className="sticky top-16 z-40 bg-white/95 dark:bg-neutral-900/95
                backdrop-blur-md border-b border-neutral-200
                dark:border-neutral-800 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Collapsed summary bar — always visible ── */}
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-3 py-3.5
                 text-left group"
          >
            {/* Left: icon + summary text */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-8 h-8 rounded-xl bg-brand-500 flex items-center
                        justify-center shrink-0"
              >
                <Search className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                {destination || checkIn || guests !== "1" ? (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {destination && (
                      <span
                        className="text-sm font-semibold text-neutral-900
                                 dark:text-white truncate"
                      >
                        {destination}
                      </span>
                    )}
                    {destination && (checkIn || guests !== "1") && (
                      <span className="text-neutral-300 dark:text-neutral-600">
                        ·
                      </span>
                    )}
                    {checkIn && checkOut && (
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {formatDate(checkIn)} – {formatDate(checkOut)}
                      </span>
                    )}
                    {guests !== "1" && (
                      <>
                        <span className="text-neutral-300 dark:text-neutral-600">
                          ·
                        </span>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                          {guests} guests
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-neutral-400">
                    Search hotels, destinations...
                  </span>
                )}
                <p className="text-xs text-neutral-400 mt-0.5">
                  {searchOpen ? "Click to collapse" : "Click to edit search"}
                </p>
              </div>
            </div>

            {/* Right: chevron */}
            <ChevronDown
              className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform
                    duration-200 ${searchOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* ── Expandable SearchBar ── */}
          <AnimatePresence initial={false}>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className="bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl
                          border border-neutral-200 dark:border-neutral-700
                          px-5 py-4 mb-3"
                >
                  <SearchBar onSearch={() => setSearchOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Results Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="mt-20">
            {resultsLabel && (
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                {resultsLabel}
              </p>
            )}
            <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
              {isLoading ? (
                <span className="skeleton inline-block h-7 w-48 rounded-lg" />
              ) : (
                <>
                  {hotels.length}{" "}
                  <span className="text-neutral-400 font-normal">
                    {hotels.length === 1 ? "hotel" : "hotels"} found
                  </span>
                </>
              )}
            </h1>
          </div>

          {/* Mobile filter toggle */}
          <Sheet
            open={mobileFiltersOpen}
            onOpenChange={setMobileFiltersOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="lg:hidden flex items-center gap-2 rounded-xl border-neutral-200 dark:border-neutral-700"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="bg-brand-500 text-white text-[10px] px-1.5 py-0 h-4 min-w-4 rounded-full">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 overflow-y-auto pt-10 px-4 bg-white dark:bg-neutral-900"
            >
              <FilterSidebar
                filters={filters}
                onChange={updateFilter}
                onClear={clearFilters}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* ── Main layout: sidebar + grid ── */}
        <div className="flex gap-7">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-65">
              <FilterSidebar
                filters={filters}
                onChange={updateFilter}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1 min-w-0">
            {/* Active filter chips */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-4 overflow-hidden"
                >
                  {filters.stars.map((s) => (
                    <button
                      key={`star-${s}`}
                      onClick={() =>
                        updateFilter(
                          "stars",
                          filters.stars.filter((x) => x !== s),
                        )
                      }
                      className="chip chip-active flex items-center gap-1"
                    >
                      {s}★ <X className="w-3 h-3" />
                    </button>
                  ))}
                  {filters.categories.map((c) => (
                    <button
                      key={`cat-${c}`}
                      onClick={() =>
                        updateFilter(
                          "categories",
                          filters.categories.filter((x) => x !== c),
                        )
                      }
                      className="chip chip-active flex items-center gap-1 capitalize"
                    >
                      {c} <X className="w-3 h-3" />
                    </button>
                  ))}
                  {filters.amenities.map((a) => (
                    <button
                      key={`am-${a}`}
                      onClick={() =>
                        updateFilter(
                          "amenities",
                          filters.amenities.filter((x) => x !== a),
                        )
                      }
                      className="chip chip-active flex items-center gap-1 capitalize"
                    >
                      {a.replace("-", " ")} <X className="w-3 h-3" />
                    </button>
                  ))}
                  {(filters.priceMin !== 0 || filters.priceMax !== 2000) && (
                    <button
                      onClick={() => {
                        updateFilter("priceMin", 0);
                        updateFilter("priceMax", 2000);
                      }}
                      className="chip chip-active flex items-center gap-1"
                    >
                      ${filters.priceMin}–${filters.priceMax}{" "}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skeleton loading */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <HotelCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && hotels.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                  <SearchX className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="font-display text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  No hotels found
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6 max-w-sm">
                  Try adjusting your filters or searching a different
                  destination.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-brand-500 hover:bg-brand-600 text-white rounded-xl"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Results grid */}
            {!isLoading && hotels.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {hotels.map((hotel, i) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                    <HotelCard hotel={hotel} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
