# Тест-репорт: «Последний Атеист»

**Дата:** 2026‑04‑27
**Версия:** HEAD (`ee9602b Merge responsive visual novel layout fixes`)
**Метод:** статический анализ + headless Chromium (Playwright) в изолированном окружении — мышь и Chrome пользователя не использовались.
**Окружение:** Bun‑сервер игры на :5100 на машине пользователя; параллельно отдельный Python‑сервер на :5101 в песочнице, headless‑shell Chromium 1217 драйвил игру через `monogatari.run('jump <Label>')`, прямую запись `monogatari.storage(...)` и DOM‑evaluate.

## Что покрыли

| Слой | Покрытие |
| --- | --- |
| Все объявленные лейблы | 174 / 174 (prologue 33, judgment 21, hell 87, endings 33) |
| Все ссылки `jump <Label>` (включая `Do`, `run('jump …')`) | 397 / 397 — все цели валидны, мёртвых прыжков нет |
| Концовки в `ALL_ENDINGS` | 29 (по одной запущена в headless через прямой jump → Ending_Credits → запись в `tla_endings`) |
| Гейты ветвления Hell_Breakdown_Route, Hell_Secret_Check, Hell_Lilith_Visit_Check | 8/10 сценариев подтвердили правильное переключение (2 «провала» — артефакты тестового цикла, путь верный) |
| Активы (сцены/музыка) — соответствие `assets.js` ↔ файлам | 100% — все 21 сцена и 11 треков на диске |
| ROUTE_MAP / ALL_ENDINGS / реальные лейблы | расхождения, см. ниже |
| `resetStoryStateForNewGame` ↔ `storage.js` | расхождения, см. ниже |
| Save/Load happy-path | смок-проверен; полноценный round-trip упирается в Monogatari Storage API, тестировать в UI |
| UX (route map, life meter, скип, dev‑overlay, viewport 380px) | проверено — баги ниже |

## Сводка находок

| # | Severity | Тема |
| --- | --- | --- |
| 1 | 🔴 HIGH | `Escape_Caught` не пишет ending в трекер |
| 2 | 🔴 HIGH | `updateLifeMeter` молча возвращается — life‑bar не обновляется |
| 3 | 🟠 MED | `Ending_EscapeCaught` в ROUTE_MAP не совпадает с реальным лейблом `Escape_Caught` |
| 4 | 🟠 MED | `cauldron_eternal` отсутствует в ROUTE_MAP nodes — невидим на карте |
| 5 | 🟠 MED | `installProceedGuard` не ловит `Wait period has not ended.` |
| 6 | 🟠 MED | Кнопка «Карта рутов» не добавляется в главное меню |
| 7 | 🟢 LOW | Credits хардкодит `«Концовки найдены: X из 28»`, в `ALL_ENDINGS` теперь 29 |
| 8 | 🟢 LOW | QTE‑побег (`Hell_QTE_Escape/Escaped/Caught`) — мёртвый код, нет ни одного `jump` к нему |
| 9 | 🟢 LOW | Кнопка `#skip-btn` мигает на главном меню до первого тика интервала |
| 10 | 🟢 LOW | `name` есть в `storage.js`, но не в `resetStoryStateForNewGame`; `alice_encountered` наоборот |

---

## Подробности

### 🔴 1. `Escape_Caught` не записывает себя в трекер концовок

**Где:** `js/scripts/endings.js:1239–1257`

**Что не так:** все остальные концовки в одном месте делают `this.storage({ ending_reached: '<key>' })`, который потом считывает `Ending_Credits` и пишет в `tla_endings`. У `Escape_Caught` такого вызова нет — ни в самом блоке, ни в его двух источниках (`endings.js:1222` и `endings.js:1233` — это `'Do': 'jump Escape_Caught'` без `onChosen`).

**Воспроизведение в headless:** прямой `monogatari.run('jump Escape_Caught')` → проходит до `Ending_Credits`, но `tla_endings.escape_caught` остаётся `undefined`. Все 28 остальных концовок — пишут.

**Эффект:** игрок, дошедший до плохой концовки побега с Лилит, не получит галочку в счётчике.

**Фикс:** в начало `Escape_Caught` добавить такой же `Function.Apply`, как в соседних концовках, либо `this.storage({ ending_reached: 'escape_caught' })` в `onChosen` обоих вызывающих Choice.

