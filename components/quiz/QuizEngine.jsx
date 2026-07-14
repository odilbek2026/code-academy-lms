"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Coins, Zap, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";

const DIFFICULTY_LABEL = { easy: "Oson", medium: "O'rta", hard: "Qiyin" };

export default function QuizEngine({ title, questions, coinPerCorrect = 5, xpPerCorrect = 10, onRestart }) {
  const { isAuthenticated, rewardUser } = useAuthStore();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [rewardGiven, setRewardGiven] = useState(false);

  const question = questions[index];
  const total = questions.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;

  function handleSelect(optionIndex) {
    if (selected !== null) return;
    setSelected(optionIndex);
    const isCorrect = optionIndex === question.correct;
    setAnswers((prev) => [...prev, { questionId: question.id, isCorrect }]);
  }

  function handleNext() {
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      finish();
    }
  }

  function finish() {
    setFinished(true);
    if (isAuthenticated && !rewardGiven) {
      const coin = correctCount * coinPerCorrect;
      const xp = correctCount * xpPerCorrect;
      if (coin > 0 || xp > 0) {
        rewardUser({ coin, xp });
        toast.success(`+${coin} coin, +${xp} XP qo'lga kiritdingiz!`);
      }
      setRewardGiven(true);
    }
  }

  if (finished) {
    const percent = Math.round((correctCount / total) * 100);
    const coin = isAuthenticated ? correctCount * coinPerCorrect : 0;
    const xp = isAuthenticated ? correctCount * xpPerCorrect : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg rounded-3xl border border-border bg-surface p-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft">
          <span className="font-display text-2xl font-bold text-accent">{percent}%</span>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">{title} tugadi</h2>
        <p className="mt-2 text-sm text-muted">
          {total} savoldan {correctCount} tasiga to'g'ri javob berdingiz.
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
          <div className="mt-4 flex items-center justify-center gap-4 rounded-2xl border border-accent-2/30 bg-accent-2/10 py-4">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-accent-2">
              <Coins size={15} /> +{coin} coin
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-accent">
              <Zap size={15} /> +{xp} XP
            </span>
          </div>
        ) : (
          <p className="mt-4 text-xs text-muted">Coin va XP olish uchun tizimga kiring.</p>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            icon={RotateCcw}
            className="flex-1 justify-center"
            onClick={() => {
              setIndex(0);
              setSelected(null);
              setAnswers([]);
              setFinished(false);
              setRewardGiven(false);
              onRestart?.();
            }}
          >
            Qayta boshlash
          </Button>
          <Button href="/" variant="ghost" icon={Home} className="flex-1 justify-center">
            Bosh sahifa
          </Button>
        </div>
      </motion.div>
    );
  }

  // Himoya: index chegaradan chiqib ketsa (masalan tez ketma-ket bosilganda yoki
  // qayta boshlash chog'ida), sahifa qulashi o'rniga bo'sh holat ko'rsatiladi.
  if (!question) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-medium text-muted">
          Savol {index + 1} / {total}
        </span>
        {question.difficulty && (
          <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
            {DIFFICULTY_LABEL[question.difficulty]}
          </span>
        )}
      </div>

      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
        >
          <h2 className="mb-6 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
            {question.question}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrectOpt = i === question.correct;
              let stateClass = "border-border hover:border-accent/40 hover:bg-surface-2";
              if (selected !== null) {
                if (isCorrectOpt) stateClass = "border-green-500 bg-green-500/10";
                else if (isSelected) stateClass = "border-red-500 bg-red-500/10";
                else stateClass = "border-border opacity-60";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left text-sm font-medium text-foreground transition-colors disabled:cursor-default ${stateClass}`}
                >
                  {opt}
                  {selected !== null && isCorrectOpt && <Check size={16} className="text-green-500" />}
                  {selected !== null && isSelected && !isCorrectOpt && <X size={16} className="text-red-500" />}
                </button>
              );
            })}
          </div>

          {selected !== null && question.explanation && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 rounded-xl bg-surface-2 p-3.5 text-[13px] leading-relaxed text-muted"
            >
              {question.explanation}
            </motion.p>
          )}

          {selected !== null && (
            <Button onClick={handleNext} className="mt-6 w-full justify-center">
              {index + 1 < total ? "Keyingi savol" : "Yakunlash"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
