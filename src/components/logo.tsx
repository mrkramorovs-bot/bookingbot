import Link from "next/link";

import { company } from "@/content/company";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("h-9 w-9", className)}>
      <defs>
        <linearGradient id="alfa-gaz-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a6fe0" />
          <stop offset="100%" stopColor="#0d4596" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#alfa-gaz-mark)" />
      <path d="M12.4 28 20 11.5 27.6 28h-4.1l-3.5-8.2L16.5 28z" fill="#fff" />
      <path
        d="M20 30.5c2.6 0 4.4-1.7 4.4-4 0-2-1.5-3.4-2.4-4.6-.5 1.5-1.3 2-2 2.5.1-1.3-.2-2.6-.9-3.6-1.6 1.6-3.5 3.3-3.5 5.7 0 2.3 1.8 4 4.4 4z"
        fill="#fabc3c"
      />
    </svg>
  );
}

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${company.shortName} — на главную`}
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-extrabold tracking-tight",
            tone === "dark" ? "text-white" : "text-ink-900",
          )}
        >
          {company.brand.first}
          <span className="text-brand-500">{company.brand.second}</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-medium tracking-[0.14em] uppercase",
            tone === "dark" ? "text-steel-400" : "text-steel-500",
          )}
        >
          Аутстаффинг персонала
        </span>
      </span>
    </Link>
  );
}
