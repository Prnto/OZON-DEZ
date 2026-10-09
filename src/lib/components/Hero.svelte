<script lang="ts">
	import { asset } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let hero = $derived(currentContent.hero);
</script>

<section id="hero" class="hero-section">
	<!-- Semantic accessible H1 for SEO -->
	<h1 class="sr-only">{hero.titleMain} {hero.titleHighlight} — {currentContent.companyName}</h1>

	<!-- Full-width Hero Visual Banner (stretched edge-to-edge, fully adaptive without text/car cropping) -->
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

	/* Full-width Hero Banner (Stretched edge-to-edge across screen, zero cropping) */
	.hero-banner-full {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-bottom: 1px solid var(--border-subtle);
		background: #000000;
	}

	.hero-banner-media {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: #000000;
	}

	.hero-banner-img {
		width: 100%;
		height: auto;
		max-height: 85vh;
		aspect-ratio: 1376 / 768;
		object-fit: contain;
		display: block;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-banner-full:hover .hero-banner-img {
		transform: scale(1.008);
	}

	.hero-banner-overlay {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.2) 0%,
				transparent 15%,
				transparent 85%,
				rgba(0, 0, 0, 0.45) 100%
			);
		pointer-events: none;
	}

	:global(html[data-theme="light"]) .hero-banner-overlay {
		background:
			linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.1) 0%,
				transparent 15%,
				transparent 85%,
				rgba(15, 23, 42, 0.25) 100%
			);
	}
</style>
