---
Назва: Стандарти `data-testid`, CSS-класів та іменування компонентів
Версія: 10.0
Фреймворк: SvelteKit 2 + Svelte 5 (Runes)
Профіль: universal
Пріоритет: recommended
Критичність: MEDIUM
Ціна ігнорування: локатори крихкі, зв'язок «тест ↔ компонент ↔ файл» рветься; ламаються тести, а не сайт
Скіп-якщо: у проєкті немає жодних автоматичних тестів
Опис: Уніфіковані конвенції для `data-testid`, CSS-класів та назв компонентів — щоб тести, QA та AI-агенти однозначно розпізнавали тип і призначення елемента
---

# Стандарти `data-testid` та іменування

Конвенції іменування для атрибутів `data-testid` (E2E- та компонентні тести), CSS-класів і назв Svelte-компонентів. Мета: за самою назвою визначати **тип** елемента (кнопка / поле / контейнер / модалка) та його **роль** в UI.

Правила CRITICAL/HIGH — обов'язкові в межах профілю застосовності (див. frontmatter). MEDIUM/LOW — типові конвенції, від яких можна відхилитися з коротким обґрунтуванням. Розділи, що стосуються лише одного профілю, позначені [server]/[static].

---

## 🚫 ЖОРСТКІ ОБМЕЖЕННЯ (ANTI-PATTERNS)

| Рівень | Заборона | Правильна альтернатива |
|--------|----------|----------------------|
| **HIGH** | Дублікати `data-testid` на одній сторінці — E2E стають недетермінованими | Кожен id унікальний у межах сторінки; перевірки § 1.9 |
| **HIGH** | Ключовий інтерактивний елемент без стабільного локатора (ні ролі з іменем, ні `data-testid`) | Спершу `getByRole` / `getByLabel`; `data-testid` — де семантики недостатньо (§ 1.1) |
| **HIGH** | Стан UI лише CSS-класом (`.active`) — невидимий для читалки й крихкий у тестах | Стан — через `aria-*` / `data-state` (§ 2.3) |
| **MEDIUM** | `data-testid` без канонічного типу (`about-description`, `page-apps`) | Схема § 1.2, канон § 1.3 |
| **MEDIUM** | Змішані конвенції (`save-btn` поряд із `btn-save` і `save-button`) | Один формат на проєкт (§ 1.2) |
| **MEDIUM** | Заборонене слово в позиції типу (`-wrapper`, `-dialog`, `-content`…); `button` — будь-де | Таблиця замін (§ 1.4) |
| **MEDIUM** | Недетермінований id: `Math.random()`, `crypto.randomUUID()`, `Date.now()` | Ключ даних, індекс чи значення переліку (§ 1.6) |
| **MEDIUM** | Голий вираз `data-testid={testId}` — типу не видно ніде | Префікс пропом, тип дописаний у шаблоні (§ 1.7) |
| **MEDIUM** | `data-testid` на декоративній чи оформлювальній обгортці | Не додавати (§ 1.5) |
| **MEDIUM** | Стилі чи код застосунку чіпляються за `data-testid` | Клас або атрибут стану; testid — лише для тестів (§ 2.2) |

---

## 1. `data-testid`

### 1.1 Канон локаторів

Пріоритет локаторів у тестах:

1. **Семантичні:** `getByRole`, `getByLabel`, `getByText`.
2. **`data-testid`** — коли семантики недостатньо: динамічний текст, i18n, дублікати за роллю.

`data-testid` не замінює семантику й доступність — він доповнює їх там, де роль або текст нестабільні.

- [ ] **HIGH.** Ключовий інтерактивний елемент має стабільний локатор: роль з
      іменем, підпис або `data-testid`. Без жодного тест прив'язується до позиції
      чи CSS-класу й ламається від правки розмітки, яка поведінки не змінила.

> **Локалізований проєкт.** Якщо весь текст UI проходить через словник, `getByText`
> і `getByRole({ name })` прив'язують тест до тексту перекладу: правка перекладу
> червонить тест, хоча поведінка не змінилася. Тому там `data-testid` — **основний**
> локатор, і це прямий наслідок винятку «i18n». Роль і ім'я лишаються обов'язковими
> для *доступності* ([ACCESSIBILITY-v10.md](ACCESSIBILITY-v10.md)), а
> `getByRole('dialog')` чи `getByRole('button')` без імені — законні й тут.

### 1.2 Формат

```text
[<scope>-]<feature>[-<modifier>]-<type>[-<discriminator>]
```

| Частина | Обов'язковість | Що це | Приклад |
|---------|----------------|-------|---------|
| `<scope>` | опційно | домен/фіча верхнього рівня; у великих проєктах гарантує унікальність між фічами | `admin-`, `auth-` |
| `<feature>` | **так** | що це за елемент у предметній області | `email`, `articles`, `settings` |
| `<modifier>` | опційно | варіант **самого елемента** | `mobile`, `compact` |
| `<type>` | **так** | канонічний тип із § 1.3 | `btn`, `input`, `modal` |
| `<discriminator>` | опційно | **який саме** екземпляр: динамічний id, число або значення переліку | `{article.id}`, `2`, `general` |

**Правило типу** (його й виконує перевірка § 1.9.1): у id є хоча б один
канонічний сегмент § 1.3, і **останній** із них — тип. Після типу стоять лише
дискримінатори: динамічна частина (`{…}`, `${…}`), число або значення переліку — і
жоден із них не є забороненим словом § 1.4. Слово `button` заборонене в будь-якій
позиції.

```text
news-card-{id}                     ✓ тип card, дискримінатор — id
admin-articles-edit-{id}-btn       ✓ тип btn; id стоїть перед типом як частина фічі
settings-tab-general               ✓ тип tab, дискримінатор — значення переліку general
test-mode-dir-btn-up-left          ✓ тип btn, дискримінатор — напрямок
about-description                  ✗ типу немає взагалі
{tp}-submit-button                 ✗ «button» — заборонене слово
confirm-modal-content              ✗ після типу modal — заборонене «content»
dark-mode-toggle-btn               ✗ два інтерактивні типи підряд (§ 1.3)
```

