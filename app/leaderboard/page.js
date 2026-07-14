"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Coins, Zap } from "lucide-react";
import { MOCK_LEADERBOARD } from "@/lib/leaderboardData";
import { useAuthStore } from "@/store/useAuthStore";

const MEDAL_COLORS = ["#F5A623", "#94A3B8", "#B45309"];

export default function LeaderboardPage() {
  const { user, isAuthenticated } = useAuthStore();

  const ranked = useMemo(() => {
    const list = [...MOCK_LEADERBOARD];
    if (isAuthenticated && user) {
      list.push({ username: user.username, xp: user.xp, coin: user.coin, level: user.level, isYou: true });
    }
    return list.sort((a, b) => b.xp - a.xp).map((entry, i) => ({ ...entry, rank: i + 1 }));
  }, [isAuthenticated, user]);

  return (
    <section className="mx-auto max-w-3xl px-5 py-32 lg:px-8">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Trophy size={26} />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Leaderboard</h1>
        <p className="mt-2 text-sm text-muted">Eng ko'p XP to'plagan o'quvchilar reytingi.</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-surface">
        {ranked.map((entry, i) => (
          <motion.div
            key={entry.username}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.3, delay: (i % 15) * 0.03 }}
            className={`flex items-center gap-4 border-b border-border px-5 py-3.5 last:border-b-0 ${
              entry.isYou ? "bg-accent-soft" : ""
            }`}
          >
            <div className="flex w-8 shrink-0 items-center justify-center">
              {entry.rank <= 3 ? (
                <Crown size={17} style={{ color: MEDAL_COLORS[entry.rank - 1] }} fill={MEDAL_COLORS[entry.rank - 1]} />
              ) : (
                <span className="text-sm font-semibold text-muted">{entry.rank}</span>
              )}
            </div>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              {entry.username[0]?.toUpperCase()}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-semibold text-foreground">
                {entry.username} {entry.isYou && <span className="text-accent">(Siz)</span>}
              </p>
              <p className="text-xs text-muted">Level {entry.level}</p>
            </div>

            <span className="flex items-center gap-1 text-[13px] font-semibold text-accent-2">
              <Coins size={13} /> {entry.coin.toLocaleString("uz-UZ")}
            </span>
            <span className="hidden items-center gap-1 text-[13px] font-semibold text-accent sm:flex">
              <Zap size={13} /> {entry.xp.toLocaleString("uz-UZ")}
            </span>
          </motion.div>
        ))}
      </div>

      {!isAuthenticated && (
        <p className="mt-6 text-center text-xs text-muted">
          Reytingda ko'rinish uchun tizimga kiring va coin/XP to'plashni boshlang.
        </p>
      )}
    </section>
  );
}
