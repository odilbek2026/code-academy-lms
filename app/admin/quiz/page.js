"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Brain } from "lucide-react";
import toast from "react-hot-toast";
import { QUESTIONS, CATEGORY_LABELS } from "@/lib/questionBank";
import { useAdminContentStore } from "@/store/useAdminContentStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const DIFFICULTIES = [
  { id: "easy", label: "Oson" },
  { id: "medium", label: "O'rta" },
  { id: "hard", label: "Qiyin" },
];

export default function AdminQuizPage() {
  const { customQuestions, addQuestion, removeQuestion } = useAdminContentStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    category: Object.keys(CATEGORY_LABELS)[0],
    difficulty: "easy",
    question: "",
    options: ["", "", "", ""],
    correct: 0,
    explanation: "",
  });

  function updateOption(i, value) {
    setForm((f) => {
      const options = [...f.options];
      options[i] = value;
      return { ...f, options };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.question.trim() || form.options.some((o) => !o.trim()) || !form.explanation.trim()) {
      toast.error("Barcha maydonlarni to'ldiring.");
      return;
    }
    addQuestion({
      id: `admin_q_${Date.now()}`,
      category: form.category,
      difficulty: form.difficulty,
      question: form.question,
      options: form.options,
      correct: Number(form.correct),
      explanation: form.explanation,
    });
    toast.success("Savol qo'shildi!");
    setForm({ category: Object.keys(CATEGORY_LABELS)[0], difficulty: "easy", question: "", options: ["", "", "", ""], correct: 0, explanation: "" });
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">
          Bank: {QUESTIONS.length} ta · Admin qo'shgan: {customQuestions.length} ta
        </p>
        <Button size="sm" icon={Plus} onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Bekor qilish" : "Savol qo'shish"}
        </Button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-5"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-foreground">Yo'nalish</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent"
              >
                {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-foreground">Daraja</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input label="Savol matni" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="masalan, useMemo nima uchun ishlatiladi?" />

          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-medium text-foreground">Variantlar (to'g'risini belgilang)</label>
            {form.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="correct"
                  checked={form.correct === i}
                  onChange={() => setForm({ ...form, correct: i })}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                <input
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Variant ${i + 1}`}
                  className="flex-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">Tushuntirish</label>
            <textarea
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              rows={2}
              className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          <Button type="submit" className="w-full justify-center">
            Savolni saqlash
          </Button>
        </motion.form>
      )}

      <div className="flex flex-col gap-2">
        {customQuestions.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted">
            Hali admin tomonidan savol qo'shilmagan.
          </p>
        ) : (
          customQuestions.map((q) => (
            <div key={q.id} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Brain size={15} />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{q.question}</p>
                  <p className="text-xs text-muted">
                    {CATEGORY_LABELS[q.category] || q.category} · {q.difficulty}
                  </p>
                </div>
              </div>
              <button onClick={() => removeQuestion(q.id)} className="text-red-500 hover:opacity-70">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
