---
Назва: Чеклист бета-тестування — службова сторінка перевірок для людей
Версія: 10.0
Фреймворк: SvelteKit 2 + Svelte 5 (Runes)
Профіль: universal
Пріоритет: optional
Критичність: MEDIUM
Ціна ігнорування: те, чого машина не вміє перевірити, не перевіряє ніхто; дефект знаходить користувач, і випадково
Скіп-якщо: у проєкті немає автоматичних тестів — тоді спершу вони. Чеклист для людини має сенс як ДОПОВНЕННЯ до машинних перевірок, а не як їхня заміна
Опис: Список перевірок для живої людини як ДАНІ з інваріантами: три рівні покриття автотестами, позначка з версією збірки, звіт у буфер, поступ по вкладці, сторінка поза індексом
---

# Чеклист бета-тестування

Правила CRITICAL/HIGH — обов'язкові в межах профілю застосовності (див. frontmatter). MEDIUM/LOW — типові конвенції, від яких можна відхилитися з коротким обґрунтуванням.

Автотести перевіряють те, що вміє перевірити машина. Решту — чи натискається кнопка пальцем, чи бачать двоє людей на двох пристроях однакову дошку, чи не інвертує кольори системний темний режим — перевіряє людина, і їй дають роботу **списком**: службова сторінка з пунктами, чотирма станами відповіді й звітом у буфер обміну. Файл описує, як цей список не дає збрехати. Адреса й вигляд сторінки в родині сайтів автора — [BETA-CHECKLIST-PAGE.md](../../../product_criteria/v10/BETA-CHECKLIST-PAGE.md).

---

## 🚫 ЖОРСТКІ ОБМЕЖЕННЯ (ANTI-PATTERNS)

| Рівень | Заборона | Правильна альтернатива |
|--------|----------|----------------------|
| **HIGH** | Чеклист як текстовий файл (`QA.md`, сторінка в Notion) без машинної перевірки | Чеклист — дані в репозиторії з інваріантами (§ 5) |
| **HIGH** | Маршрут, якого не заявляє жодна вкладка | Вкладка називає маршрути; інваріант (§ 5.1) |
| **HIGH** | Пункт «натисніть…» без локатора | `testid` обов'язковий (§ 5.3) |
| **HIGH** | `coverage: 'covered'` без файлу тесту або з файлом, якого немає | Назва обов'язкова, існування перевіряється (§ 5.2) |
| **HIGH** | Позначка без версії збірки | Позначка несе версію (§ 3.1) |
| **HIGH** | Сторінка чеклиста в sitemap, без `noindex` або з canonical | Перевірка над `build/` в обидва боки (§ 5.5) |
| **HIGH** | `Disallow` у `robots.txt` разом із `noindex` на тій самій сторінці | Лише `noindex` (§ 4.0) |
| **HIGH** | Сталий локатор на рядку, що малюється по разу на пункт (`beta-check-item`) | Локатор несе `id` пункта (§ 5.6) |
| **MEDIUM** | Кнопка «стерти позначки», що стирає з одного натискання | Два кроки (§ 6.3) |
| **MEDIUM** | Дві мови двома деревами файлів | Обидві мови в одному об'єкті (§ 2.4) |
| **MEDIUM** | Номер пункта, вписаний у текст, або `id`, перенумерований при вставці | Номер — із позиції, `id` — назавжди (§ 2.2) |
| **MEDIUM** | Оціночні слова в тексті: «адекватно», «коректно», «нормально» | Видимий чи чутний вияв (§ 2.1) |
| **MEDIUM** | Вкладка без пункта-межі («не мусить») | § 2.3 |
| **MEDIUM** | Копіювання звіту без запасного шляху | Текст у полі поруч (§ 6.2) |
| **MEDIUM** | Сторінка чеклиста без e2e | § 5.7 |
| **MEDIUM** | `role="tablist"` / `role="tab"` без `tabpanel`, `aria-controls` і стрілок | Кнопки з `aria-pressed` (§ 8.2) |
| **MEDIUM** | Версія збірки, вписана в чеклист руками | Єдине джерело версії (§ 8.5) |
| **MEDIUM** | Позначка пункта, якого вже немає, рахується в поступі | Сховище — недовірений ввід (§ 8.6) |
| **LOW** | Рівень `covered` більший за `manual` у вкладці | § 3.4 |

---

## 1. Коли чеклист виправданий

Виправданий, коли **збігаються дві умови**: у проєкті вже є автоматичні перевірки
(чеклист починається там, де вони закінчуються), і є хоч одна людина, крім автора,
яка відкриє сайт із бажанням допомогти. Не потрібен там, де перевіряти варто лише
покрите: серверна логіка без інтерфейсу, бібліотека, CLI.

---

## 2. Пункт

### 2.1 Текст — для людини, з видимим виявом

Пункт — це дія та її наслідок, і наслідок **видимий або чутний**.

```text
❌ Перевірте, що теми працюють адекватно
✅ Натисніть кнопку теми в шапці. Мусить відкритися список із чотирьох тем, у
   якому позначено поточну; вибір теми зі списку одразу міняє кольори
```

- [ ] **MEDIUM.** Жодних оціночних слів: двоє людей мусять поставити однакову позначку на тому самому екрані. Числа, відстані й відсотки — лише якщо їх видно на екрані.
- [ ] **LOW.** Жодних внутрішніх назв: файлів, локаторів, `$state`, сервісів, службових термінів.

### 2.2 `id` стабільний, номер — із позиції <a id="BETA-ID-STABLE"></a>

- [ ] **MEDIUM.** `id` — ключ прогресу в сховищі й не змінюється ніколи: форма
      `{вкладка}_{номер}`, нові пункти **дописуються** з новим номером, наявні не
      перенумеровуються навіть при зміні порядку. Перейменований `id` стирає
      людині позначку.
- [ ] Номер, який людина бачить, сторінка малює з позиції **у вкладці** (наскрізно
      через рівні), а не з тексту: людина каже «зламалося на третьому», і номер
      мусить означати рівно один рядок на екрані.

### 2.3 Перевірка МЕЖІ в кожній вкладці <a id="BETA-NEGATIVE-CHECK"></a>

- [ ] **MEDIUM.** У кожній вкладці є пункт-межа (`negative: true`): ліміт, що
      перестав діяти, виглядає так само, як ліміт, що діє, і «не мусить» треба
      питати окремо — інакше цього не натисне ніхто.

### 2.4 Дві мови — в одному об'єкті

```typescript
// src/lib/beta/types.ts
export interface Localized {
    uk: string;
    en: string;
}

/** Мова чеклиста: `uk` чи `en` — решта мов інтерфейсу показує англійський текст (§ 2.4, § 8.3). */
export type ChecklistLang = keyof Localized;

export type Coverage = 'manual' | 'testable' | 'covered';

interface CheckBase {
    id: string; // стабільний назавжди — ключ прогресу (§ 2.2)
    category: Localized;
    text: Localized;
    testid?: string; // обов'язковий, коли пункт просить натиснути елемент (§ 5.3)
    shortcut?: string; // клавіша, яку пункт просить натиснути (§ 5.3.1); не `key` — див. там
    negative?: true; // перевірка межі (§ 2.3)
}

/** `test` обов'язковий для covered і заборонений для решти — вимогу тримає тип (§ 3, § 5.2). */
export type BetaCheck = CheckBase &
    ({ coverage: 'covered'; test: string } | { coverage: 'manual' | 'testable'; test?: never });

export interface BetaTab {
    id: string;
    title: Localized;
    routes: string[]; // ідентифікатори маршрутів із src/routes (`/[[lang=lang]]/about`), які вкладка накриває (§ 5.1)
    checks: BetaCheck[];
}
```

```typescript
// src/lib/beta/checklist.ts — дані чеклиста: їх малює сторінка й перевіряє тест § 5.4
import hidden from '$lib/i18n/hidden-routes.json';
import type { BetaTab } from './types';

/** Адреса сторінки — рішення проєкту; єдине джерело — перелік прихованих маршрутів (§ 4.1). */
export const BETA_ROUTE: string = hidden.betaChecklist;

export const BETA_TABS: BetaTab[] = [
    // Вкладки, маршрути й пункти — дані проєкту: зразок нижче замінюється переліком його сторінок (§ 5.1).
    {
        id: 'common',
        title: { uk: 'Спільне', en: 'Common' },
        routes: ['/'],
        checks: [
            {
                id: 'common_1',
                category: { uk: 'Тема', en: 'Theme' },
                text: { uk: 'Натисніть кнопку теми в шапці. Мусить відкритися список тем із позначеною поточною', en: 'Press the theme button in the header. A list of themes must open with the current one marked' },
                testid: 'theme-menu-btn',
                coverage: 'manual'
            },
            {
                id: 'common_2',
                category: { uk: 'Тема', en: 'Theme' },
                text: { uk: 'Оберіть темну тему й перезавантажте сторінку. Світла тема не мусить блимнути', en: 'Pick the dark theme and reload the page. The light theme must not flash' },
                testid: 'theme-dark-btn',
                negative: true,
                coverage: 'manual'
            }
        ]
    }
];

/** Маршрути, яким вкладка не потрібна (§ 5.1): ідентифікатор → причина, видно в diff. */
export const BETA_UNCOVERED_ROUTES: Record<string, string> = {};
/** Записане відхилення від § 3.4: вкладка → число covered, що лише спадає (§ 3.4.1). */
export const COVERED_DEBT: Record<string, number> = {};
```

