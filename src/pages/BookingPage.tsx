import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Users, Edit2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

import BookingSteps from "@/components/booking/BookingSteps";
import {
  calcNights,
  generateBookingRef,
  useBookingStore,
} from "@/store/useBookingStore";

// ── Zod schema ──────────────────────────────────────────────────
const guestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Phone must be at least 7 digits"),
  specialRequests: z.string().optional(),
});
type GuestForm = z.infer<typeof guestSchema>;

// ── Shared section wrapper ───────────────────────────────────────
const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.25 }}
    className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col gap-5"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    {children}
  </motion.div>
);

// ── Move this OUTSIDE BookingPage, at the top of the file ──────
// Place it right after your imports, before the BookingPage function

interface PriceSummaryProps {
  roomName: string;
  nights: number;
  pricePerNight: number;
  roomTotal: number;
  taxes: number;
  resortFee: number;
  total: number;
}

const PriceSummary = ({
  roomName,
  nights,
  pricePerNight,
  roomTotal,
  taxes,
  resortFee,
  total,
}: PriceSummaryProps) => {
  // No dates selected yet — show placeholder
  if (nights === 0) {
    return (
      <p className="text-sm text-neutral-400 text-center py-2">
        Select check-in and check-out dates to see pricing
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
        <span>
          {roomName} ({nights} night{nights > 1 ? "s" : ""} × ${pricePerNight})
        </span>
        <span>${roomTotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
        <span>Taxes & Fees (15%)</span>
        <span>${taxes}</span>
      </div>
      <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
        <span>Resort Fee</span>
        <span>${resortFee}</span>
      </div>
      <Separator />
      <div className="flex justify-between font-bold text-neutral-900 dark:text-white text-base">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const {
    hotel,
    room,
    checkIn,
    checkOut,
    guests,
    guestDetails,
    setBooking,
    setGuestDetails,
    setBookingRef,
  } = useBookingStore();

  // Guard — redirect if store is empty
  useEffect(() => {
    if (!hotel || !room) navigate("/");
  }, [hotel, room, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestForm>({
    resolver: zodResolver(guestSchema),
    defaultValues: guestDetails ?? {},
  });

  if (!hotel || !room) return null;

  const nights = calcNights(checkIn, checkOut); // now always a number
  const roomTotal = (room?.pricePerNight ?? 0) * nights;
  const taxRate = 0.15;
  const taxes = Math.round(roomTotal * taxRate);
  const resortFee = 45;
  const total = roomTotal + taxes + resortFee;
  const fmt = (iso: string) => {
    try {
      return format(parseISO(iso), "MMM d, yyyy");
    } catch {
      return iso;
    }
  };

  const onGuestSubmit = (data: GuestForm) => {
    setGuestDetails(data);
    setStep(3);
  };

  const onConfirm = () => {
    const ref = generateBookingRef();
    setBookingRef(ref);
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 mt-15">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              step === 1 ? navigate(-1) : setStep((s) => (s - 1) as 1 | 2 | 3)
            }
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-4 -ml-2"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <BookingSteps currentStep={step} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {/* ─── STEP 1: Your Stay ─── */}
          {step === 1 && (
            <Section key="step1">
              <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
                Your Stay
              </h2>

              {/* Hotel + room summary */}
              <div className="flex gap-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-4">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {hotel.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {hotel.location.city}, {hotel.location.country}
                  </p>
                  <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                    {room.name}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                {/* Check In */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Check In
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start gap-2 rounded-xl border-neutral-200 dark:border-neutral-700 text-sm font-medium"
                      >
                        <CalendarIcon className="w-4 h-4 text-neutral-400" />
                        {checkIn ? fmt(checkIn) : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={checkIn ? parseISO(checkIn) : undefined}
                        onSelect={(d) =>
                          d &&
                          setBooking({ checkIn: d.toISOString().split("T")[0] })
                        }
                        disabled={{ before: new Date() }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Check Out */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Check Out
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start gap-2 rounded-xl border-neutral-200 dark:border-neutral-700 text-sm font-medium"
                      >
                        <CalendarIcon className="w-4 h-4 text-neutral-400" />
                        {checkOut ? fmt(checkOut) : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={checkOut ? parseISO(checkOut) : undefined}
                        onSelect={(d) =>
                          d &&
                          setBooking({
                            checkOut: d.toISOString().split("T")[0],
                          })
                        }
                        disabled={{
                          before: checkIn
                            ? new Date(new Date(checkIn).getTime() + 86400000)
                            : new Date(),
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Guests
                </Label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setBooking({ guests: Math.max(1, guests - 1) })
                    }
                    className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    −
                  </button>
                  <span className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white min-w-20">
                    <Users className="w-4 h-4 text-neutral-400" />
                    {guests} Guest{guests > 1 ? "s" : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setBooking({
                        guests: Math.min(room.maxGuests, guests + 1),
                      })
                    }
                    className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <Separator />
              <PriceSummary
                roomName={room.name}
                nights={nights}
                pricePerNight={room.pricePerNight}
                roomTotal={roomTotal}
                taxes={taxes}
                resortFee={resortFee}
                total={total}
              />

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl py-6"
                style={{ boxShadow: "var(--shadow-brand)" }}
              >
                Continue to Details
              </Button>
            </Section>
          )}

          {/* ─── STEP 2: Guest Details ─── */}
          {step === 2 && (
            <Section key="step2">
              <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
                Your Details
              </h2>

              <form
                onSubmit={handleSubmit(onGuestSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="firstName"
                      className="input-label"
                    >
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      className={cn(
                        "rounded-xl",
                        errors.firstName &&
                          "border-danger-400 focus-visible:ring-danger-400",
                      )}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="input-error-msg">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="lastName"
                      className="input-label"
                    >
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      className={cn(
                        "rounded-xl",
                        errors.lastName &&
                          "border-danger-400 focus-visible:ring-danger-400",
                      )}
                      placeholder="Smith"
                    />
                    {errors.lastName && (
                      <p className="input-error-msg">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="email"
                    className="input-label"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={cn(
                      "rounded-xl",
                      errors.email &&
                        "border-danger-400 focus-visible:ring-danger-400",
                    )}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="input-error-msg">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="phone"
                    className="input-label"
                  >
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className={cn(
                      "rounded-xl",
                      errors.phone &&
                        "border-danger-400 focus-visible:ring-danger-400",
                    )}
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && (
                    <p className="input-error-msg">{errors.phone.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="specialRequests"
                    className="input-label"
                  >
                    Special Requests
                    <span className="text-neutral-400 font-normal ml-1">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="specialRequests"
                    {...register("specialRequests")}
                    rows={3}
                    className="rounded-xl resize-none"
                    placeholder="Dietary requirements, accessibility needs, room preferences..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl py-6 mt-2"
                  style={{ boxShadow: "var(--shadow-brand)" }}
                >
                  Continue to Summary
                </Button>
              </form>
            </Section>
          )}

          {/* ─── STEP 3: Summary + Confirm ─── */}
          {step === 3 && (
            <Section key="step3">
              <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
                Booking Summary
              </h2>

              {/* Hotel summary */}
              <div className="flex gap-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-4">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {hotel.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {hotel.location.city}, {hotel.location.country}
                  </p>
                  <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                    {room.name}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {checkIn && checkOut
                      ? `${fmt(checkIn)} → ${fmt(checkOut)} · ${nights} nights`
                      : ""}
                  </p>
                </div>
              </div>

              {/* Guest summary */}
              {guestDetails && (
                <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5">
                      Guest
                    </p>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {guestDetails.firstName} {guestDetails.lastName}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {guestDetails.email}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {guestDetails.phone}
                    </p>
                    {guestDetails.specialRequests && (
                      <p className="text-xs text-neutral-400 mt-1.5 italic">
                        "{guestDetails.specialRequests}"
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(2)}
                    className="text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 shrink-0"
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                  </Button>
                </div>
              )}

              <Separator />
              <PriceSummary
                roomName={room.name}
                nights={nights}
                pricePerNight={room.pricePerNight}
                roomTotal={roomTotal}
                taxes={taxes}
                resortFee={resortFee}
                total={total}
              />
              <Separator />

              {/* Cancellation policy */}
              <p className="text-xs text-neutral-400 text-center leading-relaxed">
                By confirming, you agree to our{" "}
                <Link
                  to="#"
                  className="underline hover:text-neutral-700"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="#"
                  className="underline hover:text-neutral-700"
                >
                  Cancellation Policy
                </Link>
                . Most rooms offer free cancellation up to 48 hours before
                check-in.
              </p>

              <Button
                onClick={onConfirm}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl py-6 text-base"
                style={{ boxShadow: "var(--shadow-brand-lg)" }}
              >
                Confirm Booking
              </Button>
            </Section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
