"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Coins, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { PRODUCTS } from "@/lib/shopData";
import { EMPTY_ARRAY } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useShopStore } from "@/store/useShopStore";
import ProductCard from "@/components/shop/ProductCard";
import InsufficientCoinsModal from "@/components/shop/InsufficientCoinsModal";
import { useRouter } from "next/navigation";

export default function ShopPage() {
  const router = useRouter();
  const { user, isAuthenticated, spendCoins, rewardUser } = useAuthStore();
  const stockMap = useShopStore((s) => s.stock);
  const purchase = useShopStore((s) => s.purchase);
  const customProducts = useShopStore((s) => s.customProducts);
  const history = useShopStore((s) => s.historyByUser[user?.id] || EMPTY_ARRAY);
  const allProducts = [...PRODUCTS, ...customProducts];
  const [modalProduct, setModalProduct] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  function handleBuy(product) {
    if (!isAuthenticated) {
      toast.error("Sotib olish uchun avval tizimga kiring.");
      router.push("/login");
      return;
    }
    if (user.coin < product.coin) {
      setModalProduct(product);
      return;
    }
    const ok = spendCoins(product.coin);
    if (!ok) {
      setModalProduct(product);
      return;
    }
    const purchased = purchase(user.id, product);
    if (purchased) {
      toast.success(`${product.name} sotib olindi!`);
    } else {
      // Zaxira tugab qolgan (masalan bir vaqtda boshqa oynada sotib olingan) —
      // coin qaytariladi, foydalanuvchi bekorga yutqazmaydi.
      rewardUser({ coin: product.coin, xp: 0 });
      toast.error("Afsuski, mahsulot zaxirasi tugadi. Coiningiz qaytarildi.");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-32 lg:px-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <ShoppingBag size={22} />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Coin Shop</h1>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Test, Quiz va O'yinlardan to'plagan coinlaringizga texnika va kurs kuponlarini soting oling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-2.5">
              <Coins size={16} className="text-accent-2" />
              <span className="font-display text-lg font-bold text-foreground">{user.coin}</span>
            </div>
          )}
          <button
            onClick={() => setShowHistory((v) => !v)}
            className="flex items-center gap-1.5 rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <Clock size={15} /> Tarix
          </button>
        </div>
      </div>

      {showHistory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-8 overflow-hidden rounded-2xl border border-border bg-surface p-5"
        >
          <p className="mb-3 text-sm font-semibold text-foreground">Xaridlar tarixi</p>
          {history.length === 0 ? (
            <p className="text-sm text-muted">Hali hech narsa sotib olinmagan.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {history.map((h, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{h.name}</span>
                  <span className="flex items-center gap-1 text-muted">
                    <Coins size={12} className="text-accent-2" /> {h.coin} —{" "}
                    {new Date(h.date).toLocaleDateString("uz-UZ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {allProducts.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            stock={stockMap[product.id] ?? product.stock}
            index={i}
            onBuy={() => handleBuy(product)}
          />
        ))}
      </div>

      <InsufficientCoinsModal
        open={Boolean(modalProduct)}
        onClose={() => setModalProduct(null)}
        needed={modalProduct?.coin || 0}
        have={user?.coin || 0}
      />
    </section>
  );
}
