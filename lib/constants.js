import {
  Home,
  BookOpen,
  Gamepad2,
  Brain,
  ListChecks,
  ShoppingBag,
  Trophy,
  User,
  BarChart3,
  Award,
  Mail,
  Rocket,
  Crown,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Bosh sahifa", href: "/", icon: Home },
  { label: "Kurslar", href: "/courses", icon: BookOpen },
  { label: "O'yinlar", href: "/games", icon: Gamepad2 },
  { label: "Quiz", href: "/quiz", icon: Brain },
  { label: "Test", href: "/tests", icon: ListChecks },
  { label: "Hackathon", href: "/hackathons", icon: Rocket },
  { label: "Coin Shop", href: "/shop", icon: ShoppingBag },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

export const PROFILE_LINKS = [
  { label: "Profil", href: "/profile", icon: User },
  { label: "Premium", href: "/premium", icon: Crown },
  { label: "Statistika", href: "/profile/stats", icon: BarChart3 },
  { label: "Sertifikat", href: "/profile/certificates", icon: Award },
  { label: "Aloqa", href: "/contact", icon: Mail },
];

export const SITE_STATS = [
  { label: "O'quvchilar", value: 48200, suffix: "+" },
  { label: "Kurslar", value: 15, suffix: "+" },
  { label: "Testlar", value: 9, suffix: "+" },
  { label: "Quiz savollari", value: 83, suffix: "+" },
  { label: "O'yinlar", value: 13, suffix: "" },
];

export const CATEGORIES = [
  { id: "frontend", name: "Frontend", desc: "UI qurish san'ati", color: "#6366F1" },
  { id: "backend", name: "Backend", desc: "Server va API'lar", color: "#22C55E" },
  { id: "mobile", name: "Mobile", desc: "iOS va Android", color: "#F5A623" },
  { id: "ai", name: "AI", desc: "Sun'iy intellekt", color: "#EC4899" },
  { id: "python", name: "Python", desc: "Umumiy dasturlash", color: "#3B82F6" },
  { id: "javascript", name: "JavaScript", desc: "Web tili", color: "#EAB308" },
  { id: "react", name: "React", desc: "Interfeys kutubxonasi", color: "#38BDF8" },
  { id: "nextjs", name: "Next.js", desc: "React freymvorki", color: "#A1A1AA" },
  { id: "nodejs", name: "Node.js", desc: "Server muhiti", color: "#22C55E" },
  { id: "html", name: "HTML", desc: "Sahifa tuzilishi", color: "#F97316" },
  { id: "css", name: "CSS", desc: "Uslub va dizayn", color: "#0EA5E9" },
  { id: "git", name: "Git", desc: "Versiyalarni boshqarish", color: "#F43F5E" },
  { id: "github", name: "GitHub", desc: "Kod hamkorligi", color: "#94A3B8" },
  { id: "database", name: "Database", desc: "Ma'lumotlar bazasi", color: "#8B5CF6" },
  { id: "cybersecurity", name: "Cyber Security", desc: "Xavfsizlik asoslari", color: "#EF4444" },
];
