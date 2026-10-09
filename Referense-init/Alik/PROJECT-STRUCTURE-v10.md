---
Назва: Організація та структура проєкту
Версія: 10.0
Фреймворк: SvelteKit 2 + Svelte 5 (Runes)
Профіль: universal
Пріоритет: core
Критичність: HIGH
Ціна ігнорування: мертвий файл читається як зроблена робота: його правлять, на нього посилаються, він не виконується
Скіп-якщо: —
Опис: Правила кореневої папки, static/, src/lib/, src/routes/, іменування, розмір файлів та тестова інфраструктура
---

# Організація та структура проєкту

Правила CRITICAL/HIGH — обов'язкові в межах профілю застосовності (див. frontmatter). MEDIUM/LOW — типові конвенції, від яких можна відхилитися з коротким обґрунтуванням. Розділи, що стосуються лише одного профілю, позначені [server]/[static].

---

## 🚫 ЖОРСТКІ ОБМЕЖЕННЯ (ANTI-PATTERNS)

| Рівень | Заборона | Правильна альтернатива |
|--------|----------|----------------------|
| **CRITICAL** | Руна (`$state`, `$derived`, `$effect`, `$props`…) у звичайному `.ts` / `.js` | Розширення `.svelte.ts` / `.svelte.js` (§ 4.2.1) |
| **HIGH** | Компонент у ролі маршруту (`About.svelte` у `src/routes/` замість `+page.svelte`) | `+page.svelte`; компоненти — у `src/lib/` або поруч зі сторінкою (§ 3) |
| **HIGH** | Модуль, до якого немає шляху в графі імпортів від точок входу | Підключити або видалити (§ 4.3.1) |
| **HIGH** | E2E-тести в `src/` — unit-раннер підхоплює Playwright-файли | `tests/` у корені (§ 6) |
| **MEDIUM** | Локальний псевдонім імпорту не збігається з іменем файлу (`import Hero from './HeroSection.svelte'`) | Однакове ім'я (§ 5.2) |
| **MEDIUM** | Файл понад орієнтир розміру поза переліком `OVERSIZED` | Розділити за відповідальністю або записати стелю (§ 7.1) |
| **MEDIUM** | Файл у `static/`, на який ніхто не посилається | Видалити або записати боргом (§ 2.1) |
| **MEDIUM** | Самописні скрипти в корені; згенеровані артефакти в репозиторії | `scripts/`; `.gitignore` (§ 1) |
| **MEDIUM** | Медіафайли в корені `static/` | Підпапки `images/`, `fonts/`, `svg/`, `audio/` (§ 2) |
| **MEDIUM** | Змішані стилі іменування для одного типу файлів | Єдиний стиль (§ 5.1) |

---

## 1. Коренева папка

- [ ] **MEDIUM.** У корені — лише файли, яких **інструмент вимагає** саме там; усе інше — у підпапках. Перелік нижче орієнтовний і росте разом з інструментами.

