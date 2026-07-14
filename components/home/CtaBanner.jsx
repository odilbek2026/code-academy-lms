"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent to-[#4338CA] px-8 py-16 text-center sm:px-16"
      >
        <div className="code-grid-bg pointer-events-none absolute inset-0 opacity-10" />
        <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Birinchi qadamni bugun tashlang
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-sm text-white/80 sm:text-base">
          Ro'yxatdan o'ting, birinchi kursingizni tanlang va 100 bonus coin bilan yo'lni boshlang.
        </p>
        <div className="relative mt-8">
          <Button
            href="/register"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="bg-white text-accent hover:bg-white/90 shadow-none"
          >
            Bepul boshlash
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
