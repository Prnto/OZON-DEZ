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
	<!-- Full-width Edge-to-Edge Hero Banner with Clean Cinematic Visual & Action Dock -->
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

		<!-- Action Dock: placed at the bottom without obscuring car, roof siren, or technician -->
		<div class="hero-dock-wrap container">
			<div class="hero-action-dock" data-testid="hero-action-dock">
				<a href={resolve('/calculator')} class="btn btn-primary hero-dock-btn" data-testid="hero-calc-cta">
					<Calculator size={18} weight="bold" />
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
					class="btn btn-secondary hero-dock-btn"
					onclick={() => orderModal.open({ serviceTitle: currentContent.nav.callBtn })}
					data-testid="hero-call-cta"
				>
					<Lightning size={18} weight="fill" />
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

	/* Edge-to-edge banner with balanced cinematic height */
	.hero-banner-full {
		position: relative;
		width: 100%;
		min-height: clamp(340px, 46vh, 520px);
		max-height: 560px;
		display: flex;
		align-items: flex-end;
		justify-content: center;
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
		object-position: center 38%;
		display: block;
		opacity: 0.98;
		filter: contrast(1.05) saturate(1.06);
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-banner-full:hover .hero-banner-img {
		transform: scale(1.015);
	}

	/* Subtle bottom and top gradients: keeps photo bright and crisp while providing readability */
	.hero-banner-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.2) 30%, transparent 60%),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, transparent 20%);
		pointer-events: none;
	}

	/* Action Dock Wrapper at the bottom of the banner */
	.hero-dock-wrap {
		position: relative;
		z-index: 2;
		width: 100%;
		padding-bottom: clamp(1.2rem, 3vh, 2rem);
		display: flex;
		justify-content: flex-start;
	}

	.hero-action-dock {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.45rem 0.65rem;
		border-radius: var(--radius-full);
		background: rgba(11, 15, 25, 0.75);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border: 1px solid rgba(255, 255, 255, 0.18);
		box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
	}

	:global(html[data-theme="light"]) .hero-action-dock,
	:global(html.theme-light) .hero-action-dock,
	:global(body[data-theme="light"]) .hero-action-dock,
	:global([data-theme="light"]) .hero-action-dock {
		background: rgba(255, 255, 255, 0.9) !important;
		border-color: #c9cbbe !important;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
	}

	.hero-dock-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.7rem 1.45rem;
		font-size: 0.9rem;
		font-weight: 600;
		border-radius: var(--radius-full);
		white-space: nowrap;
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.hero-dock-btn.btn-secondary {
		background: rgba(255, 255, 255, 0.12) !important;
		border: 1px solid rgba(255, 255, 255, 0.28) !important;
		color: #ffffff !important;
	}

	.hero-dock-btn.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.24) !important;
		border-color: rgba(255, 255, 255, 0.5) !important;
		color: #ffffff !important;
		transform: translateY(-2px);
	}

	:global(html[data-theme="light"]) .hero-dock-btn.btn-secondary,
	:global(html.theme-light) .hero-dock-btn.btn-secondary,
	:global(body[data-theme="light"]) .hero-dock-btn.btn-secondary,
	:global([data-theme="light"]) .hero-dock-btn.btn-secondary {
		background: #f1f5f9 !important;
		border-color: #cbd5e1 !important;
		color: #0f172a !important;
	}

	:global(html[data-theme="light"]) .hero-dock-btn.btn-secondary:hover,
	:global(html.theme-light) .hero-dock-btn.btn-secondary:hover,
	:global(body[data-theme="light"]) .hero-dock-btn.btn-secondary:hover,
	:global([data-theme="light"]) .hero-dock-btn.btn-secondary:hover {
		background: #e2e8f0 !important;
		border-color: #94a3b8 !important;
		color: #0f172a !important;
	}

	@media (max-width: 640px) {
		.hero-banner-full {
			min-height: 320px;
		}
		.hero-dock-wrap {
			justify-content: center;
			padding-bottom: 1rem;
		}
		.hero-action-dock {
			flex-direction: column;
			width: 100%;
			max-width: 360px;
			padding: 0.5rem;
			border-radius: var(--radius-lg, 16px);
			gap: 0.5rem;
		}
		.hero-dock-btn {
			width: 100%;
			justify-content: center;
			padding: 0.65rem 1rem;
			font-size: 0.86rem;
		}
	}
</style>
