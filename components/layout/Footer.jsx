import Link from "next/link";
import { Send, MessageCircle, Globe } from "lucide-react";
import Logo from "@/components/ui/Logo";

const COLUMNS = [
  {
    title: "Platforma",
    links: [
      { label: "Kurslar", href: "/courses" },
      { label: "O'yinlar", href: "/games" },
      { label: "Quiz", href: "/quiz" },
      { label: "Test", href: "/tests" },
    ],
  },
  {
    title: "Jamiyat",
    links: [
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Coin Shop", href: "/shop" },
      { label: "Referral", href: "/referral" },
    ],
  },
  {
    title: "Kompaniya",
    links: [
      { label: "Biz haqimizda", href: "/about" },
      { label: "Aloqa", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Huquqiy",
    links: [
      { label: "Maxfiylik siyosati", href: "/privacy" },
      { label: "Foydalanish shartlari", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Zamonaviy dasturlashni o'ynab, sinab va amaliyot qilib o'rganadigan platforma.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Send, MessageCircle, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-semibold text-foreground">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">© {new Date().getFullYear()} codeacademy. Barcha huquqlar himoyalangan.</p>
          <p className="text-xs text-muted">Yasalgan 💜 O'zbekistonda</p>
        </div>
      </div>
    </footer>
  );
}
