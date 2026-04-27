# Список багов: «Последний Атеист»

Снят headless-прогоном (Playwright + статический анализ скриптов) от 2026‑04‑27 на коммите `ee9602b`. Подробности проверки — в [`test-report.md`](test-report.md). Воспроизводится через `bun run test` (см. [`tests/README.md`](tests/README.md)).

Статусы: 🔴 high · 🟠 medium · 🟢 low. Метка ✅ означает, что баг уже исправлен в текущей рабочей копии.

**Текущий статус:** все 10 багов исправлены, `bun run test` показывает 12/12 зелёных (8 static + 4 runtime). См. итоговый раздел внизу.

---

## ✅ 🔴 BUG-001 · `Escape_Caught` не пишет ending в трекер

- **Файл:** `js/scripts/endings.js:1239–1257`
- **Симптом:** игрок, попавший на «Пойманы при попытке побега», увидит титры, но `tla_endings.escape_caught` не выставится — концовка не зачислится в счётчик.
- **Причина:** все остальные 28 концовок где-то делают `this.storage({ ending_reached: '<key>' })` (либо в `onChosen`, либо в первой `Function.Apply`). Здесь — нет ни в самом блоке, ни в двух `'Do': 'jump Escape_Caught'` (`endings.js:1222`, `:1233`).
- **Фикс:** в начало `Escape_Caught` добавить `Function.Apply` с `this.storage({ ending_reached: 'escape_caught' })`.
- **Обнаруживает тест:** `tests/runtime/endings.mjs` — прогон лейбла `Escape_Caught` не находит ключ в `tla_endings`.

## ✅ 🔴 BUG-002 · Полоска жизни никогда не обновляется

- **Файл:** `js/effects.js:109–125`, `index.html:116–117`
- **Симптом:** `#life-fill` всегда визуально 100%; `life-flash`/`life-danger` анимации не срабатывают.
- **Причина:** в `updateLifeMeter` ранний `return` если хотя бы один из `#life-fill`, `#life-text`, `#life-meter` не найден. В HTML отсутствует `<div id="life-text">` — функция ВСЕГДА выходит до `fill.style.width = …`.
- **Фикс:** добавить `<span id="life-text"></span>` рядом с `#life-fill` (или, проще, убрать ссылку на `text` если индикатор только графический).
- **Обнаруживает тест:** `tests/runtime/ui.mjs` — после прогона нескольких `Choice` с потерей HP `#life-fill.style.width` остаётся `100%`.

## ✅ 🟠 BUG-003 · Узел `Ending_EscapeCaught` в ROUTE_MAP не совпадает с реальным лейблом

- **Файл:** `js/main.js:123` и `:208` vs `js/scripts/endings.js:1239`
- **Симптом:** в карте рутов нода «Пойманы» никогда не подсветится как посещённая, потому что `isLabelVisited('Ending_EscapeCaught')` всегда `false` — лейбл‑то называется `Escape_Caught`.
- **Фикс:** в `ROUTE_MAP.nodes` и `ROUTE_MAP.edges` переименовать `Ending_EscapeCaught` → `Escape_Caught`. (Менять имя лейбла нельзя — сломает уже имеющиеся сейвы.)
- **Обнаруживает тест:** `tests/static/route-map.mjs` — все `n.id` из ROUTE_MAP должны существовать как объявленные лейблы.

## ✅ 🟠 BUG-004 · `cauldron_eternal` отсутствует в ROUTE_MAP

- **Файл:** `js/main.js:99–126`
- **Симптом:** концовка достижима (`Ending_CauldronEternal` через `'dead'` ветки в `prologue.js:105` и `hell.js:773`), счётчик «X / 29» её учитывает, но в карте рутов узла «Вечный котёл» нет — игрок не увидит, как до неё дойти.
- **Фикс:** добавить `{ id: 'Ending_CauldronEternal', label: 'Вечный котёл', group: 'endings', ending: 'cauldron_eternal' }` и хотя бы одно ребро (от `Judgment_Verdict_Calc` или прологных смертельных нод).
- **Обнаруживает тест:** `tests/static/route-map.mjs` — ключи `ALL_ENDINGS` должны быть представлены `ending: 'X'` хотя бы в одной ноде.

## ✅ 🟠 BUG-005 · `installProceedGuard` пропускает `Wait period has not ended.`

- **Файл:** `js/main.js:311–313`
- **Симптом:** скип‑режим (где `setTimeout` ужат до 1 мс) и обычное проматывание во время `wait N` производят сотни unhandled `pageerror` в консоли. Сейчас игра выживает чисто за счёт того, что движок вытаскивает себя сам.
- **Причина:** `isRecoverableScriptError` матчит только `'Extra condition check failed.'`.
- **Фикс:** включить `'Wait period has not ended.'` в матч.
- **Обнаруживает тест:** `tests/runtime/proceed-guard.mjs` — спам `monogatari.proceed()` во время `wait` не должен генерировать unhandled rejection.

## ✅ 🟠 BUG-006 · Кнопки «Карта рутов» нет в главном меню