- [ ] **MEDIUM.** Обидві мови — в одному об'єкті: пункт без англійського тексту
      не збереться, і окрема перевірка міжмовної відповідності не потрібна.
- [ ] Тексти пунктів не живуть у словнику інтерфейсу: їх десятки, вони змінюються
      іншим циклом, і паритет усіх мов інтерфейсу
      ([I18N-v10.md](../platform/I18N-v10.md)) зробив би кожну правку N-кратною.
      Решта мов показує англійський текст.
- [ ] Якщо проєкт має типографський форматер тексту (нерозривні пробіли тощо),
      текст пункта проходить через нього так само, як текст зі словника.

---

## 3. Три рівні покриття й порядок показу

| Рівень | Що означає | `test` |
|---|---|---|
| `manual` | око, палець, друга людина, справжній телефон | заборонений |
| `testable` | автотестом покрити можна, покриття немає | заборонений |
| `covered` | покрито; файл тесту названий | **обов'язковий** |

Показуються **саме в цьому порядку** (`sortChecks`, § 5): людина витрачається спершу
там, де машини немає; `testable` — готовий беклог тестів із назвами; `covered`
працює як **контрольна група**: помилка, знайдена в покритому місці, — це звіт про
дефект **тесту**, і у звіті вона видна окремим рядком (§ 6.1).

- [ ] Рівень визначається тим, що тест **справді доводить**, а не темою: «жоден напис не зливається з тлом» не є `covered` через тест «у кожної теми повний набір токенів» — набір токенів і контраст їхніх значень різні твердження.

### 3.1 Позначка несе версію збірки <a id="BETA-VERSION-STAMP"></a>

- [ ] **HIGH.** Позначка — `{ vote, version }`. Позначка з іншої версії **не
      зникає**, а підписана «позначено на іншій версії» й **не рахується** в
      «зроблено на цій» (`doneOnVersion`, § 5): без цього список поступово стає
      звітом про минуле, який читають як звіт про теперішнє.

### 3.2 Чотири кнопки відповіді й п'ять станів пункта <a id="BETA-FOUR-VOTES"></a>

Кнопки пропонують чотири варіанти в усталеному порядку:
`Працює` (`ok`) → `Не працює` (`fail`) → `Не зрозуміло` (`unclear`) → `Пропустити` (`skip`).
П'ятий стан — пункт ще не оцінювався (позначки немає). Варіант «Не зрозуміло» ловить випадки, коли тестувальник не впевнений або не розуміє очікуваної поведінки; «Пропустити» фіксує переглянутий, але пропущений крок (наприклад, через відсутність потрібного пристрою чи акаунта).

- [ ] **MEDIUM.** Порядок кнопок стабільний: `['ok', 'fail', 'unclear', 'skip']` («Працює», «Не працює», «Не зрозуміло», «Пропустити»).
- [ ] **MEDIUM.** Колірна диференціація кнопок:
  - `Працює` (`ok`) — зелений (`light-dark(#15803d, #22c55e)`);
  - `Не працює` (`fail`) — червоний (`light-dark(#dc2626, #ef4444)`);
  - `Не зрозуміло` (`unclear`) — жовтий / бурштиновий (`light-dark(#b45309, #fbbf24)`);
  - `Пропустити` (`skip`) — блакитний (`light-dark(#0284c7, #38bdf8)`).
- [ ] До натискання (необрана кнопка) має нейтральний колір поверхні з легким кольоровим відтінком (наприклад, `color-mix(in srgb, var(--bg-surface), var(--vote-*) 8%)` та межа `color-mix(in srgb, var(--border-main), var(--vote-*) 35%)`), щоб призначення кнопки відчувалося ще до вибору.
- [ ] Обрана кнопка (`.picked`) отримує виразний акцентний стиль: товщина межі (4px), напівжирний напис, кольорове тло й текст.
- [ ] **MEDIUM.** Контейнер картки питання (`.check`) при наявності відповіді змінює обводку на 2px відповідного кольору (`vote-ok`, `vote-fail`, `vote-unclear`, `vote-skip`): тестувальник здалеку бачить характер усіх відповідей у списку.
- [ ] Стан позначається не лише кольором (рамка, товщина, напівжирний, текст кнопки) — [ACCESSIBILITY § 5](ACCESSIBILITY-v10.md).

### 3.3 Повторне натискання того самого стану знімає позначку <a id="BETA-VOTE-UNDO"></a>

- [ ] **MEDIUM.** Кнопок чотири, станів п'ять: повернення до стану без позначки —
      повторне натискання вже натиснутого (`vote`, § 5). На позначці з **іншої**
      версії повторне натискання не стирає, а перепоставляє її на цій збірці —
      інакше людина, що підтверджує старе «працює», втрачає його.

### 3.4 Пропорція рівнів: `covered` не більший за `manual` <a id="BETA-LEVEL-BALANCE"></a>

- [ ] **LOW.** У кожній вкладці `covered` не перевищує `manual`: контрольна група
      на пів списку — половина часу людини туди, де машина вже дивиться. Лікується
      або дописаними `manual`-пунктами, або прибраними `covered`, яких людині
      перевіряти не варто.

#### 3.4.1 Відхилення оформлюється храповиком, а не рядком <a id="BETA-BALANCE-RATCHET"></a>

- [ ] **LOW.** Записане відхилення від § 3.4 — число в мапі `COVERED_DEBT`, що
      може лише спадати; вкладка, яка вирівнялася, червонить прогін, доки її не
      приберуть із мапи (тест § 5). Рядок обґрунтування в коментарі дозволяє
      числу рости й переживає свою причину.

---

## 4. Сторінка поза індексом

Службова сторінка прихована рівно настільки: немає в меню й у жодному переліку
розділів; `<meta name="robots" content="noindex, nofollow">`; немає в sitemap і
немає взаємних `hreflang`. Це **не** секрет: адреса працює завжди, і її дають
посиланням тому, хто згодився допомогти.

### 4.0 `Disallow` і `noindex` — альтернативи, а не набір <a id="BETA-NOINDEX-OVER-DISALLOW"></a>

`Disallow` забороняє **завантаження**: краулер, який його виконав, сторінки не
читає — отже, `noindex` у ній не читає теж. А адреса, на яку хтось послався
ззовні, потрапляє в індекс без вмісту — голим URL, якого не прибрати, бо прибирає
його саме той тег, якого краулер не бачить.

- [ ] **HIGH.** Сторінка з `noindex` **не** закривається `Disallow`. `Disallow` —
      лише для адрес, які не можна віддавати краулеру взагалі (важкий генератор,
      службовий API); `noindex` у такій відповіді не потрібен.
- [ ] Профіль без SSR, де `noindex` ставить клієнт після гідрації, — тим паче без
      `Disallow`: тег бачить лише краулер, який сторінку завантажив і відмалював.

### 4.1 Один механізм на три вимоги

