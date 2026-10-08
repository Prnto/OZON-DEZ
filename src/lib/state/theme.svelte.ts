const isBrowser = typeof window !== 'undefined';

export type Theme = 'dark' | 'light';

class ThemeState {
	current = $state<Theme>('dark');

	constructor() {
		if (isBrowser) {
			const saved = localStorage.getItem('ozon_dez_theme') as Theme | null;
			if (saved === 'light' || saved === 'dark') {
				this.current = saved;
			} else {
				this.current = 'dark';
			}
			this.applyTheme(this.current);
		}
	}

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		if (isBrowser) {
			localStorage.setItem('ozon_dez_theme', this.current);
			this.applyTheme(this.current);
		}
	}

	setTheme(theme: Theme) {
		this.current = theme;
		if (isBrowser) {
			localStorage.setItem('ozon_dez_theme', theme);
			this.applyTheme(theme);
		}
	}

	private applyTheme(theme: Theme) {
		if (isBrowser) {
			document.documentElement.setAttribute('data-theme', theme);
			if (theme === 'light') {
				document.documentElement.classList.add('theme-light');
				document.documentElement.classList.remove('theme-dark');
			} else {
				document.documentElement.classList.add('theme-dark');
				document.documentElement.classList.remove('theme-light');
			}
		}
	}
}

export const themeState = new ThemeState();
