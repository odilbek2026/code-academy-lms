"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, ShieldCheck, ShieldOff, Coins, Search, Crown } from "lucide-react";
import toast from "react-hot-toast";
import { listUsers, updateUser, deleteUser } from "@/lib/mockDb";
import { useAuthStore } from "@/store/useAuthStore";
import PremiumBadge from "@/components/ui/PremiumBadge";

export default function AdminUsersPage() {
  const currentUser = useAuthStore((s) => s.user);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [coinInputs, setCoinInputs] = useState({});

  function refresh() {
    setUsers(listUsers());
  }

  useEffect(() => {
    refresh();
  }, []);

  function toggleRole(user) {
    const nextRole = user.role === "admin" ? "user" : "admin";
    updateUser(user.id, { role: nextRole });
    toast.success(nextRole === "admin" ? `${user.username} admin qilindi.` : `${user.username} admin huquqi olib tashlandi.`);
    refresh();
  }

  function handleDelete(user) {
    if (user.id === currentUser?.id) {
      toast.error("O'zingizni o'chira olmaysiz.");
      return;
    }
    deleteUser(user.id);
    toast.success(`${user.username} o'chirildi.`);
    refresh();
  }

  function isUserPremium(u) {
    return u.premiumUntil && new Date(u.premiumUntil) > new Date();
  }

  function grantPremium(user) {
    const base = isUserPremium(user) ? new Date(user.premiumUntil) : new Date();
    base.setDate(base.getDate() + 30);
    updateUser(user.id, { premiumUntil: base.toISOString(), premiumPlan: "month" });
    toast.success(`${user.username}'ga 30 kunlik Premium berildi.`);
    refresh();
  }

  function revokePremium(user) {
    updateUser(user.id, { premiumUntil: null, premiumPlan: null });
    toast.success(`${user.username}'ning Premium'i bekor qilindi.`);
    refresh();
  }

  function addCoin(user) {
    const amount = Number(coinInputs[user.id] || 0);
    if (!amount || amount <= 0) {
      toast.error("Musbat son kiriting.");
      return;
    }
    updateUser(user.id, { coin: (user.coin || 0) + amount });
    toast.success(`${user.username}'ga +${amount} coin qo'shildi.`);
    setCoinInputs((c) => ({ ...c, [user.id]: "" }));
    refresh();
  }

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Foydalanuvchi qidirish..."
          className="w-full rounded-full border border-border bg-surface-2 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: (i % 10) * 0.02 }}
            className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {u.username[0]?.toUpperCase()}
              </span>
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {u.username}
                  {u.role === "admin" && (
                    <span className="rounded-full bg-accent-2/15 px-2 py-0.5 text-[10px] font-semibold text-accent-2">admin</span>
                  )}
                  {isUserPremium(u) && <PremiumBadge size="sm" />}
                </p>
                <p className="text-xs text-muted">
                  {u.email} · {u.coin} coin · Lvl {u.level}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={1}
                  value={coinInputs[u.id] || ""}
                  onChange={(e) => setCoinInputs((c) => ({ ...c, [u.id]: e.target.value }))}
                  placeholder="Coin"
                  className="w-20 rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-xs outline-none focus:border-accent"
                />
                <button
                  onClick={() => addCoin(u)}
                  className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
                >
                  <Coins size={12} /> Qo'shish
                </button>
              </div>
              <button
                onClick={() => (isUserPremium(u) ? revokePremium(u) : grantPremium(u))}
                className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
              >
                <Crown size={12} className={isUserPremium(u) ? "text-accent-2" : ""} />
                {isUserPremium(u) ? "Premium'ni bekor qilish" : "+30 kun Premium"}
              </button>
              <button
                onClick={() => toggleRole(u)}
                className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
              >
                {u.role === "admin" ? <ShieldOff size={12} /> : <ShieldCheck size={12} />}
                {u.role === "admin" ? "Admindan olish" : "Admin qilish"}
              </button>
              <button onClick={() => handleDelete(u)} className="rounded-lg border border-border p-1.5 text-red-500 hover:bg-red-500/10">
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted">
            Foydalanuvchi topilmadi.
          </p>
        )}
      </div>
    </div>
  );
}
