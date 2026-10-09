<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { PhoneCall, Calculator, ShieldCheck, Clock, Flask, Lightning } from 'phosphor-svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let hero = $derived(currentContent.hero);
</script>

<section id="hero" class="hero-section">
	<!-- Semantic accessible H1 for SEO -->
	<h1 class="sr-only">{hero.titleMain} {hero.titleHighlight} — {currentContent.companyName}</h1>

	<!-- Full-width Hero Visual Banner (stretched edge-to-edge like PageHeader) -->
	<div class="hero-banner-full">
		<div class="hero-banner-media">
			<img
				src="{asset('images/hero-main.webp')}"
				alt="{hero.titleMain} — {currentContent.companyName}"
				class="hero-banner-img"
				data-testid="hero-promo-image"
				width="1376"
				height="768"
				loading="eager"
				fetchpriority="high"
			/>

			<div class="hero-banner-overlay" aria-hidden="true"></div>
		</div>

		<!-- Floating feature badges at bottom of the banner -->
		<div class="hero-banner-pills">
			<div class="banner-pill">
				<ShieldCheck size={16} weight="duotone" />
				<span>
					{#if langState.current === 'ua'}100% гарантія за договором{:else if langState.current === 'ru'}100% гарантия по договору{:else}100% contract warranty{/if}
				</span>
			</div>
			<div class="banner-pill">
				<Clock size={16} weight="duotone" />
				<span>
					{#if langState.current === 'ua'}Виїзд від 30–45 хв{:else if langState.current === 'ru'}Выезд от 30–45 мин{:else}Arrival in 30–45 min{/if}
				</span>
			</div>
			<div class="banner-pill">
				<Flask size={16} weight="duotone" />
				<span>
					{#if langState.current === 'ua'}Сертифіковано МОЗ України{:else if langState.current === 'ru'}Сертифицировано МОЗ Украины{:else}Ministry of Health certified{/if}
				</span>
			</div>
		</div>
	</div>

	<!-- Quick CTAs placed directly below the promotional banner in container -->
	<div class="hero-actions-wrapper">
		<div class="container">
			<div class="hero-actions">
				<button
					type="button"
					class="btn btn-primary btn-lg"
					data-testid="hero-call-btn"
					onclick={() =>
						orderModal.open({
							serviceTitle:
								langState.current === 'ua'
									? 'Виклик спеціаліста'
									: langState.current === 'ru'
									? 'Вызов специалиста'
									: 'Call a specialist'
						})}
				>
					<Lightning size={18} weight="fill" />
					<span>{hero.ctaPrimary}</span>
				</button>

				<a
					href={resolve('/calculator')}
					class="btn btn-secondary btn-lg"
					data-testid="hero-calc-link"
				>
					<Calculator size={18} weight="bold" />
					<span>{hero.ctaSecondary}</span>
				</a>

				<a
					href="tel:{currentContent.phones.mobile}"
					class="btn btn-ghost btn-lg hero-phone-cta"
					data-testid="hero-phone-link"
				>
					<PhoneCall size={18} weight="bold" />
					<span>{currentContent.phones.mobileDisplay}</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		z-index: 1;
		background: transparent;
		padding: 0 0 clamp(2rem, 4vh, 3.2rem);
		border-bottom: 1px solid var(--color-void-border);
		overflow: hidden;
	}

	/* Full-width Hero Banner (Stretched edge-to-edge across screen like PageHeader) */
	.hero-banner-full {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-bottom: 1px solid var(--border-subtle);
		background: #09090b;
	}

	.hero-banner-media {
		position: relative;
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 16 / 9;
		max-height: clamp(380px, 48vw, 680px);
	}

	.hero-banner-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 25%;
		display: block;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-banner-full:hover .hero-banner-img {
		transform: scale(1.015);
	}

	.hero-banner-overlay {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.2) 0%,
				transparent 40%,
				rgba(0, 0, 0, 0.72) 100%
			),
			linear-gradient(
				90deg,
				rgba(0, 0, 0, 0.35) 0%,
				transparent 15%,
				transparent 85%,
				rgba(0, 0, 0, 0.35) 100%
			);
		pointer-events: none;
	}

	:global(html[data-theme="light"]) .hero-banner-overlay {
		background:
			linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.1) 0%,
				transparent 40%,
				rgba(15, 23, 42, 0.45) 100%
			);
	}

	.hero-banner-pills {
		position: absolute;
		bottom: 1.25rem;
		left: 1.25rem;
		right: 1.25rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		z-index: 2;
	}

	.banner-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.95rem;
		border-radius: var(--radius-full);
		font-size: 0.82rem;
		font-weight: 600;
		color: #ffffff;
		background: rgba(13, 17, 28, 0.75);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
	}

	/* Actions Bar below the banner */
	.hero-actions-wrapper {
		width: 100%;
		padding-top: clamp(1.4rem, 2.8vh, 2rem);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.9rem;
	}

	.hero-actions .btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.85rem 1.6rem;
		font-size: 0.95rem;
	}

	.hero-phone-cta {
		border: 1px solid var(--border-subtle);
		background: rgba(255, 255, 255, 0.04);
		color: var(--color-bone-white);
	}

	.hero-phone-cta:hover {
		border-color: var(--color-electric-iris);
		background: rgba(128, 82, 255, 0.12);
		color: #ffffff;
	}

	@media (max-width: 900px) {
		.hero-banner-pills {
			bottom: 0.85rem;
			left: 0.85rem;
			right: 0.85rem;
		}

		.banner-pill {
			font-size: 0.76rem;
			padding: 0.35rem 0.75rem;
		}
	}

	@media (max-width: 768px) {
		.hero-banner-media {
			max-height: none;
			aspect-ratio: 16 / 9;
		}
	}

	@media (max-width: 600px) {
		.hero-actions {
			flex-direction: column;
			width: 100%;
		}

		.hero-actions .btn {
			width: 100%;
		}

		.hero-banner-pills {
			display: none;
		}
	}
</style>
