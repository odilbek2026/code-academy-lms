"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Admin panel orqali qo'shilgan kontent shu yerda saqlanadi va asosiy
// statik ma'lumotlar (coursesData.js, questionBank.js, shopData.js) bilan
// birlashtirilib ko'rsatiladi. Real backendga o'tganda bu store butunlay
// olib tashlanadi — barcha yozish amallari API chaqiruviga aylanadi.

export const useAdminContentStore = create(
  persist(
    (set, get) => ({
      customCourses: [],
      customQuestions: [],
      customProducts: [],
      customGameRounds: {},
      customHackathons: [],

      addCourse: (course) => {
        set((state) => ({ customCourses: [...state.customCourses, course] }));
      },
      removeCourse: (id) => {
        set((state) => ({ customCourses: state.customCourses.filter((c) => c.id !== id) }));
      },

      addQuestion: (question) => {
        set((state) => ({ customQuestions: [...state.customQuestions, question] }));
      },
      removeQuestion: (id) => {
        set((state) => ({ customQuestions: state.customQuestions.filter((q) => q.id !== id) }));
      },

      addProduct: (product) => {
        set((state) => ({ customProducts: [...state.customProducts, product] }));
      },
      removeProduct: (id) => {
        set((state) => ({ customProducts: state.customProducts.filter((p) => p.id !== id) }));
      },

      addGameRound: (gameKey, round) => {
        set((state) => ({
          customGameRounds: {
            ...state.customGameRounds,
            [gameKey]: [...(state.customGameRounds[gameKey] || []), round],
          },
        }));
      },
      removeGameRound: (gameKey, roundId) => {
        set((state) => ({
          customGameRounds: {
            ...state.customGameRounds,
            [gameKey]: (state.customGameRounds[gameKey] || []).filter((r) => r.id !== roundId),
          },
        }));
      },

      addHackathon: (hackathon) => {
        set((state) => ({ customHackathons: [...state.customHackathons, hackathon] }));
      },
      removeHackathon: (id) => {
        set((state) => ({ customHackathons: state.customHackathons.filter((h) => h.id !== id) }));
      },
    }),
    { name: "codeacademy-admin-content" }
  )
);
