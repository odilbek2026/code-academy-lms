"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { COURSES } from "@/lib/coursesData";
import { CATEGORIES } from "@/lib/constants";
import { useAdminContentStore } from "@/store/useAdminContentStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const LEVELS = ["Boshlang'ich", "O'rta", "Yuqori"];
const LESSON_TYPES = [
  { id: "presentation", label: "Prezentatsiya" },
  { id: "text", label: "Matn" },
  { id: "code", label: "Kod" },
];

function emptyLesson() {
  return { localId: crypto.randomUUID(), title: "", type: "text", duration: "5 daqiqa", body: "", language: "javascript", exercise: "" };
}

export default function AdminCoursesPage() {
  const { customCourses, addCourse, removeCourse } = useAdminContentStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0].id,
    level: LEVELS[0],
    duration: "4 soat",
    description: "",
  });
  const [lessons, setLessons] = useState([emptyLesson()]);

  function updateLesson(localId, patch) {
    setLessons((ls) => ls.map((l) => (l.localId === localId ? { ...l, ...patch } : l)));
  }

  function addLessonRow() {
    setLessons((ls) => [...ls, emptyLesson()]);
  }

  function removeLessonRow(localId) {
    setLessons((ls) => (ls.length > 1 ? ls.filter((l) => l.localId !== localId) : ls));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Nomi va tavsifni to'ldiring.");
      return;
    }
    if (lessons.some((l) => !l.title.trim() || !l.body.trim())) {
      toast.error("Har bir dars uchun sarlavha va matn to'ldirilishi kerak.");
      return;
    }

    const category = CATEGORIES.find((c) => c.id === form.category);
    const slug = `${form.category}-${Date.now()}`;

    const builtLessons = lessons.map((l, i) => {
      const base = { id: `cl${i + 1}`, type: l.type, title: l.title, duration: l.duration };
      if (l.type === "presentation") {
        return { ...base, content: { keypoints: l.body.split("\n").filter(Boolean) } };
      }
      if (l.type === "code") {
        return { ...base, content: { explanation: l.body, code: l.exercise || "// kod misoli", language: l.language } };
      }
      return { ...base, content: { paragraphs: l.body.split("\n").filter(Boolean) } };
    });

    const course = {
      id: `admin_course_${Date.now()}`,
      slug,
      title: form.title,
      category: form.category,
      categoryName: category?.name || form.category,
      color: category?.color || "#6366F1",
      level: form.level,
      duration: form.duration,
      students: 0,
      rating: 5,
      description: form.description,
      lessons: builtLessons,
    };

    addCourse(course);
    toast.success("Kurs qo'shildi!");
    setForm({ title: "", category: CATEGORIES[0].id, level: LEVELS[0], duration: "4 soat", description: "" });
    setLessons([emptyLesson()]);
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">
          Statik: {COURSES.length} ta · Admin qo'shgan: {customCourses.length} ta
        </p>
        <Button size="sm" icon={Plus} onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Bekor qilish" : "Kurs qo'shish"}
        </Button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-5"
        >
          <Input label="Kurs nomi" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="masalan, Vue.js asoslari" />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-foreground">Kategoriya</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-foreground">Daraja</label>
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <Input label="Davomiyligi" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="6 soat" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">Tavsif</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Darslar</p>
            <button type="button" onClick={addLessonRow} className="text-xs font-medium text-accent hover:underline">
              + Dars qo'shish
            </button>
          </div>

          {lessons.map((lesson, i) => (
            <div key={lesson.localId} className="rounded-xl border border-border bg-surface-2 p-3.5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted">Dars {i + 1}</span>
                <button type="button" onClick={() => removeLessonRow(lesson.localId)} className="text-red-500 hover:opacity-70">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                <input
                  value={lesson.title}
                  onChange={(e) => updateLesson(lesson.localId, { title: e.target.value })}
                  placeholder="Dars sarlavhasi"
                  className="col-span-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent sm:col-span-1"
                />
                <select
                  value={lesson.type}
                  onChange={(e) => updateLesson(lesson.localId, { type: e.target.value })}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
                >
                  {LESSON_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <input
                  value={lesson.duration}
                  onChange={(e) => updateLesson(lesson.localId, { duration: e.target.value })}
                  placeholder="Davomiyligi"
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
                />
              </div>
              <textarea
                value={lesson.body}
                onChange={(e) => updateLesson(lesson.localId, { body: e.target.value })}
                placeholder={
                  lesson.type === "presentation"
                    ? "Har bir slayd matnini alohida qatorga yozing (har qator — bitta slayd)"
                    : lesson.type === "code"
                      ? "Tushuntirish matni"
                      : "Har bir abzasni alohida qatorga yozing"
                }
                rows={3}
                className="mt-2.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
              />
              {lesson.type === "code" && (
                <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <input
                    value={lesson.language}
                    onChange={(e) => updateLesson(lesson.localId, { language: e.target.value })}
                    placeholder="Til (javascript, css...)"
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
                  />
                  <textarea
                    value={lesson.exercise}
                    onChange={(e) => updateLesson(lesson.localId, { exercise: e.target.value })}
                    placeholder="Kod misoli"
                    rows={2}
                    className="rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs outline-none focus:border-accent sm:col-span-2"
                  />
                </div>
              )}
            </div>
          ))}

          <Button type="submit" className="mt-2 w-full justify-center">
            Kursni saqlash
          </Button>
        </motion.form>
      )}

      <div className="flex flex-col gap-2">
        {customCourses.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted">
            Hali admin tomonidan kurs qo'shilmagan.
          </p>
        ) : (
          customCourses.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg text-white" style={{ background: c.color }}>
                  <BookOpen size={15} />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted">
                    {c.categoryName} · {c.lessons.length} dars
                  </p>
                </div>
              </div>
              <button onClick={() => removeCourse(c.id)} className="text-red-500 hover:opacity-70">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
