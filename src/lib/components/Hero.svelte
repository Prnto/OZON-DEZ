<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { Calculator, Lightning } from 'phosphor-svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let hero = $derived(currentContent.hero);
</script>

<section id="hero" class="hero-section">
	<!-- Full-width Edge-to-Edge Hero Banner with Matte Overlay & Clear Branding -->
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

		<div class="hero-banner-content container">
			<div class="hero-text-block">
				<div class="hero-badge">
					{#if langState.current === 'ua'}
						<span class="hero-brand-name">ТОВ «<span class="brand-ozon">ОЗОН</span><span class="brand-sep">-</span><span class="brand-dez">ДЕЗ</span>»</span>
						<span class="hero-badge-divider">•</span>
						<span>СЛУЖБА САНІТАРНОЇ БЕЗПЕКИ</span>
					{:else if langState.current === 'ru'}
						<span class="hero-brand-name">ООО «<span class="brand-ozon">ОЗОН</span><span class="brand-sep">-</span><span class="brand-dez">ДЕЗ</span>»</span>
						<span class="hero-badge-divider">•</span>
						<span>СЛУЖБА САНИТАРНОЙ БЕЗОПАСНОСТИ</span>
					{:else}
						<span class="hero-brand-name">LLC «<span class="brand-ozon">OZON</span><span class="brand-sep">-</span><span class="brand-dez">DEZ</span>»</span>
						<span class="hero-badge-divider">•</span>
						<span>SANITARY DEFENSE SERVICE</span>
					{/if}
				</div>

				<h1 class="hero-main-title">
					{#if langState.current === 'ua'}
						Дезінсекція • Дератизація • Дезінфекція
					{:else if langState.current === 'ru'}
						Дезинсекция • Дератизация • Дезинфекция
					{:else}
						Disinsection • Deratization • Disinfection
					{/if}
				</h1>

				<p class="hero-main-desc">
					{#if langState.current === 'ua'}
						Професійне знищення комах, гризунів, вірусів та неприємних запахів у Чорноморську, Одесі та області. Робота за договором із гарантією результату.
					{:else if langState.current === 'ru'}
						Профессиональное уничтожение насекомых, грызунов, вирусов и неприятных запахов в Черноморске, Одессе и области. Работа по договору с гарантией результата.
					{:else}
						Professional extermination of insects, rodents, viruses, and odors across Chornomorsk, Odesa, and region. Certified service with official warranty.
					{/if}
				</p>

				<div class="hero-cta-group">
					<a href={resolve('/calculator')} class="btn btn-primary hero-btn-main" data-testid="hero-calc-cta">
						<Calculator size={16} weight="bold" />
						<span>
							{#if langState.current === 'ua'}
								Розрахувати вартість
							{:else if langState.current === 'ru'}
								Рассчитать стоимость
							{:else}
								Calculate Cost
							{/if}
						</span>
					</a>
					<button
						type="button"
						class="btn btn-secondary hero-btn-sub"
						onclick={() => orderModal.open({ serviceTitle: currentContent.nav.callBtn })}
						data-testid="hero-call-cta"
					>
						<Lightning size={16} weight="fill" />
						<span>
							{#if langState.current === 'ua'}
								Викликати спеціаліста
							{:else if langState.current === 'ru'}
								Вызвать специалиста
							{:else}
								Call Specialist
							{/if}
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		z-index: 1;
		background: #000000;
		padding: 0;
		overflow: hidden;
	}

	:global(html[data-theme="light"]) .hero-section {
		background: transparent;
	}

	/* Edge-to-edge banner with balanced height (similar to services page header) */
	.hero-banner-full {
		position: relative;
		width: 100%;
		min-height: clamp(340px, 46vh, 480px);
		max-height: 520px;
		display: flex;
		align-items: center;
		overflow: hidden;
		border-bottom: 1px solid var(--border-subtle);
		background: #000000;
	}

	.hero-banner-media {
		position: absolute;
		inset: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #000000;
	}

	.hero-banner-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 36%;
		display: block;
		opacity: 0.95;
		filter: contrast(1.05) saturate(1.08);
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-banner-full:hover .hero-banner-img {
		transform: scale(1.015);
	}

	/* Dark cinematic overlay ensuring crisp photo and high contrast typography in both themes */
	.hero-banner-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(90deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.52) 48%, rgba(0, 0, 0, 0.15) 100%),
			linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 45%);
		pointer-events: none;
	}

	/* Content container floating over banner */
	.hero-banner-content {
		position: relative;
		z-index: 2;
		width: 100%;
		padding-top: clamp(2.5rem, 5vh, 3.5rem);
		padding-bottom: clamp(2.5rem, 5vh, 3.5rem);
	}

	.hero-text-block {
		max-width: 680px;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.35rem 0.95rem;
		border-radius: var(--radius-full);
		background: rgba(15, 23, 42, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.22);
		color: #ffffff;
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		margin-bottom: 0.85rem;
		backdrop-filter: blur(8px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
	}

	.hero-brand-name {
		font-weight: 800;
		font-size: 0.98rem;
		letter-spacing: -0.01em;
	}

	.hero-brand-name .brand-ozon {
		color: #00E640;
		font-weight: 800;
	}

	.hero-brand-name .brand-sep {
		color: #FFA000;
		margin: 0 1.5px;
		font-weight: 800;
	}

	.hero-brand-name .brand-dez {
		color: #008F45;
		font-weight: 800;
	}

	.hero-badge-divider {
		color: rgba(255, 255, 255, 0.35);
		font-size: 0.75rem;
	}

	.hero-main-title {
		font-size: clamp(1.65rem, 3.2vw, 2.45rem);
		font-weight: 600;
		line-height: 1.2;
		letter-spacing: -0.03em;
		color: #ffffff !important;
		margin-bottom: 0.75rem;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6) !important;
	}

	.hero-main-desc {
		font-size: clamp(0.92rem, 1.3vw, 1.05rem);
		line-height: 1.55;
		color: #f1f5f9 !important;
		font-weight: 400;
		margin-bottom: 1.5rem;
		max-width: 580px;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5) !important;
	}

	.hero-btn-sub {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		font-size: 0.92rem;
		border-radius: var(--radius-full);
		background: rgba(255, 255, 255, 0.12) !important;
		border: 1px solid rgba(255, 255, 255, 0.28) !important;
		color: #ffffff !important;
		backdrop-filter: blur(8px);
	}

	.hero-btn-sub:hover {
		background: rgba(255, 255, 255, 0.22) !important;
		border-color: rgba(255, 255, 255, 0.5) !important;
		color: #ffffff !important;
		transform: translateY(-2px);
	}

	.hero-cta-group {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		flex-wrap: wrap;
	}

	.hero-btn-main {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.6rem;
		font-size: 0.92rem;
		font-weight: 600;
		border-radius: var(--radius-full);
	}

	.hero-btn-sub {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		font-size: 0.92rem;
		border-radius: var(--radius-full);
	}

	@media (max-width: 640px) {
		.hero-banner-full {
			min-height: 380px;
		}
		.hero-text-block {
			max-width: 100%;
		}
		.hero-cta-group {
			width: 100%;
		}
		.hero-btn-main,
		.hero-btn-sub {
			width: 100%;
			justify-content: center;
		}
	}
</style>
