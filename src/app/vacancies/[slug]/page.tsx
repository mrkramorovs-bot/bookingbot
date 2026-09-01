import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { VacancyApplyForm } from "@/components/forms/presets";
import { JsonLd } from "@/components/json-ld";
import { VacancyCard } from "@/components/vacancy-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { company } from "@/content/company";
import { getProfession } from "@/content/professions";
import { getVacancy, vacancies } from "@/content/vacancies";
import { breadcrumbSchema, jobPostingSchema } from "@/lib/seo";
import { formatDate, formatSalary } from "@/lib/utils";

export function generateStaticParams() {
  return vacancies.map((vacancy) => ({ slug: vacancy.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/vacancies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = getVacancy(slug);
  if (!vacancy) return {};

  const salary = formatSalary(vacancy.salaryFrom, vacancy.salaryTo);
  return {
    title: `${vacancy.title} — вахта ${vacancy.shift}, ${vacancy.city}`,
    description: `${vacancy.title}: ${salary} в месяц, вахта ${vacancy.shift}, ${vacancy.city} (${vacancy.region}). ${vacancy.summary}`,
    alternates: { canonical: `/vacancies/${vacancy.slug}` },
    openGraph: {
      title: `${vacancy.title} — ${salary}`,
      description: vacancy.summary,
      url: `/vacancies/${vacancy.slug}`,
    },
  };
}

const blocks = [
  { key: "responsibilities", title: "Обязанности" },
  { key: "requirements", title: "Требования" },
  { key: "conditions", title: "Условия" },
] as const;

export default async function VacancyPage({ params }: PageProps<"/vacancies/[slug]">) {
  const { slug } = await params;
  const vacancy = getVacancy(slug);

  if (!vacancy) notFound();

  const profession = getProfession(vacancy.professionSlug);
  const similar = vacancies
    .filter((item) => item.slug !== vacancy.slug && item.region === vacancy.region)
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 bg-glow">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <Container className="relative py-12 sm:py-16">
          <nav aria-label="Хлебные крошки" className="mb-6 text-sm text-steel-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Главная
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/vacancies" className="hover:text-white">
                  Вакансии
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-steel-300">{vacancy.title}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                {vacancy.urgent ? <Badge tone="flame">Срочный набор</Badge> : null}
                <Badge tone="dark">Вахта {vacancy.shift}</Badge>
                <Badge tone="dark">{vacancy.experience}</Badge>
              </div>
              <h1 className="mt-5 font-display text-3xl leading-tight font-extrabold text-balance text-white sm:text-4xl lg:text-5xl">
                {vacancy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-steel-300">
                {vacancy.summary}
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-7">
              <p className="text-sm text-steel-400">Заработная плата</p>
              <p className="mt-1 font-display text-3xl font-extrabold text-white">
                {formatSalary(vacancy.salaryFrom, vacancy.salaryTo)}
              </p>
              <p className="text-sm text-steel-400">на руки, за вахтовый месяц</p>
              <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-steel-400">Объект</dt>
                  <dd className="text-right font-medium text-white">{vacancy.objectType}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-steel-400">Локация</dt>
                  <dd className="text-right font-medium text-white">
                    {vacancy.city}, {vacancy.region}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-steel-400">График</dt>
                  <dd className="text-right font-medium text-white">Вахта {vacancy.shift}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-steel-400">Опубликовано</dt>
                  <dd className="text-right font-medium text-white">
                    {formatDate(vacancy.publishedAt)}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-2">
                <ButtonLink href="#apply" variant="flame" size="lg">
                  Откликнуться
                </ButtonLink>
                <ButtonLink href={company.hrPhone.href} variant="onDark" size="lg">
                  {company.hrPhone.display}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="space-y-10">
              {blocks.map((block) => (
                <div key={block.key}>
                  <h2 className="font-display text-2xl font-bold text-ink-900">{block.title}</h2>
                  <ul className="mt-4 space-y-3">
                    {vacancy[block.key].map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-steel-700">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {profession ? (
                <div className="rounded-2xl bg-steel-50 p-7">
                  <h2 className="font-display text-lg font-bold text-ink-900">
                    Что обычно требуется по специальности «{profession.title}»
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {profession.qualifications.map((item) => (
                      <li key={item}>
                        <Badge>{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div
              id="apply"
              className="rounded-2xl border border-steel-200 bg-white p-7 shadow-card lg:sticky lg:top-32"
            >
              <h2 className="font-display text-xl font-bold text-ink-900">Откликнуться на вакансию</h2>
              <p className="mt-2 text-sm text-steel-600">
                Заполните два поля — остальное уточним по телефону.
              </p>
              <div className="mt-6">
                <VacancyApplyForm slug={vacancy.slug} title={vacancy.title} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {similar.length > 0 ? (
        <Section className="bg-steel-50">
          <Container>
            <h2 className="font-display text-2xl font-bold text-ink-900">
              Похожие вакансии в регионе {vacancy.region}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {similar.map((item) => (
                <VacancyCard key={item.slug} vacancy={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <JsonLd data={jobPostingSchema(vacancy)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Вакансии", url: "/vacancies" },
          { name: vacancy.title, url: `/vacancies/${vacancy.slug}` },
        ])}
      />
    </>
  );
}
