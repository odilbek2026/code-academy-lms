"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Gamepad2, Coins } from "lucide-react";

const PILLARS = [
  {
    icon: BookOpen,
    title: "Prezentatsiyali va matnli kurslar",
    desc: "Har bir yo'nalish bosqichma-bosqich, interaktiv prezentatsiya darslar va amaliy kod misollar bilan.",
    color: "#6366F1",
  },
  {
    icon: Brain,
    title: "83+ Quiz savoli",
    desc: "Easy, Medium, Hard darajalarda o'z bilimingizni sinab ko'ring.",
    color: "#EC4899",
  },
  {
    icon: Gamepad2,
    title: "13 xil mini o'yin",
    desc: "Bug Hunter'dan Algorithm Game'gacha — o'ynab mustahkamlang.",
    color: "#F5A623",
  },
  {
    icon: Coins,
    title: "Coin va XP tizimi",
    desc: "G'alaba qozoning, coin to'plang, Coin Shop'da haqiqiy sovg'alarga almashtiring.",
    color: "#22C55E",
  },
];

export default function PillarsSection() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ background: `${p.color}1A`, color: p.color }}
              >
                <p.icon size={20} />
              </div>
              <h3 className="mb-2 font-display text-base font-semibold text-foreground">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