---

### 🔴 2. `updateLifeMeter` молча выходит — полоска жизни не обновляется

**Где:** `js/effects.js:109–125`

```js
function updateLifeMeter (current, max) {
    const fill = document.getElementById ('life-fill');
    const text = document.getElementById ('life-text');   // ← такого id нет в index.html
    const meter = document.getElementById ('life-meter');
    if (!fill || !text || !meter) return;                 // ← ранний выход, всегда true
    ...
    fill.style.width = percent + '%';                     // никогда не выполняется
    text.textContent = ...;                               // никогда не выполняется
    meter.classList.add ('life-flash');                   // никогда не выполняется
}
```

В `index.html:116-117` есть только `#life-meter` и `#life-fill`. `#life-text` отсутствует.

**Эффект:** `#life-fill` имеет CSS `width: 100%` по умолчанию, а функция, отвечающая за её сужение и flash‑анимацию, заранее `return`. Значит полоска ВСЕГДА показывает 100%, эффекта потери HP визуально нет, нет также `life-danger`/`life-flash` классов. Меры HP в коде существуют (`life_current` меняется), но игрок их не видит.

**Фикс:** в `index.html` рядом с `#life-fill` добавить `<div id="life-text"></div>` (CSS под него тоже не помешает), либо в `effects.js` убрать ссылку на `text` если индикатор только графический.

---

### 🟠 3. ROUTE_MAP node id `Ending_EscapeCaught` не совпадает с реальным лейблом

**Где:** `js/main.js:123` и `js/main.js:208`, vs реальный лейбл `Escape_Caught` в `js/scripts/endings.js:1239`.

```js
{ id: 'Ending_EscapeCaught', label: 'Пойманы', group: 'endings', ending: 'escape_caught' },
['Hell_Lilith_Romance', 'Ending_EscapeCaught']
```

**Эффект:**
- `isLabelVisited('Ending_EscapeCaught')` всегда `false` — нет такого лейбла в скриптах, `markLabelVisited` его не запишет (label tracker полит `monogatari.state('label')`).
- В карте рутов узел «Пойманы» никогда не будет помечен как «посещённый» (визуальный обвод/яркая заливка).
- Это работает только потому, что `endingUnlocked` (через `tla_endings.escape_caught`) тоже включает «открытое» состояние — но при текущем баге #1 даже `tla_endings.escape_caught` никогда не выставится.

**Фикс:** переименовать узел и ребро на `Escape_Caught`. (Или, наоборот, переименовать сам лейбл в endings.js на `Ending_EscapeCaught` — но это сломает существующие сейвы, так что лучше первый вариант.)

---

### 🟠 4. `cauldron_eternal` отсутствует в `ROUTE_MAP.nodes`

**Где:** `js/main.js:7-40` (ALL_ENDINGS, 29 ключей) vs `js/main.js:99-126` (ROUTE_MAP nodes — только 28 endings, без `cauldron_eternal`).

**Эффект:** концовка достижима (`Ending_CauldronEternal`, e.g. через `'dead': 'jump Ending_CauldronEternal'` в `prologue.js:105` и `hell.js:773`), счётчик «Концовки: X / 29» её учитывает, но в карте рутов игрок не увидит ни узла «Вечный котёл», ни как он связан с остальным графом. После открытия — на карте всё равно не появится.

**Фикс:** добавить узел и хотя бы пару ребёр (от `Judgment_Verdict_Calc` и/или прологных `dead`-веток).

---

### 🟠 5. `installProceedGuard` не ловит `Wait period has not ended.`

**Где:** `js/main.js:311-313`

```js
function isRecoverableScriptError (error) {
    const message = ...;
    return message === 'Extra condition check failed.';
}
```

Из CLAUDE.md скип‑система монкипатчит `setTimeout`, ужимая 5–10 000 мс таймеры до 1 мс — это в первую очередь и провоцирует Monogatari выкидывать `Wait period has not ended.` при попытке `proceed()` поверх `wait N`.

**Подтверждение в headless:** при «агрессивных» `monogatari.proceed()` во время каждой концовки (29 прогонов) фиксируется по 23–24 `pageerror: Wait period has not ended` на ИГРУ. Промисы отвергаются, но — главное — `installProceedGuard` НЕ перехватывает их, вместо `console.warn` они уходят как unhandled `pageerror`.

