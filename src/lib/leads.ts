import { z } from "zod";

export const leadKinds = ["vacancy", "worker", "customer", "contractor"] as const;
export type LeadKind = (typeof leadKinds)[number];

export const leadKindLabels: Record<LeadKind, string> = {
  vacancy: "Отклик на вакансию",
  worker: "Анкета соискателя",
  customer: "Заявка на подбор персонала",
  contractor: "Анкета подрядчика",
};

/** Телефон РФ и СНГ: допускаем пробелы, скобки, дефисы и плюс. */
const phone = z
  .string()
  .trim()
  .min(10, "Укажите телефон полностью")
  .max(24, "Слишком длинный номер")
  .regex(/^\+?[\d\s()-]{10,24}$/, "Телефон можно указать только цифрами и символами + ( ) -");

const name = z
  .string()
  .trim()
  .min(2, "Укажите имя")
  .max(80, "Слишком длинное значение");

const optionalText = (max: number) =>
  z.string().trim().max(max, "Слишком длинный текст").optional().or(z.literal(""));

/** Неотмеченный чекбокс браузер не отправляет вовсе, поэтому поле необязательное. */
const consent = z
  .string()
  .optional()
  .refine((value) => value === "on" || value === "true", {
    message: "Отметьте согласие на обработку персональных данных",
  });

/** Скрытое поле-ловушка для ботов: должно оставаться пустым. */
const honeypot = z.literal("").or(z.undefined());

const base = z.object({
  kind: z.enum(leadKinds),
  name,
  phone,
  consent,
  company_website: honeypot,
  comment: optionalText(1000),
  source: optionalText(200),
  utm: optionalText(500),
});

export const leadSchema = z.discriminatedUnion("kind", [
  base.extend({
    kind: z.literal("vacancy"),
    vacancySlug: z.string().trim().min(1),
    vacancyTitle: z.string().trim().min(1),
    city: optionalText(80),
  }),
  base.extend({
    kind: z.literal("worker"),
    profession: z.string().trim().min(2, "Укажите специальность").max(120),
    grade: optionalText(80),
    city: optionalText(80),
  }),
  base.extend({
    kind: z.literal("customer"),
    company: z.string().trim().min(2, "Укажите название компании").max(160),
    email: z.email("Проверьте адрес электронной почты").or(z.literal("")).optional(),
    need: z.string().trim().min(3, "Опишите, какой персонал нужен").max(600),
    headcount: optionalText(40),
    region: optionalText(120),
    startDate: optionalText(60),
  }),
  base.extend({
    kind: z.literal("contractor"),
    company: z.string().trim().min(2, "Укажите название компании или ИП").max(160),
    inn: optionalText(20),
    email: z.email("Проверьте адрес электронной почты").or(z.literal("")).optional(),
    workTypes: z.string().trim().min(3, "Укажите виды работ").max(400),
    headcount: optionalText(40),
    region: optionalText(120),
  }),
]);

export type Lead = z.infer<typeof leadSchema>;

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Ошибки по именам полей формы */
  errors?: Record<string, string>;
};

export const initialFormState: LeadFormState = { status: "idle" };

/** Человекочитаемые подписи полей для уведомления менеджеру. */
export const fieldLabels: Record<string, string> = {
  name: "Имя",
  phone: "Телефон",
  email: "E-mail",
  city: "Город",
  company: "Компания",
  inn: "ИНН",
  profession: "Специальность",
  grade: "Разряд / допуски",
  need: "Требуется персонал",
  workTypes: "Виды работ",
  headcount: "Численность",
  region: "Регион",
  startDate: "Дата выхода",
  vacancyTitle: "Вакансия",
  vacancySlug: "Код вакансии",
  comment: "Комментарий",
  source: "Страница",
  utm: "UTM",
};
