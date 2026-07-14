# codeacademy — Dasturlash o'quv platformasi

## Ishga tushirish
```bash
npm install
npm run dev
```
Brauzerda: http://localhost:3000

## AI Yordamchi
Navbardagi "AI Yordamchi" tugmasi hech qanday sozlashsiz, darhol ishlaydi — bepul va offline. U haqiqiy AI (masalan,
ChatGPT/Claude) emas, balki `lib/assistantKnowledgeBase.js` faylidagi tayyor savol-javob bazasidan kalit so'z bo'yicha
eng mos javobni topadi. Yangi mavzu qo'shish uchun shu faylga yangi `entry([...kalit so'zlar], "javob")` qatorini
qo'shish kifoya.

## Hozircha tayyor bo'lgan qismlar:
- Next.js App Router, Tailwind CSS v4, Framer Motion, Lucide Icons
- To'liq responsive Navbar/Footer, Dark/Light mode, Toast, custom scrollbar, 404, loading skeleton
- Login/Register (React Hook Form) + mock autentifikatsiya (`store/useAuthStore.js`, `lib/mockDb.js`)
- **Kurslar**: 15 ta kurs (har bir kategoriya bo'yicha 1 tadan), **har birida 7 ta chuqur dars** (105 dars jami) —
  2 ta boyitilgan prezentatsiya (har birida 5-7 slayd), 2 ta chuqur matn darsi va 3 ta amaliy kod darsi
  (oxirgisi — yakuniy amaliy topshiriq). Har bir kurs 0'dan professional darajagacha olib chiqadigan tarzda
  tuzilgan — sertifikat faqat BARCHA 7 ta darsni tugatgandan so'ng beriladi.
  Prezentatsiya darslar — slaydlar bo'yicha o'ngga/chapga o'tish, klaviatura strelkalari, progress-bar va
  to'liq ekran rejimiga ega interaktiv taqdimot (`components/courses/lessons/PresentationLessonView.jsx`),
  progress kuzatuvi (`store/useProgressStore.js`), kod nusxalash, amaliy topshiriqlar
- **Quiz va Test**: 83 ta qo'lda yozilgan haqiqiy savol (`lib/questionBank.js`), 9 kategoriya, 3 daraja
- **O'yinlar — barcha 13 tasi to'liq ishlaydi**:
  - Bug Hunter, Syntax Match, Typing Speed (o'ziga xos mexanika)
  - JavaScript Challenge, React Challenge, CSS Flexbox Game, Grid Game, Error Finder, Variable Puzzle
    (`components/games/ChoiceGame.jsx` — bitta qayta ishlatiladigan MCQ motori, `lib/choiceGamesData.js`)
  - Algorithm Game, Function Builder, Drag & Drop Coding
    (`components/games/ReorderGame.jsx` — qadamlarni to'g'ri tartibga terish motori, `lib/reorderGamesData.js`)
  - Code Memory (`components/games/MemoryGame.jsx` — juftlik topish mexanikasi, `lib/memoryGameData.js`)
- **Coin/XP tizimi**: g'alaba coin+XP beradi, yutqizishda coin berilmaydi (`useAuthStore.rewardUser`)
- **Coin Shop**: mahsulotlar, stock, xarid tarixi, "Coin yetarli emas" modali (`store/useShopStore.js`)
- **Leaderboard**: Top foydalanuvchilar reytingi
- Profil sahifasi (real coin/xp/level)
- **Admin Dashboard** (`/admin`) — faqat `role: "admin"` foydalanuvchilar kira oladi:
  - Demo admin hisobi avtomatik yaratiladi: `admin@codeacademy.uz` / `admin123`
  - Umumiy statistika (foydalanuvchilar, kurslar, savollar, o'yinlar, mahsulotlar, taqsimlangan coin)
  - Kurs qo'shish (darslari bilan birga) — darhol `/courses` da ko'rinadi
  - Quiz/Test savoli qo'shish — darhol Quiz va Test'da ishlatiladi
  - MCQ o'yinlariga (JS/React Challenge, Flexbox/Grid Game, Error Finder, Variable Puzzle) yangi raund qo'shish
  - Coin Shop mahsuloti qo'shish — darhol `/shop` da ko'rinadi
  - Foydalanuvchilarni boshqarish: admin qilish/olib tashlash, qo'lda coin qo'shish, o'chirish
  - Har oy yangi hackathon e'lon qilish (`/admin/hackathons`) — darhol `/hackathons`da chiqadi
- **Hackathon** (`/hackathons`) — har oylik hackathon e'lonlari, jamoa nomi bilan ro'yxatdan o'tish, o'tgan
  hackathonlar arxivi (g'oliblar bilan)
- **AI Yordamchi** — navbardagi tugma orqali ochiladigan chat vidjeti. Bepul, offline, tayyor bilimlar bazasiga
  asoslangan (haqiqiy AI emas) — sozlashsiz darhol ishlaydi
- **Premium a'zolik** (`/premium`) — 4 ta tarif (1 hafta, 1 oy, 3 oy, yillik), chiroyli narxlar sahifasi va
  to'liq checkout oqimi (karta raqami, muddat, CVV, "to'lov qilinmoqda" animatsiyasi, muvaffaqiyat ekrani).
  Premium foydalanuvchida: profil va navbarda oltin **Premium nishon**, barcha Quiz/Test/O'yindan **+25% ko'proq
  coin va XP** (`useAuthStore.rewardUser` ichida avtomatik hisoblanadi), admin panelda qo'lda Premium
  berish/bekor qilish imkoniyati.

  **Muhim:** to'lov oqimi hozircha **demo rejimda** ishlaydi — real pul yechilmaydi, karta ma'lumotlari
  hech qayerga yuborilmaydi. Haqiqiy onlayn to'lovni ulash uchun (Click, Payme, Stripe va h.k.):
  1. Tanlagan to'lov tizimingizdan merchant/biznes hisob va API kalitlarini oling
  2. `components/premium/CheckoutModal.jsx` dagi `handleSubmit` funksiyasini shu tizimning real checkout
     so'rovi bilan almashtiring
  3. To'lov tizimidan "muvaffaqiyatli to'landi" tasdiqlomasi (webhook) kelgandan keyingina
     `activatePremium()` chaqirilishi kerak — hozirgi demo versiyada bu darhol chaqiriladi

## Hali "Tez orada" holatida:
- Daily Challenge, Achievement System, Referral
- Reorder/Memory o'yinlariga (Algorithm Game, Function Builder, Drag & Drop Coding, Code Memory) admin panel orqali kontent qo'shish (hozircha faqat kod orqali)

## Profil → Statistika va Sertifikatlar (real ma'lumotlar asosida)
- **Statistika** (`/profile/stats`) — real Level/XP radial progress, boshlangan/tugatilgan kurslar, tugatilgan
  darslar soni, do'kondan xaridlar, hackathon ishtiroki va har bir kurs bo'yicha progress-bar. Hech qanday
  o'ylab topilgan (fake) raqam yo'q — barchasi haqiqiy foydalanuvchi ma'lumotidan hisoblanadi.
- **Sertifikatlar** (`/profile/certificates`) — kursni 100% tugatganda avtomatik paydo bo'ladi, `jsPDF` orqali
  haqiqiy, yuklab olinadigan PDF fayl generatsiya qilinadi (soxta tugma emas).

## Halollik bo'yicha eslatma
Bosh sahifadagi statistikalar (Testlar, Quiz savollari, Kurslar, O'yinlar) platformadagi **haqiqiy** sonlarga mos
keladi — avvalgi "1000+" kabi raqamlar amaldagi kontent bilan mos kelmagani uchun to'g'irlandi.

## Ma'lumotlar bazasi
Hozircha localStorage-based mock DB ishlatiladi (`lib/mockDb.js`). Real MongoDB/Firebase ulash uchun shu fayldagi
funksiyalarni (createUser, findUserByCredentials va h.k.) tegishli backend chaqiruvlariga almashtirish kifoya —
qolgan qismlar o'zgarishsiz qoladi.

## Fayl strukturasi
```
app/            — sahifalar (App Router)
components/
  layout/       — Navbar, Footer, MobileMenu
  home/         — Hero, StatsBar, CategoryGrid, PillarsSection, CtaBanner, CodeWindow
  courses/      — CourseCard, LessonSidebar, lessons/ (Presentation/Text/Code)
  games/        — ChoiceGame, ReorderGame, MemoryGame, GameResultCard (qayta ishlatiladigan motorlar)
  quiz/         — QuizEngine
  shop/         — ProductCard, InsufficientCoinsModal
  ui/           — Button, Input, Logo, ThemeToggle, ComingSoon, ToasterProvider
store/          — Zustand: useAuthStore, useThemeStore, useProgressStore, useShopStore,
                  useAdminContentStore, useHackathonStore, useAiAssistantStore
lib/            — constants, utils, mockDb, coursesData, questionBank, gamesData,
                  bugHunterData, typingSnippets, choiceGamesData, reorderGamesData,
                  memoryGameData, shopData, leaderboardData, hackathonData, assistantKnowledgeBase, highlight
```

## Keyingi bosqich uchun takliflar
- Daily Challenge, Achievement tizimi, Sertifikat generatori
- Profil statistikasi (grafiklar)
- Real backend (MongoDB/Firebase) ga ulanish

# code-academy-lms
