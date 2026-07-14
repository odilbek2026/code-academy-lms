// Savollar banki. Har bir savol: { id, category, difficulty, question, options[4], correct (index), explanation }
// Yangi savol qo'shish uchun shu massivga yangi obyekt qo'shish kifoya — arxitektura o'zgarishi shart emas.

let uid = 0;
function q(category, difficulty, question, options, correct, explanation) {
  uid += 1;
  return { id: `q${uid}`, category, difficulty, question, options, correct, explanation };
}

export const QUESTIONS = [
  // ---------- HTML ----------
  q("html", "easy", "HTML nimaning qisqartmasi?", ["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language", "Home Tool Markup Language"], 0, "HTML — HyperText Markup Language, veb-sahifalar tuzilishini belgilaydi."),
  q("html", "easy", "Sahifa sarlavhasi qaysi tegda joylashadi?", ["<title>", "<head-title>", "<header>", "<meta>"], 0, "<title> tegi brauzer tab'ida ko'rinadigan sarlavhani belgilaydi."),
  q("html", "easy", "Rasm qo'shish uchun qaysi teg ishlatiladi?", ["<image>", "<img>", "<pic>", "<src>"], 1, "<img> tegi src atributi orqali rasm manzilini oladi."),
  q("html", "medium", "Semantik HTML tegi qaysi?", ["<div>", "<span>", "<article>", "<b>"], 2, "<article> — kontent ma'nosini bildiruvchi semantik teg."),
  q("html", "medium", "Formadagi majburiy maydonni qanday belgilaymiz?", ["mandatory", "required", "must", "validate"], 1, "required atributi maydonni majburiy qiladi."),
  q("html", "medium", "<a> tegida yangi oynada ochish uchun qaysi atribut ishlatiladi?", ["target='_blank'", "new='true'", "open='window'", "blank='yes'"], 0, "target='_blank' havolani yangi tabda ochadi."),
  q("html", "hard", "Qaysi teg audio faylni ijro etish uchun ishlatiladi?", ["<sound>", "<media>", "<audio>", "<play>"], 2, "<audio> tegi controls atributi bilan audio pleyer yaratadi."),
  q("html", "hard", "data-* atributlari nima uchun ishlatiladi?", ["CSS stillash uchun", "Maxsus ma'lumot saqlash uchun", "SEO uchun", "Xavfsizlik uchun"], 1, "data-* atributlari elementga JavaScript orqali o'qiladigan maxsus ma'lumot saqlaydi."),
  q("html", "medium", "<label> tegi nima uchun kerak?", ["Faqat dizayn uchun", "Input bilan bog'lanib, bosilganda fokus berish uchun", "Rasm qo'shish uchun", "Jadval yaratish uchun"], 1, "<label for='id'> mos inputga bosilganda fokus beradi, foydalanuvchi tajribasini yaxshilaydi."),
  q("html", "easy", "Ro'yxat yaratish uchun qaysi teglar juftligi ishlatiladi?", ["<list><item>", "<ul><li>", "<row><col>", "<table><tr>"], 1, "<ul> tartibsiz, <ol> tartibli ro'yxat, ikkalasi ham <li> elementlaridan iborat."),

  // ---------- CSS ----------
  q("css", "easy", "CSS nimaning qisqartmasi?", ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Syntax"], 0, "CSS — Cascading Style Sheets, sahifa ko'rinishini boshqaradi."),
  q("css", "easy", "Matn rangini o'zgartiruvchi xususiyat qaysi?", ["text-color", "font-color", "color", "text-style"], 2, "color xususiyati matn rangini belgilaydi."),
  q("css", "medium", "Flexbox'da elementlarni gorizontal markazlashtirish uchun nima ishlatiladi?", ["align-items: center", "justify-content: center", "text-align: center", "margin: auto"], 1, "justify-content: center flex konteynerda asosiy o'q bo'yicha markazlashtiradi."),
  q("css", "medium", "CSS Grid'da ustunlar soni qaysi xususiyat bilan belgilanadi?", ["grid-columns", "grid-template-columns", "column-count", "grid-rows"], 1, "grid-template-columns panjaradagi ustunlar sonini va o'lchamini belgilaydi."),
  q("css", "medium", "position: absolute qaysi elementga nisbatan joylashadi?", ["Har doim body'ga nisbatan", "Eng yaqin position berilgan ota-elementga nisbatan", "Ekran markaziga nisbatan", "Hech qanday elementga bog'liq emas"], 1, "absolute eng yaqin position:relative/absolute/fixed bo'lgan ota-elementga nisbatan joylashadi."),
  q("css", "hard", "z-index qaysi holatda ishlaydi?", ["Har doim", "Faqat position berilgan elementlarda", "Faqat flex konteynerlarda", "Faqat rasm elementlarida"], 1, "z-index faqat position (relative, absolute, fixed, sticky) qo'llanilgan elementlarda ta'sir qiladi."),
  q("css", "hard", "CSS'da specifisitet (specificity) eng yuqori bo'lgan selektor qaysi?", ["Element selektor (div)", "Klass selektor (.card)", "ID selektor (#header)", "Universal selektor (*)"], 2, "ID selektor klass va elementga nisbatan yuqoriroq specifisitetga ega."),
  q("css", "easy", "Elementni butunlay yashirish uchun qaysi xususiyat ishlatiladi?", ["visibility: hidden", "display: none", "opacity: 0", "hidden: true"], 1, "display: none element joyini ham egallamay to'liq olib tashlaydi."),
  q("css", "medium", "rem birligi nimaga nisbatan hisoblanadi?", ["Ota elementning font o'lchamiga", "Root (html) elementning font o'lchamiga", "Ekran kengligiga", "Brauzer standart o'lchamiga"], 1, "rem — root em, har doim <html> elementining font-size'iga nisbatan hisoblanadi."),
  q("css", "hard", "Qaysi xususiyat animatsiya davomiyligini belgilaydi?", ["animation-time", "animation-duration", "animation-length", "transition-time"], 1, "animation-duration animatsiyaning necha soniya davom etishini belgilaydi."),

  // ---------- JavaScript ----------
  q("javascript", "easy", "O'zgaruvchi e'lon qilishning zamonaviy usuli qaysi?", ["var", "let", "variable", "define"], 1, "let (va const) blok darajasida ishlaydi, var'dan ko'ra tavsiya etiladi."),
  q("javascript", "easy", "Massiv uzunligini qanday olamiz?", ["array.length()", "array.length", "array.size", "array.count()"], 1, "length — xususiyat, funksiya emas, shuning uchun qavssiz ishlatiladi."),
  q("javascript", "medium", "=== va == orasidagi farq nima?", ["Farqi yo'q", "=== tur va qiymatni, == faqat qiymatni solishtiradi", "== tezroq ishlaydi", "=== faqat sonlar uchun"], 1, "=== qat'iy tenglik — tur va qiymatni birga tekshiradi, == avval turlarni moslashtiradi."),
  q("javascript", "medium", "Closure nima?", ["Xato turi", "Funksiyaning o'z tashqi muhitidagi o'zgaruvchilarni eslab qolishi", "Massivni saralash usuli", "CSS animatsiya turi"], 1, "Closure — funksiya yaratilgan muhitdagi o'zgaruvchilarga keyinchalik ham kirish imkonini beradi."),
  q("javascript", "medium", "Promise necha holatga ega bo'lishi mumkin?", ["2", "3", "4", "5"], 1, "Promise pending, fulfilled yoki rejected holatlaridan biriga ega bo'ladi."),
  q("javascript", "hard", "Event loop nima uchun kerak?", ["Xotirani tozalash uchun", "Asinxron amallarni bosh oqimni bloklamasdan bajarish uchun", "CSS animatsiyasini boshqarish uchun", "Xato tutish uchun"], 1, "Event loop call stack bo'shagach navbatdagi asinxron vazifalarni bajaradi."),
  q("javascript", "hard", "this kalit so'zi arrow function ichida nimani anglatadi?", ["Yangi obyekt", "Global obyekt doim", "O'ralgan (tashqi) kontekstdagi this", "undefined doim"], 2, "Arrow function o'z this'iga ega emas — uni o'rab turgan konteksdan meros oladi."),
  q("javascript", "easy", "Massivga element qo'shish uchun qaysi metod ishlatiladi?", ["push()", "add()", "append()", "insert()"], 0, "push() massiv oxiriga yangi element qo'shadi."),
  q("javascript", "medium", "JSON.stringify() nima qiladi?", ["Matnni obyektga aylantiradi", "Obyektni JSON matniga aylantiradi", "Massivni saralaydi", "Xatoni ushlaydi"], 1, "JSON.stringify() JavaScript obyektini JSON formatidagi matnga aylantiradi."),
  q("javascript", "hard", "spread operator (...) nima uchun ishlatiladi?", ["Faqat matnni bo'lish uchun", "Massiv/obyekt elementlarini yoyish uchun", "Faqat sikllar uchun", "Xotirani tozalash uchun"], 1, "Spread operator massiv yoki obyekt elementlarini alohida-alohida yoyadi, nusxa yaratishda foydali."),

  // ---------- React ----------
  q("react", "easy", "React nima?", ["Backend freymvork", "Interfeys qurish uchun JavaScript kutubxonasi", "Ma'lumotlar bazasi", "CSS freymvork"], 1, "React — Facebook (Meta) tomonidan yaratilgan UI kutubxonasi."),
  q("react", "easy", "Komponent holatini boshqarish uchun qaysi hook ishlatiladi?", ["useEffect", "useState", "useContext", "useRef"], 1, "useState komponent ichida lokal holatni saqlash va yangilash imkonini beradi."),
  q("react", "medium", "useEffect qachon ishga tushadi?", ["Faqat komponent o'chirilganda", "Render tugagandan keyin", "Faqat foydalanuvchi bosganda", "Faqat sahifa yuklanganda"], 1, "useEffect komponent render bo'lgandan keyin (va dependency o'zgarganda) ishga tushadi."),
  q("react", "medium", "Props qanday uzatiladi?", ["Global o'zgaruvchi orqali", "Ota komponentdan bola komponentga atribut sifatida", "Faqat Context orqali", "localStorage orqali"], 1, "Props — ota komponentdan bolaga JSX atributlari orqali uzatiladigan ma'lumot."),
  q("react", "medium", "Key prop nima uchun kerak?", ["Faqat dizayn uchun", "Ro'yxat elementlarini React'ga samarali aniqlashda yordam berish uchun", "Xavfsizlik uchun", "SEO uchun"], 1, "key React'ga qaysi elementlar o'zgargan, qo'shilgan yoki o'chirilganini aniqlashga yordam beradi."),
  q("react", "hard", "useMemo nima uchun ishlatiladi?", ["Komponentni o'chirish uchun", "Qimmat hisob-kitob natijasini keshlash uchun", "State yaratish uchun", "API so'rov yuborish uchun"], 1, "useMemo qayta hisoblanishi shart bo'lmagan qiymatlarni keshlab, ishlash unumdorligini oshiradi."),
  q("react", "hard", "Controlled component nima?", ["State'i faqat DOM'da saqlanadigan input", "Qiymati React state orqali boshqariladigan input", "CSS bilan boshqariladigan komponent", "Faqat o'qish uchun komponent"], 1, "Controlled component'da input qiymati React state'dan keladi va onChange orqali yangilanadi."),
  q("react", "easy", "JSX nima?", ["Yangi dasturlash tili", "JavaScript ichida HTML'ga o'xshash sintaksis", "CSS kengaytmasi", "Ma'lumotlar bazasi tili"], 1, "JSX — JavaScript kodi ichida UI tuzilishini yozish imkonini beruvchi sintaksis kengaytmasi."),
  q("react", "medium", "Bola komponentdan ota komponentga ma'lumot uzatish uchun odatda nima ishlatiladi?", ["Global o'zgaruvchi", "Callback funksiya (prop sifatida uzatilgan)", "localStorage", "window obyekti"], 1, "Ota funksiyani prop sifatida uzatadi, bola uni chaqirib ma'lumot 'yuqoriga' yuboradi."),
  q("react", "hard", "React'da qachon useCallback ishlatish tavsiya etiladi?", ["Har doim, barcha funksiyalarda", "Funksiya bola komponentga prop sifatida uzatilib, keraksiz qayta render'ning oldini olish kerak bo'lganda", "Faqat useEffect ichida", "Hech qachon kerak emas"], 1, "useCallback funksiya referensini keshlab, memo qilingan bola komponentlarning keraksiz qayta render bo'lishini oldini oladi."),

  // ---------- Python ----------
  q("python", "easy", "Python'da ro'yxat (list) qanday yaratiladi?", ["list()", "[]", "{}", "()"], 1, "Kvadrat qavslar [] Python'da list obyektini yaratadi."),
  q("python", "easy", "Funksiya qaysi kalit so'z bilan e'lon qilinadi?", ["function", "def", "func", "lambda"], 1, "def kalit so'zi Python'da funksiya e'lon qilish uchun ishlatiladi."),
  q("python", "medium", "List comprehension nima?", ["Ro'yxatni saralash usuli", "Ro'yxatni qisqa sintaksis bilan yaratish usuli", "Xato turi", "Modul nomi"], 1, "[x for x in range(10)] kabi qisqa sintaksis yangi ro'yxat yaratadi."),
  q("python", "medium", "self parametri nima uchun kerak?", ["Global o'zgaruvchi yaratish uchun", "Klass metodida joriy obyektga murojaat qilish uchun", "Modulni import qilish uchun", "Xatoni ushlash uchun"], 1, "self klass ichidagi metodlarda joriy obyekt nusxasini bildiradi."),
  q("python", "medium", "Qaysi modul fayllar bilan ishlash uchun ishlatiladi?", ["os", "math", "random", "json"], 0, "os moduli fayl tizimi va operatsion tizim bilan ishlash funksiyalarini o'z ichiga oladi."),
  q("python", "hard", "Dekorator (decorator) nima?", ["Klass turi", "Boshqa funksiyani o'rab, uning xatti-harakatini kengaytiruvchi funksiya", "Xato turi", "Ma'lumotlar turi"], 1, "@decorator funksiyani o'zgartirmasdan uning atrofida qo'shimcha mantiq qo'shish imkonini beradi."),
  q("python", "hard", "GIL (Global Interpreter Lock) nimaga ta'sir qiladi?", ["Xotira hajmiga", "Bir vaqtning o'zida faqat bitta thread Python bytecode bajarishiga", "Fayl o'lchamiga", "Tarmoq tezligiga"], 1, "GIL CPython'da bir vaqtda faqat bitta thread'ning Python kodini bajarishini ta'minlaydi."),
  q("python", "easy", "Kommentariya qanday yoziladi?", ["// kommentariya", "# kommentariya", "<!-- kommentariya -->", "/* kommentariya */"], 1, "Python'da bitta qatorlik kommentariya # belgisi bilan boshlanadi."),
  q("python", "medium", "try/except nima uchun ishlatiladi?", ["Sikl yaratish uchun", "Xatolarni tutish va boshqarish uchun", "Funksiya chaqirish uchun", "Modul import qilish uchun"], 1, "try bloki xato berishi mumkin bo'lgan kodni, except esa xatoni qanday boshqarishni belgilaydi."),
  q("python", "hard", "*args va **kwargs nima uchun ishlatiladi?", ["Faqat testlash uchun", "Funksiyaga noma'lum sondagi argumentlarni qabul qilish uchun", "Xotirani tozalash uchun", "Modulni eksport qilish uchun"], 1, "*args — nomsiz, **kwargs — nomlangan argumentlarning istalgan sonini qabul qiladi."),

  // ---------- Node.js ----------
  q("nodejs", "easy", "Node.js nima?", ["Brauzer kengaytmasi", "Brauzerdan tashqarida JavaScript ishga tushiruvchi muhit", "CSS freymvork", "Ma'lumotlar bazasi"], 1, "Node.js Chrome'ning V8 dvigateli asosida server tomonida JavaScript ishga tushirish imkonini beradi."),
  q("nodejs", "easy", "Paketlarni o'rnatish uchun qaysi buyruq ishlatiladi?", ["node install", "npm install", "npm get", "node add"], 1, "npm install package.json'dagi barcha bog'liqliklarni o'rnatadi."),
  q("nodejs", "medium", "package.json nima uchun kerak?", ["Faqat rasm saqlash uchun", "Loyihaning bog'liqliklari va sozlamalarini belgilash uchun", "CSS stillari uchun", "Test natijalarini saqlash uchun"], 1, "package.json loyiha metama'lumotlari, skriptlar va bog'liqliklarni belgilaydi."),
  q("nodejs", "medium", "Express nima?", ["Ma'lumotlar bazasi", "Node.js uchun veb freymvork", "Test kutubxonasi", "CSS preprocessor"], 1, "Express — Node.js ustida server va API qurishni osonlashtiruvchi minimal freymvork."),
  q("nodejs", "medium", "Middleware nima?", ["Ma'lumotlar bazasi turi", "So'rov va javob orasida ishlaydigan funksiya", "CSS uslubi", "Test turi"], 1, "Middleware so'rov kelganda va javob qaytishdan oldin qo'shimcha mantiq bajarish imkonini beradi."),
  q("nodejs", "hard", "Node.js'da nega bloklovchi (sync) operatsiyalardan qochish kerak?", ["Xotira sarflamaydi", "Bitta oqim borligi uchun, u butun serverni to'xtatib qo'yishi mumkin", "Xavfsizroq", "Tezroq ishlaydi"], 1, "Node.js single-thread bo'lgani uchun bloklovchi amal butun server javobini kechiktiradi."),
  q("nodejs", "hard", "Event Emitter nima uchun ishlatiladi?", ["Fayl o'qish uchun", "Maxsus voqealarni e'lon qilish va tinglash uchun", "CSS animatsiya uchun", "Ma'lumotlar bazasiga ulanish uchun"], 1, "EventEmitter klassi orqali custom voqealar (event) yaratish va ularga listener ulash mumkin."),
  q("nodejs", "easy", "Serverni ishga tushirish uchun odatiy buyruq qaysi?", ["node run", "node app.js", "npm build", "node start-server"], 1, "node app.js fayl nomini to'g'ridan-to'g'ri Node.js orqali ishga tushiradi."),
  q("nodejs", "medium", "process.env nima uchun ishlatiladi?", ["CSS o'zgaruvchilarini olish uchun", "Muhit o'zgaruvchilariga (masalan API kalitlari) kirish uchun", "Xotira tozalash uchun", "Test natijalarini ko'rish uchun"], 1, "process.env orqali .env fayldagi yoki tizim darajasidagi maxfiy sozlamalarga xavfsiz kirish mumkin."),
  q("nodejs", "hard", "Cluster moduli nima uchun ishlatiladi?", ["Fayllarni siqish uchun", "Ko'p protsessor yadrolaridan foydalanish uchun bir nechta Node jarayonini ishga tushirish", "CSS optimallashtirish uchun", "Ma'lumotlar bazasini indekslash uchun"], 1, "Cluster moduli CPU yadrolari sonicha jarayon yaratib, yukni taqsimlashga yordam beradi."),

  // ---------- Git ----------
  q("git", "easy", "Git nima?", ["Dasturlash tili", "Versiya nazorati tizimi", "Ma'lumotlar bazasi", "CSS freymvork"], 1, "Git — kod tarixini kuzatuvchi taqsimlangan versiya nazorati tizimi."),
  q("git", "easy", "O'zgarishlarni saqlash uchun qaysi buyruq ishlatiladi?", ["git save", "git commit", "git store", "git push"], 1, "git commit staging'dagi o'zgarishlarni rasmiy tarixga yozadi."),
  q("git", "medium", "git branch nima uchun ishlatiladi?", ["Faylni o'chirish uchun", "Asosiy koddan mustaqil parallel ish yo'nalishini yaratish uchun", "Serverga ulanish uchun", "Xatoni tuzatish uchun"], 1, "Branch asosiy kodga (main) ta'sir qilmasdan yangi funksiya ustida ishlash imkonini beradi."),
  q("git", "medium", "git pull nima qiladi?", ["Lokal o'zgarishlarni serverga yuboradi", "Masofaviy repozitoriydan yangilanishlarni oladi va birlashtiradi", "Yangi branch yaratadi", "Faylni o'chiradi"], 1, "git pull = git fetch + git merge, masofaviy o'zgarishlarni lokalga qo'shadi."),
  q("git", "medium", ".gitignore fayli nima uchun kerak?", ["Repozitoriyni o'chirish uchun", "Git kuzatmasligi kerak bo'lgan fayllarni belgilash uchun", "Branch yaratish uchun", "Commit tarixini ko'rish uchun"], 1, ".gitignore'da ko'rsatilgan fayllar (masalan node_modules) versiya nazoratiga qo'shilmaydi."),
  q("git", "hard", "Merge conflict qachon yuzaga keladi?", ["Har doim merge qilinganda", "Ikki branch bir xil qatorni turlicha o'zgartirganda", "Faqat push paytida", "Faqat yangi repozitoriyda"], 1, "Git ikki branch'dagi bir xil joydagi turli o'zgarishlarni avtomatik birlashtira olmaganda conflict yuzaga keladi."),
  q("git", "hard", "git rebase nima uchun ishlatiladi?", ["Faylni o'chirish uchun", "Commit tarixini boshqa branch ustiga qayta qurish uchun", "Yangi repozitoriy yaratish uchun", "Serverni qayta ishga tushirish uchun"], 1, "Rebase commit tarixini chiziqli va toza saqlash uchun ishlatiladi, lekin ehtiyotkorlik talab qiladi."),
  q("git", "easy", "Masofaviy repozitoriyni lokalga nusxalash uchun qaysi buyruq ishlatiladi?", ["git copy", "git clone", "git download", "git fetch-all"], 1, "git clone butun repozitoriyni tarixi bilan birga lokal kompyuterga nusxalaydi."),
  q("git", "medium", "git status nimani ko'rsatadi?", ["Faqat commit tarixini", "Working directory va staging holatini", "Serverga ulanishni", "Branch nomlarini"], 1, "git status qaysi fayllar o'zgartirilgan, staging'da yoki kuzatilmayotganini ko'rsatadi."),
  q("git", "hard", "git stash nima uchun ishlatiladi?", ["Commit'ni o'chirish uchun", "Tugallanmagan o'zgarishlarni vaqtincha saqlab, ishchi katalogni tozalash uchun", "Yangi branch yaratish uchun", "Repozitoriyni arxivlash uchun"], 1, "git stash joriy o'zgarishlarni vaqtincha yashirib, keyinroq qayta tiklash imkonini beradi."),

  // ---------- Frontend (umumiy) ----------
  q("frontend", "easy", "Frontend dasturchi asosan nima bilan shug'ullanadi?", ["Server sozlash", "Foydalanuvchi ko'radigan interfeys", "Ma'lumotlar bazasi boshqaruvi", "Tarmoq xavfsizligi"], 1, "Frontend — foydalanuvchi bevosita ko'radigan va o'zaro aloqa qiladigan qism."),
  q("frontend", "medium", "Responsive dizayn nima?", ["Faqat mobil uchun sayt", "Turli ekran o'lchamlariga moslashadigan dizayn", "Tezkor yuklanadigan sayt", "Faqat rangli dizayn"], 1, "Responsive dizayn media query va moslashuvchan layout orqali barcha qurilmalarda yaxshi ko'rinishni ta'minlaydi."),
  q("frontend", "medium", "Brauzer keshlash (caching) nima uchun foydali?", ["Xavfsizlikni oshiradi", "Qayta yuklanadigan resurslarni saqlab, sahifani tezlashtiradi", "SEO'ni yaxshilaydi", "Server yukini oshiradi"], 1, "Keshlash oldin yuklangan fayllarni qayta so'ramasdan foydalanish orqali yuklanish tezligini oshiradi."),
  q("frontend", "hard", "Critical rendering path nima?", ["CSS fayl nomi", "Brauzer HTML/CSS/JS'ni ekranga chiqarish uchun bosib o'tadigan bosqichlar ketma-ketligi", "JavaScript xatosi turi", "Server konfiguratsiyasi"], 1, "Bu yo'lni optimallashtirish sahifaning tezroq ko'rinishini ta'minlaydi."),
  q("frontend", "medium", "Web accessibility (a11y) nimani anglatadi?", ["Sahifa tezligi", "Sahifadan nogironligi bo'lgan foydalanuvchilar ham foydalana olishi", "SEO reytingi", "Server xavfsizligi"], 1, "a11y — barcha foydalanuvchilar, jumladan ekran o'quvchidan foydalanuvchilar uchun qulaylikni ta'minlash."),
  q("frontend", "easy", "Bundler (masalan Webpack, Vite) nima uchun kerak?", ["Kodni shifrlash uchun", "Ko'p fayllarni birlashtirib, optimallashtirilgan fayllar yaratish uchun", "Serverni ishga tushirish uchun", "Ma'lumotlar bazasi yaratish uchun"], 1, "Bundler modullarni birlashtirib, brauzer uchun optimallashtirilgan yakuniy fayllarni tayyorlaydi."),
  q("frontend", "hard", "Lazy loading nima?", ["Sahifani sekinlashtirish", "Kerak bo'lgandagina resurslarni yuklash strategiyasi", "CSS animatsiya turi", "Xato turi"], 1, "Lazy loading darhol kerak bo'lmagan rasm/komponentlarni keyinroq yuklab, boshlang'ich yuklanishni tezlashtiradi."),

  // ---------- Backend (umumiy) ----------
  q("backend", "easy", "Backend dasturchi asosan nima bilan shug'ullanadi?", ["Faqat dizayn", "Server, ma'lumotlar bazasi va biznes mantiq", "Faqat CSS", "Faqat marketing"], 1, "Backend — ma'lumotlarni saqlash, qayta ishlash va serverning ichki mantig'i bilan shug'ullanadi."),
  q("backend", "medium", "Autentifikatsiya va avtorizatsiya farqi nima?", ["Farqi yo'q", "Autentifikatsiya — kimligingizni tekshirish, avtorizatsiya — nimaga ruxsatingiz borligini tekshirish", "Ikkalasi ham parol tekshirish", "Avtorizatsiya — parolni saqlash usuli"], 1, "Autentifikatsiya 'siz kimsiz' savoliga, avtorizatsiya 'nima qila olasiz' savoliga javob beradi."),
  q("backend", "medium", "Rate limiting nima uchun ishlatiladi?", ["Sahifani chiroyli qilish uchun", "Bir manbadan haddan tashqari ko'p so'rovning oldini olish uchun", "Ma'lumotlar bazasini tezlashtirish uchun", "CSS yuklashni tezlashtirish uchun"], 1, "Rate limiting serverni ortiqcha yuklanish yoki suiiste'moldan himoya qiladi."),
  q("backend", "hard", "Load balancer nima qiladi?", ["Ma'lumotlar bazasini zaxiralaydi", "Kiruvchi so'rovlarni bir nechta serverlar orasida taqsimlaydi", "CSS fayllarni siqadi", "Xatoларni logga yozadi"], 1, "Load balancer yukni bir nechta server orasida taqsimlab, ishonchlilik va tezlikni oshiradi."),
  q("backend", "medium", "Caching qatlami (masalan Redis) nima uchun ishlatiladi?", ["Doimiy saqlash uchun", "Tez-tez so'raladigan ma'lumotni tezkor xotirada saqlab, bazaga yukni kamaytirish uchun", "Frontend animatsiyasi uchun", "Fayl yuklash uchun"], 1, "Redis kabi kesh xotira ma'lumotlar bazasiga bo'lgan murojaatlar sonini kamaytirib, tezlikni oshiradi."),
  q("backend", "hard", "Microservice arxitekturasi nima?", ["Bitta katta dastur", "Ilovani kichik, mustaqil xizmatlarga bo'lib qurish uslubi", "Faqat frontend uslubi", "Ma'lumotlar bazasi turi"], 1, "Har bir mikroservis o'z vazifasiga ega va mustaqil deploy qilinishi mumkin."),
];

export const CATEGORY_LABELS = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  react: "React",
  python: "Python",
  nodejs: "Node.js",
  git: "Git",
  frontend: "Frontend",
  backend: "Backend",
};

export function getQuestions({ category = "all", difficulty = "all", count = 10, extraQuestions = [] } = {}) {
  let pool = [...QUESTIONS, ...extraQuestions];
  if (category !== "all") pool = pool.filter((q) => q.category === category);
  if (difficulty !== "all") pool = pool.filter((q) => q.difficulty === difficulty);

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
