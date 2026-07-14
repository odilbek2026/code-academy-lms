"use client";

import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/store/useThemeStore";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Mavzuni almashtirish"
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-foreground transition-colors hover:border-accent/50 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
