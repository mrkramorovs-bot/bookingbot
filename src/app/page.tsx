import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { CustomerForm } from "@/components/forms/presets";
import { VacancyCard } from "@/components/vacancy-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { projectCases } from "@/content/cases";
import { company, stats } from "@/content/company";
import { professionsByCategory } from "@/content/professions";
import { contractorBenefits, customerSteps, services } from "@/content/services";
import { vacancies } from "@/content/vacancies";

const guarantees = [
  {
    title: "Оформление по ТК РФ",
    text: "Трудовой договор с первого дня, полный расчёт налогов и взносов, закрывающие документы для заказчика.",
  },
  {
    title: "Замена за наш счёт",
    text: "Если работник не подошёл или выбыл, меняем в течение 5 рабочих дней без дополнительной оплаты.",
  },
  {
    title: "Проверенные допуски",
    text: "Проверяем удостоверения, аттестации НАКС и НК, группы по электробезопасности до выхода на объект.",
  },
  {
    title: "Охрана труда на нас",
    text: "Инструктажи, обучение, СИЗ и спецодежда, взаимодействие со службой промышленной безопасности заказчика.",
  },
];

export default function HomePage() {
  const featured = vacancies.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 bg-glow">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <Container className="relative py-16 sm:py-24">
          <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <Badge tone="dark">Работаем с 2014 года · ХМАО · ЯНАО · Якутия · Поволжье</Badge>
              <h1 className="mt-6 font-display text-4xl leading-[1.08] font-extrabold text-balance text-white sm:text-5xl lg:text-6xl">
                Рабочие и ИТР на ваш объект — <span className="text-flame-400">без расширения штата</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-300">
                {company.shortName} предоставляет аттестованный персонал для нефтегазовых и
                промышленных объектов. Подбор, оформление по ТК РФ, вахтовая логистика, охрана труда
                и кадровый учёт — на нашей стороне.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.label}>
                    <dt className="font-display text-3xl font-extrabold text-white">{item.value}</dt>
                    <dd className="mt-1.5 text-sm text-steel-300">{item.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid gap-4">
              <Link
                href="/services#request"
                className="group rounded-2xl border border-white/15 bg-white/5 p-7 transition-colors hover:border-flame-400/70 hover:bg-white/10"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-flame-400 uppercase">
                  Заказчикам
                </p>
                <p className="mt-3 font-display text-2xl font-bold text-white">Нужен персонал</p>
                <p className="mt-2 text-steel-300">
                  Рассчитаем стоимость и назовём срок мобилизации. Первая бригада — от 5 дней.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Оставить заявку
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/vacancies"
                className="group rounded-2xl border border-white/15 bg-white/5 p-7 transition-colors hover:border-brand-400/70 hover:bg-white/10"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-brand-300 uppercase">
                  Соискателям
                </p>
                <p className="mt-3 font-display text-2xl font-bold text-white">Ищу работу вахтой</p>
                <p className="mt-2 text-steel-300">
                  {vacancies.length} открытых вакансий, оформление по ТК РФ, проезд и проживание за счёт
                  компании.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Смотреть вакансии
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>

              <a
                href={company.phone.href}
                className="rounded-2xl border border-white/10 bg-ink-900 p-6 text-center transition-colors hover:border-white/30"
              >
                <p className="text-sm text-steel-400">Позвонить прямо сейчас</p>
                <p className="mt-1 font-display text-2xl font-bold text-white">
                  {company.phone.display}
                </p>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Заказчикам"
            title="Что мы закрываем"
            description="Четыре формата сотрудничества — от отдельных специалистов до бригады «под ключ» с логистикой и бригадиром."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.slug}
                className="flex flex-col rounded-2xl border border-steel-200 bg-white p-7 transition-shadow hover:shadow-card"
              >
                <h3 className="font-display text-xl font-bold text-ink-900">{service.title}</h3>
                <p className="mt-1.5 text-sm font-medium text-brand-600">{service.short}</p>
                <p className="mt-4 leading-relaxed text-steel-600">{service.description}</p>
                <ul className="mt-5 grid gap-2 text-sm text-steel-700">
                  {service.includes.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Подробнее об услуге
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-steel-50">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Специальности"
              title="Кого мы предоставляем"
              description="Полный справочник специальностей с разрядами, допусками и сроками вывода на объект."
            />
            <ButtonLink href="/services/staff" variant="outline">
              Весь список специальностей
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {professionsByCategory.map((group) => (
              <div key={group.category} className="rounded-2xl border border-steel-200 bg-white p-7">
                <h3 className="font-display text-lg font-bold text-ink-900">{group.title}</h3>
                <p className="mt-2 text-sm text-steel-600">{group.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((profession) => (
                    <li key={profession.slug}>
                      <Badge>{profession.title}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Соискателям"
              title="Актуальные вакансии"
              description="Оформление по ТК РФ, выплаты два раза в месяц, проезд и проживание за счёт компании."
            />
            <ButtonLink href="/vacancies" variant="outline">
              Все вакансии
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((vacancy) => (
              <VacancyCard key={vacancy.slug} vacancy={vacancy} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-ink-950 bg-glow">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Процесс"
            title="Как мы закрываем потребность в персонале"
            description="Прозрачные шаги от заявки до работы бригады на объекте — с фиксированными сроками на каждом этапе."
          />
          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {customerSteps.map((step, index) => (
              <li key={step.title} className="relative border-t border-white/15 pt-6">
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
          <SectionHeading
            eyebrow="Гарантии"
            title="Почему с нами спокойно"
            description="Мы закрываем не только подбор, но и всю ответственность вокруг персонала."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((item) => (
              <div key={item.title} className="rounded-2xl bg-steel-50 p-7">
                <h3 className="font-display text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-steel-50">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Проекты"
              title="Реализованные проекты"
              description="Объекты, на которых работали наши бригады, и цифры по каждому из них."
            />
            <ButtonLink href="/cases" variant="outline">
              Все проекты
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projectCases.slice(0, 2).map((item) => (
              <article key={item.slug} className="rounded-2xl border border-steel-200 bg-white p-7">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="brand">{item.region}</Badge>
                  <Badge>{item.year}</Badge>
                  <Badge tone="flame">{item.headcount}</Badge>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-ink-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-steel-600">{item.result}</p>
                <Link
                  href={`/cases#${item.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600"
                >
                  Подробности проекта
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Подрядчикам"
                title="Ищем бригады и субподрядчиков"
                description="Передаём объёмы проверенным бригадам от 5 человек. Фиксируем ставки в договоре и помогаем с мобилизацией."
              />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {contractorBenefits.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-display text-base font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{item.text}</p>
                  </div>
                ))}
              </div>
              <ButtonLink href="/contractors" variant="primary" size="lg" className="mt-8">
                Стать подрядчиком
              </ButtonLink>
            </div>

            <div id="request" className="rounded-2xl border border-steel-200 bg-white p-7 shadow-card sm:p-9">
              <h2 className="font-display text-2xl font-bold text-ink-900">Заявка на персонал</h2>
              <p className="mt-2 text-steel-600">
                Опишите потребность — пришлём расчёт стоимости и срок мобилизации.
              </p>
              <div className="mt-7">
                <CustomerForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
