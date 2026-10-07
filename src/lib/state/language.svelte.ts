// Svelte 5 reactive language state
let currentLang = $state<'ru' | 'ua'>('ua');

export const langState = {
	get current() {
		return currentLang;
	},
	set current(val: 'ru' | 'ua') {
		currentLang = val;
	},
	toggle() {
		currentLang = currentLang === 'ua' ? 'ru' : 'ua';
	}
};
