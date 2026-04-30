import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Menu, X, Sparkles, Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Scroll listener — make navbar solid after scrolling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const navLinks = [
    { label: "Hotels", href: "/search" },
    { label: "Destinations", href: "/search?type=destinations" },
    { label: "AI Planner", href: "/ai-planner", highlight: true },
  ];

  const isTransparent = isHome && !isScrolled && !isMobileOpen;

  return (
    <header
      className={cn(
        "top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent "
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="bg-brand-500 p-2 rounded-xl group-hover:bg-brand-600 transition-colors">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span
              className={cn(
                "text-2xl font-display font-bold tracking-tight ",
                isTransparent ? "text-white" : "text-gray-900 dark:text-white",
              )}
            >
              AziStay
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  link.highlight
                    ? "bg-brand-500 text-white hover:bg-brand-600 flex items-center gap-1.5"
                    : isTransparent
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
                )}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5" />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={cn(
                " p-2 rounded-xl transition-all duration-200",
                isTransparent
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800",
              )}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Sign In button (decorative for now) */}
            <button
              className={cn(
                "hidden md:block px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200",
                isTransparent
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
              )}
            >
              Sign In
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!isMobileOpen)}
              className={cn(
                "md:hidden p-2 rounded-xl transition-colors",
                isTransparent
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300",
              )}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    link.highlight
                      ? "bg-brand-500 text-white flex items-center gap-2"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                  )}
                >
                  {link.highlight && <Sparkles className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
              <button className="mt-2 w-full px-4 py-3 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
