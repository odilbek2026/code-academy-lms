"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Star, Users, Play, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProgressStore } from "@/store/useProgressStore";

export default function CourseCard({ course, index = 0 }) {
  const { user } = useAuthStore();
  const userKey = user?.id || "guest";
  const progress = useProgressStore((s) => s.progress[userKey]?.[course.id]);

  const totalLessons = course.lessons.length;
  const doneCount = progress?.completedLessonIds?.length || 0;
  const percent = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;
  const started = Boolean(progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    >
      <Link
        href={`/courses/${course.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
      >
        <div
          className="relative flex h-32 items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}99)` }}
        >
          <div className="code-grid-bg absolute inset-0 opacity-20" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white backdrop-blur-sm">
            {course.categoryName[0]}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {course.level}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-accent">{course.categoryName}</p>
          <h3 className="mb-1.5 font-display text-[15px] font-semibold leading-snug text-foreground">
            {course.title}
          </h3>
          <p className="mb-4 line-clamp-2 flex-1 text-[13px] leading-relaxed text-muted">{course.description}</p>

          <div className="mb-3 flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} className="text-accent-2" /> {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} /> {(course.students / 1000).toFixed(1)}K
            </span>
          </div>

          {started && (
            <div className="mb-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-1 text-[11px] text-muted">{percent}% tugallandi</p>
            </div>
          )}

          <span className="mt-auto flex items-center gap-1.5 text-[13px] font-semibold text-accent">
            {started ? (
              <>
                Davom ettirish <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </>
            ) : (
              <>
                <Play size={13} /> Boshlash
              </>
            )}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