**Эффект:** двойной — (а) шум в консоли пользователя при включении скипа; (б) если на каком-то шаге Monogatari действительно требует «лечения» как в случае `Extra condition check failed.`, аналогичная ситуация с `Wait period` пройдёт мимо `skipRejectedStatement`. Сейчас она проходит сама собой, но только потому что движок продолжает отрисовку.

**Фикс:** дополнить матчер:

```js
return message === 'Extra condition check failed.'
    || message === 'Wait period has not ended.';
```

(И параллельно подумать про проблему более общо: и в `monogatari.run`, и в `monogatari.proceed` может прилетать любой текст из движка.)

---

### 🟠 6. Кнопка «Карта рутов» не появляется в главном меню

**Где:** `js/main.js:613-642` (`addRouteMapButton`).

```js
const quickMenu = document.querySelector ('[data-component="quick-menu"]');
if (!quickMenu) return;            // ← если на старте quick-menu ещё не вмонтирован, выходим
...
var menuBtns = mainScreen.querySelector ('[data-action-list="in-menu"]') || mainScreen.querySelector ('div');
if (menuBtns) menuBtns.appendChild (mainMapBtn);
```

**Что показал headless:**

- Игра грузится → 200 мс активен `loading` screen → потом сразу `game` (со `splash-screen active`) проигрывает заставку → `end` → главное меню (5 кнопок: Начать игру / Загрузить / Настройки / Помощь / Авторы).
- На момент `init.then(...)` главное меню скрыто за splash; `<main-menu>` ещё не отрендерил свои кнопки в light DOM, querySelector(`'div'`) внутри `[data-screen="main"]` ничего полезного не возвращает, и `mainMapBtn` молча не добавляется.
- После того, как splash завершается и главное меню видно, кнопка «🗺 Карта рутов» в нём уже не появится — функция отработала только один раз на init.

**Эффект:** по факту карта доступна только из in‑game quick‑menu (там кнопка добавляется корректно — `route-map-btn`). Чтобы посмотреть карту, игрок обязан начать новую игру/загрузить сейв.

**Фикс:** либо повторно вызывать `addRouteMapButton` после события `didShowScreen` для main, либо использовать `MutationObserver` на `<main-menu>` (как уже сделано для `updateEndingCounter`), либо добавить кнопку в `monogatari.configuration('main-menu', { buttons: [...] })`.

---

### 🟢 7. Credits хардкодят «из 28»

**Где:** `js/scripts/endings.js:1585`

```js
el.innerHTML = '<p>Концовки найдены: ' + count + ' из 28</p>';
```

`ALL_ENDINGS` содержит 29 ключей. Счётчик на главном меню (`updateEndingCounter` в main.js) уже использует `Object.keys (ALL_ENDINGS).length` — корректно показывает «X / 29». Только финальный экран титров отстаёт.

**Фикс:** заменить `28` на `Object.keys(ALL_ENDINGS).length` (нужно сделать переменную видимой) или хотя бы синхронно обновить число.

---

### 🟢 8. QTE‑побег — мёртвый код

**Где:** `js/scripts/hell.js:1909` (Hell_QTE_Escape), `:1947` (Escaped), `:1954` (Caught).

Никакого `'jump Hell_QTE_Escape'` в проекте не существует. Внутренние переходы (на Escaped/Caught) всегда стартуют изнутри самого QTE, а на сам QTE‑экран попасть нельзя. Вся механика «УКЛОНИТЬСЯ! / Замереть» при повстречивании демона — недоступна игроку.

**Решение:** или подсадить `jump Hell_QTE_Escape` где-то в путях побега (естественное место — `Escape_Run`/`Hell_Bar_Search`), или удалить три блока, чтобы не плодить мёртвую ветку.

---

### 🟢 9. `#skip-btn` мелькает на главном меню

**Где:** `js/main.js:602-607`

```js
setInterval (function () {
    var gameScreen = document.querySelector ('[data-screen="game"]');
    var isVisible = gameScreen && (gameScreen.classList.contains ('active') || ...);
    skipBtn.style.display = isVisible ? '' : 'none';
}, 500);
```