- [ ] Перелік прихованих маршрутів — файл даних `src/lib/i18n/hidden-routes.json`,
      який належить I18N і є в кожному проєкті з мовними адресами — порожній `{}`,
      коли прихованих сторінок немає ([I18N § 3.1](../platform/I18N-v10.md#I18N-LANG-IN-PATH)).
      Чеклист лише дописує свій ключ (`{ "betaChecklist": "beta-test-checklists" }`,
      адресу обирає проєкт); `HIDDEN_ROUTES` експортує модуль політики адрес I18N
      § 3.1. `checklist.ts` бере з файлу `BETA_ROUTE`, а скрипт над `build/`
      (§ 5.5), e2e (§ 5.7) і перелік маршрутів e2e
      ([ACCESSIBILITY § 10.3](ACCESSIBILITY-v10.md)) читають той самий JSON —
      TypeScript їм недоступний. Не в layout і не копією в скрипті.
- [ ] Layout не малює для них `canonical` і `hreflang`, а sitemap будується зі
      згенерованих сторінок, у яких canonical є, — одне рішення закриває всі три
      вимоги.

### 4.2 Назва маршруту — лише ASCII <a id="BETA-ASCII-SLUG"></a>

- [ ] **MEDIUM.** Кириличний гомогліф (`с` U+0441 замість `c`) дає адресу, що
      виглядає правильною й не працює: у шляху вона percent-кодується, і посилання,
      sitemap та `robots.txt` розходяться непомітно для diff. Перевірка — § 5.5.

### 4.3 Те, що в `robots.txt` усе-таки є, будується з переліку <a id="BETA-ROBOTS-GENERATED"></a>

- [ ] **MEDIUM.** Рядки `Disallow` будуються з переліку заблокованих для обходу
      адрес (`CRAWL_BLOCKED`) на **кожну** мову — `/search/` і `/en/search/` різні
      адреси — у маршруті `src/routes/robots.txt/+server.ts` із `prerender = true`,
      а не пишуться руками в `static/robots.txt`, де переліку немає входу.
- [ ] `CRAWL_BLOCKED` ≠ `HIDDEN_ROUTES`: сторінки з `noindex` у `Disallow` не
      потрапляють (§ 4.0). Один спільний список і ставить `Disallow` там, де він
      шкодить.
- [ ] `robots.txt` діє лише в **корені хоста**: у підтеці GitHub Pages
      (`/Project/robots.txt`) його не читає ніхто, а SEO-гейт таку збірку валить
      ([SEO § 7.2](../platform/SEO-v10.md#SEO-ROBOTS)). Проєкт у підтеці маршруту
      не має: його рядки живуть у `robots.txt` кореневого сайту — або їх немає
      взагалі. Маршрут, скопійований у такий проєкт, зупиняє збірку сам.

```typescript
// src/routes/robots.txt/+server.ts — лише для сайту в корені хоста (SEO § 7.2)
import { SITE_BASE } from '$lib/config/site';
import { DEFAULT_LANGUAGE, HAS_LANGUAGE_ROUTES, LANGUAGES, languagePath } from '$lib/i18n/routing';
import type { Language } from '$lib/i18n/translations';

export const prerender = true;

/** Нейтральні шляхи, яких краулер не завантажує взагалі: важкий генератор, службовий API. Сторінок із noindex тут немає (§ 4.0). */
const CRAWL_BLOCKED: readonly string[] = ['/search/'];

export function GET(): Response {
    // SITE_BASE — `base` з $app/paths (SEO § 1.2): у підтеці файл ліг би на /<repo>/robots.txt, якого не читає жоден краулер.
    if (SITE_BASE.length > 0) throw new Error('robots.txt is served only from the host root (SEO § 7.2); move these lines to the root site');
    // Мовні адреси будує та сама функція, що й посилання (I18N § 3.1).
    const languages: readonly Language[] = HAS_LANGUAGE_ROUTES ? LANGUAGES : [DEFAULT_LANGUAGE];
    const lines = CRAWL_BLOCKED.flatMap((path) => languages.map((lang) => `Disallow: ${languagePath(lang, path)}`));
    return new Response(['User-agent: *', ...lines, ''].join('\n'), { headers: { 'content-type': 'text/plain' } });
}
```

---

## 5. Інваріанти

Найдорожча пастка чеклиста — **відставання**: код змінився, пункт лишився, і людина
ставить «перевірено» на тому, чого вже немає. Правило в документі помічає це тоді,
коли документ хтось перечитає; інваріант — на кожному прогоні. Логіка сторінки, яку
вони перевіряють, — окремий модуль:

```typescript
// src/lib/beta/progress.ts
import type { BetaCheck, Coverage } from './types';

export type Vote = 'ok' | 'fail' | 'unclear' | 'skip';
export interface Mark {
    vote: Vote;
    version: string;
}
export type Marks = Record<string, Mark>;

const VOTES: readonly string[] = ['ok', 'fail', 'unclear', 'skip'];
const ORDER: Record<Coverage, number> = { manual: 0, testable: 1, covered: 2 };

/** § 3: manual → testable → covered; усередині рівня — порядок оголошення (sort стабільний). */
export const sortChecks = (checks: readonly BetaCheck[]) => [...checks].sort((a, b) => ORDER[a.coverage] - ORDER[b.coverage]);

/** § 3.3: те саме натискання знімає позначку; на позначці з іншої версії — перепоставляє. */
export function vote(marks: Marks, id: string, next: Vote, version: string): Marks {
    const current = marks[id];
    const copy = { ...marks };
    if (current?.vote === next && current.version === version) delete copy[id];
    else copy[id] = { vote: next, version };
    return copy;
}

/** § 8.6: прочитане зі сховища — недовірений ввід: лише відомі id і правильна форма. */
export function readMarks(raw: unknown, known: ReadonlySet<string>): Marks {
    const out: Marks = {};
    if (!raw || typeof raw !== 'object') return out;
    for (const [id, value] of Object.entries(raw)) {
        const mark = value as { vote?: unknown; version?: unknown } | null;
        if (known.has(id) && mark && VOTES.includes(String(mark.vote)) && typeof mark.version === 'string') {
            out[id] = { vote: mark.vote as Vote, version: mark.version };
        }
    }
    return out;
}

/** § 3.1, § 8.1: «зроблено» — лише позначки цієї версії. */
export const doneOnVersion = (checks: readonly BetaCheck[], marks: Marks, version: string) =>
    checks.filter((check) => marks[check.id]?.version === version).length;

/** § 5.6: локатор із id — `common_1` → `common-1`. */
export const tid = (id: string) => id.replaceAll('_', '-');
```

### 5.1 Кожен маршрут заявлений вкладкою <a id="BETA-ROUTE-CLAIMED"></a>

- [ ] **HIGH.** Кожен маршрут проєкту заявлений **рівно однією** вкладкою, а
      виняток («ця адреса чеклиста не потребує») — явним переліком
      `BETA_UNCOVERED_ROUTES` із причиною. Вкладка називає **маршрути** —
      ідентифікатори з `src/routes`, як їх бачить SvelteKit, — а не гру чи розділ
      словами: тест § 5.4 бере маршрути з теки, і другий список, який тримають
      руками, там не потрібен. Сама сторінка чеклиста вкладки не має.
- [ ] Там, де вкладки ділять одну сторінку за темою (тема, мова, доступність), а
      маршрутів менше, ніж вкладок, «рівно однією» недосяжне: вимога слабшає до
      «жодна вкладка не називає маршруту, якого немає, і жоден маршрут не лишився
      без вкладки».

#### 5.1.1 Те саме — для спільних елементів керування <a id="BETA-CONTROL-CLAIMED"></a>

- [ ] **LOW.** Кожен елемент керування спільної шапки заявлений пунктом: новий
      перемикач у шапці не робить червоним жодного маршрутного інваріанта.
      Перелік — `HEADER_CONTROLS` у `src/lib/components/header/controls.ts` поруч
      із компонентом шапки: testid кожного елемента керування, дописаний тим самим
      diff, що й сам елемент (це — код-рев'ю), а тест § 5.4 звіряє з ним пункти.
      Проєкт без шапки з елементами керування модуля не має: правило не
      застосовується, і тест бере порожній перелік.

```typescript
// src/lib/components/header/controls.ts — лише в проєкті, чия спільна шапка має елементи керування
/** testid елементів керування шапки (TESTID-AND-NAMING § 1.3): новий елемент дописується сюди тим самим diff. */
export const HEADER_CONTROLS: readonly string[] = ['theme-menu-btn'];
```

### 5.2 `covered` називає файл тесту, і файл існує <a id="BETA-COVERED-NAMES-TEST"></a>

- [ ] **HIGH.** Для `covered` файл тесту названий (це тримає тип § 2.4) і
      **існує на диску** (це — тест): твердження про покриття гниє швидше за сам
      чеклист.

### 5.3 «Натисніть» вимагає локатора <a id="BETA-TESTID-REQUIRED"></a>

- [ ] **HIGH.** Пункт, що просить натиснути, торкнутися, клацнути, клікнути чи обрати
      елемент, називає `testid`, і такий локатор є в джерелах. Дієслово шукається
      в обох мовах пункта (`press`, `click`, `tap`, `select`, `choose`, `pick`):
      інакше «Оберіть тему» проходить без локатора, хоча просить натиснути пункт
      списку. Необов'язкове поле робить
      пункт неперевірним за побудовою: локатор не знайшли — поле прибрали — пункт
      описує логіку, якої давно немає.
- [ ] Локатори збираються так, як їх збирає браузер: шаблон `{testId}-btn` у
      компоненті розкривається значеннями пропа, що веде шаблон (`testId`
      [TESTID-AND-NAMING § 1.7](TESTID-AND-NAMING-v10.md), `scope`), з місць
      виклику компонента — зокрема складеними (`` <CloseButton testId={`${testId}-modal`} /> ``
      у `Modal` з `testId="settings"` дає `settings-modal-close-btn`), — а інша
      динамічна частина стає шаблоном. Без цього `*-btn` підійшло б до будь-чого.

#### 5.3.1 Пункт про клавішу називає клавішу, яку застосунок обробляє <a id="BETA-SHORTCUT-CLAIMED"></a>

- [ ] **MEDIUM.** Пункт «натисніть `Пробіл`» має поле `shortcut` (латинська
      літера чи `code` позиційної клавіші), і вона є в карті обробника
      ([HOTKEYS § 1.1](HOTKEYS-v10.md#HK-CANONICAL-MAP) — `KEYMAP` і `POSITIONAL`), а
      не в переліку, який ведуть поруч: список поруч розійдеться з обробником так
      само, як пункт розійшовся з кодом.
- [ ] Поле зветься `shortcut`, а не `key`: властивість `key` чи `code` з літерою
      сканер HOTKEYS § 6 читає як налаштування, що порівнює літеру в обхід
      `shortcutLetter()`.
- [ ] Карту тест бере з `src/lib/hotkeys/hotkeys.ts`, лише коли модуль є
      (`import.meta.glob`): проєкт без HOTKEYS збирає тест без правок, а пункт із
      `shortcut` у ньому червоний — клавіш застосунок не обробляє.

### 5.4 Тест інваріантів

```typescript
// src/lib/beta/checklist.test.ts
// @vitest-environment node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'svelte/compiler';
import { describe, expect, it } from 'vitest';
import { HIDDEN_ROUTES, LANGUAGES } from '$lib/i18n/routing';
import { BETA_ROUTE, BETA_TABS, BETA_UNCOVERED_ROUTES, COVERED_DEBT } from './checklist';
import { doneOnVersion, readMarks, sortChecks, tid, vote } from './progress';

/** Модулі необов'язкових файлів — лише коли вони є: карта HOTKEYS § 1.1 (§ 5.3.1) і перелік шапки (§ 5.1.1). */
const optional = <T>(modules: Record<string, T>): T | undefined => Object.values(modules)[0];
const hotkeys = optional(import.meta.glob<{ KEYMAP: Record<string, unknown>; POSITIONAL: Record<string, unknown> }>('/src/lib/hotkeys/hotkeys.ts', { eager: true }));
const HEADER_CONTROLS = optional(import.meta.glob<{ HEADER_CONTROLS: readonly string[] }>('/src/lib/components/header/controls.ts', { eager: true }))?.HEADER_CONTROLS ?? [];

const checks = BETA_TABS.flatMap((tab) => tab.checks);
const svelteFiles = (dir: string): string[] =>
    readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        return statSync(full).isDirectory() ? svelteFiles(full) : entry.endsWith('.svelte') ? [full.replace(/\\/g, '/')] : [];
    });

/** Маршрути — з теки src/routes, як їх бачить SvelteKit: `src/routes/[[lang=lang]]/about/+page.svelte` → `/[[lang=lang]]/about`. */
const pages = svelteFiles('src/routes').filter((f) => f.endsWith('/+page.svelte'));
const ROUTES = pages.map((f) => `/${f.slice('src/routes/'.length, -'/+page.svelte'.length)}`);
/** Сторінка самого чеклиста: адреса — BETA_ROUTE, тож гейт іде за нею, а не за літералом. */
const PAGE = pages.find((f) => f.endsWith(`/${BETA_ROUTE}/+page.svelte`));

/** Дія з елементом (§ 5.3): натиснути, торкнутися, клацнути, клікнути, обрати зі списку — будь-якою з двох мов пункта. */
const PRESS_UK = /натисн|тисніть|торкн|клацн|клікн|оберіть|виберіть/i;
const PRESS_EN = /\b(press|click|tap|select|choose|pick)\b/i;

type AstNode = { type?: string; name?: string; value?: unknown; data?: string; [key: string]: unknown };
function walk(node: unknown, visit: (n: AstNode) => void): void {
    if (Array.isArray(node)) return node.forEach((child) => walk(child, visit));
    if (!node || typeof node !== 'object') return;
    const n = node as AstNode;
    if (typeof n.type === 'string') visit(n);
    for (const [key, value] of Object.entries(n)) if (key !== 'metadata' && key !== 'parent') walk(value, visit);
}
function attrText(value: unknown): string | null {
    if (Array.isArray(value)) return value.map((p: AstNode) => (p.type === 'Text' ? p.data : '{x}')).join('');
    const expr = (value as AstNode | undefined)?.expression as AstNode | undefined;
    if (expr?.type === 'Literal') return String(expr.value);
    if (expr?.type === 'TemplateLiteral') return (expr.quasis as { value: { cooked: string } }[]).map((q) => q.value.cooked).join('{x}');
    return null;
}

/** Проп, що веде шаблон локатора: `{testId}-btn`, `` `${scope}-close-btn` `` — його значення з місць виклику стають префіксами. */
function leadingProp(value: unknown): string | null {
    const first = (Array.isArray(value) ? value[0] : value) as AstNode | undefined;
    const expr = first?.type === 'ExpressionTag' ? (first.expression as AstNode | undefined) : undefined;
    if (expr?.type === 'Identifier') return String(expr.name);
    if (expr?.type !== 'TemplateLiteral') return null;
    const [quasi] = expr.quasis as { value: { cooked: string } }[];
    const [lead] = expr.expressions as AstNode[];
    return quasi?.value.cooked === '' && lead?.type === 'Identifier' ? String(lead.name) : null;
}

/** § 5.3: локатори, як їх збирає браузер: `{prop}-…` × значення цього пропа на місцях виклику, зокрема складені з іншого префікса. */
function knownLocators(): RegExp[] {
    const templates: string[] = [];
    const leads = new Set<string>();
    const passed: { prop: string; text: string }[] = [];
    for (const file of svelteFiles('src')) {
        walk(parse(readFileSync(file, 'utf8'), { modern: true }).fragment, (n) => {
            if (n.type === 'Component') {
                for (const a of (n.attributes as AstNode[] | undefined) ?? []) {
                    const text = a.type === 'Attribute' ? attrText(a.value) : null;
                    if (text) passed.push({ prop: String(a.name), text });
                }
            }
            if (n.type !== 'Attribute' || n.name !== 'data-testid') return;
            const text = attrText(n.value);
            if (text) templates.push(text);
            const lead = leadingProp(n.value);
            if (lead) leads.add(lead);
        });
    }
    const values = passed.filter((v) => leads.has(v.prop));
    // Префікс, складений з іншого (`testId={`${testId}-modal`}`), розкривається тими самими префіксами — до трьох рівнів вкладення.
    let prefixes = values.filter((v) => !v.text.includes('{x}')).map((v) => v.text);
    const composed = values.filter((v) => v.text.startsWith('{x}') && !v.text.slice(3).includes('{x}')).map((v) => v.text.slice(3));
    for (let round = 0; round < 3; round++) prefixes = [...new Set([...prefixes, ...composed.flatMap((tail) => prefixes.map((p) => p + tail))])];
    const expanded = templates.flatMap((t) => (t.startsWith('{x}') ? prefixes.map((p) => p + t.slice(3)) : [t]));
    return expanded.map((t) => new RegExp(`^${t.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\{x\}/g, '[a-z0-9-]+')}$`));
}

describe('чеклист бета-тестування (BETA-CHECKLIST § 5)', () => {
    it('знаходить пункти й маршрути — перевірка жива', () => {
        expect(checks.length).toBeGreaterThan(0);
        expect(ROUTES.length).toBeGreaterThan(0);
    });

    it('сторінка чеклиста є і прихована (§ 4.1)', () => {
        expect(PAGE, `немає src/routes/…/${BETA_ROUTE}/+page.svelte`).toBeDefined();
        expect(HIDDEN_ROUTES, 'адреса чеклиста поза переліком прихованих').toContain(BETA_ROUTE);
    });

    it('кожен маршрут заявлений рівно однією вкладкою (§ 5.1)', () => {
        const claims = (route: string) => BETA_TABS.filter((tab) => tab.routes.includes(route)).length;
        const own = (route: string) => route.endsWith(`/${BETA_ROUTE}`) || route in BETA_UNCOVERED_ROUTES;
        expect(ROUTES.filter((r) => !own(r) && claims(r) !== 1), 'маршрут без вкладки чи з кількома').toEqual([]);
        expect(BETA_TABS.flatMap((tab) => tab.routes).filter((r) => !ROUTES.includes(r)), 'маршрут, якого немає').toEqual([]);
    });

    it('кожен елемент керування шапки заявлений пунктом (§ 5.1.1)', () => {
        const declared = new Set(checks.flatMap((c) => (c.testid ? [c.testid] : [])));
        expect(HEADER_CONTROLS.filter((id) => !declared.has(id))).toEqual([]);
    });

    it('covered називає файл тесту, і він існує (§ 5.2)', () => {
        expect(checks.flatMap((c) => (c.coverage === 'covered' && !existsSync(c.test) ? [`${c.id} → ${c.test}`] : []))).toEqual([]);
    });

    it('«натисніть» має локатор, що є в джерелах (§ 5.3)', () => {
        const locators = knownLocators();
        const press = checks.filter((c) => (PRESS_UK.test(c.text.uk) || PRESS_EN.test(c.text.en)) && !c.shortcut);
        expect(press.filter((c) => !c.testid).map((c) => c.id), 'без testid').toEqual([]);
        expect(press.filter((c) => c.testid && !locators.some((re) => re.test(c.testid ?? ''))).map((c) => `${c.id} → ${c.testid}`), 'локатора немає').toEqual([]);
    });

    it('названа клавіша є в карті обробника (§ 5.3.1)', () => {
        // Без HOTKEYS карти немає: будь-який пункт із `shortcut` — клавіша, якої застосунок не обробляє.
        const handled = new Set([...Object.keys(hotkeys?.KEYMAP ?? {}), ...Object.keys(hotkeys?.POSITIONAL ?? {})]);
        expect(checks.filter((c) => c.shortcut && !handled.has(c.shortcut)).map((c) => `${c.id} → ${c.shortcut}`)).toEqual([]);
    });

    it('id, тексти, рівні й межа кожної вкладки (§ 2)', () => {
        const ids = checks.map((c) => c.id);
        expect(ids.filter((id, i) => ids.indexOf(id) !== i), 'дублікати id').toEqual([]);
        const bad: string[] = [];
        for (const tab of BETA_TABS) {
            for (const c of tab.checks) {
                if (!new RegExp(`^${tab.id}_\\d+$`).test(c.id)) bad.push(`${c.id}: форма {вкладка}_{номер}`);
                if (!c.text.uk.trim() || !c.text.en.trim() || !c.category.uk.trim() || !c.category.en.trim()) bad.push(`${c.id}: порожній текст`);
                if (/[Ѐ-ӿ]/.test(c.text.en + c.category.en)) bad.push(`${c.id}: кирилиця в англійському тексті`);
                if (/^\s*\d/.test(c.text.uk)) bad.push(`${c.id}: номер у тексті`);
                if (/data-testid|\$state|\.svelte\b|localStorage/.test(c.text.uk)) bad.push(`${c.id}: внутрішня назва`);
                if (/'/.test(c.text.uk) && /[ʼ’]/.test(c.text.uk)) bad.push(`${c.id}: два види апострофа`);
                if (tid(c.id).includes('_')) bad.push(`${c.id}: локатор із підкресленням`);
            }
            if (!tab.checks.some((c) => c.coverage === 'manual')) bad.push(`${tab.id}: немає manual`);
            if (!tab.checks.some((c) => c.negative)) bad.push(`${tab.id}: немає пункта-межі`);
        }
        expect(bad).toEqual([]);
    });

    it('covered не переважає manual понад записаний борг, а борг лише спадає (§ 3.4, § 3.4.1)', () => {
        const counts = BETA_TABS.map((tab) => ({
            id: tab.id,
            covered: tab.checks.filter((c) => c.coverage === 'covered').length,
            manual: tab.checks.filter((c) => c.coverage === 'manual').length,
            debt: COVERED_DEBT[tab.id]
        }));
        expect(counts.filter((r) => r.covered > r.manual && r.debt === undefined).map((r) => r.id), 'новий перекіс').toEqual([]);
        expect(counts.filter((r) => r.debt !== undefined && r.covered > r.debt).map((r) => r.id), 'борг зріс').toEqual([]);
        expect(counts.filter((r) => r.debt !== undefined && r.covered <= r.manual).map((r) => r.id), 'вкладка вирівнялася — приберіть із COVERED_DEBT').toEqual([]);
    });

    it('порядок, голос, версія і сховище (§ 3, § 3.1, § 3.3, § 8.6)', () => {
        const levels = sortChecks(checks).map((c) => c.coverage);
        expect(levels).toEqual([...levels].sort((a, b) => ['manual', 'testable', 'covered'].indexOf(a) - ['manual', 'testable', 'covered'].indexOf(b)));
        const id = checks[0]?.id ?? '';
        const once = vote({}, id, 'ok', '2.0.0');
        expect(vote(once, id, 'ok', '2.0.0')).toEqual({});
        expect(vote({ [id]: { vote: 'ok', version: '1.0.0' } }, id, 'ok', '2.0.0')).toEqual(once);
        expect(doneOnVersion(checks, { [id]: { vote: 'ok', version: '1.0.0' } }, '2.0.0')).toBe(0);
        const known = new Set(checks.map((c) => c.id));
        expect(readMarks({ [id]: { vote: 'ok', version: '2.0.0' }, gone_1: { vote: 'ok', version: '2.0.0' }, [`${id}x`]: 'broken' }, known)).toEqual(once);
        expect(readMarks('not json', known)).toEqual({});
    });

    it('сторінка: власна кнопка мови при > 2 мовах, версія не вписана (§ 8.3, § 8.5)', () => {
        const page = readFileSync(PAGE ?? '', 'utf8');
        if (LANGUAGES.length > 2) expect(page, 'мов більше, ніж у чеклисті, — перемкнути нічим').toContain('beta-lang-btn');
        expect(page.match(/['"`]\d+\.\d+\.\d+['"`]/g) ?? [], 'версія літералом').toEqual([]);
    });
});
```

### 5.5 Прихована сторінка — перевіряти ПРОТИЛЕЖНЕ <a id="BETA-HIDDEN-PAGE"></a>

- [ ] **HIGH.** Скрипт над `build/` перевіряє обидва боки обіцянки: прихована сторінка існує в кожній індексованій мові
      (сегменти — з `hreflang` головної, а не другим переліком), має `noindex`,
      не має `canonical` і `hreflang`, її немає в sitemap і в `Disallow`; решта
      сторінок — навпаки: `canonical` є, `noindex` немає. Випадковий `noindex` на
      звичайній сторінці виводить її з індексу тихо — це дорожче за
      проіндексований чеклист. Законний `noindex` поза переліком — лише на
      сторінці мови поза індексом ([I18N § 3.4](../platform/I18N-v10.md)):
      перший сегмент адреси дорівнює `<html lang>`, а в `hreflang` головної
      цієї мови немає. `canonical` така сторінка теж не має — її голову пише
      той самий власник ([SEO § 4.4](../platform/SEO-v10.md#SEO-HEAD-SINGLE-OWNER)),
      тож скрипт не вимагає від неї ні того, ні іншого.
- [ ] Голову сторінки скрипт читає розбором SEO § 6.1 (`headOf` з
      `scripts/check-build/seo.mjs`, [SEO-v10.md](../platform/SEO-v10.md)), а не
      власною регуляркою: `noindex` — за будь-якого порядку атрибутів, лапок і
      регістру, `none` і тег окремого бота (`googlebot`, `bingbot`) — теж
      `noindex`, закоментований тег — ні.
- [ ] Скрипт — частина `npm run check:build` **лише** в проєкті, що взяв цей файл:
      рядок у каркасі `scripts/check-build.mjs`
      ([CI-CD-AND-TOOLS § 1.19](../ops/CI-CD-AND-TOOLS-v10.md#CI-GATE-SCRIPTS))
      додається разом із файлом і прибирається разом із ним. Проєкт, закритий від
      індексації (SEO не взято), скрипта не запускає: там поза індексом кожна
      сторінка.
- [ ] Назва кожного маршруту — ASCII (§ 4.2).
- [ ] Профіль без SSR складає лише оболонки (`index.html`, `404.html`), і
      `noindex` там ставить клієнт: скрипт над `build/` не побачить нічого, тож
      та сама обіцянка переїжджає в e2e над живою сторінкою — перевірка
      переїжджає, а не зникає.

```javascript
// scripts/check-hidden-pages.mjs — частина npm run check:build, лише коли проєкт узяв BETA-CHECKLIST (каркас — CI-CD-AND-TOOLS § 1.19)
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
// Той самий розбір голови, що в SEO § 6.1: noindex (зокрема `none` і тег окремого бота), canonical і hreflang —
// за будь-якого порядку атрибутів, лапок і регістру. Другого розбору тут немає.
import { headOf } from './check-build/seo.mjs';

const BUILD = process.argv[2] ?? 'build';
/** Той самий перелік, що HIDDEN_ROUTES: файл даних читають і модуль адрес, і цей скрипт (§ 4.1). */
const HIDDEN = Object.values(JSON.parse(readFileSync('src/lib/i18n/hidden-routes.json', 'utf8')));
const SHELLS = new Set(['404.html', '200.html']);

const problems = [];
const pages = [];
(function walk(dir) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) {
            if (entry !== '_app') walk(full);
        } else if (entry.endsWith('.html')) pages.push(relative(BUILD, full).split('\\').join('/'));
    }
})(BUILD);
if (pages.length === 0) problems.push('жодної сторінки в build/');