| Категорія | Файли |
|-----------|-------|
| Менеджер пакетів | `package.json`, `package-lock.json`, `.npmrc`, `.nvmrc` |
| Збірка й конфіг | `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts` |
| Лінтинг | `eslint.config.js`, `.prettierrc` |
| Оточення | `.env`, `.env.example` |
| Git | `.gitignore`, `.gitattributes` |
| Контекст для агентів | `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `PROJECT-CONTEXT.md` |
| Документація | `README.md`, `LICENSE` |
| Хостинг | `firebase.json`, `.firebaserc`, `vercel.json`, `renovate.json` |
| Правила доступу бази | `firestore.rules`, `database.rules.json`, `storage.rules` |

- [ ] Правила доступу бази лежать у корені не через вимогу інструмента, а як межа безпеки, яку видно з першого погляду на репозиторій ([CLOUD-DATABASE § 2.1](../platform/CLOUD-DATABASE-v10.md#CDB-RULES-IN-REPO)).
- [ ] Власні Node-скрипти (bump-version, генерація, міграції) — у `scripts/`. У проєкті з `"type": "module"` файл `.js` є ESM, як і `.mjs`: `require` у ньому не визначений, скрипт пише `import`. CommonJS — лише файл `.cjs` або `createRequire` з `node:module`.
- [ ] Артефакти збірки й тестів (`build/`, `dist/`, `playwright-report/`, `test-results/`, `bundle-stats.html`) — у `.gitignore`.

---

## 2. Організація `static/`

```text
static/
├── images/    растрові зображення (jpg, png, webp, avif)
├── svg/       векторна графіка
├── fonts/     шрифти
├── audio/     звук
├── og/        зображення Open Graph
└── favicon/   піктограми різних розмірів
```

- [ ] **MEDIUM.** У корені `static/` — лише службове: `favicon.*`, `robots.txt`, `sitemap.xml` (якщо генерується у `static/` скриптом), `llms.txt`, `manifest.json` / `manifest.webmanifest` і піктограми PWA, `.nojekyll`, `CNAME`, `app-version.json` (генерується скриптом). Решта — у підпапках.

### 2.1 Файл у `static/`, якого не просить ніхто <a id="PS-STATIC-ORPHANS"></a>

`adapter-static` копіює `static/` у `build/` цілком: забутий файл їде на хостинг, і жодна перевірка розмітки чи бюджету JS його не бачить.

- [ ] **MEDIUM.** Кожен файл у `static/` згадується хоча б раз у `src/`, `scripts/`, `tests/`, `static/llms.txt` або маніфесті. Файли, на які посилаються лише за шаблоном імені, названі у винятках явно.
- [ ] Згадка в коментарі посиланням не є: закоментований `<img src="/images/old.png">` лишає файл сиротою. Перелік `STATIC_ORPHANS` у самому гейті — теж не посилання, інакше записана сирота ставала б «згаданою» і борг не можна було б записати.
- [ ] Наявні сироти — борг у переліку `STATIC_ORPHANS`, що лише скорочується, а не видалення наосліп: частина з них — цілі зовнішніх посилань, яких із репозиторію не видно.
- [ ] `sitemap.xml` генерується, а не пишеться руками ([SEO](../platform/SEO-v10.md)).

---

## 3. Організація `src/routes/`

- [ ] **HIGH.** Маршрут утворюють лише файли з префіксом `+` із набору SvelteKit: `+page.svelte`, `+page.ts`, `+page.server.ts`, `+layout.svelte`, `+layout.ts`, `+layout.server.ts`, `+server.ts`, `+error.svelte` (і варіанти з `@` для скидання макета). Компонент без `+` маршрутом не стає: `About.svelte` замість `+page.svelte` означає, що сторінки немає. Невідомий файл із `+` SvelteKit відкидає помилкою.
- [ ] Колокація дозволена: компонент чи помічник, потрібний лише одній сторінці, лежить поруч із її `+page.svelte` — SvelteKit ігнорує файли без `+`. Префікс `_` не потрібен.
- [ ] Спільні компоненти — у `src/lib/`.

---

## 4. Організація `src/lib/`

### 4.1 Канонічне дерево <a id="PS-CANONICAL-TREE"></a>

```text
src/
├── params/           матчери динамічних сегментів
├── hooks.ts          універсальні хуки (transport; reroute — лише у варіанті SVELTEKIT-DATA § 2.7)
├── hooks.server.ts   handle (мова — і в static-профілі, під час prerender); [server] доступ, заголовки, handleError
└── lib/
    ├── components/
    │   ├── ui/       базові: Button, Modal, Input
    │   └── sections/ складені секції сторінок
    ├── controllers/  .svelte.ts — стан на рунах
    ├── services/     чисті .ts — адаптери API, сховища
    ├── server/       лише сервер: клієнт бази, секрети (SvelteKit не пустить їх у клієнт)
    ├── security/     sanitizeHtml, jsonLdScript, safeUrl
    ├── errors/       доменні класи помилок
    ├── i18n/         словники, політика мовних адрес
    ├── schemas/      схеми валідації
    ├── types/        інтерфейси TypeScript
    ├── utils/        чисті функції без рун
    ├── config/       константи, конфіги
    └── <тема>/       модулі одного файлу канону — коли його взято: data (реєстри, SVELTEKIT-DATA § 7), debug (DEBUGGING),
                      hotkeys (HOTKEYS), pwa (PWA), seo (SEO), net (ERROR-HANDLING § 3), beta (BETA-CHECKLIST),
                      session (REALTIME-SESSIONS), platform (DESKTOP-TAURI), ai (AI-PROVIDERS)
