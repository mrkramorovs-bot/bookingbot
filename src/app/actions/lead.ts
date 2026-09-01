"use server";

import { headers } from "next/headers";

import { leadSchema, type LeadFormState } from "@/lib/leads";
import { deliverLead, type StoredLead } from "@/lib/notify";
import { isRateLimited } from "@/lib/rate-limit";

function toPlainObject(formData: FormData): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") entries[key] = value;
  }
  return entries;
}

async function clientKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = toPlainObject(formData);

  // Ловушка для ботов: настоящий посетитель это поле не видит и не заполняет.
  if (raw.company_website) {
    return { status: "success", message: "Заявка отправлена." };
  }

  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      errors[field] ??= issue.message;
    }
    return {
      status: "error",
      message: "Проверьте заполнение формы.",
      errors,
    };
  }

  if (isRateLimited(await clientKey())) {
    return {
      status: "error",
      message: "Слишком много заявок с одного устройства. Позвоните нам — ответим сразу.",
    };
  }

  const lead: StoredLead = {
    ...parsed.data,
    id: `AG-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };

  const delivered = await deliverLead(lead);

  if (!delivered) {
    return {
      status: "error",
      message: "Не удалось отправить заявку. Позвоните нам или напишите в мессенджер.",
    };
  }

  return {
    status: "success",
    message: `Заявка ${lead.id} принята. Специалист перезвонит в рабочее время.`,
  };
}
