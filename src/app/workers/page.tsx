import type { Metadata } from "next";

import { Faq } from "@/components/faq";
import { WorkerForm } from "@/components/forms/presets";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { VacancyCard } from "@/components/vacancy-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { company } from "@/content/company";
import { workerFaq } from "@/content/faq";
import { workerSteps } from "@/content/services";
import { vacancies } from "@/content/vacancies";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Работа вахтой: как мы трудоустраиваем",
  description:
    "Оформление по ТК РФ, выплаты два раза в месяц, проезд, проживание и питание за счёт компании. Пошагово о трудоустройстве на вахту и ответы на частые вопросы.",
  alternates: { canonical: "/workers" },
};

const documents = [
  "Паспорт гражданина РФ",
  "СНИЛС и ИНН",
  "Трудовая книжка или сведения о трудовой деятельности",
  "Документы об образовании и удостоверения по профессии",
  "Действующие аттестации и допуски (НАКС, НК, электробезопасность, высота)",
  "Результаты медицинского осмотра",
];

const promises = [
  {
    title: "Договор до выезда",
    text: "Условия оплаты и график вахты зафиксированы в трудовом договоре, который вы подписываете до отъезда на объект.",
  },
  {
    title: "Деньги дважды в месяц",
    text: "Аванс и расчёт на карту, с расчётным листком. Без «выплатим после сдачи объекта» и удержаний неизвестного происхождения.",
  },
  {
    title: "Дорога и быт за наш счёт",
    text: "Билеты, заселение в вахтовый посёлок или общежитие, питание и спецодежда обеспечиваются компанией.",
  },
  {
    title: "Куратор на связи",
    text: "У каждой бригады есть куратор. Вопросы по оплате, быту и охране труда решаем мы, а не заказчик.",
  },
];

export default function WorkersPage() {
  return (
    <>
      <PageHero
        eyebrow="Соискателям"
        title="Работа вахтой на промышленных объектах"
        description="Мы официальный работодатель: оформляем по ТК РФ, платим два раза в месяц и полностью берём на себя дорогу, проживание и обеспечение на объекте."
        actions={
          <>
            <ButtonLink href="/vacancies" variant="flame" size="lg">
              Открытые вакансии
            </ButtonLink>
            <ButtonLink href="#anketa" variant="onDark" size="lg">
              Оставить анкету
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Что вы получаете"
            title="Условия, которые не меняются по приезде"
            description="Мы работаем на повторный выход: человек, которого один раз обманули, второй раз на вахту не поедет."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((item) => (
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
          <SectionHeading
            eyebrow="Порядок действий"
            title="От отклика до первой вахты"
            description="Обычно от заявки до выезда на объект проходит от одной до двух недель — большую часть времени занимает медкомиссия."
          />
          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {workerSteps.map((step, index) => (
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

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Документы"
                title="Что подготовить заранее"
                description="Чем полнее пакет документов, тем быстрее выход на объект. Медкомиссию оплачиваем и организуем мы."
              />
              <ul className="mt-8 space-y-3">
                {documents.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-steel-700">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="m5 13 4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl bg-steel-50 p-6">
                <p className="text-sm leading-relaxed text-steel-600">
                  Нет части документов или истекли допуски? Всё равно оставляйте анкету — часть
                  аттестаций можно продлить за счёт компании, а на позиции без квалификации берём
                  без опыта.
                </p>
                <p className="mt-4 font-display text-lg font-bold text-ink-900">
                  Отдел кадров:{" "}
                  <a href={company.hrPhone.href} className="text-brand-600">
                    {company.hrPhone.display}
                  </a>
                </p>
              </div>
            </div>

            <div id="anketa" className="rounded-2xl border border-steel-200 bg-white p-7 shadow-card sm:p-9">
              <h2 className="font-display text-2xl font-bold text-ink-900">Анкета соискателя</h2>
              <p className="mt-2 text-steel-600">
                Заполните анкету — подберём объект под вашу специальность и опыт.
              </p>
              <div className="mt-7">
                <WorkerForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-steel-50" id="faq">
        <Container>
          <SectionHeading
            eyebrow="Вопросы и ответы"
            title="Что чаще всего спрашивают о вахте"
          />
          <div className="mt-10">
            <Faq items={workerFaq} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Набор идёт" title="Вакансии с ближайшим выездом" />
            <ButtonLink href="/vacancies" variant="outline">
              Все вакансии
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {vacancies
              .filter((vacancy) => vacancy.urgent)
              .slice(0, 3)
              .map((vacancy) => (
                <VacancyCard key={vacancy.slug} vacancy={vacancy} />
              ))}
          </div>
        </Container>
      </Section>

      <JsonLd data={faqSchema(workerFaq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Соискателям", url: "/workers" },
        ])}
      />
    </>
  );
}