Інші вимоги формату:

- [ ] **MEDIUM.** <a id="TID-FORMAT"></a> Кожен `data-testid` — за схемою вище, з канонічним типом (§ 1.3) останнім канонічним сегментом. Розділювач `-`, лише `a–z`, `0–9` і дефіс: без підкреслень, кирилиці, емодзі, великих літер, подвійних і крайніх дефісів. Динамічна частина теж мусить давати такі значення — рантайм-перевірка § 1.9.2 міряє вже підставлені.
- **Тип — суфікс, не префікс** — обґрунтування після таблиці § 1.3.
- Без UUID і випадкових значень; для списків — детермінований параметр (§ 1.6).

### 1.3 Канонічні типи

- [ ] **MEDIUM.** <a id="TID-TYPE-PAIRS"></a> **Два типи підряд, що описують той самий елемент, — помилка:** `-toggle-btn` (це або перемикач, або кнопка), `-error-hint` (це або помилка, або підказка). Перевірка § 1.9.1 ловить дві пари, які машина відрізняє впевнено: два **інтерактивні** типи підряд (`btn`, `link`, `input`, `textarea`, `checkbox`, `radio`, `select`, `toggle`, `slider`) і два типи **повідомлення** підряд (`message`, `error`, `hint`, `warning`, `status`).

**Складені** типи, де другий сегмент називає частину першого, — законні: `-list-item`, `-menu-item`, `-modal-title`, `-modal-header`, `-card-title`, `-progress-text`. Решту пар відрізняє лише зміст, і це пункт код-рев'ю.

