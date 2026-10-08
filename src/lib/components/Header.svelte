<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';
	import { page } from '$app/state';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	let currentContent = $derived(contentMap[langState.current]);
	let currentPath = $derived(page.url.pathname);

	function isActive(route: string) {
		if (route === '/') {
			return currentPath === '/' || currentPath === '' || currentPath.endsWith('/OZON-DEZ/') || currentPath.endsWith('/OZON-DEZ');
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
	<!-- Top Utility Bar: Address, Hours, Phones, Language -->
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
				<!-- Language Switcher -->
				<button
					type="button"
					class="lang-toggle-btn"
					onclick={() => langState.toggle()}
					title="Переключити мову / Переключить язык"
				>
					<span class="lang-opt" class:active={langState.current === 'ua'}>UA</span>
					<span class="lang-divider">/</span>
					<span class="lang-opt" class:active={langState.current === 'ru'}>RU</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Main Navigation Bar -->
	<div class="main-bar">
		<div class="main-bar-container">
			<div class="logo-box">
				<Logo variant="light" />
			</div>

			<!-- Desktop Navigation Links to Separate Pages -->
			<nav class="nav-links">
				<a href={resolve('/services')} class="nav-link" class:active={isActive('/services')}>
					{currentContent.nav.services}
				</a>
				<a href={resolve('/ozone')} class="nav-link" class:active={isActive('/ozone')}>
					{currentContent.nav.ozone}
				</a>
				<a href={resolve('/b2b')} class="nav-link" class:active={isActive('/b2b')}>
					{currentContent.nav.b2b}
				</a>
				<a href={resolve('/agro')} class="nav-link" class:active={isActive('/agro')}>
					{currentContent.nav.agro}
				</a>
				<a href={resolve('/water')} class="nav-link" class:active={isActive('/water')}>
					{currentContent.nav.water}
				</a>
				<a href={resolve('/how-we-work')} class="nav-link" class:active={isActive('/how-we-work')}>
					{currentContent.nav.howWeWork}
				</a>
				<a href={resolve('/calculator')} class="nav-link" class:active={isActive('/calculator')}>
					{currentContent.nav.calculator}
				</a>
				<a href={resolve('/contacts')} class="nav-link" class:active={isActive('/contacts')}>
					{currentContent.nav.contacts}
				</a>
			</nav>

			<!-- Right Actions -->
			<div class="main-bar-actions">
				<!-- Order CTA button -->
				<button
					type="button"
					class="btn btn-primary btn-sm main-cta-btn"
					onclick={() => orderModal.open({ serviceTitle: currentContent.nav.callBtn })}
				>
					<span class="cta-full-label">⚡ {currentContent.nav.callBtn}</span>
					<span class="cta-short-label">⚡ {#if langState.current === 'ua'}Замовити{:else}Заказать{/if}</span>
				</button>

				<!-- Mobile Hamburger Toggle -->
				<button
					type="button"
					class="burger-btn"
					class:open={isMobileMenuOpen}
					onclick={toggleMobileMenu}
					aria-label="Меню"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Drawer Menu & Backdrop -->
	{#if isMobileMenuOpen}
		<div class="mobile-backdrop" onclick={closeMobileMenu} role="presentation"></div>
		<div class="mobile-drawer">
			<div class="mobile-nav">
				<div class="mobile-lang-row">
					<span class="mobile-lang-label">Мова сайту / Язык:</span>
					<button
						type="button"
						class="lang-toggle-btn mobile-lang-btn"
						onclick={() => langState.toggle()}
					>
						<span class="lang-opt" class:active={langState.current === 'ua'}>Українська</span>
						<span class="lang-divider">/</span>
						<span class="lang-opt" class:active={langState.current === 'ru'}>Русский</span>
					</button>
				</div>

				<a href={resolve('/')} class="mobile-nav-link" class:active={isActive('/')} onclick={closeMobileMenu}>
					<span class="m-icon">🏠</span>
					<span>{#if langState.current === 'ua'}Головна{:else}Главная{/if}</span>
				</a>
				<a href={resolve('/services')} class="mobile-nav-link" class:active={isActive('/services')} onclick={closeMobileMenu}>
					<span class="m-icon">🧹</span>
					<span>{currentContent.nav.services}</span>
				</a>
				<a href={resolve('/ozone')} class="mobile-nav-link" class:active={isActive('/ozone')} onclick={closeMobileMenu}>
					<span class="m-icon">💨</span>
					<span>{currentContent.nav.ozone}</span>
				</a>
				<a href={resolve('/b2b')} class="mobile-nav-link" class:active={isActive('/b2b')} onclick={closeMobileMenu}>
					<span class="m-icon">🏢</span>
					<span>{currentContent.nav.b2b}</span>
				</a>
				<a href={resolve('/agro')} class="mobile-nav-link" class:active={isActive('/agro')} onclick={closeMobileMenu}>
					<span class="m-icon">🌾</span>
					<span>{currentContent.nav.agro}</span>
				</a>
				<a href={resolve('/water')} class="mobile-nav-link" class:active={isActive('/water')} onclick={closeMobileMenu}>
					<span class="m-icon">💧</span>
					<span>{currentContent.nav.water}</span>
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
		transition: all var(--transition-norm);
		padding-top: env(safe-area-inset-top, 0);
	}

	.header-wrapper.scrolled {
		border-bottom-color: rgba(255, 255, 255, 0.12);
	}

	/* Top Utility Bar */
	.top-bar {
		background: #000000;
		color: var(--color-ash-gray);
		font-size: 0.76rem;
		border-bottom: 1px solid var(--color-void-border);
	}

	.top-bar-container {
		max-width: var(--container-width);
		margin: 0 auto;
		padding: 0.35rem clamp(0.75rem, 2vw, 1.5rem);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.top-bar-left, .top-bar-right {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		white-space: nowrap;
	}

	@media (max-width: 860px) {
		.top-bar-left {
			display: none;
		}
		.top-bar-container {
			justify-content: flex-end;
		}
	}

	@media (max-width: 480px) {
		.top-bar-container {
			padding: 0.3rem 0.75rem;
			gap: 0.5rem;
		}
		.top-phone-link {
			font-size: 0.76rem;
			gap: 0.25rem;
		}
		.top-bar-right {
			gap: 0.5rem;
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

	.lang-toggle-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-full);
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.05);
		cursor: pointer;
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-ash-gray);
		transition: all var(--transition-fast);
	}

	.lang-toggle-btn:hover {
		background: rgba(255, 255, 255, 0.12);
		color: var(--color-bone-white);
	}

	.lang-opt.active {
		color: var(--color-saffron-spark);
		font-weight: 700;
	}

	.lang-divider {
		color: rgba(255, 255, 255, 0.2);
		font-size: 0.7rem;
	}

	/* Main Navigation Bar */
	.main-bar {
		background: transparent;
	}

	.main-bar-container {
		max-width: var(--container-width);
		margin: 0 auto;
		padding: 0.75rem clamp(0.75rem, 2vw, 1.5rem);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: clamp(0.5rem, 1vw, 1.2rem);
	}

	.logo-box {
		flex-shrink: 0;
	}

	/* Nav Links */
	.nav-links {
		display: flex;
		align-items: center;
		gap: clamp(0.2rem, 0.7vw, 1rem);
		flex: 1;
		justify-content: center;
		min-width: 0;
	}

	@media (max-width: 1240px) {
		.nav-links {
			display: none;
		}
	}

	.nav-link {
		font-size: 13px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.025em;
		color: var(--color-ash-gray);
		white-space: nowrap;
		flex-shrink: 0;
		padding: 0.4rem clamp(0.35rem, 0.5vw, 0.7rem);
		border-radius: var(--radius-buttons);
		transition: all var(--transition-fast);
		text-decoration: none;
		position: relative;
	}

	.nav-link:hover {
		color: var(--color-bone-white);
	}

	.nav-link.active {
		color: var(--color-bone-white);
		font-weight: 600;
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: 0px;
		left: 20%;
		right: 20%;
		height: 2px;
		background: var(--color-electric-iris);
		border-radius: 2px;
	}

	.main-bar-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-shrink: 0;
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

	@media (max-width: 1400px) {
		.cta-full-label {
			display: none;
		}
		.cta-short-label {
			display: inline;
		}
	}

	@media (max-width: 640px) {
		.main-cta-btn {
			display: none;
		}
	}

	/* Hamburger Button */
	.burger-btn {
		display: none;
		flex-direction: column;
		justify-content: space-around;
		width: 40px;
		height: 40px;
		background: #0d0d0d;
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-buttons);
		cursor: pointer;
		padding: 9px;
		transition: background var(--transition-fast);
		touch-action: manipulation;
	}

	.burger-btn:hover {
		background: #171717;
		border-color: rgba(255, 255, 255, 0.2);
	}

	@media (max-width: 1240px) {
		.burger-btn {
			display: flex;
		}
	}

	.burger-btn span {
		width: 100%;
		height: 2px;
		background-color: var(--color-bone-white);
		border-radius: 2px;
		transition: all 0.3s ease;
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

	.mobile-lang-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid var(--color-void-border);
		margin-bottom: 0.5rem;
	}

	.mobile-lang-label {
		font-size: 0.82rem;
		font-weight: 400;
		color: var(--color-ash-gray);
	}

	.mobile-lang-btn {
		background: #141414;
		border-color: rgba(255, 255, 255, 0.15);
		color: var(--color-bone-white);
		padding: 0.35rem 0.8rem;
	}

	.mobile-lang-btn .lang-opt.active {
		color: var(--color-saffron-spark);
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

	.mobile-nav-link:hover, .mobile-nav-link.active {
		background: #141414;
		color: var(--color-bone-white);
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

	.mobile-phone-sub {
		color: var(--color-ash-gray);
		font-size: 0.92rem;
		text-decoration: none;
	}

	.mobile-hours {
		margin-top: 0.6rem;
		font-size: 0.82rem;
		color: var(--color-ash-gray);
	}
</style>
