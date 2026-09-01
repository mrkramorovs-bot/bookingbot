import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Vacancy } from "@/content/vacancies";
import { formatSalary } from "@/lib/utils";

export function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-steel-200 bg-white p-6 transition-shadow hover:shadow-lift">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {vacancy.urgent ? <Badge tone="flame">Срочный набор</Badge> : null}
        <Badge tone="brand">Вахта {vacancy.shift}</Badge>
        <Badge>{vacancy.region}</Badge>
      </div>

      <h3 className="font-display text-xl font-bold text-ink-900">
        <Link href={`/vacancies/${vacancy.slug}`} className="after:absolute after:inset-0">
          {vacancy.title}
        </Link>
      </h3>

      <p className="mt-2 mb-5 line-clamp-3 text-sm leading-relaxed text-steel-600">
        {vacancy.summary}
      </p>

      <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-steel-100 pt-5 text-sm">
        <div>
          <dt className="text-steel-500">Зарплата</dt>
          <dd className="mt-0.5 font-display font-bold text-ink-900">
            {formatSalary(vacancy.salaryFrom, vacancy.salaryTo)}
          </dd>
        </div>
        <div>
          <dt className="text-steel-500">Объект</dt>
          <dd className="mt-0.5 font-medium text-ink-900">{vacancy.city}</dd>
        </div>
      </dl>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
        Смотреть вакансию
        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </article>
  );
}