```

- [ ] **MEDIUM.** Файли не лежать «розсипом» у `src/lib/` без підпапки; виняток — `index.ts` для реекспорту.
- [ ] Матчери — [SVELTEKIT-DATA § 2.2](SVELTEKIT-DATA-v10.md#SKD-PARAM-MATCHER); серверні модулі — [SECURITY § 4.3](SECURITY-v10.md#SEC-SERVER-ONLY); помічники безпеки — [SECURITY § 5.2](SECURITY-v10.md#SEC-HTML-SANITIZE).

### 4.2 Сервіси й контролери

- [ ] **HIGH.** `services/` — чисті `.ts`-модулі без реактивності: адаптери API, обгортки сховищ. Модулі з рунами за замовчуванням живуть у `controllers/`; реактивний інфраструктурний модуль (журнал, налаштування) може лежати в `services/`, але з розширенням `.svelte.ts`.

#### 4.2.1 Руни — лише в `.svelte` і `.svelte.ts` <a id="PS-RUNES-EXTENSION"></a>

- [ ] **CRITICAL.** Модуль, що викликає руну, має розширення `.svelte.ts` (або `.svelte.js`); тест, що викликає руну, — `.svelte.test.ts`. Компілятор Svelte обробляє руни лише в цих файлах, а в звичайному `.ts` руна — неоголошений ідентифікатор: TypeScript його пропускає (руни оголошені глобально), і модуль падає з `ReferenceError` уже під час виконання.

### 4.3 Осиротілі файли

- [ ] **HIGH.** Компонент чи модуль без жодного імпорту підключають або видаляють. «Хай полежить» означає, що наступний читач — зокрема агент — вважатиме функцію реалізованою, правитиме цей файл і посилатиметься на нього.
- [ ] Те саме — для ключів локалізації, CSS-класів і скриптів `package.json`: наявність не означає використання.

#### 4.3.1 Досяжність доводиться графом, а не пошуком імені <a id="PS-REACHABILITY"></a>

Пошук імені файлу в інших джерелах бачить згадку, а не шлях виконання: `A.svelte` імпортує `B.svelte`, обох не імпортує ніхто — і `B` виглядає «використаним»; ім'я в коментарі чи рядку теж «знаходиться».

- [ ] **HIGH.** Досяжність доводиться графом імпортів (статичні й динамічні `import`, реекспорти, `import.meta.glob`) від точок входу SvelteKit:

| Точка входу | Хто її виконує |
|---|---|
| `+`-файли в `src/routes/` (`+page`, `+layout`, `+server`, `+error`, зокрема з `@`); колокований компонент досяжний через імпорт із них | маршрутизатор |
| `src/params/*.ts` | матчери параметрів — імпорту на них немає ніде |
| `src/hooks.ts`, `src/hooks.server.ts`, `src/hooks.client.ts` | хуки |
| `src/service-worker.ts` або `src/service-worker/index.ts` | воркер |
| `src/instrumentation.server.ts` | інструментування сервера |

- [ ] Якщо шляхи змінено в `kit.files` (`svelte.config.js`), точки входу беруться звідти.
- [ ] Модуль, до якого граф не веде (імпорт за змінною), називається в переліку винятків із причиною; запис, якому вже нічого не відповідає, валить перевірку.

---

## 5. Іменування файлів

### 5.1 Базові правила

- [ ] **MEDIUM.** Компоненти — `PascalCase.svelte`; модулі на рунах — `camelCase.svelte.ts`, однаково для класу й для екземпляра (`formState.svelte.ts` з `export class FormState`, `preferences.svelte.ts` з `export const preferences`), і тест поруч — `formState.svelte.test.ts`; модулі без рун — `camelCase.ts`; типи — `camelCase.ts` у `types/`; теки — `kebab-case`. Одна конвенція на весь проєкт. Виняток із MEDIUM — розширення рун (§ 4.2.1).
- [ ] Модулі на рунах лежать у `controllers/` (або в `services/` — реактивний інфраструктурний модуль, § 4.2), а не в `utils/`: там лише чисті функції (§ 4.1), і модуль зі станом серед них читається як функція без стану.

### 5.2 Тип у назві компонента

- [ ] **MEDIUM.** Ім'я компонента несе його тип, паралельно до конвенції `data-testid`: `HeroSection.svelte`, `NewsCard.svelte`, `ConfirmDeleteModal.svelte`, `ChevronDownIcon.svelte`, `NotificationsList.svelte` ([TESTID-AND-NAMING](../quality/TESTID-AND-NAMING-v10.md)).
- [ ] Локальний псевдонім імпорту збігається з іменем файлу: інакше пошук за назвою компонента не знаходить місць його використання, і зв'язок «testid ↔ компонент ↔ файл» рветься після перейменувань.

```ts
// фрагмент: ілюстрація § 5.2, а не маршрут проєкту (HeroSection.svelte вигаданий) — псевдонім збігається з файлом; `import Hero from …HeroSection.svelte` був би порушенням
import HeroSection from '$lib/components/sections/HeroSection.svelte';

export const load = () => ({ hero: HeroSection });
```

---

## 6. Інфраструктура тестування

- [ ] **HIGH.** Unit-тести лежать поруч із файлом (`formatDate.ts` → `formatDate.test.ts`), E2E — у кореневому `tests/`, а не в `src/`: інакше unit-раннер підхоплює Playwright-файли й падає на них.
- [ ] **MEDIUM.** Суфікс тестів у проєкті один (`.test.ts` або `.spec.ts`). Маска `include` раннера при цьому покриває обидва — це HIGH-правило [AI-AGENT-PITFALLS § 1.3](AI-AGENT-PITFALLS-v10.md#PIT-TEST-FILE-COLLECTED): вужча маска перетворює описку в назві на тихе зникнення перевірки.
- [ ] Мокінг, покриття, середовища — [CODE-QUALITY](CODE-QUALITY-v10.md).

---

## 7. Розмір файлу (SLOC)

Орієнтири міряються в рядках коду (SLOC): рядок рахується, якщо на ньому є хоч один токен коду; коментарі (`//`, `/* */`, JSDoc, `<!-- -->`) і порожні рядки не рахуються. Мета — зв'язність і обсяг логіки, а не покарання за документацію.

| Тип | Орієнтир SLOC | Коли перевищення виправдане |
|-----|---------------|-----------------------------|
| `+page.svelte` маршруту | 400 | — (майже завжди означає, що секції не винесено) |
| `.svelte` компонент | 300 | згенерований або великий статичний шаблон без логіки |
| `.svelte.ts` контролер | 300 | скінченний автомат із багатьма станами |
| `.ts` модуль коду | 250 | адаптер із широким API зовнішнього SDK |

- [ ] **MEDIUM.** Перевищення — привід ділити за **відповідальністю** (секції в `components/sections/`, логіка — в контролер, форма — в окремий компонент), а не механічно навпіл.
- [ ] Словники й реєстри даних — дані, а не код: вони виведені з-під орієнтира категорією (теки `src/lib/i18n/locales` і `src/lib/data` та словник власної реалізації `src/lib/i18n/translations.ts` з [I18N § 1](../platform/I18N-v10.md), `DATA_FILES` гейта), а не стелею в `OVERSIZED`: словник росте з кожним ключем, і стеля на нього була б боргом, якого немає. Модулі констант і конфігів — код і під орієнтир підпадають.

### 7.1 Стеля на кожен файл, а не число в прозі <a id="PS-SIZE-RATCHET"></a>

- [ ] **MEDIUM.** Перевищення живуть у переліку `OVERSIZED` у `src/structure.test.ts`: шлях і стеля — **поточне** значення SLOC. Перевірка вимагає: файл поза переліком не перевищує орієнтир; файл у переліку має рівно свою стелю — більше означає, що борг зріс, менше — що стелю треба опустити тим самим комітом; файл, що вклався в орієнтир, вилучається. Перелік лише скорочується.
- [ ] Порівняння на рівність — та сама причина, що в мапі боргу ESLint ([CODE-QUALITY § 6.4.3](CODE-QUALITY-v10.md#CQ-ESLINT-DEBT-LEDGER)): стеля «з запасом» дозволяє файлу рости назад, а застаріле число показує борг, якого немає.
- [ ] Правка файлу з переліку, що додає рядки, або компенсується в тому ж файлі, або розділяє його; підняття стелі — не правка, а зростання боргу.
- [ ] Кількість файлів понад орієнтир без стелі на кожен ратчетом не є: вона не заважає жодному файлу рости.
- [ ] Числа з переліку в `PROJECT-CONTEXT.md` не переписуються — або посилання на перелік, або таблиця під `GATE-DOC-NUMBERS` ([AI-AGENT-PITFALLS § 5.5.1](AI-AGENT-PITFALLS-v10.md#PIT-NUMBER-UNDER-GATE)).
- [ ] Файл рівно на орієнтирі — сигнал: наступний рядок його перевищить без жодного архітектурного приводу, тож він ділиться завчасно.

---

## 8. Автоматична перевірка

| Гейт | Команда | Що ловить |
|---|---|---|
| `GATE-STRUCTURE` | `npm run test:unit` | руна поза `.svelte`/`.svelte.ts` (§ 4.2.1); модуль на рунах з великої літери або в `utils/` (§ 4.1, § 5.1); псевдонім імпорту ≠ ім'я файлу (§ 5.2); модуль, недосяжний графом від точок входу, зокрема компонент без `+` у `src/routes/`, якого ніхто не імпортує, або застарілий виняток (§ 3, § 4.3.1); файл понад орієнтир поза `OVERSIZED` чи зі SLOC, не рівним своїй стелі, — без коментарів і JSDoc (§ 7, § 7.1); опційний сегмент `[[x]]` без матчера ([SVELTEKIT-DATA § 2.2](SVELTEKIT-DATA-v10.md#SKD-PARAM-MATCHER)); не службовий файл у корені `static/` і сироти `static/`, що розійшлися з `STATIC_ORPHANS`, — згадка в коментарі чи в самому переліку посиланням не є (§ 2, § 2.1) |

```ts
// src/structure.test.ts — GATE-STRUCTURE
import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { parse } from 'svelte/compiler';

