"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useAdminContentStore } from "@/store/useAdminContentStore";
import { highlight } from "@/lib/highlight";
import { EMPTY_ARRAY } from "@/lib/utils";
import GameResultCard from "@/components/games/GameResultCard";

export default function ChoiceGame({
  gameId,
  title,
  icon: Icon,
  color = "#6366F1",
  description,
  rounds: baseRounds,
  coinPerCorrect = 15,
  xpPerCorrect = 20,
}) {
  const { isAuthenticated, rewardUser } = useAuthStore();
  const customRounds = useAdminContentStore((s) => s.customGameRounds[gameId] || EMPTY_ARRAY);
  const rounds = useMemo(() => [...baseRounds, ...customRounds], [baseRounds, customRounds]);
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [rewardGiven, setRewardGiven] = useState(false);

  const current = rounds[round];

  function handleSelect(index) {
    if (selected !== null) return;
    setSelected(index);
    if (index === current.correct) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (round + 1 < rounds.length) {
      setRound((r) => r + 1);
      setSelected(null);
    } else {
      setFinished(true);
      if (isAuthenticated && !rewardGiven && correctCount > 0) {
        rewardUser({ coin: correctCount * coinPerCorrect, xp: correctCount * xpPerCorrect });
        toast.success(`+${correctCount * coinPerCorrect} coin qo'lga kiritdingiz!`);
        setRewardGiven(true);
      }
    }
  }

  function restart() {
    setRound(0);
    setSelected(null);
    setCorrectCount(0);
    setFinished(false);
    setRewardGiven(false);
  }

  if (finished) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-32 lg:px-8">
        <GameResultCard
          title={title}
          correctCount={correctCount}
          total={rounds.length}
          coin={correctCount * coinPerCorrect}
          xp={correctCount * xpPerCorrect}
          isAuthenticated={isAuthenticated}
          onRestart={restart}
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-32 lg:px-8">
      <div className="mb-8 text-center">
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: `${color}1A`, color }}
        >
          <Icon size={24} />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-1.5 text-sm text-muted">{description}</p>
        <p className="mt-1 text-xs font-medium text-muted">
          Savol {round + 1} / {rounds.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          {current.code && (
            <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-[#0D1117]">
              <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2">
                <span className="font-mono text-[11px] uppercase tracking-wide text-white/40">
                  {current.language || "javascript"}
                </span>
              </div>
              <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-[1.8]">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlight(current.code, current.language || "javascript"),
                  }}
                />
              </pre>
            </div>
          )}

          <p className="mb-4 text-[15px] font-medium leading-relaxed text-foreground">{current.prompt}</p>

          <div className="flex flex-col gap-2.5">
            {current.options.map((option, i) => {
              const isCorrect = i === current.correct;
              const isSelected = i === selected;
              let style = "border-border bg-surface hover:border-accent/40";
              if (selected !== null) {
                if (isCorrect) style = "border-green-500/50 bg-green-500/10";
                else if (isSelected) style = "border-red-500/50 bg-red-500/10";
                else style = "border-border bg-surface opacity-60";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium text-foreground transition-colors disabled:cursor-default ${style}`}
                >
                  {option}
                  {selected !== null && isCorrect && <Check size={16} className="text-green-500" />}
                  {selected !== null && isSelected && !isCorrect && <X size={16} className="text-red-500" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {selected !== null && (
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
            {round + 1 < rounds.length ? "Keyingi savol" : "Yakunlash"}
          </button>
        </motion.div>
      )}
    </section>
  );
}
