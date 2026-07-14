"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Gamepad2 } from "lucide-react";
import toast from "react-hot-toast";
import { GAMES } from "@/lib/gamesData";
import { useAdminContentStore } from "@/store/useAdminContentStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

// Faqat MCQ (ChoiceGame) mexanikasidagi o'yinlarga yangi raund qo'shish mumkin —
// Reorder va Memory o'yinlar boshqacha ma'lumot tuzilmasini talab qiladi.
const EDITABLE_GAME_IDS = ["js-challenge", "react-challenge", "flexbox-game", "grid-game", "error-finder", "variable-puzzle"];
const EDITABLE_GAMES = GAMES.filter((g) => EDITABLE_GAME_IDS.includes(g.id));

export default function AdminGamesPage() {
  const { customGameRounds, addGameRound, removeGameRound } = useAdminContentStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState(EDITABLE_GAMES[0]?.id || "");
  const [form, setForm] = useState({
    prompt: "",
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
    if (!form.prompt.trim() || form.options.some((o) => !o.trim()) || !form.explanation.trim()) {
      toast.error("Barcha maydonlarni to'ldiring.");
      return;
    }
    addGameRound(selectedGame, {
      id: `admin_round_${Date.now()}`,
      prompt: form.prompt,
      options: form.options,
      correct: Number(form.correct),
      explanation: form.explanation,
    });
    toast.success("Raund qo'shildi!");
    setForm({ prompt: "", options: ["", "", "", ""], correct: 0, explanation: "" });
    setShowForm(false);
  }

  return (
    <div>
      <p className="mb-5 text-sm text-muted">
        MCQ uslubidagi o'yinlarga (JS/React Challenge, Flexbox/Grid Game, Error Finder, Variable Puzzle) yangi savol-raund
        qo'shishingiz mumkin. Reorder va Code Memory o'yinlar hozircha faqat kod orqali tahrirlanadi.
      </p>

      <div className="mb-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {EDITABLE_GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGame(g.id)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                selectedGame === g.id ? "border-accent bg-accent text-white" : "border-border text-muted hover:text-foreground"
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">
          "{EDITABLE_GAMES.find((g) => g.id === selectedGame)?.title}" uchun admin qo'shgan raundlar:{" "}
          {(customGameRounds[selectedGame] || []).length} ta
        </p>
        <Button size="sm" icon={Plus} onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Bekor qilish" : "Raund qo'shish"}
        </Button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-5"
        >
          <Input label="Savol matni" value={form.prompt} onChange={(e) => setForm({ ...form, prompt: e.target.value })} placeholder="Savolni yozing" />

          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-medium text-foreground">Variantlar (to'g'risini belgilang)</label>
            {form.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="correct-game"
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
            Raundni saqlash
          </Button>
        </motion.form>
      )}

      <div className="flex flex-col gap-2">
        {(customGameRounds[selectedGame] || []).length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted">
            Bu o'yin uchun hali admin raundi qo'shilmagan.
          </p>
        ) : (
          (customGameRounds[selectedGame] || []).map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Gamepad2 size={15} />
                </span>
                <p className="text-sm font-medium text-foreground">{r.prompt}</p>
              </div>
              <button onClick={() => removeGameRound(selectedGame, r.id)} className="text-red-500 hover:opacity-70">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
