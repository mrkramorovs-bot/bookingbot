# Сайт компании «Альфа Газ»

Корпоративный сайт аутстаффинговой компании: предоставление рабочих и ИТР на нефтегазовые
и промышленные объекты.

Сайт решает четыре задачи:

1. **Находит рабочих** — каталог вакансий с фильтрами, карточка вакансии с формой отклика, общая анкета соискателя.
2. **Находит подрядчиков** — раздел для бригад и субподрядных организаций с анкетой партнёра.
3. **Показывает контакты** — телефон в шапке на каждой странице, три отдела с прямыми номерами, реквизиты.
4. **Собирает контакты** — четыре формы с валидацией, защитой от ботов и мгновенным уведомлением менеджеру.

Отдельно разведены две витрины специальностей: `/vacancies` — открытый набор для соискателей,
`/services/staff` — перечень специальностей, которые компания может закрыть для заказчика.

## Стек

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Zod — валидация форм на сервере
- Server Actions — приём заявок без отдельного API-слоя

## Запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Сайт поднимется на http://localhost:3000.

Полезные команды:

```bash
npm run build      # production-сборка
npm run start      # запуск собранного приложения
npm run lint       # ESLint
npm run typecheck  # проверка типов
```

## Переменные окружения

| Переменная | Назначение |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Боевой домен: canonical, Open Graph, `sitemap.xml` |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Счётчик Яндекс.Метрики; без него метрика не подключается |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Дублирование заявок в чат менеджеров |
| `CRM_WEBHOOK_URL` | Передача заявок в CRM (Битрикс24, amoCRM) |

Все переменные необязательные: без них формы продолжают работать, а заявки пишутся
в локальный журнал `data/leads.jsonl`.

## Структура

```
src/
  app/
    actions/lead.ts        Server Action приёма заявок
    vacancies/[slug]/      Карточка вакансии (SSG) + JobPosting-разметка
    services/staff/        Витрина специальностей для заказчика
    sitemap.ts, robots.ts  SEO-служебные маршруты
  components/
    forms/                 Универсальная форма и её пресеты под 4 сценария
    ui/                    Кнопки, контейнер, заголовки секций, бейджи
  content/                 Контент: компания, специальности, вакансии, кейсы, FAQ
  lib/                     Валидация, доставка заявок, rate limit, SEO-схемы
```

## Как редактировать контент

Контент лежит в обычных TypeScript-файлах, админка на текущем этапе не нужна:

- реквизиты, телефоны и отделы — `src/content/company.ts`;
- вакансии — `src/content/vacancies.ts` (страница и микроразметка генерируются автоматически);
- справочник специальностей — `src/content/professions.ts`;
- услуги, шаги процесса, условия для подрядчиков — `src/content/services.ts`;
- проекты — `src/content/cases.ts`, вопросы и ответы — `src/content/faq.ts`.

Значения-заглушки в `company.ts` помечены комментарием `TODO` — их нужно заменить перед
публикацией.

## Приём заявок

Формы отправляются через Server Action `submitLead`:

1. Валидация схемой Zod с русскими сообщениями об ошибках.
2. Отсечение ботов: скрытое поле-ловушка и ограничение по частоте (5 заявок за 10 минут с IP).
3. Доставка параллельно во все настроенные каналы: журнал `data/leads.jsonl`, Telegram, вебхук CRM.
4. Пользователю возвращается номер заявки вида `AG-XXXXXX`.

Вместе с заявкой сохраняются страница-источник и UTM-метки.

## SEO

- Метаданные и canonical на каждой странице, Open Graph, `sitemap.xml`, `robots.txt`.
- Микроразметка: `Organization`, `JobPosting` на вакансиях, `FAQPage`, `BreadcrumbList`.
- Шрифты подключаются через `next/font` и раздаются с нашего домена — внешних запросов
  из браузера пользователя нет.

## Что нужно сделать перед публикацией

