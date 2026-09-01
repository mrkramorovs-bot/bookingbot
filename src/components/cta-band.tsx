import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";

export function CtaBand({
  title = "Нужен персонал или ищете работу вахтой?",
  text = "Позвоните или оставьте заявку — специалист свяжется с вами в рабочее время и ответит по существу.",
  primaryHref = "/contacts#request",
  primaryLabel = "Оставить заявку",
}: {
  title?: string;
  text?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <Container className="relative flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-balance text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-steel-300">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primaryHref} variant="flame" size="lg">
            {primaryLabel}
          </ButtonLink>
          <ButtonLink href={company.phone.href} variant="onDark" size="lg">
            {company.phone.display}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
