"use client";

import { motion } from "framer-motion";
import { Hammer } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ComingSoon({ icon: Icon = Hammer, title, description }) {
  return (
    <section className="flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center px-5 py-28 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex max-w-md flex-col items-center"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-2 text-accent">
          <Icon size={26} />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        <p className="mt-1 text-xs font-medium text-accent-2">Keyingi qurilish bosqichida tayyor bo'ladi</p>
        <Button href="/" variant="secondary" className="mt-8">
          Bosh sahifaga qaytish
        </Button>
      </motion.div>
    </section>
  );
}
