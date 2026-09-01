import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { projectCases } from "@/content/cases";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Реализованные проекты",
  description:
    "Проекты «Альфа Газ»: объекты, численность персонала, сроки и результат. Установки подготовки газа, компрессорные станции, газоперерабатывающие заводы, обустройство месторождений.",
  alternates: { canonical: "/cases" },
};

const rows = [
  { label: "Заказчик", key: "customer" },
  { label: "Численность", key: "headcount" },
  { label: "Срок работ", key: "duration" },
] as const;

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Проекты"
        title="Объекты, на которых работали наши бригады"
        description="Названия заказчиков раскрываем только с их согласия — по остальным проектам приводим отрасль, объём и результат."
        actions={
          <ButtonLink href="/services#request" variant="flame" size="lg">
            Обсудить свой проект
          </ButtonLink>
        }
      />

      <Section>
        <Container>
          <div className="space-y-8">
            {projectCases.map((item) => (
              <article
                key={item.slug}
                id={item.slug}
                className="scroll-mt-32 rounded-2xl border border-steel-200 bg-white p-7 sm:p-9"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge tone="brand">{item.region}</Badge>
                  <Badge>{item.year}</Badge>
                  <Badge tone="flame">{item.headcount}</Badge>
                </div>

                <h2 className="mt-5 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                  {item.title}
                </h2>

                <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold tracking-wide text-steel-500 uppercase">
                        Задача
                      </p>
                      <p className="mt-2 leading-relaxed text-steel-700">{item.task}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-wide text-steel-500 uppercase">
                        Что сделали
                      </p>
                      <p className="mt-2 leading-relaxed text-steel-700">{item.solution}</p>
                    </div>
                    <div className="rounded-xl bg-brand-50 p-5">
                      <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">
                        Результат
                      </p>
                      <p className="mt-2 leading-relaxed text-ink-900">{item.result}</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-steel-50 p-6">
                    <dl className="space-y-4 text-sm">
                      {rows.map((row) => (
                        <div key={row.key}>
                          <dt className="text-steel-500">{row.label}</dt>
                          <dd className="mt-0.5 font-medium text-ink-900">{item[row.key]}</dd>
                        </div>
                      ))}
                      <div>
                        <dt className="text-steel-500">Персонал</dt>
                        <dd className="mt-2 flex flex-wrap gap-1.5">
                          {item.staff.map((staff) => (
                            <Badge key={staff}>{staff}</Badge>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Похожая задача на вашем объекте?"
        text="Пришлём расчёт стоимости и срок мобилизации по вашему профилю требований."
        primaryHref="/services#request"
        primaryLabel="Запросить расчёт"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Проекты", url: "/cases" },
        ])}
      />
    </>
  );
}
