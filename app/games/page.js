"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Play } from "lucide-react";
import toast from "react-hot-toast";
import { GAMES } from "@/lib/gamesData";

export default function GamesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-32 lg:px-8">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Gamepad2 size={26} />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">O'yinlar</h1>
        <p className="mt-2 text-sm text-muted">O'ynab mustahkamlang — g'alaba coin va XP olib keladi.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game, i) => {
          const isReady = game.status === "ready";
          const Icon = game.icon;

          const card = (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 9) * 0.04 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 ${
                isReady ? "hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.25)]" : "opacity-60"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${game.color}1A`, color: game.color }}>
                  <Icon size={20} />
                </span>
                {!isReady && (
                  <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-semibold text-muted">
                    Tez orada
                  </span>
                )}
              </div>
              <h3 className="mb-1 text-[14.5px] font-semibold text-foreground">{game.title}</h3>
              <p className="mb-4 flex-1 text-[12.5px] leading-relaxed text-muted">{game.description}</p>
              {isReady && (
                <span className="flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                  <Play size={13} /> O'ynash
                </span>
              )}
            </motion.div>
          );

          if (!isReady) {
            return (
              <button
                key={game.id}
                onClick={() => toast("Bu o'yin tez orada qo'shiladi", { icon: "🚧" })}
                className="text-left"
              >
                {card}
              </button>
            );
          }

          return (
            <Link key={game.id} href={`/games/${game.id}`}>
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
