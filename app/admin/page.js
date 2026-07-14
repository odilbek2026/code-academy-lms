"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Brain, Gamepad2, ShoppingBag, Coins, Crown } from "lucide-react";
import { listUsers } from "@/lib/mockDb";
import { COURSES } from "@/lib/coursesData";
import { QUESTIONS } from "@/lib/questionBank";
import { PRODUCTS } from "@/lib/shopData";
import { GAMES } from "@/lib/gamesData";
import { useAdminContentStore } from "@/store/useAdminContentStore";

export default function AdminOverviewPage() {
  const [users, setUsers] = useState([]);
  const { customCourses, customQuestions, customProducts } = useAdminContentStore();

  useEffect(() => {
    setUsers(listUsers());
  }, []);

  const totalCoin = users.reduce((sum, u) => sum + (u.coin || 0), 0);
  const readyGames = GAMES.filter((g) => g.status === "ready").length;
  const premiumCount = users.filter((u) => u.premiumUntil && new Date(u.premiumUntil) > new Date()).length;

  const stats = [
    { label: "Foydalanuvchilar", value: users.length, icon: Users, color: "#6366F1" },
    { label: "Premium a'zolar", value: premiumCount, icon: Crown, color: "#F5A623" },
    { label: "Kurslar", value: COURSES.length + customCourses.length, icon: BookOpen, color: "#22C55E" },
    { label: "Quiz/Test savollari", value: QUESTIONS.length + customQuestions.length, icon: Brain, color: "#EC4899" },
    { label: "O'yinlar", value: `${readyGames}/${GAMES.length}`, icon: Gamepad2, color: "#F5A623" },
    { label: "Mahsulotlar", value: PRODUCTS.length + customProducts.length, icon: ShoppingBag, color: "#0EA5E9" },
    { label: "Taqsimlangan coin", value: totalCoin.toLocaleString("uz-UZ"), icon: Coins, color: "#EAB308" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <span
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: `${s.color}1A`, color: s.color }}
            >
              <s.icon size={17} />
            </span>
            <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <p className="mb-4 text-sm font-semibold text-foreground">So'nggi ro'yxatdan o'tganlar</p>
        {users.length === 0 ? (
          <p className="text-sm text-muted">Hali foydalanuvchi yo'q.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {[...users]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 6)
              .map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-xl px-2 py-2 text-sm">
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                      {u.username[0]?.toUpperCase()}
                    </span>
                    {u.username}
                    {u.role === "admin" && (
                      <span className="rounded-full bg-accent-2/15 px-2 py-0.5 text-[10px] font-semibold text-accent-2">
                        admin
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-muted">{new Date(u.createdAt).toLocaleDateString("uz-UZ")}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
