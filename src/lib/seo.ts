import { company } from "@/content/company";
import type { Vacancy } from "@/content/vacancies";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? company.siteUrl;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.shortName,
    url: siteUrl,
    description: company.description,
    telephone: company.phone.display,
    email: company.email.general,
    foundingDate: String(company.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.full,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phone.display,
        contactType: "sales",
        areaServed: "RU",
        availableLanguage: "Russian",
      },
      {
        "@type": "ContactPoint",
        telephone: company.hrPhone.display,
        contactType: "HR",
        areaServed: "RU",
        availableLanguage: "Russian",
      },
    ],
  };
}

export function jobPostingSchema(vacancy: Vacancy) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: vacancy.title,
    description: [vacancy.summary, ...vacancy.responsibilities, ...vacancy.requirements].join(" "),
    datePosted: vacancy.publishedAt,
    validThrough: vacancy.validThrough,
    employmentType: "FULL_TIME",
    industry: "Нефтегазовое строительство",
    experienceRequirements: vacancy.experience,
    identifier: {
      "@type": "PropertyValue",
      name: company.shortName,
      value: vacancy.slug,
    },
    hiringOrganization: {
      "@type": "Organization",
      name: company.legalName,
      sameAs: siteUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: vacancy.city,
        addressRegion: vacancy.region,
        addressCountry: "RU",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "RUB",
      value: {
        "@type": "QuantitativeValue",
        minValue: vacancy.salaryFrom,
        maxValue: vacancy.salaryTo,
        unitText: vacancy.salaryUnit,
      },
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
