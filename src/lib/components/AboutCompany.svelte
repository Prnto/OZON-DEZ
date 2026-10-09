<script lang="ts">
	import { asset } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let about = $derived(currentContent.aboutCompany);

	const serviceMeta: Record<
		string,
		{ icon: string; bg: string; accentColor: string; badgeClass: string }
	> = {
		'01': {
			icon: 'images/icons/stop-cockroach.svg',
			bg: 'images/pest-cockroaches.jpg',
			accentColor: '#ef4444',
			badgeClass: 'badge-pest'
		},
		'02': {
			icon: 'images/icons/stop-rodent.svg',
			bg: 'images/deratization-rodents.jpg',
			accentColor: '#ef4444',
			badgeClass: 'badge-rodent'
		},
		'03': {
			icon: 'images/icons/disinfection-shield.svg',
			bg: 'images/hero-disinfection.jpg',
			accentColor: '#10b981',
			badgeClass: 'badge-disinfection'
		},
		'04': {
			icon: 'images/icons/ozone-molecule.svg',
			bg: 'images/ozone-bg.jpg',
			accentColor: '#8052ff',
			badgeClass: 'badge-ozone'
		},
		'05': {
			icon: 'images/icons/pest-haccp.svg',
			bg: 'images/b2b-haccp-audit.jpg',
			accentColor: '#f59e0b',
			badgeClass: 'badge-haccp'
		}
	};
</script>

