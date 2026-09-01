import Link from "next/link";

import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";

const columns = [
  {
    title: "Соискателям",
    links: [
      { href: "/vacancies", label: "Открытые вакансии" },
      { href: "/workers", label: "Как мы работаем" },
      { href: "/workers#faq", label: "Вопросы о вахте" },
      { href: "/workers#anketa", label: "Оставить анкету" },
    ],
  },
  {
    title: "Заказчикам",
    links: [
      { href: "/services", label: "Услуги" },
      { href: "/services/staff", label: "Кого мы предоставляем" },
      { href: "/cases", label: "Реализованные проекты" },
      { href: "/services#request", label: "Заявка на персонал" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/about", label: "О компании" },
      { href: "/contractors", label: "Подрядчикам и бригадам" },
      { href: "/contacts", label: "Контакты" },
      { href: "/privacy", label: "Политика обработки ПДн" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink-950 text-steel-300">
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="dark" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{company.description}</p>
          <div className="mt-6 space-y-1.5 text-sm">
            <a href={company.phone.href} className="block font-display text-xl font-bold text-white">
              {company.phone.display}
            </a>
            <a href={`mailto:${company.email.general}`} className="block hover:text-white">
              {company.email.general}
            </a>
            <p className="text-steel-400">{company.address.full}</p>
          </div>
          <div className="mt-5 flex gap-3">
            <a
              href={company.messengers.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              Telegram
            </a>
            <a
              href={company.messengers.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="font-display text-sm font-bold tracking-wide text-white uppercase">
              {column.title}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-white/10 py-6 text-xs text-steel-400">
        <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. ИНН {company.inn}, ОГРН {company.ogrn}.
          </p>
          <p className="max-w-xl">
            Информация на сайте не является публичной офертой. Условия сотрудничества определяются
            договором.
          </p>
        </Container>
      </div>
    </footer>
  );
}
