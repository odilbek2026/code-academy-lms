"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Shuffle, Coins, Zap } from "lucide-react";
import { CATEGORY_LABELS, getQuestions } from "@/lib/questionBank";
import QuizEngine from "@/components/quiz/QuizEngine";
import Button from "@/components/ui/Button";
import { useAdminContentStore } from "@/store/useAdminContentStore";

const DIFFICULTIES = [
  { id: "all", label: "Aralash" },
  { id: "easy", label: "Oson" },
  { id: "medium", label: "O'rta" },
  { id: "hard", label: "Qiyin" },
];

export default function QuizPage() {
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [questions, setQuestions] = useState(null);
  const customQuestions = useAdminContentStore((s) => s.customQuestions);

  function startQuiz() {
    const qs = getQuestions({ category, difficulty, count: 10, extraQuestions: customQuestions });
    setQuestions(qs);
  }

  if (questions) {
    return (
      <section className="mx-auto max-w-5xl px-5 py-32 lg:px-8">
        <QuizEngine title="Quiz" questions={questions} coinPerCorrect={5} xpPerCorrect={10} onRestart={() => setQuestions(null)} />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-32 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Brain size={26} />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Quiz</h1>
        <p className="mt-2 text-sm text-muted">
          Yo'nalish va darajani tanlang, 10 ta savoldan iborat quiz boshlanadi.
        </p>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Coins size={12} className="text-accent-2" /> Har to'g'ri javob +5 coin
          </span>
          <span className="flex items-center gap-1">
            <Zap size={12} className="text-accent" /> +10 XP
          </span>
        </div>
      </motion.div>

      <div className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="mb-3 text-sm font-semibold text-foreground">Yo'nalish</p>
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              category === "all" ? "border-accent bg-accent text-white" : "border-border text-muted hover:text-foreground"
            }`}
          >
            <Shuffle size={12} /> Random
          </button>
          {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setCategory(id)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                category === id ? "border-accent bg-accent text-white" : "border-border text-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="mb-3 text-sm font-semibold text-foreground">Daraja</p>
        <div className="mb-8 flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                difficulty === d.id ? "border-accent bg-accent text-white" : "border-border text-muted hover:text-foreground"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <Button onClick={startQuiz} size="lg" className="w-full justify-center">
          Quizni boshlash
        </Button>
      </div>
    </section>
  );
}
