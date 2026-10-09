<script lang="ts">
	import { resolve } from '$app/paths';
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
	<div class="mobile-drawer">
		<div class="mobile-nav">
			<div class="mobile-controls-row">
				<div class="mobile-lang-row">
					<span class="mobile-lang-label">{#if langState.current === 'ua'}Мова:{:else if langState.current === 'ru'}Язык:{:else}Lang:{/if}</span>
					<div class="lang-segmented-ctrl">
						<button
							type="button"
							class="lang-segment-btn"
							class:active={langState.current === 'ua'}
							onclick={() => langState.setLang('ua')}
						>
							UA
						</button>
						<span class="lang-divider">/</span>
						<button
							type="button"
							class="lang-segment-btn"
							class:active={langState.current === 'ru'}
							onclick={() => langState.setLang('ru')}
						>
							RU
						</button>
						<span class="lang-divider">/</span>
						<button
							type="button"
							class="lang-segment-btn"
							class:active={langState.current === 'en'}
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
							onclick={() => themeState.setTheme('dark')}
						>
							🌙 {#if langState.current === 'ua'}Темна{:else if langState.current === 'ru'}Темная{:else}Dark{/if}
						</button>
						<button
							type="button"
							class="theme-segment-btn"
							class:active={themeState.current === 'light'}
							onclick={() => themeState.setTheme('light')}
						>
							☀️ {#if langState.current === 'ua'}Світла{:else if langState.current === 'ru'}Светлая{:else}Light{/if}
						</button>
					</div>
				</div>
			</div>

			<a href={resolve('/')} class="mobile-nav-link" class:active={isActive('/')} onclick={onClose}>
				<span>{#if langState.current === 'ua'}Головна{:else if langState.current === 'ru'}Главная{:else}Home{/if}</span>
			</a>
			<a href={resolve('/services')} class="mobile-nav-link" class:active={isActive('/services')} onclick={onClose}>
				<span>{currentContent.nav.services}</span>
			</a>
			<a href={resolve('/b2b')} class="mobile-nav-link" class:active={isActive('/b2b')} onclick={onClose}>
				<span>{currentContent.nav.b2b}</span>
			</a>
			<a href={resolve('/how-we-work')} class="mobile-nav-link" class:active={isActive('/how-we-work')} onclick={onClose}>
				<span>{currentContent.nav.howWeWork}</span>
			</a>
			<a href={resolve('/calculator')} class="mobile-nav-link" class:active={isActive('/calculator')} onclick={onClose}>
				<span>{currentContent.nav.calculator}</span>
			</a>
			<a href={resolve('/contacts')} class="mobile-nav-link" class:active={isActive('/contacts')} onclick={onClose}>
				<span>{currentContent.nav.contacts}</span>
			</a>

			<div class="mobile-contacts-box">
				<div class="mobile-phones">
					<a href="tel:{currentContent.phones.mobile}" class="mobile-phone">
						📞 {currentContent.phones.mobileDisplay}
					</a>
					<a href="tel:{currentContent.phones.landline}" class="mobile-phone-sub">
						☎️ {currentContent.phones.landlineDisplay}
					</a>
				</div>
				<div class="mobile-hours">
					🕒 {currentContent.workingHours.days}: {currentContent.workingHours.hours}
				</div>
				<button
					type="button"
					class="btn btn-primary"
					style="width: 100%; margin-top: 1rem;"
					onclick={() => {
						onClose();
						orderModal.open();
					}}
				>
					⚡ {currentContent.nav.callBtn}
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

	.mobile-hours {
		margin-top: 0.6rem;
		font-size: 0.82rem;
		color: var(--color-ash-gray);
	}

	:global(html[data-theme="light"]) .mobile-hours {
		color: #64748b;
	}
</style>
