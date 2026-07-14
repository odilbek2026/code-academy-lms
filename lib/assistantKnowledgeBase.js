// Oddiy, bepul va offline ishlaydigan savol-javob bazasi.
// Haqiqiy AI emas — kalit so'zlar bo'yicha eng mos javobni topadi.
// Yangi mavzu qo'shish uchun shunchaki quyidagi ro'yxatga yangi element qo'shing.

function entry(keywords, answer) {
  return { keywords, answer };
}

export const KNOWLEDGE_BASE = [
  entry(
    ["html nima", "html", "html degani"],
    "HTML (HyperText Markup Language) — veb-sahifaning skeletini quruvchi belgilash tili. U matn, rasm, tugma kabi elementlarni brauzerga qanday ko'rsatishni aytadi. Masalan, <h1> — katta sarlavha, <p> — oddiy matn, <button> — tugma. HTML dizayn yoki xatti-harakatni emas, faqat tuzilishni belgilaydi."
  ),
  entry(
    ["css nima", "css degani", "css"],
    "CSS (Cascading Style Sheets) — HTML elementlarining ko'rinishini (rang, o'lcham, joylashuv) belgilaydigan til. Masalan, HTML bilan tugma yaratasiz, CSS bilan uni ko'k rangga, yumaloq burchakka aylantirasiz."
  ),
  entry(
    ["javascript nima", "js nima", "javascript"],
    "JavaScript — veb-sahifani interaktiv qiladigan dasturlash tili. HTML va CSS statik ko'rinishni yaratsa, JavaScript tugma bosilganda, forma to'ldirilganda yoki ma'lumot yuklanganda nima bo'lishini boshqaradi."
  ),
  entry(
    ["let const var farqi", "let const var", "o'zgaruvchi", "ozgaruvchi"],
    "var, let va const — o'zgaruvchi e'lon qilish usullari. var — eski uslub, funksiya darajasida ishlaydi. let — blok darajasida, qiymatini o'zgartirish mumkin. const — blok darajasida, lekin qayta belgilab bo'lmaydi (ichki tarkibini o'zgartirish mumkin). Zamonaviy kodda ko'proq let va const ishlatiladi."
  ),
  entry(
    ["funksiya nima", "function nima", "funksiya"],
    "Funksiya — qayta-qayta ishlatish mumkin bo'lgan kod bo'lagi. U ma'lumot (argument) qabul qilib, natija (return) qaytarishi mumkin. Masalan: function sum(a, b) { return a + b; } — bu ikki sonni qo'shadigan funksiya."
  ),
  entry(
    ["array method", "map filter", "map()", "filter()", "massiv metod"],
    "map() — massivning har bir elementini o'zgartirib, yangi massiv qaytaradi. filter() — shartga mos elementlarni tanlab, yangi massiv qaytaradi. reduce() — massivni bitta qiymatga 'yig'adi' (masalan, yig'indi hisoblash). Bularning barchasi asl massivni o'zgartirmaydi."
  ),
  entry(
    ["async await", "asinxron", "promise nima"],
    "Promise — kelajakda tugaydigan amalning (masalan, serverdan ma'lumot olish) natijasini ifodalaydi. async/await esa Promise bilan ishlashni oddiy, ketma-ket yozilgan koddek ko'rsatadigan sintaksis. await fetch(...) — so'rov tugashini 'kutadi', keyingi qatorga o'tadi."
  ),
  entry(
    ["closure nima", "closure"],
    "Closure — funksiya o'zi yaratilgan muhitdagi o'zgaruvchilarni 'eslab qoladigan' xususiyat, hatto tashqi funksiya tugagandan keyin ham. Bu React'dagi useState kabi hook'larning ishlash mantig'i asosida yotadi."
  ),
  entry(
    ["react nima", "react"],
    "React — foydalanuvchi interfeyslarini komponentlar orqali qurish uchun JavaScript kutubxonasi. Har bir komponent — qayta ishlatiladigan, o'z holatiga (state) ega interfeys bo'lagi. React UI'ni state'ning funksiyasi sifatida ko'radi."
  ),
  entry(
    ["props state farqi", "props nima", "state nima"],
    "Props — komponentga tashqaridan uzatiladigan, o'zgarmas ma'lumotlar. State — komponentning o'z ichki holati, useState orqali boshqariladi va o'zgarganda komponent qayta chiziladi."
  ),
  entry(
    ["usestate nima", "usestate"],
    "useState — React hook, komponentga 'xotira' (holat) beradi. const [count, setCount] = useState(0) — count joriy qiymat, setCount uni yangilash funksiyasi, 0 — boshlang'ich qiymat."
  ),
  entry(
    ["useeffect nima", "useeffect"],
    "useEffect — komponent render bo'lgandan keyin 'yon ta'sirlarni' (masalan, ma'lumot yuklash, obuna bo'lish) bajarish uchun hook. Ikkinchi argument (dependency massiv) qachon qayta ishga tushishini belgilaydi."
  ),
  entry(
    ["nextjs nima", "next.js nima", "next js"],
    "Next.js — React asosidagi freymvork. U server tomonida render qilish, fayl asosidagi marshrutlash (routing) va SEO optimizatsiyasini oson qiladi. Bu platformaning o'zi ham Next.js'da yozilgan."
  ),
  entry(
    ["python nima", "python"],
    "Python — o'qilishi oson sintaksisga ega, boshlang'ichlar uchun eng qulay tillardan biri. Veb, sun'iy intellekt, avtomatlashtirish va ma'lumotlar tahlilida keng qo'llaniladi."
  ),
  entry(
    ["nodejs nima", "node.js nima", "node js"],
    "Node.js — JavaScript'ni brauzerdan tashqarida, serverda ishlatish imkonini beruvchi muhit. U orqali backend, API va serverlar yozish mumkin."
  ),
  entry(
    ["git nima", "git"],
    "Git — kod tarixini saqlaydigan va jamoaviy ishlashni osonlashtiradigan versiya nazorati tizimi. Har bir commit — kodning ma'lum vaqtdagi 'suratini' saqlaydi."
  ),
  entry(
    ["github nima", "github"],
    "GitHub — Git repozitoriylarini onlayn joylashtiruvchi platforma. Jamoaviy ishlash, code review va pull request'lar orqali loyihalar ustida birgalikda ishlash imkonini beradi."
  ),
  entry(
    ["api nima", "rest api", "api"],
    "API (Application Programming Interface) — ikkita dastur bir-biri bilan gaplashish uchun ishlatadigan 'til'. REST API — resurslarni URL manzillar orqali (GET, POST, PUT, DELETE) boshqarish uslubi."
  ),
  entry(
    ["database nima", "malumotlar bazasi", "ma'lumotlar bazasi", "sql nima"],
    "Ma'lumotlar bazasi — ma'lumotlarni tartibli saqlash va qidirish tizimi. SQL bazalar (PostgreSQL, MySQL) jadval va qat'iy sxemaga asoslanadi, NoSQL bazalar (MongoDB) esa moslashuvchan hujjat tuzilmasidan foydalanadi."
  ),
  entry(
    ["frontend backend farqi", "frontend nima", "backend nima"],
    "Frontend — foydalanuvchi ko'radigan va bilan ishlaydigan qism (interfeys). Backend — server tomonida ishlaydigan, ma'lumotlarni saqlaydigan va mantiqni boshqaradigan qism. Ikkalasi API orqali bog'lanadi."
  ),
  entry(
    ["algoritm nima", "algorithm", "big o"],
    "Algoritm — muayyan masalani yechish uchun aniq qadamlar ketma-ketligi. Big O notatsiyasi algoritmning ma'lumot hajmi oshganda qanchalik sekinlashishini o'lchaydi — masalan O(n) chiziqli, O(log n) juda tez."
  ),
  entry(
    ["flexbox nima", "flexbox"],
    "Flexbox — CSS'da elementlarni bir qator yoki ustunga tekis joylashtirish uslubi. display:flex bilan boshlanadi, justify-content gorizontal, align-items vertikal tekislashni boshqaradi."
  ),
  entry(
    ["grid nima", "css grid"],
    "CSS Grid — elementlarni ikki o'lchamli (qator VA ustun) panjarada joylashtirish uslubi. Flexbox bir yo'nalishda, Grid esa ikki yo'nalishda birdek ishlaydi."
  ),
  entry(
    ["coin qanday", "coin qanday yigish", "coin qanday olaman", "coin nima"],
    "Coin — platformada Test, Quiz va O'yinlarni yechib to'playdigan virtual pul. Har bir to'g'ri javob yoki g'alaba coin va XP beradi. Yutqizsangiz coin berilmaydi. To'plagan coiningizni Coin Shop'da mahsulotlarga almashtirishingiz mumkin."
  ),
  entry(
    ["xp nima", "level qanday oshadi", "daraja qanday"],
    "XP — tajriba ochkosi, Test/Quiz/O'yinlardan g'alaba bilan olinadi. Har 500 XP to'plaganingizda darajangiz (level) bir pog'ona oshadi."
  ),
  entry(
    ["leaderboard nima", "reyting"],
    "Leaderboard — barcha foydalanuvchilarning coin, XP va darajasi bo'yicha umumiy reytingi. U orqali eng faol o'quvchilarni ko'rishingiz mumkin."
  ),
  entry(
    ["hackathon nima", "hackathon qanday"],
    "Hackathon — platformada har oy o'tkaziladigan tanlov: jamoa tuzasiz, berilgan mavzu bo'yicha belgilangan muddatda loyiha yaratasiz. G'oliblar coin mukofot oladi. Hackathonlar sahifasidan ro'yxatdan o'tishingiz mumkin."
  ),
  entry(
    ["qanday kurs boshlayman", "kursni qanday boshlayman", "kurs qanday"],
    "Kurslar sahifasiga o'ting, o'zingizga mos yo'nalishni tanlang va 'Boshlash' tugmasini bosing. Har bir kurs prezentatsiya, matn va kod darslaridan iborat, progress avtomatik saqlanadi."
  ),
  entry(
    ["parol unutdim", "parolni tiklash"],
    "Hozircha parolni avtomatik tiklash funksiyasi mavjud emas — bu keyingi bosqichda qo'shiladi. Hozircha yangi hisob yaratishingiz mumkin."
  ),
  entry(
    ["salom", "assalomu alaykum", "hey", "hi"],
    "Salom! Dasturlash bo'yicha savolingiz bo'lsa, bemalol so'rang — HTML, CSS, JavaScript, React, Python va boshqa mavzularda yordam bera olaman."
  ),
  entry(
    ["rahmat", "raxmat", "tashakkur"],
    "Marhamat! Yana savol bo'lsa, bemalol so'rang."
  ),
];

const GREETING_WORDS = ["salom", "assalomu", "hey", "hi", "rahmat", "raxmat"];

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/['’ʻ`]/g, "")
    .replace(/[^a-zа-яё0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findAnswer(question) {
  const normalized = normalize(question);
  if (!normalized) return null;

  let best = null;
  let bestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    for (const keyword of item.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (!normalizedKeyword) continue;
      if (normalized.includes(normalizedKeyword)) {
        // Uzunroq (aniqroq) kalit so'z ustunlik oladi
        const score = normalizedKeyword.length;
        if (score > bestScore) {
          bestScore = score;
          best = item;
        }
      }
    }
  }

  return best ? best.answer : null;
}

export const FALLBACK_ANSWER =
  "Bu savolga hozircha aniq javobim yo'q. Men HTML, CSS, JavaScript, React, Python, Node.js, Git/GitHub, ma'lumotlar bazasi, algoritm va platformaning Coin/XP/Hackathon tizimi bo'yicha savollarga javob bera olaman — savolni boshqacharoq so'rab ko'ring.";
