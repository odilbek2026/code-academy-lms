"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import CodeWindow from "@/components/home/CodeWindow";
import StatsBar from "@/components/home/StatsBar";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44">
      <div className="code-grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-muted"
            >
              <Sparkles size={13} className="text-accent-2" />
              O'yin, quiz va amaliyot bilan o'rganing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Dasturlashni <span className="text-gradient">o'ynab</span> o'rganing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
            >
              Prezentatsiyali darslar, interaktiv kod muharriri, mini o'yinlar va quizlar orqali
              frontend, backend va boshqa yo'nalishlarni bosqichma-bosqich o'zlashtiring.
              Har bir g'alaba — coin va tajriba beradi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href="/register" size="lg" icon={ArrowRight} iconPosition="right">
                Boshlash
              </Button>
              <Button href="/courses" variant="secondary" size="lg" icon={PlayCircle}>
                Kurslarni ko'rish
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <CodeWindow />
          </motion.div>
        </div>

        <div className="mt-20">
          <StatsBar />
        </div>
      </div>
    </section>
  );
}
