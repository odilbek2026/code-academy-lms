"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ListChecks, Shuffle, ArrowRight } from "lucide-react";
import { CATEGORY_LABELS, QUESTIONS } from "@/lib/questionBank";
import { CATEGORIES } from "@/lib/constants";

export default function TestsPage() {
  const testCards = [
    { id: "random", label: "Random Test", color: "#6366F1", count: QUESTIONS.length },
    ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
      id,
      label: `${label} Test`,
      color: CATEGORIES.find((c) => c.id === id)?.color || "#6366F1",
      count: QUESTIONS.filter((q) => q.category === id).length,
    })),
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-32 lg:px-8">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <ListChecks size={26} />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Test</h1>
        <p className="mt-2 text-sm text-muted">Yo'nalish bo'yicha 10 savoldan iborat test — natijada coin va XP beriladi.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testCards.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
          >
            <Link
              href={`/tests/${t.id}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center gap-3.5">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ background: t.color }}
                >
                  {t.id === "random" ? <Shuffle size={18} /> : t.label[0]}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-foreground">{t.label}</p>
                  <p className="text-xs text-muted">{t.count}+ savol</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
