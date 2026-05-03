import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plane, Sparkles, Moon, Sun, Menu } from "lucide-react";
import { cn } from "../../lib/utils";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="bg-brand-500/90 p-2 rounded-lg group-hover:bg-brand-600 transition-colors">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span
              className={cn(
                "text-2xl font-display font-bold tracking-tight",
                isTransparent ? "text-white" : "text-gray-900 dark:text-white",
              )}
            >
              AZ
              <span className="text-brand-300">

              Stay
              </span>
            </span>
          </Link>

          {/* Desktop Nav — shadcn NavigationMenu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-4 py-2 rounded-xxl text-sm font-medium transition-all duration-200",
                        link.highlight
                          ? "bg-brand-500 text-white hover:bg-brand-600"
                          : isTransparent
                            ? "text-white/90 hover:text-white hover:bg-white/10"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
                      )}
                    >
                      {link.highlight && <Sparkles className="w-3.5 h-3.5" />}
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle — shadcn Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className={cn(
                "rounded-xxl transition-all duration-200",
                isTransparent
                  ? "text-white border border-white/30 hover:bg-white/10 hover:text-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Sign In — shadcn Button */}
            <Button
              variant="outline"
              className={cn(
                "hidden md:inline-flex rounded-xxl text-sm font-medium transition-all duration-200",
                isTransparent
                  ? "border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
              )}
            >
              Sign In
            </Button>

            {/* Mobile Menu — shadcn Sheet */}
            <Sheet
              open={isMobileOpen}
              onOpenChange={setMobileOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden rounded-xxl",
                    isTransparent
                      ? "text-white hover:bg-white/10 hover:text-white"
                      : "text-gray-700 dark:text-gray-300",
                  )}
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-72 bg-white dark:bg-gray-900 px-0 pt-14"
              >
                {/* Brand inside sheet */}
                <div className="px-6 pb-4 flex items-center gap-2">
                  <div className="bg-brand-500 p-1.5 rounded-xxl">
                    <Plane className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    AziStay
                  </span>
                </div>

                <Separator className="mb-4" />

                <nav className="px-4 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose
                      asChild
                      key={link.href}
                    >
                      <Link
                        to={link.href}
                        className={cn(
                          "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                          link.highlight
                            ? "bg-brand-500 text-white hover:bg-brand-600"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                        )}
                      >
                        {link.highlight && <Sparkles className="w-4 h-4" />}
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}

                  <Separator className="my-3" />

                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    Sign In
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
