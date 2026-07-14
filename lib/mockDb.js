// Vaqtinchalik "database" qatlami.
// Hozircha localStorage ishlatiladi. Keyingi bosqichda bu faylni
// MongoDB (lib/services/api.js orqali) yoki Firebase bilan almashtirish mumkin —
// yuqoridagi funksiyalarning imzosi (signature) bir xil qoladi, shuning uchun
// qolgan qismlarni o'zgartirish shart bo'lmaydi.

const USERS_KEY = "codeacademy_users_db";

function readUsers() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function simpleHash(value) {
  // Demo maqsadida sodda hash. Real backendda bcrypt/argon2 ishlatiladi.
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return `h_${hash}`;
}

export function createUser({ username, email, password, role = "user" }) {
  const users = readUsers();

  if (users.some((u) => u.email === email)) {
    throw new Error("Bu email allaqachon ro'yxatdan o'tgan.");
  }
  if (users.some((u) => u.username === username)) {
    throw new Error("Bu foydalanuvchi nomi band.");
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    username,
    email,
    passwordHash: simpleHash(password),
    avatar: null,
    role,
    coin: 100,
    xp: 0,
    level: 1,
    rank: users.length + 1,
    badges: [],
    achievements: [],
    premiumUntil: null,
    premiumPlan: null,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return newUser;
}

export function findUserByCredentials({ email, password }) {
  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("Bunday email topilmadi.");
  if (user.passwordHash !== simpleHash(password)) {
    throw new Error("Parol noto'g'ri.");
  }
  return user;
}

export function getUserById(id) {
  const users = readUsers();
  return users.find((u) => u.id === id) || null;
}

export function updateUser(id, patch) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch };
  writeUsers(users);
  return users[idx];
}

export function listUsers() {
  return readUsers();
}

export function deleteUser(id) {
  const users = readUsers();
  writeUsers(users.filter((u) => u.id !== id));
}

// Demo maqsadida standart admin hisobini yaratadi (agar mavjud bo'lmasa).
// Login: admin@codeacademy.uz / admin123
export function seedAdmin() {
  const users = readUsers();
  if (users.some((u) => u.role === "admin")) return;
  createUser({
    username: "admin",
    email: "admin@codeacademy.uz",
    password: "admin123",
    role: "admin",
  });
}
