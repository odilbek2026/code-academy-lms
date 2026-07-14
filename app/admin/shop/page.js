"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Package } from "lucide-react";
import toast from "react-hot-toast";
import { PRODUCTS } from "@/lib/shopData";
import { useShopStore } from "@/store/useShopStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const COLORS = ["#6366F1", "#22C55E", "#F5A623", "#EC4899", "#0EA5E9", "#EF4444"];

export default function AdminShopPage() {
  const { customProducts, addProduct, removeProduct } = useShopStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", coin: 1000, stock: 10, color: COLORS[0] });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) {
      toast.error("Nomi va tavsifni to'ldiring.");
      return;
    }
    addProduct({
      id: `admin_product_${Date.now()}`,
      name: form.name,
      description: form.description,
      coin: Number(form.coin),
      stock: Number(form.stock),
      color: form.color,
    });
    toast.success("Mahsulot qo'shildi!");
    setForm({ name: "", description: "", coin: 1000, stock: 10, color: COLORS[0] });
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">
          Statik: {PRODUCTS.length} ta · Admin qo'shgan: {customProducts.length} ta
        </p>
        <Button size="sm" icon={Plus} onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Bekor qilish" : "Mahsulot qo'shish"}
        </Button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-5"
        >
          <Input label="Mahsulot nomi" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="masalan, Grafik planshet" />

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">Tavsif</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Coin narxi" type="number" min={1} value={form.coin} onChange={(e) => setForm({ ...form, coin: e.target.value })} />
            <Input label="Qolgan soni" type="number" min={0} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">Rang</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm({ ...form, color: c })}
                  className={`h-8 w-8 rounded-full border-2 transition-transform ${form.color === c ? "scale-110 border-foreground" : "border-transparent"}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full justify-center">
            Mahsulotni saqlash
          </Button>
        </motion.form>
      )}

      <div className="flex flex-col gap-2">
        {customProducts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted">
            Hali admin tomonidan mahsulot qo'shilmagan.
          </p>
        ) : (
          customProducts.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${p.color}1A`, color: p.color }}>
                  <Package size={15} />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted">
                    {p.coin.toLocaleString("uz-UZ")} coin · {p.stock} dona
                  </p>
                </div>
              </div>
              <button onClick={() => removeProduct(p.id)} className="text-red-500 hover:opacity-70">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
