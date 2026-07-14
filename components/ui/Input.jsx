"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = forwardRef(function Input(
  { label, error, type = "text", icon: Icon, className, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[13px] font-medium text-foreground">{label}</label>}
      <div className="relative">
        {Icon && (
          <Icon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        )}
        <input
          ref={ref}
          type={inputType}
          className={cn(
            "w-full rounded-xl border border-border bg-surface-2 py-2.5 text-[14px] text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent",
            Icon ? "pl-10" : "pl-3.5",
            isPassword ? "pr-10" : "pr-3.5",
            error && "border-red-500/60 focus:border-red-500",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
