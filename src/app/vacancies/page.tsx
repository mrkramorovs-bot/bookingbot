import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { VacancyCatalog } from "@/components/vacancy-catalog";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { company } from "@/content/company";
import { vacancies, vacancyRegions, vacancyShifts } from "@/content/vacancies";
import { breadcrumbSchema } from "@/lib/seo";
import { plural } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Вакансии вахтой",
  description:
    "Открытые вакансии на объектах нефтегазового строительства: сварщики НАКС, монтажники, электромонтажники, разнорабочие. Оформление по ТК РФ, проезд и проживание за счёт компании.",
  alternates: { canonical: "/vacancies" },
};

export default function VacanciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Соискателям"
        title="Открытые вакансии вахтовым методом"
        description={`Сейчас идёт набор на ${vacancies.length} ${plural(vacancies.length, ["вакансию", "вакансии", "вакансий"])}. Оформление по ТК РФ с первого дня, выплаты два раза в месяц, проезд и проживание за счёт компании.`}
        actions={
          <>
            <ButtonLink href="/workers#anketa" variant="flame" size="lg">
              Оставить анкету
            </ButtonLink>
            <ButtonLink href={company.hrPhone.href} variant="onDark" size="lg">
              Отдел кадров {company.hrPhone.display}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <VacancyCatalog
            vacancies={vacancies}
            regions={[...vacancyRegions]}
            shifts={[...vacancyShifts]}
          />
        </Container>
      </Section>

      <CtaBand
        title="Не нашли подходящую вакансию?"
        text="Оставьте анкету — предложим объект под вашу специальность, как только он появится."
        primaryHref="/workers#anketa"
        primaryLabel="Оставить анкету"
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Вакансии", url: "/vacancies" },
        ])}
      />
    </>
  );
}
