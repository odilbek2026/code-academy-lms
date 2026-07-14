"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary:
    "bg-accent text-white hover:opacity-90 shadow-[0_8px_24px_-8px_var(--accent)]",
  secondary:
    "bg-surface-2 text-foreground border border-border hover:border-accent/50",
  ghost: "bg-transparent text-foreground hover:bg-surface-2",
  outline: "bg-transparent border border-border text-foreground hover:bg-surface-2",
};

const SIZES = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  icon: Icon,
  iconPosition = "left",
  type = "button",
  disabled = false,
  onClick,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={17} strokeWidth={2} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={17} strokeWidth={2} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