const walk = (dir: string, out: string[] = []): string[] => {
	if (!existsSync(dir)) return out;
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walk(p, out);
		else out.push(p.split('\\').join('/'));
	}
	return out;
};
const read = (f: string) => readFileSync(f, 'utf8');
const src = walk('src');
const isCheck = (f: string) => /\.(test|spec)\.[jt]s$/.test(f);
const modules = src.filter((f) => /\.(ts|js|svelte)$/.test(f) && !isCheck(f) && !f.endsWith('.d.ts'));
const known = new Set(src);

/** Точки входу — те, що виконує сам SvelteKit, а не інший модуль (§ 4.3.1). У routes — лише `+`-файли: `About.svelte` поруч маршрутом не є. */
const ENTRY_POINTS = [
	/^src\/routes\/(?:.*\/)?\+(?:page|layout|server|error)(?:@[^/]*)?(?:\.server)?\.(?:svelte|[jt]s)$/,
	/^src\/params\/[^/]+\.[jt]s$/,
	/^src\/hooks(\.server|\.client)?\.[jt]s$/,
	/^src\/service-worker(\/index)?\.[jt]s$/,
	/^src\/instrumentation\.server\.[jt]s$/
];
/** Модулі, до яких немає ребра в графі (імпорт за змінною), — з причиною. */
const KNOWN_UNREACHABLE: Record<string, string> = {};
/** Дані, а не код: словники й реєстри не діляться за розміром (§ 7); translations.ts — словник власної реалізації I18N § 1. */
const DATA_FILES = /^src\/lib\/(?:i18n\/(?:locales\/|translations\.ts$)|data\/)/;
const LIMITS: Array<[RegExp, number]> = [
	[/\/routes\/(.*\/)?\+page\.svelte$/, 400],
	[/\.svelte$/, 300],
	[/\.svelte\.[jt]s$/, 300],
	[/\.[jt]s$/, 250]
];
/** Файли понад орієнтир і їхня стеля — ПОТОЧНЕ значення SLOC (§ 7.1). */
const OVERSIZED: Record<string, number> = {};
/** Службові файли кореня static/ (§ 2). */
const STATIC_ROOT = /^static\/(favicon\.[a-z]+|robots\.txt|sitemap\.xml|llms\.txt|manifest\.(json|webmanifest)|\.nojekyll|CNAME|app-version\.json|apple-touch-icon[\w.-]*\.png|icon-[\w.-]+\.png)$/;
/** Сироти static/, які поки лишаються (цілі зовнішніх посилань тощо), — перелік лише скорочується. */
const STATIC_ORPHANS: string[] = [];
/** Сам гейт: його перелік STATIC_ORPHANS — не посилання, інакше записана сирота ставала б «згаданою». */
const SELF = relative('.', fileURLToPath(import.meta.url)).split('\\').join('/');

