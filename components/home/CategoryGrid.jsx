"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Yo'nalishlar</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nimani o'rganmoqchisiz?
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted">
          15 ta yo'nalish bo'yicha kurslar, testlar va amaliy mashqlar — har biri boshidan oxirigacha tuzilgan.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
          >
            <Link
              href={`/courses?category=${cat.id}`}
              className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
            >
              <div
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                style={{ background: cat.color }}
              />
              <div className="flex items-start justify-between">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ background: cat.color }}
                >
                  {cat.name[0]}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                <p className="mt-0.5 text-xs text-muted">{cat.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