/** Сегменти мов — з hreflang головної: `…/Project/en/` → 'en', сама головна → ''; без hreflang — лише ''. */
function localeSegments() {
    const home = pages.includes('index.html') ? headOf(readFileSync(join(BUILD, 'index.html'), 'utf8')) : null;
    const canonical = home?.named('canonical')[0];
    const alternates = (home?.alternates ?? []).filter((a) => a.lang !== 'x-default' && a.href).map((a) => a.href);
    if (!canonical || alternates.length === 0) return [''];
    const root = new URL(canonical).pathname;
    return [...new Set(alternates.map((href) => new URL(href, canonical).pathname.slice(root.length).replace(/\/$/, '')))];
}

const indexed = localeSegments();
const route = (page) => page.replace(/(\/index)?\.html$/, '').replace(/^index$/, '');
const isHidden = (page) => HIDDEN.some((h) => route(page).split('/').includes(h));
/**
 * Сторінка мови поза індексом (I18N § 3.4): перший сегмент адреси — мова документа, а в hreflang головної її немає.
 * noindex без canonical там законний: голову пише той самий PageHead (SEO § 4.4). Сегмент — з маршруту, тож
 * `ja.html` (trailingSlash 'never') і `ja/index.html` ('always') читаються однаково.
 */
const unindexedLanguage = (page, html) => {
    const segment = route(page).split('/')[0];
    const lang = /<html[^>]*\blang=["']([^"']+)["']/i.exec(html)?.[1]?.toLowerCase();
    return segment !== '' && segment === lang && !indexed.includes(segment);
};
const sitemap = existsSync(join(BUILD, 'sitemap.xml')) ? readFileSync(join(BUILD, 'sitemap.xml'), 'utf8') : '';
const robots = existsSync(join(BUILD, 'robots.txt')) ? readFileSync(join(BUILD, 'robots.txt'), 'utf8') : '';

