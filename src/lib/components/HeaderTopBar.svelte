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
			<!-- Landline & Mobile in pill badges with police red/blue strobe effect -->
			<div class="top-phones-cluster">
				<a href="tel:{currentContent.phones.landline}" class="top-phone-pill phone-pill-red" title="Міський / Офіс" data-testid="topbar-landline-link">
					<div class="pill-inner">
						<span class="pill-top-label">{#if langState.current === 'ua'}Міський{:else if langState.current === 'ru'}Городской{:else}Office{/if}</span>
						<div class="pill-num-line">
							<span class="top-icon"><Phone size={11} weight="bold" /></span>
							<span class="phone-number-text">{currentContent.phones.landlineDisplay}</span>
						</div>
					</div>
				</a>
				<a href="tel:{currentContent.phones.mobile}" class="top-phone-pill phone-pill-blue" title="lifecell Мобільний зв'язок" data-testid="topbar-mobile-link">
					<div class="pill-inner">
						<span class="pill-top-label lifecell-label">
							<svg class="lifecell-svg-mark" viewBox="0 0 160 45" width="46" height="12" fill="currentColor" aria-label="lifecell">
								<path d="M8.8,0.6C8.8,0.2,8.6,0,8.2,0H0.6C0.2,0,0,0.2,0,0.7l0.1,36.6c0,6.6,2.5,7.7,8.3,7.7c0.2,0,0.3,0,0.5-0.2C9,44.7,9,44.3,9,44.3L8.8,0.6z"/>
								<path d="M15.4,7c-0.4,0-0.6-0.2-0.6-0.6V0.7C14.8,0.2,15,0,15.4,0H23c0.4,0,0.6,0.2,0.6,0.6v5.7C23.7,6.8,23.5,7,23,7H15.4z M15.5,45c-0.4,0-0.6-0.2-0.6-0.6V14c0-0.4,0.2-0.6,0.6-0.6h7.6c0.4,0,0.6,0.2,0.6,0.6v30.4c0,0.5-0.2,0.6-0.6,0.6H15.5z"/>
								<path d="M31.9,45c-0.5,0-0.6-0.2-0.6-0.6v-24c0-0.3-0.1-0.4-0.4-0.4L29,20c-0.4,0-0.6-0.2-0.6-0.6v-5.3c0-0.4,0.2-0.6,0.6-0.6h1.9c0.2,0,0.4-0.1,0.4-0.4v-2.2C31.2,3.2,34.7,0,42,0h4.8c0.4,0,0.6,0.2,0.6,0.6v5.8c0,0.5-0.2,0.6-0.6,0.6h-3.3C40.7,7,40,7.7,40,10.3v2.5c0,0.3,0.1,0.4,0.4,0.4h4c0.4,0,0.6,0.2,0.6,0.6v5.3c0,0.5-0.2,0.6-0.6,0.6h-4c-0.3,0-0.4,0.1-0.4,0.4v24c0,0.4-0.2,0.6-0.6,0.6L31.9,45z"/>
								<path d="M48.6,36.3c-0.7-2.2-1-4.6-1-7.3c0-2.9,0.2-5.3,0.9-7.4c1.8-5.5,6.6-8.7,13.2-8.7c6.7,0,11.5,3.2,13.3,8.6c0.7,2.2,0.8,5.3,0.8,9.4c0,0.4-0.3,0.6-0.7,0.6H56.9c-0.3,0-0.4,0.1-0.4,0.4c0.1,0.6,0,1.2,0.2,1.7c0.8,2.7,3,4.1,6.3,4.1c2.5,0,4.4-0.8,5.6-1.6c1.1-0.8,1.1-1.1,1.7-0.6l4.7,3.4c0.4,0.3,0.4,0.6,0.1,0.9c-3.2,3.4-7.5,5.2-13,5.2C55.3,45,50.4,41.8,48.6,36.3z M66.8,25.7c0.3,0,0.4-0.1,0.4-0.4c0-0.8-0.1-1.6-0.3-2.3c-0.8-2.2-2.3-3.4-5-3.4c-2.4,0-4.5,1.2-5.3,3.4c-0.2,0.7-0.3,1.5-0.3,2.3c0,0.3,0.1,0.4,0.4,0.4H66.8z"/>
								<path d="M79.9,36.3C79.2,34.5,79,32,79,29s0.2-5.5,0.9-7.4c1.8-5.7,6.6-8.7,13.2-8.7c5.1,0,9.3,2.3,11.6,5.8c0.2,0.3,0.2,0.6-0.1,0.9L99,23.2c-0.4,0.3-0.7,0.2-0.9-0.1c-1.3-1.8-2.9-2.7-4.9-2.7c-2.5,0-4.1,1.1-4.8,3.3c-0.4,1.1-0.6,2.9-0.6,5.3s0.2,4.2,0.6,5.3c0.7,2.2,2.3,3.3,4.8,3.3c2,0,3.6-0.9,4.9-2.7c0.2-0.3,0.6-0.4,0.9-0.1l5.5,3.6c0.3,0.2,0.3,0.6,0.1,0.9c-2.3,3.5-6.5,5.8-11.6,5.8C86.5,45,81.7,42,79.9,36.3z"/>
								<path d="M106.6,36.3c-0.7-2.2-1-4.6-1-7.3c0-2.9,0.2-5.3,0.9-7.4c1.8-5.5,6.6-8.7,13.2-8.7c6.7,0,11.5,3.2,13.3,8.6c0.7,2.2,0.8,5.3,0.8,9.4c0,0.4-0.3,0.6-0.7,0.6h-18.2c-0.3,0-0.4,0.1-0.4,0.4c0.1,0.6,0,1.2,0.2,1.7c0.8,2.7,3,4.1,6.3,4.1c2.5,0,4.4-0.8,5.6-1.6c1.1-0.8,1.1-1.1,1.7-0.6l4.7,3.4c0.4,0.3,0.4,0.6,0.1,0.9c-3.2,3.4-7.5,5.2-13,5.2C113.3,45,108.4,41.8,106.6,36.3z M124.8,25.7c0.3,0,0.4-0.1,0.4-0.4c0-0.8-0.1-1.6-0.3-2.3c-0.8-2.2-2.3-3.4-5-3.4c-2.4,0-4.5,1.2-5.3,3.4c-0.2,0.7-0.3,1.5-0.3,2.3c0,0.3,0.1,0.4,0.4,0.4H124.8z"/>
								<path d="M146.8,0.6c0-0.4-0.2-0.6-0.6-0.6h-7.6c-0.4,0-0.6,0.2-0.6,0.7l0.1,36.6c0,6.6,2.5,7.7,8.3,7.7c0.2,0,0.3,0,0.5-0.2c0.1-0.1,0.1-0.5,0.1-0.5L146.8,0.6z"/>
								<path d="M159.8,0.6c0-0.4-0.2-0.6-0.6-0.6h-7.6c-0.4,0-0.6,0.2-0.6,0.7l0.1,36.6c0,6.6,2.5,7.7,8.3,7.7c0.2,0,0.3,0,0.5-0.2c0.1-0.1,0.1-0.5,0.1-0.5L159.8,0.6z"/>
							</svg>
						</span>
						<div class="pill-num-line">
							<span class="phone-pulse-dot"></span>
							<span class="phone-number-text">{currentContent.phones.mobileDisplay}</span>
						</div>
					</div>
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
		justify-content: center;
		padding: 0.22rem 0.75rem;
		border-radius: var(--radius-full);
		font-weight: 600;
		text-decoration: none;
		transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);
		white-space: nowrap;
	}

	.pill-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1px;
		line-height: 1.1;
	}

	.pill-top-label {
		font-size: 8.5px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.85;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 11px;
	}

	.lifecell-label {
		opacity: 0.95;
	}

	.lifecell-svg-mark {
		display: inline-block;
		height: 10px;
		width: auto;
		vertical-align: middle;
	}

	.pill-num-line {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.01em;
	}

	/* Left phone pill: Red */
	.top-phone-pill.phone-pill-red {
		background: linear-gradient(135deg, rgba(220, 38, 38, 0.28), rgba(185, 28, 28, 0.42));
		border: 1px solid rgba(239, 68, 68, 0.55);
		color: #fee2e2;
		box-shadow: 0 0 10px rgba(239, 68, 68, 0.25);
		animation: policeStrobeRed 1.4s ease-in-out 3 normal forwards;
	}

	.top-phone-pill.phone-pill-red:hover {
		background: rgba(239, 68, 68, 0.45);
		border-color: rgba(239, 68, 68, 0.85);
		color: #ffffff;
		box-shadow: 0 0 16px rgba(239, 68, 68, 0.5);
		transform: translateY(-1px);
	}

	/* Right phone pill: Blue */
	.top-phone-pill.phone-pill-blue {
		background: linear-gradient(135deg, rgba(2, 132, 199, 0.28), rgba(30, 64, 175, 0.42));
		border: 1px solid rgba(56, 189, 248, 0.55);
		color: #e0f2fe;
		box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
		animation: policeStrobeBlue 1.4s ease-in-out 3 normal forwards;
	}

	.top-phone-pill.phone-pill-blue:hover {
		background: rgba(2, 132, 199, 0.45);
		border-color: rgba(56, 189, 248, 0.85);
		color: #ffffff;
		box-shadow: 0 0 16px rgba(56, 189, 248, 0.5);
		transform: translateY(-1px);
	}

	/* Light mode adjustments */
	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-red {
		background: linear-gradient(135deg, rgba(254, 226, 226, 0.95), rgba(254, 202, 202, 0.85));
		border-color: rgba(239, 68, 68, 0.5);
		color: #b91c1c;
		box-shadow: 0 1px 4px rgba(220, 38, 38, 0.15);
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-red:hover {
		background: #fee2e2;
		border-color: rgba(220, 38, 38, 0.7);
		color: #991b1b;
		box-shadow: 0 2px 8px rgba(220, 38, 38, 0.25);
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-blue {
		background: linear-gradient(135deg, rgba(224, 242, 254, 0.95), rgba(186, 230, 253, 0.85));
		border-color: rgba(56, 189, 248, 0.5);
		color: #0369a1;
		box-shadow: 0 1px 4px rgba(2, 132, 199, 0.15);
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-blue:hover {
		background: #dbeafe;
		border-color: rgba(2, 132, 199, 0.7);
		color: #0c4a6e;
		box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
	}

	/* Blue pulse dot inside mobile pill */
	.phone-pill-blue .phone-pulse-dot {
		background-color: #38bdf8;
		box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7);
		animation: pulseDotBlue 2s infinite;
	}

	.phone-pulse-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #38bdf8;
		box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7);
		animation: pulseDotBlue 2s infinite;
		flex-shrink: 0;
	}

	/* Police Strobe Keyframes: 3 flashes on Red, then 3 flashes on Blue, then Pause. Repeats 3 times, then stops. */
	@keyframes policeStrobeRed {
		0%,
		8%,
		16% {
			background: #ef4444;
			border-color: #ffffff;
			color: #ffffff;
			box-shadow: 0 0 18px 4px rgba(239, 68, 68, 0.95), 0 0 32px 8px rgba(255, 68, 68, 0.6);
			transform: scale(1.02);
		}
		4%,
		12%,
		20% {
			background: rgba(220, 38, 38, 0.15);
			border-color: rgba(239, 68, 68, 0.3);
			color: #fecaca;
			box-shadow: none;
			transform: scale(1);
		}
		24%,
		100% {
			background: linear-gradient(135deg, rgba(220, 38, 38, 0.28), rgba(185, 28, 28, 0.42));
			border-color: rgba(239, 68, 68, 0.55);
			color: #fee2e2;
			box-shadow: 0 0 10px rgba(239, 68, 68, 0.25);
			transform: scale(1);
		}
	}

	@keyframes policeStrobeBlue {
		0%,
		24% {
			background: linear-gradient(135deg, rgba(2, 132, 199, 0.28), rgba(30, 64, 175, 0.42));
			border-color: rgba(56, 189, 248, 0.55);
			color: #e0f2fe;
			box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
			transform: scale(1);
		}
		28%,
		36%,
		44% {
			background: #0284c7;
			border-color: #ffffff;
			color: #ffffff;
			box-shadow: 0 0 18px 4px rgba(2, 132, 199, 0.95), 0 0 32px 8px rgba(56, 189, 248, 0.6);
			transform: scale(1.02);
		}
		32%,
		40%,
		48% {
			background: rgba(2, 132, 199, 0.15);
			border-color: rgba(56, 189, 248, 0.3);
			color: #bae6fd;
			box-shadow: none;
			transform: scale(1);
		}
		52%,
		100% {
			background: linear-gradient(135deg, rgba(2, 132, 199, 0.28), rgba(30, 64, 175, 0.42));
			border-color: rgba(56, 189, 248, 0.55);
			color: #e0f2fe;
			box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.top-phone-pill.phone-pill-red,
		.top-phone-pill.phone-pill-blue {
			animation: none;
		}
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
