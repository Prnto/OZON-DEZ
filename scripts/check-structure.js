// scripts/check-structure.js
// Практичний гейт структури проєкту відповідно до PROJECT-STRUCTURE-v10.md
import fs from 'node:fs';
import path from 'node:path';

let errorsCount = 0;

function logError(msg) {
	console.error(`❌ [ПОМИЛКА СТРУКТУРИ] ${msg}`);
	errorsCount++;
}

function logSuccess(msg) {
	console.log(`✅ ${msg}`);
}

function walkDir(dir, filter) {
	let results = [];
	if (!fs.existsSync(dir)) return results;
	const list = fs.readdirSync(dir);
	for (const file of list) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			results = results.concat(walkDir(filePath, filter));
		} else if (!filter || filter(filePath)) {
			results.push(filePath.replace(/\\/g, '/'));
		}
	}
	return results;
}

console.log('🔍 Запуск перевірки структури проєкту OZON-DEZ...\n');

// 1. ПЕРЕВІРКА: Руни лише в .svelte або .svelte.ts (CRITICAL § 4.2.1)
const tsFiles = walkDir('src', (f) => f.endsWith('.ts') && !f.endsWith('.svelte.ts') && !f.endsWith('.d.ts'));
const RUNE_REGEX = /\$(state|derived|effect|props|bindable|inspect)\b/;

let runeErrors = 0;
for (const file of tsFiles) {
	const content = fs.readFileSync(file, 'utf8');
	if (RUNE_REGEX.test(content)) {
		logError(`Знайдено руни у звичайному .ts модулі (${file}). Використовуйте розширення .svelte.ts!`);
		runeErrors++;
	}
}
if (runeErrors === 0) {
	logSuccess(`Руни вживаються коректно: 0 порушень у ${tsFiles.length} ts-файлах`);
}

// 2. ПЕРЕВІРКА: Відсутність сиріт у src/lib/components/ (HIGH § 4.3)
const componentFiles = walkDir('src/lib/components', (f) => f.endsWith('.svelte'));
const allSourceFiles = walkDir('src', (f) => /\.(svelte|ts|js)$/.test(f));
const allSourcesContent = allSourceFiles
	.map((f) => fs.readFileSync(f, 'utf8'))
	.join('\n');

let orphanErrors = 0;
for (const compPath of componentFiles) {
	const compName = path.basename(compPath);
	// Шукаємо імпорт цього компонента
	const importRegex = new RegExp(`['"](?:[^'"]*\\/)?${compName}['"]`);
	const tagRegex = new RegExp(`<${compName.replace('.svelte', '')}\\b`);

	if (!importRegex.test(allSourcesContent)) {
		logError(`Компонент-сирота без імпорту: ${compPath}`);
		orphanErrors++;
	}
}
if (orphanErrors === 0) {
	logSuccess(`Усі компоненти підключені: 0 сиріт серед ${componentFiles.length} компонентів`);
}

// 3. ПЕРЕВІРКА: Організація static/ (MEDIUM § 2)
const staticFiles = fs.readdirSync('static');
const ALLOWED_STATIC_ROOT = new Set([
	'favicon.svg',
	'favicon.ico',
	'favicon.png',
	'robots.txt',
	'sitemap.xml',
	'llms.txt',
	'manifest.json',
	'.nojekyll',
	'CNAME'
]);

let staticErrors = 0;
for (const file of staticFiles) {
	const fullPath = path.join('static', file);
	const isDir = fs.statSync(fullPath).isDirectory();
	if (!isDir && !ALLOWED_STATIC_ROOT.has(file)) {
		logError(`Недозволений службовий файл у корені static/: ${file}. Перенесіть у підпапку!`);
		staticErrors++;
	}
}
if (staticErrors === 0) {
	logSuccess(`Корінь static/ чистий: лише дозволені службові файли`);
}

// 4. ПЕРЕВІРКА: Маршрутизація тільки через +-файли у src/routes (HIGH § 3)
const routeFiles = fs.readdirSync('src/routes');
let routeErrors = 0;
for (const file of routeFiles) {
	const fullPath = path.join('src/routes', file);
	const isDir = fs.statSync(fullPath).isDirectory();
	if (!isDir && !file.startsWith('+') && file.endsWith('.svelte')) {
		logError(`Компонент без префікса '+' у src/routes/: ${file}`);
		routeErrors++;
	}
}
if (routeErrors === 0) {
	logSuccess(`Маршрутизація валідна: відсутні компоненти без '+' у src/routes`);
}

// 5. ПЕРЕВІРКА: Гігієна кореня від сміттєвих файлів та тимчасових тек (DOCUMENTATION-v10 § 1.1)
const rootEntries = fs.readdirSync('.');
const FORBIDDEN_ROOT_DIRS = /^(?:delete|deleted|temp|tmp|trash|test\d+)$/i;
const FORBIDDEN_ROOT_FILES = /^(?:notes.*\.txt|.*-old\..*|.*_final\..*)$/i;

let hygieneErrors = 0;
for (const entry of rootEntries) {
	if (entry.startsWith('.')) continue;
	const isDir = fs.statSync(entry).isDirectory();
	if (isDir && FORBIDDEN_ROOT_DIRS.test(entry)) {
		logError(`Тимчасова тека в корені репозиторію: ${entry}. Перенесіть у .private/.temp/ або видаліть!`);
		hygieneErrors++;
	} else if (!isDir && FORBIDDEN_ROOT_FILES.test(entry)) {
		logError(`Заборонений суфікс або тимчасовий файл у корені: ${entry}`);
		hygieneErrors++;
	}
}
if (hygieneErrors === 0) {
	logSuccess(`Гігієна кореня дотримана: відсутні тимчасові сміттєві файли та теки`);
}

console.log('\n----------------------------------------');
if (errorsCount > 0) {
	console.error(`💥 Перевірка структури завершилась із помилками: ${errorsCount}`);
	process.exit(1);
} else {
	console.log('🎉 Усі доречні перевірки структури пройдені успішно!');
	process.exit(0);
}
