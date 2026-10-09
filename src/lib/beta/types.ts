export interface Localized {
	uk: string;
	en: string;
}

export type ChecklistLang = keyof Localized;

export type Coverage = 'manual' | 'testable' | 'covered';

export interface CheckBase {
	id: string;
	category: Localized;
	text: Localized;
	testid?: string;
	shortcut?: string;
	negative?: true;
}

export type BetaCheck = CheckBase &
	({ coverage: 'covered'; test: string } | { coverage: 'manual' | 'testable'; test?: never });

export interface BetaTab {
	id: string;
	title: Localized;
	routes: string[];
	checks: BetaCheck[];
}

export type Vote = 'ok' | 'fail' | 'unclear' | 'skip';

export interface Mark {
	vote: Vote;
	version: string;
}

export type Marks = Record<string, Mark>;
