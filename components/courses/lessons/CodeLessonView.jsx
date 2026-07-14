"use client";

import { useState } from "react";
import { Check, Copy, Lightbulb } from "lucide-react";
import { highlight } from "@/lib/highlight";

export default function CodeLessonView({ lesson }) {
  const [copied, setCopied] = useState(false);
  const { explanation, code, language, exercise } = lesson.content;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard ruxsat berilmagan bo'lishi mumkin — sokin qoldiramiz
    }
  };

  return (
    <div>
      <p className="mb-4 text-[15px] leading-relaxed text-foreground/90">{explanation}</p>

      <div className="overflow-hidden rounded-2xl border border-border bg-[#0D1117]">
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
          <span className="font-mono text-[11px] uppercase tracking-wide text-white/40">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Nusxalandi" : "Nusxalash"}
          </button>
        </div>
        <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-[1.8]">
          <code dangerouslySetInnerHTML={{ __html: highlight(code, language) }} />
        </pre>
      </div>

      {exercise && (
        <div className="mt-5 flex gap-3 rounded-2xl border border-accent-2/30 bg-accent-2/10 p-4">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-accent-2" />
          <div>
            <p className="mb-1 text-sm font-semibold text-foreground">Amaliy topshiriq</p>
            <p className="text-sm leading-relaxed text-muted">{exercise}</p>
          </div>
        </div>
      )}
    </div>
  );
}
