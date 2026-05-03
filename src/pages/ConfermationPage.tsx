import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { CheckCircle2, Sparkles, Search, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { calcNights, useBookingStore } from "@/store/useBookingStore";

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const {
    hotel,
    room,
    checkIn,
    checkOut,
    guests,
    guestDetails,
    bookingRef,
    clearBooking,
  } = useBookingStore();

  // Guard
  useEffect(() => {
    if (!bookingRef) navigate("/");
  }, [bookingRef, navigate]);

  if (!hotel || !room || !bookingRef || !guestDetails) return null;

  const nights = calcNights(checkIn, checkOut);
  const roomTotal = room.pricePerNight * nights;
  const taxes = Math.round(roomTotal * 0.15);
  const total = roomTotal + taxes + 45;
  const fmt = (iso: string) => {
    try {
      return format(parseISO(iso), "MMM d, yyyy");
    } catch {
      return iso;
    }
  };

  const handleCopyRef = () => navigator.clipboard.writeText(bookingRef);

  const handleDone = () => {
    clearBooking();
    navigate("/search");
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4 py-16 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg flex flex-col gap-6"
      >
        {/* ── Success Card ── */}
        <div
          className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Green header */}
          <div className="bg-linear-to-br from-emerald-500 to-emerald-600 p-8 flex flex-col items-center gap-4 text-center">
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.15,
              }}
              className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h1 className="font-display text-2xl font-bold text-white">
                Booking Confirmed!
              </h1>
              <p className="text-white/80 text-sm mt-1">
                You'll receive a confirmation email shortly.
              </p>
            </motion.div>

            {/* Booking ref */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl px-6 py-3 flex items-center gap-3"
            >
              <div>
                <div className="text-white/70 text-[10px] font-bold uppercase tracking-widest">
                  Booking Reference
                </div>
                <div className="text-white font-bold text-2xl tracking-widest mt-0.5">
                  {bookingRef}
                </div>
              </div>
              <button
                onClick={handleCopyRef}
                className="text-white/70 hover:text-white transition-colors"
                title="Copy reference"
              >
                <Copy className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="p-6 flex flex-col gap-4"
          >
            {/* Hotel summary */}
            <div className="flex gap-4">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {hotel.name}
                </p>
                <p className="text-sm text-neutral-500">
                  {hotel.location.city}, {hotel.location.country}
                </p>
                <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">
                  {room.name}
                </p>
              </div>
            </div>

            <Separator />

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-neutral-400 text-xs uppercase tracking-wide mb-0.5">
                  Check-in
                </p>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {fmt(checkIn)}
                </p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs uppercase tracking-wide mb-0.5">
                  Check-out
                </p>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {fmt(checkOut)}
                </p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs uppercase tracking-wide mb-0.5">
                  Guest
                </p>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {guestDetails.firstName} {guestDetails.lastName}
                </p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs uppercase tracking-wide mb-0.5">
                  Guests
                </p>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {guests} guest{guests > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Total Paid ({nights} nights)
              </span>
              <span className="font-bold text-xl text-neutral-900 dark:text-white">
                ${total.toLocaleString()}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            asChild
            onClick={handleDone}
            className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl py-6 gap-2"
            style={{ boxShadow: "var(--shadow-brand)" }}
          >
            <Link to="/search">
              <Search className="w-4 h-4" />
              Explore More Hotels
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex-1 rounded-xl py-6 border-neutral-200 dark:border-neutral-700 gap-2"
          >
            <Link
              to="/ai-planner"
              onClick={clearBooking}
            >
              <Sparkles className="w-4 h-4 text-brand-500" />
              Plan with AI
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
