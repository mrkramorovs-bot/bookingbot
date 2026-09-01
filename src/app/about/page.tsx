import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { company, stats } from "@/content/company";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "«Альфа Газ» — аутстаффинговая компания: предоставляем рабочих и ИТР на объекты нефтегазового строительства и промышленности. Официальное оформление, охрана труда, вахтовая логистика.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Честно с людьми",
    text: "Условия в договоре совпадают с тем, что обещали на собеседовании. Это дешевле, чем каждый раз набирать новых.",
  },
  {
    title: "Предсказуемо для заказчика",
    text: "Сроки мобилизации, стоимость человеко-месяца и порядок замены фиксируем в договоре, а не обсуждаем по факту.",
  },
  {
    title: "Без серых схем",
    text: "Полное оформление по ТК РФ, налоги и взносы, закрывающие документы. Отказываемся от задач, которые нельзя провести законно.",
  },
  {
    title: "Безопасность на первом месте",
    text: "Обучение, инструктажи, СИЗ и контроль на объекте. Мы отвечаем за то, чтобы люди возвращались с вахты домой.",
  },
];

const geography = [
  { region: "ЯНАО", note: "Новый Уренгой, Сабетта, Надым, Ямбург" },
  { region: "ХМАО — Югра", note: "Сургут, Нижневартовск, Когалым, Нефтеюганск" },
  { region: "Республика Саха (Якутия)", note: "Ленск, Мирный, Алдан" },
  { region: "Поволжье и Урал", note: "Оренбург, Уфа, Пермь, Самара" },
];

const compliance = [
  "Аккредитация в качестве частного агентства занятости — для схем предоставления труда работников",
  "Обучение по охране труда и промышленной безопасности штатных специалистов",
  "Проверка аттестаций НАКС и системы неразрушающего контроля у персонала",
  "Учёт персональных данных в соответствии с 152-ФЗ, хранение баз на территории РФ",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О компании"
        title={`${company.legalName} — аутстаффинг промышленного персонала`}
        description={`Работаем с ${company.foundedYear} года. Закрываем потребность заказчиков в рабочих и ИТР там, где собственный найм не успевает: удалённые объекты, вахта, сжатые сроки, редкие аттестации.`}
        actions={
          <>
            <ButtonLink href="/cases" variant="flame" size="lg">
              Реализованные проекты
            </ButtonLink>
            <ButtonLink href="/contacts" variant="onDark" size="lg">
              Контакты и реквизиты
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <dl className="grid gap-8 border-b border-steel-200 pb-14 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label}>
                <dt className="font-display text-4xl font-extrabold text-ink-900">{item.value}</dt>
                <dd className="mt-2 font-medium text-steel-700">{item.label}</dd>
                <dd className="mt-1 text-sm text-steel-500">{item.hint}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-5 text-lg leading-relaxed text-steel-700">
              <p>
                Мы выросли из бригад, которые сами работали на северных объектах, поэтому хорошо
                понимаем обе стороны: и то, как срывается график, когда людей не хватает, и то, как
                выглядит вахта изнутри.
              </p>
              <p>
                Сегодня {company.shortName} — это собственная база кандидатов с подтверждёнными
                допусками, штат кадровых специалистов и налаженная вахтовая логистика. Заказчик
                получает людей на объекте, а не обещание найти их когда-нибудь.
              </p>
              <p>
                Мы одинаково внимательно относимся к обеим сторонам: заказчику нужна
                предсказуемость, работнику — честные условия. Одно без другого не работает.
              </p>
            </div>

            <div className="rounded-2xl bg-steel-50 p-7">
              <h2 className="font-display text-lg font-bold text-ink-900">
                Соответствие требованиям
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-steel-600">
                {compliance.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-steel-500">
                Копии свидетельств и разрешительных документов предоставляем по запросу вместе с
                коммерческим предложением.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-steel-50">
        <Container>
          <SectionHeading eyebrow="Принципы" title="Как мы работаем" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {principles.map((item) => (
              <div key={item.title} className="rounded-2xl border border-steel-200 bg-white p-7">
                <h3 className="font-display text-xl font-bold text-ink-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-steel-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="География"
            title="Где работают наши бригады"
            description="Основной объём — Крайний Север и приравненные местности, но мы закрываем потребность и в средней полосе."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {geography.map((item) => (
              <div key={item.region} className="rounded-2xl border border-steel-200 p-7">
                <h3 className="font-display text-lg font-bold text-ink-900">{item.region}</h3>
                <p className="mt-2 text-sm text-steel-600">{item.note}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "О компании", url: "/about" },
        ])}
      />
    </>
  );
}
