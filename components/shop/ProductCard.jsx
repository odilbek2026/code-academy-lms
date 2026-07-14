"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coins, Package } from "lucide-react";

export default function ProductCard({ product, stock, onBuy, index = 0 }) {
  // Eslatma: lucide-react ikonkalari React.forwardRef orqali yaratiladi, shuning uchun
  // ularning turi "object", "function" emas — typeof tekshiruvi ularni noto'g'ri Package'ga
  // almashtirib qo'yardi. Haqiqiy tekshiruv — mavjudligini (truthy) tekshirish, chunki faqat
  // admin panel orqali qo'shilgan mahsulotlarda component-referens saqlanmaydi (icon: undefined).
  const Icon = product.icon || Package;
  const soldOut = stock <= 0;
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = product.image && !imgFailed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.25)]"
    >
      <div
        className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden p-6"
        style={{ background: `linear-gradient(135deg, ${product.color}22, ${product.color}05)` }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={product.image}
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain drop-shadow-lg"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <Icon size={44} style={{ color: product.color }} />
        )}
        {soldOut && (
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
            Tugadi
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-[14px] font-semibold text-foreground">{product.name}</h3>
        <p className="mb-4 flex-1 text-[12.5px] leading-relaxed text-muted">{product.description}</p>

        <div className="mb-3 flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1">
            <Package size={12} /> {stock} dona qoldi
          </span>
        </div>

        <button
          onClick={onBuy}
          disabled={soldOut}
          className="flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Coins size={14} />
          {product.coin.toLocaleString("uz-UZ")} coin
        </button>
      </div>
    </motion.div>
  );
}
