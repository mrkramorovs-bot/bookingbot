import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="font-display text-6xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink-900">Страница не найдена</h1>
      <p className="mx-auto mt-3 max-w-md text-steel-600">
        Возможно, вакансия уже закрыта или адрес указан с ошибкой. Посмотрите открытые вакансии или
        свяжитесь с нами.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/vacancies" variant="flame" size="lg">
          Открытые вакансии
        </ButtonLink>
        <ButtonLink href="/contacts" variant="outline" size="lg">
          Контакты
        </ButtonLink>
      </div>
    </Container>
  );
}
