"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { indent: 0, tokens: [["function", "kw"], [" ", ""], ["greet", "fn"], ["(", ""], ["ism", "var"], [")", ""], [" {", ""]] },
  { indent: 1, tokens: [["return", "kw"], [" `", ""], ["Salom, ", "str"], ["${", ""], ["ism", "var"], ["}!", "str"], ["`", ""]] },
  { indent: 0, tokens: [["}", ""]] },
  { indent: 0, tokens: [[" ", ""]] },
  { indent: 0, tokens: [["console", "var"], [".", ""], ["log", "fn"], ["(", ""], ["greet", "fn"], ["(", ""], ["'Dasturchi'", "str"], ["))", ""]] },
];

const TOKEN_COLORS = {
  kw: "#F5A623",
  fn: "#818CF8",
  var: "#60A5FA",
  str: "#4ADE80",
};

export default function CodeWindow() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 420);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-[#0D1117] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.02] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[11px] text-white/40">app.js</span>
      </div>
      <div className="px-5 py-5 font-mono text-[13px] leading-[1.9]">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ paddingLeft: line.indent * 20 }} className="whitespace-pre text-white/80">
            <span className="mr-3 select-none text-white/20">{String(i + 1).padStart(2, "0")}</span>
            {line.tokens.map(([text, type], j) => (
              <span key={j} style={{ color: TOKEN_COLORS[type] || "rgba(255,255,255,0.8)" }}>
                {text}
              </span>
            ))}
          </div>
        ))}
        {visibleLines < LINES.length && (
          <span className="ml-8 inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
        )}
      </div>
    </motion.div>
  );
}
