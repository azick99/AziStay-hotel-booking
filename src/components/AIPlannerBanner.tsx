import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIPlannerBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-600 dark:bg-brand-700">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Single soft glow on the right */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-brand-500/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Left — text */}
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-brand-200 text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by AI
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              Let AI Plan Your Perfect Trip
            </h2>
            <p className="text-brand-100/80 text-sm sm:text-base max-w-lg leading-relaxed">
              Tell us your destination and travel style — get a full
              personalised itinerary with handpicked hotels in seconds.
            </p>
          </div>

          {/* Right — CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button
              asChild
              className="bg-white text-brand-700 hover:bg-brand-50 font-bold px-7 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link
                to="/ai-planner"
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-brand-500" />
                Try AI Planner
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 px-5 py-6 rounded-xl border border-white/20 transition-all duration-200"
            >
              <Link to="/ai-planner">See how it works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
