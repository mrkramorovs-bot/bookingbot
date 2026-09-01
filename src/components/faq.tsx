import type { FaqItem } from "@/content/faq";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-steel-200 overflow-hidden rounded-2xl border border-steel-200 bg-white">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-display text-base font-bold text-ink-900 hover:bg-steel-50 sm:text-lg">
            {item.question}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-steel-300 text-steel-600 transition-transform group-open:rotate-45">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-6 text-steel-600">
            <p className="max-w-3xl leading-relaxed">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
