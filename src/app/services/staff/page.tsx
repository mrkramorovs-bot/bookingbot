import type { Metadata } from "next";
import Link from "next/link";

import { CustomerForm } from "@/components/forms/presets";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { professionsByCategory } from "@/content/professions";
import { vacancies } from "@/content/vacancies";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Кого мы предоставляем: специальности и допуски",
  description:
    "Справочник специальностей, которые закрывает «Альфа Газ»: сварщики НАКС, монтажники, электромонтажники, КИПиА, дефектоскописты, ИТР, вспомогательный персонал. Разряды, аттестации, сроки мобилизации.",
  alternates: { canonical: "/services/staff" },
};

export default function StaffPage() {
  return (
    <>
      <PageHero
        eyebrow="Заказчикам"
        title="Кого мы предоставляем"
        description="Полный перечень специальностей с разрядами, допусками и типовым сроком вывода на объект. Нужной позиции нет в списке — напишите, подберём под ваш профиль требований."
        actions={
          <>
            <ButtonLink href="#request" variant="flame" size="lg">
              Запросить персонал
            </ButtonLink>
            <ButtonLink href="/services" variant="onDark" size="lg">
              Условия сотрудничества
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <div className="space-y-14">
            {professionsByCategory.map((group) => (
              <div key={group.category}>
                <SectionHeading title={group.title} description={group.description} />
                <div className="mt-8 overflow-hidden rounded-2xl border border-steel-200">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-steel-50 text-sm text-steel-600">
                      <tr>
                        <th scope="col" className="px-6 py-4 font-semibold">
                          Специальность
                        </th>
                        <th scope="col" className="hidden px-6 py-4 font-semibold lg:table-cell">
                          Что делает
                        </th>
                        <th scope="col" className="px-6 py-4 font-semibold">
                          Разряды и допуски
                        </th>
                        <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">
                          Мобилизация
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-steel-200 bg-white">
                      {group.items.map((profession) => {
                        const openVacancy = vacancies.find(
                          (vacancy) => vacancy.professionSlug === profession.slug,
                        );
                        return (
                          <tr key={profession.slug} className="align-top">
                            <th scope="row" className="px-6 py-5 font-display text-base font-bold text-ink-900">
                              {profession.title}
                              {openVacancy ? (
                                <Link
                                  href={`/vacancies/${openVacancy.slug}`}
                                  className="mt-2 block text-xs font-medium text-brand-600 hover:text-brand-700"
                                >
                                  Идёт набор →
                                </Link>
                              ) : null}
                            </th>
                            <td className="hidden max-w-sm px-6 py-5 text-sm leading-relaxed text-steel-600 lg:table-cell">
                              {profession.summary}
                            </td>
                            <td className="px-6 py-5">
                              <ul className="flex flex-wrap gap-1.5">
                                {profession.qualifications.map((item) => (
                                  <li key={item}>
                                    <Badge>{item}</Badge>
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-6 py-5 text-sm font-semibold whitespace-nowrap text-ink-900">
                              {profession.mobilization}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-steel-50" id="request">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Заявка"
                title="Не нашли нужную специальность?"
                description="Мы закрываем и нетиповые позиции: от геодезистов и маркшейдеров до специалистов по промышленной безопасности. Опишите требования — проверим базу и назовём срок."
              />
              <ul className="mt-8 space-y-3 text-steel-700">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                  Проверяем действующие удостоверения и аттестации до вывода на объект
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                  Подбираем людей с опытом работы в вашем регионе и климате
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500" />
                  Гарантийная замена в течение 5 рабочих дней
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-steel-200 bg-white p-7 shadow-card sm:p-9">
              <CustomerForm />
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Заказчикам", url: "/services" },
          { name: "Кого мы предоставляем", url: "/services/staff" },
        ])}
      />
    </>
  );
}
