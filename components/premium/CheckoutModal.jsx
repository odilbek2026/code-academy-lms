"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Lock, Loader2, CheckCircle2, Sparkles, Info } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/components/ui/Button";

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutModal({ plan, onClose, onSuccess }) {
  const { activatePremium } = useAuthStore();
  const [step, setStep] = useState("form"); // form -> processing -> success
  const [form, setForm] = useState({ number: "", name: "", expiry: "", cvv: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (form.number.replace(/\s/g, "").length < 16 || !form.name.trim() || form.expiry.length < 5 || form.cvv.length < 3) {
      toast.error("Barcha karta ma'lumotlarini to'liq kiriting.");
      return;
    }

    setStep("processing");
    setTimeout(() => {
      activatePremium(plan.id, plan.days);
      setStep("success");
    }, 1800);
  }

  function handleDone() {
    toast.success("Premium faollashtirildi! Xush kelibsiz 👑");
    onSuccess?.();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface"
      >
        {step !== "success" && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-muted hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" exit={{ opacity: 0 }} className="p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-2 to-yellow-500 text-white">
                  <CreditCard size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{plan.label} Premium</p>
                  <p className="text-xs text-muted">{plan.price.toLocaleString("uz-UZ")} so'm</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-foreground">Karta raqami</label>
                  <input
                    value={form.number}
                    onChange={(e) => setForm({ ...form, number: formatCardNumber(e.target.value) })}
                    placeholder="8600 0000 0000 0000"
                    inputMode="numeric"
                    className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 font-mono text-sm outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-foreground">Karta egasining ismi</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="ISM FAMILIYA"
                    className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-foreground">Muddati</label>
                    <input
                      value={form.expiry}
                      onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                      placeholder="OO/YY"
                      inputMode="numeric"
                      className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 font-mono text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-foreground">CVV</label>
                    <input
                      value={form.cvv}
                      onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                      placeholder="•••"
                      inputMode="numeric"
                      className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 font-mono text-sm outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <Button type="submit" size="md" icon={Lock} className="mt-2 w-full justify-center">
                  {plan.price.toLocaleString("uz-UZ")} so'm to'lash
                </Button>

                <div className="mt-1 flex items-start gap-2 rounded-xl bg-surface-2 px-3 py-2.5 text-[11px] leading-relaxed text-muted">
                  <Info size={13} className="mt-0.5 shrink-0" />
                  Bu — demo to'lov rejimi. Haqiqiy pul yechilmaydi, karta ma'lumotlari hech qayerga
                  yuborilmaydi va saqlanmaydi. Real to'lov tizimini ulash uchun loyiha README'siga qarang.
                </div>
              </form>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 px-7 py-20">
              <Loader2 size={32} className="animate-spin text-accent" />
              <p className="text-sm font-medium text-foreground">To'lov qayta ishlanmoqda...</p>
              <p className="text-xs text-muted">Iltimos, sahifani yopmang</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 px-7 py-14 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-2 to-yellow-500 text-white"
              >
                <CheckCircle2 size={30} />
                <motion.span
                  className="absolute -right-1 -top-1 text-yellow-300"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
                >
                  <Sparkles size={16} />
                </motion.span>
              </motion.span>
              <h3 className="font-display text-lg font-bold text-foreground">Tabriklaymiz! 👑</h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Siz endi <span className="font-semibold text-accent-2">Premium</span> a'zosiz. {plan.label} tarif
                faollashtirildi.
              </p>
              <Button onClick={handleDone} size="md" className="mt-3 w-full justify-center">
                Profilga o'tish
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
