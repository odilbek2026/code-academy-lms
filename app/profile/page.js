"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Coins, Star, Zap, Trophy, LogOut, BarChart3, Award, Crown } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/components/ui/Button";
import PremiumBadge from "@/components/ui/PremiumBadge";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, isPremiumActive } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return <div className="min-h-[calc(100dvh-72px)]" />;
  }

  const stats = [
    { label: "Coin", value: user.coin, icon: Coins, color: "#F5A623" },
    { label: "XP", value: user.xp, icon: Zap, color: "#6366F1" },
    { label: "Level", value: user.level, icon: Star, color: "#22C55E" },
    { label: "Reyting", value: `#${user.rank}`, icon: Trophy, color: "#EC4899" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-5 py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface p-8 text-center sm:flex-row sm:text-left"
      >
        <span
          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white ${
            isPremiumActive() ? "bg-gradient-to-br from-accent-2 to-yellow-500" : "bg-accent"
          }`}
        >
          {user.username?.[0]?.toUpperCase()}
        </span>
        <div className="flex-1">
          <h1 className="flex items-center justify-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground sm:justify-start">
            {user.username}
            {isPremiumActive() && <PremiumBadge />}
          </h1>
          <p className="text-sm text-muted">{user.email}</p>
          <p className="mt-1 text-xs text-muted">
            A'zo bo'lgan: {new Date(user.createdAt).toLocaleDateString("uz-UZ")}
          </p>
        </div>
        <Button variant="outline" icon={LogOut} onClick={() => { logout(); router.push("/"); }}>
          Chiqish
        </Button>
      </motion.div>

      {isPremiumActive() ? (
        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-accent-2/30 bg-accent-2/10 px-5 py-4 sm:flex-row">
          <p className="flex items-center gap-2 text-sm text-foreground">
            <Crown size={16} className="text-accent-2" />
            Premium faol — <span className="font-semibold">{new Date(user.premiumUntil).toLocaleDateString("uz-UZ")}</span> gacha amal qiladi
          </p>
          <Button href="/premium" variant="secondary" size="sm">
            Muddatni uzaytirish
          </Button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-5 py-4 sm:flex-row">
          <p className="flex items-center gap-2 text-sm text-foreground">
            <Crown size={16} className="text-muted" />
            Premium'ga o'ting — barcha kurslar, ko'proq coin va oltin nishon
          </p>
          <Button href="/premium" size="sm" icon={Crown}>
            Premium sotib olish
          </Button>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface py-6"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: `${s.color}1A`, color: s.color }}
            >
              <s.icon size={18} />
            </span>
            <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Button href="/profile/stats" variant="secondary" icon={BarChart3} className="justify-center py-6">
          To'liq statistikani ko'rish
        </Button>
        <Button href="/profile/certificates" variant="secondary" icon={Award} className="justify-center py-6">
          Sertifikatlarim
        </Button>
      </div>
    </section>
  );
}
