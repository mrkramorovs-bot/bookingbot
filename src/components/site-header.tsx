"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/vacancies", label: "Вакансии" },
  { href: "/workers", label: "Соискателям" },
  { href: "/services", label: "Заказчикам" },
  { href: "/contractors", label: "Подрядчикам" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);

  // Закрываем мобильное меню при переходе на другую страницу.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-steel-200 bg-white/90 backdrop-blur">
      <div className="hidden border-b border-steel-100 bg-steel-50 py-2 text-xs text-steel-600 lg:block">
        <Container className="flex items-center justify-between">
          <span>{company.workingHours}</span>
          <span className="flex items-center gap-5">
            <a href={company.messengers.telegram} className="hover:text-brand-600" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            <a href={company.messengers.whatsapp} className="hover:text-brand-600" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${company.email.general}`} className="hover:text-brand-600">
              {company.email.general}
            </a>
          </span>
        </Container>
      </div>

      <Container className="flex h-18 items-center justify-between gap-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-brand-50 text-brand-700" : "text-steel-700 hover:text-brand-600",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={company.phone.href}
            className="hidden font-display text-base font-bold text-ink-900 hover:text-brand-600 sm:block"
          >
            {company.phone.display}
          </a>
          <ButtonLink href="/contacts#request" variant="flame" className="hidden sm:inline-flex">
            Оставить заявку
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-steel-200 text-ink-900 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-steel-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-base font-medium text-ink-900 hover:bg-steel-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <ButtonLink href={company.phone.href} variant="outline" size="lg">
                {company.phone.display}
              </ButtonLink>
              <ButtonLink href="/contacts#request" variant="flame" size="lg">
                Оставить заявку
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
