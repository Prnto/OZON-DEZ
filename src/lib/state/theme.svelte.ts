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

			if (document.body) {
				document.body.setAttribute('data-theme', theme);
				if (theme === 'light') {
					document.body.classList.add('theme-light');
					document.body.classList.remove('theme-dark');
				} else {
					document.body.classList.add('theme-dark');
					document.body.classList.remove('theme-light');
				}
			}

			const metaTheme = document.querySelector('meta[name="theme-color"]');
			if (metaTheme) {
				metaTheme.setAttribute('content', theme === 'light' ? '#f4f6f9' : '#000000');
			}
		}
	}
}

export const themeState = new ThemeState();
