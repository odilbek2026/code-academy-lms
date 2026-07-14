"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User as UserIcon } from "lucide-react";
import { findAnswer, FALLBACK_ANSWER } from "@/lib/assistantKnowledgeBase";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Salom! Men codeacademy yordamchisiman. HTML, CSS, JavaScript, React, Python va platforma (coin, XP, hackathon) bo'yicha savol bering.",
};

// Bepul, offline ishlaydigan yordamchi — haqiqiy AI emas, tayyor
// bilimlar bazasidan (lib/assistantKnowledgeBase.js) kalit so'z bo'yicha javob topadi.
const THINK_DELAY_MS = 500;

export default function AiAssistant({ open, onClose }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const answer = findAnswer(text) || FALLBACK_ANSWER;
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
      setLoading(false);
    }, THINK_DELAY_MS);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-5 z-[60] flex h-[min(600px,80dvh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-white">
                <Sparkles size={15} />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">AI Yordamchi</p>
                <p className="text-[11px] text-muted">O'quvchilar uchun · bepul</p>
              </div>
            </div>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-border">
              <X size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    m.role === "user" ? "bg-accent text-white" : "bg-surface-2 text-accent"
                  }`}
                >
                  {m.role === "user" ? <UserIcon size={13} /> : <Bot size={13} />}
                </span>
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                    m.role === "user" ? "bg-accent text-white" : "bg-surface-2 text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                  <Bot size={13} />
                </span>
                <div className="flex items-center gap-1 rounded-2xl bg-surface-2 px-3.5 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Savolingizni yozing..."
              className="flex-1 rounded-full border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-accent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
