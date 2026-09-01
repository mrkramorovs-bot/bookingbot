import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { fieldLabels, leadKindLabels, type Lead } from "@/lib/leads";

const LEADS_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(LEADS_DIR, "leads.jsonl");

export type StoredLead = Lead & { id: string; createdAt: string };

function renderMessage(lead: StoredLead): string {
  const skip = new Set(["kind", "consent", "company_website", "id", "createdAt"]);
  const lines = Object.entries(lead)
    .filter(([key, value]) => !skip.has(key) && typeof value === "string" && value.trim() !== "")
    .map(([key, value]) => `${fieldLabels[key] ?? key}: ${value}`);

  return [
    `🔔 ${leadKindLabels[lead.kind]}`,
    `Заявка ${lead.id} от ${new Date(lead.createdAt).toLocaleString("ru-RU")}`,
    "",
    ...lines,
  ].join("\n");
}

/**
 * Дублирует заявку в Telegram-чат менеджеров.
 * Молча пропускается, если переменные окружения не заданы, — сайт
 * должен принимать заявки даже без настроенных интеграций.
 */
async function sendToTelegram(lead: StoredLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: renderMessage(lead),
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram API ответил ${response.status}`);
  }
}

/** Локальный журнал заявок — страховка на случай сбоя внешних интеграций. */
async function appendToJournal(lead: StoredLead): Promise<void> {
  await mkdir(LEADS_DIR, { recursive: true });
  await appendFile(LEADS_FILE, `${JSON.stringify(lead)}\n`, "utf8");
}

/** Передаёт заявку во внешнюю CRM, если задан вебхук. */
async function sendToWebhook(lead: StoredLead): Promise<void> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`CRM вебхук ответил ${response.status}`);
  }
}

/**
 * Доставляет заявку по всем настроенным каналам.
 * Возвращает true, если заявка сохранена или доставлена хотя бы одним способом.
 */
export async function deliverLead(lead: StoredLead): Promise<boolean> {
  const results = await Promise.allSettled([
    appendToJournal(lead),
    sendToTelegram(lead),
    sendToWebhook(lead),
  ]);

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("[lead] канал доставки недоступен:", result.reason);
    }
  });

  return results.some((result) => result.status === "fulfilled");
}
