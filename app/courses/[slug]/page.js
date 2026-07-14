"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Star, Users, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { findCourseBySlug } from "@/lib/coursesData";
import { useAuthStore } from "@/store/useAuthStore";
import { useProgressStore } from "@/store/useProgressStore";
import { useAdminContentStore } from "@/store/useAdminContentStore";
import LessonSidebar from "@/components/courses/LessonSidebar";
import PresentationLessonView from "@/components/courses/lessons/PresentationLessonView";
import TextLessonView from "@/components/courses/lessons/TextLessonView";
import CodeLessonView from "@/components/courses/lessons/CodeLessonView";
import Button from "@/components/ui/Button";
import NotFound from "@/app/not-found";

const VIEWERS = { presentation: PresentationLessonView, text: TextLessonView, code: CodeLessonView };

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const customCourses = useAdminContentStore((s) => s.customCourses);
  const course = useMemo(() => findCourseBySlug(slug, customCourses), [slug, customCourses]);
  const { user, isAuthenticated } = useAuthStore();
  const userKey = user?.id || "guest";
  const { startCourse, completeLesson, setLastLesson } = useProgressStore();
  const progress = useProgressStore((s) => s.progress[userKey]?.[course?.id]);

  const [activeLessonId, setActiveLessonId] = useState(
    progress?.lastLessonId || course?.lessons[0]?.id
  );

  if (!course) return <NotFound />;

  const completedIds = progress?.completedLessonIds || [];
  const activeLesson = course.lessons.find((l) => l.id === activeLessonId) || course.lessons[0];
  const activeIndex = course.lessons.findIndex((l) => l.id === activeLesson.id);
  const percent = Math.round((completedIds.length / course.lessons.length) * 100);
  const Viewer = VIEWERS[activeLesson.type];

  function handleStartOrContinue() {
    if (!isAuthenticated) {
      toast.error("Kursni boshlash uchun avval tizimga kiring.");
      router.push("/login");
      return;
    }
    if (!progress) {
      startCourse(userKey, course.id, course.lessons[0].id);
      setActiveLessonId(course.lessons[0].id);
      toast.success("Kurs boshlandi. Omad!");
    } else {
      setActiveLessonId(progress.lastLessonId);
      document.getElementById("lesson-content")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function selectLesson(id) {
    setActiveLessonId(id);
    if (progress) setLastLesson(userKey, course.id, id);
    document.getElementById("lesson-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleMarkComplete() {
    if (!isAuthenticated) {
      toast.error("Progressni saqlash uchun tizimga kiring.");
      router.push("/login");
      return;
    }
    completeLesson(userKey, course.id, activeLesson.id, course.lessons.length);
    toast.success("Dars tugallandi!");

    const next = course.lessons[activeIndex + 1];
    if (next) {
      setActiveLessonId(next.id);
      setLastLesson(userKey, course.id, next.id);
    }
  }

  return (
    <div>
      {/* Course header */}
      <section
        className="relative overflow-hidden pt-32 pb-10"
        style={{ background: `linear-gradient(160deg, ${course.color}22, transparent 60%)` }}
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: course.color }}>
            {course.categoryName}
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{course.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-accent-2" /> {course.rating}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} /> {(course.students / 1000).toFixed(1)}K o'quvchi
            </span>
            <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium">
              {course.level}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Button onClick={handleStartOrContinue} size="md">
              {progress ? "Davom ettirish" : "Boshlash"}
            </Button>
            {progress && (
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
                </div>
                <span className="text-xs font-medium text-muted">{percent}%</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lesson viewer */}
      <section id="lesson-content" className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-muted">
              Darslar ({course.lessons.length})
            </p>
            <LessonSidebar
              lessons={course.lessons}
              activeLessonId={activeLesson.id}
              completedIds={completedIds}
              onSelect={selectLesson}
            />
          </aside>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="mb-5 font-display text-xl font-bold tracking-tight text-foreground">
                  {activeIndex + 1}. {activeLesson.title}
                </h2>
                <Viewer lesson={activeLesson} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
              <button
                disabled={activeIndex === 0}
                onClick={() => selectLesson(course.lessons[activeIndex - 1].id)}
                className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft size={16} /> Oldingi
              </button>

              <Button onClick={handleMarkComplete} variant="secondary" icon={CheckCircle2}>
                {completedIds.includes(activeLesson.id) ? "Tugallangan" : "Tugallandi deb belgilash"}
              </Button>

              <button
                disabled={activeIndex === course.lessons.length - 1}
                onClick={() => selectLesson(course.lessons[activeIndex + 1].id)}
                className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
              >
                Keyingi <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
