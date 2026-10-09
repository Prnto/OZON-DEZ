<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';
	import { langState } from '../state/language.svelte';
	import { themeState } from '../state/theme.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';
	import { page } from '$app/state';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	let currentContent = $derived(contentMap[langState.current]);
	let currentPath = $derived(page.url.pathname);

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

	function handleScroll() {
		isScrolled = window.scrollY > 20;
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
</script>

<svelte:window onscroll={handleScroll} />

<header class="header-wrapper" class:scrolled={isScrolled}>
	<!-- Top Utility Bar: Address, Hours, Phones, Theme Switcher, Language -->
	<div class="top-bar">
		<div class="top-bar-container">
			<div class="top-bar-left">
				<span class="top-info-item">
					<span class="top-icon">📍</span>
					<span class="top-text">{currentContent.address.city}</span>
				</span>
				<span class="top-bar-divider">|</span>
				<span class="top-info-item">
					<span class="top-icon">🕒</span>
					<span class="top-text">{currentContent.workingHours.days}: {currentContent.workingHours.hours}</span>
				</span>
			</div>

			<div class="top-bar-right">
				<!-- Landline -->
				<a href="tel:{currentContent.phones.landline}" class="top-phone-link">
					<span class="top-icon">☎️</span>
					<span>{currentContent.phones.landlineDisplay}</span>
				</a>
				<span class="top-bar-divider">|</span>
				<!-- Mobile -->
				<a href="tel:{currentContent.phones.mobile}" class="top-phone-link highlight">
					<span class="phone-pulse-dot"></span>
					<span>{currentContent.phones.mobileDisplay}</span>
				</a>
				<span class="top-bar-divider">|</span>

				<!-- Explicit Dual Theme Switcher (Dark / Light) -->
				<div class="theme-segmented-ctrl" role="group" aria-label="Тема сайту">
					<button
						type="button"
						class="theme-segment-btn"
						class:active={themeState.current === 'dark'}
						onclick={() => themeState.setTheme('dark')}
						title="Темна тема"
					>
						<span class="theme-icon">🌙</span>
						<span class="theme-label">{#if langState.current === 'ua'}Темна{:else if langState.current === 'ru'}Темная{:else}Dark{/if}</span>
					</button>
					<button
						type="button"
						class="theme-segment-btn"
						class:active={themeState.current === 'light'}
						onclick={() => themeState.setTheme('light')}
						title="Світла тема"
					>
						<span class="theme-icon">☀️</span>
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
		</div>
	</div>

	<!-- Main Navigation Bar -->
	<div class="main-bar">
		<div class="main-bar-container">
			<!-- Row 1: Brand Logo & Actions -->
			<div class="main-bar-top-row">
				<div class="logo-box">
					<Logo variant={themeState.current === 'dark' ? 'light' : 'dark'} />
				</div>

				<div class="main-bar-actions">
					<!-- Prominent Phone link with live pulse dot -->
					<a
						href="tel:{currentContent.phones.mobile}"
						class="header-phone-badge"
						title={langState.current === 'ua' ? 'Виклик спеціаліста' : langState.current === 'ru' ? 'Вызов специалиста' : 'Call a specialist'}
					>
						<span class="phone-pulse-dot"></span>
						<span class="phone-num-txt">{currentContent.phones.mobileDisplay}</span>
					</a>

					<!-- Order CTA button -->
					<button
						type="button"
						class="btn btn-primary btn-sm main-cta-btn"
						onclick={() => orderModal.open({ serviceTitle: currentContent.nav.callBtn })}
					>
						<span class="cta-full-label">⚡ {currentContent.nav.callBtn}</span>
						<span class="cta-short-label">⚡ {#if langState.current === 'ua'}Виклик{:else if langState.current === 'ru'}Вызов{:else}Call{/if}</span>
					</button>

					<!-- Hamburger Toggle for Mobile Quick Call & Info -->
					<button
						type="button"
						class="burger-btn"
						class:open={isMobileMenuOpen}
						onclick={toggleMobileMenu}
						aria-label="Меню контактів"
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
			</div>

			<!-- Row 2: Dedicated Navigation Tapbar spanning full width -->
			<nav class="top-tapbar" aria-label="Головна навігація">
				<a href={resolve('/')} class="tapbar-btn" class:active={isActive('/')}>
					<span class="tap-icon">🏠</span>
					<span class="tap-label">{#if langState.current === 'ua'}Головна{:else if langState.current === 'ru'}Главная{:else}Home{/if}</span>
				</a>
				<a href={resolve('/services')} class="tapbar-btn" class:active={isActive('/services')}>
					<span class="tap-icon">🧹</span>
					<span class="tap-label">{currentContent.nav.services}</span>
				</a>
				<a href={resolve('/b2b')} class="tapbar-btn" class:active={isActive('/b2b')}>
					<span class="tap-icon">🏢</span>
					<span class="tap-label">{currentContent.nav.b2b}</span>
				</a>
				<a href={resolve('/how-we-work')} class="tapbar-btn" class:active={isActive('/how-we-work')}>
					<span class="tap-icon">⚙️</span>
					<span class="tap-label">{currentContent.nav.howWeWork}</span>
				</a>
				<a href={resolve('/calculator')} class="tapbar-btn" class:active={isActive('/calculator')}>
					<span class="tap-icon">🧮</span>
					<span class="tap-label">{currentContent.nav.calculator}</span>
				</a>
				<a href={resolve('/contacts')} class="tapbar-btn" class:active={isActive('/contacts')}>
					<span class="tap-icon">📍</span>
					<span class="tap-label">{currentContent.nav.contacts}</span>
				</a>
			</nav>
		</div>
	</div>

	<!-- Mobile Drawer Menu & Backdrop -->
	{#if isMobileMenuOpen}
		<div class="mobile-backdrop" onclick={closeMobileMenu} role="presentation"></div>
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

				<a href={resolve('/')} class="mobile-nav-link" class:active={isActive('/')} onclick={closeMobileMenu}>
					<span class="m-icon">🏠</span>
					<span>{#if langState.current === 'ua'}Головна{:else if langState.current === 'ru'}Главная{:else}Home{/if}</span>
				</a>
				<a href={resolve('/services')} class="mobile-nav-link" class:active={isActive('/services')} onclick={closeMobileMenu}>
					<span class="m-icon">🧹</span>
					<span>{currentContent.nav.services}</span>
				</a>
				<a href={resolve('/b2b')} class="mobile-nav-link" class:active={isActive('/b2b')} onclick={closeMobileMenu}>
					<span class="m-icon">🏢</span>
					<span>{currentContent.nav.b2b}</span>
				</a>
				<a href={resolve('/how-we-work')} class="mobile-nav-link" class:active={isActive('/how-we-work')} onclick={closeMobileMenu}>
					<span class="m-icon">⚙️</span>
					<span>{currentContent.nav.howWeWork}</span>
				</a>
				<a href={resolve('/calculator')} class="mobile-nav-link" class:active={isActive('/calculator')} onclick={closeMobileMenu}>
					<span class="m-icon">🧮</span>
					<span>{currentContent.nav.calculator}</span>
				</a>
				<a href={resolve('/contacts')} class="mobile-nav-link" class:active={isActive('/contacts')} onclick={closeMobileMenu}>
					<span class="m-icon">📍</span>
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
							closeMobileMenu();
							orderModal.open();
						}}
					>
						⚡ {currentContent.nav.callBtn}
					</button>
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
	.header-wrapper {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.95);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--color-void-border);
		transition: background var(--transition-norm), border-color var(--transition-norm);
		padding-top: env(safe-area-inset-top, 0);
	}

	:global(html[data-theme="light"]) .header-wrapper {
		background: rgba(255, 255, 255, 0.94);
		border-bottom-color: rgba(15, 23, 42, 0.08);
		box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.06);
	}

	.header-wrapper.scrolled {
		border-bottom-color: rgba(255, 255, 255, 0.14);
	}

	:global(html[data-theme="light"]) .header-wrapper.scrolled {
		border-bottom-color: rgba(15, 23, 42, 0.12);
	}

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
		.top-phone-link {
			font-size: 0.72rem;
			gap: 0.2rem;
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

	.top-phone-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--color-silver-mist);
		font-weight: 500;
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.top-phone-link:hover {
		color: var(--color-bone-white);
	}

	.top-phone-link.highlight {
		color: var(--color-bone-white);
		font-weight: 600;
	}

	:global(html[data-theme="light"]) .top-phone-link {
		color: #334155;
	}

	:global(html[data-theme="light"]) .top-phone-link:hover,
	:global(html[data-theme="light"]) .top-phone-link.highlight {
		color: #0f172a;
	}

	.phone-pulse-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: var(--color-electric-iris);
		box-shadow: 0 0 0 0 rgba(128, 82, 255, 0.7);
		animation: pulseDot 2s infinite;
		flex-shrink: 0;
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
		color: var(--color-saffron-spark);
		font-weight: 700;
	}

	.lang-divider {
		color: rgba(255, 255, 255, 0.2);
		font-size: 0.7rem;
	}

	:global(html[data-theme="light"]) .lang-divider {
		color: rgba(15, 23, 42, 0.2);
	}

	/* Main Navigation Bar */
	.main-bar {
		background: transparent;
	}

	.main-bar-container {
		max-width: var(--container-width);
		margin: 0 auto;
		padding: 0.65rem clamp(0.75rem, 2vw, 1.5rem) 0.55rem;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		position: relative;
	}

	.main-bar-top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
	}

	.logo-box {
		flex-shrink: 0;
		z-index: 5;
	}

	.header-phone-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.95rem;
		border-radius: var(--radius-buttons);
		background: rgba(128, 82, 255, 0.08);
		border: 1px solid var(--color-iris-border);
		color: var(--color-bone-white);
		font-weight: 600;
		font-size: 13px;
		text-decoration: none;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.header-phone-badge:hover {
		background: rgba(128, 82, 255, 0.16);
		border-color: rgba(128, 82, 255, 0.45);
		color: #ffffff;
		transform: translateY(-1px);
	}

	:global(html[data-theme="light"]) .header-phone-badge {
		background: #ffffff;
		border-color: rgba(99, 66, 232, 0.22);
		color: #1e293b;
		box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
	}

	:global(html[data-theme="light"]) .header-phone-badge:hover {
		background: #f1f5f9;
		border-color: rgba(99, 66, 232, 0.4);
		color: #0f172a;
	}

	@media (max-width: 640px) {
		.header-phone-badge {
			display: none;
		}
	}

	/* Top Tapbar: Full Width Row, Never Overlaps Logo */
	.top-tapbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.35rem;
		width: 100%;
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
		-webkit-overflow-scrolling: touch;
		padding: 0.3rem 0.45rem;
		border-radius: var(--radius-buttons);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--color-void-border);
	}

	.top-tapbar::-webkit-scrollbar {
		display: none;
	}

	:global(html[data-theme="light"]) .top-tapbar {
		background: #ffffff;
		border-color: rgba(15, 23, 42, 0.08);
		box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
	}

	.tapbar-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		padding: 0.45rem clamp(0.45rem, 0.75vw, 0.85rem);
		border-radius: var(--radius-buttons);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 0.015em;
		color: var(--color-silver-mist);
		white-space: nowrap;
		flex: 1 0 auto;
		text-decoration: none;
		transition: all var(--transition-fast);
		border: 1px solid transparent;
		background: transparent;
	}

	.tap-icon {
		font-size: 14px;
		line-height: 1;
		flex-shrink: 0;
	}

	.tapbar-btn:hover {
		color: var(--color-bone-white);
		background: rgba(255, 255, 255, 0.08);
		transform: translateY(-1px);
	}

	:global(html[data-theme="light"]) .tapbar-btn {
		color: #475569;
	}

	:global(html[data-theme="light"]) .tapbar-btn:hover {
		color: #1e293b;
		background: #f1f5f9;
	}

	.tapbar-btn.active {
		background: var(--color-electric-iris);
		color: #ffffff;
		font-weight: 600;
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 2px 8px rgba(128, 82, 255, 0.35);
	}

	:global(html[data-theme="light"]) .tapbar-btn.active {
		background: var(--color-electric-iris);
		color: #ffffff;
		border-color: var(--color-electric-iris);
		box-shadow: 0 2px 8px rgba(99, 66, 232, 0.28);
	}

	.main-bar-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-shrink: 0;
		z-index: 5;
	}

	.main-cta-btn {
		white-space: nowrap;
		padding: 0.6rem clamp(0.9rem, 1.2vw, 1.4rem);
		font-size: 13px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.025em;
		border-radius: var(--radius-buttons);
		background: var(--color-electric-iris);
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.main-cta-btn:hover {
		background: #9569ff;
		color: #ffffff;
	}

	.cta-short-label {
		display: none;
	}

	@media (max-width: 1200px) {
		.cta-full-label {
			display: none;
		}
		.cta-short-label {
			display: inline;
		}
	}

	@media (max-width: 520px) {
		.main-cta-btn {
			display: none;
		}
	}

	/* Hamburger Button for Mobile Drawer */
	.burger-btn {
		display: none;
		flex-direction: column;
		justify-content: space-around;
		width: 38px;
		height: 38px;
		background: #0d0d0d;
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-buttons);
		cursor: pointer;
		padding: 8px;
		transition: background var(--transition-fast);
		touch-action: manipulation;
	}

	:global(html[data-theme="light"]) .burger-btn {
		background: #ffffff;
		border-color: rgba(15, 23, 42, 0.12);
	}

	.burger-btn:hover {
		background: #171717;
		border-color: rgba(255, 255, 255, 0.2);
	}

	:global(html[data-theme="light"]) .burger-btn:hover {
		background: #f1f5f9;
		border-color: rgba(15, 23, 42, 0.25);
	}

	.burger-btn span {
		width: 100%;
		height: 2px;
		background-color: var(--color-bone-white);
		border-radius: 2px;
		transition: all 0.3s ease;
	}

	:global(html[data-theme="light"]) .burger-btn span {
		background-color: #0f172a;
	}

	.burger-btn.open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.burger-btn.open span:nth-child(2) {
		opacity: 0;
	}

	.burger-btn.open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

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

	.m-icon {
		font-size: 1.15rem;
		width: 24px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
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
