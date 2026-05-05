import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { CalendarCheck, CreditCard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/useBookingStore";

export default function BookingHistoryPage() {
  const bookingHistory = useBookingStore((state) => state.bookingHistory);

  const sortedHistory = [...bookingHistory].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const formatDate = (date: string) => {
    try {
      return format(parseISO(date), "MMM d, yyyy");
    } catch {
      return date;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              Booking History
            </p>
            <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-white">
              Past Stays
            </h1>
          </div>
          <Button
            asChild
            className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white"
          >
            <Link to="/search">Book another stay</Link>
          </Button>
        </div>

        {sortedHistory.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 mb-6">
              <CalendarCheck className="w-7 h-7" />
            </div>
            <h2 className="font-semibold text-xl text-neutral-900 dark:text-white mb-2">
              No bookings yet
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              Your completed bookings will show up here after confirmation.
            </p>
            <Button
              asChild
              className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white"
            >
              <Link to="/search">Start planning</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            {sortedHistory.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-card"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="font-semibold text-xl text-neutral-900 dark:text-white">
                      {booking.hotelName}
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      {booking.roomName} · {booking.city}, {booking.country}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 text-xs font-semibold uppercase tracking-wide px-3 py-1">
                      Confirmed
                    </span>
                    <span className="text-xs text-neutral-400">
                      Booked {formatDate(booking.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-neutral-100 dark:border-neutral-800 pt-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4" />
                      <span>
                        {formatDate(booking.checkIn)} —{" "}
                        {formatDate(booking.checkOut)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        ${booking.grandTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      {booking.nights} night{booking.nights > 1 ? "s" : ""} · $
                      {booking.pricePerNight}/night
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-neutral-400">
                    Reference:{" "}
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {booking.ref}
                    </span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl"
                  >
                    <Link to={`/hotel/${booking.hotelId}`}>View hotel</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
