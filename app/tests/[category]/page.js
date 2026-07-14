"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { getQuestions, CATEGORY_LABELS } from "@/lib/questionBank";
import QuizEngine from "@/components/quiz/QuizEngine";
import NotFound from "@/app/not-found";
import { useAdminContentStore } from "@/store/useAdminContentStore";

export default function TestRunPage() {
  const { category } = useParams();
  const isRandom = category === "random";
  const label = isRandom ? "Random Test" : CATEGORY_LABELS[category];
  const customQuestions = useAdminContentStore((s) => s.customQuestions);

  const [key, setKey] = useState(0);
  const questions = useMemo(
    () => getQuestions({ category: isRandom ? "all" : category, difficulty: "all", count: 10, extraQuestions: customQuestions }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, key]
  );

  if (!label) return <NotFound />;

  return (
    <section className="mx-auto max-w-5xl px-5 py-32 lg:px-8">
      <QuizEngine
        title={label}
        questions={questions}
        coinPerCorrect={8}
        xpPerCorrect={15}
        onRestart={() => setKey((k) => k + 1)}
      />
    </section>
  );
}
