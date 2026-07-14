"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Trophy } from "lucide-react";
import toast from "react-hot-toast";
import { HACKATHONS } from "@/lib/hackathonData";
import { useAdminContentStore } from "@/store/useAdminContentStore";
import { useHackathonStore } from "@/store/useHackathonStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminHackathonsPage() {
  const { customHackathons, addHackathon, removeHackathon } = useAdminContentStore();
  const getParticipantCount = useHackathonStore((s) => s.getParticipantCount);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    month: "",
    theme: "",
    description: "",
    startDate: "",
    endDate: "",
    prizeCoin: 30000,
    maxTeamSize: 4,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.month.trim() || !form.startDate || !form.endDate) {
      toast.error("Nomi, oyi va sanalarni to'ldiring.");
      return;
    }
    addHackathon({
      id: `admin_hackathon_${Date.now()}`,
      title: form.title,
      month: form.month,
      theme: form.theme,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      prizeCoin: Number(form.prizeCoin),
      maxTeamSize: Number(form.maxTeamSize),
      status: "upcoming",
    });
    toast.success("Hackathon e'lon qilindi!");
    setForm({ title: "", month: "", theme: "", description: "", startDate: "", endDate: "", prizeCoin: 30000, maxTeamSize: 4 });
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">
          Standart: {HACKATHONS.length} ta · Admin e'lon qilgan: {customHackathons.length} ta
        </p>
        <Button size="sm" icon={Plus} onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Bekor qilish" : "Hackathon e'lon qilish"}
        </Button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-5"
        >
          <Input label="Nomi" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="masalan, Mobile Sprint Hackathon" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Oy" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} placeholder="2026-yil sentyabr" />
            <Input label="Mavzu" value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })} placeholder="Qisqa mavzu" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">Tavsif</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-foreground">Boshlanish sanasi</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-foreground">Tugash sanasi</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Mukofot (coin)" type="number" min={0} value={form.prizeCoin} onChange={(e) => setForm({ ...form, prizeCoin: e.target.value })} />
            <Input label="Jamoa hajmi" type="number" min={1} value={form.maxTeamSize} onChange={(e) => setForm({ ...form, maxTeamSize: e.target.value })} />
          </div>

          <Button type="submit" className="w-full justify-center">
            E'lon qilish
          </Button>
        </motion.form>
      )}

      <div className="flex flex-col gap-2">
        {customHackathons.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted">
            Hali admin tomonidan hackathon e'lon qilinmagan.
          </p>
        ) : (
          customHackathons.map((h) => (
            <div key={h.id} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-2/15 text-accent-2">
                  <Trophy size={15} />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{h.title}</p>
                  <p className="text-xs text-muted">
                    {h.month} · {getParticipantCount(h.id)} ro'yxatdan o'tgan
                  </p>
                </div>
              </div>
              <button onClick={() => removeHackathon(h.id)} className="text-red-500 hover:opacity-70">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
