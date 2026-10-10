<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { ArrowRight } from 'phosphor-svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let about = $derived(currentContent.aboutCompany);

	const serviceMeta: Record<
		string,
		{ icon: string; bg: string; accentColor: string; badgeClass: string; targetId: string }
	> = {
		'01': {
			icon: 'images/badges/badge-disinsection.webp',
			bg: 'images/pest-cockroaches.webp',
			accentColor: '#ef4444',
			badgeClass: 'badge-pest',
			targetId: 'disinsection'
		},
		'02': {
			icon: 'images/badges/badge-deratization.webp',
			bg: 'images/deratization-rodents.webp',
			accentColor: '#ef4444',
			badgeClass: 'badge-rodent',
			targetId: 'deratization'
		},
		'03': {
			icon: 'images/badges/badge-disinfection.webp',
			bg: 'images/hero-disinfection.webp',
			accentColor: '#ef4444',
			badgeClass: 'badge-disinfection',
			targetId: 'disinfection'
		},
		'04': {
			icon: 'images/badges/badge-ozonation.webp',
			bg: 'images/ozone-bg.webp',
			accentColor: '#ef4444',
			badgeClass: 'badge-ozone',
			targetId: 'ozonation'
		},
		'05': {
			icon: 'images/badges/badge-pest-control.webp',
			bg: 'images/b2b-haccp-audit.webp',
			accentColor: '#ef4444',
			badgeClass: 'badge-haccp',
			targetId: 'pest-control'
		}
	};
</script>

