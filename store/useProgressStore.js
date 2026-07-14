"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Struktura: { [userKey]: { [courseId]: { completedLessonIds: string[], lastLessonId: string, startedAt } } }
// userKey — autentifikatsiyalangan foydalanuvchi id'si, yoki mehmon uchun "guest".
// Bu qatlam keyinchalik backend (MongoDB/Firebase) bilan almashtirilganda faqat
// shu store ichidagi funksiyalar yangilanadi — qolgan UI o'zgarmaydi.

export const useProgressStore = create(
  persist(
    (set, get) => ({
      progress: {},

      startCourse: (userKey, courseId, firstLessonId) => {
        set((state) => {
          const userProgress = state.progress[userKey] || {};
          if (userProgress[courseId]) return state;
          return {
            progress: {
              ...state.progress,
              [userKey]: {
                ...userProgress,
                [courseId]: {
                  completedLessonIds: [],
                  lastLessonId: firstLessonId,
                  startedAt: new Date().toISOString(),
                },
              },
            },
          };
        });
      },

      completeLesson: (userKey, courseId, lessonId, totalLessons) => {
        set((state) => {
          const userProgress = state.progress[userKey] || {};
          const courseProgress = userProgress[courseId] || {
            completedLessonIds: [],
            lastLessonId: lessonId,
            startedAt: new Date().toISOString(),
          };
          const alreadyDone = courseProgress.completedLessonIds.includes(lessonId);
          const nextCompletedIds = alreadyDone
            ? courseProgress.completedLessonIds
            : [...courseProgress.completedLessonIds, lessonId];
          const justFinished = totalLessons && nextCompletedIds.length >= totalLessons;

          return {
            progress: {
              ...state.progress,
              [userKey]: {
                ...userProgress,
                [courseId]: {
                  ...courseProgress,
                  completedLessonIds: nextCompletedIds,
                  lastLessonId: lessonId,
                  completedAt: justFinished ? courseProgress.completedAt || new Date().toISOString() : courseProgress.completedAt,
                },
              },
            },
          };
        });
      },

      setLastLesson: (userKey, courseId, lessonId) => {
        set((state) => {
          const userProgress = state.progress[userKey] || {};
          const courseProgress = userProgress[courseId];
          if (!courseProgress) return state;
          return {
            progress: {
              ...state.progress,
              [userKey]: {
                ...userProgress,
                [courseId]: { ...courseProgress, lastLessonId: lessonId },
              },
            },
          };
        });
      },

      getCourseProgress: (userKey, courseId) => {
        return get().progress[userKey]?.[courseId] || null;
      },
    }),
    { name: "codeacademy-progress" }
  )
);
