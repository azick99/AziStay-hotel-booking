import SearchBar from "@/components/SearchBar";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import FeaturedHotels from "@/components/hotels/FeaturedHotels";
import AIPlannerBanner from "@/components/AIPlannerBanner";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-16 overflow-hidden pt-24 sm:pt-28">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/hero1.webm"
            type="video/webm"
          />
          <source
            src="/hero1.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white/90 mb-6">
              <span className="text-lg">✦</span>
              <span className="font-semibold text-white">
                Premium Hotel Experiences
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white font-display mb-6">
              Where Will Your <span className="text-brand-300">Story</span>{" "}
              Begin?
            </h1>

            {/* Subtext */}
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-200 mb-10">
              Discover the world's most extraordinary hotels — curated for the
              discerning traveler.
            </p>
          </div>

          {/* Search card */}
          <div className="mx-auto w-full rounded-[28px] lg:rounded-[36px] border border-white/10 bg-white/95 dark:border-slate-700 dark:bg-slate-950/90 p-5 sm:p-7 lg:p-10 shadow-2xl shadow-black/30 dark:shadow-black/50 backdrop-blur-md">
            <div className="text-left text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-5 lg:mb-8">
              Search your next stay
            </div>
            <SearchBar />
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span>
              No booking fees
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span>
              Free cancellation options
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span>
              Best price guarantee
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Destinations ─────────────────────────────────────────── */}
      <FeaturedDestinations />
      {/* ── AI Planner Banner ─────────────────────────────────────────────── */}
      <AIPlannerBanner />
      {/* ── Featured Hotels ───────────────────────────────────────────────── */}
      <FeaturedHotels />
    </main>
  );
}
