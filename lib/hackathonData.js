// Har oy o'tkaziladigan hackathonlar ro'yxati. Admin panel orqali yangilari qo'shilishi mumkin
// (store/useAdminContentStore.js -> customHackathons bilan birlashtiriladi).

export const HACKATHONS = [
  {
    id: "hk-2026-07",
    title: "AI Avvalambor Hackathon",
    month: "2026-yil iyul",
    theme: "Sun'iy intellekt yordamida kundalik muammolarni yechish",
    description:
      "Jamoalar 48 soat ichida AI'dan foydalangan holda ta'lim, sog'liqni saqlash yoki ekologiya sohasida real muammoni yechuvchi prototip yaratadi.",
    startDate: "2026-07-25",
    endDate: "2026-07-27",
    prizeCoin: 50000,
    maxTeamSize: 4,
    status: "upcoming",
  },
  {
    id: "hk-2026-08",
    title: "Frontend Speed Build",
    month: "2026-yil avgust",
    theme: "24 soatda eng chiroyli va tezkor veb-ilova",
    description:
      "Ishtirokchilar berilgan dizayn maketi asosida eng tez va pixel-perfect frontend ilovasini quradi. Baholash: tezlik, dizaynga mosligi, kod sifati.",
    startDate: "2026-08-15",
    endDate: "2026-08-16",
    prizeCoin: 35000,
    maxTeamSize: 3,
    status: "upcoming",
  },
  {
    id: "hk-2026-06",
    title: "Backend Battle",
    month: "2026-yil iyun",
    theme: "Yuqori yuklamaga chidamli API arxitekturasi",
    description:
      "Jamoalar minglab so'rovni bir vaqtda qayta ishlay oladigan backend tizim qurishdi. G'oliblar aniqlandi, natijalar e'lon qilindi.",
    startDate: "2026-06-06",
    endDate: "2026-06-08",
    prizeCoin: 40000,
    maxTeamSize: 4,
    status: "past",
    winnerTeam: "ByteForce",
  },
];

export function getUpcomingHackathons(list = HACKATHONS) {
  return list.filter((h) => h.status === "upcoming");
}

export function getPastHackathons(list = HACKATHONS) {
  return list.filter((h) => h.status === "past");
}
