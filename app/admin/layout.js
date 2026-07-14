"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Button from "@/components/ui/Button";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Zustand persist localStorage'dan hydrate bo'lishi uchun bir tikni kutamiz,
    // aks holda sahifa yuklangan zahoti noto'g'ri "ruxsat yo'q" holati chaqadi.
    const t = setTimeout(() => setChecked(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!checked) return <div className="min-h-[calc(100dvh-72px)]" />;

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <section className="flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center px-5 py-28 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-2 text-red-500">
          <ShieldAlert size={26} />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Ruxsat yo'q</h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Admin panelga faqat administrator huquqiga ega foydalanuvchilar kira oladi.
        </p>
        <p className="mt-1 text-xs text-muted">
          Demo uchun: <span className="font-mono text-accent-2">admin@codeacademy.uz</span> /{" "}
          <span className="font-mono text-accent-2">admin123</span>
        </p>
        <Button href="/login" variant="primary" className="mt-8">
          Tizimga kirish
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
      <div className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">Admin panel</p>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">Boshqaruv paneli</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <AdminSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
