"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { BUG_ROUNDS } from "@/lib/bugHunterData";
import { useAuthStore } from "@/store/useAuthStore";
import GameResultCard from "@/components/games/GameResultCard";

const COIN_PER_CORRECT = 15;
const XP_PER_CORRECT = 25;

export default function BugHunterPage() {
  const { isAuthenticated, rewardUser } = useAuthStore();
  const [round, setRound] = useState(0);
  const [selectedLine, setSelectedLine] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [rewardGiven, setRewardGiven] = useState(false);

  const current = BUG_ROUNDS[round];

  function handleLineClick(lineIndex) {
    if (selectedLine !== null) return;
    setSelectedLine(lineIndex);
    const isCorrect = lineIndex === current.buggyLine;
    if (isCorrect) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (round + 1 < BUG_ROUNDS.length) {
      setRound((r) => r + 1);
      setSelectedLine(null);
    } else {
      setFinished(true);
      if (isAuthenticated && !rewardGiven && correctCount > 0) {
        rewardUser({ coin: correctCount * COIN_PER_CORRECT, xp: correctCount * XP_PER_CORRECT });
        toast.success(`+${correctCount * COIN_PER_CORRECT} coin qo'lga kiritdingiz!`);
        setRewardGiven(true);
      }
    }
  }

  function restart() {
    setRound(0);
    setSelectedLine(null);
    setCorrectCount(0);
    setFinished(false);
    setRewardGiven(false);
  }

  if (finished) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-32 lg:px-8">
        <GameResultCard
          title="Bug Hunter"
          correctCount={correctCount}
          total={BUG_ROUNDS.length}
          coin={correctCount * COIN_PER_CORRECT}
          xp={correctCount * XP_PER_CORRECT}
          isAuthenticated={isAuthenticated}
          onRestart={restart}
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-32 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
          <Bug size={24} />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Bug Hunter</h1>
        <p className="mt-1.5 text-sm text-muted">Xato joylashgan qatorni bosing.</p>
        <p className="mt-1 text-xs font-medium text-muted">
          Raund {round + 1} / {BUG_ROUNDS.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden rounded-2xl border border-border bg-[#0D1117]"
        >
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wide text-white/40">{current.language}</span>
          </div>
          <div className="px-2 py-3 font-mono text-[13px] leading-[1.9]">
            {current.lines.map((line, i) => {
              const isSelected = selectedLine === i;
              const isBug = i === current.buggyLine;
              let bg = "hover:bg-white/5";
              if (selectedLine !== null) {
                if (isBug) bg = "bg-green-500/15";
                else if (isSelected) bg = "bg-red-500/15";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleLineClick(i)}
                  disabled={selectedLine !== null || line.trim() === ""}
                  className={`flex w-full items-center gap-3 whitespace-pre px-3 py-0.5 text-left text-white/80 transition-colors disabled:cursor-default ${bg}`}
                >
                  <span className="w-5 shrink-0 select-none text-white/20">{i + 1}</span>
                  <span className="flex-1">{line || " "}</span>
                  {selectedLine !== null && isBug && <Check size={13} className="text-green-500" />}
                  {selectedLine !== null && isSelected && !isBug && <X size={13} className="text-red-500" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {selectedLine !== null && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-border bg-surface-2 p-4"
        >
          <p className="text-[13px] leading-relaxed text-muted">{current.explanation}</p>
          <button
            onClick={handleNext}
            className="mt-4 w-full rounded-full bg-accent py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {round + 1 < BUG_ROUNDS.length ? "Keyingi raund" : "Yakunlash"}
          </button>
        </motion.div>
      )}
    </section>
  );
}
