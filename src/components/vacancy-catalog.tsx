"use client";

import { useMemo, useState } from "react";

import { VacancyCard } from "@/components/vacancy-card";
import type { Vacancy } from "@/content/vacancies";
import { cn, plural } from "@/lib/utils";

const ANY = "any";

export function VacancyCatalog({
  vacancies,
  regions,
  shifts,
}: {
  vacancies: Vacancy[];
  regions: string[];
  shifts: string[];
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState(ANY);
  const [shift, setShift] = useState(ANY);
  const [noExperience, setNoExperience] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return vacancies.filter((vacancy) => {
      if (region !== ANY && vacancy.region !== region) return false;
      if (shift !== ANY && vacancy.shift !== shift) return false;
      if (noExperience && vacancy.experience !== "без опыта") return false;
      if (!normalized) return true;
      return [vacancy.title, vacancy.city, vacancy.region, vacancy.objectType, vacancy.summary]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [vacancies, query, region, shift, noExperience]);

  const selectClass =
    "w-full rounded-lg border border-steel-300 bg-white px-4 py-3 text-base text-ink-900 focus:border-brand-500 focus:outline-none";

  return (
    <div>
      <div className="rounded-2xl border border-steel-200 bg-steel-50 p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <label htmlFor="vacancy-search" className="mb-1.5 block text-sm font-medium text-ink-900">
              Поиск по профессии или городу
            </label>
            <input
              id="vacancy-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Сварщик, монтажник, Новый Уренгой…"
              className={selectClass}
            />
          </div>
          <div>
            <label htmlFor="vacancy-region" className="mb-1.5 block text-sm font-medium text-ink-900">
              Регион
            </label>
            <select
              id="vacancy-region"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className={selectClass}
            >
              <option value={ANY}>Все регионы</option>
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="vacancy-shift" className="mb-1.5 block text-sm font-medium text-ink-900">
              График вахты
            </label>
            <select
              id="vacancy-shift"
              value={shift}
              onChange={(event) => setShift(event.target.value)}
              className={selectClass}
            >
              <option value={ANY}>Любой</option>
              {shifts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink-900">
            <input
              type="checkbox"
              checked={noExperience}
              onChange={(event) => setNoExperience(event.target.checked)}
              className="h-5 w-5 rounded border-steel-300 text-brand-600"
            />
            Только без опыта
          </label>
          <p className="text-sm text-steel-600">
            Найдено {filtered.length}{" "}
            {plural(filtered.length, ["вакансия", "вакансии", "вакансий"])}
          </p>
        </div>
      </div>

      <div className={cn("mt-8 grid gap-6", filtered.length > 0 && "md:grid-cols-2 xl:grid-cols-3")}>
        {filtered.length > 0 ? (
          filtered.map((vacancy) => <VacancyCard key={vacancy.slug} vacancy={vacancy} />)
        ) : (
          <div className="rounded-2xl border border-dashed border-steel-300 p-10 text-center">
            <p className="font-display text-lg font-bold text-ink-900">
              По этим условиям вакансий нет
            </p>
            <p className="mx-auto mt-2 max-w-md text-steel-600">
              Сбросьте фильтры или оставьте анкету — мы предложим объект, как только он появится.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setRegion(ANY);
                setShift(ANY);
                setNoExperience(false);
              }}
              className="mt-5 rounded-lg border border-steel-300 px-4 py-2.5 text-sm font-semibold text-ink-900 hover:border-brand-500 hover:text-brand-600"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
