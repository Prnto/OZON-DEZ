<script lang="ts">
	import { asset } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let hero = $derived(currentContent.hero);
</script>

<section id="hero" class="hero-section">
	<!-- Full-width Edge-to-Edge Hero Banner spanning full width like on Services -->
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
				decoding="async"
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
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid var(--border-subtle);
	}

	:global(html[data-theme="light"]) .hero-section {
		background: #000000;
	}

	/* Responsive edge-to-edge banner spanning full width like on Services */
	.hero-banner-full {
		position: relative;
		width: 100%;
		height: clamp(520px, 64vh, 740px);
		max-height: 760px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000000;
		overflow: hidden;
	}

	.hero-banner-media {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000000;
		overflow: hidden;
	}

	.hero-banner-img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
		object-position: center 68%;
		filter: contrast(1.05) saturate(1.08);
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-banner-full:hover .hero-banner-img {
		transform: scale(1.015);
	}

	@media (max-width: 1200px) {
		.hero-banner-full {
			height: clamp(420px, 52vh, 600px);
		}
		.hero-banner-img {
			object-position: center 65%;
		}
	}

	@media (max-width: 768px) {
		.hero-banner-full {
			height: auto;
			aspect-ratio: 16 / 9;
			max-height: 420px;
		}

		.hero-banner-img {
			object-position: center 60%;
		}
	}
</style>
