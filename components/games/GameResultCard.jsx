"use client";

import { motion } from "framer-motion";
import { Check, X, Coins, Zap, RotateCcw, Home, Trophy } from "lucide-react";
import Button from "@/components/ui/Button";

export default function GameResultCard({ title, correctCount, total, coin, xp, isAuthenticated, onRestart }) {
  const percent = total ? Math.round((correctCount / total) * 100) : 0;
  const won = correctCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg rounded-3xl border border-border bg-surface p-8 text-center"
    >
      <div
        className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full ${
          won ? "bg-accent-soft" : "bg-red-500/10"
        }`}
      >
        {won ? <Trophy size={30} className="text-accent" /> : <X size={30} className="text-red-500" />}
      </div>
      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
        {won ? "Zo'r natija!" : "Keyingi safar omad!"}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {title}: {total} tadan {correctCount} tasini to'g'ri topdingiz ({percent}%).
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface-2 py-4">
          <Check size={16} className="text-green-500" />
          <span className="text-sm font-semibold">{correctCount} to'g'ri</span>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface-2 py-4">
          <X size={16} className="text-red-500" />
          <span className="text-sm font-semibold">{total - correctCount} noto'g'ri</span>
        </div>
      </div>

      {isAuthenticated ? (
        won ? (
          <div className="mt-4 flex items-center justify-center gap-4 rounded-2xl border border-accent-2/30 bg-accent-2/10 py-4">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-accent-2">
              <Coins size={15} /> +{coin} coin
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-accent">
              <Zap size={15} /> +{xp} XP
            </span>
          </div>
        ) : (
          <p className="mt-4 text-xs text-muted">Yutuqsiz tugagani uchun coin berilmadi. Qayta urinib ko'ring!</p>
        )
      ) : (
        <p className="mt-4 text-xs text-muted">Coin va XP olish uchun tizimga kiring.</p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" icon={RotateCcw} className="flex-1 justify-center" onClick={onRestart}>
          Qayta o'ynash
        </Button>
        <Button href="/games" variant="ghost" icon={Home} className="flex-1 justify-center">
          O'yinlarga qaytish
        </Button>
      </div>
    </motion.div>
  );
}
