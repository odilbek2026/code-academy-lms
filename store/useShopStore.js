"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS } from "@/lib/shopData";

const INITIAL_STOCK = Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock]));

export const useShopStore = create(
  persist(
    (set, get) => ({
      stock: INITIAL_STOCK,
      historyByUser: {},
      customProducts: [],

      getStock: (productId) => {
        const s = get().stock[productId];
        return s === undefined ? 0 : s;
      },

      addProduct: (product) => {
        set((state) => ({
          customProducts: [...state.customProducts, product],
          stock: { ...state.stock, [product.id]: product.stock },
        }));
      },

      removeProduct: (id) => {
        set((state) => ({
          customProducts: state.customProducts.filter((p) => p.id !== id),
        }));
      },

      // true qaytsa — sotib olish muvaffaqiyatli, false — mahsulot tugagan
      purchase: (userId, product) => {
        const currentStock = get().stock[product.id] ?? 0;
        if (currentStock <= 0) return false;

        set((state) => ({
          stock: { ...state.stock, [product.id]: currentStock - 1 },
          historyByUser: {
            ...state.historyByUser,
            [userId]: [
              {
                productId: product.id,
                name: product.name,
                coin: product.coin,
                date: new Date().toISOString(),
              },
              ...(state.historyByUser[userId] || []),
            ],
          },
        }));
        return true;
      },
    }),
    { name: "codeacademy-shop" }
  )
);
