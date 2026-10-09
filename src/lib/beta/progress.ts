import type { BetaCheck, Coverage, Mark, Marks, Vote } from './types';

export const VOTES: readonly Vote[] = ['ok', 'fail', 'unclear', 'skip'];
const ORDER: Record<Coverage, number> = { manual: 0, testable: 1, covered: 2 };

/** Sorts checks: manual (0) -> testable (1) -> covered (2) */
export const sortChecks = (checks: readonly BetaCheck[]) =>
	[...checks].sort((a, b) => ORDER[a.coverage] - ORDER[b.coverage]);

/** Vote toggle: repeat click removes vote; stale version mark is re-stamped with current version */
export function vote(marks: Marks, id: string, next: Vote, version: string): Marks {
	const current = marks[id];
	const copy = { ...marks };
	if (current?.vote === next && current.version === version) {
		delete copy[id];
	} else {
		copy[id] = { vote: next, version };
	}
	return copy;
}

/** Untrusted storage parser: filters by known check IDs */
export function readMarks(raw: unknown, known: ReadonlySet<string>): Marks {
	const out: Marks = {};
	if (!raw || typeof raw !== 'object') return out;
	for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
		const mark = value as { vote?: unknown; version?: unknown } | null;
		if (
			known.has(id) &&
			mark &&
			VOTES.includes(mark.vote as Vote) &&
			typeof mark.version === 'string'
		) {
			out[id] = { vote: mark.vote as Vote, version: mark.version };
		}
	}
	return out;
}

/** Count of checks marked on the current version */
export const doneOnVersion = (checks: readonly BetaCheck[], marks: Marks, version: string) =>
	checks.filter((check) => marks[check.id]?.version === version).length;

/** Formats check ID to testid slug (`common_1` -> `common-1`) */
export const tid = (id: string) => id.replaceAll('_', '-');

/** Builds plain-text report for clipboard export with failed items on top (§ 6.1) */
export function generateReport(params: {
	version: string;
	lang: 'uk' | 'en';
	theme: string;
	userAgent: string;
	checks: BetaCheck[];
	marks: Marks;
}): string {
	const { version, lang, theme, userAgent, checks, marks } = params;
	const lines: string[] = [];

	const total = checks.length;
	const done = doneOnVersion(checks, marks, version);
	const okCount = checks.filter((c) => marks[c.id]?.vote === 'ok').length;
	const failCount = checks.filter((c) => marks[c.id]?.vote === 'fail').length;
	const unclearCount = checks.filter((c) => marks[c.id]?.vote === 'unclear').length;
	const skipCount = checks.filter((c) => marks[c.id]?.vote === 'skip').length;

	lines.push(`=== ЗВІТ БЕТА-ТЕСТУВАННЯ OZON-DEZ ===`);
	lines.push(`Версія збірки: ${version}`);
	lines.push(`Час (ISO): ${new Date().toISOString()}`);
	lines.push(`Браузер (UserAgent): ${userAgent}`);
	lines.push(`Мова: ${lang.toUpperCase()} | Тема: ${theme}`);
	lines.push(
		`Поступ: ${done} / ${total} (${Math.round((done / total) * 100) || 0}%) | Працює: ${okCount} | Зламано: ${failCount} | Не зрозуміло: ${unclearCount} | Пропущено: ${skipCount}`
	);
	lines.push('--------------------------------------------------');

	// Group: Fails first
	const failed = checks.filter((c) => marks[c.id]?.vote === 'fail');
	if (failed.length > 0) {
		lines.push('[!] ВИЯВЛЕНІ ДЕФЕКТИ [НЕ ПРАЦЮЄ]:');
		for (const c of failed) {
			const m = marks[c.id];
			const stale = m?.version !== version ? ` (позначено на іншій версії: ${m?.version})` : '';
			lines.push(`[НЕ ПРАЦЮЄ] ${c.id} (${c.category[lang]})${stale}`);
			lines.push(`  ${c.text[lang]}`);
			if (c.coverage === 'covered' && c.test) {
				lines.push(`  !!! ПУНКТ ПОКРИТО АВТОТЕСТОМ ${c.test} — тест пропустив помилку!`);
			}
		}
		lines.push('--------------------------------------------------');
	}

	// Group: Unclear
	const unclear = checks.filter((c) => marks[c.id]?.vote === 'unclear');
	if (unclear.length > 0) {
		lines.push('[?] НЕ ЗРОЗУМІЛО / СУМНІВНІ ПУНКТИ:');
		for (const c of unclear) {
			lines.push(`[НЕ ЗРОЗУМІЛО] ${c.id} (${c.category[lang]}): ${c.text[lang]}`);
		}
		lines.push('--------------------------------------------------');
	}

	// Group: Passed
	const ok = checks.filter((c) => marks[c.id]?.vote === 'ok');
	if (ok.length > 0) {
		lines.push('[+] ПІДТВЕРДЖЕНО [ПРАЦЮЄ]:');
		for (const c of ok) {
			lines.push(`[OK] ${c.id}: ${c.text[lang]}`);
		}
		lines.push('--------------------------------------------------');
	}

	// Group: Skipped
	const skipped = checks.filter((c) => marks[c.id]?.vote === 'skip');
	if (skipped.length > 0) {
		lines.push('⏭️ ПРОПУЩЕНО:');
		for (const c of skipped) {
			lines.push(`[ПРОПУЩЕНО] ${c.id}: ${c.text[lang]}`);
		}
	}

	return lines.join('\n');
}
