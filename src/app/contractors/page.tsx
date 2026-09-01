import type { Metadata } from "next";

import { ContractorForm } from "@/components/forms/presets";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { company } from "@/content/company";
import { contractorBenefits, contractorRequirements } from "@/content/services";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Подрядчикам и бригадам: сотрудничество",
  description:
    "Ищем субподрядчиков и бригады на объекты в ХМАО, ЯНАО, Якутии и Поволжье. Прозрачные ставки, помощь с мобилизацией, приоритет проверенным партнёрам. Анкета подрядчика онлайн.",
  alternates: { canonical: "/contractors" },
};

const workTypes = [
  "Сварочно-монтажные работы на трубопроводах",
  "Монтаж металлоконструкций и технологического оборудования",
  "Электромонтаж и КИПиА",
  "Тепловая и антикоррозионная изоляция",
  "Монолитные и общестроительные работы",
  "Неразрушающий контроль сварных соединений",
];

const steps = [
  {
    title: "Анкета",
    text: "Заполняете форму: виды работ, численность, регионы, опыт на промышленных объектах.",
  },
  {
    title: "Аккредитация",
    text: "Проверяем документы компании, удостоверения персонала и опыт по профилю работ.",
  },
  {
    title: "Предложение по объёмам",
    text: "Показываем актуальные объекты, согласовываем ставки и порядок расчётов.",
  },
  {
    title: "Договор и выход",
    text: "Заключаем договор, помогаем с пропусками, мобилизацией и заселением бригады.",
  },
];

export default function ContractorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Партнёрам"
        title="Подрядчикам и бригадам"
        description="Передаём объёмы работ проверенным бригадам и субподрядным организациям на объектах нефтегазового строительства и промышленности."
        actions={
          <>
            <ButtonLink href="#anketa" variant="flame" size="lg">
              Заполнить анкету
            </ButtonLink>
            <ButtonLink href="tel:+78000000002" variant="onDark" size="lg">
              Партнёрское направление
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Условия"
            title="Что вы получаете как партнёр"
            description="Работаем с бригадами от 5 человек и с субподрядными организациями любого размера."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contractorBenefits.map((item) => (
              <div key={item.title} className="rounded-2xl border border-steel-200 p-7">
                <h3 className="font-display text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-steel-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Направления" title="Какие работы передаём" />
              <ul className="mt-8 space-y-3">
                {workTypes.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-steel-700">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Требования" title="Кого мы аккредитуем" />
              <ul className="mt-8 space-y-3">
                {contractorRequirements.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-steel-700">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Процесс" title="Как начать сотрудничество" />
          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-steel-300 pt-6">
                <span className="font-display text-sm font-bold text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink-900">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-steel-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-steel-50" id="anketa">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Анкета"
                title="Расскажите о своей бригаде"
                description="Рассмотрим анкету и вернёмся с текущими объёмами по вашему профилю работ."
              />
              <div className="mt-8 rounded-2xl border border-steel-200 bg-white p-6">
                <p className="text-sm text-steel-600">Партнёрское направление</p>
                <a href="tel:+78000000002" className="mt-1 block font-display text-xl font-bold text-ink-900">
                  +7 (800) 000-00-02
                </a>
                <a href={`mailto:partner@alfa-gaz.ru`} className="mt-1 block text-brand-600">
                  partner@alfa-gaz.ru
                </a>
                <p className="mt-4 text-sm text-steel-500">{company.workingHours}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-steel-200 bg-white p-7 shadow-card sm:p-9">
              <ContractorForm />
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Подрядчикам", url: "/contractors" },
        ])}
      />
    </>
  );
}
