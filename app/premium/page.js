"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Crown, Check, Sparkles, Zap, Award, Rocket, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { PREMIUM_PLANS, PREMIUM_FEATURES } from "@/lib/premiumPlans";
import { useAuthStore } from "@/store/useAuthStore";
import CheckoutModal from "@/components/premium/CheckoutModal";
import PremiumBadge from "@/components/ui/PremiumBadge";
import Button from "@/components/ui/Button";

export default function PremiumPage() {
  const router = useRouter();
  const { user, isAuthenticated, isPremiumActive } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const alreadyPremium = isAuthenticated && isPremiumActive();

  function handleChoose(plan) {
    if (!isAuthenticated) {
      toast.error("Premium sotib olish uchun avval tizimga kiring.");
      router.push("/login");
      return;
    }
    setSelectedPlan(plan);
  }

  return (
    <section className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-2/25 via-yellow-400/20 to-accent-2/25 blur-[120px]" />
      <div className="code-grid-bg pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-2 to-yellow-500 text-white shadow-[0_16px_40px_-12px_rgba(245,166,35,0.6)]"
          >
            <Crown size={28} fill="currentColor" />
          </motion.span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            <span className="bg-gradient-to-r from-accent-2 via-yellow-400 to-accent-2 bg-clip-text text-transparent">
              codeacademy Premium
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Cheklovsiz o'rganish tajribasi. Barcha kurslar, ko'proq coin, oltin nishon — o'zingizga mos
            muddatni tanlang.
          </p>

          {alreadyPremium && (
            <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-4 py-2 text-sm text-accent-2">
              <PremiumBadge size="sm" showLabel={false} />
              Sizda faol Premium bor — {new Date(user.premiumUntil).toLocaleDateString("uz-UZ")} gacha
            </div>
          )}
        </div>

        {/* Feature list */}
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PREMIUM_FEATURES.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-2/15 text-accent-2">
                <Check size={14} />
              </span>
              <p className="text-[13.5px] text-foreground">{feature}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PREMIUM_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative flex flex-col overflow-hidden rounded-3xl border p-6 ${
                plan.popular
                  ? "border-accent-2/50 bg-gradient-to-b from-accent-2/10 to-surface shadow-[0_20px_50px_-20px_rgba(245,166,35,0.35)]"
                  : "border-border bg-surface"
              }`}
            >
              {plan.popular && (
                <span className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-accent-2 to-yellow-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  <Sparkles size={10} className="mr-1 inline" /> Eng foydali
                </span>
              )}
              {plan.badge && !plan.popular && (
                <span className="mb-3 w-fit rounded-full bg-green-500/10 px-2.5 py-1 text-[11px] font-semibold text-green-500">
                  {plan.badge}
                </span>
              )}

              <p className="text-sm font-medium text-muted">{plan.label}</p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-bold text-foreground">
                  {plan.price.toLocaleString("uz-UZ")}
                </span>
                <span className="text-sm text-muted">so'm</span>
              </div>
              {plan.originalPrice && (
                <span className="mt-1 text-xs text-muted line-through">
                  {plan.originalPrice.toLocaleString("uz-UZ")} so'm
                </span>
              )}
              <p className="mt-1 text-[11px] text-muted">
                kuniga ~{plan.pricePerDay.toLocaleString("uz-UZ")} so'm
              </p>

              <Button
                onClick={() => handleChoose(plan)}
                variant={plan.popular ? "primary" : "secondary"}
                size="md"
                className="mt-6 w-full justify-center"
              >
                Tanlash
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} /> Istalgan vaqt bekor qilish mumkin
          </span>
          <span className="flex items-center gap-1.5">
            <Zap size={14} /> Darhol faollashadi
          </span>
          <span className="flex items-center gap-1.5">
            <Award size={14} /> 15 000+ o'quvchi tanlovi
          </span>
          <span className="flex items-center gap-1.5">
            <Rocket size={14} /> Yangilanishlar birinchi bo'lib
          </span>
        </div>
      </div>

      {selectedPlan && (
        <CheckoutModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => router.push("/profile")}
        />
      )}
    </section>
  );
}
