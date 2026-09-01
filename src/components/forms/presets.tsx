import { LeadForm, type FieldConfig } from "@/components/forms/lead-form";

const nameField: FieldConfig = {
  name: "name",
  label: "Как к вам обращаться",
  autoComplete: "name",
  placeholder: "Иван Петров",
  required: true,
  half: true,
};

const phoneField: FieldConfig = {
  name: "phone",
  label: "Телефон",
  type: "tel",
  autoComplete: "tel",
  placeholder: "+7 (___) ___-__-__",
  required: true,
  half: true,
};

export function VacancyApplyForm({ slug, title }: { slug: string; title: string }) {
  return (
    <LeadForm
      kind="vacancy"
      hidden={{ vacancySlug: slug, vacancyTitle: title }}
      submitLabel="Откликнуться"
      note="Перезвоним в рабочее время и расскажем условия по объекту."
      fields={[
        nameField,
        phoneField,
        { name: "city", label: "Город проживания", placeholder: "Уфа", half: true },
        {
          name: "comment",
          label: "Опыт, разряд, действующие допуски",
          type: "textarea",
          rows: 3,
          placeholder: "Например: сварщик 5 разряда, НАКС до 03.2027, опыт 6 лет",
        },
      ]}
    />
  );
}

export function WorkerForm() {
  return (
    <LeadForm
      kind="worker"
      submitLabel="Отправить анкету"
      note="Подберём объект под вашу специальность."
      fields={[
        nameField,
        phoneField,
        {
          name: "profession",
          label: "Специальность",
          placeholder: "Сварщик, монтажник, разнорабочий…",
          required: true,
          half: true,
        },
        { name: "grade", label: "Разряд и допуски", placeholder: "5 разряд, НАКС, работа на высоте", half: true },
        { name: "city", label: "Город проживания", placeholder: "Самара", half: true },
        {
          name: "comment",
          label: "Комментарий",
          type: "textarea",
          rows: 3,
          placeholder: "Опыт работы, желаемый график вахты, когда готовы выехать",
        },
      ]}
    />
  );
}

export function CustomerForm() {
  return (
    <LeadForm
      kind="customer"
      submitLabel="Запросить персонал"
      note="Пришлём расчёт и срок мобилизации в течение рабочего дня."
      fields={[
        { name: "company", label: "Компания", placeholder: "ООО «Стройпроект»", required: true, half: true },
        nameField,
        phoneField,
        { name: "email", label: "E-mail", type: "email", autoComplete: "email", placeholder: "info@company.ru", half: true },
        {
          name: "need",
          label: "Какой персонал требуется",
          type: "textarea",
          rows: 3,
          placeholder: "Сварщики НАКС 5 разряда — 12 человек, монтажники — 20 человек",
          required: true,
        },
        { name: "headcount", label: "Численность", placeholder: "32 человека", half: true },
        { name: "region", label: "Регион объекта", placeholder: "ЯНАО, Новый Уренгой", half: true },
        { name: "startDate", label: "Желаемая дата выхода", placeholder: "с 15 октября", half: true },
      ]}
    />
  );
}

export function ContractorForm() {
  return (
    <LeadForm
      kind="contractor"
      submitLabel="Отправить анкету подрядчика"
      note="Рассмотрим анкету и вернёмся с текущими объёмами."
      fields={[
        { name: "company", label: "Компания или ИП", placeholder: "ООО «СМУ-7»", required: true, half: true },
        { name: "inn", label: "ИНН", placeholder: "0000000000", half: true },
        nameField,
        phoneField,
        { name: "email", label: "E-mail", type: "email", autoComplete: "email", placeholder: "info@company.ru", half: true },
        {
          name: "workTypes",
          label: "Виды работ",
          type: "textarea",
          rows: 3,
          placeholder: "Сварочно-монтажные работы, монтаж металлоконструкций, изоляция",
          required: true,
        },
        { name: "headcount", label: "Численность бригады", placeholder: "18 человек", half: true },
        { name: "region", label: "Регионы работы", placeholder: "ХМАО, ЯНАО", half: true },
      ]}
    />
  );
}
