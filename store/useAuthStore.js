"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createUser, findUserByCredentials, getUserById, updateUser, seedAdmin } from "@/lib/mockDb";

if (typeof window !== "undefined") {
  seedAdmin();
}

function issueFakeToken(userId) {
  // Demo token. Real backendda bu server tomonidan JWT sifatida qaytariladi.
  const payload = btoa(JSON.stringify({ sub: userId, iat: Date.now() }));
  return `demo.${payload}.token`;
}

function levelFromXp(xp) {
  // Har 500 XP — 1 daraja. Sodda, tushunarli progressiya.
  return Math.floor(xp / 500) + 1;
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      register: async ({ username, email, password }) => {
        const user = createUser({ username, email, password });
        const token = issueFakeToken(user.id);
        set({ user, token, isAuthenticated: true });
        return user;
      },

      login: async ({ email, password }) => {
        const user = findUserByCredentials({ email, password });
        const token = issueFakeToken(user.id);
        set({ user, token, isAuthenticated: true });
        return user;
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      refreshUser: () => {
        const current = get().user;
        if (!current) return;
        const fresh = getUserById(current.id);
        if (fresh) set({ user: fresh });
      },

      // Test/Quiz/O'yin/Daily Challenge g'alabasidan so'ng chaqiriladi.
      // Premium foydalanuvchilar +25% ko'proq coin va XP oladi.
      rewardUser: ({ coin = 0, xp = 0 }) => {
        const current = get().user;
        if (!current) return null;

        const premiumActive = current.premiumUntil && new Date(current.premiumUntil) > new Date();
        const multiplier = premiumActive ? 1.25 : 1;
        const finalCoin = Math.round(coin * multiplier);
        const finalXp = Math.round(xp * multiplier);

        const newXp = current.xp + finalXp;
        const updated = updateUser(current.id, {
          coin: current.coin + finalCoin,
          xp: newXp,
          level: levelFromXp(newXp),
        });
        if (updated) set({ user: updated });
        return updated;
      },

      // Coin Shop'da sotib olishda ishlatiladi. Coin yetarli bo'lmasa false qaytaradi.
      spendCoins: (amount) => {
        const current = get().user;
        if (!current || current.coin < amount) return false;
        const updated = updateUser(current.id, { coin: current.coin - amount });
        if (updated) set({ user: updated });
        return true;
      },

      // To'lov muvaffaqiyatli bo'lgandan so'ng chaqiriladi (CheckoutModal orqali).
      // Agar foydalanuvchida hali muddati tugamagan Premium bo'lsa, yangi muddat
      // ESKI tugash sanasiga QO'SHILADI (uzaytirish), aks holda bugundan boshlanadi.
      activatePremium: (planId, days) => {
        const current = get().user;
        if (!current) return null;

        const now = new Date();
        const existingUntil = current.premiumUntil ? new Date(current.premiumUntil) : null;
        const base = existingUntil && existingUntil > now ? existingUntil : now;
        const newUntil = new Date(base);
        newUntil.setDate(newUntil.getDate() + days);

        const updated = updateUser(current.id, {
          premiumUntil: newUntil.toISOString(),
          premiumPlan: planId,
        });
        if (updated) set({ user: updated });
        return updated;
      },

      isPremiumActive: () => {
        const current = get().user;
        if (!current?.premiumUntil) return false;
        return new Date(current.premiumUntil) > new Date();
      },
    }),
    {
      name: "codeacademy-auth",
    }
  )
);