type Script = { code: string; line: number };
/** Скрипти файлу з рядком, з якого вони починаються. */
function scriptsOf(file: string): Script[] {
	const text = read(file);
	if (!file.endsWith('.svelte')) return [{ code: text, line: 0 }];
	const ast = parse(text, { modern: true });
	return [ast.instance, ast.module].flatMap((s) => {
		if (!s) return [];
		const { start, end } = (s as unknown as { content: { start: number; end: number } }).content;
		return [{ code: text.slice(start, end), line: text.slice(0, start).split('\n').length - 1 }];
	});
}
const sourceOf = (s: Script, name: string) => ts.createSourceFile(name, s.code, ts.ScriptTarget.Latest, true);
function nodesOf(root: ts.Node): ts.Node[] {
	const out: ts.Node[] = [];
	const visit = (n: ts.Node) => {
		out.push(n);
		n.forEachChild(visit);
	};
	visit(root);
	return out;
}

/** Шаблон import.meta.glob → регулярка: `**\/` — будь-яка глибина, `*` — у межах теки, `{a,b}` — варіанти. */
function globToRegex(glob: string): RegExp {
	let re = '';
	for (let i = 0; i < glob.length; i++) {
		const c = glob.charAt(i);
		if (glob.startsWith('**/', i)) {
			re += '(.*/)?';
			i += 2;
		} else if (c === '*') re += '[^/]*';
		else if (c === '?') re += '[^/]';
		else if (c === '{') {
			const end = glob.indexOf('}', i);
			re += `(${glob.slice(i + 1, end).split(',').join('|')})`;
			i = end;
		} else re += /[.+^$()|[\]\\]/.test(c) ? `\\${c}` : c;
	}
	return new RegExp(`^${re}$`);
}

