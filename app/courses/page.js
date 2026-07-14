import { Suspense } from "react";
import CoursesPageClient from "@/components/courses/CoursesPageClient";

export const metadata = {
  title: "Kurslar — codeacademy",
  description: "Frontend, backend, mobile, AI va boshqa yo'nalishlar bo'yicha professional kurslar.",
};

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100dvh-72px)]" />}>
      <CoursesPageClient />
    </Suspense>
  );
}
