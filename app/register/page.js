"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/profile");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await registerUser(data);
      toast.success(`Xush kelibsiz, ${user.username}! 100 bonus coin qo'shildi.`);
      router.push("/profile");
    } catch (err) {
      toast.error(err.message || "Ro'yxatdan o'tishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <div className="min-h-[calc(100dvh-72px)]" />;
  }

  return (
    <section className="flex min-h-[calc(100dvh-72px)] items-center justify-center px-5 py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground">
            Hisob yarating
          </h1>
          <p className="mt-1.5 text-sm text-muted">Bepul ro'yxatdan o'ting va 100 bonus coin oling.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
          <Input
            label="Foydalanuvchi nomi"
            icon={User}
            placeholder="dasturchi_007"
            error={errors.username?.message}
            {...register("username", {
              required: "Foydalanuvchi nomini kiriting.",
              minLength: { value: 3, message: "Kamida 3 belgi bo'lsin." },
            })}
          />
          <Input
            label="Email"
            type="email"
            icon={Mail}
            placeholder="siz@example.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email kiritish shart.",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Email formati noto'g'ri." },
            })}
          />
          <Input
            label="Parol"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
              required: "Parol kiritish shart.",
              minLength: { value: 6, message: "Parol kamida 6 belgidan iborat bo'lsin." },
            })}
          />
          <Input
            label="Parolni tasdiqlang"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Parolni tasdiqlang.",
              validate: (value) => value === password || "Parollar mos kelmadi.",
            })}
          />

          <Button type="submit" variant="primary" size="md" icon={UserPlus} disabled={loading} className="mt-2 w-full">
            {loading ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Hisobingiz bormi?{" "}
          <Link href="/login" className="font-medium text-accent hover:underline">
            Kirish
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
