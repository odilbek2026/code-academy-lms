"use client";

import { create } from "zustand";

export const useAiAssistantStore = create((set) => ({
  open: false,
  toggle: () => set((s) => ({ open: !s.open })),
  close: () => set({ open: false }),
}));
