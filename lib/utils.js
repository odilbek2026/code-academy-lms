import clsx from "clsx";

// Zustand selectorlarida "s.something || []" kabi yozish har chaqiriqda YANGI massiv
// yaratadi — bu useSyncExternalStore uchun referens beqarorligini bildiradi va
// "getSnapshot should be cached" xatosi bilan cheksiz render siklini keltirib chiqaradi.
// Shu sababli bo'sh qiymat kerak bo'lganda doim shu bitta, barqaror referensdan foydalaniladi.
export const EMPTY_ARRAY = Object.freeze([]);

export function cn(...inputs) {
  return clsx(...inputs);
}

export function formatNumber(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return `${value}`;
}
