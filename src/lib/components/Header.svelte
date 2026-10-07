<script lang="ts">
	import Logo from './Logo.svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';
	import { page } from '$app/state';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	let currentContent = $derived(contentMap[langState.current]);
	let currentPath = $derived(page.url.pathname);

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
				<Logo variant="dark" />
			</div>

			<!-- Desktop Navigation Links to Separate Pages -->
			<nav class="nav-links">
				<a href="/services" class="nav-link" class:active={currentPath === '/services'}>
					{currentContent.nav.services}
				</a>
				<a href="/ozone" class="nav-link" class:active={currentPath === '/ozone'}>
					{currentContent.nav.ozone}
				</a>
				<a href="/b2b" class="nav-link" class:active={currentPath === '/b2b'}>
					{currentContent.nav.b2b}
				</a>
				<a href="/agro" class="nav-link" class:active={currentPath === '/agro'}>
					{currentContent.nav.agro}
				</a>
				<a href="/water" class="nav-link" class:active={currentPath === '/water'}>
					{currentContent.nav.water}
				</a>
				<a href="/how-we-work" class="nav-link" class:active={currentPath === '/how-we-work'}>
					{currentContent.nav.howWeWork}
				</a>
				<a href="/calculator" class="nav-link" class:active={currentPath === '/calculator'}>
					{currentContent.nav.calculator}
				</a>
				<a href="/contacts" class="nav-link" class:active={currentPath === '/contacts'}>
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
					<span>⚡ {currentContent.nav.callBtn}</span>
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

				<a href="/" class="mobile-nav-link" class:active={currentPath === '/'} onclick={closeMobileMenu}>
					<span class="m-icon">🏠</span>
					<span>{#if langState.current === 'ua'}Головна{:else}Главная{/if}</span>
				</a>
				<a href="/services" class="mobile-nav-link" class:active={currentPath === '/services'} onclick={closeMobileMenu}>
					<span class="m-icon">🧹</span>
					<span>{currentContent.nav.services}</span>
				</a>
				<a href="/ozone" class="mobile-nav-link" class:active={currentPath === '/ozone'} onclick={closeMobileMenu}>
					<span class="m-icon">💨</span>
					<span>{currentContent.nav.ozone}</span>
				</a>
				<a href="/b2b" class="mobile-nav-link" class:active={currentPath === '/b2b'} onclick={closeMobileMenu}>
					<span class="m-icon">🏢</span>
					<span>{currentContent.nav.b2b}</span>
				</a>
				<a href="/agro" class="mobile-nav-link" class:active={currentPath === '/agro'} onclick={closeMobileMenu}>
					<span class="m-icon">🌾</span>
					<span>{currentContent.nav.agro}</span>
				</a>
				<a href="/water" class="mobile-nav-link" class:active={currentPath === '/water'} onclick={closeMobileMenu}>
					<span class="m-icon">💧</span>
					<span>{currentContent.nav.water}</span>
				</a>
				<a href="/how-we-work" class="mobile-nav-link" class:active={currentPath === '/how-we-work'} onclick={closeMobileMenu}>
					<span class="m-icon">⚙️</span>
					<span>{currentContent.nav.howWeWork}</span>
				</a>
				<a href="/calculator" class="mobile-nav-link" class:active={currentPath === '/calculator'} onclick={closeMobileMenu}>
					<span class="m-icon">🧮</span>
					<span>{currentContent.nav.calculator}</span>
				</a>
				<a href="/contacts" class="mobile-nav-link" class:active={currentPath === '/contacts'} onclick={closeMobileMenu}>
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
		background: #ffffff;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
		transition: all var(--transition-norm);
	}

	.header-wrapper.scrolled {
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	/* Top Utility Bar */
	.top-bar {
		background: #081a36;
		color: #94a3b8;
		font-size: 0.8rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.top-bar-container {
		max-width: var(--container-width);
		margin: 0 auto;
		padding: 0.4rem 1.5rem;
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

	.top-info-item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	.top-icon {
		font-size: 0.85rem;
	}

	.top-bar-divider {
		color: rgba(255, 255, 255, 0.2);
		font-size: 0.75rem;
	}

	.top-phone-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: #cbd5e1;
		font-weight: 600;
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.top-phone-link:hover {
		color: var(--accent-teal);
	}

	.top-phone-link.highlight {
		color: #ffffff;
		font-weight: 700;
	}

	.phone-pulse-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: var(--accent-teal);
		box-shadow: 0 0 0 0 rgba(0, 212, 170, 0.7);
		animation: pulseDot 2s infinite;
		flex-shrink: 0;
	}

	@keyframes pulseDot {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(0, 212, 170, 0.7);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 6px rgba(0, 212, 170, 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(0, 212, 170, 0);
		}
	}

	.lang-toggle-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.6rem;
		border-radius: var(--radius-full);
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.08);
		cursor: pointer;
		font-size: 0.75rem;
		font-weight: 700;
		color: #94a3b8;
		transition: all var(--transition-fast);
	}

	.lang-toggle-btn:hover {
		background: rgba(255, 255, 255, 0.16);
		color: #ffffff;
	}

	.lang-opt.active {
		color: var(--accent-teal);
		font-weight: 800;
	}

	.lang-divider {
		color: rgba(255, 255, 255, 0.3);
		font-size: 0.7rem;
	}

	/* Main Navigation Bar */
	.main-bar {
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
	}

	.main-bar-container {
		max-width: var(--container-width);
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.2rem;
	}

	.logo-box {
		flex-shrink: 0;
	}

	/* Nav Links */
	.nav-links {
		display: flex;
		align-items: center;
		gap: clamp(0.4rem, 0.9vw, 1.1rem);
		flex: 1;
		justify-content: center;
	}

	/* Switch to mobile drawer at 1160px so links NEVER collide */
	@media (max-width: 1160px) {
		.nav-links {
			display: none;
		}
	}

	.nav-link {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--text-title);
		white-space: nowrap;
		flex-shrink: 0;
		padding: 0.4rem 0.6rem;
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
		text-decoration: none;
		position: relative;
	}

	.nav-link:hover, .nav-link.active {
		color: var(--primary-700);
		background: rgba(0, 212, 170, 0.08);
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: 2px;
		left: 10%;
		right: 10%;
		height: 2px;
		background: var(--accent-teal);
		border-radius: 2px;
	}

	.main-bar-actions {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		flex-shrink: 0;
	}

	.main-cta-btn {
		white-space: nowrap;
		box-shadow: 0 4px 14px rgba(0, 212, 170, 0.3);
		padding: 0.6rem 1.25rem;
		font-size: 0.88rem;
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
		width: 36px;
		height: 36px;
		background: #f1f5f9;
		border: 1px solid var(--border-light);
		border-radius: var(--radius-sm);
		cursor: pointer;
		padding: 7px;
		transition: background var(--transition-fast);
	}

	.burger-btn:hover {
		background: #e2e8f0;
	}

	@media (max-width: 1160px) {
		.burger-btn {
			display: flex;
		}
	}

	.burger-btn span {
		width: 100%;
		height: 2px;
		background-color: var(--primary-900);
		border-radius: 2px;
		transition: all 0.3s ease;
	}

	.burger-btn.open span:nth-child(1) {
		transform: translateY(6px) rotate(45deg);
	}

	.burger-btn.open span:nth-child(2) {
		opacity: 0;
	}

	.burger-btn.open span:nth-child(3) {
		transform: translateY(-6px) rotate(-45deg);
	}

	/* Mobile Drawer */
	.mobile-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(4, 13, 26, 0.5);
		backdrop-filter: blur(4px);
		z-index: 98;
	}

	.mobile-drawer {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: #ffffff;
		border-bottom: 2px solid var(--border-light);
		box-shadow: 0 16px 30px rgba(0, 0, 0, 0.15);
		padding: 1.5rem;
		animation: slideDown 0.25s ease-out;
		z-index: 99;
		max-height: calc(100vh - 100px);
		overflow-y: auto;
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
		border-bottom: 1px solid var(--border-light);
		margin-bottom: 0.5rem;
	}

	.mobile-lang-label {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--text-muted);
	}

	.mobile-lang-btn {
		background: #f1f5f9;
		border-color: var(--border-light);
		color: var(--text-body);
		padding: 0.35rem 0.8rem;
	}

	.mobile-lang-btn .lang-opt.active {
		color: var(--primary-800);
	}

	.mobile-nav-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-title);
		padding: 0.65rem 0.6rem;
		border-radius: var(--radius-sm);
		text-decoration: none;
		transition: background var(--transition-fast);
	}

	.mobile-nav-link:hover, .mobile-nav-link.active {
		background: #f8fafc;
		color: var(--primary-700);
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
		border-top: 1px solid var(--border-light);
	}

	.mobile-phones {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.mobile-phone {
		font-weight: 700;
		color: var(--primary-900);
		font-size: 1.1rem;
		text-decoration: none;
	}

	.mobile-phone-sub {
		color: var(--text-muted);
		font-size: 0.92rem;
		text-decoration: none;
	}

	.mobile-hours {
		margin-top: 0.6rem;
		font-size: 0.85rem;
		color: var(--text-muted);
	}
</style>