for (const page of pages) {
    if (!/^[\x20-\x7e]*$/.test(page)) problems.push(`${page}: не-ASCII у назві маршруту`);
    if (SHELLS.has(page)) continue;
    const html = readFileSync(join(BUILD, page), 'utf8');
    const head = headOf(html);
    const canonical = head.named('canonical').length > 0;
    const hreflang = head.alternates.length > 0;
    if (isHidden(page)) {
        if (!head.noindex) problems.push(`${page}: прихована без noindex`);
        if (canonical || hreflang) problems.push(`${page}: прихована з canonical/hreflang`);
    } else if (unindexedLanguage(page, html)) {
        continue; // мова поза індексом: noindex і відсутній canonical — її законний стан, звіряє SEO § 6.1
    } else if (!canonical || head.noindex) problems.push(`${page}: звичайна сторінка з noindex або без canonical`);
}
for (const hidden of HIDDEN) {
    for (const dir of indexed) {
        const base = dir ? `${dir}/${hidden}` : hidden;
        if (![`${base}.html`, `${base}/index.html`].some((p) => pages.includes(p))) problems.push(`${base}: прихованої сторінки немає в збірці`);
    }
    if (sitemap.includes(hidden)) problems.push(`${hidden}: є в sitemap.xml`);
    if (robots.includes(hidden)) problems.push(`${hidden}: є в robots.txt — noindex без Disallow (§ 4.0)`);
}

