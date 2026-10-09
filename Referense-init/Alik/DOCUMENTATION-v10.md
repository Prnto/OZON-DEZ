---
Назва: Стандарти організації проєктної документації
Версія: 10.0
Фреймворк: SvelteKit 2 + Svelte 5 (Runes)
Профіль: universal
Пріоритет: optional
Критичність: LOW
Ціна ігнорування: рішення живуть у головах і в повідомленнях комітів
Скіп-якщо: внутрішня документація проєкту не ведеться
Опис: Корінь документації `docs/` і приватна тека `.private/`, життєвий цикл документів, шаблон ADR, зв'язок з AI-інструкціями (AGENTS.md)
---

# Організація проєктної документації

Правила CRITICAL/HIGH — обов'язкові в межах профілю застосовності (див. frontmatter). MEDIUM/LOW — типові конвенції, від яких можна відхилитися з коротким обґрунтуванням. Розділи, що стосуються лише одного профілю, позначені [server]/[static].

**Мета:** агент і нова людина за хвилину знаходять потрібний документ, відрізняють актуальний від архівного й розуміють, який файл — джерело істини з кожного питання. Специфіка проєкту (префікси, хостинг, відхилення від пакета) живе в `PROJECT-CONTEXT.md` у корені ([шаблон](../PROJECT-CONTEXT-TEMPLATE.md)).

---

## 🚫 ЖОРСТКІ ОБМЕЖЕННЯ (ANTI-PATTERNS)

| Рівень | Заборона | Правильна альтернатива |
|--------|----------|----------------------|
| **HIGH** | Документація розкидана: частина в корені, частина в `docs/`, частина в `.private/` | Один корінь того, що комітиться, — `docs/` (§ 1.1) |
| **HIGH** | Кілька файлів однієї теми без позначки актуальності (`SPECS.md`, `SPECS-new.md`) | Один чинний файл; решта — в `archive/` (§ 2) |
| **HIGH** | Активний документ описує рішення, скасоване в коді | Оновити або перевести в `superseded`/`archive/` тим самим комітом (§ 8) |
| **MEDIUM** | Замітки в корені проєкту (`notes-2026-04-02.txt`) | `docs/` або `.private/notes/` (§ 1.1) |
| **MEDIUM** | Теки `delete/`, `temp/`, `test01/` у репозиторії | `.private/.temp/` поза git (§ 1.1) |
| **MEDIUM** | Тека без README-індексу | README у кожній теці `docs/` (§ 1.3) |
| **MEDIUM** | Звіт-аналіз без дати в назві | `YYYY-MM-DD-<тема>.md` (§ 4) |
| **MEDIUM** | Кирилиця, пробіли чи суфікси `-old`/`_final`/`(1)` у назвах | ASCII kebab-case, дата або архів замість суфікса (§ 2.1, § 4) |
| **LOW** | Бінарні файли (PDF, PNG) поруч із текстовими документами | `docs/assets/` (§ 1.1) |

---

## 1. Структура

### 1.1 Два корені: що комітиться і що ні

```text
docs/                 # комітиться: потрібне кожному клону й агентам у CI
├── README.md         # точка входу: що де лежить
├── adr/              # архітектурні рішення: NNN-<тема>.md
├── specs/            # специфікації можливостей
├── plans/            # плани міграцій і рефакторингу
├── analysis/         # разові звіти: YYYY-MM-DD-<тема>.md
├── runbooks/         # кроки діагностики за алертами (OBSERVABILITY § 6)
├── archive/          # застарілі документи — не видаляються
└── assets/           # зображення, PDF, знімки
.private/             # у .gitignore цілком: локальне й особисте
├── secrets/          # ключі й токени — не бачить і асистент
├── notes/            # робочі замітки
└── .temp/            # проби й тимчасові файли
```