- **Файл:** `js/main.js:613–642` (`addRouteMapButton`)
- **Симптом:** в quick‑menu (in‑game) кнопка есть, в главном меню — нет. Чтобы посмотреть карту, надо стартовать новую игру.
- **Причина:** `addRouteMapButton` запускается один раз на init, когда `[data-screen="main"]` ещё скрыт за splash, а `<main-menu>` не отрендерил кнопки в light‑DOM. Fallback `mainScreen.querySelector('div')` возвращает `null`, и `mainMapBtn` молча не добавляется.
- **Фикс:** наблюдать за main‑screen MutationObserver'ом (как уже сделано для `updateEndingCounter`) и добавлять кнопку, когда меню становится видимым; либо перерегистрировать через `monogatari.configuration('main-menu', …)`.
- **Обнаруживает тест:** `tests/runtime/ui.mjs` — после splash в DOM должен быть `#main-route-map-btn` или эквивалент.

## ✅ 🟢 BUG-007 · Credits хардкодят «из 28»

- **Файл:** `js/scripts/endings.js:1585`
- **Симптом:** на финальном экране титров «Концовки найдены: X из 28», в ALL_ENDINGS теперь 29 ключей, счётчик главного меню уже показывает «X / 29».
- **Фикс:** использовать `Object.keys(ALL_ENDINGS).length` (или хотя бы синхронно поднять число).
- **Обнаруживает тест:** `tests/static/endings.mjs` — текст «из 28» в `endings.js` должен совпадать с количеством записей в `ALL_ENDINGS`.

## ✅ 🟢 BUG-008 · QTE‑побег — мёртвый код

- **Файл:** `js/scripts/hell.js:1909`, `:1947`, `:1954`
- **Симптом:** тройка лейблов `Hell_QTE_Escape`/`Hell_QTE_Escaped`/`Hell_QTE_Caught` нигде не вызывается. Игроку сцена «УКЛОНИТЬСЯ! / Замереть» недоступна.
- **Фикс:** либо подсадить `jump Hell_QTE_Escape` в подходящем месте побега (например, в `Escape_Run` перед открытием двери), либо удалить три блока, чтобы не плодить ветку.
- **Обнаруживает тест:** `tests/static/labels.mjs` — все объявленные лейблы должны быть достижимы из `Prologue_Morning_Choice` (BFS по jump-графу).

## ✅ 🟢 BUG-009 · `#skip-btn` мелькает на главном меню

- **Файл:** `js/main.js:602–607`
- **Симптом:** на старте кнопка скип-кнопка видна на splash и на главном меню до первого тика интервала (≤500 мс).
- **Фикс:** при создании сразу ставить `style.display = 'none'`; в setInterval показывать только если активен лейбл, отличный от `Start`/`_SplashScreen`.
- **Обнаруживает тест:** `tests/runtime/ui.mjs` — `#skip-btn` должен быть скрыт пока активен splash/main.

## ✅ 🟢 BUG-010 · Storage / reset не симметричны

- **Файл:** `js/storage.js`, `js/script.js` (`resetStoryStateForNewGame`)
- **Симптом:** `name` есть в storage init, нет в reset; `alice_encountered` наоборот. На геймплей не влияет, но рассинхрон при старте «новой игры» поверх старого сейва выглядит как latent‑bug.
- **Фикс:** привести оба списка к одному набору.
- **Обнаруживает тест:** `tests/static/storage.mjs` — ключи `monogatari.storage(…)` и `resetStoryStateForNewGame` должны совпадать (с допустимым исключением для `player`).

---

## Итоги

После фиксов оба слоя автотестов зелёные:

```
=== STATIC CHECKS ===
✓ No dead `jump <Label>` references                                       — 282 jumps, 174 labels.
✓ All declared labels reachable from Prologue_Morning_Choice              — 174/174 reachable.
✓ ROUTE_MAP node IDs match declared labels                                — 72 nodes in ROUTE_MAP.
✓ ROUTE_MAP edges only reference known nodes                              — 82 edges.
✓ Every ALL_ENDINGS key has a node in ROUTE_MAP                           — 29/29.
✓ Each ALL_ENDINGS key has at least one `ending_reached: "<key>"`         — 29/29.
✓ Credits ending counter is wired to ALL_ENDINGS                          — динамический подсчёт.
✓ storage.js init keys === resetStoryStateForNewGame keys                 — 42 = 42.

=== RUNTIME CHECKS ===
✓ All 29 ALL_ENDINGS keys reached after direct jump                       — 29/29.
✓ Hell_Breakdown_Route / Hell_Secret_Check / Hell_Lilith_Visit_Check      — 10/10 гейтов.
✓ installProceedGuard ловит «Wait period has not ended.»                  — 0 unhandled rejection.
✓ UI: skip-btn, life meter, route map, main menu                          — 100%/20%, btn, overlay.

TOTAL: 12/12 passed.
```

Запуск:

```bash
bun run test          # static + runtime
bun run test:static   # только без браузера
bun run test:runtime  # только headless Chromium (нужен `bunx playwright install chromium` один раз)
```