if (problems.length) {
    console.error(problems.join('\n'));
    process.exit(1);
}
console.log(`${pages.length} сторінок: прихована — поза індексом, решта — в індексі`);
```

> Зворотний експеримент ([AI-AGENT-PITFALLS § 1.1](../core/AI-AGENT-PITFALLS-v10.md#PIT-REVERSE-EXPERIMENT)):
> прибрати `noindex` із зібраного HTML — скрипт мусить дати код 1; дописати
> canonical — теж 1. Заміна в HTML, яка нічого не знайшла, дає зелений прогін, що
> виглядає як доказ: після правки звір, що файл справді змінився.

### 5.6 Локатор пункта несе `id` пункта <a id="BETA-LOCATOR-PER-CHECK"></a>

- [ ] **HIGH.** Усе, що малюється по разу на пункт, іменує **цей** пункт:
      `beta-check-{tid}-item`, `beta-vote-{tid}-ok-btn`, де `tid` — `check.id` з
      `_` → `-` (`tid()`, § 5). Сталий `beta-check-item` на вкладці з 23 пунктами
      дає 23 елементи під одним локатором: дії Playwright падають зі strict mode
      violation, і тест пишуть через `.nth()` — прив'язаним до порядку.
- [ ] Дискримінатор — значення, а не позиція: `beta-check-7-item` після вставки
      пункта означає інший рядок, `beta-check-common-1-item` — ніколи
      ([TESTID-AND-NAMING § 1.6](TESTID-AND-NAMING-v10.md)). Формат підставлених
      значень перевіряє рантайм-інваріант
      [TESTID-AND-NAMING § 1.9.2](TESTID-AND-NAMING-v10.md).

### 5.7 Сама сторінка перевіряється e2e <a id="BETA-PAGE-E2E"></a>

- [ ] **MEDIUM.** Інваріанти дивляться на дані, скрипт § 5.5 — на HTML; чи працює
      сама сторінка, бачить лише e2e. Мінімум — чотири сценарії, кожен закриває
      крок, на якому робота тестувальника зникає мовчки:
  - позначка переживає перезавантаження;
  - поступ росте на `1` після першого натискання й **не** росте після повторного натискання того самого стану (§ 3.3);
  - перемикання вкладки міняє перелік і не губить поставленого;
  - при відмові буфера звіт з'являється в полі поруч, і видно `beta-report-failed-hint` (§ 6.2.1).
- [ ] Сторінку пише проєкт: канон дає її контракт — локатори § 9, голос § 3.3, звіт § 6 — а не розмітку. Набір перевіряє сторінку проєкту, тож без неї він червоний, а не зелений порожньо.

```typescript
// tests/e2e/beta-checklist.spec.ts
import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '../fixtures';
import { gotoHydrated } from '../helpers/hydration';
import { at } from '../helpers/paths';

/** Адреса — з того самого файлу, що HIDDEN_ROUTES і BETA_ROUTE (§ 4.1), відносно baseURL. */
const { betaChecklist } = JSON.parse(readFileSync('src/lib/i18n/hidden-routes.json', 'utf8')) as { betaChecklist: string };
const PAGE = at(betaChecklist);

/** Зроблено з `beta-progress-value` («3 / 17», § 8.1); NaN — поступу не видно. */
const done = async (page: Page) => Number(/(\d+)\s*\//.exec((await page.getByTestId('beta-progress-value').textContent()) ?? '')?.[1] ?? NaN);

test('поступ росте на 1, а повторне натискання того самого стану його знімає (§ 3.3)', async ({ page }) => {
    await gotoHydrated(page, PAGE);
    const start = await done(page);
    expect(start, 'поступ не читається — локатор чи формат не ті').not.toBeNaN();
    const ok = page.getByTestId('beta-vote-common-1-ok-btn');
    await ok.click();
    await expect.poll(() => done(page)).toBe(start + 1);
    await ok.click();
    await expect.poll(() => done(page)).toBe(start);
});

test('перемикання вкладки міняє перелік і не губить поставленого', async ({ page }) => {
    await gotoHydrated(page, PAGE);
    const other = page.getByTestId(/^beta-tab-(?!common-)[a-z0-9-]+-btn$/).first();
    test.skip((await other.count()) === 0, 'одна вкладка — перемикати нічого');
    await page.getByTestId('beta-vote-common-1-ok-btn').click();
    await other.click();
    await expect(page.getByTestId('beta-check-common-1-item'), 'вкладка не змінила перелік').toBeHidden();
    await page.getByTestId('beta-tab-common-btn').click();
    await expect(page.getByTestId('beta-vote-common-1-ok-btn')).toHaveAttribute('aria-pressed', 'true');
});

test('позначка переживає перезавантаження', async ({ page }) => {
    await gotoHydrated(page, PAGE);
    await page.getByTestId('beta-vote-common-1-ok-btn').click();
    await page.reload();
    await page.locator('html[data-hydrated]').waitFor({ state: 'attached' });
    await expect(page.getByTestId('beta-vote-common-1-ok-btn')).toHaveAttribute('aria-pressed', 'true');
});

test('відмова буфера лишає звіт у полі', async ({ page }) => {
    // Буфер у браузері тесту дозволено не завжди — відмова підміняється явно.
    await page.addInitScript(() => {
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: () => Promise.reject(new DOMException('denied', 'NotAllowedError')) }
        });
    });
    await gotoHydrated(page, PAGE);
    await page.getByTestId('beta-vote-common-1-ok-btn').click();
    await page.getByTestId('beta-report-btn').click();
    await expect(page.getByTestId('beta-report-failed-hint')).toBeVisible();
    await expect(page.getByTestId('beta-report-textarea')).toHaveValue(/common_1/);
});
```

> Зворотний експеримент: прибрати запис у сховище — сценарій перезавантаження
> мусить почервоніти. Якщо лишається зеленим, він перевіряє не збереження, а
> наявність кнопки. Не знімати позначку повторним натисканням (голос без § 3.3)
> чи не оновлювати поступ — червоніє сценарій поступу; тримати позначки в стані
> вкладки, що зникає з нею, — сценарій вкладок. Чеклист з однією вкладкою
> сценарій вкладок пропускає з причиною.

---

## 6. Звіт

### 6.1 Текст у буфер, а не запис у базу <a id="BETA-REPORT-LOCAL"></a>

- [ ] Відповіді лежать у сховищі браузера під префіксом проєкту ([STORAGE-NAMESPACE-v10.md](../platform/STORAGE-NAMESPACE-v10.md)); кнопка складає з них текст. Збір на сервер — таблиця, правила доступу й чужі імена заради даних, яких поки ніхто не читає; доклеїти його можна пізніше, не переписуючи сторінки.
- [ ] У звіті: версія збірки, час в ISO, `userAgent`, мова, тема і **лише позначені** пункти, поламане — вгорі. Помилка в `covered`-пункті позначена окремо як дефект тесту (§ 3).

```text
[НЕ ПРАЦЮЄ] common_4 (Спільне для сайту)
    Змініть мову на англійську. В адресі мусить з'явитися /en/…
    !!! ПУНКТ ПОКРИТО АВТОТЕСТОМ src/lib/i18n/routing.test.ts — тест не побачив цієї помилки
