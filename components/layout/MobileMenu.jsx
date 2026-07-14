"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, LogIn, UserPlus, Coins, Sparkles } from "lucide-react";
import { NAV_LINKS, PROFILE_LINKS } from "@/lib/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { useAiAssistantStore } from "@/store/useAiAssistantStore";
import Button from "@/components/ui/Button";

export default function MobileMenu({ open, onClose }) {
  const { isAuthenticated, user } = useAuthStore();
  const toggleAssistant = useAiAssistantStore((s) => s.toggle);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 h-dvh w-[82%] max-w-sm bg-surface border-l border-border p-6 md:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-sm font-semibold text-muted uppercase tracking-wider">
                Menyu
              </span>
              <button
                onClick={onClose}
                aria-label="Yopish"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 hover:bg-border transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {isAuthenticated && (
              <div className="mb-6 flex items-center justify-between rounded-2xl border border-border bg-surface-2 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-xs text-muted">Level {user.level}</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-2">
                  <Coins size={14} />
                  {user.coin}
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-1">
              <button
                onClick={() => {
                  toggleAssistant();
                  onClose();
                }}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground hover:bg-surface-2 transition-colors"
              >
                <Sparkles size={18} className="text-accent" />
                AI Yordamchi
              </button>
              <div className="my-1 h-px bg-border" />
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground hover:bg-surface-2 transition-colors"
                >
                  <link.icon size={18} className="text-muted" />
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              {PROFILE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground hover:bg-surface-2 transition-colors"
                >
                  <link.icon size={18} className="text-muted" />
                  {link.label}
                </Link>
              ))}
            </nav>

            {!isAuthenticated && (
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/login" variant="secondary" icon={LogIn} className="w-full" onClick={onClose}>
                  Kirish
                </Button>
                <Button href="/register" variant="primary" icon={UserPlus} className="w-full" onClick={onClose}>
                  Ro'yxatdan o'tish
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