/** Ребра графа: статичні й динамічні імпорти, реекспорти, import.meta.glob. */
function edgesOf(file: string): string[] {
	const out: string[] = [];
	const resolveSpec = (spec: string) => {
		const base = spec.startsWith('$lib') ? 'src/lib' + spec.slice(4) : spec.startsWith('.') ? join(dirname(file), spec).split('\\').join('/') : null;
		if (!base) return;
		const tries = [base, base.replace(/\.js$/, '.ts'), ...['.ts', '.js', '.svelte', '/index.ts', '/index.js'].map((e) => base + e)];
		const hit = tries.find((t) => known.has(t));
		if (hit) out.push(hit);
	};
	for (const s of scriptsOf(file))
		for (const n of nodesOf(sourceOf(s, file))) {
			if ((ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier))
				resolveSpec(n.moduleSpecifier.text);
			if (!ts.isCallExpression(n) || !n.arguments[0]) continue;
			const arg = n.arguments[0];
			if (n.expression.kind === ts.SyntaxKind.ImportKeyword && ts.isStringLiteralLike(arg)) resolveSpec(arg.text);
			if (n.expression.getText() === 'import.meta.glob') {
				const patterns = (ts.isArrayLiteralExpression(arg) ? [...arg.elements] : [arg]).filter(ts.isStringLiteralLike).map((p) => p.text);
				/** Шаблон від кореня проєкту: `/…` — корінь, `$lib/…` — псевдонім Vite, решта — від теки файлу. */
				const fromRoot = (p: string) =>
					p.startsWith('/') ? p.slice(1) : p.startsWith('$lib/') ? `src/lib/${p.slice(5)}` : join(dirname(file), p).split('\\').join('/');
				const include = patterns.filter((p) => !p.startsWith('!')).map((p) => globToRegex(fromRoot(p)));
				const exclude = patterns.filter((p) => p.startsWith('!')).map((p) => globToRegex(fromRoot(p.slice(1))));
				out.push(...src.filter((f) => include.some((re) => re.test(f)) && !exclude.some((re) => re.test(f))));
			}
		}
	return out;
}

/** Текст без коментарів, позиції збережено: згадка в коментарі посиланням не є (AI-AGENT-PITFALLS § 1.6). */
function withoutComments(file: string, text: string): string {
	const cut: Array<[number, number]> = [];
	const script = (from: number, to: number) => {
		const code = text.slice(from, to);
		const sf = ts.createSourceFile('part.ts', code, ts.ScriptTarget.Latest, true);
		const visit = (n: ts.Node) => {
			for (const r of [...(ts.getLeadingCommentRanges(code, n.getFullStart()) ?? []), ...(ts.getTrailingCommentRanges(code, n.getEnd()) ?? [])])
				cut.push([from + r.pos, from + r.end]);
			n.getChildren(sf).forEach(visit);
		};
		visit(sf);
	};
	/** CSS: коментар поза рядком; регулярних виразів у CSS немає, тож простий прохід точний. */
	const css = (from: number, to: number) => {
		let quote = '';
		for (let i = from; i < to; i++) {
			const c = text.charAt(i);
			if (quote) {
				if (c === '\\') i++;
				else if (c === quote) quote = '';
			} else if (c === '"' || c === "'") quote = c;
			else if (text.startsWith('/*', i)) {
				const end = text.indexOf('*/', i + 2);
				const stop = end < 0 || end + 2 > to ? to : end + 2;
				cut.push([i, stop]);
				i = stop - 1;
			}
		}
	};
	if (/\.[cm]?[jt]s$/.test(file)) script(0, text.length);
	else if (file.endsWith('.css')) css(0, text.length);
	else if (/\.(?:html|md)$/.test(file)) for (const m of text.matchAll(/<!--[\s\S]*?-->/g)) cut.push([m.index, m.index + m[0].length]);
	else if (file.endsWith('.svelte')) {
		type Span = { start: number; end: number };
		const ast = parse(text, { modern: true }) as unknown as { instance: { content: Span } | null; module: { content: Span } | null; css: { content: Span } | null; fragment: unknown };
		for (const s of [ast.instance, ast.module]) if (s) script(s.content.start, s.content.end);
		if (ast.css) css(ast.css.content.start, ast.css.content.end);
		const visit = (node: unknown): void => {
			if (Array.isArray(node)) node.forEach(visit);
			else if (node && typeof node === 'object') {
				const n = node as { type?: unknown; start?: unknown; end?: unknown };
				if (n.type === 'Comment' && typeof n.start === 'number' && typeof n.end === 'number') cut.push([n.start, n.end]);
				for (const [key, value] of Object.entries(node)) if (key !== 'parent') visit(value);
			}
		};
		visit(ast.fragment);
	}
	let out = '';
	let at = 0;
	for (const [a, b] of cut.sort((x, y) => x[0] - y[0])) {
		if (b <= at) continue;
		const from = Math.max(a, at);
		out += text.slice(at, from) + text.slice(from, b).replace(/[^\n]/g, ' ');
		at = b;
	}
	return out + text.slice(at);
}

