"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Keyboard, Gauge, Target, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { TYPING_SNIPPETS } from "@/lib/typingSnippets";
import { useAuthStore } from "@/store/useAuthStore";
import GameResultCard from "@/components/games/GameResultCard";
import Button from "@/components/ui/Button";

const ACCURACY_THRESHOLD = 80;
const COIN_PER_WIN = 40;
const XP_PER_WIN = 60;

export default function TypingSpeedPage() {
  const { isAuthenticated, rewardUser } = useAuthStore();
  const [snippet, setSnippet] = useState(TYPING_SNIPPETS[0]);
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState(null);
  const [finished, setFinished] = useState(false);
  const [rewardGiven, setRewardGiven] = useState(false);
  const textareaRef = useRef(null);

  function pickRandomSnippet() {
    const next = TYPING_SNIPPETS[Math.floor(Math.random() * TYPING_SNIPPETS.length)];
    setSnippet(next);
  }

  function handleChange(e) {
    const value = e.target.value;
    if (!startedAt) setStartedAt(Date.now());
    if (value.length <= snippet.length) setInput(value);
    if (value.length >= snippet.length) {
      setInput(value.slice(0, snippet.length));
      setFinished(true);
    }
  }

  const elapsedMs = startedAt ? Date.now() - startedAt : 0;
  const minutes = Math.max(elapsedMs / 1000 / 60, 1 / 60);
  const correctChars = [...input].filter((ch, i) => ch === snippet[i]).length;
  const accuracy = input.length ? Math.round((correctChars / input.length) * 100) : 100;
  const wpm = finished ? Math.round(snippet.length / 5 / minutes) : 0;
  const won = accuracy >= ACCURACY_THRESHOLD;

  useEffect(() => {
    if (finished && isAuthenticated && !rewardGiven) {
      if (won) {
        rewardUser({ coin: COIN_PER_WIN, xp: XP_PER_WIN });
        toast.success(`+${COIN_PER_WIN} coin qo'lga kiritdingiz!`);
      }
      setRewardGiven(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function restart() {
    pickRandomSnippet();
    setInput("");
    setStartedAt(null);
    setFinished(false);
    setRewardGiven(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  if (finished) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-32 lg:px-8">
        <GameResultCard
          title="Typing Speed"
          correctCount={won ? 1 : 0}
          total={1}
          coin={won ? COIN_PER_WIN : 0}
          xp={won ? XP_PER_WIN : 0}
          isAuthenticated={isAuthenticated}
          onRestart={restart}
        />
        <div className="mx-auto mt-4 flex max-w-lg items-center justify-center gap-6 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Gauge size={14} /> {wpm} WPM
          </span>
          <span className="flex items-center gap-1.5">
            <Target size={14} /> {accuracy}% aniqlik
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-32 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
          <Keyboard size={24} />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Typing Speed</h1>
        <p className="mt-1.5 text-sm text-muted">Kodni xatosiz va tez tering. 80%+ aniqlik — g'alaba.</p>
      </div>

      <div className="mb-4 rounded-2xl border border-border bg-[#0D1117] px-5 py-4 font-mono text-[13px] leading-[1.9]">
        {[...snippet].map((ch, i) => {
          let color = "rgba(255,255,255,0.35)";
          if (i < input.length) {
            color = input[i] === ch ? "#4ADE80" : "#F87171";
          } else if (i === input.length) {
            color = "#818CF8";
          }
          return (
            <span key={i} style={{ color }} className={i === input.length ? "underline" : ""}>
              {ch === "\n" ? "\u21B5\n" : ch}
            </span>
          );
        })}
      </div>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        rows={4}
        autoFocus
        placeholder="Shu yerga teraing..."
        className="w-full resize-none rounded-2xl border border-border bg-surface-2 p-4 font-mono text-[13px] text-foreground outline-none focus:border-accent"
      />

      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <span>
          {input.length} / {snippet.length} belgi
        </span>
        <span>{accuracy}% aniqlik</span>
      </div>

      <Button variant="ghost" icon={RotateCcw} className="mt-4" onClick={restart}>
        Boshqa matn
      </Button>
    </section>
  );
}