```

### 6.2 Запасний шлях обов'язковий <a id="BETA-REPORT-FALLBACK"></a>

- [ ] **MEDIUM.** `navigator.clipboard.writeText` відмовляє буденно (вкладка не у
      фокусі, не https, немає дозволу). При відмові звіт з'являється текстом у
      багаторядковому полі поруч (`<textarea readonly>`, `beta-report-textarea`), а
      не лише в журналі: інакше вся робота зникає на останньому кроці
      ([ERROR-HANDLING § 1.5](ERROR-HANDLING-v10.md#EH-NO-SILENT-CATCH)).

#### 6.2.1 «Скопійовано» і «буфер відмовив» — різні локатори <a id="BETA-REPORT-HINT-SPLIT"></a>

- [ ] **LOW.** Успіх — `beta-report-hint`, відмова — `beta-report-failed-hint`.
      Один локатор на обидва стани робить сценарій § 5.7 нерозрізнювальним:
      «підказка видима» правдиве і при успіху, і при відмові.

### 6.3 Стирання позначок — у два кроки <a id="BETA-CLEAR-TWO-STEP"></a>

- [ ] **MEDIUM.** «Стерти позначки» — єдина незворотна дія на сторінці, і вона
      стоїть поруч зі звітом, до якого тягнуться щоразу: перше натискання лише
      **зводить** кнопку (напис міняється на підтвердження), друге — стирає.
- [ ] Не `confirm()`: нативний діалог блокує потік, не перекладається й ускладнює
      e2e окремим обробником діалогу.

#### 6.3.1 Зведена кнопка розводиться сама <a id="BETA-CLEAR-DISARM"></a>

- [ ] **LOW.** Зведена кнопка розводиться таймером (≈ 5 с — трохи більше, ніж
      треба, щоб прочитати підтвердження й натиснути вдруге) або при виході зі
      сторінки: інакше наступний прихід починається за одне натискання від знесення
      всієї роботи.

```svelte
<script lang="ts">
  import { t } from '$lib/i18n';

  let { onclear }: { onclear: () => void } = $props();

  let armed = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  function click() {
    clearTimeout(timer);
    if (!armed) {
      armed = true;
      timer = setTimeout(() => (armed = false), 5000); // § 6.3.1
      return;
    }
    armed = false;
    onclear();
  }

  // § 7.4: таймер не переживає сторінку
  $effect(() => () => clearTimeout(timer));
</script>

<button type="button" data-testid="beta-clear-btn" aria-live="polite" onclick={click}>
  {armed ? t('beta.clearConfirm') : t('beta.clear')}
</button>
```

---

## 7. Пастки

### 7.1 Мертвий код розповідає стару логіку

- [ ] Пункт пишеться з компонента, який малює екран, а не з сервісу, у якому «є
      потрібний метод»: невикликаний метод із зеленим тестом і прикладом у
      `AGENTS.md` складають несуперечливу картину того, чого немає
      ([PROJECT-STRUCTURE-v10.md](../core/PROJECT-STRUCTURE-v10.md)).

### 7.2 Пункт пишеться після читання коду, а не замість

- [ ] Пункт про режим, якого сторінка не дає, чи про формат, протилежний задуманому,
      коштує двічі: його перевіряють, а потім розбирають хибний звіт.

### 7.3 `localStorage` під prerender

- [ ] **HIGH.** Сховище читається за прапорцем середовища (`browser` з
      `$app/environment`) або після монтування, а не за наявністю API. Починаючи з
      Node 25 Web Storage увімкнений типово (у 22–24 — під
      `--experimental-webstorage`): `typeof localStorage !== 'undefined'` під
      prerender істинне, без `--localstorage-file` виклик `getItem` кидає
      `TypeError`, а з файлом — читає сховище машини збірки й запікає його в HTML.
- [ ] Читання й запис — через фасад сховища, що не кидає ніколи
      ([STORAGE-NAMESPACE-v10.md](../platform/STORAGE-NAMESPACE-v10.md)): у чужому
      iframe із заблокованим сховищем кидає вже сам доступ до `localStorage`,
      включно з `typeof`.

### 7.4 Таймер переживає сторінку

- [ ] Найдешевше — підпис «скопійовано» **без таймера**: він тримається до
      наступної дії й зникає разом зі станом, що його породив. Таймер — лише там,
      де стан справді мусить згаснути сам (§ 6.3.1), і тоді він прибирається при
      розмонтуванні ([SVELTE-CORE § 2.2.2](../core/SVELTE-CORE-v10.md#SC-LISTENER-CLEANUP)).

---

## 8. Сторінка

### 8.1 Поступ видно по кожній вкладці <a id="BETA-TAB-PROGRESS"></a>

- [ ] **MEDIUM.** Де вкладок більше трьох, кожна показує `зроблено/усього` на цій
      версії збірки (`doneOnVersion`, § 5): загальне `17 / 169` не каже людині, чи
      закінчила вона цю вкладку. Обидва лічильники рахуються тим самим правилом.

### 8.2 Вкладки — кнопки з фіксацією в URL <a id="BETA-TABS-NOT-ARIA"></a>

- [ ] **MEDIUM.** `role="tab"` — обіцянка цілого віджета: `tabpanel`,
      `aria-controls`, `aria-selected` і стрілки замість `Tab`. Без них читалка
      оголошує віджет, якого немає. Смужка вкладок чеклиста — перемикачі:
      `<button aria-pressed>` у `<nav>`; повний патерн — лише повністю, разом зі
      стрілками.
- [ ] **MEDIUM.** Синхронізація активної вкладки з URL: обрана вкладка фіксується в
      параметрі адреси `?tab={tab.id}` (через `page.url.searchParams` та `replaceState`).
      При перезавантаженні сторінки або пересиланні посилання тестувальнику відкривається
      саме та вкладка, з якою працювали.

```svelte
<script lang="ts">
  import { replaceState } from '$app/navigation';
  import { page } from '$app/state';
  import type { BetaTab, ChecklistLang } from '$lib/beta/types';
  import { t } from '$lib/i18n';

  let { tabs, lang, active = $bindable() }: { tabs: BetaTab[]; lang: ChecklistLang; active: string } = $props();

  function selectTab(id: string) {
    active = id;
    const url = new URL(page.url);
    url.searchParams.set('tab', id);
    // eslint-disable-next-line svelte/no-navigation-without-resolve
    replaceState(url.href, page.state);
  }
</script>

