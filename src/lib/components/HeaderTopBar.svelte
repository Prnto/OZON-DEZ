<script lang="ts">
	import { MapPin, Clock, Phone, Moon, Sun, EnvelopeSimple } from 'phosphor-svelte';
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
			<span class="top-bar-divider">|</span>
			<a href="mailto:{currentContent.email}" class="top-info-item top-email-link" title="Email: {currentContent.email}" data-testid="topbar-email-link">
				<span class="top-icon"><EnvelopeSimple size={13} weight="bold" /></span>
				<span class="top-text">{currentContent.email}</span>
			</a>
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

			<!-- Switchers Cluster: Theme & Language (spreads evenly on mobile) -->
			<div class="top-switchers-cluster">
				<span class="top-bar-divider top-divider-desktop">|</span>

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

	:global(html[data-theme="light"]) .top-bar,
	:global(html.theme-light) .top-bar,
	:global(body[data-theme="light"]) .top-bar,
	:global([data-theme="light"]) .top-bar {
		background: #f7f7f5 !important;
		color: #4d5757 !important;
		border-bottom-color: #c9cbbe !important;
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

	@media (max-width: 860px) {
		.top-bar-left {
			display: none;
		}
		.top-bar-container {
			justify-content: center;
			padding: 0.35rem 0.65rem;
		}
		.top-bar-right {
			width: 100%;
			display: flex;
			flex-direction: column-reverse;
			align-items: stretch;
			gap: 0.35rem;
			white-space: normal;
		}
		.top-switchers-cluster {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 2px;
		}
		.top-divider-desktop {
			display: none !important;
		}
		.top-phones-cluster {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 6px;
		}
		.top-phone-pill {
			width: 100%;
			box-sizing: border-box;
			min-height: 42px;
			padding: 0.25rem 0.35rem;
		}
		.pill-num-line {
			font-size: clamp(10.5px, 2.7vw, 12px);
			letter-spacing: -0.01em;
			justify-content: center;
			white-space: nowrap;
		}
	}

	.top-info-item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	.top-email-link {
		color: inherit;
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.top-email-link:hover {
		color: #38bdf8;
		text-decoration: underline;
	}

	:global(html[data-theme="light"]) .top-email-link:hover {
		color: #0284c7;
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

	.top-switchers-cluster {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
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

	.top-phone-pill * {
		color: inherit;
		fill: currentColor;
	}

	.pill-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1px;
		line-height: 1.1;
		width: 100%;
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
		justify-content: center;
		gap: 0.35rem;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.01em;
	}

	/* Left phone pill: Red (Landline) - Dark mode: 3 bursts on load/refresh, then stops */
	.top-phone-pill.phone-pill-red {
		background: linear-gradient(135deg, rgba(220, 38, 38, 0.28), rgba(185, 28, 28, 0.42));
		border: 1px solid rgba(239, 68, 68, 0.55);
		color: #fee2e2;
		box-shadow: 0 0 10px rgba(239, 68, 68, 0.25);
		animation: policeStrobeRedDark 1.4s ease-in-out 3 normal forwards;
	}

	.top-phone-pill.phone-pill-red:hover {
		background: rgba(239, 68, 68, 0.45);
		border-color: rgba(239, 68, 68, 0.85);
		color: #ffffff;
		box-shadow: 0 0 16px rgba(239, 68, 68, 0.5);
		transform: translateY(-1px);
	}

	/* Right phone pill: Blue (Mobile lifecell) - Dark mode: 3 bursts on load/refresh, then stops */
	.top-phone-pill.phone-pill-blue {
		background: linear-gradient(135deg, rgba(2, 132, 199, 0.28), rgba(30, 64, 175, 0.42));
		border: 1px solid rgba(56, 189, 248, 0.55);
		color: #e0f2fe;
		box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
		animation: policeStrobeBlueDark 1.4s ease-in-out 3 normal forwards;
	}

	.top-phone-pill.phone-pill-blue:hover {
		background: rgba(2, 132, 199, 0.45);
		border-color: rgba(56, 189, 248, 0.85);
		color: #ffffff;
		box-shadow: 0 0 16px rgba(56, 189, 248, 0.5);
		transform: translateY(-1px);
	}

	/* Light mode adjustments — High contrast, crisp colors with identical 3-cycle strobe logic */
	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-red,
	:global(html.theme-light) .top-phone-pill.phone-pill-red,
	:global(body[data-theme="light"]) .top-phone-pill.phone-pill-red,
	:global([data-theme="light"]) .top-phone-pill.phone-pill-red {
		background: #fef2f2;
		border: 1.5px solid #dc2626;
		color: #991b1b;
		box-shadow: 0 1px 4px rgba(220, 38, 38, 0.12);
		animation: policeStrobeRedLight 1.4s ease-in-out 3 normal forwards;
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-red:hover,
	:global(html.theme-light) .top-phone-pill.phone-pill-red:hover,
	:global(body[data-theme="light"]) .top-phone-pill.phone-pill-red:hover,
	:global([data-theme="light"]) .top-phone-pill.phone-pill-red:hover {
		background: #fee2e2;
		border-color: #b91c1c;
		color: #7f1d1d;
		box-shadow: 0 2px 8px rgba(220, 38, 38, 0.22);
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-blue,
	:global(html.theme-light) .top-phone-pill.phone-pill-blue,
	:global(body[data-theme="light"]) .top-phone-pill.phone-pill-blue,
	:global([data-theme="light"]) .top-phone-pill.phone-pill-blue {
		background: #f0f9ff;
		border: 1.5px solid #0284c7;
		color: #0369a1;
		box-shadow: 0 1px 4px rgba(2, 132, 199, 0.12);
		animation: policeStrobeBlueLight 1.4s ease-in-out 3 normal forwards;
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-blue:hover,
	:global(html.theme-light) .top-phone-pill.phone-pill-blue:hover,
	:global(body[data-theme="light"]) .top-phone-pill.phone-pill-blue:hover,
	:global([data-theme="light"]) .top-phone-pill.phone-pill-blue:hover {
		background: #e0f2fe;
		border-color: #0369a1;
		color: #075985;
		box-shadow: 0 2px 8px rgba(2, 132, 199, 0.22);
	}

	:global(html[data-theme="light"]) .pill-top-label,
	:global(html.theme-light) .pill-top-label {
		opacity: 1;
	}

	/* Blue pulse dot inside mobile pill */
	.phone-pill-blue .phone-pulse-dot {
		background-color: #38bdf8;
		box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7);
		animation: pulseDotBlue 2s infinite;
	}

	:global(html[data-theme="light"]) .top-phone-pill.phone-pill-blue .phone-pulse-dot {
		background-color: #0284c7;
		box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.7);
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

	/* Police Strobe Keyframes - Dark Mode: 3 cycles total on load/refresh, then stops */
	@keyframes policeStrobeRedDark {
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

	@keyframes policeStrobeBlueDark {
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

	/* Police Strobe Keyframes - Light Mode (Biosciences): 3 cycles total on load/refresh, then stops */
	@keyframes policeStrobeRedLight {
		0%,
		8%,
		16% {
			background: #ef4444;
			border-color: #ffffff;
			color: #ffffff;
			box-shadow: 0 0 18px 4px rgba(239, 68, 68, 0.95), 0 0 32px 8px rgba(255, 68, 68, 0.6);
			transform: scale(1.03);
		}
		4%,
		12%,
		20% {
			background: #fee2e2;
			border-color: #ef4444;
			color: #991b1b;
			box-shadow: none;
			transform: scale(1);
		}
		24%,
		100% {
			background: #fef2f2;
			border-color: #dc2626;
			color: #991b1b;
			box-shadow: 0 1px 4px rgba(220, 38, 38, 0.12);
			transform: scale(1);
		}
	}

	@keyframes policeStrobeBlueLight {
		0%,
		24% {
			background: #f0f9ff;
			border-color: #0284c7;
			color: #0369a1;
			box-shadow: 0 1px 4px rgba(2, 132, 199, 0.12);
			transform: scale(1);
		}
		28%,
		36%,
		44% {
			background: #0284c7;
			border-color: #ffffff;
			color: #ffffff;
			box-shadow: 0 0 18px 4px rgba(2, 132, 199, 0.95), 0 0 32px 8px rgba(56, 189, 248, 0.6);
			transform: scale(1.03);
		}
		32%,
		40%,
		48% {
			background: #e0f2fe;
			border-color: #38bdf8;
			color: #0369a1;
			box-shadow: none;
			transform: scale(1);
		}
		52%,
		100% {
			background: #f0f9ff;
			border-color: #0284c7;
			color: #0369a1;
			box-shadow: 0 1px 4px rgba(2, 132, 199, 0.12);
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.top-phone-pill.phone-pill-red,
		.top-phone-pill.phone-pill-blue {
			animation: none !important;
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
		background: #e7e8e1;
		border-color: #c9cbbe;
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
		color: #4d5757;
	}

	:global(html[data-theme="light"]) .theme-segment-btn:hover {
		color: #222f30;
	}

	:global(html[data-theme="light"]) .theme-segment-btn.active {
		background: #222f30;
		color: #ffffff;
		box-shadow: none;
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
		border-color: #c9cbbe;
		background: #e7e8e1;
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
		color: #4d5757;
	}

	:global(html[data-theme="light"]) .lang-segment-btn:hover {
		color: #222f30;
	}

	.lang-segment-btn.active {
		color: #38bdf8;
		font-weight: 700;
	}

	:global(html[data-theme="light"]) .lang-segment-btn.active {
		color: #222f30;
		font-weight: 700;
	}

	.lang-divider {
		color: rgba(255, 255, 255, 0.2);
		font-size: 0.7rem;
	}

	:global(html[data-theme="light"]) .lang-divider {
		color: #c9cbbe;
	}
</style>
