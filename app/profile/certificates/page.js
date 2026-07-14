"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Award } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProgressStore } from "@/store/useProgressStore";
import { useAdminContentStore } from "@/store/useAdminContentStore";
import { withCustomCourses } from "@/lib/coursesData";
import CertificateCard from "@/components/profile/CertificateCard";
import Button from "@/components/ui/Button";

export default function CertificatesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const userKey = user?.id || "guest";
  const progressByCourse = useProgressStore((s) => s.progress[userKey]) || {};
  const customCourses = useAdminContentStore((s) => s.customCourses);
  const allCourses = withCustomCourses(customCourses);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return <div className="min-h-[calc(100dvh-72px)]" />;
  }

  const earned = allCourses
    .map((course) => {
      const progress = progressByCourse[course.id];
      if (!progress) return null;
      const isComplete = progress.completedLessonIds.length >= course.lessons.length;
      if (!isComplete) return null;
      return { course, completedAt: progress.completedAt || progress.startedAt };
    })
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-5xl px-5 py-32 lg:px-8">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Award size={24} />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Sertifikatlarim</h1>
        <p className="mt-2 text-sm text-muted">
          Kursni 100% tugatganingizda, shu yerda haqiqiy, yuklab olinadigan PDF sertifikat paydo bo'ladi.
        </p>
      </div>

      {earned.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="text-sm text-muted">
            Hali birorta kursni to'liq tugatmagansiz. Kursni oxirigacha yakunlaganingizda sertifikat shu yerda paydo bo'ladi.
          </p>
          <Button href="/courses" variant="secondary">
            Kurslarga o'tish
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {earned.map(({ course, completedAt }, i) => (
            <CertificateCard
              key={course.id}
              course={course}
              username={user.username}
              completedDate={new Date(completedAt).toLocaleDateString("uz-UZ")}
              index={i}
            />
          ))}
        </div>
      )}
    </section>
  );
}
