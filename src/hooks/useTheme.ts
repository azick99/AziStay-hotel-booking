// src/hooks/useTheme.ts
import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Check localStorage first (user's saved preference)
    const stored = localStorage.getItem("azistay-theme") as Theme | null;
    if (stored) return stored;
    // 2. Fall back to system
    return "system";
  });

  // Apply theme class whenever theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("azistay-theme", theme);
  }, [theme]);

  // Listen for system theme changes (e.g. user changes OS setting)
  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  const isDark =
    theme === "dark" ||
    (theme === "system" && getSystemTheme() === "dark");

  return { theme, setTheme, isDark };
}