<section id="about-company" class="section about-company-section">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header">
			<div class="section-badge saffron-badge">
				<span>✦</span>
				<span>{about.badge}</span>
			</div>
			<h2 class="section-title">
				<span class="welcome-line">{about.welcome}</span>
				<span class="title-main">{about.title}</span>
			</h2>
			<p class="section-subtitle">
				{about.subtitle}
			</p>
			<p class="section-lead-body">
				{about.intro}
			</p>
		</div>

		<!-- 5 Core Services Grid -->
		<div class="services-overview-block">
			<h3 class="overview-block-heading">{about.servicesTitle}</h3>
			<div class="five-services-grid">
				{#each about.services as srv}
					{@const meta = serviceMeta[srv.num]}
					<div class="service-pill-card glass-card">
						<!-- Thematic Background Photography with Dark Protective Overlay -->
						{#if meta?.bg}
							<div
								class="service-card-bg"
								style="background-image: url('{asset(meta.bg)}');"
								aria-hidden="true"
							></div>
							<div class="service-card-overlay" aria-hidden="true"></div>
						{/if}

						<div class="pill-card-top">
							<span class="srv-num-tag">{srv.num}</span>
							<div class="srv-icon-badge {meta?.badgeClass || ''}">
								{#if meta?.icon}
									<img
										src="{asset(meta.icon)}"
										alt="{srv.title}"
										class="srv-icon-img"
										width="40"
										height="40"
										loading="lazy"
									/>
								{:else}
									<span class="srv-icon-bubble">{srv.icon}</span>
								{/if}
							</div>
						</div>
						<h4 class="srv-card-title">{srv.title}</h4>
						<p class="srv-card-desc">{srv.desc}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- 4 Corporate Trust Pillars Grid -->
		<div class="trust-pillars-grid">
			<!-- Pillar 1: Audience / B2C & B2B -->
			<div class="pillar-card glass-card">
				<div class="pillar-icon-box">👥</div>
				<div class="pillar-content">
					<h4 class="pillar-title">{about.audienceTitle}</h4>
					<p class="pillar-desc">{about.audienceDesc}</p>
				</div>
			</div>

			<!-- Pillar 2: Equipment & Preparations -->
			<div class="pillar-card glass-card">
				<div class="pillar-icon-box">⚙️</div>
				<div class="pillar-content">
					<h4 class="pillar-title">{about.equipmentTitle}</h4>
					<p class="pillar-desc">{about.equipmentDesc}</p>
				</div>
			</div>

			<!-- Pillar 3: Qualified Specialists -->
			<div class="pillar-card glass-card">
				<div class="pillar-icon-box">👨‍🔬</div>
				<div class="pillar-content">
					<h4 class="pillar-title">{about.teamTitle}</h4>
					<p class="pillar-desc">{about.teamDesc}</p>
				</div>
			</div>

			<!-- Pillar 4: 15 Years Experience -->
			<div class="pillar-card glass-card">
				<div class="pillar-icon-box">🛡️</div>
				<div class="pillar-content">
					<h4 class="pillar-title">{about.experienceTitle}</h4>
					<p class="pillar-desc">{about.experienceDesc}</p>
				</div>
			</div>
		</div>

		<!-- Office & Direct Contact Banner -->
		<div class="company-contact-banner glass-card-dark">
			<div class="banner-info-left">
				<div class="office-chip">
					<span class="chip-icon">🏢</span>
					<div>
						<span class="chip-label">{about.officeTitle}</span>
						<strong class="chip-value">{about.officeAddress}</strong>
					</div>
				</div>

				<div class="phones-chip">
					<span class="chip-icon">📞</span>
					<div>
						<span class="chip-label">{about.phonesTitle}</span>
						<div class="chip-phones-row">
							<a href="tel:{currentContent.phones.mobile}" class="chip-phone-link">
								{currentContent.phones.mobileDisplay}
							</a>
							<span class="phones-sep">•</span>
							<a href="tel:{currentContent.phones.landline}" class="chip-phone-link">
								{currentContent.phones.landlineDisplay}
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="banner-actions-right">
				<button
					type="button"
					class="btn btn-primary btn-lg"
					onclick={() => orderModal.open({ serviceTitle: about.ctaSpecialist })}
				>
					<span>⚡ {about.ctaSpecialist}</span>
					<span class="btn-arrow-symbol">↗</span>
				</button>
				<a
					href="tel:{currentContent.phones.mobile}"
					class="btn btn-secondary btn-lg"
				>
					<span>📞 {about.ctaConsult}</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.about-company-section {
		position: relative;
		z-index: 1;
		background: transparent;
		padding: clamp(3.5rem, 6vh, 5.5rem) 0;
		border-top: 1px solid var(--color-void-border);
		border-bottom: 1px solid var(--color-void-border);
	}

	.saffron-badge {
		background: rgba(255, 184, 41, 0.08);
		border: 1px solid var(--color-saffron-border);
		color: var(--color-saffron-spark);
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
	}

	.welcome-line {
		display: block;
		font-size: clamp(1.3rem, 2.2vw, 1.8rem);
		color: var(--color-saffron-spark);
		font-weight: 600;
		margin-bottom: 0.4rem;
		letter-spacing: -0.01em;
	}

	.title-main {
		display: block;
	}

	.section-lead-body {
		font-size: clamp(0.98rem, 1.3vw, 1.12rem);
		color: var(--color-ash-gray);
		line-height: 1.68;
		max-width: 820px;
		margin: 1.2rem auto 0;
		font-weight: 300;
	}

	/* 5 Services Grid */
	.services-overview-block {
		margin-top: 2.8rem;
	}

	.overview-block-heading {
		font-size: 1.15rem;
		color: var(--color-bone-white);
		font-weight: 500;
		margin-bottom: 1.2rem;
		text-align: center;
		letter-spacing: -0.02em;
	}

	.five-services-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1.1rem;
	}

	@media (max-width: 1080px) {
		.five-services-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 760px) {
		.five-services-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.five-services-grid {
			grid-template-columns: 1fr;
		}
	}

	.service-pill-card {
		position: relative;
		overflow: hidden;
		padding: 1.6rem 1.3rem;
		border-radius: var(--radius-cards);
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		isolation: isolate;
		transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
	}

	.service-pill-card:hover {
		transform: translateY(-4px);
		border-color: rgba(128, 82, 255, 0.5);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45), 0 0 25px rgba(128, 82, 255, 0.2);
	}

	.service-card-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		opacity: 0.16;
		filter: saturate(1.2) contrast(1.1);
		transition: opacity var(--transition-fast), transform 0.4s ease-out;
		z-index: 0;
		pointer-events: none;
	}

	.service-pill-card:hover .service-card-bg {
		opacity: 0.32;
		transform: scale(1.08);
	}

	.service-card-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(8, 10, 16, 0.78) 0%, rgba(8, 10, 16, 0.95) 100%);
		z-index: 1;
		pointer-events: none;
	}

	:global(html[data-theme="light"]) .service-card-overlay {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.98) 100%);
	}

	:global(html[data-theme="light"]) .service-card-bg {
		opacity: 0.10;
	}

	:global(html[data-theme="light"]) .service-pill-card:hover .service-card-bg {
		opacity: 0.22;
	}

	.pill-card-top {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.srv-num-tag {
		font-size: 0.82rem;
		font-weight: 800;
		color: var(--color-saffron-spark);
		letter-spacing: 0.05em;
		background: rgba(255, 184, 41, 0.12);
		border: 1px solid rgba(255, 184, 41, 0.25);
		padding: 0.2rem 0.65rem;
		border-radius: var(--radius-full);
	}

	.srv-icon-badge {
		width: 46px;
		height: 46px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 4px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
		transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.service-pill-card:hover .srv-icon-badge {
		transform: scale(1.08);
	}

	.srv-icon-badge.badge-pest,
	.srv-icon-badge.badge-rodent {
		background: rgba(239, 68, 68, 0.08);
		border-color: rgba(239, 68, 68, 0.3);
	}

	.srv-icon-badge.badge-disinfection {
		background: rgba(16, 185, 129, 0.08);
		border-color: rgba(16, 185, 129, 0.3);
	}

	.srv-icon-badge.badge-ozone {
		background: rgba(128, 82, 255, 0.08);
		border-color: rgba(128, 82, 255, 0.3);
	}

	.srv-icon-badge.badge-haccp {
		background: rgba(245, 158, 11, 0.08);
		border-color: rgba(245, 158, 11, 0.3);
	}

	.srv-icon-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.srv-card-title {
		position: relative;
		z-index: 2;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-bone-white);
		margin: 0;
		letter-spacing: -0.02em;
	}

	.srv-card-desc {
		position: relative;
		z-index: 2;
		font-size: 0.85rem;
		color: var(--color-ash-gray);
		line-height: 1.55;
		margin: 0;
		font-weight: 300;
	}

	/* Trust Pillars Grid */
	.trust-pillars-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.2rem;
		margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.trust-pillars-grid {
			grid-template-columns: 1fr;
		}
	}

	.pillar-card {
		padding: 1.6rem 1.4rem;
		border-radius: var(--radius-cards);
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		display: flex;
		gap: 1.2rem;
		align-items: flex-start;
	}

	.pillar-icon-box {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: rgba(128, 82, 255, 0.12);
		border: 1px solid rgba(128, 82, 255, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35rem;
		flex-shrink: 0;
	}

	.pillar-title {
		font-size: 1.05rem;
		font-weight: 500;
		color: var(--color-bone-white);
		margin: 0 0 0.35rem 0;
		letter-spacing: -0.015em;
	}

	.pillar-desc {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		line-height: 1.55;
		margin: 0;
		font-weight: 300;
	}

	/* Contact & Office Banner */
	.company-contact-banner {
		margin-top: 2.2rem;
		padding: 2rem 2.4rem;
		border-radius: var(--radius-cards);
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	@media (max-width: 960px) {
		.company-contact-banner {
			flex-direction: column;
			align-items: flex-start;
			padding: 1.8rem 1.4rem;
		}

		.banner-actions-right {
			width: 100%;
			flex-direction: column;
		}

		.banner-actions-right .btn {
			width: 100%;
		}
	}

	.banner-info-left {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.office-chip,
	.phones-chip {
		display: flex;
		align-items: center;
		gap: 0.9rem;
	}

	.chip-icon {
		font-size: 1.35rem;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: rgba(255, 184, 41, 0.08);
		border: 1px solid rgba(255, 184, 41, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.chip-label {
		display: block;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-saffron-spark);
		font-weight: 600;
		margin-bottom: 0.15rem;
	}

	.chip-value {
		font-size: 0.96rem;
		color: var(--color-bone-white);
		font-weight: 500;
	}

	.chip-phones-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.chip-phone-link {
		font-size: 0.98rem;
		font-weight: 600;
		color: var(--color-bone-white);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.chip-phone-link:hover {
		color: var(--color-electric-iris);
	}

	.phones-sep {
		color: var(--color-ash-gray);
		opacity: 0.6;
	}

	.banner-actions-right {
		display: flex;
		gap: 1rem;
		flex-shrink: 0;
	}
</style>
