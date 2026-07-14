"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useHackathonStore = create(
  persist(
    (set, get) => ({
      // { [hackathonId]: [{ userId, teamName, registeredAt }] }
      registrations: {},

      register: (hackathonId, userId, teamName) => {
        const list = get().registrations[hackathonId] || [];
        if (list.some((r) => r.userId === userId)) return false;
        set((state) => ({
          registrations: {
            ...state.registrations,
            [hackathonId]: [...list, { userId, teamName, registeredAt: new Date().toISOString() }],
          },
        }));
        return true;
      },

      isRegistered: (hackathonId, userId) => {
        return (get().registrations[hackathonId] || []).some((r) => r.userId === userId);
      },

      getParticipantCount: (hackathonId) => {
        return (get().registrations[hackathonId] || []).length;
      },
    }),
    { name: "codeacademy-hackathons" }
  )
);
