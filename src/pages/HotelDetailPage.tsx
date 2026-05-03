import { useState } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Wifi,
  Dumbbell,
  Car,
  Waves,
  Utensils,
  Sparkles,
  ArrowLeft,
  Coffee,
  ShieldCheck,
  PlaneTakeoff,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { getHotelById } from "@/data/mockHotels";

import PhotoGallery from "@/components/hotels/PhotoGallery";
import RoomCard from "@/components/hotels/RoomCard";
import ReviewsSection from "@/components/hotels/ReviewsSection";
import { useBookingStore } from "@/store/useBookingStore";
import type { Room } from "@/types/hotel.types";

const amenityIcons: Record<string, { icon: React.ReactNode; label: string }> = {
  wifi: { icon: <Wifi className="w-4 h-4" />, label: "Free WiFi" },
  pool: { icon: <Waves className="w-4 h-4" />, label: "Swimming Pool" },
  spa: { icon: <Sparkles className="w-4 h-4" />, label: "Spa & Wellness" },
  gym: { icon: <Dumbbell className="w-4 h-4" />, label: "Fitness Center" },
  restaurant: { icon: <Utensils className="w-4 h-4" />, label: "Restaurant" },
  bar: { icon: <Coffee className="w-4 h-4" />, label: "Bar & Lounge" },
  parking: { icon: <Car className="w-4 h-4" />, label: "Parking" },
  concierge: { icon: <ShieldCheck className="w-4 h-4" />, label: "Concierge" },
  "airport-shuttle": {
    icon: <PlaneTakeoff className="w-4 h-4" />,
    label: "Airport Shuttle",
  },
  "room-service": {
    icon: <Coffee className="w-4 h-4" />,
    label: "Room Service",
  },
  "beach-access": {
    icon: <Waves className="w-4 h-4" />,
    label: "Beach Access",
  },
};

const toISO = (d: Date) => d.toISOString().split("T")[0];
const DEFAULT_CHECKIN = toISO(new Date(Date.now() + 86_400_000));
const DEFAULT_CHECKOUT = toISO(new Date(Date.now() + 86_400_000 * 3));

export default function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setBooking } = useBookingStore();

  const hotel = getHotelById(id ?? "");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Read dates/guests from URL (passed from search)
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = Number(searchParams.get("guests") ?? 1);

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-3xl">
          🏨
        </div>
        <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
          Hotel not found
        </h1>
        <p className="text-neutral-500 text-sm max-w-sm">
          The hotel you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => navigate("/search")}
          className="bg-brand-500 hover:bg-brand-600 text-white rounded-xl mt-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
        </Button>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!selectedRoom) return;

    setBooking({
      hotel,
      room: selectedRoom,
      checkIn: checkIn || DEFAULT_CHECKIN,
      checkOut: checkOut || DEFAULT_CHECKOUT,
      guests: guests || 1,
    });

    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* ── Breadcrumb ── */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-neutral-500">
          <Link
            to="/"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to="/search"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Hotels
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 dark:text-white font-medium truncate">
            {hotel.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left Column ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            {/* Photo Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <PhotoGallery
                images={hotel.images}
                hotelName={hotel.name}
              />
            </motion.div>

            {/* Hotel Info */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {/* Name + stars */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-xs text-neutral-400 capitalize font-medium">
                    {hotel.category}
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                  {hotel.name}
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 italic">
                  {hotel.tagline}
                </p>
              </div>

              {/* Location + rating */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  {hotel.location.address}
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500 text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                    {hotel.rating}
                  </span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {hotel.reviewCount.toLocaleString()} reviews
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {hotel.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border-0 capitalize text-xs font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator />

              {/* Description */}
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {hotel.description}
              </p>

              <Separator />

              {/* Amenities grid */}
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hotel.amenities.map((key: string) => {
                    const item = amenityIcons[key];
                    if (!item) return null;
                    return (
                      <div
                        key={key}
                        className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800 rounded-xl px-3 py-2.5"
                      >
                        <span className="text-brand-500">{item.icon}</span>
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.section>

            {/* Room Selection */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
                Choose Your Room
              </h2>
              {hotel.rooms.map((room: Room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  selected={selectedRoom?.id === room.id}
                  onSelect={setSelectedRoom}
                />
              ))}
            </motion.section>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ReviewsSection
                reviews={hotel.reviews}
                overallRating={hotel.rating}
                reviewCount={hotel.reviewCount}
              />
            </motion.div>
          </div>

          {/* ── Right Sticky Summary Card ── */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col gap-4"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">
                    From
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                      ${hotel.pricePerNight}
                    </span>
                    <span className="text-sm text-neutral-400">/night</span>
                  </div>
                </div>

                <Separator />

                {/* Selected room info */}
                {selectedRoom ? (
                  <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-3 border border-brand-200 dark:border-brand-800">
                    <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-1">
                      Selected Room
                    </div>
                    <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                      {selectedRoom.name}
                    </div>
                    <div className="text-brand-600 dark:text-brand-300 font-bold text-lg mt-1">
                      ${selectedRoom.pricePerNight}
                      <span className="text-xs font-normal text-neutral-400 ml-1">
                        /night
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-2">
                    Select a room below to continue
                  </p>
                )}

                <Button
                  onClick={handleBookNow}
                  disabled={!selectedRoom}
                  className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-bold rounded-xl py-6 transition-all duration-200"
                  style={{
                    boxShadow: selectedRoom ? "var(--shadow-brand)" : undefined,
                  }}
                >
                  {selectedRoom ? "Book Now →" : "Select a Room First"}
                </Button>

                <div className="flex flex-col gap-2 text-xs text-neutral-400 text-center">
                  <span>✓ Free cancellation on most rooms</span>
                  <span>✓ No booking fees</span>
                  <span>✓ Best price guarantee</span>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Mobile sticky Book Now bar ── */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-between gap-3"
          >
            <div>
              <div className="text-xs text-neutral-400">
                {selectedRoom.name}
              </div>
              <div className="font-bold text-neutral-900 dark:text-white">
                ${selectedRoom.pricePerNight}
                <span className="text-xs font-normal text-neutral-400 ml-1">
                  /night
                </span>
              </div>
            </div>
            <Button
              onClick={handleBookNow}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl px-8"
              style={{ boxShadow: "var(--shadow-brand)" }}
            >
              Book Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
