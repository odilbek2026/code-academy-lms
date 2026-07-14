function round(id, instruction, items, correctOrder, explanation) {
  return {
    id,
    instruction,
    items: items.map((label, i) => ({ id: `${id}-${i}`, label })),
    correctOrder: correctOrder.map((i) => `${id}-${i}`),
    explanation,
  };
}

export const ALGORITHM_ROUNDS = [
  round(
    "alg1",
    "Massivni 'Bubble Sort' algoritmi bilan saralash qadamlarini to'g'ri tartibga tering:",
    [
      "Massivning boshidan boshlang",
      "Qo'shni ikkita elementni solishtiring",
      "Agar chap element o'ngdan katta bo'lsa, ularni almashtiring",
      "Massiv oxirigacha davom eting",
      "Almashtirish bo'lmagunicha butun jarayonni takrorlang",
    ],
    [0, 1, 2, 3, 4],
    "Bubble Sort qo'shni elementlarni ketma-ket solishtirib, kerak bo'lsa almashtirib, massiv to'liq saralanguncha bir necha marta aylanib chiqadi."
  ),
  round(
    "alg2",
    "Binary Search (ikkilik qidiruv) algoritmi qadamlarini tartiblang:",
    [
      "Massiv saralangan bo'lishi shart",
      "O'rtadagi elementni tekshiring",
      "Agar u qidirilayotgan qiymat bo'lsa, qaytaring",
      "Agar kichik bo'lsa, o'ng yarmida qidiring",
      "Agar katta bo'lsa, chap yarmida qidiring",
    ],
    [0, 1, 2, 3, 4],
    "Binary Search har safar qidiruv maydonini ikkiga bo'lib, kerakli yarmida davom etadi — shu sababli juda tez ishlaydi (O(log n))."
  ),
  round(
    "alg3",
    "Foydalanuvchi login jarayonining mantiqiy ketma-ketligini tuzing:",
    [
      "Foydalanuvchi email va parolni kiritadi",
      "Server ma'lumotlarni tekshiradi",
      "Agar to'g'ri bo'lsa, token yaratiladi",
      "Token foydalanuvchi brauzerida saqlanadi",
      "Foydalanuvchi profil sahifasiga yo'naltiriladi",
    ],
    [0, 1, 2, 3, 4],
    "Bu — zamonaviy autentifikatsiya oqimining odatiy bosqichlari, token asosidagi tizimlarda keng qo'llaniladi."
  ),
  round(
    "alg4",
    "Rekursiv faktorial funksiyaning ishlash mantig'ini tartiblang:",
    [
      "factorial(3) chaqiriladi",
      "3 * factorial(2) hisoblanishi kerakligi aniqlanadi",
      "factorial(2) o'z navbatida 2 * factorial(1) ni chaqiradi",
      "factorial(1) bazaviy holatga yetib, 1 qaytaradi",
      "Natijalar teskari tartibda ko'paytirilib, 6 qaytariladi",
    ],
    [0, 1, 2, 3, 4],
    "Rekursiya bazaviy holatga (base case) yetguncha o'zini chaqiraveradi, so'ng natijalar orqaga qarab yig'ilib yakuniy javobni beradi."
  ),
  round(
    "alg5",
    "API so'rovini xatolarni to'g'ri boshqargan holda yozish tartibi:",
    [
      "try blokini boshlang",
      "fetch orqali so'rov yuboring",
      "Javob muvaffaqiyatli bo'lsa, ma'lumotni qayta ishlang",
      "catch blokida xatoni ushlang",
      "finally blokida loading holatini o'chiring",
    ],
    [0, 1, 2, 3, 4],
    "try/catch/finally tuzilmasi asinxron so'rovlarda xatolarni to'g'ri boshqarish va foydalanuvchi interfeysini har doim izchil holatda saqlash imkonini beradi."
  ),
];

