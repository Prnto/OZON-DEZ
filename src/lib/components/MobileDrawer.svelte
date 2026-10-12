<script lang="ts">
	import { resolve } from '$app/paths';
	import { Moon, Sun, PhoneCall, Phone, EnvelopeSimple, Clock, Lightning } from 'phosphor-svelte';
	import { langState } from '../state/language.svelte';
	import { themeState } from '../state/theme.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		currentPath: string;
	}

	let { isOpen, onClose, currentPath }: Props = $props();

	let currentContent = $derived(contentMap[langState.current]);

	function isActive(route: string) {
		if (route === '/') {
			return (
				currentPath === '/' ||
				currentPath === '' ||
				currentPath.endsWith('/OZON-DEZ/') ||
				currentPath.endsWith('/OZON-DEZ')
			);
		}
		return currentPath.includes(route);
	}
</script>

{#if isOpen}
	<div class="mobile-backdrop" onclick={onClose} role="presentation"></div>
	<div class="mobile-drawer" data-testid="mobile-drawer">
		<div class="mobile-nav">
			<div class="mobile-controls-row">
				<div class="mobile-lang-row">
					<span class="mobile-lang-label">{#if langState.current === 'ua'}Мова:{:else if langState.current === 'ru'}Язык:{:else}Lang:{/if}</span>
					<div class="lang-segmented-ctrl">
						<button
							type="button"
							class="lang-segment-btn"
							class:active={langState.current === 'ua'}
							data-testid="mobile-lang-ua-btn"
							aria-pressed={langState.current === 'ua'}
							onclick={() => langState.setLang('ua')}
						>
							UA
						</button>
						<span class="lang-divider">/</span>
						<button
							type="button"
							class="lang-segment-btn"
							class:active={langState.current === 'ru'}
							data-testid="mobile-lang-ru-btn"
							aria-pressed={langState.current === 'ru'}
							onclick={() => langState.setLang('ru')}
						>
							RU
						</button>
						<span class="lang-divider">/</span>
						<button
							type="button"
							class="lang-segment-btn"
							class:active={langState.current === 'en'}
							data-testid="mobile-lang-en-btn"
							aria-pressed={langState.current === 'en'}
							onclick={() => langState.setLang('en')}
						>
							EN
						</button>
					</div>
				</div>

				<div class="mobile-theme-row">
					<span class="mobile-lang-label">{#if langState.current === 'ua'}Тема:{:else if langState.current === 'ru'}Тема:{:else}Theme:{/if}</span>
					<div class="theme-segmented-ctrl">
						<button
							type="button"
							class="theme-segment-btn"
							class:active={themeState.current === 'dark'}
							data-testid="mobile-theme-dark-btn"
							aria-pressed={themeState.current === 'dark'}
							onclick={() => themeState.setTheme('dark')}
						>
							<Moon size={14} weight="bold" /> {#if langState.current === 'ua'}Темна{:else if langState.current === 'ru'}Темная{:else}Dark{/if}
						</button>
						<button
							type="button"
							class="theme-segment-btn"
							class:active={themeState.current === 'light'}
							data-testid="mobile-theme-light-btn"
							aria-pressed={themeState.current === 'light'}
							onclick={() => themeState.setTheme('light')}
						>
							<Sun size={14} weight="bold" /> {#if langState.current === 'ua'}Світла{:else if langState.current === 'ru'}Светлая{:else}Light{/if}
						</button>
					</div>
				</div>
			</div>

			<a
				href={resolve('/')}
				class="mobile-nav-link"
				class:active={isActive('/')}
				data-testid="mobile-nav-home-link"
				aria-current={isActive('/') ? 'page' : undefined}
				onclick={onClose}
			>
				<span>{#if langState.current === 'ua'}Головна{:else if langState.current === 'ru'}Главная{:else}Home{/if}</span>
			</a>
			<a
				href={resolve('/services')}
				class="mobile-nav-link"
				class:active={isActive('/services')}
				data-testid="mobile-nav-services-link"
				aria-current={isActive('/services') ? 'page' : undefined}
				onclick={onClose}
			>
				<span>{currentContent.nav.services}</span>
			</a>
			<a
				href={resolve('/b2b')}
				class="mobile-nav-link"
				class:active={isActive('/b2b')}
				data-testid="mobile-nav-b2b-link"
				aria-current={isActive('/b2b') ? 'page' : undefined}
				onclick={onClose}
			>
				<span>{currentContent.nav.b2b}</span>
			</a>
			<a
				href={resolve('/how-we-work')}
				class="mobile-nav-link"
				class:active={isActive('/how-we-work')}
				data-testid="mobile-nav-how-we-work-link"
				aria-current={isActive('/how-we-work') ? 'page' : undefined}
				onclick={onClose}
			>
				<span>{currentContent.nav.howWeWork}</span>
			</a>
			<a
				href={resolve('/calculator')}
				class="mobile-nav-link"
				class:active={isActive('/calculator')}
				data-testid="mobile-nav-calculator-link"
				aria-current={isActive('/calculator') ? 'page' : undefined}
				onclick={onClose}
			>
				<span>{currentContent.nav.calculator}</span>
			</a>
			<a
				href={resolve('/contacts')}
				class="mobile-nav-link"
				class:active={isActive('/contacts')}
				data-testid="mobile-nav-contacts-link"
				aria-current={isActive('/contacts') ? 'page' : undefined}
				onclick={onClose}
			>
				<span>{currentContent.nav.contacts}</span>
			</a>

			<div class="mobile-contacts-box">
				<div class="mobile-phones">
					<div class="mobile-phone-primary-row">
						<a href="tel:{currentContent.phones.mobile}" class="mobile-phone" data-testid="mobile-phone-link">
							<PhoneCall size={18} weight="bold" /> {currentContent.phones.mobileDisplay}
						</a>
						<div class="mobile-msg-badges">
							<a
								href="https://t.me/+380636672653"
								target="_blank"
								rel="noopener noreferrer"
								class="mobile-msg-btn mobile-tg-btn"
								title="Telegram"
								aria-label="Telegram"
							>
								<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
									<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.673c.458 0 .661-.21.916-.457l2.199-2.138 4.574 3.38c.843.464 1.448.225 1.658-.783l2.997-14.127c.307-1.232-.47-1.79-1.207-1.516z"/>
								</svg>
							</a>
							<a
								href="viber://chat?number=%2B380636672653"
								target="_blank"
								rel="noopener noreferrer"
								class="mobile-msg-btn mobile-viber-btn"
								title="Viber"
								aria-label="Viber"
							>
								<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
									<path d="M19.78 3.23C17.65 1.51 14.89.8 11.96.8c-.37 0-.74.02-1.11.05-5.36.46-9.61 4.7-10.07 10.06-.2 2.37.4 4.7 1.7 6.64L.94 21.6c-.34 1.13.72 2.19 1.85 1.85l4.05-1.54c1.64.91 3.5 1.39 5.41 1.39.29 0 .58-.01.87-.04 5.36-.46 9.61-4.7 10.07-10.06.53-6.17-3.41-9.97-3.41-9.97zm-1.84 13.9c-.33.91-1.74 1.72-2.58 1.84-.71.1-1.63.15-4.73-1.14-3.72-1.55-6.15-5.32-6.33-5.57-.19-.25-1.5-2-1.5-3.81 0-1.82.95-2.72 1.29-3.08.34-.37.75-.46 1-.46.25 0 .5.01.71.02.23.01.53-.09.83.63.31.75 1.05 2.58 1.15 2.77.09.19.16.42.03.67-.12.26-.19.42-.37.64-.19.21-.4.47-.57.63-.19.19-.39.4-.17.78.22.37.99 1.63 2.12 2.64 1.45 1.3 2.68 1.7 3.06 1.89.38.18.6-.01.82-.24.23-.23.97-1.13 1.23-1.52.26-.38.52-.32.88-.19.36.13 2.27 1.07 2.66 1.26.39.2.65.29.74.45.1.18.1 1.05-.23 1.96z"/>
								</svg>
							</a>
						</div>
					</div>
					<a href="tel:{currentContent.phones.landline}" class="mobile-phone-sub" data-testid="mobile-landline-link">
						<Phone size={16} weight="bold" /> {currentContent.phones.landlineDisplay}
					</a>
					<a href="mailto:{currentContent.email}" class="mobile-email-link" data-testid="mobile-email-link">
						<EnvelopeSimple size={16} weight="bold" /> {currentContent.email}
					</a>
				</div>
				<div class="mobile-hours">
					<Clock size={15} weight="bold" /> {currentContent.workingHours.hours}
				</div>
				<button
					type="button"
					class="btn btn-primary"
					data-testid="mobile-call-btn"
					style="width: 100%; margin-top: 1rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;"
					onclick={() => {
						onClose();
						orderModal.open();
					}}
				>
					<Lightning size={16} weight="fill" /> {currentContent.nav.callBtn}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Mobile Drawer */
	.mobile-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		z-index: 98;
	}

	:global(html[data-theme="light"]) .mobile-backdrop {
		background: rgba(15, 23, 42, 0.4);
	}

	.mobile-drawer {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: #090909;
		border-bottom: 1px solid var(--color-void-border);
		padding: 1.25rem 1.25rem calc(1.5rem + env(safe-area-inset-bottom, 0));
		animation: slideDown 0.25s ease-out;
		z-index: 99;
		max-height: calc(100vh - 85px);
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	:global(html[data-theme="light"]) .mobile-drawer {
		background: #ffffff;
		border-bottom-color: rgba(15, 23, 42, 0.08);
		box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.1);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.mobile-controls-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--border-subtle);
		flex-wrap: wrap;
	}

	.mobile-theme-row,
	.mobile-lang-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.mobile-lang-label {
		font-size: 0.82rem;
		font-weight: 500;
		color: var(--color-ash-gray);
	}

	:global(html[data-theme="light"]) .mobile-lang-label {
		color: #64748b;
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
		color: var(--color-saffron-spark);
		font-weight: 700;
	}

	.lang-divider {
		color: rgba(255, 255, 255, 0.2);
		font-size: 0.7rem;
	}

	/* Theme Segmented Control */
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
		background: var(--color-electric-iris);
		color: #ffffff;
		box-shadow: 0 1px 4px rgba(128, 82, 255, 0.4);
	}

	:global(html[data-theme="light"]) .theme-segment-btn {
		color: #64748b;
	}

	:global(html[data-theme="light"]) .theme-segment-btn:hover {
		color: #0f172a;
	}

	:global(html[data-theme="light"]) .theme-segment-btn.active {
		background: var(--color-electric-iris);
		color: #ffffff;
		box-shadow: 0 1px 4px rgba(109, 62, 247, 0.3);
	}

	.mobile-nav-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.95rem;
		font-weight: 400;
		color: var(--color-silver-mist);
		padding: 0.65rem 0.75rem;
		border-radius: var(--radius-small);
		text-decoration: none;
		transition: background var(--transition-fast), color var(--transition-fast);
	}

	:global(html[data-theme="light"]) .mobile-nav-link {
		color: #334155;
	}

	.mobile-nav-link:hover,
	.mobile-nav-link.active {
		background: #141414;
		color: var(--color-bone-white);
	}

	:global(html[data-theme="light"]) .mobile-nav-link:hover,
	:global(html[data-theme="light"]) .mobile-nav-link.active {
		background: #f1f5f9;
		color: #0f172a;
	}

	.mobile-contacts-box {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-void-border);
	}

	:global(html[data-theme="light"]) .mobile-contacts-box {
		border-top-color: rgba(15, 23, 42, 0.08);
	}

	.mobile-phones {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.mobile-phone-primary-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.mobile-msg-badges {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.mobile-msg-btn {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		text-decoration: none;
		transition: transform var(--transition-fast);
	}

	.mobile-msg-btn:hover {
		transform: scale(1.1);
	}

	.mobile-tg-btn {
		background: #229ED9;
	}

	.mobile-viber-btn {
		background: #7360f2;
	}

	.mobile-phone {
		font-weight: 500;
		color: var(--color-bone-white);
		font-size: 1.1rem;
		text-decoration: none;
	}

	:global(html[data-theme="light"]) .mobile-phone {
		color: #0f172a;
	}

	.mobile-phone-sub {
		color: var(--color-ash-gray);
		font-size: 0.92rem;
		text-decoration: none;
	}

	:global(html[data-theme="light"]) .mobile-phone-sub {
		color: #64748b;
	}

	.mobile-email-link {
		color: #38bdf8;
		font-size: 0.9rem;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.2rem;
	}

	:global(html[data-theme="light"]) .mobile-email-link {
		color: #0284c7;
	}

	.mobile-hours {
		margin-top: 0.6rem;
		font-size: 0.82rem;
		color: var(--color-ash-gray);
	}

	:global(html[data-theme="light"]) .mobile-hours {
		color: #64748b;
	}
</style>
