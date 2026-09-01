import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { YandexMetrika } from "@/components/metrika";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/content/company";
import { organizationSchema, siteUrl } from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.shortName} — ${company.tagline}`,
    template: `%s | ${company.shortName}`,
  },
  description: company.description,
  keywords: [
    "аутстаффинг персонала",
    "предоставление персонала",
    "вахта",
    "работа вахтой",
    "сварщики НАКС",
    "подбор персонала нефтегаз",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: company.shortName,
    title: `${company.shortName} — ${company.tagline}`,
    description: company.description,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1120",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к содержимому
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organizationSchema()} />
        <YandexMetrika />
      </body>
    </html>
  );
}
