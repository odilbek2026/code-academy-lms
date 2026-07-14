"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Brain, Gamepad2, ShoppingBag, Users, Trophy, ArrowLeft } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Umumiy ko'rinish", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Kurslar", icon: BookOpen },
  { href: "/admin/quiz", label: "Quiz / Test savollari", icon: Brain },
  { href: "/admin/games", label: "O'yin raundlari", icon: Gamepad2 },
  { href: "/admin/hackathons", label: "Hackathonlar", icon: Trophy },
  { href: "/admin/shop", label: "Coin Shop", icon: ShoppingBag },
  { href: "/admin/users", label: "Foydalanuvchilar", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-24 lg:h-fit">
      <nav className="flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors ${
                isActive ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          );
        })}
        <div className="my-2 hidden h-px bg-border lg:block" />
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <ArrowLeft size={16} /> Saytga qaytish
        </Link>
      </nav>
    </aside>
  );
}
