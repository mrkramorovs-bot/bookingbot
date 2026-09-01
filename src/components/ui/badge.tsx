import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "flame" | "dark";

const tones: Record<Tone, string> = {
  neutral: "bg-steel-100 text-steel-700",
  brand: "bg-brand-50 text-brand-700",
  flame: "bg-flame-100 text-flame-600",
  dark: "bg-white/10 text-white",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