export const FUNCTION_BUILDER_ROUNDS = [
  round(
    "fb1",
    "Ikki sonni qo'shadigan funksiyani to'g'ri qatorlar tartibida tuzing:",
    ["function sum(a, b) {", "return a + b;", "}"],
    [0, 1, 2],
    "Funksiya deklaratsiyasi ochiladi, ichida hisoblash amalga oshiriladi va return bilan natija qaytariladi, so'ng blok yopiladi."
  ),
  round(
    "fb2",
    "Massivdan juft sonlarni filtrlaydigan funksiyani tuzing:",
    ["function getEven(numbers) {", "return numbers.filter(n => n % 2 === 0);", "}"],
    [0, 1, 2],
    "filter() metodi shartga mos elementlarni yangi massivga yig'adi — bu yerda qoldiqsiz 2 ga bo'linadigan sonlar tanlanadi."
  ),
  round(
    "fb3",
    "Foydalanuvchi ma'lumotini asinxron olib keladigan funksiyani tuzing:",
    ["async function getUser(id) {", "const res = await fetch(`/api/users/${id}`);", "return res.json();", "}"],
    [0, 1, 2, 3],
    "async funksiya ichida await yordamida so'rov tugashini kutamiz, so'ng javobni JSON ko'rinishida qaytaramiz."
  ),
  round(
    "fb4",
    "Komponentda foydalanuvchi ismini state sifatida boshqarishni tuzing:",
    ["function NameInput() {", "const [name, setName] = useState('');", "return <input value={name} onChange={e => setName(e.target.value)} />;", "}"],
    [0, 1, 2, 3],
    "useState orqali boshlang'ich holat e'lon qilinadi, so'ng input value va onChange orqali state bilan bog'lanadi (controlled component)."
  ),
  round(
    "fb5",
    "Ro'yxatdan eng katta sonni topadigan funksiyani tuzing:",
    ["function findMax(numbers) {", "return Math.max(...numbers);", "}"],
    [0, 1, 2],
    "Spread operator massiv elementlarini alohida argumentlarga yoyadi, Math.max esa ular orasidan eng kattasini qaytaradi."
  ),
];

export const DRAG_DROP_ROUNDS = [
  round(
    "dd1",
    "To'g'ri ishlaydigan if/else tuzilmasini tartiblang:",
    ["if (age >= 18) {", "console.log('Katta yoshli');", "} else {", "console.log('Voyaga yetmagan');", "}"],
    [0, 1, 2, 3, 4],
    "if shartni tekshiradi, to'g'ri bo'lsa birinchi blok, aks holda else blok ichidagi kod bajariladi."
  ),
  round(
    "dd2",
    "for sikli yordamida 1 dan 5 gacha sonlarni chop etuvchi kodni tartiblang:",
    ["for (let i = 1; i <= 5; i++) {", "console.log(i);", "}"],
    [0, 1, 2],
    "for sikli boshlang'ich qiymat, shart va qadamdan iborat — har bir aylanishda blok ichidagi kod ishga tushadi."
  ),
  round(
    "dd3",
    "Massiv elementlarini ekranga chiqaradigan React kodini tartiblang:",
    ["function List({ items }) {", "return (", "<ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>", ");", "}"],
    [0, 1, 2, 3, 4],
    "Komponent props orqali items massivini oladi va map() yordamida har bir elementni <li> sifatida render qiladi."
  ),
  round(
    "dd4",
    "Try/catch bilan xavfsiz JSON parse qilishni tartiblang:",
    ["try {", "const data = JSON.parse(text);", "return data;", "} catch (error) {", "console.error('Xato:', error);", "}"],
    [0, 1, 2, 3, 4, 5],
    "try blokida xavfli amal bajariladi, xato yuz bersa dastur qulamasdan catch blokida ushlab qolinadi."
  ),
  round(
    "dd5",
    "Express'da oddiy POST endpoint yaratishni tartiblang:",
    ["app.post('/api/courses', (req, res) => {", "const course = req.body;", "saveCourse(course);", "res.status(201).json(course);", "});"],
    [0, 1, 2, 3, 4],
    "POST endpoint so'rov tanasidan (body) ma'lumotni oladi, saqlaydi va muvaffaqiyatli yaratilganini bildiruvchi 201 status bilan javob qaytaradi."
  ),
];
