"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Trophy, Calendar, Users, Coins, Sparkles, Check } from "lucide-react";
import toast from "react-hot-toast";
import { HACKATHONS } from "@/lib/hackathonData";
import { useAuthStore } from "@/store/useAuthStore";
import { useHackathonStore } from "@/store/useHackathonStore";
import { useAdminContentStore } from "@/store/useAdminContentStore";
import Button from "@/components/ui/Button";

function formatRange(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  const opts = { day: "numeric", month: "long" };
  return `${s.toLocaleDateString("uz-UZ", opts)} — ${e.toLocaleDateString("uz-UZ", opts)}`;
}

export default function HackathonsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { register, isRegistered, getParticipantCount } = useHackathonStore();
  const customHackathons = useAdminContentStore((s) => s.customHackathons);
  const [teamName, setTeamName] = useState({});

  const all = [...HACKATHONS, ...customHackathons];
  const upcoming = all.filter((h) => h.status === "upcoming");
  const past = all.filter((h) => h.status === "past");

  function handleRegister(h) {
    if (!isAuthenticated) {
      toast.error("Ro'yxatdan o'tish uchun avval tizimga kiring.");
      router.push("/login");
      return;
    }
    const name = teamName[h.id]?.trim();
    if (!name) {
      toast.error("Jamoa nomini kiriting.");
      return;
    }
    const ok = register(h.id, user.id, name);
    if (ok) {
      toast.success(`"${h.title}"ga ro'yxatdan o'tdingiz!`);
    } else {
      toast.error("Siz allaqachon ro'yxatdan o'tgansiz.");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-32 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Trophy size={24} />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Hackathonlar</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Har oy yangi mavzuda hackathon o'tkazamiz. Jamoa tuzing, g'oyangizni amalga oshiring va coin mukofotlar uchun
          kurashing.
        </p>
      </div>

      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent">Yaqinlashib kelayotgan</p>
      {upcoming.length === 0 ? (
        <p className="mb-12 rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted">
          Hozircha rejalashtirilgan hackathon yo'q. Tez orada yangilanadi.
        </p>
      ) : (
        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {upcoming.map((h, i) => {
            const registered = isAuthenticated && isRegistered(h.id, user.id);
            const participants = getParticipantCount(h.id);
            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6"
              >
                <div className="code-grid-bg pointer-events-none absolute inset-0 opacity-[0.04]" />
                <div className="relative mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-accent-2/15 px-2.5 py-1 text-[11px] font-semibold text-accent-2">
                    <Sparkles size={11} className="mr-1 inline" /> {h.month}
                  </span>
                </div>
                <h3 className="relative font-display text-lg font-bold text-foreground">{h.title}</h3>
                <p className="relative mt-1 text-sm font-medium text-accent">{h.theme}</p>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-muted">{h.description}</p>

                <div className="relative mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> {formatRange(h.startDate, h.endDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Coins size={13} className="text-accent-2" /> {h.prizeCoin.toLocaleString("uz-UZ")} coin jamg'arma
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={13} /> {participants} ro'yxatdan o'tgan · jamoa {h.maxTeamSize} kishigacha
                  </span>
                </div>

                {registered ? (
                  <div className="relative mt-5 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm font-medium text-green-500">
                    <Check size={16} /> Siz ro'yxatdan o'tgansiz
                  </div>
                ) : (
                  <div className="relative mt-5 flex flex-col gap-2 sm:flex-row">
                    <input
                      value={teamName[h.id] || ""}
                      onChange={(e) => setTeamName((t) => ({ ...t, [h.id]: e.target.value }))}
                      placeholder="Jamoa nomi"
                      className="flex-1 rounded-full border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent"
                    />
                    <Button onClick={() => handleRegister(h)} size="md">
                      Ro'yxatdan o'tish
                    </Button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {past.length > 0 && (
        <>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">O'tgan hackathonlar</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {past.map((h) => (
              <div key={h.id} className="rounded-2xl border border-border bg-surface-2 p-5 opacity-80">
                <p className="mb-1 text-xs font-medium text-muted">{h.month}</p>
                <h3 className="font-display text-base font-semibold text-foreground">{h.title}</h3>
                <p className="mt-1 text-sm text-muted">{h.theme}</p>
                {h.winnerTeam && (
                  <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-accent-2">
                    <Trophy size={14} /> G'olib: {h.winnerTeam}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
