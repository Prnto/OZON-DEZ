// Svelte 5 reactive language state with localStorage persistence

function getInitialLang(): 'ru' | 'ua' {
	if (typeof window !== 'undefined') {
		try {
			const saved = localStorage.getItem('ozon_lang');
			if (saved === 'ru' || saved === 'ua') {
				return saved;
			}
		} catch {
			// fallback if localStorage is disabled or restricted
		}
	}
	return 'ua';
}

function persistLang(lang: 'ru' | 'ua') {
	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem('ozon_lang', lang);
			document.documentElement.lang = lang;
		} catch {
			// ignore
		}
	}
}

const initial = getInitialLang();
let currentLang = $state<'ru' | 'ua'>(initial);

// Set document lang attribute on browser init
if (typeof window !== 'undefined') {
	try {
		document.documentElement.lang = initial;
	} catch {
		// ignore
	}
}

export const langState = {
	get current() {
		return currentLang;
	},
	set current(val: 'ru' | 'ua') {
		currentLang = val;
		persistLang(val);
	},
	toggle() {
		currentLang = currentLang === 'ua' ? 'ru' : 'ua';
		persistLang(currentLang);
	}
};
