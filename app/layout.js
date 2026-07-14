import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToasterProvider from "@/components/ui/ToasterProvider";
import AiAssistantMount from "@/components/layout/AiAssistantMount";

export const metadata = {
  title: "codeacademy — Dasturlashni o'ynab o'rganing",
  description:
    "Interaktiv prezentatsiyali kurslar, mini o'yinlar, quiz va testlar orqali frontend, backend, mobile va AI yo'nalishlarini o'rganing.",
  keywords: ["dasturlash", "kurslar", "frontend", "backend", "javascript", "react", "python"],
};

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var raw = localStorage.getItem('codeacademy-theme');
    var theme = 'dark';
    if (raw) {
      var parsed = JSON.parse(raw);
      theme = (parsed && parsed.state && parsed.state.theme) || 'dark';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="uz"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToasterProvider />
        <AiAssistantMount />
      </body>
    </html>
  );
}
