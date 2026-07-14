"use client";

import { Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function PremiumBadge({ size = "md", showLabel = true }) {
  const isSmall = size === "sm";

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative inline-flex items-center gap-1 overflow-hidden rounded-full font-semibold text-white ${
        isSmall ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      }`}
      style={{
        background: "linear-gradient(120deg, #F5A623, #EAB308, #F5A623)",
        backgroundSize: "200% 100%",
      }}
    >
      <motion.span
        className="absolute inset-0"
        style={{ background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)" }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
      />
      <Crown size={isSmall ? 10 : 12} className="relative" fill="currentColor" />
      {showLabel && <span className="relative">Premium</span>}
    </motion.span>
  );
}
