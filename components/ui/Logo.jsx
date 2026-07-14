import Link from "next/link";
import { Braces } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`group flex items-center gap-2 shrink-0 ${className}`}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:rotate-[-8deg]">
        <Braces size={17} strokeWidth={2.4} />
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
        code<span className="text-gradient">academy</span>
      </span>
    </Link>
  );
}
