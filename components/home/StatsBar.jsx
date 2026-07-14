"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { SITE_STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{formatNumber(display)}</span>;
}

export default function StatsBar() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-5">
      {SITE_STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="flex flex-col items-center justify-center gap-1 bg-surface px-4 py-6 text-center"
        >
          <p className="font-display text-2xl font-bold tracking-tight text-foreground">
            <Counter value={stat.value} />
            {stat.suffix}
          </p>
          <p className="text-xs text-muted">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
