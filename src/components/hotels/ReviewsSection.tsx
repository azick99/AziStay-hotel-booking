import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

type Review = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
};

type Props = {
  reviews: Review[];
  overallRating: number;
  reviewCount: number;
};

const ratingColor = (r: number) =>
  r >= 9 ? "bg-emerald-500" : r >= 7 ? "bg-amber-400" : "bg-neutral-400";

export default function ReviewsSection({ reviews, overallRating, reviewCount }: Props) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className={cn("rounded-2xl px-5 py-4 text-white text-center", ratingColor(overallRating))}>
          <div className="text-4xl font-bold leading-none">{overallRating.toFixed(1)}</div>
          <div className="text-xs font-semibold mt-1 opacity-90">/ 10</div>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
            Guest Reviews
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-0.5">
            Based on {reviewCount.toLocaleString()} verified reviews
          </p>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.round(overallRating / 2)
                    ? "fill-amber-400 text-amber-400"
                    : "text-neutral-200 dark:text-neutral-700"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review cards */}
      <div className="flex flex-col gap-4">
        <AnimatePresence initial={false}>
          {visible.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col gap-3"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              {/* Author row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm text-neutral-900 dark:text-white">
                      {review.author}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {format(parseISO(review.date), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
                <div className={cn("text-white text-xs font-bold px-2.5 py-1 rounded-lg", ratingColor(review.rating))}>
                  {review.rating} / 10
                </div>
              </div>

              {/* Comment */}
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                "{review.comment}"
              </p>

              {/* Helpful */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <ThumbsUp className="w-3.5 h-3.5" />
                {review.helpful} people found this helpful
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show more toggle */}
      {reviews.length > 3 && (
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          className="self-start rounded-xl border-neutral-200 dark:border-neutral-700 text-sm"
        >
          {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
        </Button>
      )}
    </section>
  );
}