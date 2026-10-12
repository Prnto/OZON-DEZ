<script lang="ts">
	import { resolve } from '$app/paths';
	import { PhoneCall } from 'phosphor-svelte';
	import Logo from './Logo.svelte';
	import HeaderTopBar from './HeaderTopBar.svelte';
	import MobileDrawer from './MobileDrawer.svelte';
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
	<!-- Top Utility Bar Component -->
	<HeaderTopBar />

	<!-- Main Navigation Bar -->
	<div class="main-bar">
		<div class="main-bar-container">
			<!-- Row 1: Brand Logo & Actions -->
			<div class="main-bar-top-row">
				<div class="logo-box">
					<Logo variant={themeState.current === 'dark' ? 'light' : 'dark'} showTagline={false} />
					<div class="header-spec-tagline" aria-label="Спеціалізація та послуги">
						<a
							href="{resolve('/services')}#disinsection"
							class="spec-link"
							title="{langState.current === 'ua' ? 'Дезінсекція — переглянути опис' : langState.current === 'ru' ? 'Дезинсекция — смотреть описание' : 'Disinsection — view service'}"
						>
							{#if langState.current === 'ua'}
								Дезінсекція
							{:else if langState.current === 'ru'}
								Дезинсекция
							{:else}
								Disinsection
							{/if}
						</a>
						<span class="spec-dot" aria-hidden="true">•</span>
						<a
							href="{resolve('/services')}#deratization"
							class="spec-link"
							title="{langState.current === 'ua' ? 'Дератизація — переглянути опис' : langState.current === 'ru' ? 'Дератизация — смотреть описание' : 'Deratization — view service'}"
						>
							{#if langState.current === 'ua'}
								Дератизація
							{:else if langState.current === 'ru'}
								Дератизация
							{:else}
								Deratization
							{/if}
						</a>
						<span class="spec-dot" aria-hidden="true">•</span>
						<a
							href="{resolve('/services')}#disinfection"
							class="spec-link"
							title="{langState.current === 'ua' ? 'Дезінфекція — переглянути опис' : langState.current === 'ru' ? 'Дезинфекция — смотреть описание' : 'Disinfection — view service'}"
						>
							{#if langState.current === 'ua'}
								Дезінфекція
							{:else if langState.current === 'ru'}
								Дезинфекция
							{:else}
								Disinfection
							{/if}
						</a>
						<span class="spec-dot" aria-hidden="true">•</span>
						<a
							href="{resolve('/services')}#ozonation"
							class="spec-link"
							title="{langState.current === 'ua' ? 'Озонування — переглянути опис' : langState.current === 'ru' ? 'Озонирование — смотреть описание' : 'Ozonation — view service'}"
						>
							{#if langState.current === 'ua'}
								Озонування
							{:else if langState.current === 'ru'}
								Озонирование
							{:else}
								Ozonation
							{/if}
						</a>
					</div>
				</div>

				<div class="main-bar-actions">
					<!-- Order CTA button -->
					<button
						type="button"
						class="btn btn-primary btn-sm main-cta-btn"
						onclick={() => orderModal.open({ serviceTitle: currentContent.nav.callBtn })}
						data-testid="header-call-btn"
					>
						<span class="cta-full-label"><PhoneCall size={14} weight="bold" /> {currentContent.nav.callBtn}</span>
						<span class="cta-short-label"><PhoneCall size={14} weight="bold" /> {#if langState.current === 'ua'}Дзвінок{:else if langState.current === 'ru'}Звонок{:else}Call{/if}</span>
					</button>

					<!-- Hamburger Toggle for Mobile Quick Call & Info -->
					<button
						type="button"
						class="burger-btn"
						class:open={isMobileMenuOpen}
						aria-expanded={isMobileMenuOpen}
						onclick={toggleMobileMenu}
						aria-label="Меню контактів"
						data-testid="header-mobile-menu-btn"
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
			</div>

			<!-- Row 2: Dedicated Navigation Tapbar spanning full width -->
			<nav class="top-tapbar" aria-label="Головна навігація">
				<a href={resolve('/')} class="tapbar-btn" class:active={isActive('/')} aria-current={isActive('/') ? 'page' : undefined} data-testid="nav-home-link">
					<span class="tap-label">{#if langState.current === 'ua'}Головна{:else if langState.current === 'ru'}Главная{:else}Home{/if}</span>
				</a>
				<a href={resolve('/services')} class="tapbar-btn" class:active={isActive('/services')} aria-current={isActive('/services') ? 'page' : undefined} data-testid="nav-services-link">
					<span class="tap-label">{currentContent.nav.services}</span>
				</a>
				<a href={resolve('/b2b')} class="tapbar-btn" class:active={isActive('/b2b')} aria-current={isActive('/b2b') ? 'page' : undefined} data-testid="nav-b2b-link">
					<span class="tap-label">{currentContent.nav.b2b}</span>
				</a>
				<a href={resolve('/how-we-work')} class="tapbar-btn" class:active={isActive('/how-we-work')} aria-current={isActive('/how-we-work') ? 'page' : undefined} data-testid="nav-how-we-work-link">
					<span class="tap-label">{currentContent.nav.howWeWork}</span>
				</a>
				<a href={resolve('/calculator')} class="tapbar-btn" class:active={isActive('/calculator')} aria-current={isActive('/calculator') ? 'page' : undefined} data-testid="nav-calculator-link">
					<span class="tap-label">{currentContent.nav.calculator}</span>
				</a>
				<a href={resolve('/contacts')} class="tapbar-btn" class:active={isActive('/contacts')} aria-current={isActive('/contacts') ? 'page' : undefined} data-testid="nav-contacts-link">
					<span class="tap-label">{currentContent.nav.contacts}</span>
				</a>
			</nav>
		</div>
	</div>

	<!-- Mobile Drawer Menu Component -->
	<MobileDrawer
		isOpen={isMobileMenuOpen}
		onClose={closeMobileMenu}
		{currentPath}
	/>
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

	:global(html[data-theme="light"]) .header-wrapper,
	:global(html.theme-light) .header-wrapper,
	:global(body[data-theme="light"]) .header-wrapper,
	:global([data-theme="light"]) .header-wrapper {
		background: rgba(247, 247, 245, 0.96) !important;
		border-bottom-color: #c9cbbe !important;
		box-shadow: none !important;
	}

	.header-wrapper.scrolled {
		border-bottom-color: rgba(255, 255, 255, 0.14);
	}

	:global(html[data-theme="light"]) .header-wrapper.scrolled,
	:global(html.theme-light) .header-wrapper.scrolled,
	:global(body[data-theme="light"]) .header-wrapper.scrolled,
	:global([data-theme="light"]) .header-wrapper.scrolled {
		border-bottom-color: #c9cbbe !important;
	}

	/* Main Navigation Bar */
	.main-bar {
		padding: 0.65rem 0 0.5rem;
	}

	.main-bar-container {
		max-width: var(--container-width);
		margin: 0 auto;
		padding: 0 clamp(0.75rem, 2vw, 1.5rem);
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.main-bar-top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.logo-box {
		display: flex;
		align-items: center;
		gap: clamp(0.75rem, 1.6vw, 1.5rem);
	}

	.header-spec-tagline {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.45rem 1.25rem;
		border-radius: var(--radius-full);
		background: rgba(11, 15, 25, 0.7);
		border: 1px solid rgba(0, 230, 64, 0.32);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35), 0 0 14px rgba(0, 230, 64, 0.12);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		user-select: none;
		white-space: nowrap;
		transition: all var(--transition-fast);
	}

	.header-spec-tagline:hover {
		border-color: rgba(0, 230, 64, 0.6);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 230, 64, 0.22);
	}

	:global(html[data-theme="light"]) .header-spec-tagline,
	:global(html.theme-light) .header-spec-tagline,
	:global(body[data-theme="light"]) .header-spec-tagline,
	:global([data-theme="light"]) .header-spec-tagline {
		background: #ffffff !important;
		border: 1px solid rgba(0, 143, 69, 0.35) !important;
		box-shadow: 0 2px 10px rgba(0, 143, 69, 0.1) !important;
	}

	:global(html[data-theme="light"]) .header-spec-tagline:hover {
		border-color: #008F45 !important;
		box-shadow: 0 4px 16px rgba(0, 143, 69, 0.18) !important;
	}

	.spec-link {
		font-size: clamp(0.92rem, 1.15vw, 1.05rem);
		font-weight: 700;
		color: #ffffff;
		text-decoration: none;
		letter-spacing: -0.01em;
		padding: 0.1rem 0.25rem;
		border-radius: 4px;
		transition: color var(--transition-fast), transform var(--transition-fast);
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
		cursor: pointer;
	}

	.spec-link:hover {
		color: #00E640;
		transform: translateY(-1px);
	}

	:global(html[data-theme="light"]) .spec-link {
		color: #1e293b !important;
	}

	:global(html[data-theme="light"]) .spec-link:hover {
		color: #008F45 !important;
	}

	.spec-dot {
		color: #00E640;
		font-weight: 900;
		font-size: 0.95rem;
		line-height: 1;
		user-select: none;
		text-shadow: 0 0 8px rgba(0, 230, 64, 0.6);
	}

	:global(html[data-theme="light"]) .spec-dot,
	:global(html.theme-light) .spec-dot,
	:global(body[data-theme="light"]) .spec-dot,
	:global([data-theme="light"]) .spec-dot {
		color: #008F45 !important;
		text-shadow: none !important;
	}

	@media (max-width: 860px) and (min-width: 641px) {
		.header-spec-tagline {
			font-size: 0.82rem;
			padding: 0.35rem 0.85rem;
			gap: 0.45rem;
		}
		.spec-link {
			font-size: 0.85rem;
		}
		.spec-dot {
			font-size: 0.8rem;
		}
	}

	@media (max-width: 640px) {
		.logo-box {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.18rem;
		}
		.header-spec-tagline {
			padding: 0;
			background: transparent !important;
			border: none !important;
			box-shadow: none !important;
			backdrop-filter: none !important;
			-webkit-backdrop-filter: none !important;
			gap: 0.35rem;
		}
		.spec-link {
			font-size: 0.72rem;
			font-weight: 700;
			color: #cbd5e1;
		}
		:global(html[data-theme="light"]) .spec-link {
			color: #475569 !important;
		}
		.spec-dot {
			font-size: 0.65rem;
		}
	}

	.main-bar-actions {
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.main-cta-btn {
		font-weight: 700;
		font-size: 0.82rem;
		padding: 0.45rem 1.15rem;
		white-space: nowrap;
		background: transparent;
		border: 1.5px solid #008F45;
		color: #ffffff;
		border-radius: var(--radius-buttons);
		transition: all 0.2s cubic-bezier(0.2, 0.9, 0.3, 1);
		box-shadow: none;
	}

	.main-cta-btn:hover {
		background: rgba(0, 230, 64, 0.08);
		border-color: #00E640;
		color: #ffffff;
		box-shadow: 0 0 16px rgba(0, 230, 64, 0.55), 0 0 6px rgba(0, 230, 64, 0.35);
		transform: translateY(-1px);
	}

	.main-cta-btn:active {
		background: rgba(0, 230, 64, 0.16);
		border-color: #00E640;
		color: #ffffff;
		box-shadow: 0 0 20px rgba(0, 230, 64, 0.7);
		transform: translateY(0);
	}

	:global(html[data-theme="light"]) .main-cta-btn,
	:global(html.theme-light) .main-cta-btn,
	:global(body[data-theme="light"]) .main-cta-btn,
	:global([data-theme="light"]) .main-cta-btn {
		background: #cef79e !important;
		color: #151f20 !important;
		border: 1.5px solid #b8eb83 !important;
		font-weight: 700;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06) !important;
	}

	:global(html[data-theme="light"]) .main-cta-btn:hover,
	:global(html.theme-light) .main-cta-btn:hover,
	:global(body[data-theme="light"]) .main-cta-btn:hover,
	:global([data-theme="light"]) .main-cta-btn:hover {
		background: #b8eb83 !important;
		border-color: #8ec94b !important;
		color: #151f20 !important;
		box-shadow: 0 6px 18px rgba(184, 235, 131, 0.45) !important;
		transform: translateY(-1px);
	}

	.cta-short-label {
		display: none;
	}

	@media (max-width: 480px) {
		.cta-full-label {
			display: none;
		}
		.cta-short-label {
			display: inline;
		}
		.main-cta-btn {
			padding: 0.4rem 0.75rem;
			font-size: 0.78rem;
		}
	}

	/* Dedicated Full-Width Horizontal Tapbar */
	.top-tapbar {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		overflow-x: auto;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
		padding: 0.2rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		margin-top: 0.15rem;
	}

	:global(html[data-theme="light"]) .top-tapbar {
		border-top-color: #c9cbbe;
	}

	.top-tapbar::-webkit-scrollbar {
		display: none;
	}

	.tapbar-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.85rem;
		border-radius: var(--radius-full);
		color: var(--color-silver-mist);
		text-decoration: none;
		font-size: 0.82rem;
		font-weight: 500;
		white-space: nowrap;
		transition: all var(--transition-fast);
		background: transparent;
		border: 1px solid transparent;
		flex-shrink: 0;
	}

	:global(html[data-theme="light"]) .tapbar-btn {
		color: #4d5757;
	}

	.tapbar-btn:hover {
		color: #ffffff;
		background: transparent;
		border-color: rgba(118, 206, 154, 0.65);
		box-shadow: 0 0 10px rgba(90, 180, 126, 0.2);
	}

	:global(html[data-theme="light"]) .tapbar-btn:hover {
		color: #151f20;
		background: transparent;
		border-color: #8ec94b;
	}

	.tapbar-btn.active {
		color: #ffffff;
		background: rgba(72, 160, 110, 0.24);
		border-color: rgba(118, 206, 154, 0.65);
		box-shadow: 0 2px 12px rgba(90, 180, 126, 0.22);
		font-weight: 600;
	}

	.tapbar-btn:active {
		color: #ffffff;
		background: rgba(72, 160, 110, 0.34);
		border-color: rgba(118, 206, 154, 0.8);
	}

	:global(html[data-theme="light"]) .tapbar-btn.active,
	:global(html.theme-light) .tapbar-btn.active,
	:global(body[data-theme="light"]) .tapbar-btn.active,
	:global(body.theme-light) .tapbar-btn.active,
	:global([data-theme="light"]) .tapbar-btn.active {
		color: #222f30 !important;
		background: #cef79e !important;
		border-color: #b8eb83 !important;
		box-shadow: 0 0 12px rgba(184, 235, 131, 0.4) !important;
		font-weight: 600;
	}

	:global(html[data-theme="light"]) .tapbar-btn:active,
	:global(html.theme-light) .tapbar-btn:active,
	:global(body[data-theme="light"]) .tapbar-btn:active,
	:global(body.theme-light) .tapbar-btn:active,
	:global([data-theme="light"]) .tapbar-btn:active {
		color: #222f30 !important;
		background: #b8eb83 !important;
		border-color: #8ec94b !important;
	}

	/* Hamburger Button */
	.burger-btn {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 38px;
		height: 38px;
		background: #0d0d0d;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		cursor: pointer;
		padding: 8px;
		transition: background var(--transition-fast);
		touch-action: manipulation;
	}

	:global(html[data-theme="light"]) .burger-btn {
		background: #ffffff;
		border-color: #c9cbbe;
	}

	.burger-btn:hover {
		background: #171717;
		border-color: rgba(255, 255, 255, 0.2);
	}

	:global(html[data-theme="light"]) .burger-btn:hover {
		background: #e7e8e1;
		border-color: #222f30;
	}

	.burger-btn span {
		width: 100%;
		height: 2px;
		background-color: var(--color-bone-white);
		border-radius: 2px;
		transition: all 0.3s ease;
	}

	:global(html[data-theme="light"]) .burger-btn span {
		background-color: #222f30;
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
</style>
