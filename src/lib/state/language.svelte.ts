// Svelte 5 reactive language state with localStorage persistence

export type Lang = 'ua' | 'ru' | 'en';

function getInitialLang(): Lang {
	if (typeof window !== 'undefined') {
		try {
			const saved = localStorage.getItem('ozon_lang');
			if (saved === 'ru' || saved === 'ua' || saved === 'en') {
				return saved;
			}
		} catch {
			// fallback if localStorage is disabled or restricted
		}
	}
	return 'ua';
}

function persistLang(lang: Lang) {
	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem('ozon_lang', lang);
			document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
		} catch {
			// ignore
		}
	}
}

const initial = getInitialLang();
let currentLang = $state<Lang>(initial);

// Set document lang attribute on browser init
if (typeof window !== 'undefined') {
	try {
		document.documentElement.lang = initial === 'ua' ? 'uk' : initial;
	} catch {
		// ignore
	}
}

export const langState = {
	get current(): Lang {
		return currentLang;
	},
	set current(val: Lang) {
		currentLang = val;
		persistLang(val);
	},
	setLang(val: Lang) {
		currentLang = val;
		persistLang(val);
	}
};