<nav aria-label={t('beta.sections')}>
  {#each tabs as tab (tab.id)}
    <button type="button" aria-pressed={active === tab.id} data-testid="beta-tab-{tab.id}-btn" onclick={() => selectTab(tab.id)}>
      {tab.title[lang]}
    </button>
  {/each}
</nav>
```

- [ ] Мова чеклиста `lang` — `uk`, коли мова інтерфейсу українська, інакше `en`
      (§ 2.4); кнопка `beta-lang-btn` (§ 8.3) перемикає лише її. Той самий
      `lang` бере кожен текст сторінки: `tab.title[lang]`, `check.text[lang]`,
      `check.category[lang]`.

- [ ] Сторож від повернення ролі — e2e: `await expect(page.locator('[role="tablist"], [role="tab"]')).toHaveCount(0)`.

### 8.3 Мову чеклиста перемикають на самій сторінці <a id="BETA-OWN-LANG-BTN"></a>

- [ ] **MEDIUM.** Де мов інтерфейсу більше, ніж мов чеклиста (дві, § 2.4), на
      сторінці стоїть власна кнопка `beta-lang-btn`, що перемикає **лише**
      чеклист: мовний перемикач сайту дає десятки мов інтерфейсу, а чеклист із них
      розуміє дві. Умова читається з того самого переліку локалей (тест § 5.4).

### 8.4 З пункта видно, куди йти: кнопки-посилання з 44px на дотик <a id="BETA-SCREEN-LINKS"></a>

- [ ] **LOW.** Маршрути вкладки (той самий перелік, що читає § 5.1) показані
      посиланнями на екрани, і зі сторінки є вихід на головну (`beta-home-link`):
      тестувальник приходить за прямим посиланням і не має ні історії, ні пункту
      меню. Маршрут із параметрами показується, лише якщо резолвиться в адресу без
      здогадок.
- [ ] **MEDIUM.** Посилання на екран виглядають кнопками й мають розмір для дотику не менше 44 px (`min-width: 44px; min-height: 44px`, [ACCESSIBILITY § 6](ACCESSIBILITY-v10.md)).
- [ ] **HIGH.** Блок посилань на екрани має `data-sveltekit-preload-data="off"`: без цього наведення курсора (hover) запускає попереднє завантаження (preloading) цільової сторінки; якщо маршрут захищений (наприклад, кабінет адміністратора) і його клієнтський `load` робить навігацію/перенаправлення, просте наведення миші несподівано викидає тестувальника з чеклиста на іншу сторінку.

### 8.5 Версія збірки — з єдиного джерела проєкту <a id="BETA-VERSION-SINGLE-SOURCE"></a>

- [ ] **MEDIUM.** Версія в позначці приходить із того самого джерела, що й у решти
      проєкту (`define` у Vite, `package.json`, файл версії), а не літералом
      (тест § 5.4). Під prerender значення запікається в HTML — і це правильно:
      сторінка з кешу підписує позначки своєю збіркою, а не найсвіжішою.

#### 8.5.1 Версію видно на сторінці <a id="BETA-VERSION-VISIBLE"></a>

- [ ] **MEDIUM.** Поруч із поступом видно версію збірки (`beta-version-text`), а
      підказка «позначено на іншій версії» несе число старої
      (`beta-check-{tid}-stale-hint` → «позначено на 1.2.7»): інакше людина не може
      вирішити, чи перепоставити позначку.

### 8.6 Прочитане зі сховища — недовірений ввід <a id="BETA-MARKS-UNTRUSTED"></a>

- [ ] **MEDIUM.** Позначки зі сховища фільтруються по відомих `id` і формі
      (`readMarks`, § 5): видалений пункт лишає позначку, і поступ показує
      `40 / 37`; позначка старого формату чи зіпсований JSON дорівнюють відсутній.

---

## 9. Локатори

`{id}` — `check.id` через `tid()` (`common_1` → `common-1`), `{tab}` — `tab.id`.
Усе, що малюється по разу на пункт, іменує цей пункт (§ 5.6).

| Елемент | `data-testid` | Скільки на сторінці |
|---|---|---|
| вкладка | `beta-tab-{tab}-btn` | по одному на вкладку |
| поступ вкладки (§ 8.1) | `beta-tab-{tab}-progress-text` | по одному на вкладку |
| рівень покриття | `beta-level-{coverage}-section` | до трьох |
| пункт | `beta-check-{id}-item` | **один** |
| текст пункта | `beta-check-{id}-text` | **один** |
| категорія пункта | `beta-check-{id}-category-text` | **один** |
| стан відповіді | `beta-vote-{id}-{ok\|fail\|unclear\|skip}-btn` | **один** |
| позначка з іншої версії | `beta-check-{id}-stale-hint` | **один** |
| загальний поступ | `beta-progress-value` | один |
| версія збірки (§ 8.5.1) | `beta-version-text` | один |
| мова чеклиста (§ 8.3) | `beta-lang-btn` | один |
| екран вкладки (§ 8.4) | `beta-screen-{state}-link` | по одному на екран |
| вихід зі сторінки (§ 8.4) | `beta-home-link` | один |
| звіт | `beta-report-btn`, `beta-report-textarea` | по одному |
| «скопійовано» (§ 6.2.1) | `beta-report-hint` | один |
| «буфер відмовив» (§ 6.2.1) | `beta-report-failed-hint` | один |
| стерти позначки (§ 6.3) | `beta-clear-btn` | один |

Канон типів — [TESTID-AND-NAMING-v10.md](TESTID-AND-NAMING-v10.md).

---

## 10. Автоматична перевірка

| Перевірка | Що ловить |
|---|---|
| тест інваріантів § 5.4 (`npm run test:unit`, у canon.json — `GATE-BETA-CHECKLIST`) | сторінки чеклиста немає за `BETA_ROUTE` чи вона поза переліком прихованих (§ 4.1), маршрут із `src/routes` без вкладки чи вкладка з неіснуючим (§ 5.1), елемент шапки з `HEADER_CONTROLS` без пункта (§ 5.1.1), `covered` без файлу тесту (§ 5.2), «натисніть» без локатора чи з неіснуючим — локатори розкриті значеннями пропа-префікса (`testId`, `scope`) з місць виклику, зокрема складеними (§ 5.3), клавіша `shortcut` поза картою HOTKEYS чи без HOTKEYS узагалі (§ 5.3.1), `id`, тексти, `manual` і межа кожної вкладки (§ 2), баланс рівнів і храповик (§ 3.4, § 3.4.1), порядок, голос, версія, сховище (§ 3, § 3.1, § 3.3, § 8.6), кнопка мови й вписана версія (§ 8.3, § 8.5) |
| `scripts/check-hidden-pages.mjs` (`npm run check:build` — частина каркаса, лише коли файл узято; `GATE-BUILD-OUTPUT`) | прихована сторінка з canonical, без `noindex`, у sitemap чи `robots.txt` або відсутня в індексованій мові; звичайна з `noindex` — за будь-якого порядку атрибутів, лапок і регістру, зокрема `none` і тег окремого бота — чи без canonical, крім сторінки мови поза індексом (`noindex` без canonical — її законний стан); не-ASCII у маршруті (§ 4.0, § 4.2, § 5.5) |
| e2e § 5.7 (`npm run test:e2e`, Chromium, Firefox, WebKit — проєкти канонічного `playwright.config.ts`, [CODE-QUALITY § 5.4](../core/CODE-QUALITY-v10.md)) | збереження позначки, поступ на `+1` і зняття повторним натисканням, вкладки не губять поставленого (з однією вкладкою — пропуск із причиною), запасний шлях звіту (§ 3.3, § 5.7, § 6.2, § 6.2.1) |
| `GATE-TESTID-RUNTIME` | сталий локатор пункта й підкреслення в підставленому значенні — на самій сторінці чеклиста: перелік маршрутів e2e бере приховані сторінки з `hidden-routes.json` ([ACCESSIBILITY § 10.3](ACCESSIBILITY-v10.md)) (§ 5.6) |
| `GATE-A11Y-AXE` | axe, reflow 320, цілі дотику й фокус — і на сторінці чеклиста, з тієї самої причини |

Перевіряється в код-рев'ю: текст пункта з видимим виявом (§ 2.1), рівень за тим,
що тест справді доводить (§ 3), стани не лише кольором (§ 3.2), рядки
`robots.txt` з переліку (§ 4.3), двокрокове стирання й розведення (§ 6.3,
§ 6.3.1), кнопки замість ARIA-табів (§ 8.2), посилання на екрани (§ 8.4), видима
версія (§ 8.5.1).

---

## Пов'язані документи

- [TESTID-AND-NAMING-v10.md](TESTID-AND-NAMING-v10.md) — локатори, з яких пункт бере назву елемента
- [AI-AGENT-PITFALLS-v10.md](../core/AI-AGENT-PITFALLS-v10.md) — зворотний експеримент, перевірка, що бреше
- [SEO-v10.md](../platform/SEO-v10.md) — canonical, sitemap, `noindex`, скрипт над `build/`
- [I18N-v10.md](../platform/I18N-v10.md) — чому тексти пунктів не в словнику інтерфейсу
- [HOTKEYS-v10.md](HOTKEYS-v10.md) — карта клавіш, з якою звіряються пункти про клавіші
- [STORAGE-NAMESPACE-v10.md](../platform/STORAGE-NAMESPACE-v10.md) — префікс ключа прогресу
- [ACCESSIBILITY-v10.md](ACCESSIBILITY-v10.md) — стан не лише кольором, розмір під дотик
- [BETA-CHECKLIST-PAGE.md](../../../product_criteria/v10/BETA-CHECKLIST-PAGE.md) — адреса й вигляд сторінки в родині сайтів автора
