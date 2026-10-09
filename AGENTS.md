# AGENTS.md — Інструкції для ШІ-асистентів проєкту OZON-DEZ

> Цей файл визначає контекст, карту проєкту та правила взаємодії ШІ-асистентів із кодовою базою «ОЗОН-ДЕЗ».

---

## 1. Карта контексту
* **Єдине джерело контексту проєкту:** [PROJECT-CONTEXT.md](PROJECT-CONTEXT.md).
* **Головний опис проєкту та запуск:** [README.md](README.md).
* **Дизайн-система та токени:** [src/app.css](src/app.css).
* **Текстовий контент та переклади:** [src/lib/data/content.ts](src/lib/data/content.ts).
* **Стан мови (UA / RU / EN):** [src/lib/state/language.svelte.ts](src/lib/state/language.svelte.ts).
* **Модальне вікно замовлення:** [src/lib/state/modal.svelte.ts](src/lib/state/modal.svelte.ts).
* **Відправка лідів у Telegram:** [src/lib/services/telegram.ts](src/lib/services/telegram.ts).

---

## 2. Жорсткі обмеження для асистента
1. **Іконки:** Використовувати виключно SVG-іконки з бібліотеки `phosphor-svelte` (`import { IconName } from 'phosphor-svelte';`). Не додавати текстові чи системні емодзі в UI сайту.
2. **Стилі:** Не додавати Tailwind CSS або зовнішні бібліотеки стилів. Будь-які нові компоненти мають наслідувати CSS-змінні проєкту (`--color-surface`, `--color-bone-white`, `--color-electric-iris`, `--border-subtle` тощо).
3. **Руни Svelte 5:** Увесь реактивний стан пишеться виключно на рунах (`$state`, `$derived`, `$props`). Руни заборонено використовувати у файлах `.ts` без суфікса `.svelte.ts`.
4. **Маршрутизація:** Будь-які нові сторінки створюються виключно через префікс `+` (`+page.svelte`, `+layout.svelte`) у каталозі `src/routes/`.
5. **Якість коду:** Перед завершенням завдання обов'язково перевіряти статус:
   ```bash
   npm run check
   ```
   (повинно бути 0 помилок та 0 попереджень).
