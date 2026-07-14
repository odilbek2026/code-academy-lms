function r(id, prompt, options, correct, explanation, extra = {}) {
  return { id, prompt, options, correct, explanation, ...extra };
}

export const JS_CHALLENGE_ROUNDS = [
  r(
    "js1",
    "Konsolda nima chiqadi?",
    ["1 2 3", "undefined undefined undefined", "0 1 2", "xato beradi"],
    2,
    "var bilan e'lon qilingan i sikldan tashqarida ham umumiy bo'lgani uchun setTimeout ishga tushganda i allaqachon 3 ga teng bo'ladi — lekin bu misolda let ishlatilgani uchun har bir iteratsiya o'z nusxasini oladi: 0, 1, 2.",
    { code: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}`, language: "javascript" }
  ),
  r(
    "js2",
    "typeof null nimani qaytaradi?",
    ["'null'", "'undefined'", "'object'", "'boolean'"],
    2,
    "Bu JavaScript'ning mashhur tarixiy xatosi: typeof null har doim 'object' qaytaradi.",
    { code: `console.log(typeof null);`, language: "javascript" }
  ),
  r(
    "js3",
    "Natija nima bo'ladi?",
    ["3", "'12'", "NaN", "xato"],
    1,
    "+ operatori satr bilan ishlatilganda sonni ham satrga aylantirib qo'shadi: '1' + 2 = '12'.",
    { code: `console.log('1' + 2);`, language: "javascript" }
  ),
  r(
    "js4",
    "Massiv nechta elementga ega bo'ladi?",
    ["2", "3", "4", "xato beradi"],
    1,
    "spread operator massivni yoyib, yangi elementlar bilan birga qo'shadi: [1,2] + 3 = [1,2,3].",
    { code: `const a = [1, 2];\nconst b = [...a, 3];\nconsole.log(b.length);`, language: "javascript" }
  ),
  r(
    "js5",
    "Bu kod nima qaytaradi?",
    ["true", "false", "undefined", "xato"],
    1,
    "Obyektlar solishtirilganda qiymati emas, xotiradagi manzili solishtiriladi — ikkita alohida obyekt hech qachon === bo'lmaydi.",
    { code: `console.log({} === {});`, language: "javascript" }
  ),
  r(
    "js6",
    "Funksiya nimani qaytaradi?",
    ["undefined", "1", "function", "xato beradi"],
    0,
    "Arrow function'da figurali qavs { } ishlatilsa, aniq return yozilmasa, funksiya undefined qaytaradi.",
    { code: `const fn = () => { 1 + 1; };\nconsole.log(fn());`, language: "javascript" }
  ),
];

export const REACT_CHALLENGE_ROUNDS = [
  r(
    "rc1",
    "Bu komponentda qanday muammo bor?",
    [
      "Hech qanday muammo yo'q",
      "key prop yo'q, bu list render'da ogohlantirish beradi",
      "useState noto'g'ri chaqirilgan",
      "JSX sintaksisi xato",
    ],
    1,
    "Ro'yxat render qilinganda har bir elementga o'ziga xos key berish kerak — aks holda React noto'g'ri qayta render qilishi mumkin.",
    { code: `{items.map(item => <li>{item.name}</li>)}`, language: "javascript" }
  ),
  r(
    "rc2",
    "Bu kod nega ishlamaydi?",
    [
      "useState noto'g'ri import qilingan",
      "count har doim 0 bo'lib qoladi, chunki eski state closure'da qolgan",
      "setCount funksiyasi mavjud emas",
      "Kod to'g'ri ishlaydi",
    ],
    1,
    "setTimeout ichida count o'zgaruvchisi chaqirilgan paytdagi qiymatni 'eslab qoladi' (closure). Yangilangan qiymatni olish uchun setCount(c => c + 1) funksional shaklidan foydalanish kerak.",
    { code: `const [count, setCount] = useState(0);\n\nfunction handleClick() {\n  setTimeout(() => setCount(count + 1), 1000);\n}`, language: "javascript" }
  ),
  r(
    "rc3",
    "useEffect qachon qayta ishga tushadi?",
    ["Hech qachon", "Har bir render'da", "Faqat id o'zgarganda", "Faqat komponent o'chirilganda"],
    2,
    "Dependency massivida [id] ko'rsatilgani uchun useEffect faqat id qiymati o'zgarganda qayta ishga tushadi.",
    { code: `useEffect(() => {\n  fetchUser(id);\n}, [id]);`, language: "javascript" }
  ),
  r(
    "rc4",
    "Bu komponent props'ni to'g'ri ishlatyaptimi?",
    ["Ha, to'g'ri", "Yo'q, props o'zgartirilmasligi kerak (read-only)", "Yo'q, props massiv bo'lishi kerak", "Yo'q, useState kerak"],
    1,
    "Props — read-only. Komponent ichida props.value = ... deb to'g'ridan-to'g'ri o'zgartirish React tamoyillariga zid.",
    { code: `function Badge(props) {\n  props.value = props.value.toUpperCase();\n  return <span>{props.value}</span>;\n}`, language: "javascript" }
  ),
  r(
    "rc5",
    "Nega bu komponent cheksiz render bo'lishi mumkin?",
    [
      "useState noto'g'ri",
      "useEffect'da dependency massivi yo'q va ichida state yangilanmoqda",
      "JSX xato",
      "Muammo yo'q",
    ],
    1,
    "Dependency massivisiz useEffect har render'dan keyin ishga tushadi, ichida state yangilansa — bu cheksiz sikl yaratadi.",
    { code: `useEffect(() => {\n  setCount(count + 1);\n});`, language: "javascript" }
  ),
  r(
    "rc6",
    "Bolalar komponentiga ma'lumot qanday uzatiladi?",
    ["State orqali", "Props orqali", "Context faqat", "useRef orqali"],
    1,
    "Ota komponentdan bola komponentga ma'lumot uzatishning standart yo'li — props.",
    { code: `<UserCard name="Ali" age={22} />`, language: "javascript" }
  ),
];

export const FLEXBOX_ROUNDS = [
  r(
    "fx1",
    "Elementlarni gorizontal markazga joylashtirish uchun nima kerak?",
    ["align-items: center", "justify-content: center", "text-align: center", "margin: center"],
    1,
    "Flex konteynerda justify-content asosiy o'q (odatda gorizontal) bo'yicha joylashuvni boshqaradi.",
    { code: `.container { display: flex; }`, language: "css" }
  ),
  r(
    "fx2",
    "Elementlarni vertikal markazga joylashtirish uchun nima kerak?",
    ["justify-content: center", "align-items: center", "flex-direction: center", "vertical-align: middle"],
    1,
    "align-items ko'ndalang o'q (odatda vertikal) bo'yicha tekislaydi.",
    { code: `.container { display: flex; height: 200px; }`, language: "css" }
  ),
  r(
    "fx3",
    "Elementlarni ustunga (vertikal ketma-ketlikka) joylashtirish uchun nima kerak?",
    ["flex-direction: column", "flex-wrap: wrap", "flex-direction: row", "display: grid"],
    0,
    "flex-direction: column asosiy o'qni vertikalga aylantiradi.",
    { code: `.container { display: flex; }`, language: "css" }
  ),
  r(
    "fx4",
    "Bitta elementni boshqalardan farqli tekislash uchun nima ishlatiladi?",
    ["align-self", "justify-self", "self-align", "flex-self"],
    0,
    "align-self shu elementga align-items'ni bekor qilib, individual tekislash beradi.",
    { code: `.item-special { align-self: flex-end; }`, language: "css" }
  ),
  r(
    "fx5",
    "Elementlar bir qatorga sig'masa, keyingi qatorga o'tishi uchun nima kerak?",
    ["flex-wrap: wrap", "flex-shrink: 0", "overflow: scroll", "flex-basis: auto"],
    0,
    "flex-wrap: wrap elementlarga konteyner sig'masa keyingi qatorga o'tish imkonini beradi.",
    { code: `.container { display: flex; }`, language: "css" }
  ),
  r(
    "fx6",
    "Elementlar orasiga teng bo'shliq qo'yish uchun eng qulay xususiyat qaysi?",
    ["margin: auto har biriga", "gap", "padding", "border-spacing"],
    1,
    "gap xususiyati flex va grid konteynerlarda elementlar orasiga oson bo'shliq qo'yadi.",
    { code: `.container { display: flex; }`, language: "css" }
  ),
];

export const GRID_ROUNDS = [
  r(
    "gr1",
    "3 ta teng ustun yaratish uchun nima yoziladi?",
    ["grid-template-columns: 3", "grid-template-columns: repeat(3, 1fr)", "grid-columns: 3fr", "columns: 3"],
    1,
    "repeat(3, 1fr) uchta teng kenglikdagi ustun yaratadi.",
    { code: `.grid { display: grid; }`, language: "css" }
  ),
  r(
    "gr2",
    "Grid elementlari orasidagi bo'shliqni qanday belgilaymiz?",
    ["margin", "gap", "spacing", "grid-space"],
    1,
    "gap xususiyati grid qatorlar va ustunlar orasidagi bo'shliqni belgilaydi.",
    { code: `.grid { display: grid; grid-template-columns: repeat(3, 1fr); }`, language: "css" }
  ),
  r(
    "gr3",
    "Ekran kengligiga qarab avtomatik moslashadigan panjara uchun nima ishlatiladi?",
    ["auto-fit / minmax", "flex-wrap", "float", "column-count"],
    0,
    "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) — ekran kengligiga qarab ustunlar sonini avtomatik moslaydi.",
    { code: `.grid { display: grid; }`, language: "css" }
  ),
  r(
    "gr4",
    "Elementni 2 ta ustunni egallashi uchun nima yoziladi?",
    ["grid-column: span 2", "column-span: 2", "width: 2fr", "grid-width: 2"],
    0,
    "grid-column: span 2 element ikkita ustun kengligini egallashini bildiradi.",
    { code: `.grid { display: grid; grid-template-columns: repeat(4, 1fr); }`, language: "css" }
  ),
  r(
    "gr5",
    "Grid va Flexbox orasidagi asosiy farq nima?",
    [
      "Grid faqat mobil uchun",
      "Grid ikki o'lchamli (qator va ustun), Flexbox bir o'lchamli joylashuv uchun",
      "Farqi yo'q",
      "Flexbox eskirgan",
    ],
    1,
    "Grid qator VA ustunlarni bir vaqtda boshqaradi, Flexbox esa faqat bitta yo'nalishda (qator yoki ustun) ishlaydi.",
    { code: null }
  ),
  r(
    "gr6",
    "Nomli grid maydonlarini qanday belgilaymiz?",
    ["grid-area / grid-template-areas", "grid-name", "area-template", "named-grid"],
    0,
    "grid-template-areas konteynerda nomli zonalar yaratadi, elementlar esa grid-area orqali shu zonalarga joylashadi.",
    { code: null }
  ),
];

export const ERROR_FINDER_ROUNDS = [
  r(
    "ef1",
    "Bu kod ishga tushirilganda qanday xato beradi?",
    ["SyntaxError", "ReferenceError: x is not defined", "TypeError", "Hech qanday xato yo'q"],
    1,
    "x o'zgaruvchisi hech qayerda e'lon qilinmagan, shuning uchun uni chaqirish ReferenceError beradi.",
    { code: `console.log(x);`, language: "javascript" }
  ),
  r(
    "ef2",
    "Bu yerda qaysi xato yuz beradi?",
    ["ReferenceError", "TypeError: null'ning xususiyatini o'qib bo'lmaydi", "SyntaxError", "Xato bo'lmaydi"],
    1,
    "user null bo'lgani uchun user.name'ga murojaat qilish TypeError beradi — null'ning xususiyatlari yo'q.",
    { code: `const user = null;\nconsole.log(user.name);`, language: "javascript" }
  ),
  r(
    "ef3",
    "Bu funksiya chaqiruvida nima muammo bor?",
    ["Hech narsa, to'g'ri ishlaydi", "greet aniqlanmagan holda chaqirilgan (hoisting muammosi)", "Argument yo'q", "Sintaksis xato"],
    1,
    "const bilan e'lon qilingan funksiya hoisting zonasida bo'ladi, lekin chaqirilishidan oldin ishga tushirilmagan — bu ReferenceError beradi.",
    { code: `greet();\nconst greet = () => console.log('Salom');`, language: "javascript" }
  ),
  r(
    "ef4",
    "Konsolda nima ko'rinadi?",
    ["1", "SyntaxError: Unexpected token", "undefined", "NaN"],
    1,
    "Qavslar mos kelmagani (yopilmagan qavs) SyntaxError'ga olib keladi — bu eng ko'p uchraydigan boshlang'ich xatolardan biri.",
    { code: `function sum(a, b {\n  return a + b;\n}`, language: "javascript" }
  ),
  r(
    "ef5",
    "Bu massiv metodini chaqirishda nima xato bo'ladi?",
    ["Hech narsa", "TypeError: forEach massiv metodi emas deb qaraladi, chunki obj oddiy obyekt", "SyntaxError", "ReferenceError"],
    1,
    "forEach faqat massivlarda mavjud metod — oddiy obyektda uni chaqirish TypeError beradi.",
    { code: `const obj = { a: 1 };\nobj.forEach(item => console.log(item));`, language: "javascript" }
  ),
  r(
    "ef6",
    "Bu kod ishlaganda konsolda nima chiqadi?",
    ["5", "undefined, keyin xato", "TypeError: fn funksiya emas", "Hech narsa"],
    2,
    "fn — son, uni funksiyaga o'xshab chaqirish (fn()) TypeError beradi, chunki u chaqiriladigan (callable) emas.",
    { code: `const fn = 5;\nfn();`, language: "javascript" }
  ),
];

export const VARIABLE_PUZZLE_ROUNDS = [
  r(
    "vp1",
    "Konsolda nima chiqadi?",
    ["5, 10", "10, 10", "5, 5", "xato"],
    0,
    "b = a orqali a'ning shu paytdagi qiymati (5) b'ga nusxalanadi. Keyin a ni o'zgartirish b'ga ta'sir qilmaydi, chunki son — primitiv qiymat.",
    { code: `let a = 5;\nlet b = a;\na = 10;\nconsole.log(b, a);`, language: "javascript" }
  ),
  r(
    "vp2",
    "x va y qiymatlarini almashtirgandan so'ng nima chiqadi?",
    ["1, 2", "2, 1", "undefined, undefined", "xato"],
    1,
    "Destructuring orqali [x, y] = [y, x] ikkita o'zgaruvchini bitta qatorda almashtiradi.",
    { code: `let x = 1, y = 2;\n[x, y] = [y, x];\nconsole.log(x, y);`, language: "javascript" }
  ),
  r(
    "vp3",
    "Bu kod natijasi nima?",
    ["3", "'12'", "'1' + '2'", "NaN"],
    0,
    "Ikkalasi ham son bo'lgani uchun + operatori oddiy qo'shishni bajaradi: 1 + 2 = 3.",
    { code: `let a = Number('1');\nlet b = 2;\nconsole.log(a + b);`, language: "javascript" }
  ),
  r(
    "vp4",
    "obj2.value ni o'zgartirsak, obj1.value ham o'zgaradimi?",
    ["Ha, chunki obyektlar referens orqali nusxalanadi", "Yo'q, chunki avtomatik nusxa olinadi", "Faqat const bo'lmasa", "Faqat array bo'lsa"],
    0,
    "obj2 = obj1 obyektning o'zini emas, xotiradagi manzilini nusxalaydi — ikkalasi bitta obyektni ko'rsatadi.",
    { code: `const obj1 = { value: 1 };\nconst obj2 = obj1;\nobj2.value = 99;`, language: "javascript" }
  ),
  r(
    "vp5",
    "count necha marta oshiriladi va oxirgi qiymati nima?",
    ["0", "1", "3", "undefined"],
    2,
    "count++ har safar oldingi qiymatni qaytarsa-da, o'zgaruvchining o'zini 1 ga oshiradi — uch marta chaqirilgach count 3 bo'ladi.",
    { code: `let count = 0;\ncount++;\ncount++;\ncount++;\nconsole.log(count);`, language: "javascript" }
  ),
  r(
    "vp6",
    "const bilan e'lon qilingan massivga element qo'shish mumkinmi?",
    ["Yo'q, const hech narsani o'zgartirishga yo'l qo'ymaydi", "Ha, const faqat o'zgaruvchini qayta bog'lashni taqiqlaydi, ichki tarkibni emas", "Faqat let bilan mumkin", "Xato beradi"],
    1,
    "const massiv yoki obyektning o'zini qayta belgilashni taqiqlaydi, lekin uning ichidagi elementlarni o'zgartirish (push, pop) mumkin.",
    { code: `const list = [1, 2];\nlist.push(3);\nconsole.log(list);`, language: "javascript" }
  ),
];
