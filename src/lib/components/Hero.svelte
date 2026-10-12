<script lang="ts">
	import { asset } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let hero = $derived(currentContent.hero);
</script>

<section id="hero" class="hero-section">
	<!-- Full-width Edge-to-Edge Hero Banner showcasing the emergency vehicle & specialist -->
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
		min-height: clamp(440px, 58vh, 760px);
		max-height: 820px;
		display: flex;
		align-items: center;
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
		object-position: center 22%;
		display: block;
		opacity: 1;
		filter: contrast(1.05) saturate(1.08);
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-banner-full:hover .hero-banner-img {
		transform: scale(1.015);
	}

	@media (min-width: 1600px) {
		.hero-banner-full {
			min-height: clamp(520px, 64vh, 880px);
			max-height: 920px;
		}
		.hero-banner-img {
			object-position: center 20%;
		}
	}

	@media (max-width: 1024px) {
		.hero-banner-full {
			min-height: clamp(380px, 50vh, 600px);
			max-height: 640px;
		}
		.hero-banner-img {
			object-position: center 26%;
		}
	}

	@media (max-width: 640px) {
		.hero-banner-full {
			min-height: 320px;
			max-height: 440px;
		}
		.hero-banner-img {
			object-position: 20% 32%;
		}
	}
</style>