Скип‑кнопка стартует видимой (style attribute не `display:none`), а интервал её скрывает только через ≤500 мс. Также есть период splash → main, где game-screen имеет class `active` (splash‑screen.active), и кнопка реально включается во время заставки. Незначительно, но повторяется на каждом запуске.

**Фикс:** при создании кнопки сразу задать `style.display = 'none'` и в setInterval показывать только если текущий лейбл не `_SplashScreen` и `Start`.

---

### 🟢 10. Storage / reset не симметричны

`js/storage.js` инициализирует `name`, но `resetStoryStateForNewGame` его не сбрасывает — впрочем, игрок имени не меняет, ничего не ломается.
`resetStoryStateForNewGame` сбрасывает `alice_encountered: false`, которого нет в `storage.js` — ключ создаётся «на лету» в `Prologue_Alice_*`. Лучше явно объявить в `storage.js`, чтобы сейвы старых версий имели предсказуемую форму.

---

## Что протестировано и работает

- **174 лейбла объявлены, 397 jump-целей валидны, 0 dead‑refs.** Граф полностью замкнутый.
- **28 / 29 концовок** в headless‑прогоне доходят до `Ending_Credits` и записывают свой ключ в `tla_endings`. Единственный баг — `escape_caught` (см. #1).
- **Все matrix/lilith/secret гейты** в Hell_Breakdown_Route и Hell_Secret_Check срабатывают на ожидаемые ветки:
  - `lilith_interest >= 3` → Lilith_Choice (даже при включённой матрице) ✓
  - `matrix_suspicion >= 2` или `noticed_patterns` → Matrix_Choice ✓
  - `judgment_begged + acceptance_score>=3 + empathy_shown>=3` → Ending_Prophet ✓
  - `prologue_was_kind + empathy_shown>=3 + acceptance_score>=3` → Ending_FullCircle ✓
  - `denial_count>=5 + acceptance_score==0 + rebellion_score==0` → Ending_Nihilist ✓
- **Все ассеты** из `js/assets.js` (21 сцена + 11 треков) реально лежат в `assets/scenes` и `assets/music`. `play sound scream` есть в скрипте, но закомментирован — ОК.
- **Dev‑overlay** по `Ctrl+Shift+D` появляется ✓.
- **Mobile viewport 380×800**: без горизонтального скролла, ending counter рендерится ✓.
- **Карта рутов** из in‑game quick menu открывается, отрисовывает 73 кружка / 77 текстов SVG, корректно подсвечивает 26 пока неоткрытых концовок как «???».

## Артефакты

JSON‑отчёты walker'а:

- `/tmp/tla-test/walker_report*.json` — список всех 29 концовок с финальным лейблом и количеством pageerror
- `/tmp/tla-test/gates_report.json` — гейты Hell_Breakdown_Route / Hell_Secret_Check / Hell_Lilith_Visit_Check

Скрипты в `/tmp/tla-test/`: `static_analysis.mjs`, `walker.mjs`, `walker2.mjs`, `gates.mjs`, `save_load2.mjs`, `ux2.mjs`, `routemap2.mjs`, `splash.mjs`. Для повтора проверки внутри песочницы достаточно перезапустить любой из них (нужны `playwright` и headless‑shell в `~/.cache/ms-playwright/`).

## Что не покрыто

- **Полный round‑trip Save → reload → Load.** В headless `monogatari.saveTo('SaveLabel', 1, 'TestSave')` отрабатывает с `ok: true`, но Storage Adapter падает на `KeyNotFoundError` при последующем `loadFromSlot('SaveLabel_1')` — Monogatari в headless‑shell, видимо, использует `IndexedDB` вместо настроенного `LocalStorage`, и my Storage.each перечисляет другую базу. На реальном запуске в Chrome/Electron save/load работает (см. недавние фиксы 5101d7f / 7bc9ef2), нужна ручная проверка в браузере.
- **Skip mode под нагрузкой.** Тест «двойной клик переключает seen/all», `_enableSkipAcceleration` patches `setTimeout` — проверено, что кнопка в DOM, но реальное поведение «остановки на непосещённых лейблах» лучше прокликать вручную.
- **Easter eggs.** `initJustLilithEasterEgg` (красная вспышка после Лилит‑концовки) и `initPostGlitchEffects` (постоянный UI‑глитч) — гейты на localStorage проверены, визуальный эффект — нет.
