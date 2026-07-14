"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, LayoutGrid } from "lucide-react";
import { COURSES } from "@/lib/coursesData";
import { CATEGORIES } from "@/lib/constants";
import CourseCard from "@/components/courses/CourseCard";
import { useAdminContentStore } from "@/store/useAdminContentStore";

export default function CoursesPageClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const customCourses = useAdminContentStore((s) => s.customCourses);
  const allCourses = useMemo(() => [...COURSES, ...customCourses], [customCourses]);

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const matchesCategory = activeCategory === "all" || c.category === activeCategory;
      const matchesQuery =
        !query.trim() ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.categoryName.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, allCourses]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-32 lg:px-8">
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Katalog</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Barcha kurslar</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {allCourses.length} ta kurs, {allCourses.reduce((a, c) => a + c.lessons.length, 0)} ta dars — prezentatsiya, matn va amaliy
          mashqlar bilan.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurs qidirish..."
            className="w-full rounded-full border border-border bg-surface-2 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              activeCategory === "all"
                ? "border-accent bg-accent text-white"
                : "border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            <LayoutGrid size={13} /> Barchasi
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                activeCategory === cat.id
                  ? "text-white"
                  : "border-border bg-surface text-muted hover:text-foreground"
              }`}
              style={activeCategory === cat.id ? { background: cat.color, borderColor: cat.color } : undefined}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center"
        >
          <p className="text-sm font-medium text-foreground">Hech narsa topilmadi</p>
          <p className="mt-1 text-sm text-muted">Boshqa kalit so'z yoki kategoriya bilan qayta urinib ko'ring.</p>
        </motion.div>
      )}
    </section>
  );
}
