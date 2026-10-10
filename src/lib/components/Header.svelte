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
					<Logo variant={themeState.current === 'dark' ? 'light' : 'dark'} />
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
		border-top-color: rgba(15, 23, 42, 0.06);
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
		color: #475569;
	}

	.tapbar-btn:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.1);
	}

	:global(html[data-theme="light"]) .tapbar-btn:hover {
		color: #0f172a;
		background: #f1f5f9;
		border-color: rgba(15, 23, 42, 0.1);
	}

	.tapbar-btn.active {
		color: #ffffff;
		background: rgba(2, 132, 199, 0.16);
		border-color: var(--color-electric-iris);
		font-weight: 600;
	}

	:global(html[data-theme="light"]) .tapbar-btn.active {
		color: var(--color-electric-iris);
		background: rgba(2, 132, 199, 0.1);
		border-color: var(--color-electric-iris);
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
</style>
