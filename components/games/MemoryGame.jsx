"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { MEMORY_PAIRS } from "@/lib/memoryGameData";
import GameResultCard from "@/components/games/GameResultCard";

const COIN_PER_PAIR = 12;
const XP_PER_PAIR = 18;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryGame() {
  const { isAuthenticated, rewardUser } = useAuthStore();

  const cards = useMemo(() => {
    const list = MEMORY_PAIRS.flatMap((pair, i) => [
      { id: `${i}-term`, pairId: i, label: pair.term, type: "term" },
      { id: `${i}-meaning`, pairId: i, label: pair.meaning, type: "meaning" },
    ]);
    return shuffle(list);
  }, []);

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [finished, setFinished] = useState(false);
  const [rewardGiven, setRewardGiven] = useState(false);

  useEffect(() => {
    if (matched.length === MEMORY_PAIRS.length * 2 && !finished) {
      setFinished(true);
      if (isAuthenticated && !rewardGiven) {
        const coin = MEMORY_PAIRS.length * COIN_PER_PAIR;
        const xp = MEMORY_PAIRS.length * XP_PER_PAIR;
        rewardUser({ coin, xp });
        toast.success(`+${coin} coin qo'lga kiritdingiz!`);
        setRewardGiven(true);
      }
    }
  }, [matched, finished, isAuthenticated, rewardGiven, rewardUser]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    const timer = setTimeout(() => {
      if (a.pairId === b.pairId) {
        setMatched((m) => [...m, a.pairId]);
      }
      setFlipped([]);
    }, 700);
    return () => clearTimeout(timer);
  }, [flipped]);

  function handleFlip(card) {
    if (flipped.length === 2) return;
    if (flipped.some((c) => c.id === card.id)) return;
    if (matched.includes(card.pairId)) return;
    setMoves((m) => m + 1);
    setFlipped((f) => [...f, card]);
  }

  function restart() {
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setFinished(false);
    setRewardGiven(false);
    window.location.reload();
  }

  if (finished) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-32 lg:px-8">
        <GameResultCard
          title="Code Memory"
          correctCount={MEMORY_PAIRS.length}
          total={MEMORY_PAIRS.length}
          coin={MEMORY_PAIRS.length * COIN_PER_PAIR}
          xp={MEMORY_PAIRS.length * XP_PER_PAIR}
          isAuthenticated={isAuthenticated}
          onRestart={restart}
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-32 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-2/10 text-accent-2">
          <Brain size={24} />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Code Memory</h1>
        <p className="mt-1.5 text-sm text-muted">Atama va uning ta'rifini juftlab toping.</p>
        <p className="mt-1 text-xs font-medium text-muted">
          Harakatlar: {moves} · Topilgan: {matched.length} / {MEMORY_PAIRS.length}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {cards.map((card) => {
          const isFlipped = flipped.some((c) => c.id === card.id) || matched.includes(card.pairId);
          const isMatched = matched.includes(card.pairId);
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card)}
              disabled={isFlipped}
              className="aspect-square"
              style={{ perspective: 600 }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.35 }}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-xl border border-border bg-surface-2"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-accent/40">?</span>
                </div>
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-xl border p-1.5 text-center text-[10px] font-medium leading-tight sm:text-[11px] ${
                    isMatched ? "border-green-500/50 bg-green-500/10 text-green-500" : "border-accent/40 bg-accent-soft text-accent"
                  }`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  {isMatched && <Check size={11} className="absolute right-1 top-1" />}
                  {card.label}
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
