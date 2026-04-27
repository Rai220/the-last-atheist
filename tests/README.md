# Tests

Автотесты для «Последнего Атеиста». Задача — поймать регрессии в графе сценария, недоступные концовки, рассинхрон ROUTE_MAP / ALL_ENDINGS, поломанные UI‑скрипты.

## Структура

| Файл | Что проверяет | Нужен ли браузер |
| --- | --- | --- |
| `tests/static.mjs` | Граф лейблов, ROUTE_MAP, ALL_ENDINGS, storage/reset симметрия. Парсит исходники регулярками. | нет |
| `tests/runtime.mjs` | Все 29 концовок реально доходят до `Ending_Credits` и пишут в `tla_endings`; гейты Hell_Breakdown_Route / Hell_Secret_Check / Hell_Lilith_Visit_Check; UI‑элементы; `installProceedGuard` ловит `Wait period has not ended.`. | да (Playwright headless) |
| `tests/run.mjs` | Оркестратор: гонит сначала static, потом runtime, печатает сводку, возвращает non‑zero exit на падении. | как `runtime.mjs` |

## Как запустить

```bash
# один раз — поставить playwright и chromium
bun install
bunx playwright install chromium

# каждый раз — прогнать всё
bun run test
```

Только статика (без браузера, без playwright):

```bash
bun run test:static
```

Только runtime (предполагает что playwright уже установлен):

```bash
bun run test:runtime
```

## Что под капотом

- `static.mjs` парсит `js/scripts/*.js`, `js/main.js`, `js/storage.js`, `js/script.js` регулярками — ищет объявления лейблов, цели `jump`, ROUTE_MAP nodes/edges, ALL_ENDINGS, resetStoryStateForNewGame.
- `runtime.mjs` поднимает Python‑static сервер на свободном порту (по умолчанию `:5102`), чтобы не конфликтовать с `bun run serve` (`:5100`). Запускает headless Chromium через Playwright. Для каждой концовки делает `await monogatari.startGame()` → `monogatari.run('jump <Ending_X>')` → циклически `proceed/click choice` пока `tla_endings[<key>]` не появится.
- Все проверки изолированы: упавший assert не валит остальные.

## Когда добавлять тест

- Появилась новая концовка: добавить ключ в `ALL_ENDINGS` (`js/main.js`) и в ROUTE_MAP — статический тест сам проверит, что они синхронны. Динамический тест автоматически прогоняет все ключи `ALL_ENDINGS`, отдельно ничего регистрировать не нужно.
- Добавился новый гейт (`Conditional`): задокументировать ожидаемый переход в `tests/runtime.mjs` в секции `GATES`.
- Появилась новая UI‑фича на main / quick‑menu: добавить smoke‑чек в `runtime.mjs` секцию `UI`.

## Отладка падений

- `runtime.mjs` сохраняет JSON‑детали по каждому прогону в `tests/.last-run.json` (gitignored).
- При падении `endings`‑прогона см. `finalLabel`, `reached`, `pageerrors[]` в этом файле. Часто причина — новый `wait N`, во время которого мой скипер проскакивает; увеличьте `MAX_STEPS` в `runtime.mjs`.
