<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let about = $derived(currentContent.aboutCompany);

	const serviceMeta: Record<
		string,
		{ icon: string; bg: string; accentColor: string; badgeClass: string; targetId: string }
	> = {
		'01': {
			icon: 'images/icons/stop-cockroach.svg',
			bg: 'images/pest-cockroaches.jpg',
			accentColor: '#ef4444',
			badgeClass: 'badge-pest',
			targetId: 'disinsection'
		},
		'02': {
			icon: 'images/icons/stop-rodent.svg',
			bg: 'images/deratization-rodents.jpg',
			accentColor: '#ef4444',
			badgeClass: 'badge-rodent',
			targetId: 'deratization'
		},
		'03': {
			icon: 'images/icons/disinfection-shield.svg',
			bg: 'images/hero-disinfection.jpg',
			accentColor: '#10b981',
			badgeClass: 'badge-disinfection',
			targetId: 'disinfection'
		},
		'04': {
			icon: 'images/icons/ozone-molecule.svg',
			bg: 'images/ozone-bg.jpg',
			accentColor: '#8052ff',
			badgeClass: 'badge-ozone',
			targetId: 'ozonation'
		},
		'05': {
			icon: 'images/icons/pest-haccp.svg',
			bg: 'images/b2b-haccp-audit.jpg',
			accentColor: '#f59e0b',
			badgeClass: 'badge-haccp',
			targetId: 'pest-control'
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
					<a
						href="{resolve('/services')}#{meta?.targetId || 'services'}"
						class="service-pill-card glass-card"
						title="{srv.title}"
					>
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
							<div class="srv-icon-badge {meta?.badgeClass || ''}">
								{#if meta?.icon}
									<img
										src="{asset(meta.icon)}"
										alt="{srv.title}"
										class="srv-icon-img"
										width="44"
										height="44"
										loading="lazy"
									/>
								{:else}
									<span class="srv-icon-bubble">{srv.icon}</span>
								{/if}
							</div>
							<span class="srv-card-arrow" aria-hidden="true">→</span>
						</div>
						<h4 class="srv-card-title">{srv.title}</h4>
						<p class="srv-card-desc">{srv.desc}</p>
						<span class="srv-read-more">
							{#if langState.current === 'ua'}
								Детальніше
							{:else if langState.current === 'ru'}
								Подробнее
							{:else}
								Learn more
							{/if}
							→
						</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.about-company-section {
		position: relative;
		z-index: 1;
		background: transparent;
		padding: clamp(4.5rem, 7vh, 6.5rem) 0 clamp(3.5rem, 6vh, 5.5rem);
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
		text-decoration: none;
		color: inherit;
		cursor: pointer;
	}

	.service-pill-card:hover {
		transform: translateY(-5px);
		border-color: rgba(56, 189, 248, 0.6);
		box-shadow: 0 14px 32px rgba(0, 0, 0, 0.5), 0 0 25px rgba(56, 189, 248, 0.2);
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
		width: 100%;
	}

	.srv-icon-badge {
		width: 52px;
		height: 52px;
		min-width: 52px;
		min-height: 52px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 14px;
		background: rgba(15, 23, 42, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.14);
		padding: 4px;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(8px);
		transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.service-pill-card:hover .srv-icon-badge {
		transform: scale(1.08);
	}

	.srv-icon-badge.badge-pest,
	.srv-icon-badge.badge-rodent {
		background: rgba(239, 68, 68, 0.12);
		border-color: rgba(239, 68, 68, 0.45);
	}

	.srv-icon-badge.badge-disinfection {
		background: rgba(16, 185, 129, 0.12);
		border-color: rgba(16, 185, 129, 0.45);
	}

	.srv-icon-badge.badge-ozone {
		background: rgba(128, 82, 255, 0.12);
		border-color: rgba(128, 82, 255, 0.45);
	}

	.srv-icon-badge.badge-haccp {
		background: rgba(245, 158, 11, 0.12);
		border-color: rgba(245, 158, 11, 0.45);
	}

	.srv-card-arrow {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-silver-mist);
		font-size: 0.95rem;
		transition: all 0.2s ease;
		z-index: 2;
	}

	.service-pill-card:hover .srv-card-arrow {
		background: #38bdf8;
		color: #0b0f19;
		border-color: #38bdf8;
		transform: translateX(3px);
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
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--color-bone-white);
		margin: 0;
		letter-spacing: -0.01em;
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

	.srv-read-more {
		position: relative;
		z-index: 2;
		margin-top: auto;
		padding-top: 0.6rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: #38bdf8;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		transition: transform 0.2s ease, color 0.2s ease;
	}

	.service-pill-card:hover .srv-read-more {
		color: #7dd3fc;
		transform: translateX(4px);
	}
</style>
