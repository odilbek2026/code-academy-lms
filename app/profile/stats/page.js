"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, ShoppingBag, Trophy, Coins, Zap } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProgressStore } from "@/store/useProgressStore";
import { useShopStore } from "@/store/useShopStore";
import { useHackathonStore } from "@/store/useHackathonStore";
import { useAdminContentStore } from "@/store/useAdminContentStore";
import { withCustomCourses } from "@/lib/coursesData";
import { HACKATHONS } from "@/lib/hackathonData";
import RadialProgress from "@/components/profile/RadialProgress";

const XP_PER_LEVEL = 500;

export default function ProfileStatsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const userKey = user?.id || "guest";

  const progressByCourse = useProgressStore((s) => s.progress[userKey]) || {};
  const history = useShopStore((s) => s.historyByUser[userKey]) || [];
  const customCourses = useAdminContentStore((s) => s.customCourses);
  const customHackathons = useAdminContentStore((s) => s.customHackathons);
  const registrations = useHackathonStore((s) => s.registrations);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return <div className="min-h-[calc(100dvh-72px)]" />;
  }

  const allCourses = withCustomCourses(customCourses);
  const startedCourses = allCourses
    .map((course) => {
      const progress = progressByCourse[course.id];
      if (!progress) return null;
      const percent = Math.round((progress.completedLessonIds.length / course.lessons.length) * 100);
      return { course, percent, completedLessons: progress.completedLessonIds.length };
    })
    .filter(Boolean)
    .sort((a, b) => b.percent - a.percent);

  const completedCoursesCount = startedCourses.filter((c) => c.percent >= 100).length;
  const totalLessonsCompleted = startedCourses.reduce((sum, c) => sum + c.completedLessons, 0);
  const totalCoinSpent = history.reduce((sum, h) => sum + h.coin, 0);

  const allHackathons = [...HACKATHONS, ...customHackathons];
  const hackathonsJoined = allHackathons.filter((h) =>
    (registrations[h.id] || []).some((r) => r.userId === user.id)
  ).length;

  const xpIntoLevel = user.xp % XP_PER_LEVEL;
  const xpPercent = Math.round((xpIntoLevel / XP_PER_LEVEL) * 100);

  const summaryCards = [
    { label: "Boshlangan kurslar", value: startedCourses.length, icon: BookOpen, color: "#6366F1" },
    { label: "Tugatilgan kurslar", value: completedCoursesCount, icon: Trophy, color: "#22C55E" },
    { label: "Tugatilgan darslar", value: totalLessonsCompleted, icon: BarChart3, color: "#F5A623" },
    { label: "Do'kondan xaridlar", value: history.length, icon: ShoppingBag, color: "#0EA5E9" },
    { label: "Sarflangan coin", value: totalCoinSpent.toLocaleString("uz-UZ"), icon: Coins, color: "#EAB308" },
    { label: "Hackathonlar", value: hackathonsJoined, icon: Trophy, color: "#EC4899" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-5 py-32 lg:px-8">
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Profil</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Statistika</h1>
        <p className="mt-2 text-sm text-muted">{user.username}, sizning haqiqiy progressingiz shu yerda.</p>
      </div>

      <div className="mb-10 flex flex-col items-center gap-8 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:justify-around">
        <RadialProgress
          percent={xpPercent}
          color="#6366F1"
          label={`Lvl ${user.level}`}
          sublabel={`${xpIntoLevel} / ${XP_PER_LEVEL} XP`}
        />
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Zap size={16} className="text-accent" />
            <span className="text-sm text-muted">
              Jami XP: <span className="font-semibold text-foreground">{user.xp}</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Coins size={16} className="text-accent-2" />
            <span className="text-sm text-muted">
              Joriy coin: <span className="font-semibold text-foreground">{user.coin}</span>
            </span>
          </div>
          <p className="max-w-xs text-xs text-muted">
            Keyingi darajaga yetish uchun yana {XP_PER_LEVEL - xpIntoLevel} XP kerak.
          </p>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {summaryCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-surface p-4"
          >
            <span
              className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: `${s.color}1A`, color: s.color }}
            >
              <s.icon size={15} />
            </span>
            <p className="font-display text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-[11px] text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="mb-5 text-sm font-semibold text-foreground">Kurslar bo'yicha progress</p>
        {startedCourses.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            Hali birorta kurs boshlanmagan. Kurslar sahifasidan boshlang!
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {startedCourses.map(({ course, percent, completedLessons }, i) => (
              <div key={course.id}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{course.title}</span>
                  <span className="text-xs text-muted">
                    {completedLessons}/{course.lessons.length} dars · {percent}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="h-full rounded-full"
                    style={{ background: course.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
