import { CATEGORIES } from "@/lib/constants";

// Har bir kurs uchun darslar: prezentatsiya, matn yoki kod turida bo'lishi mumkin.
// type: "presentation" | "text" | "code"
// Har bir kurs 0'dan boshlab, bosqichma-bosqich professional darajaga olib chiqadigan
// tarzda tuzilgan: 2 ta prezentatsiya (har birida 6-7 slayd), 2 ta chuqur matn darsi va
// 3 ta amaliy kod darsi (oxirgisi — yakuniy amaliy topshiriq).

function lesson(id, type, title, duration, content) {
  return { id, type, title, duration, content };
}

const COURSE_DEFS = [
  {
    category: "frontend",
    title: "Frontend dasturlash asoslari",
    level: "Boshlang'ich",
    duration: "11 soat",
    students: 8400,
    rating: 4.8,
    description:
      "Noldan boshlab: brauzer sahifani qanday chizishi, DOM, CSS Box Model, Flexbox/Grid, responsive dizayn va real loyihalarda ishlatiladigan best practice'lar — barchasi bosqichma-bosqich.",
    lessons: [
      lesson("l1", "presentation", "Frontend nima va brauzer qanday ishlaydi", "12 slayd", {
        keypoints: [
          "Frontend — foydalanuvchi to'g'ridan-to'g'ri ko'radigan va o'zaro ta'sirlashadigan interfeys qismi",
          "HTML — sahifaning skeleti, CSS — uning ko'rinishi, JavaScript — xatti-harakati",
          "Brauzer HTML'ni yuqoridan pastga o'qib, DOM daraxtini quradi",
          "CSS qoidalari DOM tugunlariga qo'llanadi va sahifa render qilinadi (render tree)",
          "So'ng brauzer har bir elementning aniq o'lchami va o'rnini hisoblaydi (layout/reflow)",
          "Oxirida piksellar ekranga chiziladi (paint) — shu jarayon har bir o'zgarishda qayta ishlaydi",
        ],
      }),
      lesson("l2", "text", "DOM daraxti va u bilan ishlash mantig'i", "8 daqiqa", {
        paragraphs: [
          "DOM (Document Object Model) — HTML hujjatning brauzer xotirasidagi daraxtsimon ko'rinishi. Har bir teg — daraxtning bir tuguni, va har bir tugun ota-bola munosabatida boshqa tugunlar bilan bog'langan.",
          "JavaScript shu daraxt bilan ishlaydi: elementlarni topadi (querySelector), o'zgartiradi (textContent, classList), yangilarini qo'shadi (appendChild) yoki o'chiradi (remove).",
          "DOM'ni juda tez-tez, kichik-kichik o'zgartirish sekinlik keltirib chiqarishi mumkin — shuning uchun zamonaviy freymvorklar (React kabi) o'zgarishlarni to'plab, optimallashtirilgan holda qo'llaydi.",
          "Frontend dasturchi uchun DOM'ni tushunish — interfeysni dinamik qilishning birinchi va eng muhim qadami hisoblanadi.",
        ],
      }),
      lesson("l3", "code", "CSS Box Model", "10 daqiqa", {
        explanation:
          "Har bir HTML element to'rtta qatlamdan iborat: content, padding, border va margin. Bu qatlamlarni tushunmasdan turib aniq layout qurish qiyin. box-sizing: border-box qoidasi zamonaviy CSS'da deyarli har doim ishlatiladi, chunki u padding va border'ni width ichiga hisoblaydi.",
        language: "css",
        code: `* {
  box-sizing: border-box;
}

.card {
  width: 240px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  margin: 12px;
}`,
      }),
      lesson("l4", "presentation", "Responsive dizayn va zamonaviy layout", "10 slayd", {
        keypoints: [
          "Responsive dizayn — sahifaning istalgan ekran o'lchamida (mobil, planshet, desktop) to'g'ri ko'rinishi",
          "Media query'lar (@media) ekran kengligiga qarab turli CSS qoidalarini qo'llash imkonini beradi",
          "Mobile-first yondashuv — avval eng kichik ekran uchun dizayn qilib, keyin kattaroq ekranlar uchun kengaytirish",
          "Flexbox — bir o'lchamli (qator yoki ustun) joylashuvlar uchun ideal",
          "CSS Grid — ikki o'lchamli (qator VA ustun) murakkab layoutlar uchun ideal",
          "rem/em nisbiy o'lchov birliklari piksellarga qaraganda moslashuvchan dizayn beradi",
        ],
      }),
      lesson("l5", "text", "Semantik HTML va Accessibility (A11y) asoslari", "9 daqiqa", {
        paragraphs: [
          "Semantik HTML — <div> o'rniga <header>, <nav>, <main>, <article>, <footer> kabi ma'noli teglardan foydalanish. Bu qidiruv tizimlari (SEO) va ekran o'quvchi dasturlar uchun sahifa tuzilishini aniqroq qiladi.",
          "Accessibility (qulaylik) — sahifani ko'rish yoki eshitishda qiyinchiliklarga ega foydalanuvchilar ham to'liq foydalana olishini ta'minlash. Masalan, har bir <img> uchun alt atributi, formalarda <label>, tugmalar uchun tabindex.",
          "Kontrast nisbati (rang va fon orasidagi farq) ham muhim — matn o'qilishi qiyin bo'lmasligi kerak. WCAG standarti minimal kontrast nisbatlarini belgilaydi.",
          "Professional frontend dasturchi har doim: 'Bu interfeysdan klaviatura orqali, sichqonchasiz foydalanish mumkinmi?' degan savolni beradi.",
        ],
      }),
      lesson("l6", "code", "Flexbox bilan real komponent qurish", "12 daqiqa", {
        explanation:
          "Flexbox yordamida rasm, ism va tavsifdan iborat profil kartasini yasaymiz. justify-content va align-items elementlarni ikki o'qda ham tekislash imkonini beradi.",
        language: "html",
        code: `<div class="profile-card">
  <img src="avatar.jpg" alt="Foydalanuvchi avatari" />
  <div>
    <h3>Ism Familiya</h3>
    <p>Frontend dasturchi</p>
  </div>
</div>

<style>
.profile-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
</style>`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: to'liq responsive kartalar paneli", "22 daqiqa", {
        explanation:
          "Endi bilganlaringizni birlashtiring: CSS Grid yordamida ekran kengligiga avtomatik moslashadigan kartalar paneli (dashboard) yarating. Bu — kichik komponentlardan real interfeys qurish jarayonining namunasi.",
        language: "css",
        code: `.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  padding: 24px;
}

.dashboard .card {
  border-radius: 16px;
  padding: 20px;
  transition: transform 0.2s ease;
}

.dashboard .card:hover {
  transform: translateY(-4px);
}

@media (max-width: 640px) {
  .dashboard { padding: 12px; gap: 12px; }
}`,
        exercise:
          "Panelga har bir kartaga icon, sarlavha va kichik statistik raqam qo'shing. Mobil ekranda (max-width: 640px) kartalar bitta ustunga tushishini tekshiring.",
      }),
    ],
  },
  {
    category: "backend",
    title: "Backend arxitekturasi asoslari",
    level: "O'rta",
    duration: "12 soat",
    students: 5200,
    rating: 4.7,
    description:
      "Server, ma'lumotlar bazasi va API'lar qanday ishlashini noldan o'rganib, xavfsiz va kengayuvchan backend arxitekturasini qurishni professional darajada egallaysiz.",
    lessons: [
      lesson("l1", "presentation", "Client-Server modeli va HTTP protokoli", "13 slayd", {
        keypoints: [
          "Brauzer (client) so'rov yuboradi, server javob qaytaradi — bu HTTP protokoli orqali bo'ladi",
          "Har bir HTTP so'rovi metod (GET, POST, PUT, DELETE), manzil va sarlavhalardan (headers) iborat",
          "Server javobi status kod bilan keladi: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Server Error)",
          "Server odatda ma'lumotlar bazasi bilan ishlaydi va natijani JSON formatida qaytaradi",
          "Statelesslik — har bir HTTP so'rovi mustaqil, server oldingi so'rovni 'eslamaydi' (shuning uchun token/sessiya kerak)",
          "Bitta server minglab so'rovni bir vaqtda, asinxron tarzda qayta ishlashi mumkin",
        ],
      }),
      lesson("l2", "text", "REST API dizayn tamoyillari", "10 daqiqa", {
        paragraphs: [
          "REST — resurslarni URL manzillar orqali boshqarish uslubi. Har bir resurs (masalan, foydalanuvchi) o'z manzeliga ega: /users/12.",
          "HTTP metodlari amalni bildiradi: GET — o'qish, POST — yaratish, PUT/PATCH — yangilash, DELETE — o'chirish. Manzil resursni, metod esa amalni ifodalaydi.",
          "Yaxshi API — bashorat qilinadigan, izchil nomlangan (ko'plik shaklda: /users, /courses) va aniq status kodlar qaytaradigan API hisoblanadi.",
          "Versiyalash (masalan /api/v1/users) API'ni o'zgartirishda eski mijozlarni buzmasdan yangilanish imkonini beradi — bu production darajadagi API'larning majburiy qismi.",
        ],
      }),
      lesson("l3", "code", "Oddiy Express endpoint", "10 daqiqa", {
        explanation: "Node.js va Express yordamida bitta GET endpoint qanday yozilishini ko'ramiz.",
        language: "javascript",
        code: `import express from "express";
const app = express();
app.use(express.json());

app.get("/api/courses", (req, res) => {
  res.json({ courses: ["Frontend", "Backend", "Mobile"] });
});

app.listen(3001, () => console.log("Server ishga tushdi"));`,
      }),
      lesson("l4", "presentation", "Autentifikatsiya, xavfsizlik va middleware", "11 slayd", {
        keypoints: [
          "Autentifikatsiya — foydalanuvchi 'kimligini' tasdiqlash (login/parol), avtorizatsiya — 'nima qila olishini' belgilash",
          "JWT (JSON Web Token) — server tomonidan berilgan, foydalanuvchi ma'lumotini o'zida saqlaydigan xavfsiz token",
          "Parollar hech qachon ochiq matn holida saqlanmaydi — bcrypt yoki argon2 kabi hash algoritmlari ishlatiladi",
          "Middleware — so'rov va javob orasida ishga tushadigan funksiya (masalan, token tekshirish, logging, xatoliklarni ushlash)",
          "Rate limiting — bitta foydalanuvchidan juda ko'p so'rov kelishining oldini olib, serverni himoya qiladi",
          "CORS (Cross-Origin Resource Sharing) — boshqa domendan kelgan so'rovlarga ruxsat berish/bermaslikni boshqaradi",
        ],
      }),
      lesson("l5", "text", "Xatolarni to'g'ri boshqarish va loglash", "8 daqiqa", {
        paragraphs: [
          "Professional backend har doim xatolarni oldindan bashorat qilib, ularni chiroyli tarzda qaytaradi — server hech qachon 'jim' qulab tushmasligi kerak.",
          "try/catch bloklari va markazlashtirilgan xato-boshqaruvchi middleware yordamida barcha xatolar bir joyda ushlanadi va foydalanuvchiga tushunarli xabar bilan qaytariladi.",
          "Loglash (logging) — nima sodir bo'lganini keyinchalik tekshirish uchun yozib borish. Production tizimlarda har bir muhim amal (xato, login, to'lov) log qilinadi.",
          "Xato xabarlarida hech qachon maxfiy ma'lumot (parol, token, ichki tizim tafsilotlari) chiqarilmasligi kerak — bu xavfsizlik nuqtai nazaridan muhim.",
        ],
      }),
      lesson("l6", "code", "Middleware va xato-boshqaruvi yozish", "14 daqiqa", {
        explanation: "So'rovlarni loglaydigan va xatolarni markazlashtirilgan tarzda ushlaydigan middleware'lar yozamiz.",
        language: "javascript",
        code: `function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url}\`);
  next();
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Server xatosi",
  });
}

app.use(logger);
app.use(errorHandler);`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: to'liq CRUD + autentifikatsiya", "25 daqiqa", {
        explanation:
          "Foydalanuvchilar ro'yxati uchun to'liq CRUD (Create, Read, Update, Delete) endpointlarini, token tekshiruvchi middleware bilan birga loyihalang. Bu — real backend loyihasining minimal skeleti.",
        language: "javascript",
        code: `function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Token yo'q" });
  next();
}

app.post("/api/users", requireAuth, (req, res) => {
  res.status(201).json({ id: Date.now(), ...req.body });
});

app.put("/api/users/:id", requireAuth, (req, res) => {
  res.json({ id: req.params.id, ...req.body });
});

app.delete("/api/users/:id", requireAuth, (req, res) => {
  res.status(204).send();
});`,
        exercise: "GET /api/users/:id endpointini o'zingiz yozib ko'ring — foydalanuvchi topilmasa 404 status va tushunarli xabar qaytaring.",
      }),
    ],
  },
  {
    category: "mobile",
    title: "Mobil ilova dasturlash asoslari",
    level: "O'rta",
    duration: "13 soat",
    students: 3100,
    rating: 4.6,
    description:
      "React Native bilan noldan boshlab, navigatsiya, holat boshqaruvi va real qurilmada ishlaydigan to'liq mobil ilova qurishni professional darajada o'rganasiz.",
    lessons: [
      lesson("l1", "presentation", "Mobil dasturlash landshafti", "11 slayd", {
        keypoints: [
          "Native dasturlash — har bir platforma uchun alohida til (Swift/iOS, Kotlin/Android) bilan yozish, maksimal tezlik beradi",
          "Cross-platform (React Native, Flutter) — bitta kod bazasi, ikkita platforma, tezroq rivojlanish",
          "React Native JavaScript kodini haqiqiy native mobil komponentlarga aylantiradi (WebView emas!)",
          "View, Text, ScrollView, Image kabi komponentlar HTML tegining o'rnini bosadi",
          "Metro bundler kodni real vaqtda qurilmaga yetkazadi — Fast Refresh bilan darhol natijani ko'rasiz",
          "Tanlov loyihaning maqsadiga bog'liq: startup uchun ko'pincha cross-platform tezroq natija beradi",
        ],
      }),
      lesson("l2", "text", "Native vs Cross-platform: chuqur taqqoslash", "8 daqiqa", {
        paragraphs: [
          "Native ilovalar qurilma resurslariga (kamera, GPS, sensor) to'g'ridan-to'g'ri kirish huquqiga ega va eng yuqori unumdorlikni beradi, lekin ikkita alohida kod bazasini qo'llab-quvvatlashni talab qiladi.",
          "Cross-platform freymvorklar bitta JavaScript/Dart kod bazasidan ikkala platforma uchun ilova yaratadi — bu vaqt va byudjetni sezilarli tejaydi.",
          "React Native 'bridge' orqali JavaScript va native kod orasida gaplashadi; yangi arxitektura (Fabric) esa bu jarayonni yanada tezlashtiradi.",
          "Katta kompaniyalar (Instagram, Discord, Shopify) ham React Native'dan foydalanadi — bu uning production darajasida ishonchli ekanini ko'rsatadi.",
        ],
      }),
      lesson("l3", "code", "Birinchi ekran va komponent tuzilishi", "10 daqiqa", {
        explanation: "Oddiy mobil ekran komponentini yaratamiz — StyleSheet orqali uslublash brauzerdagi CSS'ga o'xshaydi, lekin ayrim farqlari bor.",
        language: "javascript",
        code: `import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xush kelibsiz!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "600" },
});`,
      }),
      lesson("l4", "presentation", "Navigatsiya va holat boshqaruvi", "10 slayd", {
        keypoints: [
          "React Navigation — ekranlar orasida o'tish (Stack), pastki menyu (Tab) va yon panel (Drawer) navigatsiyasini beradi",
          "Stack Navigator — 'orqaga' tugmasi bilan ishlaydigan, ekranlar ustma-ust joylashadigan navigatsiya",
          "useState — kichik, mahalliy holatni boshqarish uchun (masalan, forma qiymati)",
          "Context API yoki Zustand kabi kutubxonalar — butun ilova bo'ylab umumiy holatni (foydalanuvchi, savat) boshqarish uchun",
          "AsyncStorage — qurilmada kichik ma'lumotlarni (token, sozlamalar) saqlash uchun mobil versiyasi localStorage'ning",
          "Ilova qayta ochilganda holatni tiklash — foydalanuvchi tajribasi uchun juda muhim",
        ],
      }),
      lesson("l5", "text", "Qurilma imkoniyatlaridan foydalanish", "7 daqiqa", {
        paragraphs: [
          "Mobil ilovalarning eng katta afzalligi — qurilmaning haqiqiy imkoniyatlaridan (kamera, GPS, bildirishnomalar, biometrik autentifikatsiya) foydalana olishi.",
          "Expo kabi vositalar bu imkoniyatlarga kirish uchun tayyor, sinovdan o'tgan kutubxonalar (expo-camera, expo-location) taqdim etadi — noldan native kod yozish shart emas.",
          "Ruxsatlarni (permissions) so'rash — foydalanuvchidan kamera yoki joylashuvga kirish ruxsatini so'rash va rad etilganda muqobil holatni ko'rsatish professional ilovaning belgisi.",
          "Push-bildirishnomalar foydalanuvchini ilovaga qaytarib, jonli (engagement) darajasini oshiradigan eng kuchli vositalardan biri hisoblanadi.",
        ],
      }),
      lesson("l6", "code", "Holat va tugma bilan interaktivlik", "12 daqiqa", {
        explanation: "useState yordamida bosilganda hisoblagichni oshiradigan tugma yasaymiz — bu har qanday interaktiv mobil komponentning asosi.",
        language: "javascript",
        code: `import { useState } from "react";
import { View, Text, Button } from "react-native";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Bosildi: {count}</Text>
      <Button title="Bosish" onPress={() => setCount(count + 1)} />
    </View>
  );
}`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: ro'yxat va navigatsiya", "24 daqiqa", {
        explanation:
          "FlatList yordamida elementlar ro'yxatini chiqarib, har bir elementga bosilganda tafsilot ekraniga o'tishni amalga oshiring. Bu — ko'pchilik real mobil ilovalarning (do'kon, yangiliklar) asosiy naqshi.",
        language: "javascript",
        code: `import { FlatList, TouchableOpacity, Text } from "react-native";

function CourseList({ courses, navigation }) {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Detail", { id: item.id })}
        >
          <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}`,
        exercise: "Detail ekranini yarating — route.params orqali kelgan id bo'yicha kursning to'liq ma'lumotini ko'rsating.",
      }),
    ],
  },
  {
    category: "ai",
    title: "Sun'iy intellekt asoslari",
    level: "O'rta",
    duration: "13 soat",
    students: 6700,
    rating: 4.9,
    description:
      "Mashinali o'qitishning matematik asoslaridan tortib, real ma'lumotlar bilan model qurish va uni baholashgacha — AI sohasiga professional kirish.",
    lessons: [
      lesson("l1", "presentation", "Sun'iy intellekt va Machine Learning nima", "13 slayd", {
        keypoints: [
          "AI — kompyuterga inson kabi qaror qabul qilishni o'rgatish sohasi",
          "Machine Learning — dasturga qat'iy qoidalar emas, ma'lumot orqali o'rganish imkonini beradi",
          "Model ma'lumotlardagi naqshlarni topib, yangi holatlar uchun bashorat qiladi",
          "Deep Learning — inson miyasi neyronlariga o'xshash ko'p qatlamli tarmoqlar orqali murakkab naqshlarni o'rganadi",
          "Katta til modellari (LLM) — internetdagi ulkan matn hajmi ustida o'qitilib, til va bilimni 'tushunish' qobiliyatiga ega bo'ladi",
          "AI sehr emas — u matematika (chiziqli algebra, ehtimollik) va statistikaga asoslangan",
        ],
      }),
      lesson("l2", "text", "Nazoratli va nazoratsiz o'qitish", "9 daqiqa", {
        paragraphs: [
          "Nazoratli o'qitishda (supervised learning) modelga javoblari ma'lum bo'lgan ma'lumotlar beriladi — masalan, narx bashorati (regressiya) yoki spam aniqlash (klassifikatsiya).",
          "Nazoratsiz o'qitishda (unsupervised learning) model o'zi ma'lumotdagi guruhlarni topadi — masalan, mijozlarni segmentlash yoki anomaliyani aniqlash.",
          "Reinforcement Learning (mustahkamlovchi o'qitish) — model muhit bilan o'zaro ta'sirlashib, mukofot orqali eng yaxshi strategiyani o'rganadi (masalan, o'yin o'ynash).",
          "Zamonaviy AI tizimlari (masalan, til modellari) katta hajmdagi matn ustida oldindan o'qitiladi (pre-training), so'ng aniq vazifaga moslashtiriladi (fine-tuning).",
        ],
      }),
      lesson("l3", "code", "Oddiy chiziqli regressiya", "11 daqiqa", {
        explanation: "Python va scikit-learn yordamida eng oddiy bashorat modelini quramiz — bu ML'ning 'Salom, Dunyo!' misoli hisoblanadi.",
        language: "python",
        code: `from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
prediction = model.predict(X_test)

print(f"Aniqlik: {model.score(X_test, y_test):.2f}")`,
      }),
      lesson("l4", "presentation", "Neyron tarmoqlar qanday ishlaydi", "10 slayd", {
        keypoints: [
          "Neyron tarmoq — kirish, yashirin va chiqish qatlamlaridan iborat, bir-biriga bog'langan 'neyronlar' tarmog'i",
          "Har bir bog'lanish o'z 'og'irligi' (weight)ga ega — o'qitish jarayonida shu og'irliklar sozlanadi",
          "Faollashtirish funksiyasi (activation function, masalan ReLU) tarmoqqa chiziqli bo'lmagan murakkab naqshlarni o'rganish qobiliyatini beradi",
          "Backpropagation — modelning xatosini orqaga qarab tarqatib, har bir og'irlikni qanday o'zgartirish kerakligini hisoblash algoritmi",
          "Gradient Descent — xatoni minimallashtirish uchun og'irliklarni kichik qadamlar bilan yangilab boruvchi optimallashtirish usuli",
          "Overfitting — model o'qitish ma'lumotini 'yodlab olib', yangi ma'lumotda yomon ishlashi — buning oldini olish AI muhandisligining muhim qismi",
        ],
      }),
      lesson("l5", "text", "Ma'lumotni tayyorlash — modelning yuragi", "8 daqiqa", {
        paragraphs: [
          "'Garbage in, garbage out' — sifatsiz ma'lumot bilan qanchalik murakkab model qurmang, natija yaxshi bo'lmaydi. Ma'lumotni tozalash jarayoni ko'pincha loyihaning 70% vaqtini oladi.",
          "Bo'sh qiymatlarni to'ldirish (imputation), takrorlanuvchi qatorlarni olib tashlash va noto'g'ri formatdagi ma'lumotlarni tuzatish — barchasi model o'qitishdan oldingi majburiy qadamlar.",
          "Feature engineering — xom ma'lumotdan modelga tushunarli, foydali xususiyatlar (feature) yaratish san'ati. Masalan, tug'ilgan sanadan 'yosh'ni hisoblash.",
          "Ma'lumotni train/validation/test qismlariga bo'lish — model haqiqatan yangi ma'lumotda qanday ishlashini xolisona baholash imkonini beradi.",
        ],
      }),
      lesson("l6", "code", "Ma'lumotni tozalash va tayyorlash", "13 daqiqa", {
        explanation: "Modelga berishdan oldin ma'lumotlardagi bo'sh qiymatlar va takrorlanishlarni tozalaymiz — pandas kutubxonasi bilan.",
        language: "python",
        code: `import pandas as pd

df = pd.read_csv("data.csv")
df = df.fillna(df.mean(numeric_only=True))
df = df.drop_duplicates()

print(f"Tozalangandan keyin: {len(df)} qator")`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: to'liq ML pipeline", "26 daqiqa", {
        explanation:
          "Ma'lumotni yuklashdan tortib, tozalash, bo'lish, o'qitish va baholashgacha bo'lgan to'liq jarayonni birlashtiring — bu real loyihalarda ishlatiladigan standart oqim.",
        language: "python",
        code: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier()
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print(f"Aniqlik: {accuracy_score(y_test, predictions):.2%}")`,
        exercise: "Modelning eng muhim xususiyatlarini (feature_importances_) chiqarib, natijani sharhlab bering.",
      }),
    ],
  },
  {
    category: "python",
    title: "Python bilan dasturlashni boshlash",
    level: "Boshlang'ich",
    duration: "9 soat",
    students: 12300,
    rating: 4.9,
    description:
      "O'zgaruvchilardan tortib obyektga yo'naltirilgan dasturlashgacha — Python tilini noldan professional darajada, amaliy loyihalar orqali o'rganasiz.",
    lessons: [
      lesson("l1", "presentation", "Python nega mashhur va qanday ishlaydi", "11 slayd", {
        keypoints: [
          "Python — o'qilishi oson sintaksisga ega, boshlang'ichlar uchun eng qulay tillardan biri",
          "Interpretatsiya qilinuvchi til — kod satrma-satr ishga tushiriladi, oldindan kompilyatsiya shart emas",
          "Veb, AI, avtomatlashtirish, ma'lumotlar tahlili — deyarli har qanday sohada ishlatiladi",
          "Katta kutubxonalar ekotizimi (pip) tufayli tez rivojlanish imkonini beradi",
          "Indentatsiya (bo'shliqlar) Python'da sintaksisning bir qismi — bu kodni majburiy tarzda toza va o'qilishi oson qiladi",
          "'Batareyalari o'rnatilgan' falsafasi — ko'p vazifalar uchun standart kutubxonaning o'zi yetarli",
        ],
      }),
      lesson("l2", "text", "O'zgaruvchilar va ma'lumot turlari", "7 daqiqa", {
        paragraphs: [
          "Python'da o'zgaruvchi e'lon qilish uchun tur ko'rsatish shart emas: shunchaki nom = qiymat. Python o'zi qiymat turini aniqlaydi.",
          "Asosiy turlar: int (butun son), float (kasr son), str (matn), bool (mantiqiy qiymat), list (ro'yxat), dict (lug'at).",
          "Python dinamik tipdagi til — bitta o'zgaruvchiga turli turdagi qiymatlarni ketma-ket berish mumkin, lekin bu ehtiyotkorlik bilan qilinishi kerak.",
          "type() funksiyasi istalgan o'zgaruvchining joriy turini ko'rsatadi — debug qilishda foydali vosita.",
        ],
      }),
      lesson("l3", "code", "Shartlar va sikllar", "10 daqiqa", {
        explanation: "if/else va for sikli yordamida ro'yxat elementlarini tekshiramiz — bu deyarli har qanday dasturning asosiy mantig'i.",
        language: "python",
        code: `numbers = [3, 12, 7, 20, 5]

for n in numbers:
    if n > 10:
        print(f"{n} — katta son")
    else:
        print(f"{n} — kichik son")`,
      }),
      lesson("l4", "presentation", "Funksiyalar va obyektga yo'naltirilgan dasturlash", "12 slayd", {
        keypoints: [
          "Funksiya — qayta ishlatiladigan kod bo'lagi, def kalit so'zi bilan e'lon qilinadi",
          "Parametrlar funksiyaga ma'lumot kiritish, return esa natijani qaytarish imkonini beradi",
          "*args va **kwargs — funksiyaga cheklanmagan sondagi argument uzatish imkonini beradi",
          "Class (klass) — ma'lumot (atribut) va xatti-harakatni (metod) birlashtiruvchi qolip",
          "__init__ metodi — yangi obyekt yaratilganda avtomatik chaqiriladigan 'konstruktor'",
          "Meros olish (inheritance) — bitta klass boshqa klassning xususiyatlarini qayta ishlatishi mumkin",
          "OOP — katta loyihalarni tushunarli, qayta ishlatiladigan bo'laklarga bo'lish usuli",
        ],
      }),
      lesson("l5", "text", "Xatolarni boshqarish va fayllar bilan ishlash", "8 daqiqa", {
        paragraphs: [
          "try/except bloklari kutilmagan xatolarni (masalan, fayl topilmasligi yoki noto'g'ri ma'lumot turi) dastur qulamasdan boshqarish imkonini beradi.",
          "with open() konstruksiyasi fayl bilan ishlashning xavfsiz usuli — fayl avtomatik yopiladi, hatto xato yuz bersa ham.",
          "List comprehension — ro'yxatlar bilan ishlashning qisqa va Pythonic (Python uslubidagi) usuli, masalan [x*2 for x in numbers].",
          "Modullar va paketlar — kodni bir nechta faylga bo'lib, import orqali qayta ishlatish katta loyihalarda tartib saqlashning kaliti.",
        ],
      }),
      lesson("l6", "code", "Funksiya va klass yozish", "14 daqiqa", {
        explanation: "Ro'yxatdagi juft sonlarni qaytaradigan funksiya va oddiy 'Talaba' klassini yozamiz.",
        language: "python",
        code: `def get_even_numbers(numbers):
    return [n for n in numbers if n % 2 == 0]

class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def is_passed(self):
        return self.score >= 60

student = Student("Ali", 75)
print(student.is_passed())  # True`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: fayldan ma'lumot o'qish va tahlil qilish", "24 daqiqa", {
        explanation:
          "CSV faylidan ma'lumotni o'qib, uni tahlil qiluvchi kichik dastur yozing — bu ma'lumotlar bilan ishlashning eng keng tarqalgan real vazifasi.",
        language: "python",
        code: `import csv

def read_scores(filename):
    scores = []
    with open(filename, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            scores.append(int(row["score"]))
    return scores

scores = read_scores("students.csv")
average = sum(scores) / len(scores)
print(f"O'rtacha ball: {average:.1f}")`,
        exercise: "Funksiyani shunday kengaytiringki, u eng yuqori va eng past ballarni ham alohida chiqarsin.",
      }),
    ],
  },
  {
    category: "javascript",
    title: "JavaScript chuqur asoslari",
    level: "O'rta",
    duration: "12 soat",
    students: 9800,
    rating: 4.8,
    description:
      "Closures, Event Loop, prototip zanjiri va asinxron dasturlash — JavaScript'ning eng muhim va ko'pincha chalkash tushunchalarini professional darajada oydinlashtirasiz.",
    lessons: [
      lesson("l1", "presentation", "Event Loop va JavaScript'ning ishlash mantig'i", "13 slayd", {
        keypoints: [
          "JavaScript bir vaqtning o'zida faqat bitta amalni bajaradi (single-threaded)",
          "Call Stack — hozir bajarilayotgan funksiyalarning tartibli ro'yxati",
          "Asinxron amallar (setTimeout, fetch) Web API'larga topshiriladi va call stack bo'shagach navbat bilan qaytariladi",
          "Microtask queue (Promise'lar) macrotask queue'dan (setTimeout) OLDIN bajariladi — bu ko'pchilikni chalkashtiradi",
          "Bu mexanizmni tushunish — nima uchun kod 'yozilgan tartibda' emas, balki boshqa tartibda ishlashini tushuntiradi",
          "Bloklovchi (uzoq) amallar butun sahifani 'muzlatib' qo'yishi mumkin — shuning uchun asinxronlik muhim",
        ],
      }),
      lesson("l2", "text", "Closures — yopiq funksiyalar chuqur tahlili", "8 daqiqa", {
        paragraphs: [
          "Closure — funksiya o'zi yaratilgan muhitdagi o'zgaruvchilarni 'eslab qoladi', hatto tashqi funksiya tugagandan keyin ham.",
          "Bu mexanizm private (yashirin) o'zgaruvchilar yaratish va holatni (state) saqlash uchun ishlatiladi — tashqaridan to'g'ridan-to'g'ri kirish imkonisiz.",
          "Closures — React'dagi useState va useEffect kabi hook'larning ishlash mantig'i asosida yotadi. Shuning uchun uni tushunish React'ni chuqur tushunish uchun ham zarur.",
          "Har bir funksiya chaqiruvi (masalan, sikl ichida) o'zining alohida closure'ini yaratadi — bu ko'pincha 'let vs var' muammosining sababi bo'ladi.",
        ],
      }),
      lesson("l3", "code", "Promise va async/await", "11 daqiqa", {
        explanation: "Asinxron kodni o'qilishi oson qilib yozish usulini ko'ramiz — bu zamonaviy JavaScript'ning standart uslubi.",
        language: "javascript",
        code: `async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Xatolik yuz berdi");
  return res.json();
}

getUser(1)
  .then((user) => console.log(user))
  .catch((err) => console.error(err.message));`,
      }),
      lesson("l4", "presentation", "Prototiplar, this va zamonaviy sintaksis", "11 slayd", {
        keypoints: [
          "JavaScript'da klasslar aslida 'prototip zanjiri' ustidagi qulay sintaksis (syntactic sugar)",
          "Har bir obyekt boshqa obyektdan (prototipidan) xususiyat va metodlarni meros qilib oladi",
          "this kalit so'zi funksiya QANDAY chaqirilganiga qarab o'zgaradi — bu JS'ning eng chalkash joylaridan biri",
          "Arrow function'lar o'zining this'iga ega emas — atrofdagi (lexical) this'ni ishlatadi, bu ularni callback'larda foydali qiladi",
          "Destructuring — obyekt yoki massivdan qiymatlarni qisqa sintaksis bilan ajratib olish: const { name, age } = user",
          "Spread/rest operatorlari (...) massiv va obyektlarni nusxalash, birlashtirish va yig'ishda keng qo'llaniladi",
        ],
      }),
      lesson("l5", "text", "Massiv metodlari va funksional dasturlash uslubi", "8 daqiqa", {
        paragraphs: [
          "map(), filter(), reduce() — JavaScript'dagi eng ko'p ishlatiladigan massiv metodlari. Ularning barchasi ASL massivni o'zgartirmaydi, yangisini qaytaradi.",
          "map() — har bir elementni o'zgartirib, xuddi shu uzunlikdagi yangi massiv yaratadi. filter() — shartga mos elementlarni tanlaydi.",
          "reduce() — massivni bitta qiymatga 'yig'adi' (masalan, yig'indi, o'rtacha, yoki hatto yangi obyekt yaratish uchun ham ishlatiladi).",
          "Funksional uslub — 'nimani xohlayman' (deklarativ) tarzda yozish, 'qanday qilib' (imperativ, for sikllari) o'rniga — bu kodni o'qish va debug qilishni osonlashtiradi.",
        ],
      }),
      lesson("l6", "code", "Debounce funksiyasi — closures amaliyotda", "16 daqiqa", {
        explanation: "Qidiruv maydonida har bosilgan harfda emas, foydalanuvchi to'xtagandan keyin so'rov yuboriladigan debounce funksiyasini yozamiz — bu closures'ning klassik amaliy qo'llanilishi.",
        language: "javascript",
        code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log("Qidirilmoqda:", query);
}, 400);`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: mini state-management yaratish", "24 daqiqa", {
        explanation:
          "Closures yordamida oddiy 'store' (holat ombori) yasang — bu Redux/Zustand kabi kutubxonalarning ichki mantig'ini tushunishga yordam beradi.",
        language: "javascript",
        code: `function createStore(initialState) {
  let state = initialState;
  const listeners = [];

  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener) => listeners.push(listener),
  };
}

const store = createStore({ count: 0 });
store.subscribe((state) => console.log("Yangi holat:", state));
store.setState({ count: 1 });`,
        exercise: "Store'ga unsubscribe funksiyasini qo'shing — listener'ni ro'yxatdan olib tashlash imkonini bering.",
      }),
    ],
  },
  {
    category: "react",
    title: "React bilan interfeys qurish",
    level: "O'rta",
    duration: "13 soat",
    students: 11200,
    rating: 4.9,
    description:
      "Komponentlardan tortib murakkab hook'lar va performance optimizatsiyasigacha — React'ning butun mantig'ini real loyihalar orqali chuqur o'zlashtirasiz.",
    lessons: [
      lesson("l1", "presentation", "Komponent va Virtual DOM mantig'i", "12 slayd", {
        keypoints: [
          "Komponent — qayta ishlatiladigan, o'zining holatiga ega interfeys bo'lagi",
          "React UI'ni state'ning funksiyasi sifatida ko'radi: state o'zgarsa, UI qayta chiziladi",
          "Virtual DOM — haqiqiy DOM'ning xotiradagi nusxasi, React o'zgarishlarni avval shu yerda hisoblaydi",
          "Reconciliation (moslashtirish) — eski va yangi Virtual DOM'ni solishtirib, faqat KERAKLI o'zgarishlarni haqiqiy DOM'ga qo'llash jarayoni",
          "Bu jarayon to'g'ridan-to'g'ri DOM'ni manipulyatsiya qilishdan ancha tezroq va samaraliroq",
          "Katta interfeyslar kichik, mustaqil komponentlarga bo'linganda qo'llab-quvvatlash osonlashadi",
        ],
      }),
      lesson("l2", "text", "Props va State: to'liq farq va qachon nima ishlatish", "8 daqiqa", {
        paragraphs: [
          "Props — komponentga tashqaridan uzatiladigan, o'zgarmas (read-only) ma'lumotlar. Bola komponent o'z props'ini o'zgartira olmaydi.",
          "State — komponentning o'z ichki holati, useState orqali boshqariladi va o'zgarganda komponent avtomatik qayta render bo'ladi.",
          "Umumiy qoida: agar ma'lumot komponent tashqarisidan kelsa — bu prop, agar komponent o'zi boshqarsa va vaqt o'tishi bilan o'zgarsa — bu state.",
          "'Lifting state up' (holatni yuqoriga ko'tarish) — bir nechta komponent bitta holatni ishlatishi kerak bo'lsa, uni ularning umumiy ota-komponentiga ko'chirish tamoyili.",
        ],
      }),
      lesson("l3", "code", "useEffect bilan yon ta'sirlarni boshqarish", "12 daqiqa", {
        explanation: "Komponent ekranga chiqqanda ma'lumot yuklashni va tozalash (cleanup) funksiyasini ko'ramiz.",
        language: "javascript",
        code: `useEffect(() => {
  let active = true;

  fetchCourses().then((data) => {
    if (active) setCourses(data);
  });

  return () => {
    active = false;
  };
}, []);`,
      }),
      lesson("l4", "presentation", "Muhim hook'lar va performance optimizatsiyasi", "13 slayd", {
        keypoints: [
          "useContext — props'ni har bir qatlamdan qo'lda o'tkazmasdan, chuqur joylashgan komponentlarga ma'lumot yetkazish",
          "useRef — qayta render'ni chaqirmasdan qiymatni saqlash, yoki DOM elementiga to'g'ridan-to'g'ri murojaat qilish uchun",
          "useMemo — qimmat hisob-kitob natijasini keshlab, keraksiz qayta hisoblashning oldini oladi",
          "useCallback — funksiyaning o'zini keshlaydi, bu bola komponentlarning keraksiz qayta render bo'lishini oldini oladi",
          "React.memo — props o'zgarmagan bo'lsa, komponentni qayta render qilishdan saqlaydi",
          "Custom hook'lar — takrorlanuvchi mantiqni (masalan, useFetch, useLocalStorage) qayta ishlatiladigan funksiyaga chiqarish",
          "Optimizatsiya faqat HAQIQIY sekinlik aniqlanganda qilinishi kerak — 'erta optimizatsiya' ko'pincha kodni murakkablashtiradi",
        ],
      }),
      lesson("l5", "text", "Komponentlarni to'g'ri loyihalash", "8 daqiqa", {
        paragraphs: [
          "Bitta komponent — bitta mas'uliyat (Single Responsibility) tamoyili React'da ham amal qiladi. Katta komponentlarni mantiqiy qismlarga bo'lish kodni o'qishni osonlashtiradi.",
          "'Controlled' komponentlar — forma qiymati to'liq React state orqali boshqariladi (value + onChange), bu React'ning tavsiya etilgan uslubi.",
          "Composition (kompozitsiya) — children prop orqali komponentlarni bir-biriga 'ichiga solib' qurish, meros olishdan ko'ra ko'proq tavsiya etiladi.",
          "Key prop — ro'yxat render qilinganda React'ga qaysi element qaysi ma'lumotga tegishli ekanini aytadi. Index'ni key sifatida ishlatish ko'pincha xatoga olib keladi.",
        ],
      }),
      lesson("l6", "code", "Custom hook yaratish", "15 daqiqa", {
        explanation: "Takrorlanuvchi 'ma'lumot yuklash' mantig'ini qayta ishlatiladigan custom hook'ga chiqaramiz.",
        language: "javascript",
        code: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}

const { data: courses, loading } = useFetch("/api/courses");`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: to'liq Todo ilovasi", "26 daqiqa", {
        explanation:
          "useState, map/filter va controlled input'larni birlashtirib, qo'shish, o'chirish va 'bajarildi' holatini boshqaradigan to'liq Todo ilovasini yarating.",
        language: "javascript",
        code: `function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function addTodo() {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Qo'shish</button>
      {todos.map((todo) => (
        <div key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.done ? "✅" : "⬜"} {todo.text}
        </div>
      ))}
    </div>
  );
}`,
        exercise: "Vazifani o'chirish (delete) funksiyasini qo'shing va faqat 'bajarilmagan' vazifalarni ko'rsatadigan filtr yarating.",
      }),
    ],
  },
  {
    category: "nextjs",
    title: "Next.js bilan production ilova",
    level: "Yuqori",
    duration: "13 soat",
    students: 4300,
    rating: 4.8,
    description:
      "App Router, server komponentlar, ma'lumot yuklash strategiyalari va SEO optimizatsiyasi bilan tezkor, production darajasidagi ilova qurishni professional darajada egallaysiz.",
    lessons: [
      lesson("l1", "presentation", "Server va Client komponentlar mantig'i", "12 slayd", {
        keypoints: [
          "Next.js'da komponentlar standart holda serverda render qilinadi — bu tezroq yuklanish va kichikroq JS bundle beradi",
          "\"use client\" direktivasi komponentni brauzerda interaktiv qiladi (state, event, hook ishlatish uchun)",
          "Server komponentlar to'g'ridan-to'g'ri ma'lumotlar bazasiga yoki fayl tizimiga kira oladi — API endpoint yaratish shart emas",
          "Client komponentlar brauzer API'lariga (localStorage, window) va hook'larga (useState, useEffect) muhtoj bo'lganda ishlatiladi",
          "To'g'ri balans — sahifani tez (server) va interaktiv (client) qiladi, bu Next.js'ning asosiy kuchi",
          "Server komponent ichida client komponentni chaqirish mumkin, lekin aksincha emas",
        ],
      }),
      lesson("l2", "text", "App Router fayl tuzilishi va maxsus fayllar", "8 daqiqa", {
        paragraphs: [
          "Next.js'da app/ papkasi ichidagi har bir papka — bitta marshrut (route). page.js — sahifaning o'zi, layout.js — bir nechta sahifa uchun umumiy qobiq (navbar, footer kabi).",
          "Kvadrat qavsli papkalar ([slug]) dinamik marshrutlarni bildiradi, masalan /courses/[slug] — /courses/react, /courses/python kabi barcha manzillarga mos keladi.",
          "loading.js — sahifa yuklanayotganda avtomatik ko'rsatiladigan skeleton, not-found.js — 404 holatini, error.js — kutilmagan xatolarni boshqaradi.",
          "Route Groups ((papka-nomi) qavs ichida) — URL'ga ta'sir qilmasdan marshrutlarni mantiqiy guruhlarga ajratish imkonini beradi.",
        ],
      }),
      lesson("l3", "code", "Metadata va SEO optimizatsiyasi", "10 daqiqa", {
        explanation: "Har bir sahifa uchun qidiruv tizimlari uchun aniq metama'lumot berish — bu real loyihalarda trafik uchun juda muhim.",
        language: "javascript",
        code: `export const metadata = {
  title: "Kurslar — codeacademy",
  description: "Frontend, backend va mobile bo'yicha professional kurslar",
  openGraph: {
    title: "Kurslar — codeacademy",
    images: ["/og-image.jpg"],
  },
};`,
      }),
      lesson("l4", "presentation", "Ma'lumot yuklash strategiyalari", "11 slayd", {
        keypoints: [
          "Static Rendering — sahifa build vaqtida bir marta generatsiya qilinadi, eng tez variant (masalan, blog maqolalari)",
          "Dynamic Rendering — har bir so'rovda qayta render qilinadi, doim yangi ma'lumot kerak bo'lganda ishlatiladi",
          "generateStaticParams — dinamik marshrutlarni (masalan, har bir mahsulot sahifasini) build vaqtida oldindan generatsiya qilish",
          "Streaming va Suspense — sahifaning tayyor qismini darhol ko'rsatib, sekin yuklanayotgan qismini keyinroq 'oqim' sifatida yuborish",
          "Route Handlers (app/api/.../route.js) — Next.js ichida to'liq backend endpoint yaratish imkonini beradi",
          "Caching — Next.js fetch so'rovlarini avtomatik keshlaydi, bu performance'ni sezilarli oshiradi, lekin qachon yangilanishini tushunish muhim",
        ],
      }),
      lesson("l5", "text", "Production'ga tayyorlash: performance va xavfsizlik", "8 daqiqa", {
        paragraphs: [
          "next/image komponenti rasmlarni avtomatik optimallashtiradi (o'lcham, format), bu sahifa tezligiga katta ta'sir qiladi.",
          "next/font orqali shriftlarni o'z serveringizdan yuklash — tashqi so'rovlarni kamaytirib, tezlikni oshiradi va maxfiylikni saqlaydi.",
          "Muhit o'zgaruvchilari (.env.local) — maxfiy kalitlarni (API key, database URL) kodga yozmasdan xavfsiz saqlash usuli.",
          "Build vaqtida `next build` xatolarni oldindan aniqlaydi — bu production'ga chiqarishdan oldingi so'nggi tekshiruv hisoblanadi.",
        ],
      }),
      lesson("l6", "code", "Dinamik marshrut va generateStaticParams", "14 daqiqa", {
        explanation: "[slug] papkasi orqali har bir kurs uchun alohida sahifa yaratamiz va uni build vaqtida oldindan generatsiya qilamiz.",
        language: "javascript",
        code: `export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return <h1>{course.title}</h1>;
}`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: Route Handler bilan API yaratish", "22 daqiqa", {
        explanation:
          "Next.js ichida to'liq backend endpoint yozing — bu alohida server yaratmasdan turib API funksiyasini bajarish imkonini beradi.",
        language: "javascript",
        code: `export async function GET() {
  const courses = await getCourses();
  return Response.json({ courses });
}

export async function POST(request) {
  const body = await request.json();
  const newCourse = await createCourse(body);
  return Response.json(newCourse, { status: 201 });
}`,
        exercise: "app/api/courses/[id]/route.js faylida DELETE metodini yozing — noto'g'ri id kelganda 404 status qaytaring.",
      }),
    ],
  },
  {
    category: "nodejs",
    title: "Node.js server dasturlash",
    level: "O'rta",
    duration: "11 soat",
    students: 5600,
    rating: 4.7,
    description:
      "Node.js muhitida fayl tizimi, modullar, oqimlar (streams) va asinxron dasturlash orqali ishonchli serverlar yaratishni professional darajada o'rganasiz.",
    lessons: [
      lesson("l1", "presentation", "Node.js nima va Event Loop qanday ishlaydi", "12 slayd", {
        keypoints: [
          "Node.js — JavaScript'ni brauzerdan tashqarida, serverda ishlatish imkonini beruvchi muhit, V8 dvigateli asosida",
          "Bitta oqim (single thread), lekin asinxron I/O tufayli minglab so'rovni bir vaqtda boshqara oladi",
          "libuv kutubxonasi fayl, tarmoq kabi 'og'ir' amallarni orqa fonda bajarib, natijani navbat orqali qaytaradi",
          "Bloklamaydigan (non-blocking) arxitektura — bir so'rov boshqasini 'kutib turishga' majburlamaydi",
          "npm — dunyodagi eng katta paketlar ombori, minglab tayyor kutubxonalarga ega",
          "Node.js real vaqtli ilovalar (chat, striming) uchun ayniqsa yaxshi mos keladi",
        ],
      }),
      lesson("l2", "text", "Modullar tizimi va npm ekotizimi", "7 daqiqa", {
        paragraphs: [
          "Node.js kodni modullarga bo'lish imkonini beradi: har bir fayl — alohida modul, o'z ichki o'zgaruvchilariga ega.",
          "export/import (ES modules) yoki require/module.exports (CommonJS) orqali modullar bir-biriga ulanadi. Zamonaviy loyihalarda ES modules tavsiya etiladi.",
          "package.json — loyihaning 'shaxsnomasi': nomi, versiyasi, bog'liqliklari (dependencies) va skriptlari shu yerda saqlanadi.",
          "Semantik versiyalash (semver: 1.2.3) — MAJOR.MINOR.PATCH formatida, har bir raqam o'zgarishning qay darajada 'buzuvchi' ekanini bildiradi.",
        ],
      }),
      lesson("l3", "code", "Fayl tizimi bilan asinxron ishlash", "9 daqiqa", {
        explanation: "fs modul yordamida faylni asinxron o'qish — promise-based API zamonaviy Node.js'da standart hisoblanadi.",
        language: "javascript",
        code: `import { readFile, writeFile } from "fs/promises";

const data = await readFile("data.json", "utf-8");
const parsed = JSON.parse(data);

parsed.updatedAt = new Date().toISOString();
await writeFile("data.json", JSON.stringify(parsed, null, 2));`,
      }),
      lesson("l4", "presentation", "Environment, xavfsizlik va production tayyorgarlik", "11 slayd", {
        keypoints: [
          "process.env — muhit o'zgaruvchilariga kirish, .env fayl orqali maxfiy ma'lumotlarni saqlash",
          "dotenv kutubxonasi .env faylini process.env'ga avtomatik yuklaydi — bu kalitlarni kodga yozmaslik uchun standart amaliyot",
          "Helmet kabi middleware'lar HTTP sarlavhalarini xavfsizroq qilib, keng tarqalgan hujumlardan himoyalaydi",
          "PM2 kabi process manager'lar serverni doimiy ishlab turishini ta'minlaydi va u qulasa avtomatik qayta ishga tushiradi",
          "Loglash darajalari (info, warn, error) — production tizimda nima muhim, nima oddiy ma'lumot ekanini ajratish uchun kerak",
          "Graceful shutdown — server o'chirilishidan oldin ochiq so'rovlarni yakunlab, ma'lumot yo'qotmasdan to'xtash jarayoni",
        ],
      }),
      lesson("l5", "text", "Streams — katta ma'lumot bilan samarali ishlash", "7 daqiqa", {
        paragraphs: [
          "Stream (oqim) — ma'lumotni butunlay xotiraga yuklamasdan, kichik bo'laklarda (chunk) qayta ishlash usuli. Katta fayllar bilan ishlashda muhim.",
          "Node.js'da 4 turdagi stream bor: Readable, Writable, Duplex va Transform.",
          "pipe() metodi bir streamni boshqasiga ulaydi — masalan, faylni o'qib, to'g'ridan-to'g'ri HTTP javobiga yuborish, xotirani tejagan holda.",
          "Streams — Node.js'ning eng kam tushuniladigan, lekin eng kuchli imkoniyatlaridan biri, ayniqsa fayl yuklash tizimlarida.",
        ],
      }),
      lesson("l6", "code", "Middleware zanjiri va xato boshqaruvi", "13 daqiqa", {
        explanation: "Har bir so'rovni loglaydigan va ishlash vaqtini o'lchaydigan middleware yaratamiz.",
        language: "javascript",
        code: `function requestLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.url} — \${duration}ms\`);
  });
  next();
}

app.use(requestLogger);`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: fayl yuklash serveri", "22 daqiqa", {
        explanation:
          "Streams yordamida katta faylni xotiraga to'liq yuklamasdan, bo'lib-bo'lib qabul qiluvchi endpoint yarating — bu real fayl-yuklash tizimlarining asosi.",
        language: "javascript",
        code: `import { createWriteStream } from "fs";

app.post("/api/upload", (req, res) => {
  const writeStream = createWriteStream(\`./uploads/\${Date.now()}.dat\`);

  req.pipe(writeStream);

  writeStream.on("finish", () => {
    res.status(201).json({ message: "Fayl saqlandi" });
  });

  writeStream.on("error", () => {
    res.status(500).json({ error: "Saqlashda xatolik" });
  });
});`,
        exercise: "Endpoint'ga fayl hajmi chegarasi (masalan 10MB) qo'shing — chegaradan oshsa, streamni to'xtatib xato qaytaring.",
      }),
    ],
  },
  {
    category: "html",
    title: "HTML bilan veb sahifa qurish",
    level: "Boshlang'ich",
    duration: "6 soat",
    students: 15400,
    rating: 4.9,
    description:
      "Semantik teglar, formalar, media va SEO asoslari — veb-sahifaning to'g'ri, professional tuzilishini noldan mustahkam o'rganasiz.",
    lessons: [
      lesson("l1", "presentation", "HTML hujjat tuzilishi va brauzer bilan aloqasi", "10 slayd", {
        keypoints: [
          "Har bir HTML hujjat <!DOCTYPE html>, <html>, <head> va <body> bilan boshlanadi",
          "<head> — sahifa haqidagi ma'lumot (title, meta, link), <body> — foydalanuvchi ko'radigan kontent",
          "Teglar odatda juft bo'ladi: ochuvchi <p> va yopuvchi </p>, ba'zilari yagona: <img>, <br>",
          "Atributlar tegga qo'shimcha ma'lumot beradi: <a href=\"...\">, <img src=\"...\" alt=\"...\">",
          "To'g'ri tuzilish qidiruv tizimlari va ekran o'quvchilari uchun ham muhim",
          "Brauzer noto'g'ri yozilgan HTML'ni ham 'tushunishga' harakat qiladi, lekin bu kutilmagan natijalarga olib kelishi mumkin",
        ],
      }),
      lesson("l2", "text", "Semantik teglar nega muhim", "6 daqiqa", {
        paragraphs: [
          "<div> o'rniga <header>, <nav>, <main>, <article>, <section>, <footer> kabi semantik teglardan foydalanish sahifa ma'nosini aniqroq qiladi.",
          "Bu qidiruv tizimlari (SEO) va ekran o'quvchi dasturlar uchun sahifani tushunishni ancha osonlashtiradi.",
          "<article> — mustaqil, o'zicha ma'noli kontent (masalan, blog posti), <section> — sahifaning mantiqiy bo'limi.",
          "Semantik HTML — professional dasturchining odatiy amaliyoti hisoblanadi va uzoq muddatda kodni qo'llab-quvvatlashni osonlashtiradi.",
        ],
      }),
      lesson("l3", "code", "Forma elementlari va validatsiya", "10 daqiqa", {
        explanation: "Foydalanuvchi ma'lumotini yig'ish uchun forma — HTML'ning eng interaktiv qismi. Brauzer o'zi ba'zi validatsiyalarni bajaradi.",
        language: "html",
        code: `<form>
  <label for="email">Email</label>
  <input id="email" type="email" required />

  <label for="age">Yosh</label>
  <input id="age" type="number" min="1" max="120" />

  <button type="submit">Yuborish</button>
</form>`,
      }),
      lesson("l4", "presentation", "Media, jadval va SEO asoslari", "9 slayd", {
        keypoints: [
          "<img>, <video>, <audio> teglari media kontentni ko'rsatadi — har birida to'g'ri fallback va atributlar muhim",
          "srcset atributi turli ekran zichligi uchun turli o'lchamdagi rasmlarni taklif qiladi — performance uchun muhim",
          "<table> jadval ma'lumotlar uchun, lekin layout qurish uchun HECH QACHON ishlatilmaydi — bu eskirgan amaliyot",
          "<meta name=\"description\"> qidiruv natijalarida ko'rinadigan qisqa tavsifni belgilaydi",
          "Open Graph teglari (og:title, og:image) ijtimoiy tarmoqlarda havola qanday ko'rinishini boshqaradi",
          "lang atributi (<html lang=\"uz\">) sahifa tilini belgilaydi — bu qidiruv tizimlari va tarjima vositalari uchun muhim",
        ],
      }),
      lesson("l5", "text", "Formalar va accessibility chuqurroq", "7 daqiqa", {
        paragraphs: [
          "<label for=\"...\"> har doim tegishli <input id=\"...\"> bilan bog'lanishi kerak — bu nafaqat qulaylik, balki foydalanuvchi labelga bosganda inputga fokus tushishini ham ta'minlaydi.",
          "required, pattern, minlength kabi atributlar brauzer darajasida oddiy validatsiya beradi, lekin serverda HAM tekshirish har doim majburiy.",
          "fieldset va legend teglari formaning mantiqiy qismlarini guruhlaydi va ekran o'quvchilar uchun tushunarli qiladi.",
          "placeholder — label o'rnini bosa olmaydi, u faqat qo'shimcha maslahat sifatida ishlatilishi kerak.",
        ],
      }),
      lesson("l6", "code", "To'liq kontakt formasi", "12 daqiqa", {
        explanation: "Ism, email va xabar maydonlaridan iborat, to'liq accessible kontakt formasini yasaymiz.",
        language: "html",
        code: `<form>
  <label for="name">Ismingiz</label>
  <input id="name" type="text" required />

  <label for="contact-email">Email</label>
  <input id="contact-email" type="email" required />

  <label for="message">Xabar</label>
  <textarea id="message" rows="4" required></textarea>

  <button type="submit">Yuborish</button>
</form>`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: to'liq semantik sahifa skeleti", "18 daqiqa", {
        explanation:
          "Header, nav, main (bir nechta section bilan) va footer'dan iborat, to'liq semantik va SEO uchun tayyor sahifa skeletini yarating.",
        language: "html",
        code: `<body>
  <header>
    <nav>
      <a href="/">Bosh sahifa</a>
      <a href="/about">Biz haqimizda</a>
    </nav>
  </header>

  <main>
    <section aria-label="Kirish">
      <h1>Sahifa sarlavhasi</h1>
    </section>
    <article>
      <h2>Maqola nomi</h2>
      <p>Maqola matni...</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 codeacademy</p>
  </footer>
</body>`,
        exercise: "Sahifaga <meta name=\"description\"> va Open Graph teglarini (og:title, og:description) qo'shing.",
      }),
    ],
  },
  {
    category: "css",
    title: "CSS bilan zamonaviy dizayn",
    level: "Boshlang'ich",
    duration: "9 soat",
    students: 10100,
    rating: 4.8,
    description:
      "Flexbox, Grid, animatsiyalar va zamonaviy CSS xususiyatlari orqali istalgan ekranga moslashadigan, professional darajadagi interfeyslar yaratishni o'rganasiz.",
    lessons: [
      lesson("l1", "presentation", "CSS asoslari va Selektorlar", "11 slayd", {
        keypoints: [
          "CSS qoidasi selektor va deklaratsiyalar blokidan iborat: selector { property: value; }",
          "Selektorlar: element (p), klass (.card), id (#header), atribut ([type=\"text\"]) va ularning kombinatsiyalari",
          "Specificity (aniqlik darajasi) — bir nechta qoida bir xil elementga qo'llanilganda qaysi biri 'g'olib chiqishini' belgilaydi",
          "Cascade (kaskad) — CSS nomi shundan kelib chiqadi: qoidalar yuqoridan pastga, umumiydan xususiyga qarab qo'llaniladi",
          "CSS o'zgaruvchilari (--main-color kabi) qiymatlarni bir joyda saqlab, butun sahifada qayta ishlatish imkonini beradi",
          "Zamonaviy CSS endi juda kuchli — ko'p hollarda JavaScript'siz ham murakkab effektlar yaratish mumkin",
        ],
      }),
      lesson("l2", "text", "Flexbox va Grid: qachon nimani ishlatish", "8 daqiqa", {
        paragraphs: [
          "Flexbox bir o'lchamli (qator yoki ustun) joylashuvlar uchun, Grid esa ikki o'lchamli (qator VA ustun) joylashuvlar uchun mo'ljallangan.",
          "Murakkab sahifa layoutlari (masalan, dashboard) ko'pincha Grid bilan, ichki komponentlar Flexbox bilan quriladi.",
          "justify-content asosiy o'q bo'yicha, align-items ko'ndalang o'q bo'yicha elementlarni tekislaydi.",
          "Ikkalasini birga ishlatish — zamonaviy CSS'ning standart amaliyoti, ular bir-birini almashtirmaydi, balki to'ldiradi.",
        ],
      }),
      lesson("l3", "code", "Responsive Grid panjarasi", "10 daqiqa", {
        explanation: "Ekran kengligiga qarab avtomatik moslashadigan karta panjarasi — bu zamonaviy dizaynning eng ko'p ishlatiladigan naqshi.",
        language: "css",
        code: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`,
      }),
      lesson("l4", "presentation", "Animatsiyalar, transition va zamonaviy xususiyatlar", "10 slayd", {
        keypoints: [
          "transition — bir CSS holatidan boshqasiga silliq o'tishni ta'minlaydi",
          "@keyframes va animation — murakkab, bir necha bosqichli animatsiyalarni yaratish imkonini beradi",
          "transform (scale, rotate, translate) — elementni fizik joylashuvini o'zgartirmasdan harakatlantiradi, performance uchun eng samarali usul",
          "clamp() funksiyasi — minimal, ideal va maksimal qiymatlar orasida moslashuvchan o'lcham beradi",
          ":has() selektori — ota elementni uning ICHIDAGI elementga qarab tanlash imkonini beradi",
          "prefers-color-scheme media query — foydalanuvchining tizim darajasidagi dark/light mode tanlovini aniqlaydi",
        ],
      }),
      lesson("l5", "text", "CSS arxitekturasi va best practice'lar", "7 daqiqa", {
        paragraphs: [
          "BEM (Block-Element-Modifier) kabi nomlash konventsiyalari katta loyihalarda klass nomlari to'qnashmasligini ta'minlaydi.",
          "CSS o'zgaruvchilarini markazlashtirilgan holda saqlash — rang sxemasini bir joydan boshqarish imkonini beradi.",
          "Mobile-first yozish uslubi — avval eng kichik ekran uchun CSS yozib, keyin @media (min-width: ...) orqali kengaytirish.",
          "Utility-first freymvorklar (Tailwind CSS kabi) kichik, qayta ishlatiladigan klasslar orqali tez dizayn qurish imkonini beradi.",
        ],
      }),
      lesson("l6", "code", "Hover animatsiyasi va transition", "13 daqiqa", {
        explanation: "Kartaga sichqoncha olib borilganda silliq ko'tarilish va soya effekti qo'shamiz.",
        language: "css",
        code: `.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: to'liq responsive navbar", "20 daqiqa", {
        explanation:
          "Desktop'da gorizontal, mobil ekranda hamburger menyuga aylanadigan to'liq navbar yarating.",
        language: "css",
        code: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.hamburger {
  display: none;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: block; }
}`,
        exercise: "JavaScript bilan hamburger tugmasi bosilganda .nav-links'ga 'open' klassini qo'shib/olib tashlab, mobil menyuni ochib-yopishni amalga oshiring.",
      }),
    ],
  },
  {
    category: "git",
    title: "Git bilan versiyalarni boshqarish",
    level: "Boshlang'ich",
    duration: "7 soat",
    students: 7200,
    rating: 4.7,
    description:
      "Commit, branch, merge va conflict'larni hal qilishdan tortib, jamoaviy Git workflow'igacha — versiya nazoratini professional darajada egallaysiz.",
    lessons: [
      lesson("l1", "presentation", "Git nega kerak va qanday ishlaydi", "10 slayd", {
        keypoints: [
          "Git — kod tarixini saqlaydigan va jamoaviy ishlashni osonlashtiradigan versiya nazorati tizimi",
          "Har bir commit — kodning ma'lum vaqtdagi suratini (snapshot) saqlaydi, kerak bo'lsa istalgan nuqtaga qaytish mumkin",
          "Git taqsimlangan (distributed) tizim — har bir dasturchi kompyuterida to'liq tarix nusxasi bo'ladi",
          "Branch'lar yordamida asosiy koddan uzoqlashmasdan yangi funksiyalar ustida mustaqil ishlash mumkin",
          "SHA hash — har bir commit'ning noyob 'barmoq izi', kod va tarixning o'zgarmasligini kafolatlaydi",
          "Git — fayllarni emas, o'zgarishlarni (diff) kuzatadi, bu uni juda samarali qiladi",
        ],
      }),
      lesson("l2", "text", "Working Directory, Staging va Repository", "7 daqiqa", {
        paragraphs: [
          "Working directory — fayllaringiz ustida bevosita ishlaydigan joy, hozirgi holatdagi kod shu yerda.",
          "Staging area (git add) — commit qilishga tayyorlangan o'zgarishlar to'plami. Siz aynan QAYSI o'zgarishlarni commit qilishni tanlay olasiz.",
          "Repository (git commit) — o'zgarishlar rasmiy ravishda tarixga yoziladigan joy.",
          "Bu uch bosqichli tizim — nima o'zgargani, nima commit qilinishga tayyorlangani va nima allaqachon saqlanganini aniq ajratish imkonini beradi.",
        ],
      }),
      lesson("l3", "code", "Kundalik ishda ishlatiladigan buyruqlar", "9 daqiqa", {
        explanation: "Har kuni ishlatiladigan asosiy Git buyruqlari.",
        language: "bash",
        code: `git status
git add .
git commit -m "Yangi funksiya qo'shildi"
git push origin main
git log --oneline`,
      }),
      lesson("l4", "presentation", "Branch strategiyasi va Merge Conflict", "11 slayd", {
        keypoints: [
          "Feature branch workflow — har bir yangi funksiya uchun alohida branch yaratish",
          "git checkout -b yoki git switch -c — yangi branch yaratib, darhol unga o'tish",
          "Merge — bitta branch'dagi o'zgarishlarni boshqasiga qo'shish",
          "Merge conflict — ikkala branch bitta faylning BIR XIL qatorini turlicha o'zgartirganda yuzaga keladi",
          "Conflict hal qilinganda Git maxsus belgilar bilan ikkala versiyani ko'rsatadi — dasturchi qo'lda tanlashi kerak",
          "Rebase — commit tarixini 'tekislash', chiziqli va toza tarix yaratish uchun ishlatiladi",
        ],
      }),
      lesson("l5", "text", ".gitignore va commit xabarlari madaniyati", "7 daqiqa", {
        paragraphs: [
          ".gitignore fayli — node_modules, .env, build papkalari kabi Git tomonidan kuzatilmasligi kerak bo'lgan fayl va papkalarni belgilaydi.",
          "Yaxshi commit xabari — nima o'zgarganini emas, NEGA o'zgarganini tushuntiradi.",
          "Kichik, mantiqiy commit'lar — bitta commit bitta o'zgarishga tegishli bo'lishi kerak.",
          "Conventional Commits standarti (feat:, fix:, docs:) — jamoaviy loyihalarda commit tarixini tushunarli qiladi.",
        ],
      }),
      lesson("l6", "code", "Branch yaratish, merge va conflict hal qilish", "14 daqiqa", {
        explanation: "Yangi branch yaratib, o'zgartirish kiritib, uni asosiy branchga qo'shamiz.",
        language: "bash",
        code: `git checkout -b feature/navbar
git add .
git commit -m "Navbar komponenti qo'shildi"

git checkout main
git merge feature/navbar
# agar conflict bo'lsa: faylni qo'lda tuzatib, keyin:
git add .
git commit`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: to'liq workflow simulyatsiyasi", "16 daqiqa", {
        explanation:
          "Real jamoaviy loyihadagidek: branch yarating, o'zgartiring, eski o'zgarishni bekor qiling va tarixni ko'rib chiqing.",
        language: "bash",
        code: `git checkout -b fix/typo
echo "tuzatilgan matn" > README.md
git commit -am "README'dagi xato tuzatildi"

git revert HEAD

git log --graph --oneline --all`,
        exercise: "git stash buyrug'ini o'rganib, tugallanmagan o'zgarishlarni vaqtincha 'saqlab qo'yish' va keyin qaytarib olishni sinab ko'ring.",
      }),
    ],
  },
  {
    category: "github",
    title: "GitHub orqali jamoaviy ishlash",
    level: "Boshlang'ich",
    duration: "6 soat",
    students: 6100,
    rating: 4.6,
    description:
      "Pull request, code review, GitHub Actions va ochiq-manba loyihalarga hissa qo'shish — zamonaviy jamoaviy dasturlash jarayonini professional darajada o'rganasiz.",
    lessons: [
      lesson("l1", "presentation", "GitHub va Git farqi", "9 slayd", {
        keypoints: [
          "Git — versiya nazorati vositasi, GitHub esa Git repozitoriylarini onlayn joylashtiruvchi platforma",
          "GitHub jamoaviy ishlash, code review va loyihani ochiq manba qilishni osonlashtiradi",
          "Fork — boshqa birovning repozitoriysining o'z hisobingizga to'liq nusxasini yaratish",
          "Pull request (PR) — o'zgarishlarni asosiy kodga qo'shishdan oldin ko'rib chiqish jarayoni",
          "Issues — xato xabarlari, yangi funksiya so'rovlari va muhokamalarni tartibli boshqarish tizimi",
          "GitHub — nafaqat kod saqlash, balki butun loyiha boshqaruvi platformasiga aylangan",
        ],
      }),
      lesson("l2", "text", "Pull Request jarayoni chuqur tahlili", "7 daqiqa", {
        paragraphs: [
          "Pull request (PR) — sizning branch'ingizdagi o'zgarishlarni asosiy branchga qo'shishni so'rash jarayoni.",
          "Jamoadoshlar PR'ni ko'rib chiqadi, izoh qoldiradi, kerak bo'lsa aniq qatorlarga o'zgartirish so'raydi.",
          "CI/CD (GitHub Actions) avtomatik testlarni ishga tushiradi — barcha testlar o'tmasa, PR odatda merge qilinmaydi.",
          "Barcha tekshiruvlar o'tgandan so'ng PR merge qilinadi va branch odatda o'chiriladi.",
        ],
      }),
      lesson("l3", "code", "Fork, Clone va Pull Request oqimi", "9 daqiqa", {
        explanation: "Ochiq loyihaga hissa qo'shishning to'liq jarayoni.",
        language: "bash",
        code: `git clone https://github.com/username/loyiha.git
cd loyiha
git checkout -b fix/typo

git commit -am "README'dagi xato tuzatildi"
git push origin fix/typo
# so'ng GitHub'da "Compare & pull request" tugmasini bosing`,
      }),
      lesson("l4", "presentation", "GitHub Actions va CI/CD asoslari", "9 slayd", {
        keypoints: [
          "CI (Continuous Integration) — har bir o'zgarish avtomatik test qilinadi",
          "CD (Continuous Deployment) — testlardan o'tgan kod avtomatik production'ga chiqariladi",
          "GitHub Actions — .github/workflows/ papkasidagi YAML fayllar orqali avtomatlashtirishni belgilaydi",
          "Workflow triggerlari — push, pull_request kabi hodisalar workflow'ni avtomatik ishga tushiradi",
          "Har bir loyihada minimal CI: lint, testlar va build qilish bo'lishi tavsiya etiladi",
          "Secrets — API kalitlar kabi maxfiy ma'lumotlarni GitHub'ning xavfsiz saqlash tizimida saqlash",
        ],
      }),
      lesson("l5", "text", "Code Review madaniyati", "6 daqiqa", {
        paragraphs: [
          "Yaxshi code review — shaxsni emas, kodni baholaydi.",
          "Review paytida e'tibor berish kerak: mantiqiy xatolar, xavfsizlik muammolari, kod uslubi va testlar.",
          "PR muallifi review izohlariga ochiq bo'lishi kerak.",
          "Kichik PR'lar review qilish uchun ancha oson va tezroq.",
        ],
      }),
      lesson("l6", "code", "Oddiy GitHub Actions workflow yozish", "12 daqiqa", {
        explanation: "Har bir push'da avtomatik testlarni ishga tushiradigan CI workflow yaratamiz.",
        language: "bash",
        code: `# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm test`,
      }),
      lesson("l7", "text", "Yakuniy amaliyot: professional README yozish", "10 daqiqa", {
        paragraphs: [
          "Yaxshi README — loyihaning nomi, qisqa tavsifi, o'rnatish qadamlari va foydalanish misolidan iborat bo'lishi kerak.",
          "Badge'lar README'ning yuqori qismida loyiha holatini bir qarashda ko'rsatadi.",
          "Contributing bo'limi — boshqalar loyihaga qanday hissa qo'sha olishini tushuntiradi.",
          "Vazifa: o'zingizning kichik loyihangiz uchun sarlavha, tavsif, o'rnatish qadamlari, foydalanish misoli va litsenziya bo'limlaridan iborat to'liq README.md fayl yozing.",
        ],
      }),
    ],
  },
  {
    category: "database",
    title: "Ma'lumotlar bazasi asoslari",
    level: "O'rta",
    duration: "10 soat",
    students: 4800,
    rating: 4.7,
    description:
      "Relatsion va NoSQL ma'lumotlar bazalarining farqidan tortib, indekslar, JOIN'lar va normalizatsiyagacha — samarali sxema loyihalashni professional darajada egallaysiz.",
    lessons: [
      lesson("l1", "presentation", "SQL vs NoSQL: to'g'ri tanlov", "12 slayd", {
        keypoints: [
          "SQL bazalar (PostgreSQL, MySQL) qat'iy sxema va jadvallar orasidagi bog'lanishlarga asoslanadi",
          "NoSQL bazalar (MongoDB) moslashuvchan hujjat asosidagi tuzilmani taklif qiladi",
          "ACID xususiyatlari SQL bazalarda tranzaksiyalar ishonchliligini kafolatlaydi",
          "NoSQL bazalar odatda gorizontal kengayishga yaxshiroq moslashgan",
          "Tanlov loyihaning ma'lumot tuzilmasi, bog'lanishlar murakkabligi va o'sish talablariga bog'liq",
          "Ko'p zamonaviy loyihalar ikkalasini ham birga ishlatadi",
        ],
      }),
      lesson("l2", "text", "Indekslar va so'rov tezligi", "8 daqiqa", {
        paragraphs: [
          "Indeks — ma'lumotlar bazasiga kitobning mundarijasi kabi tez qidiruv imkonini beruvchi qo'shimcha tuzilma.",
          "Indekssiz so'rov jadvalning har bir qatorini tekshiradi, bu katta jadvallarda juda sekin bo'ladi.",
          "Har bir indeks yozish tezligini biroz pasaytiradi va qo'shimcha xotira talab qiladi — shuning uchun faqat kerakli ustunlarga qo'yiladi.",
          "Composite indekslar bir nechta shart bilan qidiruvni tezlashtiradi, lekin ustunlar tartibi muhim ahamiyatga ega.",
        ],
      }),
      lesson("l3", "code", "Oddiy SQL so'rovlar", "9 daqiqa", {
        explanation: "Eng ko'p ishlatiladigan SQL buyruqlari.",
        language: "sql",
        code: `SELECT name, email FROM users
WHERE created_at > '2026-01-01'
ORDER BY created_at DESC
LIMIT 10;`,
      }),
      lesson("l4", "presentation", "Normalizatsiya va bog'lanish turlari", "11 slayd", {
        keypoints: [
          "Normalizatsiya — ma'lumotlar takrorlanishini kamaytirib, ma'lumotlar bazasini mantiqiy jadvallarga bo'lish jarayoni",
          "1NF, 2NF, 3NF — normalizatsiyaning bosqichlari",
          "One-to-Many bog'lanish — masalan, bitta foydalanuvchi ko'p buyurtmaga ega bo'lishi mumkin",
          "Many-to-Many bog'lanish — 'oraliq jadval' orqali amalga oshiriladi",
          "Foreign key — bir jadvaldagi ustunning boshqa jadvalning primary key'iga havolasi",
          "Haddan tashqari normalizatsiya ko'p JOIN talab qilib, so'rovlarni sekinlashtirishi mumkin",
        ],
      }),
      lesson("l5", "text", "Tranzaksiyalar va ma'lumot yaxlitligi", "7 daqiqa", {
        paragraphs: [
          "Tranzaksiya — bir nechta amalni 'bo'linmas' blok sifatida bajarish: yoki hammasi muvaffaqiyatli, yoki hech biri bajarilmaydi.",
          "Klassik misol: pul o'tkazish — bir hisobdan pul yechish va boshqasiga qo'shish.",
          "BEGIN, COMMIT va ROLLBACK buyruqlari tranzaksiyani boshlash, tasdiqlash va bekor qilishni boshqaradi.",
          "Isolation darajalari bir vaqtda ishlayotgan bir nechta tranzaksiya bir-biriga qanday ta'sir qilishini belgilaydi.",
        ],
      }),
      lesson("l6", "code", "JOIN va murakkab so'rovlar", "14 daqiqa", {
        explanation: "Ikki jadvalni bog'lab, foydalanuvchi va uning buyurtmalarini birga chiqaramiz.",
        language: "sql",
        code: `SELECT users.name, orders.total, orders.created_at
FROM users
JOIN orders ON orders.user_id = users.id
WHERE orders.total > 100000
ORDER BY orders.created_at DESC;`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: to'liq sxema loyihalash", "20 daqiqa", {
        explanation:
          "Kurslar platformasi uchun users, courses va enrollments jadvallarini, ular orasidagi bog'lanishlar bilan birga loyihalang.",
        language: "sql",
        code: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);

CREATE TABLE enrollments (
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, course_id)
);`,
        exercise: "Har bir foydalanuvchi nechta kursga yozilganini hisoblaydigan SELECT so'rovini (GROUP BY va COUNT bilan) yozing.",
      }),
    ],
  },
  {
    category: "cybersecurity",
    title: "Kiber xavfsizlik asoslari",
    level: "O'rta",
    duration: "10 soat",
    students: 3900,
    rating: 4.8,
    description:
      "SQL Injection'dan XSS'gacha — veb-ilovalardagi eng keng tarqalgan zaifliklarni tanish, ulardan himoyalanish va xavfsiz kod yozishni professional darajada o'rganasiz.",
    lessons: [
      lesson("l1", "presentation", "Xavfsizlik nima uchun muhim", "10 slayd", {
        keypoints: [
          "Har qanday ilova — foydalanuvchi ma'lumotlarini himoya qilish majburiyatini o'z zimmasiga oladi",
          "Kichik zaiflik ham katta ma'lumot sizib chiqishiga olib kelishi mumkin",
          "Xavfsizlik — qo'shimcha funksiya emas, dasturlash jarayonining ajralmas qismi",
          "OWASP Top 10 — veb-ilovalarda eng ko'p uchraydigan zaifliklarning rasmiy ro'yxati",
          "Hujumchi eng zaif nuqtani qidiradi — shuning uchun xavfsizlik zanjirning eng zaif bo'g'ini kabi kuchli bo'ladi",
          "Foydalanuvchidan kelgan hech qanday ma'lumotga to'liq ishonib bo'lmaydi",
        ],
      }),
      lesson("l2", "text", "SQL Injection va Command Injection", "8 daqiqa", {
        paragraphs: [
          "SQL Injection — foydalanuvchi kiritgan ma'lumot to'g'ridan-to'g'ri SQL so'roviga qo'shilganda yuzaga keladigan zaiflik.",
          "Buning oldini olish uchun har doim parametrlashtirilgan so'rovlar (prepared statements) ishlatiladi.",
          "Command Injection — xuddi shunday tamoyil, lekin server buyruqlariga tegishli.",
          "ORM kutubxonalari odatda SQL Injection'dan avtomatik himoya qiladi.",
        ],
      }),
      lesson("l3", "code", "Xavfli va xavfsiz so'rov taqqoslash", "9 daqiqa", {
        explanation: "Parametrlashtirilgan so'rov qanday himoya qilishini aniq misolda ko'ramiz.",
        language: "javascript",
        code: `// Xavfli — SQL Injection'ga ochiq:
db.query(\`SELECT * FROM users WHERE email = '\${email}'\`);

// Xavfsiz — parametrlashtirilgan so'rov:
db.query("SELECT * FROM users WHERE email = ?", [email]);`,
      }),
      lesson("l4", "presentation", "XSS, CSRF va autentifikatsiya xavfsizligi", "12 slayd", {
        keypoints: [
          "XSS (Cross-Site Scripting) — hujumchi sahifaga zararli JavaScript kodini kiritib, boshqa foydalanuvchilar brauzerida ishga tushiradigan hujum turi",
          "Stored XSS — zararli kod bazaga saqlanadi, Reflected XSS — URL orqali darhol qaytariladi",
          "React kabi freymvorklar HTML'ni standart holda escape qiladi, bu XSS'dan avtomatik himoya beradi",
          "CSRF — foydalanuvchi bilmagan holda, uning nomidan boshqa saytga so'rov yuborilishi. CSRF token'lar himoya qiladi",
          "Parollarni hech qachon ochiq matn holida saqlamang — bcrypt yoki argon2 kabi 'sekin' hash algoritmlari ishlatiladi",
          "Ikki bosqichli autentifikatsiya (2FA) qo'shimcha himoya qatlamini beradi",
          "HTTPS brauzer va server orasidagi barcha ma'lumotni shifrlaydi",
        ],
      }),
      lesson("l5", "text", "Xavfsiz autentifikatsiya arxitekturasi", "8 daqiqa", {
        paragraphs: [
          "JWT token'lar odatda qisqa muddatga beriladi, uzoq muddatli kirish uchun 'refresh token' alohida, xavfsizroq saqlanadi.",
          "httpOnly cookie — JavaScript orqali o'qib bo'lmaydigan cookie turi, bu XSS orqali token o'g'irlanishining oldini oladi.",
          "Rate limiting — login formasiga ketma-ket ko'p marta noto'g'ri parol kiritilsa, vaqtinchalik bloklash.",
          "Xavfsizlik — doimiy jarayon: kutubxonalarni yangilab turish, zaifliklarni muntazam tekshirish va yangi tahdidlardan xabardor bo'lish talab etiladi.",
        ],
      }),
      lesson("l6", "code", "Inputni tozalash va XSS'dan himoya", "12 daqiqa", {
        explanation: "Foydalanuvchi kiritgan matnni xavfsiz tarzda ko'rsatish.",
        language: "javascript",
        code: `function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Xavfsiz:
element.textContent = userInput;
// yoki React'da: {userInput} — avtomatik escape qilinadi`,
      }),
      lesson("l7", "code", "Yakuniy amaliyot: xavfsiz login endpoint", "18 daqiqa", {
        explanation:
          "Parolni xavfsiz hash qilib saqlaydigan va login urinishlarini cheklaydigan to'liq autentifikatsiya oqimini loyihalang.",
        language: "javascript",
        code: `import bcrypt from "bcrypt";

async function registerUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 12);
  return db.createUser({ email, passwordHash });
}

async function loginUser(email, password) {
  const user = await db.findUserByEmail(email);
  if (!user) throw new Error("Email yoki parol xato");

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error("Email yoki parol xato");

  return generateToken(user.id);
}`,
        exercise: "loginUser funksiyasiga rate limiting qo'shing: bitta email uchun 5 martadan ortiq noto'g'ri urinishdan keyin 15 daqiqaga bloklang.",
      }),
    ],
  },
];

export const COURSES = COURSE_DEFS.map((c, index) => {
  const category = CATEGORIES.find((cat) => cat.id === c.category);
  const slug = c.category;
  return {
    id: `course_${index + 1}`,
    slug,
    ...c,
    categoryName: category?.name || c.category,
    color: category?.color || "#6366F1",
  };
});

export function getCourseBySlug(slug) {
  return COURSES.find((c) => c.slug === slug) || null;
}

export function getCoursesByCategory(categoryId) {
  if (!categoryId || categoryId === "all") return COURSES;
  return COURSES.filter((c) => c.category === categoryId);
}

// Admin panel orqali qo'shilgan kurslarni statik katalog bilan birlashtiradi.
export function withCustomCourses(customCourses = []) {
  return [...COURSES, ...customCourses];
}

export function findCourseBySlug(slug, customCourses = []) {
  return withCustomCourses(customCourses).find((c) => c.slug === slug) || null;
}
