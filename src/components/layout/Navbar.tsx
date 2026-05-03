// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plane, Sparkles, Moon, Sun, Menu, Monitor } from "lucide-react";
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
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/react";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const { isDark, theme, setTheme } = useTheme();

  const location = useLocation();
  const { isSignedIn, isLoaded } = useAuth();
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled && !isMobileOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {/* ── Logo ── */}
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
              Azi<span className="text-brand-300">Stay</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
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

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                // Cycle: system → light → dark → system
                const next: Record<string, "light" | "dark" | "system"> = {
                  system: "light",
                  light: "dark",
                  dark: "system",
                };
                setTheme(next[theme]);
              }}
              title={`Theme: ${theme}`}
              className={cn(
                "rounded-xl transition-all duration-200",
                isTransparent
                  ? "text-white border border-white/30 hover:bg-white/10 hover:text-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              {/* Show icon based on current theme setting */}
              {theme === "dark" && <Moon className="w-5 h-5" />}
              {theme === "light" && <Sun className="w-5 h-5" />}
              {theme === "system" && <Monitor className="w-5 h-5" />}{" "}
              {/* add Monitor to lucide imports */}
            </Button>
            {/* ── Desktop Auth ── */}
            {isLoaded && (
              <div className="hidden md:flex items-center gap-2">
                {isSignedIn ? (
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-9 h-9 rounded-xl ring-2 ring-brand-500/30",
                        userButtonPopoverCard:
                          "rounded-2xl shadow-card border border-neutral-200",
                        userButtonPopoverActionButton: "rounded-xl",
                      },
                    }}
                  />
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        className={cn(
                          "rounded-xl text-sm font-medium transition-all duration-200",
                          isTransparent
                            ? "border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
                            : "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
                        )}
                      >
                        Sign In
                      </Button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                      <Button className="rounded-xl text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            )}
            {/* ── Mobile Sheet ── */}
            <Sheet
              open={isMobileOpen}
              onOpenChange={setMobileOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden rounded-xl",
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
                  <div className="bg-brand-500 p-1.5 rounded-lg">
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

                  {/* ── Mobile Auth ── */}
                  {isLoaded && (
                    <>
                      {isSignedIn ? (
                        <div className="flex items-center gap-3 px-4 py-2">
                          <UserButton
                            appearance={{
                              elements: {
                                avatarBox: "w-9 h-9 rounded-xl",
                              },
                            }}
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            My Account
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <SignInButton mode="modal">
                            <Button
                              variant="outline"
                              className="w-full rounded-xl border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                            >
                              Sign In
                            </Button>
                          </SignInButton>

                          <SignUpButton mode="modal">
                            <Button className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold">
                              Sign Up — It's Free
                            </Button>
                          </SignUpButton>
                        </div>
                      )}
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
