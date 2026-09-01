import type { Metadata } from "next";

import { ContractorForm, CustomerForm, WorkerForm } from "@/components/forms/presets";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { company } from "@/content/company";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Контакты ${company.legalName}: телефоны отделов, электронная почта, мессенджеры, адрес офиса и реквизиты. Формы заявок для заказчиков, соискателей и подрядчиков.`,
  alternates: { canonical: "/contacts" },
};

const requisites = [
  { label: "Полное наименование", value: company.legalName },
  { label: "ИНН", value: company.inn },
  { label: "КПП", value: company.kpp },
  { label: "ОГРН", value: company.ogrn },
  { label: "Юридический адрес", value: company.address.full },
  { label: "Электронная почта", value: company.email.general },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с нужным отделом"
        description="Три направления работы — три прямых контакта. Общие вопросы принимаем по единому телефону и почте."
        actions={
          <>
            <ButtonLink href={company.phone.href} variant="flame" size="lg">
              {company.phone.display}
            </ButtonLink>
            <ButtonLink href={company.messengers.telegram} variant="onDark" size="lg">
              Написать в Telegram
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {company.departments.map((department) => (
              <div key={department.title} className="rounded-2xl border border-steel-200 p-7">
                <h2 className="font-display text-lg font-bold text-ink-900">{department.title}</h2>
                <p className="mt-1 text-sm text-steel-500">{department.person}</p>
                <a
                  href={department.phoneHref}
                  className="mt-5 block font-display text-xl font-bold text-brand-600 hover:text-brand-700"
                >
                  {department.phone}
                </a>
                <a
                  href={`mailto:${department.email}`}
                  className="mt-1 block text-steel-700 hover:text-brand-600"
                >
                  {department.email}
                </a>
                <p className="mt-4 text-sm text-steel-500">{department.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl bg-steel-50 p-7 sm:p-9">
              <h2 className="font-display text-xl font-bold text-ink-900">Офис и режим работы</h2>
              <p className="mt-4 text-steel-700">{company.address.full}</p>
              <p className="mt-2 text-steel-600">{company.workingHours}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={company.messengers.telegram} variant="outline">
                  Telegram
                </ButtonLink>
                <ButtonLink href={company.messengers.whatsapp} variant="outline">
                  WhatsApp
                </ButtonLink>
                <ButtonLink href={`mailto:${company.email.general}`} variant="outline">
                  {company.email.general}
                </ButtonLink>
              </div>
              {/*
                Карта подключается после согласования адреса: вставьте iframe
                Яндекс.Карт с параметром og_source, чтобы не тянуть внешние скрипты.
              */}
              <div className="mt-8 flex h-64 items-center justify-center rounded-xl border border-dashed border-steel-300 bg-white text-center text-sm text-steel-500">
                Здесь будет карта проезда — добавляется после подтверждения адреса офиса
              </div>
            </div>

            <div className="rounded-2xl border border-steel-200 p-7 sm:p-9">
              <h2 className="font-display text-xl font-bold text-ink-900">Реквизиты</h2>
              <dl className="mt-6 space-y-4 text-sm">
                {requisites.map((item) => (
                  <div key={item.label}>
                    <dt className="text-steel-500">{item.label}</dt>
                    <dd className="mt-0.5 font-medium text-ink-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-steel-50" id="request">
        <Container>
          <SectionHeading
            eyebrow="Формы заявок"
            title="Выберите форму под свою задачу"
            description="Заявки поступают напрямую ответственному специалисту. Отвечаем в рабочее время."
          />

          <div className="mt-12 space-y-8">
            <div className="rounded-2xl border border-steel-200 bg-white p-7 sm:p-9">
              <h3 className="font-display text-xl font-bold text-ink-900">
                Нужен персонал на объект
              </h3>
              <p className="mt-2 text-steel-600">
                Для компаний: расчёт стоимости и срок мобилизации в течение рабочего дня.
              </p>
              <div className="mt-7">
                <CustomerForm />
              </div>
            </div>

            <div className="rounded-2xl border border-steel-200 bg-white p-7 sm:p-9">
              <h3 className="font-display text-xl font-bold text-ink-900">Ищу работу вахтой</h3>
              <p className="mt-2 text-steel-600">
                Для соискателей: подберём объект под вашу специальность и опыт.
              </p>
              <div className="mt-7">
                <WorkerForm />
              </div>
            </div>

            <div className="rounded-2xl border border-steel-200 bg-white p-7 sm:p-9">
              <h3 className="font-display text-xl font-bold text-ink-900">
                Мы подрядчик или бригада
              </h3>
              <p className="mt-2 text-steel-600">
                Для партнёров: расскажите о профиле работ и численности — вернёмся с объёмами.
              </p>
              <div className="mt-7">
                <ContractorForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Контакты", url: "/contacts" },
        ])}
      />
    </>
  );
}
