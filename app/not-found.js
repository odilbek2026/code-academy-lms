import Link from "next/link";
import { Compass } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center px-5 py-28 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-2 text-accent">
        <Compass size={26} />
      </div>
      <p className="font-mono text-sm text-accent-2">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
        Bu sahifa topilmadi
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        Siz izlayotgan manzil o'chirilgan yoki hech qachon mavjud bo'lmagan bo'lishi mumkin.
      </p>
      <Button href="/" variant="primary" className="mt-8">
        Bosh sahifaga qaytish
      </Button>
    </section>
  );
}
