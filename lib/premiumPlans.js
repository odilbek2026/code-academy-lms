export const PREMIUM_PLANS = [
  {
    id: "week",
    label: "1 haftalik",
    days: 7,
    price: 15000,
    pricePerDay: 2143,
    badge: null,
  },
  {
    id: "month",
    label: "1 oylik",
    days: 30,
    price: 45000,
    pricePerDay: 1500,
    badge: null,
  },
  {
    id: "quarter",
    label: "3 oylik",
    days: 90,
    price: 110000,
    originalPrice: 135000,
    pricePerDay: 1222,
    badge: "18% tejash",
  },
  {
    id: "year",
    label: "Yillik",
    days: 365,
    price: 350000,
    originalPrice: 540000,
    pricePerDay: 959,
    badge: "Eng foydali",
    popular: true,
  },
];

export const PREMIUM_FEATURES = [
  "Barcha 15 kursga cheklovsiz kirish",
  "Reklamasiz, tozalangan interfeys",
  "Profilda oltin Premium nishon (badge)",
  "Har bir Quiz/Test/O'yindan +25% ko'proq coin va XP",
  "Kurs sertifikatlarida Premium muhr",
  "Yangi kurslarga birinchilardan bo'lib kirish",
];

export function getPlanById(id) {
  return PREMIUM_PLANS.find((p) => p.id === id) || null;
}
