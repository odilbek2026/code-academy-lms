"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Puzzle, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import GameResultCard from "@/components/games/GameResultCard";

const PAIRS = [
  { term: "let", def: "Blok darajasidagi o'zgaruvchi" },
  { term: "===", def: "Qat'iy tenglik solishtiruvi" },
  { term: "=>", def: "Arrow function belgisi" },
  { term: "&&", def: "Mantiqiy VA operatori" },
  { term: "...", def: "Spread / rest operatori" },
  { term: "??", def: "Nullish coalescing operatori" },
];

const TIME_LIMIT = 60;
const COIN_PER_PAIR = 10;
const XP_PER_PAIR = 15;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SyntaxMatchPage() {
  const { isAuthenticated, rewardUser } = useAuthStore();
  const [cards, setCards] = useState(null);
  const [flipped, setFlipped] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [status, setStatus] = useState("playing"); // playing | won | lost
  const [rewardGiven, setRewardGiven] = useState(false);

  const setup = useCallback(() => {
    const built = PAIRS.flatMap((p, i) => [
      { id: `${i}-term`, pairId: i, label: p.term, type: "term" },
      { id: `${i}-def`, pairId: i, label: p.def, type: "def" },
    ]);
    setCards(shuffle(built));
    setFlipped([]);
    setMatchedIds([]);
    setTimeLeft(TIME_LIMIT);
    setStatus("playing");
    setRewardGiven(false);
  }, []);

  useEffect(() => setup(), [setup]);

  useEffect(() => {
    if (status !== "playing" || !cards) return;
    if (timeLeft <= 0) {
      setStatus("lost");
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, status, cards]);

  useEffect(() => {
    if (matchedIds.length === PAIRS.length * 2 && cards) {
      setStatus("won");
    }
  }, [matchedIds, cards]);

  useEffect(() => {
    if (status === "won" && isAuthenticated && !rewardGiven) {
      rewardUser({ coin: PAIRS.length * COIN_PER_PAIR, xp: PAIRS.length * XP_PER_PAIR });
      toast.success(`+${PAIRS.length * COIN_PER_PAIR} coin qo'lga kiritdingiz!`);
      setRewardGiven(true);
    }
  }, [status, isAuthenticated, rewardGiven, rewardUser]);

  function handleFlip(card) {
    if (status !== "playing") return;
    if (flipped.length === 2) return;
    if (flipped.some((f) => f.id === card.id) || matchedIds.includes(card.id)) return;

    const next = [...flipped, card];
    setFlipped(next);

    if (next.length === 2) {
      const [a, b] = next;
      if (a.pairId === b.pairId && a.type !== b.type) {
        setTimeout(() => {
          setMatchedIds((m) => [...m, a.id, b.id]);
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }

  if (status === "won" || status === "lost") {
    const correctPairs = matchedIds.length / 2;
    return (
      <section className="mx-auto max-w-3xl px-5 py-32 lg:px-8">
        <GameResultCard
          title="Syntax Match"
          correctCount={status === "won" ? PAIRS.length : correctPairs}
          total={PAIRS.length}
          coin={status === "won" ? PAIRS.length * COIN_PER_PAIR : 0}
          xp={status === "won" ? PAIRS.length * XP_PER_PAIR : 0}
          isAuthenticated={isAuthenticated}
          onRestart={setup}
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-32 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Puzzle size={24} />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Syntax Match</h1>
        <p className="mt-1.5 text-sm text-muted">Belgi va uning ta'rifini juftlab toping.</p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold text-accent-2">
          <Clock size={14} /> {timeLeft}s
        </p>
      </div>

      {!cards ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-surface-2" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {cards.map((card) => {
            const isFlipped = flipped.some((f) => f.id === card.id) || matchedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);
            return (
              <motion.button
                key={card.id}
                onClick={() => handleFlip(card)}
                whileTap={{ scale: 0.95 }}
                disabled={isMatched}
                className={`flex h-24 items-center justify-center rounded-xl border p-2 text-center text-[12px] font-medium transition-colors ${
                  isMatched
                    ? "border-green-500/40 bg-green-500/10 text-green-600"
                    : isFlipped
                      ? "border-accent bg-accent-soft text-foreground"
                      : "border-border bg-surface-2 text-transparent hover:border-accent/40"
                }`}
              >
                {isFlipped ? card.label : "?"}
              </motion.button>
            );
          })}
        </div>
      )}
    </section>
  );
}
