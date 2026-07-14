"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Presentation, Sparkles, CheckCircle2, Maximize2, Minimize2 } from "lucide-react";

function buildSlides(lesson) {
  const points = lesson.content.keypoints || [];
  const slides = [
    {
      kind: "intro",
      title: lesson.title,
      subtitle: `${points.length} ta asosiy tushuncha · ${lesson.duration}`,
    },
    ...points.map((text, i) => ({ kind: "point", index: i, total: points.length, text })),
    {
      kind: "outro",
      points,
    },
  ];
  return slides;
}

export default function PresentationLessonView({ lesson }) {
  const slides = useMemo(() => buildSlides(lesson), [lesson]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  const goTo = useCallback(
    (next) => {
      if (next < 0 || next >= slides.length) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setFullscreen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  // Dars almashganda prezentatsiyani boshidan boshlaymiz
  useEffect(() => {
    setIndex(0);
  }, [lesson.id]);

  const slide = slides[index];
  const progress = ((index + 1) / slides.length) * 100;

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className={fullscreen ? "fixed inset-0 z-[70] flex items-center justify-center bg-[#050608] p-6" : ""}>
      <div
        className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#12151C] to-[#0A0C10] ${
          fullscreen ? "aspect-video w-full max-w-4xl" : "aspect-video w-full"
        }`}
      >
        <div className="code-grid-bg pointer-events-none absolute inset-0 opacity-10" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[80px]" />

        {/* Progress bar */}
        <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-white/5">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Top bar */}
        <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white/60 backdrop-blur-sm">
            <Presentation size={11} /> {index + 1} / {slides.length}
          </span>
          <button
            onClick={() => setFullscreen((f) => !f)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white/60 backdrop-blur-sm transition-colors hover:text-white"
            aria-label={fullscreen ? "Kichraytirish" : "To'liq ekran"}
          >
            {fullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>

        {/* Slide content */}
        <div className="flex h-full items-center justify-center px-8 py-14 sm:px-16">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full text-center"
            >
              {slide.kind === "intro" && (
                <div className="flex flex-col items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Presentation size={24} />
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{slide.title}</h3>
                  <p className="text-sm text-white/50">{slide.subtitle}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-white/30">
                    <Sparkles size={12} /> Davom etish uchun o'ngga bosing yoki ok tugmasini ishlating
                  </p>
                </div>
              )}

              {slide.kind === "point" && (
                <div className="flex flex-col items-center gap-5">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-2">
                    {String(slide.index + 1).padStart(2, "0")} / {String(slide.total).padStart(2, "0")}
                  </span>
                  <p className="max-w-xl text-xl font-medium leading-relaxed text-white sm:text-2xl">{slide.text}</p>
                </div>
              )}

              {slide.kind === "outro" && (
                <div className="flex flex-col items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/15 text-green-500">
                    <CheckCircle2 size={24} />
                  </span>
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                    Ajoyib! Asosiylarini ko'rib chiqdingiz
                  </h3>
                  <ul className="mt-1 flex max-w-md flex-col gap-2 text-left">
                    {slide.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-white/60">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-green-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav arrows */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white/70 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white disabled:opacity-0"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          disabled={index === slides.length - 1}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white/70 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white disabled:opacity-0"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`${i + 1}-slayd`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-accent" : "w-1.5 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {!fullscreen && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted">Chap/o'ng strelka tugmalari bilan ham boshqarish mumkin</p>
          <button
            onClick={() => setFullscreen(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
          >
            <Maximize2 size={12} /> To'liq ekranda ochish
          </button>
        </div>
      )}
    </div>
  );
}