- [ ] Заменить заглушки в `src/content/company.ts` на реальные реквизиты и телефоны
- [ ] Согласовать с юристом текст `/privacy` и подать уведомление в Роскомнадзор
- [ ] Развернуть на хостинге в РФ (152-ФЗ требует хранения персональных данных в России)
- [ ] Подключить Telegram-бота и счётчик Метрики, настроить цели на формы
- [ ] Добавить карту проезда на странице контактов
- [ ] Заменить демонстрационные вакансии и кейсы на реальные

## Cursor agent configuration (ECC)

This repo checks in the Cursor adapter from [Everything Claude Code](https://github.com/affaan-m/ECC)
(ECC) v2.2.1, installed from commit `ca185ef` with:

```bash
git clone --depth 1 https://github.com/affaan-m/ECC.git
cd ECC && ./install.sh --target cursor --profile core --enable-hooks   # run from the repo root
```

Everything lives under `.cursor/`, so opening the repo in Cursor is all it takes:
122 rules, 68 agents, 94 commands, 58 skills, and 15 hook events backed by ECC's
shared Node hook runtime in `.cursor/scripts/`. The hook runtime needs Node 18+
on `PATH` and no npm dependencies.

Only install ECC from its [official channels](https://github.com/affaan-m/ECC#readme).
Third-party mirrors are unreviewed.

### What the install does at runtime

- **Rules.** 10 always-applied rules (coding style, security, testing, git
  workflow, agent orchestration) plus 111 auto-attached rules scoped by glob to
  the language or framework they cover, so language guidance only loads for
  matching files. Code review standards are agent-requested rather than
  always-applied, to keep them out of every request.
- **Hooks.** `.cursor/hooks.json` wires all 15 Cursor hook events. Ten act inline
  (secret detection in prompts, blocking reads of `.env`/`.key`/`.pem`, blocking
  `--no-verify`, MCP audit logging); the rest delegate to the shared runtime for
  session summaries, learned-skill capture, cost tracking, auto-format and the
  `console.log` audit. Gate them at runtime with `ECC_HOOK_PROFILE`
  (`minimal`/`standard`/`strict`) and `ECC_DISABLED_HOOKS`.
- **Memory.** Session summaries, learned skills and metrics go to `~/.cursor/ecc`,
  not `~/.claude`, so ECC in Cursor and ECC in Claude Code do not overwrite each
  other. `.cursor/ecc-agent-data.json` overrides the location; it only accepts
  paths under `~/.cursor/ecc` or `~/.claude`.
- **MCP.** `.cursor/mcp.json` declares one server, `chrome-devtools`, which Cursor
  runs via `npx` once enabled. `.cursor/mcp-configs/mcp-servers.json` is a
  reference catalog of 35 more; nothing there is active until you copy it across.

### Local adjustments

`.cursor/` is not a verbatim copy of the installer output. Five adjustments make
the install work as documented under Cursor; see the commits on this branch for
the reasoning behind each.

| Adjustment | Why |
|---|---|
| `.cursor/hooks/adapter.js` resolves the hook runtime under `.cursor/` | Upstream looks for it at the project root, so six delegating hooks silently did nothing |
| `cursor-session-env.js` runs first on `sessionStart` | Pins the memory root; the installer only emits this on its legacy language-based path |
| 81 language rules use `globs:` instead of `paths:` | Cursor does not read `paths:`, so those rules never auto-attached |
| `common-code-review.mdc` gained frontmatter | It shipped bare and was therefore unloadable |
| `.cursor/.agents/` and `.cursor/.pi/` removed | Antigravity and Pi payloads, ~936 KB that Cursor never reads |

These edit installer-owned files, so reinstalling reverts them. To update ECC:

```bash
./install.sh --target cursor --profile core --enable-hooks   # from the ECC checkout
python3 scripts/ecc-cursor-fixups.py                        # from this repo root
git diff
```

The script is idempotent, and `--check` reports pending work without writing.
A step that no longer matches upstream's shape reports `SKIP` and exits non-zero
instead of guessing, which is the signal to review that fixup against the new
ECC version.

`.cursor/ecc-install-state.json` is gitignored: it records the absolute paths of
the machine that ran the installer, and its content hashes describe the
unadjusted tree.