<section id="about-company" class="section about-company-section">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header">
			<h2 class="section-title">
				<span class="welcome-line">
					{#if langState.current === 'ua'}
						Вас вітає ТОВ «<span class="brand-ozon">ОЗОН</span><span class="brand-sep">-</span><span class="brand-dez">ДЕЗ</span>»!
					{:else if langState.current === 'ru'}
						Вас приветствует ООО «<span class="brand-ozon">ОЗОН</span><span class="brand-sep">-</span><span class="brand-dez">ДЕЗ</span>»!
					{:else}
						Welcome to LLC «<span class="brand-ozon">OZON</span><span class="brand-sep">-</span><span class="brand-dez">DEZ</span>»!
					{/if}
				</span>
				<span class="title-main">{about.title}</span>
			</h2>
			<p class="section-subtitle">
				{about.subtitle}
			</p>
			<p class="section-lead-body">
				{about.intro}
			</p>
		</div>

		<!-- 5 Core Services Grid: 3 on row 1, 2 centered on row 2 -->
		<div class="services-overview-block">
			<h3 class="overview-block-heading">{about.servicesTitle}</h3>
			<div class="five-services-grid">
				{#each about.services as srv, idx}
					{@const meta = serviceMeta[srv.num]}
					<a
						href="{resolve('/services')}#{meta?.targetId || 'services'}"
						class="service-pill-card glass-card service-card-{srv.num}"
						title="{srv.title}"
						data-testid="about-service-{meta?.targetId || srv.num}-link"
					>
						<!-- Thematic Background Photography with Smooth Zoom & Brighten on Hover -->
						{#if meta?.bg}
							<div
								class="service-card-bg"
								style="background-image: url('{asset(meta.bg as any)}');"
								aria-hidden="true"
							></div>
							<div class="service-card-overlay" aria-hidden="true"></div>
						{/if}

						<div class="pill-card-top">
							<div class="srv-icon-badge {meta?.badgeClass || ''}">
								{#if meta?.icon}
									<img
										src="{asset(meta.icon as any)}"
										alt="{srv.title}"
										class="srv-icon-img"
										width="104"
										height="104"
										loading="lazy"
									/>
								{:else}
									<span class="srv-icon-bubble">{srv.icon}</span>
								{/if}
							</div>
							<span class="srv-card-arrow" aria-hidden="true" style="display: inline-flex; align-items: center;"><ArrowRight size={16} weight="bold" /></span>
						</div>
						<h4 class="srv-card-title">{srv.title}</h4>
						<p class="srv-card-desc">{srv.desc}</p>
						<span class="srv-read-more" style="display: inline-flex; align-items: center; gap: 0.35rem;">
							<span>
								{#if langState.current === 'ua'}
									Детальніше
								{:else if langState.current === 'ru'}
									Подробнее
								{:else}
									Learn more
								{/if}
							</span>
							<ArrowRight size={14} weight="bold" />
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

	:global(html[data-theme="light"]) .title-main,
	:global(html.theme-light) .title-main,
	:global(body[data-theme="light"]) .title-main,
	:global([data-theme="light"]) .title-main {
		color: #222f30 !important;
	}

	.section-lead-body {
		font-size: clamp(0.98rem, 1.3vw, 1.12rem);
		color: var(--color-ash-gray);
		line-height: 1.68;
		max-width: 820px;
		margin: 1.2rem auto 0;
		font-weight: 300;
	}

	:global(html[data-theme="light"]) .section-lead-body,
	:global(html.theme-light) .section-lead-body,
	:global(body[data-theme="light"]) .section-lead-body,
	:global([data-theme="light"]) .section-lead-body {
		color: #4d5757 !important;
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

	:global(html[data-theme="light"]) .overview-block-heading,
	:global(html.theme-light) .overview-block-heading,
	:global(body[data-theme="light"]) .overview-block-heading,
	:global([data-theme="light"]) .overview-block-heading {
		color: #222f30 !important;
	}

	.five-services-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 1.5rem;
		max-width: 1160px;
		margin: 0 auto;
	}

	.service-card-01 {
		grid-column: span 2;
	}

	.service-card-02 {
		grid-column: span 2;
	}

	.service-card-03 {
		grid-column: span 2;
	}

	.service-card-04 {
		grid-column: 2 / span 2;
	}

	.service-card-05 {
		grid-column: 4 / span 2;
	}

	@media (max-width: 960px) {
		.five-services-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.25rem;
		}

		.service-card-01,
		.service-card-02,
		.service-card-03,
		.service-card-04 {
			grid-column: auto;
		}

		.service-card-05 {
			grid-column: 1 / -1;
			max-width: 480px;
			margin: 0 auto;
			width: 100%;
		}
	}

	@media (max-width: 600px) {
		.five-services-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.service-card-05 {
			grid-column: auto;
			max-width: 100%;
		}
	}

	.service-pill-card {
		position: relative;
		overflow: hidden;
		padding: 2.2rem 1.8rem;
		border-radius: var(--radius-cards);
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		isolation: isolate;
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
		text-decoration: none;
		color: inherit;
		cursor: pointer;
	}

	.service-pill-card:hover {
		transform: translateY(-4px);
		border-color: rgba(56, 189, 248, 0.6);
		background: var(--color-surface-hover);
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 24px rgba(56, 189, 248, 0.2);
	}

	/* Thematic photography: zooms smoothly and brightens on hover (like city cards) */
	.service-card-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		opacity: 0.12;
		filter: saturate(1.1) contrast(1.05) brightness(0.9);
		transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		z-index: 0;
		pointer-events: none;
		will-change: transform, opacity, filter;
	}

	.service-pill-card:hover .service-card-bg {
		opacity: 0.32;
		transform: scale(1.12);
		filter: saturate(1.25) contrast(1.15) brightness(1.25);
	}

	.service-card-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(8, 10, 16, 0.72) 0%, rgba(8, 10, 16, 0.94) 100%);
		z-index: 1;
		pointer-events: none;
	}

	:global(html[data-theme="light"]) .service-pill-card {
		background: #ffffff;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
		border: 1px solid #c9cbbe;
		box-shadow: none !important;
	}

	:global(html[data-theme="light"]) .service-pill-card:hover {
		border-color: #222f30;
		box-shadow: none !important;
	}

	:global(html[data-theme="light"]) .service-card-overlay {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.92) 100%);
	}

	:global(html[data-theme="light"]) .service-card-bg {
		opacity: 0.12;
	}

	:global(html[data-theme="light"]) .service-pill-card:hover .service-card-bg {
		opacity: 0.28;
		transform: scale(1.12);
		filter: saturate(1.2) contrast(1.1) brightness(1.1);
	}

	.pill-card-top {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-bottom: 0.5rem;
	}

	.srv-icon-badge {
		width: 106px;
		height: 106px;
		min-width: 106px;
		min-height: 106px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: transparent;
		border: none;
		padding: 0;
		filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.4));
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease;
		overflow: hidden;
	}

	.service-pill-card:hover .srv-icon-badge {
		transform: scale(1.08);
		filter: drop-shadow(0 10px 24px rgba(220, 38, 38, 0.45));
	}

	:global(html[data-theme="light"]) .srv-icon-badge {
		background: transparent;
		border: none;
		filter: drop-shadow(0 4px 14px rgba(220, 38, 38, 0.22));
	}

	.srv-icon-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	.srv-card-arrow {
		position: absolute;
		top: 0;
		right: 0;
		width: 32px;
		height: 32px;
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
		transform: translate(2px, -2px);
	}

	:global(html[data-theme="light"]) .srv-card-arrow {
		background: #cef79e;
		border: 1px solid #b8eb83;
		color: #222f30;
	}

	:global(html[data-theme="light"]) .service-pill-card:hover .srv-card-arrow {
		background: #bbf47b;
		border-color: #222f30;
		color: #222f30;
		transform: translate(2px, -2px);
	}

	.srv-card-title {
		position: relative;
		z-index: 2;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-bone-white);
		margin: 0;
		letter-spacing: -0.01em;
	}

	:global(html[data-theme="light"]) .srv-card-title {
		color: #222f30 !important;
	}

	.srv-card-desc {
		position: relative;
		z-index: 2;
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		line-height: 1.6;
		margin: 0;
		font-weight: 300;
	}

	:global(html[data-theme="light"]) .srv-card-desc {
		color: #4d5757 !important;
	}

	.srv-read-more {
		position: relative;
		z-index: 2;
		margin-top: auto;
		padding-top: 0.85rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: #38bdf8;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		transition: transform 0.2s ease, color 0.2s ease;
	}

	.service-pill-card:hover .srv-read-more {
		color: #7dd3fc;
		transform: translateX(4px);
	}

	:global(html[data-theme="light"]) .srv-read-more {
		color: #222f30 !important;
	}

	:global(html[data-theme="light"]) .service-pill-card:hover .srv-read-more {
		color: #15846e !important;
	}

	.welcome-line {
		display: block;
		font-size: clamp(1.4rem, 2.5vw, 1.95rem);
		font-weight: 700;
		color: var(--color-bone-white);
		margin-bottom: 0.35rem;
		letter-spacing: -0.01em;
	}

	.welcome-line .brand-ozon {
		color: #00E640;
		font-weight: 800;
	}

	.welcome-line .brand-sep {
		color: #FFA000;
		margin: 0 1.5px;
		font-weight: 800;
	}

	.welcome-line .brand-dez {
		color: #008F45;
		font-weight: 800;
	}

	:global(html[data-theme="light"]) .welcome-line {
		color: #0f172a;
	}

	:global(html[data-theme="light"]) .welcome-line .brand-ozon {
		color: #00C835;
	}

	:global(html[data-theme="light"]) .welcome-line .brand-sep {
		color: #D97706;
	}

	:global(html[data-theme="light"]) .welcome-line .brand-dez {
		color: #007A3B;
	}
</style>