**Ярус 1 — інтерактивні та структурні елементи** (обов'язковий тип-суфікс):

| Суфікс(и) | Тип елемента | Приклади |
|-----------|--------------|----------|
| `-btn` | кнопка (`<button>`, `[role="button"]`) | `auth-login-btn`, `modal-close-btn` |
| `-link` | гіперпосилання (`<a href>`) | `nav-home-link`, `about-social-link-facebook` |
| `-input`, `-textarea` | текстовий ввід (одно- та багаторядковий) | `auth-email-input`, `feedback-message-textarea` |
| `-checkbox`, `-radio`, `-select`, `-toggle`, `-slider`, `-option` | елементи вибору та перемикачі (`[role="switch"]` → `-toggle`); `-option` — варіант усередині select/radio-групи | `settings-notify-checkbox`, `dark-mode-toggle`, `pdf-option-ats` |
| `-form`, `-fieldset`, `-label` | форма, група полів, підпис | `auth-login-form`, `address-fieldset`, `auth-email-label` |
| `-modal`, `-drawer`, `-backdrop`, `-overlay` | модальне вікно (`<dialog>`, `[role="dialog"]`), бічна панель, підложка | `confirm-delete-modal`, `settings-drawer`, `menu-backdrop` |
| `-tooltip`, `-toast` | спливаюча підказка, снек-бар | `help-tooltip`, `error-toast` |
| `-card` | картка-контейнер з даними | `user-card`, `news-card-{id}` |
| `-list`, `-item` | список (`<ul>`/`<ol>`/`[role="list"]`) та його елемент | `notifications-list`, `notifications-list-item-{id}` |
| `-row`, `-cell` | рядок і комірка таблиці | `articles-row-{id}`, `articles-row-{id}-date-cell` |
| `-tabs`, `-tab`, `-panel` | контейнер вкладок, вкладка, контент вкладки/секції | `settings-tabs`, `settings-tab-general`, `settings-panel-general` |
| `-section`, `-header`, `-footer`, `-nav`, `-banner` | landmark-контейнери та наскрізна смуга | `hero-section`, `app-header`, `main-nav`, `ticker-banner` |
| `-menu`, `-menu-item` | меню та його пункти | `user-menu`, `user-menu-logout-item` |
| `-toolbar` | група кнопок дії | `editor-format-toolbar`, `articles-row-{id}-toolbar` |
| `-icon`, `-img` | іконка, зображення | `chevron-down-icon`, `avatar-img` |
| `-container` | узагальнений контейнер (**лише** коли жоден тип вище не підходить) | `chart-container` |

**Ярус 2 — read-only контент** (елемент нічого не приймає від користувача, лише показує):

| Суфікс | Що це | Приклади |
|--------|-------|----------|
| `-title` | заголовок блоку | `modal-title`, `hero-title-1` |
| `-text` | абзац/довільний текст | `about-description-text` |
| `-message` | повідомлення користувачеві (нейтральне/успіх/інфо) | `auth-info-message`, `game-empty-message` |
| `-error`, `-hint`, `-warning` | inline-помилка, підказка під полем, попередження | `auth-email-error`, `password-caps-warning` |
| `-value`, `-count` | обчислене значення, лічильник | `final-score-value`, `unread-count` |
| `-status` | стан процесу словами | `connection-status` |
| `-badge`, `-progress`, `-spinner`, `-skeleton` | бейдж, прогрес-бар, завантажувач, скелетон | `unread-badge`, `upload-progress`, `page-skeleton` |

> **Правило вибору:** тип відображає **HTML-семантику**, а не візуальний стиль. Кнопка, стилізована під посилання, — усе одно `-btn`. `<ul>` у ролі DnD-колонки — усе одно `-list`, а не `-section`.

**Чому суфікс, а не префікс:** при алфавітному сортуванні testid групуються за фічею (`auth-email-input`, `auth-login-btn` — поряд у grep і звітах E2E), а префікс (`btn-auth-login`) розкидає фічу між усіма `btn-*`; суфікс збігається з BEM (`.modal__close-button`) та іменуванням компонентів (`LoginButton.svelte`, § 3.1).

### 1.4 Заборонені слова й заміни

- [ ] **MEDIUM.** <a id="TID-BANNED-WORDS"></a> Слова з таблиці нижче не стоять у позиції типу, а `button` — ніде; перевіряє § 1.9.1.

Ці слова заборонені **в позиції типу**: останнім канонічним сегментом бути не можуть (вони не канонічні) і після типу стояти не можуть. Як частина назви фічі **перед** типом вони законні: `block-mode-toggle` у грі — режим блокування ходів, `rich-text-editor-container` — назва редактора. Заборона в будь-якій позиції змусила б перевірку боротися з предметною областю, і її б швидко вимкнули.

| Заборонено | Замінити на | Чому |
|------------|-------------|------|
| `button`, `buttons` | `btn`, `toolbar` | інакше в проєкті співіснують `-btn` і `-button` |
| `wrapper`, `wrap`, `box`, `root` | `container` (або прибрати testid, § 1.5) | нічого не говорять про тип |
| `block`, `area` | `section` | те саме |
| `group` | `fieldset` (форми), `toolbar` (кнопки дій), `section` (блоки UI) | три різні речі під одним словом |
| `content` | `panel` | «контент» — це не тип; `-body` допустимий лише як частина композита (`-modal-body`) |
| `grid` | `list` | сітка — це оформлення, а не семантика |
| `widget` | `card`, `panel` або `section` | занадто загальне |
| `display` | `value` | read-only значення |
| `switcher` | `select`, `toggle` або `tabs` | за реальною роллю |
| `trigger` | `btn` | якщо це клікабельний елемент, це кнопка |
| `help` | `hint` | синонім, обирайте один |
| `dialog`, `popup` | `modal` | один термін на тип |
| `step`, `dot`, `subtab` | `item`, `badge`, `tab` | дрібні синоніми канонічних типів |

**Виняток — `button` заборонене в будь-якій позиції**: щойно в проєкті співіснують `-btn` і `-button`, кожен локатор стає здогадкою про те, який із двох обрав автор. `menu-button-play` порушує правило так само, як `submit-button`.

> Якщо в проєкті вже багато заборонених слів і повна міграція дорога — § 1.10 описує, як мігрувати без червоного CI.

### 1.5 Коли додавати `data-testid`

**Додавати:**

- [ ] Будь-який елемент, з яким користувач взаємодіє: кнопка, посилання, поле, перемикач, пункт меню.
- [ ] Будь-який елемент, вміст якого тест перевіряє: повідомлення, лічильник, заголовок, стан.
- [ ] Контейнер, у межах якого тест шукає (`within(...)`): картка списку, рядок таблиці, модалка.
- [ ] Елемент, поява/зникнення якого і є перевіркою: тост, спінер, порожній стан.

**Не додавати:**

- [ ] Оформлювальні обгортки (`.container`, `.row`, `.inner`, `.spacer`), які існують лише заради CSS.
- [ ] Декоративні елементи з `aria-hidden="true"`: хвилі, градієнти, анімації, фонові SVG.
- [ ] Елементи, до яких уже є стабільний семантичний локатор і немає i18n-проблеми.

> Критерій в одну фразу: **якщо ви не можете назвати тест, який його шукатиме, — testid не потрібен.**

### 1.6 Параметризовані ID (списки, динамічні елементи)

```svelte
<script lang="ts">
  import { t } from '$lib/i18n';

  let { cards }: { cards: { id: string; title: string }[] } = $props();
</script>

{#each cards as card (card.id)}
  <article data-testid={`news-card-${card.id}`}>
    <h3>{card.title}</h3>
    <button type="button" data-testid={`news-card-${card.id}-edit-btn`}>{t('common.edit')}</button>
  </article>
{/each}
```

- [ ] Немає природного `id` → порядковий індекс: `gallery-item-{i}`.
- [ ] Є скінченна множина варіантів → **значення переліку, а не індекс**: `pdf-option-ats` стабільніший за `pdf-option-1`, бо переживає зміну порядку.
- [ ] Значення, що підставляється, саме відповідає формату § 1.2: `common_1` у локаторі — порушення, і `id` із підкресленням перед підстановкою перетворюють (`id.replaceAll('_', '-')`).
- [ ] **MEDIUM.** <a id="TID-DETERMINISTIC"></a> **Не** використовувати `crypto.randomUUID()`, `Math.random()` чи `Date.now()` — ні у виразі атрибута, ні через змінну скрипта (`const uid = crypto.randomUUID()` і `data-testid="item-{uid}-card"`): ID мають бути детермінованими між рендерами, інакше тест не має чого шукати, а сервер і клієнт дають різні значення. `$props.id()` детермінований і дозволений.

### 1.7 Композитні компоненти (проп `testId`)

Реюзний компонент (Button, Modal, Input) з кількома внутрішніми елементами приймає `testId` пропом як **префікс** і будує дочірні ID, дописуючи тип **статично**:

```svelte
<!-- фрагмент: ілюстрація § 1.7 — модалка проєкту з пропом testId, файл не дається -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { X } from '@lucide/svelte';
  import { t } from '$lib/i18n';

  let { testId, title, children, onclose }: {
    testId: string;
    title: string;
    children: Snippet;
    onclose: () => void;
  } = $props();

  const id = $props.id();
  let dialog = $state<HTMLDialogElement>();

  $effect(() => {
    dialog?.showModal();
  });
</script>

<dialog bind:this={dialog} aria-labelledby="{id}-title" {onclose} data-testid={`${testId}-modal`}>
  <header data-testid={`${testId}-modal-header`}>
    <h2 id="{id}-title" data-testid={`${testId}-modal-title`}>{title}</h2>
    <button
      type="button"
      class="close-button"
      aria-label={t('dialog.close')}
      onclick={() => dialog?.close()}
      data-testid={`${testId}-modal-close-btn`}
    >
      <X aria-hidden="true" />
    </button>
  </header>
  <div data-testid={`${testId}-modal-body`}>{@render children()}</div>
</dialog>
```

`<Modal testId="confirm-delete" …>` згенерує `confirm-delete-modal`, `confirm-delete-modal-close-btn` тощо. Модальність, `Escape` і повернення фокуса дає сам `<dialog>` ([ACCESSIBILITY § 4.4](ACCESSIBILITY-v10.md#A11Y-MODAL-DIALOG)); кнопка закриття носить спільний клас `close-button` ([UI-ELEMENTS § 1.3](UI-ELEMENTS-v10.md#UIE-CLOSE-CLASS)).

- [ ] Той самий підхід — для **станів**, а не лише для структури: `${testId}-caps-warning`, `${testId}-layout-warning`. Тест отримує локатор на стан, не вгадуючи текст.
- [ ] **MEDIUM.** <a id="TID-STATIC-TYPE"></a> **Тип у шаблоні статичний.** Префікс, що приходить пропом, перевірка § 1.9.1 бачить як `x` і валідує решту сегментів; голий вираз `data-testid={testId}` вона розібрати не може й вважає порушенням — тип такого id не видно ніде.

### 1.8 Політика перейменування чинних testid

Перейменування testid — це зміна публічного контракту з тестами. Порядок:

- [ ] Знайти всі посилання: `grep -rn "стара-назва" tests/ e2e/ src/` — включно з рядками у `page.getByTestId()`, `data-testid=` у тестах і документації.
- [ ] Перейменувати **атрибут і всі посилання одним комітом**. Розділені коміти дають червоний CI на кожному проміжному стані.
- [ ] Якщо testid використовує зовнішня команда QA або synthetic-моніторинг (стратегія B, § 1.11) — спершу продублювати (`data-testid` новий + `data-testid-legacy` старий), дати цикл релізу, потім прибрати.
- [ ] Ніколи не перейменовувати «за схожістю» без перевірки типу елемента. Типова помилка: `auth-error` → `auth-error-hint`, де `-error` уже був канонічним типом, а `-hint` — це інший тип (підказка, а не помилка).

### 1.9 Перевірка testid: статична й рантайм

Дві перевірки, що доповнюють одна одну. **Обидві** — у CI.

- [ ] **HIGH.** <a id="TID-UNIQUE"></a> Жодного дубліката `data-testid` у межах
      компонента (§ 1.9.1) і на відмальованій сторінці (§ 1.9.2): дія над
      локатором із двома елементами падає зі strict mode violation, і тест пишуть
      через `.nth()`, прив'язаним до порядку. Повторюваний елемент несе в локаторі
      свій ключ (§ 1.6).

#### 1.9.1 Статична перевірка по джерелах — основна

Бачить усі `data-testid` у джерелах, включно з тими, що всередині `{#if}`, модалок і рідкісних гілок помилок, — тобто саме тими, до яких браузерна перевірка ніколи не дістанеться. Єдина, що здатна валідувати формат § 1.2–§ 1.4. Розмітку розбирає компілятор Svelte: регулярка не бачить виразу `data-testid={…}`, спотикається об `>` у стрілковій функції й читає testid із коментарів та `<style>`.

Файл має підпадати під `test.include` проєкту. Перевірка лише читає файли, тому середовище закріплене на `node` docblock-ом: інакше в проєкті без `jsdom` вона не запуститься.

```typescript
// src/testid-conventions.test.ts
// @vitest-environment node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'svelte/compiler';
import { describe, expect, it } from 'vitest';

const CANON = new Set([
    // інтерактивні
    'btn', 'link', 'input', 'textarea', 'checkbox', 'radio', 'select', 'toggle', 'slider', 'option',
    // форми
    'form', 'fieldset', 'label', 'error', 'hint',
    // оверлеї
    'modal', 'drawer', 'backdrop', 'overlay', 'tooltip', 'toast',
    // структура
    'card', 'list', 'item', 'row', 'cell', 'tabs', 'tab', 'panel',
    'section', 'header', 'footer', 'nav', 'banner', 'menu', 'toolbar', 'container',
    // медіа
    'icon', 'img',
    // read-only контент
    'title', 'text', 'message', 'warning', 'value', 'count', 'status',
    'badge', 'progress', 'spinner', 'skeleton'
]);

/** Заборонено в позиції типу (§ 1.4) → на що замінити. */
const BANNED_AS_TYPE: Record<string, string> = {
    wrapper: 'container', wrap: 'container', box: 'container', root: 'container',
    block: 'section', area: 'section', group: 'fieldset | toolbar | section',
    content: 'panel', grid: 'list', widget: 'card | panel | section', display: 'value',
    switcher: 'select | toggle | tabs', trigger: 'btn', help: 'hint',
    dialog: 'modal', popup: 'modal', step: 'item', dot: 'item | badge', subtab: 'tab'
};

/** Заборонено в будь-якій позиції. */
const BANNED_ANYWHERE: Record<string, string> = { button: 'btn', buttons: 'btn | toolbar' };

/** Два сусідні типи з однієї групи описують той самий елемент двічі (§ 1.3). */
const SAME_ELEMENT_GROUPS = [
    new Set(['btn', 'link', 'input', 'textarea', 'checkbox', 'radio', 'select', 'toggle', 'slider']),
    new Set(['message', 'error', 'hint', 'warning', 'status'])
];

/** Легасі-id, що чекають на міграцію (§ 1.10). Список тільки скорочується. */
const LEGACY_ALLOWED = new Set<string>([]);

/** Свідомі повтори в межах файлу: той самий елемент у взаємовиключних гілках {#if}/{:else}. */
const ALLOWED_DUPLICATES = new Set<string>([]);

/** Динамічна частина стає окремим сегментом `x`: `…-link{suffix}` не злипається в `linkx`. */
const DYNAMIC = 'x';

type AstNode = { type?: string; name?: string; value?: unknown; data?: string; start?: number; end?: number; [key: string]: unknown };
type Found = { id: string; file: string; opaque?: string; random?: boolean };

const svelteFiles = (dir: string): string[] =>
    readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) return ['node_modules', '.svelte-kit', 'build'].includes(entry) ? [] : svelteFiles(full);
        return entry.endsWith('.svelte') ? [full.replace(/\\/g, '/')] : [];
    });

function walk(node: unknown, visit: (n: AstNode) => void): void {
    if (Array.isArray(node)) return node.forEach((child) => walk(child, visit));
    if (!node || typeof node !== 'object') return;
    const n = node as AstNode;
    if (typeof n.type === 'string') visit(n);
    for (const [key, value] of Object.entries(n)) if (key !== 'metadata' && key !== 'parent') walk(value, visit);
}

/** Рядкові варіанти виразу: літерал, шаблон (`${…}` → `{x}`), гілки тернарника; інакше null. */
function variants(expr: AstNode): string[] | null {
    if (expr.type === 'Literal') return typeof expr.value === 'string' ? [expr.value] : null;
    if (expr.type === 'TemplateLiteral') {
        const quasis = expr.quasis as { value: { cooked: string } }[];
        return [quasis.map((q, i) => q.value.cooked + (i < quasis.length - 1 ? '{x}' : '')).join('')];
    }
    if (expr.type === 'ConditionalExpression') {
        const a = variants(expr.consequent as AstNode);
        const b = variants(expr.alternate as AstNode);
        return a && b ? [...a, ...b] : null;
    }
    return null;
}

/** Джерела випадковості: у виразі атрибута чи в ініціалізаторі змінної скрипта. */
const RANDOM = /randomUUID|Math\.random|Date\.now|performance\.now|getRandomValues|nanoid|uuid\w*\(/;

/** Змінні скрипта з випадковим значенням: `const uid = crypto.randomUUID()`, `const key = uid + '-a'`. */
function randomNames(source: string, scripts: unknown[]): Set<string> {
    const decls: { name: string; init: string }[] = [];
    for (const script of scripts) {
        walk(script, (n) => {
            const id = n.id as AstNode | undefined;
            const init = n.init as AstNode | undefined;
            if (n.type === 'VariableDeclarator' && id?.type === 'Identifier' && init) decls.push({ name: String(id.name), init: source.slice(init.start, init.end) });
        });
    }
    const names = new Set<string>();
    const mentions = (text: string) => RANDOM.test(text) || [...names].some((name) => new RegExp(`(?<![\\w$])${name}(?![\\w$])`).test(text));
    for (let changed = true; changed; ) {
        changed = false;
        for (const d of decls) {
            if (names.has(d.name) || !mentions(d.init)) continue;
            names.add(d.name);
            changed = true;
        }
    }
    return names;
}

function collect(file: string): Found[] {
    const source = readFileSync(file, 'utf8');
    const ast = parse(source, { modern: true });
    const random = randomNames(source, [ast.instance?.content, ast.module?.content]);
    const isRandom = (text: string) => RANDOM.test(text) || [...random].some((name) => new RegExp(`(?<![\\w$.])${name}(?![\\w$])`).test(text));
    const found: Found[] = [];
    walk(ast.fragment, (n) => {
        if (n.type !== 'Attribute' || n.name !== 'data-testid') return;
        const value = n.value;
        if (value === true) {
            found.push({ id: '', file });
            return;
        }
        const parts = (Array.isArray(value) ? value : [value]) as AstNode[];
        const [only] = parts;
        if (parts.length === 1 && only?.type === 'ExpressionTag') {
            const expr = only.expression as AstNode;
            const text = source.slice(expr.start, expr.end);
            const ids = variants(expr);
            if (!ids) found.push({ id: text, file, opaque: text });
            else ids.forEach((id) => found.push({ id, file, random: isRandom(text) }));
            return;
        }
        const id = parts.map((p) => (p.type === 'Text' ? p.data : '{x}')).join('');
        found.push({ id, file, random: parts.some((p) => p.type === 'ExpressionTag' && isRandom(source.slice(p.start, p.end))) });
    });
    return found;
}

const segmentsOf = (id: string) => id.replace(/\$?\{[^}]*\}/g, `-${DYNAMIC}-`).split('-').filter(Boolean);
const isDiscriminator = (s: string) => !CANON.has(s) && !(s in BANNED_AS_TYPE);

/** Порушення формату одного id (§ 1.2–§ 1.4); порожній перелік — id правильний. */
export function idProblems(id: string): string[] {
    const problems: string[] = [];
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id.replace(/\$?\{[^}]*\}/g, DYNAMIC))) problems.push('лише a–z, 0–9 і одинарні дефіси');
    const segs = segmentsOf(id);
    const typeAt = segs.map((s) => CANON.has(s)).lastIndexOf(true);
    if (typeAt < 0) {
        const last = [...segs].reverse().find((s) => s !== DYNAMIC && !/^\d+$/.test(s)) ?? '';
        problems.push(last in BANNED_AS_TYPE ? `«${last}» → ${BANNED_AS_TYPE[last]}` : 'немає канонічного типу');
    }
    for (const s of segs.slice(typeAt + 1)) if (typeAt >= 0 && !isDiscriminator(s)) problems.push(`після типу «${s}» → ${BANNED_AS_TYPE[s]}`);
    for (const s of segs) if (s in BANNED_ANYWHERE) problems.push(`«${s}» → ${BANNED_ANYWHERE[s]}`);
    segs.forEach((s, i) => {
        const next = segs[i + 1];
        if (next && SAME_ELEMENT_GROUPS.some((g) => g.has(s) && g.has(next))) problems.push(`два типи підряд: ${s}-${next}`);
    });
    return problems;
}

describe('конвенції data-testid (TESTID-AND-NAMING § 1.9.1)', () => {
    const all = svelteFiles('src').flatMap(collect);
    const checked = all.filter(({ id }) => !LEGACY_ALLOWED.has(id));

    it('знаходить testid у джерелах — перевірка жива', () => {
        expect(all.length).toBeGreaterThan(0);
    });

    it('тип видно в шаблоні: без голих виразів (§ 1.7)', () => {
        const bad = all.filter((f) => f.opaque).map((f) => `${f.file}: data-testid={${f.opaque}}`);
        expect(bad).toEqual([]);
    });

    it('формат, канонічний тип, заборонені слова, пари типів (§ 1.2–§ 1.4)', () => {
        const bad = checked
            .filter((f) => !f.opaque)
            .flatMap((f) => idProblems(f.id).map((p) => `${f.file}: ${f.id} — ${p}`));
        expect(bad).toEqual([]);
    });

    it('немає недетермінованих id (§ 1.6)', () => {
        expect(all.filter((f) => f.random).map((f) => `${f.file}: ${f.id}`)).toEqual([]);
    });

    it('немає дублікатів у межах одного компонента', () => {
        // Динамічні id пропускаються: той самий шаблон дає різні значення в DOM.
        const dupes: string[] = [];
        const seen = new Set<string>();
        for (const { id, file } of all) {
            if (id.includes('{') || ALLOWED_DUPLICATES.has(id)) continue;
            const key = `${file}\u0000${id}`;
            if (seen.has(key)) dupes.push(`${file}: ${id}`);
            seen.add(key);
        }
        expect(dupes).toEqual([]);
    });
});
```

> **Чому «в межах файлу», а не «в межах проєкту».** Той самий id у двох компонентах, що ніколи не показуються разом (форма входу й форма відновлення пароля), — не помилка, і статично довести протилежне неможливо. Дублікат усередині одного компонента — помилка завжди, крім взаємовиключних гілок `{#if}/{:else}`, які вносяться в `ALLOWED_DUPLICATES` явно. Колізії між компонентами ловить § 1.9.2 над справжнім DOM.

#### 1.9.2 Playwright-інваріант — доповнення

Ловить те, чого статика не бачить за побудовою: той самий компонент, відрендерений на сторінці двічі, і **підставлені** значення динамічних частин (`beta-check-common_1-item`).

```typescript
// tests/e2e/testid-invariants.spec.ts
import { expect, test } from '../fixtures';
import { gotoHydrated } from '../helpers/hydration';
import { routes } from './routes';

const FORMAT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

test('data-testid на кожному маршруті: унікальні й у форматі § 1.2', async ({ page }) => {
    // Перелік — у тілі тесту: читання build/ на імпорті валило б check:tests до збірки (ACCESSIBILITY § 10.3).
    const paths = routes();
    test.setTimeout(Math.max(30_000, paths.length * 5_000));
    let total = 0;
    for (const path of paths) {
        await test.step(path, async () => {
            await gotoHydrated(page, path);
            const ids = await page.locator('[data-testid]').evaluateAll((els) => els.map((el) => el.getAttribute('data-testid') ?? ''));
            total += ids.length;
            expect.soft([...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))], `${path}: дублікати`).toEqual([]);
            expect.soft(ids.filter((id) => !FORMAT.test(id)), `${path}: значення поза форматом`).toEqual([]);
        });
    }
    // Канарка — на весь прогін: сторінка без testid законна (§ 1.5), прогін без жодного — перевірка дивиться не туди.
    expect(total, 'жодного testid на жодному маршруті').toBeGreaterThan(0);
});
```

- [ ] `routes()` — sitemap плюс приховані сторінки з `hidden-routes.json` (`tests/e2e/routes.ts`, [ACCESSIBILITY § 10.3](ACCESSIBILITY-v10.md)), а не рукописний перелік; кличе її тіло тесту, а не імпорт: сторінка чеклиста (BETA-CHECKLIST § 5.6) теж під інваріантом, а нова сторінка потрапляє під інваріант сама.
- [ ] `test` і `expect` — з модуля фікстур проєкту, переходи — відносні (`./about/`) під `baseURL` зі слешем ([ANALYTICS § 5.2](../platform/ANALYTICS-v10.md#AN-E2E-BLOCK), [CODE-QUALITY § 5.4](../core/CODE-QUALITY-v10.md#CQ-E2E-TARGET)).
- [ ] Інваріант — звичайна специфікація в `testDir`: іде разом з рештою e2e в кожному проєкті канонічного конфігу ([CODE-QUALITY § 5.4](../core/CODE-QUALITY-v10.md)). Канарка «жодного testid» стоїть на весь прогін, а не на маршрут: сторінка без жодного testid (§ 1.5) законна.
- [ ] Перевіряється стан одразу після `gotoHydrated()` ([CODE-QUALITY § 5.3](../core/CODE-QUALITY-v10.md)): модалку, меню чи гілку помилки відкривають окремим сценарієм. Випадкове значення у форматі § 1.2 (UUID) інваріант не відрізнить від сталого — це ловить статична перевірка § 1.9.1.

#### 1.9.3 CI

- [ ] Обидві перевірки — у CI: статична в job з юніт-тестами (`GATE-TESTID`), рантайм — у job з E2E (`GATE-TESTID-RUNTIME`).
- [ ] Тест-заглушка замість реалізації (`expect(true).toBe(true)` під назвою перевірки) заборонена — [AI-AGENT-PITFALLS § 1](../core/AI-AGENT-PITFALLS-v10.md).

### 1.10 Міграція чинного проєкту

Для проєкту з сотнями чинних testid перехід одним комітом нереальний. Порядок:

1. **Виміряти.** Запустити перевірку § 1.9.1 і зафіксувати кількість порушень по категоріях.
2. **Спершу — заборонені слова** (§ 1.4), передусім `-button` → `-btn`: механічна заміна з найбільшим приростом консистентності на одиницю ризику.
3. **Потім — відсутній тип** (§ 1.3): тут потрібне рішення для кожного id, бо треба знати HTML-семантику елемента.
4. **Одна фіча за раз**, а не «весь проєкт за файлом»: кожен коміт лишає узгодженими і компонент, і його тести (§ 1.8).
5. Поки міграція триває, перевірка зелена через явний список у самому тесті:

```typescript
/** Легасі-id, що чекають на міграцію. Список тільки скорочується. Порожній = міграцію завершено. */
export const LEGACY_ALLOWED = new Set<string>(['admin-articles-create-button']);
```

> Список винятків **у коді тесту**, а не в конфігу: він потрапляє в кожен diff і не забувається.

### 1.11 Production-стратегія

Дві валідні позиції — оберіть одну й зафіксуйте в [PROJECT-CONTEXT](../PROJECT-CONTEXT-TEMPLATE.md):

| Стратегія | За | Проти |
|-----------|-----|-------|
| **A. Видаляти в production** | менший HTML; сторонні скрипти не чіпляються за внутрішні ідентифікатори | потрібен окремий staging-білд для QA |
| **B. Зберігати в production** | зовнішні QA й synthetic-моніторинг пишуть тести по прод-версії; один білд для всіх середовищ | кілька кілобайтів HTML; видима внутрішня структура |

- [ ] **Правило вибору:** є synthetic-моніторинг по production ([OBSERVABILITY-v10.md](../ops/OBSERVABILITY-v10.md)) або зовнішні QA пишуть тести по прод-версії → **B**; інакше → **A**.
- [ ] **A** — атрибут видаляється на етапі збірки (Svelte-препроцесор чи Vite-плагін) лише при `mode === 'production'` і лишається для `staging`/`preview`. Обрано A, але плагіна ще немає — це B де-факто, і записується B.
- [ ] За **A** e2e збирає сайт не в `production`: у канонічному `playwright.config.ts` ([CODE-QUALITY § 5.4](../core/CODE-QUALITY-v10.md)) рядок `command` стає `npm run build:staging && npm run preview -- --port ${PORT} --strictPort`, а скрипт `build:staging` у `package.json` — `vite build --mode staging && node scripts/generate-sitemap.mjs` (аргумент `npm run build -- --mode staging` дістався б останній команді скрипта, а не `vite build`). Це варіант стратегії A, і проєкт записує його в `PROJECT-CONTEXT.md` разом із вибором. Інакше збірка для e2e лишається без локаторів, і канарка § 1.9.2 червона.
- [ ] Від вибору не залежить поведінка застосунку: стилі й код не чіпляються за `data-testid` (§ 2.2) — за стратегії A його в production просто немає.

---

## 2. CSS-класи

### 2.1 Конвенція BEM-lite (рекомендована)

```css
.block {}              /* блок */
.block__element {}     /* елемент блоку */
.block--modifier {}    /* модифікатор стану/варіанту */
```

Приклади: `.card__title`, `.card--featured`, `.modal__header`, `.modal--small`.

> **Альтернатива:** Tailwind / utility-first — допускається, якщо обрано на старті проєкту. Не змішувати з BEM у тому самому компоненті.

### 2.2 Заборони

| Рівень | Заборона | Правильна альтернатива |
|--------|----------|----------------------|
| **MEDIUM** | Колір/розмір у назві класу (`.btn-blue`, `.btn-large`) | Семантичні модифікатори: `.btn--primary`, `.btn--lg` |
| **MEDIUM** | Класи в стилі testid (`.save-btn`) | Класи — для стилів (`.save-button`), `data-testid` — для тестів |
| **MEDIUM** | Селектор `[data-testid…]` у стилях чи в коді застосунку | Клас або атрибут стану (§ 2.3): за стратегії A (§ 1.11) testid у production немає |
| **MEDIUM** | Глобальні селектори без префіксу (`.container`, `.title`) | Scoped-стилі Svelte або BEM-блок |

### 2.3 Стан — через атрибути, не класи

- [ ] **HIGH.** Стан елемента (обраний, розгорнутий, вимкнений) — в `aria-*`, а
      там, де ARIA-еквівалента немає, — у `data-state`; клас лише стилізує цей
      атрибут. Стан самим класом не чує читалка, а тест мусить знати ім'я класу.

```svelte
<script lang="ts">
  import { t } from '$lib/i18n';

  let { active, onselect }: { active: boolean; onselect: () => void } = $props();
</script>

<!-- ❌ стан лише класом: <button class:active>…</button> -->
<!-- ✅ стан в aria-pressed: його читають читалка, тест і CSS -->
<button type="button" aria-pressed={active} data-testid="settings-general-btn" onclick={onselect}>{t('settings.general')}</button>

<style>
  [aria-pressed='true'] {
    font-weight: 700;
  }
</style>
```

Стан стає видимим одночасно для читалки, тестів і CSS. Для станів без aria-еквівалента — `data-state="loading"`. `role="tab"` з `aria-selected` — не заміна: це обіцянка цілого віджета (`tablist`, `tabpanel`, стрілки), і без нього axe дає `aria-required-parent` ([BETA-CHECKLIST § 8.2](BETA-CHECKLIST-v10.md#BETA-TABS-NOT-ARIA)).

---

## 3. Іменування Svelte-компонентів

### 3.1 Файли

- [ ] `PascalCase.svelte`, тип — суфіксом у назві (паралельно з testid): `HeroSection.svelte`, `NewsCard.svelte`, `ConfirmDeleteModal.svelte`, `SettingsDrawer.svelte`, `LoginForm.svelte`, `ChevronDownIcon.svelte`, `NotificationsList.svelte`, `TickerBanner.svelte`, `LoginButton.svelte`.
- [ ] Суфікс — канонічний тип § 1.3 **повним словом** у PascalCase: `btn` → `Button`, `img` → `Image`, решта — як є. Скорочення потрібне testid для однозначного grep; ім'я компонента пишеться словами, як заведено в екосистемі. Допускаються також `Layout`, `Page`, `View` для кореневих компонентів маршруту і `Field` для складеного поля «мітка + ввід + повідомлення» (`TextField`, `PasswordField` — [SVELTE-UI § 2.4](../core/SVELTE-UI-v10.md), [SECURITY § 3.5](../core/SECURITY-v10.md#SEC-AUTH-FIELDS)): типом testid він не є, і його частини несуть власні — `-label`, `-input`, `-error`, `-hint`.
- [ ] Локальний псевдонім при імпорті збігається з іменем файлу: `import HeroSection from './HeroSection.svelte'`, а не `import Hero from …` — інакше зв'язок § 4 губиться при пошуку.

### 3.2 Snippet-props

- [ ] Семантичні імена: `header`, `footer`, `actions`, `empty`, `loading`. **Не** `slot1`, `content2`.

### 3.3 Event-handler props

- [ ] Колбеки — `on` + подія нижнім регістром, як DOM-події Svelte 5: `onsubmit`, `onclose`, `onselect` ([SVELTE-UI § 1.1](../core/SVELTE-UI-v10.md)). **Не** `handle*` і не `onClose` у публічному API компонента: колбек, названий як DOM-подія, передається тим самим скороченням `{onclose}`.

---

## 4. Зв'язок `data-testid` ↔ компонент ↔ CSS-клас

| Сутність | Приклад |
|----------|---------|
| Файл компонента | `ConfirmDeleteModal.svelte` |
| `data-testid` (root) | `confirm-delete-modal` |
| BEM-клас (root) | `.confirm-delete-modal` (або scoped `.modal` у `<style>`) |
| Внутрішня кнопка підтвердження | `confirm-delete-modal-confirm-btn` |
| Внутрішня кнопка скасування | `confirm-delete-modal-cancel-btn` |

> Однозначність: за `data-testid` завжди можна знайти компонент і навпаки.

---

## 5. Pre-release Checklist

- [ ] Ключові інтерактивні елементи мають стабільний локатор: роль/лейбл, інакше `data-testid` (§ 1.1).
- [ ] Статична перевірка (§ 1.9.1) і рантайм-інваріант (§ 1.9.2) — у CI і зелені.
- [ ] Кожен `data-testid` має канонічний тип останнім канонічним сегментом; складені типи — лише як частина й ціле (§ 1.3).
- [ ] Жодного забороненого сегмента (§ 1.4) і жодного голого виразу `data-testid={…}` (§ 1.7).
- [ ] Значення — лише `a–z`, `0–9` і дефіси, зокрема підставлені динамічно (§ 1.2, § 1.6).
- [ ] Немає testid на декоративних обгортках (§ 1.5) і стилів, що від них залежать (§ 2.2).
- [ ] Реюзні компоненти приймають `testId` префіксом і дописують тип статично (§ 1.7).
- [ ] Перейменування testid — разом із посиланнями в тестах, одним комітом (§ 1.8).
- [ ] `LEGACY_ALLOWED` порожній — або міграція явно триває й список скорочується (§ 1.10).
- [ ] Стан — через `aria-*`/`data-state`, а не класи (§ 2.3); файли компонентів мають тип-суфікс (§ 3.1).

---

## 6. Автоматична перевірка

| Гейт | Що ловить |
|---|---|
| `GATE-TESTID` (`npm run test:unit`) | формат і символи, відсутній тип (§ 1.2), два інтерактивні чи два типи повідомлення підряд (§ 1.3), заборонене слово в позиції типу чи `button` будь-де (§ 1.4), недетерміновані id — у виразі чи через змінну скрипта (§ 1.6), голий вираз `data-testid={…}` (§ 1.7), дублікати в компоненті (§ 1.9.1) |
| `GATE-TESTID-RUNTIME` (`npm run test:e2e`, Chromium, Firefox, WebKit — проєкти канонічного `playwright.config.ts`, [CODE-QUALITY § 5.4](../core/CODE-QUALITY-v10.md)) | дублікати на відмальованій сторінці й підставлені значення поза форматом, зокрема на прихованих сторінках (§ 1.9.2) |

Межі гейтів: випадковість, що приходить з іншого модуля (`import { uid } from …`) чи з функції з іншою назвою, і стани, яких сценарій не відкрив, — це код-рев'ю.

Перевіряється в код-рев'ю: вибір між роллю й testid (§ 1.1), складені типи поза двома групами пар (§ 1.3), коли testid потрібен (§ 1.5), перейменування (§ 1.8), production-стратегія (§ 1.11), BEM і стан через атрибути (§ 2), імена компонентів і колбеків (§ 3).

> Зворотний експеримент ([AI-AGENT-PITFALLS § 1.1](../core/AI-AGENT-PITFALLS-v10.md#PIT-REVERSE-EXPERIMENT)): додати `data-testid="dark-mode-toggle-btn"` і `data-testid={testId}` — тести «формат, канонічний тип, заборонені слова, пари типів» і «тип видно в шаблоні: без голих виразів» мусять упасти саме на цих рядках.

---

## Пов'язані документи

- Канон локаторів у тестах (Vitest, Playwright) — [CODE-QUALITY-v10.md](../core/CODE-QUALITY-v10.md)
- Ролі, aria-атрибути, `<dialog>` — [ACCESSIBILITY-v10.md](ACCESSIBILITY-v10.md)
- Synthetic-моніторинг production (впливає на вибір у § 1.11) — [OBSERVABILITY-v10.md](../ops/OBSERVABILITY-v10.md)
- Налаштування CI-job для обох перевірок — [CI-CD-AND-TOOLS-v10.md](../ops/CI-CD-AND-TOOLS-v10.md)
- Структура файлів і папок — [PROJECT-STRUCTURE-v10.md](../core/PROJECT-STRUCTURE-v10.md)
- Компоненти та CSS-scoping — [SVELTE-UI-v10.md](../core/SVELTE-UI-v10.md)
