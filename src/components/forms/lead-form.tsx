"use client";

import { usePathname } from "next/navigation";
import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";

import { submitLead } from "@/app/actions/lead";
import { Button } from "@/components/ui/button";
import { initialFormState, type LeadKind } from "@/lib/leads";
import { cn } from "@/lib/utils";

export type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "textarea";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  /** Половина ширины на десктопе */
  half?: boolean;
  rows?: number;
};

const inputClass =
  "w-full rounded-lg border border-steel-300 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-steel-400 focus:border-brand-500 focus:ring-0 focus:outline-none";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="flame" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Отправляем…" : label}
    </Button>
  );
}

export function LeadForm({
  kind,
  fields,
  submitLabel = "Отправить заявку",
  hidden,
  note,
  className,
}: {
  kind: LeadKind;
  fields: FieldConfig[];
  submitLabel?: string;
  hidden?: Record<string, string>;
  note?: string;
  className?: string;
}) {
  const [state, formAction] = useActionState(submitLead, initialFormState);
  const pathname = usePathname();
  const formId = useId();
  const utmRef = useRef<HTMLInputElement>(null);

  // Метки источника проставляем в скрытое поле напрямую: перерисовка формы не нужна.
  useEffect(() => {
    if (!utmRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const marks = [...params.entries()]
      .filter(([key]) => key.startsWith("utm_") || key === "gclid" || key === "yclid")
      .map(([key, value]) => `${key}=${value}`);
    const referrer = document.referrer ? `ref=${document.referrer}` : "";
    utmRef.current.value = [...marks, referrer].filter(Boolean).join("; ").slice(0, 500);
  }, []);

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center",
          className,
        )}
        role="status"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <p className="mt-5 font-display text-xl font-bold text-ink-900">Спасибо, заявка принята</p>
        <p className="mt-2 text-steel-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("space-y-5", className)} noValidate>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="source" value={pathname} />
      <input type="hidden" name="utm" ref={utmRef} defaultValue="" />
      {Object.entries(hidden ?? {}).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      {/* Ловушка для ботов */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-company_website`}>Не заполняйте это поле</label>
        <input id={`${formId}-company_website`} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${formId}-${field.name}`;
          const error = state.errors?.[field.name];
          return (
            <div key={field.name} className={cn(field.half ? "sm:col-span-1" : "sm:col-span-2")}>
              <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-900">
                {field.label}
                {field.required ? <span className="text-flame-600"> *</span> : null}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={field.rows ?? 4}
                  placeholder={field.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={cn(inputClass, "resize-y", error && "border-flame-600")}
                />
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type ?? "text"}
                  inputMode={field.type === "tel" ? "tel" : undefined}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={cn(inputClass, error && "border-flame-600")}
                />
              )}
              {error ? (
                <p id={`${id}-error`} className="mt-1.5 text-sm text-flame-600">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-steel-600">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-steel-300 text-brand-600"
          />
          <span>
            Согласен на обработку персональных данных в соответствии с{" "}
            <a href="/privacy" className="text-brand-600 underline underline-offset-2">
              политикой конфиденциальности
            </a>
            .
          </span>
        </label>
        {state.errors?.consent ? (
          <p className="mt-1.5 text-sm text-flame-600">{state.errors.consent}</p>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="rounded-lg bg-flame-100 px-4 py-3 text-sm text-flame-600">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SubmitButton label={submitLabel} />
        {note ? <p className="text-sm text-steel-500">{note}</p> : null}
      </div>
    </form>
  );
}
