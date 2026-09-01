import type { MetadataRoute } from "next";

import { vacancies } from "@/content/vacancies";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Omit<MetadataRoute.Sitemap[number], "lastModified">[] = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "weekly" },
    { url: absoluteUrl("/vacancies"), priority: 0.9, changeFrequency: "daily" },
    { url: absoluteUrl("/workers"), priority: 0.8, changeFrequency: "monthly" },
    { url: absoluteUrl("/services"), priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/services/staff"), priority: 0.8, changeFrequency: "monthly" },
    { url: absoluteUrl("/contractors"), priority: 0.7, changeFrequency: "monthly" },
    { url: absoluteUrl("/about"), priority: 0.6, changeFrequency: "yearly" },
    { url: absoluteUrl("/cases"), priority: 0.6, changeFrequency: "monthly" },
    { url: absoluteUrl("/contacts"), priority: 0.7, changeFrequency: "yearly" },
  ];

  const staticPages: MetadataRoute.Sitemap = pages.map((page) => ({
    ...page,
    lastModified: now,
  }));

  const vacancyPages: MetadataRoute.Sitemap = vacancies.map((vacancy) => ({
    url: absoluteUrl(`/vacancies/${vacancy.slug}`),
    lastModified: new Date(vacancy.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...vacancyPages];
}
