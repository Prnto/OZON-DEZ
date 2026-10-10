<script lang="ts">
	import { MapPin, Clock, Phone, Moon, Sun } from 'phosphor-svelte';
	import { langState } from '../state/language.svelte';
	import { themeState } from '../state/theme.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
</script>

<div class="top-bar">
	<div class="top-bar-container">
		<div class="top-bar-left">
			<span class="top-info-item">
				<span class="top-icon"><MapPin size={13} weight="bold" /></span>
				<span class="top-text">{currentContent.address.city}</span>
			</span>
			<span class="top-bar-divider">|</span>
			<span class="top-info-item">
				<span class="top-icon"><Clock size={13} weight="bold" /></span>
				<span class="top-text">{currentContent.workingHours.days}: {currentContent.workingHours.hours}</span>
			</span>
		</div>

		<div class="top-bar-right">
			<!-- Landline & Mobile in unified harmonious pills -->
			<div class="top-phones-cluster">
				<a href="tel:{currentContent.phones.landline}" class="top-phone-pill phone-pill-office" title="Міський / Офіс" data-testid="topbar-landline-link">
					<span class="top-icon"><Phone size={13} weight="bold" /></span>
					<span>{currentContent.phones.landlineDisplay}</span>
				</a>
				<a href="tel:{currentContent.phones.mobile}" class="top-phone-pill phone-pill-primary" title="Мобільний зв'язок" data-testid="topbar-mobile-link">
					<span class="phone-pulse-dot"></span>
					<span>{currentContent.phones.mobileDisplay}</span>
				</a>
			</div>
			<span class="top-bar-divider">|</span>

			<!-- Explicit Dual Theme Switcher (Dark / Light) -->
			<div class="theme-segmented-ctrl" role="group" aria-label="Тема сайту">
				<button
					type="button"
					class="theme-segment-btn"
					class:active={themeState.current === 'dark'}
					aria-pressed={themeState.current === 'dark'}
					onclick={() => themeState.setTheme('dark')}
					title="Темна тема"
					data-testid="theme-dark-btn"
				>
					<span class="theme-icon"><Moon size={13} weight="bold" /></span>
					<span class="theme-label">{#if langState.current === 'ua'}Темна{:else if langState.current === 'ru'}Темная{:else}Dark{/if}</span>
				</button>
				<button
					type="button"
					class="theme-segment-btn"
					class:active={themeState.current === 'light'}
					aria-pressed={themeState.current === 'light'}
					onclick={() => themeState.setTheme('light')}
					title="Світла тема"
					data-testid="theme-light-btn"
				>
					<span class="theme-icon"><Sun size={13} weight="bold" /></span>
					<span class="theme-label">{#if langState.current === 'ua'}Світла{:else if langState.current === 'ru'}Светлая{:else}Light{/if}</span>
				</button>
			</div>

			<span class="top-bar-divider">|</span>

			<!-- Language Switcher: 3 Languages (UA / RU / EN) -->
			<div class="lang-segmented-ctrl" role="group" aria-label="Мова сайту">
				<button
					type="button"
					class="lang-segment-btn"
					class:active={langState.current === 'ua'}
					aria-pressed={langState.current === 'ua'}
					onclick={() => langState.setLang('ua')}
					data-testid="lang-ua-btn"
				>
					UA
				</button>
				<span class="lang-divider">/</span>
				<button
					type="button"
					class="lang-segment-btn"
					class:active={langState.current === 'ru'}
					aria-pressed={langState.current === 'ru'}
					onclick={() => langState.setLang('ru')}
					data-testid="lang-ru-btn"
				>
					RU
				</button>
				<span class="lang-divider">/</span>
				<button
					type="button"
					class="lang-segment-btn"
					class:active={langState.current === 'en'}
					aria-pressed={langState.current === 'en'}
					onclick={() => langState.setLang('en')}
					data-testid="lang-en-btn"
				>
					EN
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	/* Top Utility Bar */
	.top-bar {
		background: #000000;
		color: var(--color-ash-gray);
		font-size: 0.76rem;
		border-bottom: 1px solid var(--color-void-border);
		transition: background var(--transition-norm), border-color var(--transition-norm);
	}

	:global(html[data-theme="light"]) .top-bar {
		background: #ffffff;
		color: #64748b;
		border-bottom-color: rgba(15, 23, 42, 0.08);
	}

	.top-bar-container {
		max-width: var(--container-width);
		margin: 0 auto;
		padding: 0.35rem clamp(0.75rem, 2vw, 1.5rem);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.top-bar-left,
	.top-bar-right {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		white-space: nowrap;
	}

	@media (max-width: 920px) {
		.top-bar-left {
			display: none;
		}
		.top-bar-container {
			justify-content: flex-end;
		}
	}

	@media (max-width: 480px) {
		.top-bar-container {
			padding: 0.3rem 0.65rem;
			gap: 0.4rem;
		}
		.top-phone-pill {
			font-size: 0.72rem;
			gap: 0.2rem;
			padding: 0.2rem 0.5rem;
		}
		.top-bar-right {
			gap: 0.4rem;
		}
	}

	.top-info-item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	.top-icon {
		font-size: 0.85rem;
	}

	.top-bar-divider {
		color: rgba(255, 255, 255, 0.15);
		font-size: 0.75rem;
	}

	:global(html[data-theme="light"]) .top-bar-divider {
		color: rgba(15, 23, 42, 0.12);
	}

	.top-phones-cluster {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	.top-phone-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.28rem 0.75rem;
		border-radius: var(--radius-full);
		font-weight: 600;
		font-size: 12.5px;
		text-decoration: none;
		transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);
		white-space: nowrap;
	}

	/* Office landline: quiet secondary glass pill */
	.top-phone-pill.phone-pill-office {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-silver-mist);
	}

	.top-phone-pill.phone-pill-office:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.25);
		color: #ffffff;
		transform: translateY(-1px);
	}

	/* Primary mobile: Oceanic blue highlight */
	.top-phone-pill.phone-pill-primary {
		background: rgba(2, 132, 199, 0.18);
		border: 1px solid rgba(2, 132, 199, 0.45);
		color: #e0f2fe;
	}

	.top-phone-pill.phone-pill-primary:hover {
		background: #0284c7;
		border-color: #0284c7;
		color: #ffffff;
		box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
		transform: translateY(-1px);
	}

	/* Light mode adjustments */
	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-office {
		background: #f1f5f9;
		border-color: #cbd5e1;
		color: #475569;
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-office:hover {
		background: #e2e8f0;
		color: #0f172a;
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-primary {
		background: #e0f2fe;
		border-color: #7dd3fc;
		color: #0369a1;
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-primary:hover {
		background: #0284c7;
		border-color: #0284c7;
		color: #ffffff;
		box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
	}

	/* Blue pulse dot inside mobile pill */
	.phone-pulse-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #38bdf8;
		box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7);
		animation: pulseDotBlue 2s infinite;
		flex-shrink: 0;
	}

	@keyframes pulseDotBlue {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 5px rgba(56, 189, 248, 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(56, 189, 248, 0);
		}
	}

	@keyframes pulseDot {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(128, 82, 255, 0.7);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 6px rgba(128, 82, 255, 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(128, 82, 255, 0);
		}
	}

	/* Explicit Dual Theme Segmented Control */
	.theme-segmented-ctrl {
		display: inline-flex;
		align-items: center;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: var(--radius-full);
		padding: 2px;
		gap: 2px;
	}

	:global(html[data-theme="light"]) .theme-segmented-ctrl {
		background: rgba(15, 23, 42, 0.05);
		border-color: rgba(15, 23, 42, 0.12);
	}

	.theme-segment-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.18rem 0.55rem;
		border-radius: var(--radius-full);
		border: none;
		background: transparent;
		color: var(--color-ash-gray);
		font-size: 0.72rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.theme-segment-btn:hover {
		color: var(--color-bone-white);
	}

	.theme-segment-btn.active {
		background: rgba(2, 132, 199, 0.25);
		color: #ffffff;
		border: 1px solid rgba(2, 132, 199, 0.45);
	}

	:global(html[data-theme="light"]) .theme-segment-btn {
		color: #64748b;
	}

	:global(html[data-theme="light"]) .theme-segment-btn:hover {
		color: #0f172a;
	}

	:global(html[data-theme="light"]) .theme-segment-btn.active {
		background: #0284c7;
		color: #ffffff;
		box-shadow: 0 1px 4px rgba(2, 132, 199, 0.25);
	}

	.theme-icon {
		font-size: 0.72rem;
		line-height: 1;
	}

	.theme-label {
		font-size: 0.7rem;
		letter-spacing: 0.02em;
	}

	/* Language Segmented Control */
	.lang-segmented-ctrl {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		padding: 0.18rem 0.55rem;
		border-radius: var(--radius-full);
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.05);
		font-size: 0.72rem;
		font-weight: 600;
	}

	:global(html[data-theme="light"]) .lang-segmented-ctrl {
		border-color: rgba(15, 23, 42, 0.12);
		background: rgba(15, 23, 42, 0.05);
	}

	.lang-segment-btn {
		border: none;
		background: transparent;
		color: var(--color-ash-gray);
		cursor: pointer;
		font-size: 0.72rem;
		font-weight: 600;
		padding: 0 0.1rem;
		transition: color var(--transition-fast);
	}

	.lang-segment-btn:hover {
		color: var(--color-bone-white);
	}

	:global(html[data-theme="light"]) .lang-segment-btn {
		color: #64748b;
	}

	:global(html[data-theme="light"]) .lang-segment-btn:hover {
		color: #0f172a;
	}

	.lang-segment-btn.active {
		color: #38bdf8;
		font-weight: 700;
	}

	:global(html[data-theme="light"]) .lang-segment-btn.active {
		color: #0284c7;
	}

	.lang-divider {
		color: rgba(255, 255, 255, 0.2);
		font-size: 0.7rem;
	}
</style>
