"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Coins, ChevronDown, LogOut, User as UserIcon, BarChart3, Award, ShieldCheck, Sparkles, Crown } from "lucide-react";
import { useAiAssistantStore } from "@/store/useAiAssistantStore";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import PremiumBadge from "@/components/ui/PremiumBadge";
import MobileMenu from "@/components/layout/MobileMenu";
import { NAV_LINKS } from "@/lib/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { isAuthenticated, user, logout, isPremiumActive } = useAuthStore();
  const toggleAssistant = useAiAssistantStore((s) => s.toggle);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "glass border-b border-border py-2.5" : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleAssistant}
              aria-label="AI Yordamchi"
              className="hidden h-9 items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 text-[13px] font-medium text-foreground transition-colors hover:border-accent/50 sm:flex"
            >
              <Sparkles size={14} className="text-accent" /> AI Yordamchi
            </button>
            <ThemeToggle className="hidden sm:flex" />

            {isAuthenticated ? (
              <>
                <div className="hidden items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-[13px] font-semibold text-accent-2 sm:flex">
                  <Coins size={14} />
                  {user.coin}
                </div>
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className={`flex items-center gap-1.5 rounded-full border py-1 pl-1 pr-2.5 transition-colors hover:border-accent/50 ${
                      isPremiumActive() ? "border-accent-2/50" : "border-border"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${
                        isPremiumActive() ? "bg-gradient-to-br from-accent-2 to-yellow-500" : "bg-accent"
                      }`}
                    >
                      {user.username?.[0]?.toUpperCase()}
                    </span>
                    <ChevronDown size={14} className="text-muted" />
                  </button>

                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-xl"
                    >
                      <div className="px-3 py-2.5">
                        <p className="flex items-center gap-1.5 text-sm font-semibold">
                          {user.username}
                          {isPremiumActive() && <PremiumBadge size="sm" showLabel={false} />}
                        </p>
                        <p className="text-xs text-muted">{user.email}</p>
                      </div>
                      <div className="my-1 h-px bg-border" />
                      <Link href="/profile" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-surface-2">
                        <UserIcon size={15} className="text-muted" /> Profil
                      </Link>
                      <Link href="/premium" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-surface-2">
                        <Crown size={15} className="text-accent-2" /> Premium
                      </Link>
                      <Link href="/profile/stats" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-surface-2">
                        <BarChart3 size={15} className="text-muted" /> Statistika
                      </Link>
                      <Link href="/profile/certificates" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-surface-2">
                        <Award size={15} className="text-muted" /> Sertifikat
                      </Link>
                      {user.role === "admin" && (
                        <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-surface-2">
                          <ShieldCheck size={15} className="text-accent-2" /> Admin panel
                        </Link>
                      )}
                      <div className="my-1 h-px bg-border" />
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-500/10"
                      >
                        <LogOut size={15} /> Chiqish
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Button href="/login" variant="ghost" size="sm">
                  Kirish
                </Button>
                <Button href="/register" variant="primary" size="sm">
                  Ro'yxatdan o'tish
                </Button>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menyuni ochish"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border lg:hidden"
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