/** SLOC: рядки, на яких є хоч один токен коду; коментарі й порожні рядки не рахуються. */
function sloc(file: string): number {
	const text = read(file);
	const lines = new Set<number>();
	for (const s of scriptsOf(file)) {
		const sf = sourceOf(s, file);
		const mark = (n: ts.Node) => {
			// JSDoc — вузол у дітях задокументованого: без цього пропуску кожен його рядок ішов би в SLOC.
			if (ts.isJSDoc(n)) return;
			const kids = n.getChildren(sf);
			if (kids.length === 0 && n.kind !== ts.SyntaxKind.EndOfFileToken) {
				const from = sf.getLineAndCharacterOfPosition(n.getStart(sf)).line;
				const to = sf.getLineAndCharacterOfPosition(n.getEnd()).line;
				for (let l = from; l <= to; l++) lines.add(s.line + l);
			}
			kids.forEach(mark);
		};
		mark(sf);
	}
	if (file.endsWith('.svelte')) {
		const blank = (m: string) => m.replace(/[^\n]/g, ' ');
		const markup = text
			.replace(/(<script\b[^>]*>)([\s\S]*?)(<\/script>)/g, (_, a, body, b) => a + blank(body) + b)
			.replace(/<!--[\s\S]*?-->/g, blank)
			.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/g, (_, a, body: string, b) => a + body.replace(/\/\*[\s\S]*?\*\//g, blank) + b);
		markup.split('\n').forEach((l, i) => l.trim() && lines.add(i));
	}
	return lines.size;
}

describe('структура проєкту', () => {
	it('перевірка жива: модулі й точки входу знайдено', () => {
		expect(modules.length).toBeGreaterThan(0);
		expect(modules.filter((f) => ENTRY_POINTS.some((re) => re.test(f))).length).toBeGreaterThan(0);
	});

	it('руни лише у .svelte / .svelte.ts / .svelte.js (§ 4.2.1)', () => {
		const RUNE = /^\$(state|derived|effect|props|bindable|inspect|host)(\.\w+)?$/;
		const bad = src
			.filter((f) => /\.[jt]s$/.test(f) && !/\.svelte\.[jt]s$/.test(f) && !/\.svelte\.(test|spec)\.[jt]s$/.test(f) && !f.endsWith('.d.ts'))
			.filter((f) => nodesOf(sourceOf({ code: read(f), line: 0 }, f)).some((n) => ts.isCallExpression(n) && RUNE.test(n.expression.getText())));
		expect(bad, `руни у звичайному модулі:\n${bad.join('\n')}`).toEqual([]);
	});

	it('модуль на рунах — camelCase.svelte.ts і не в utils/ (§ 4.1, § 5.1)', () => {
		const bad = src.filter(
			(f) => /\.svelte\.(?:(?:test|spec)\.)?[jt]s$/.test(f) && (/^[A-Z]/.test(f.slice(f.lastIndexOf('/') + 1)) || f.startsWith('src/lib/utils/'))
		);
		expect(bad, `ім'я з малої літери, тека controllers/ чи services/:\n${bad.join('\n')}`).toEqual([]);
	});

	it('псевдонім імпорту компонента збігається з іменем файлу (§ 5.2)', () => {
		const bad: string[] = [];
		for (const f of modules)
			for (const s of scriptsOf(f))
				for (const n of nodesOf(sourceOf(s, f))) {
					if (!ts.isImportDeclaration(n) || !ts.isStringLiteral(n.moduleSpecifier) || !n.importClause?.name) continue;
					const m = n.moduleSpecifier.text.match(/([^/]+)\.svelte$/);
					if (m && n.importClause.name.text !== m[1]) bad.push(`${f}: ${n.importClause.name.text} ← ${m[1]}.svelte`);
				}
		expect(bad, bad.join('\n')).toEqual([]);
	});

	it('кожен модуль досяжний графом імпортів від точок входу (§ 4.3.1)', () => {
		const reached = new Set<string>();
		const stack = modules.filter((f) => ENTRY_POINTS.some((re) => re.test(f)));
		while (stack.length) {
			const f = stack.pop() as string;
			if (reached.has(f)) continue;
			reached.add(f);
			stack.push(...edgesOf(f));
		}
		const orphans = modules.filter((f) => !reached.has(f) && !(f in KNOWN_UNREACHABLE));
		const stale = Object.keys(KNOWN_UNREACHABLE).filter((f) => reached.has(f) || !known.has(f));
		expect(orphans, `недосяжні модулі:\n${orphans.join('\n')}`).toEqual([]);
		expect(stale, `записи KNOWN_UNREACHABLE, що вже не потрібні:\n${stale.join('\n')}`).toEqual([]);
	});

	it('розмір: поза переліком — не більше орієнтира; у переліку — рівно стеля (§ 7, § 7.1)', () => {
		const bad: string[] = [];
		for (const f of modules.filter((x) => !DATA_FILES.test(x))) {
			const limit = LIMITS.find(([re]) => re.test(f))?.[1] ?? Infinity;
			const n = sloc(f);
			const ceiling = OVERSIZED[f];
			if (ceiling === undefined) {
				if (n > limit) bad.push(`${f}: ${n} SLOC понад орієнтир ${limit} — розділити`);
			} else if (n <= limit) bad.push(`${f}: ${n} SLOC уже в орієнтирі ${limit} — вилучити з OVERSIZED`);
			else if (n > ceiling) bad.push(`${f}: ${n} SLOC понад власну стелю ${ceiling} — борг зріс`);
			else if (n < ceiling) bad.push(`${f}: ${n} SLOC нижче стелі ${ceiling} — опустити стелю тим самим комітом`);
		}
		for (const f of Object.keys(OVERSIZED)) if (!known.has(f)) bad.push(`${f}: у OVERSIZED, а файлу немає`);
		expect(bad, bad.join('\n')).toEqual([]);
	});

	it('опційний сегмент маршруту [[x]] має матчер (SVELTEKIT-DATA § 2.2)', () => {
		const segments = new Set(src.filter((f) => f.startsWith('src/routes/')).flatMap((f) => f.split('/').slice(2, -1)));
		const bare = [...segments].filter((s) => /^\[\[[^\]=]+\]\]$/.test(s));
		expect(bare, 'опційний сегмент без =матчера поглинає будь-який маршрут першого рівня').toEqual([]);
	});

	it('static/: у корені лише службове, сироти — рівно записані (§ 2, § 2.1)', () => {
		const assets = walk('static');
		const refs = [...walk('scripts'), ...walk('tests'), ...src.filter((f) => f !== SELF), ...assets.filter((f) => /^static\/(llms\.txt|manifest)/.test(f))]
			.filter((f) => /\.(ts|js|mjs|svelte|html|css|json|webmanifest|txt|md)$/.test(f))
			.map((f) => withoutComments(f, read(f)))
			.join('\n');
		const stray = assets.filter((f) => !f.slice('static/'.length).includes('/') && !STATIC_ROOT.test(f));
		const orphans = assets.filter((f) => !STATIC_ROOT.test(f) && !refs.includes(f.slice('static'.length)));
		expect(stray, `у корені static/ не службове:\n${stray.join('\n')}`).toEqual([]);
		expect(orphans.sort(), 'сироти static/ розійшлися з STATIC_ORPHANS').toEqual([...STATIC_ORPHANS].sort());
	});
});
```

- [ ] Сироти `static/` шукаються за публічним шляхом у тексті джерел без коментарів (адреса ресурсу — рядок); код-модулі — лише графом (§ 4.3.1).
- [ ] Межі гейта: псевдоніми шляхів із `kit.alias` (крім `$lib`) граф не розв'язує — модуль за таким імпортом записується в `KNOWN_UNREACHABLE` з причиною; ресурс `static/`, на який посилаються відносним шляхом без початкового `/` чи збирають ім'я з частин, гейт не бачить — це код-рев'ю.
- [ ] Зворотний експеримент: руна в звичайному `.ts`; `src/lib/controllers/GameState.svelte.ts` і `src/lib/utils/timer.svelte.ts`; `import Hero from './HeroSection.svelte'`; компонент, який імпортує лише інший неімпортований компонент; `src/routes/About.svelte`, якого ніхто не імпортує; компонент на 301 SLOC; стеля в `OVERSIZED`, вища за фактичну; `src/routes/[[lang]]/` без матчера; файл у корені `static/`; сирота `static/images/old.png` без запису, а також згадана лише в коментарі (`<!-- <img src="/images/old.png"> -->`, `// /images/old.png`) — кожен червонить свій пункт. Та сама сирота, записана в `STATIC_ORPHANS`, — зелена, а щойно на неї з'явилося справжнє посилання, запис червоніє. Модуль на 243 рядки коду з JSDoc на 22 рядки лишається в орієнтирі 250; матчер у `src/params/`, колокований компонент, який імпортує `+page.svelte`, і модулі за `import.meta.glob` — зокрема `'$lib/icons/*.svelte'` — лишаються досяжними, а виключені шаблоном `'!…'` — ні; порожня `src/` червонить canary.
- [ ] Перевіряється в код-рев'ю: корінь (§ 1), колокація (§ 3), таксономія сервісів і контролерів (§ 4.2), E2E у кореневому `tests/` (§ 6) — Playwright-файл під маскою Vitest ще й червонить `test:unit`, ділення за відповідальністю (§ 7).

---

## Пов'язані документи

- [SVELTE-CORE](SVELTE-CORE-v10.md) — контролери, руни, реактивний стан
- [SVELTEKIT-DATA](SVELTEKIT-DATA-v10.md) — `src/params/`, матчери, `entries()`
- [CODE-QUALITY](CODE-QUALITY-v10.md) — тестування, мокінг, покриття
- [TESTID-AND-NAMING](../quality/TESTID-AND-NAMING-v10.md) — тип-суфікс у назвах компонентів
- [ERROR-HANDLING](../quality/ERROR-HANDLING-v10.md) — доменні класи помилок
- [I18N](../platform/I18N-v10.md) — словники
- [AI-AGENT-PITFALLS](AI-AGENT-PITFALLS-v10.md) — існування файлу ≠ досяжність
