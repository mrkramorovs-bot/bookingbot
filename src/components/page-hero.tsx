import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 bg-glow">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {eyebrow ? (
              <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-flame-400 uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-display text-4xl leading-[1.1] font-extrabold text-balance text-white sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <div className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-300">
                {description}
              </div>
            ) : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