- [ ] **HIGH.** Усе, що має пережити клонування (рішення, специфікації, runbooks), лежить у `docs/`. `.private/` не комітиться ніколи: вона лишається на одній машині, тож документ, потрібний комусь іще, туди не кладеться.
- [ ] У корені проєкту з документів — лише `README.md`, `LICENSE`, `CHANGELOG.md`, `AGENTS.md` (з тонкими вказівниками `CLAUDE.md` / `GEMINI.md`, § 6) і `PROJECT-CONTEXT.md`, який комітиться: його читають агенти й `GATE-DOC-NUMBERS`.
- [ ] Соло-проєкт може тримати робочі документи в `.private/` — тоді їх резервують окремо: втрачена тека — втрачена історія рішень.

### 1.2 Секрети не потрапляють у git

- [ ] Правило, `.gitignore` і тест — [SECURITY § 4.4](../core/SECURITY-v10.md#DOC-NO-SECRETS-IN-GIT) (CRITICAL, діє й без `docs/`): `.env*` (крім `.env.example`) і вся `.private/` ігноруються, а тест над `git ls-files` ловить і такий файл в індексі, і значення у формі секрету в будь-якому відстежуваному файлі. Тут — лише те, що з цього випливає для структури: `.private/` цілком поза git, тож документ, потрібний комусь іще, туди не кладеться (§ 1.1).
- [ ] Ignore-файл асистента ховає `.private/secrets/` і `.env*`, але не решту `.private/` і не `docs/`: це контекст, заради якого документи й пишуться ([CI-CD-AND-TOOLS § 2.2](CI-CD-AND-TOOLS-v10.md)).

### 1.3 README-індекс у кожній теці

- [ ] **MEDIUM.** Кожна тека `docs/` на будь-якій глибині має `README.md`: призначення (1–2 речення), перелік файлів (рядок на файл), правило іменування й архівування.

```markdown
# `analysis/` — звіти-аналізи
Разові звіти: продуктивність, доступність, безпека, розмір бандла. Іменування: `YYYY-MM-DD-<тема>.md`.
## Файли
- `2026-04-15-bundle-size-audit.md` — аналіз розміру бандла
## Архівування
Через 6 місяців або після виконання рекомендацій → `../archive/`.
```

---

## 2. Життєвий цикл документа

**`draft → active → superseded | archived`**

| Статус | Де лежить | Що означає |
|--------|-----------|------------|
| `draft` | `.private/notes/` або тека своєї категорії | не джерело істини; може бути переписаний |
| `active` | `adr/`, `specs/`, `plans/`, `analysis/` | джерело істини; **один файл на тему** |
| `superseded` | `adr/` (рішення) або `archive/` | замінений іншим; посилається на замінник |
| `archived` | лише `archive/` | більше не діє; не видаляється, бо пояснює історію |

- [ ] **HIGH.** На тему — один `active` документ: нова редакція правиться на місці або стара йде в `archive/`.
- [ ] ADR не переходить в `archive/`: заміщене рішення лишається в `adr/` зі статусом `superseded`, щоб ланцюжок рішень читався в одній теці й нумерація не мала дірок.

### 2.1 Заборонені суфікси

| ❌ | Чому | ✅ |
|---|---|---|
| `-old`, `_old`, `-new`, `_new` | тимчасова назва, що лишається назавжди | один файл; попередній — в `archive/` з датою |
| `_v2`, `-final`, `_FINAL_v2` | дублює історію git | git; контрольна точка — `archive/YYYY-MM-DD-<тема>.md` |
| `copy`, `backup`, `(1)` | артефакти ОС і редактора | перейменувати або видалити |

---

## 3. Frontmatter документів

Один формат для всіх документів `adr/`, `specs/`, `plans/`, `analysis/`, `archive/`:

```yaml
---
Назва: Архітектура керування станом
Статус: active # draft | active | superseded | archived
Дата оновлення: 2026-04-23
Замінює: 003-global-store.md
Замінено:
Зв'язані: [001-routing-strategy.md, ../specs/auth-flow-spec.md]
---
```

- [ ] `Статус` — одне з чотирьох значень і збігається з текою (§ 2); `Дата оновлення` — при кожній значущій зміні; `Замінює` / `Замінено` — відносні посилання, заповнені для `superseded`; `Зв'язані` — посилання для агента, що шукає контекст.

---

## 4. Іменування

| Тип | Формат | Приклад |
|-----|--------|---------|
| ADR | `NNN-<тема>.md`, номер монотонно зростає | `001-state-management.md` |
| Звіт-аналіз | `YYYY-MM-DD-<тема>.md` | `2026-04-15-bundle-size-audit.md` |
| Специфікація | `<можливість>-spec.md`, версія — у frontmatter | `auth-flow-spec.md` |
| Замітка | `YYYY-MM-DD-<тема>.md` | `2026-04-13-debugging-session.md` |

- [ ] **MEDIUM.** Скрізь — kebab-case, лише ASCII без пробілів, дати ISO 8601, без суфіксів з § 2.1.

---

## 5. Шаблон ADR

```markdown
---
Назва: Мова в сегменті адреси, а не в параметрі
Статус: active
Дата оновлення: 2026-03-11
Замінює: 007-language-query-param.md
Замінено:
Зв'язані: [../specs/i18n-spec.md]
---

# 012. Мова в сегменті адреси

## Контекст
Що змушує ухвалювати рішення: факти, обмеження, заміри. Без оцінок.

## Рішення
Що робимо — одним-двома реченнями в теперішньому часі.

## Наслідки
Що стає простішим, що дорожчим, які правила й гейти це тримають.

## Розглянуті варіанти
Кожен відкинутий варіант — одним рядком із причиною.
```

- [ ] ADR не редагується заднім числом: змінене рішення — новий ADR із `Замінює:`, а старий отримує `Статус: superseded` і `Замінено:`.

---

## 6. Зв'язок з AI-інструкціями (`AGENTS.md`)

`AGENTS.md` — єдине джерело AI-інструкцій ([CI-CD-AND-TOOLS § 2.1](CI-CD-AND-TOOLS-v10.md)); `CLAUDE.md` / `GEMINI.md` — вказівники на нього. `AGENTS.md` містить карту документації:

```markdown
## Карта документації
Точка входу — `docs/README.md`; специфіка проєкту — `PROJECT-CONTEXT.md`.
- `docs/adr/` — рішення. Джерело істини.
- `docs/specs/` — специфікації. Джерело істини.
- `docs/plans/` — плани в роботі.
- `docs/analysis/` — разові звіти.
- `docs/archive/` — застаріле, не редагувати.
При суперечності: код > `adr/` > `specs/` > `plans/` > замітки.
```

---

## 7. Контрольний список перед релізом

- [ ] Один корінь того, що комітиться, — `docs/`; у кожній теці є README.
- [ ] Жодного `-old` / `_new` / `_final` серед активних; звіти мають дату в назві.
- [ ] Кожен документ має frontmatter зі статусом, що збігається з текою.
- [ ] `.env*` і `.private/` у `.gitignore` ([SECURITY § 4.4](../core/SECURITY-v10.md#DOC-NO-SECRETS-IN-GIT)); ignore-файл асистента не ховає `docs/`.
- [ ] `AGENTS.md` посилається на `docs/README.md` і `PROJECT-CONTEXT.md`.

---

## 8. Документ, що суперечить коду, гірший за відсутній

- [ ] **HIGH.** Активний документ, що описує скасоване в коді рішення, виправляється або переходить у `superseded` / `archive/` **тим самим комітом**, що змінює код: агент довіряє написаному й відтворює скасований підхід.
- [ ] Перед релізом — звірка: чи не описує якийсь `active` документ того, чого в коді вже немає.

---

## 9. Міграція наявного хаосу

1. Зібрати всі `*.md` і `*.txt` поза `node_modules`, `build`, `.svelte-kit`; кожному — категорію з § 1.1.
2. Створити `docs/` з теками й README; `docs/README.md` — точка входу.
3. Перенести й перейменувати за § 4, додати frontmatter; дублікати — в `archive/` з датою; теки `delete/`, `tmp/` — переглянути й видалити.
4. Оновити карту в `AGENTS.md` (§ 6).
5. Зафіксувати одним комітом.

---

## 10. Автоматична перевірка

Правила файлу перевіряє юніт-тест (`npm run test:unit`); тест пропускає перевірки `docs/` через `it.skipIf`, якщо теки немає, а перевірку кореня виконує завжди. Секрети в індексі git стереже тест [SECURITY § 4.4](../core/SECURITY-v10.md#DOC-NO-SECRETS-IN-GIT):

```ts
// src/docs-structure.test.ts — DOCUMENTATION § 10
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DOCS = 'docs';
const ROOT_ALLOWED = new Set([
	'README.md',
	'LICENSE',
	'LICENSE.md',
	'LICENSE.txt',
	'CHANGELOG.md',
	'AGENTS.md',
	'CLAUDE.md',
	'GEMINI.md',
	'PROJECT-CONTEXT.md'
]);
/** Документ за розширенням: текст, офісні формати, PDF і зображення — те, що кладуть «поруч із README». */
const DOCUMENT = /\.(?:md|markdown|txt|rst|adoc|pdf|docx?|odt|rtf|png|jpe?g|gif|webp)$/i;
/** Двійкові файли документації лежать лише в `docs/assets/` (§ 1.1). */
const BINARY = /\.(?:pdf|docx?|odt|xlsx?|pptx?|png|jpe?g|gif|webp|svg|zip)$/i;
/** Тимчасові теки (§ 1.1): їхнє місце — `.private/.temp/` поза git. */
const TEMP_DIR = /^(?:delete|deleted|temp|tmp|trash|test\d+)$/i;
/** Теки, які пишуть інструменти й git не відстежує. */
const GENERATED = new Set(['node_modules', 'build', 'dist', 'coverage', 'test-results', 'playwright-report', 'lhci-report', 'reports']);
const STATUSES = new Set(['draft', 'active', 'superseded', 'archived']);

/** Приховані файли (`.gitkeep`, `.DS_Store`) — не документи. */
const walk = (dir: string): string[] =>
	readdirSync(dir)
		.filter((name) => !name.startsWith('.'))
		.flatMap((name) => {
			const path = join(dir, name).split('\\').join('/');
			return statSync(path).isDirectory() ? [path + '/', ...walk(path)] : [path];
		});
const docs = existsSync(DOCS) ? walk(DOCS) : [];
const files = docs.filter((path) => !path.endsWith('/'));
const folders = docs.filter((path) => path.endsWith('/'));
const statusOf = (file: string) => /^Статус:\s*(\S+)/m.exec(readFileSync(file, 'utf8'))?.[1];
/** Сегмент шляху — ASCII kebab-case, у файлу ще й розширення малими літерами; `README.md` — індекс теки. */
const segmentOk = (segment: string) =>
	segment === 'README.md' || /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+)?$/.test(segment);
/** Теки репозиторію, крім прихованих і згенерованих, — там лишаються `temp/` і `delete/`. */
const repoDirs = (dir: string): string[] =>
	readdirSync(dir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && !GENERATED.has(entry.name))
		.flatMap((entry) => {
			const path = dir === '.' ? entry.name : `${dir}/${entry.name}`;
			return [path, ...repoDirs(path)];
		});

describe('документація', () => {
	it('у корені проєкту — лише дозволені документи (§ 1.1)', () => {
		const stray = readdirSync('.').filter((name) => DOCUMENT.test(name) && !ROOT_ALLOWED.has(name) && statSync(name).isFile());
		expect(stray, `перенести в ${DOCS}/ або .private/notes/`).toEqual([]);
	});

	it('у репозиторії немає тимчасових тек (§ 1.1)', () => {
		const temp = repoDirs('.').filter((dir) => TEMP_DIR.test(dir.split('/').pop() ?? ''));
		expect(temp, 'тимчасовому місце в .private/.temp/').toEqual([]);
	});

	it.skipIf(docs.length === 0)('двійкові файли — лише в docs/assets/ (§ 1.1)', () => {
		expect(files.filter((path) => BINARY.test(path) && !path.startsWith(`${DOCS}/assets/`))).toEqual([]);
	});

	it.skipIf(docs.length === 0)('імена — ASCII kebab-case без суфіксів актуальності (§ 2.1, § 4)', () => {
		const bad = docs.filter(
			(path) =>
				path.split('/').slice(1).filter(Boolean).some((segment) => !segmentOk(segment)) ||
				/-(new|old|final|copy|backup|v\d+)(\.[a-z0-9]+)?\/?$/.test(path)
		);
		expect(bad).toEqual([]);
	});

	it.skipIf(docs.length === 0)('кожна тека документації має README-індекс (§ 1.3)', () => {
		const missing = [DOCS + '/', ...folders].filter((folder) => !existsSync(folder + 'README.md'));
		expect(missing).toEqual([]);
	});

	it.skipIf(docs.length === 0)('звіти-аналізи мають дату в назві (§ 4)', () => {
		const bad = files
			.filter((path) => path.startsWith(`${DOCS}/analysis/`) && !path.endsWith('/README.md'))
			.filter((path) => !/\/\d{4}-\d{2}-\d{2}-[^/]+\.md$/.test(path));
		expect(bad).toEqual([]);
	});

	it.skipIf(docs.length === 0)('статус із переліку й синхронний із текою (§ 2, § 3)', () => {
		const documents = files.filter(
			(path) => /^docs\/(adr|specs|plans|analysis|archive)\//.test(path) && path.endsWith('.md') && !path.endsWith('/README.md')
		);
		const wrong = documents
			.map((path) => ({ path, status: statusOf(path) }))
			.filter(({ path, status }) => {
				if (!status || !STATUSES.has(status)) return true;
				if (path.startsWith(`${DOCS}/archive/`)) return status !== 'archived' && status !== 'superseded';
				// `superseded` поза архівом — лише ADR: замінений документ іншої теки переходить в `archive/` (§ 2).
				if (status === 'superseded') return !path.startsWith(`${DOCS}/adr/`);
				return status === 'archived';
			})
			.map(({ path, status }) => `${path}: Статус ${status ?? 'відсутній'}`);
		expect(wrong).toEqual([]);
	});
});
```

Зворотний експеримент: зайвий `.md` у корені, `notes-2026-04-02.txt` і `diagram.png` у корені, теки `temp/`, `delete/` і `src/test01/`, `SPECS.md`, `auth_flow.md`, `Notes.md`, `SPECS_old.md`, `plan-v2.md`, `plan (1).md`, `diagram.PNG`, `specs/diagram.png` поза `assets/`, кирилична тека, вкладена тека без README, аналіз без дати, `archived` поза `archive/`, `active` в `archive/`, `superseded` у `specs/`, невідомий статус — кожне червонить рівно свій тест; правильна структура (`README.md`, `LICENSE.txt`, `001-state-management.md` зі `superseded` в `adr/`, `2026-04-15-bundle-size-audit.md`, `auth-flow-spec.md`, `assets/diagram-1.png`, згенеровані `build/` і `node_modules/`, `.private/.temp/`) — зелена.

Межі гейта: документ поза переліком розширень (`.key`, `.pages`) і тимчасова тека з іншим ім'ям (`old/`, `scratch/`) — код-рев'ю.

Перевіряється в код-рев'ю: один `active` документ на тему (§ 2), відповідність документів коду (§ 8), зміст ADR за шаблоном (§ 5).

---

## Пов'язані документи

- [PROJECT-STRUCTURE-v10.md](../core/PROJECT-STRUCTURE-v10.md) — файлова структура проєкту
- [CI-CD-AND-TOOLS-v10.md](CI-CD-AND-TOOLS-v10.md) — `AGENTS.md`, ignore-файли асистента
- [PROJECT-CONTEXT-TEMPLATE.md](../PROJECT-CONTEXT-TEMPLATE.md) — специфіка конкретного проєкту
- [OBSERVABILITY-v10.md](OBSERVABILITY-v10.md) — runbooks для алертів
- [VERSIONING-v10.md](VERSIONING-v10.md) — версіонування коду
