import type { Metadata } from "next";
import Link from "next/link";

import { Faq } from "@/components/faq";
import { CustomerForm } from "@/components/forms/presets";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { projectCases } from "@/content/cases";
import { company } from "@/content/company";
import { customerFaq } from "@/content/faq";
import { customerSteps, services } from "@/content/services";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Аутстаффинг и подбор персонала для заказчиков",
  description:
    "Предоставление рабочих и ИТР на промышленные и нефтегазовые объекты: аутстаффинг, подбор под проект, вахтовые бригады «под ключ», кадровое администрирование. Мобилизация от 5 дней.",
  alternates: { canonical: "/services" },
};

const problems = [
  {
    problem: "Не хватает людей под график производства работ",
    solution: "Закрываем потребность из собственной базы, первая бригада выходит от 5 дней.",
  },
  {
    problem: "Головная компания ограничила численность штата",
    solution: "Персонал остаётся в нашем штате — ваша численность не растёт.",
  },
  {
    problem: "Кадровая служба не тянет вахтовый учёт",
    solution: "Берём суммированный учёт времени, графики, приказы и отчётность на себя.",
  },
  {
    problem: "Риски по охране труда и допускам",
    solution: "Проверяем аттестации, обучаем, выдаём СИЗ, ведём документацию по ОТ.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Заказчикам"
        title="Персонал на объект без расширения собственного штата"
        description="Предоставляем аттестованных рабочих и ИТР на промышленные и нефтегазовые объекты. Отвечаем за подбор, оформление, охрану труда, вахтовую логистику и замену выбывших."
        actions={
          <>
            <ButtonLink href="#request" variant="flame" size="lg">
              Запросить расчёт
            </ButtonLink>
            <ButtonLink href="/services/staff" variant="onDark" size="lg">
              Кого мы предоставляем
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-2xl border border-white/15 bg-white/5 p-7">
            <p className="font-display text-lg font-bold text-white">Отдел по работе с заказчиками</p>
            <a
              href={company.phone.href}
              className="mt-3 block font-display text-2xl font-extrabold text-flame-400"
            >
              {company.phone.display}
            </a>
            <a href={`mailto:${company.email.sales}`} className="mt-2 block text-steel-300 hover:text-white">
              {company.email.sales}
            </a>
            <p className="mt-4 text-sm text-steel-400">
              Расчёт стоимости человеко-месяца и срок мобилизации — в течение рабочего дня.
            </p>
          </div>
        }
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Задачи"
            title="С чем к нам приходят"
            description="Мы работаем там, где собственный найм не успевает или невозможен по внутренним ограничениям."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {problems.map((item) => (
              <div key={item.problem} className="rounded-2xl border border-steel-200 p-7">
                <p className="font-display text-lg font-bold text-ink-900">{item.problem}</p>
                <p className="mt-3 flex gap-3 leading-relaxed text-steel-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-steel-50">
        <Container>
          <SectionHeading eyebrow="Услуги" title="Форматы сотрудничества" />
          <div className="mt-12 space-y-6">
            {services.map((service) => (
              <article
                key={service.slug}
                id={service.slug}
                className="grid gap-8 rounded-2xl border border-steel-200 bg-white p-7 lg:grid-cols-[1.3fr_1fr] sm:p-9"
              >
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink-900">{service.title}</h2>
                  <p className="mt-1.5 font-medium text-brand-600">{service.short}</p>
                  <p className="mt-4 leading-relaxed text-steel-600">{service.description}</p>
                  <p className="mt-6 text-sm font-semibold tracking-wide text-steel-500 uppercase">
                    Подходит, если
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {service.suitableFor.map((item) => (
                      <li key={item}>
                        <Badge>{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-steel-50 p-6">
                  <p className="text-sm font-semibold tracking-wide text-steel-500 uppercase">
                    Что входит
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm text-steel-700">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-ink-950 bg-glow">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Процесс"
            title="Как проходит работа"
            description="На каждом этапе понятно, кто что делает и в какой срок."
          />
          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {customerSteps.map((step, index) => (
              <li key={step.title} className="border-t border-white/15 pt-6">
                <span className="font-display text-sm font-bold text-flame-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-steel-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading eyebrow="Вопросы и ответы" title="Что спрашивают заказчики" />
              <div className="mt-8">
                <Faq items={customerFaq} />
              </div>
              <div className="mt-8 rounded-2xl bg-steel-50 p-6">
                <p className="font-display text-lg font-bold text-ink-900">
                  Уже работали на похожих объектах
                </p>
                <ul className="mt-4 space-y-2 text-sm text-steel-600">
                  {projectCases.slice(0, 3).map((item) => (
                    <li key={item.slug}>
                      <Link href={`/cases#${item.slug}`} className="hover:text-brand-600">
                        {item.title} — {item.region}, {item.headcount}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div id="request" className="rounded-2xl border border-steel-200 bg-white p-7 shadow-card sm:p-9">
              <h2 className="font-display text-2xl font-bold text-ink-900">Заявка на подбор персонала</h2>
              <p className="mt-2 text-steel-600">
                Опишите потребность — вернёмся с расчётом стоимости и сроком мобилизации.
              </p>
              <div className="mt-7">
                <CustomerForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={faqSchema(customerFaq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Заказчикам", url: "/services" },
        ])}
      />
    </>
  );
}
