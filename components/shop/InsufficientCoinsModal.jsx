"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XCircle, Coins } from "lucide-react";
import Button from "@/components/ui/Button";

export default function InsufficientCoinsModal({ open, onClose, needed, have }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-surface p-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <XCircle size={26} />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">Sizda yetarli Coin mavjud emas</h3>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted">
              Kerak: <Coins size={13} className="text-accent-2" /> {needed} — Sizda: {have}
            </p>
            <p className="mt-1 text-xs text-muted">Test, Quiz va O'yinlarni yechib coin to'plang.</p>
            <div className="mt-6 flex gap-3">
              <Button href="/quiz" variant="primary" className="flex-1 justify-center" onClick={onClose}>
                Coin to'plash
              </Button>
              <Button variant="secondary" className="flex-1 justify-center" onClick={onClose}>
                Yopish
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
