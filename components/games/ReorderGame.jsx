"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw as Undo } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import GameResultCard from "@/components/games/GameResultCard";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ReorderGame({
  title,
  icon: Icon,
  color = "#6366F1",
  description,
  rounds,
  coinPerCorrect = 20,
  xpPerCorrect = 30,
}) {
  const { isAuthenticated, rewardUser } = useAuthStore();
  const [round, setRound] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [rewardGiven, setRewardGiven] = useState(false);

  const current = rounds[round];
  const shuffledItems = useMemo(() => (current ? shuffle(current.items) : []), [current]);
  const remaining = shuffledItems.filter((item) => !placed.includes(item.id));
  const isCorrectOrder = checked && current && placed.join(",") === current.correctOrder.join(",");

  function pick(id) {
    if (checked || placed.includes(id)) return;
    setPlaced((p) => [...p, id]);
  }

  function undo() {
    if (checked) return;
    setPlaced((p) => p.slice(0, -1));
  }

  function check() {
    if (!current || placed.length !== current.items.length) return;
    setChecked(true);
    const correct = placed.join(",") === current.correctOrder.join(",");
    if (correct) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (round + 1 < rounds.length) {
      setRound((r) => r + 1);
      setPlaced([]);
      setChecked(false);
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
    setPlaced([]);
    setChecked(false);
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

  // Himoya: round chegaradan chiqib ketsa (masalan juda tez ketma-ket bosilganda),
  // sahifa qulashi o'rniga xatosiz "Yakunlash" holatiga o'tkaziladi.
  if (!current) {
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
          Raund {round + 1} / {rounds.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
          <p className="mb-4 text-[15px] font-medium leading-relaxed text-foreground">{current.instruction}</p>

          {/* Sizning tartibingiz */}
          <div className="mb-4 min-h-[64px] rounded-2xl border-2 border-dashed border-border bg-surface-2 p-3">
            {placed.length === 0 ? (
              <p className="flex h-10 items-center justify-center text-xs text-muted">
                Tartibni tuzish uchun quyidagi bloklarni bosing
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {placed.map((id, i) => {
                  const item = current.items.find((it) => it.id === id);
                  let ring = "border-border bg-surface";
                  if (checked) {
                    ring = current.correctOrder[i] === id ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10";
                  }
                  return (
                    <span key={id} className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-[12.5px] text-foreground ${ring}`}>
                      <span className="text-muted">{i + 1}.</span>
                      {item.label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mavjud bloklar */}
          {!checked && (
            <div className="flex flex-wrap gap-2">
              {remaining.map((item) => (
                <button
                  key={item.id}
                  onClick={() => pick(item.id)}
                  className="rounded-xl border border-border bg-surface px-3 py-1.5 font-mono text-[12.5px] text-foreground transition-colors hover:border-accent/40 hover:bg-surface-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {!checked ? (
            <div className="mt-5 flex gap-3">
              <button
                onClick={undo}
                disabled={placed.length === 0}
                className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:opacity-40"
              >
                <Undo size={14} /> Ortga
              </button>
              <button
                onClick={check}
                disabled={placed.length !== current.items.length}
                className="flex-1 rounded-full bg-accent py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Tekshirish
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-border bg-surface-2 p-4">
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                {isCorrectOrder ? (
                  <>
                    <Check size={15} className="text-green-500" /> To'g'ri tartib!
                  </>
                ) : (
                  <>
                    <X size={15} className="text-red-500" /> Tartib noto'g'ri edi
                  </>
                )}
              </p>
              <p className="text-[13px] leading-relaxed text-muted">{current.explanation}</p>
              <button
                onClick={handleNext}
                className="mt-4 w-full rounded-full bg-accent py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {round + 1 < rounds.length ? "Keyingi raund" : "Yakunlash"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
