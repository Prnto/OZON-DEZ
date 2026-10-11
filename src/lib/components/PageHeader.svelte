<script lang="ts">
	import { resolve } from '$app/paths';
	import { langState } from '../state/language.svelte';

	interface Props {
		badge?: string;
		title: string;
		subtitle?: string;
		crumbs?: { label: string; href?: string }[];
		imageSrc?: string;
	}

	let { badge, title, subtitle, crumbs = [], imageSrc }: Props = $props();
</script>

<div class="page-header-banner" class:has-bg={!!imageSrc}>
	{#if imageSrc}
		<div class="header-bg-image">
			<img src={imageSrc} alt="" aria-hidden="true" class="bg-img" loading="eager" />
		</div>
		<div class="header-bg-overlay" aria-hidden="true"></div>
	{/if}
	<div class="header-glow" aria-hidden="true"></div>
	<div class="container page-header-container">
		<div class="header-content-wrap">
			{#if badge}
				<div class="section-badge dark page-header-badge">{badge}</div>
			{/if}

			<h1 class="page-title">{title}</h1>

			{#if subtitle}
				<p class="page-subtitle">{subtitle}</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.page-header-banner {
		position: relative;
		padding: 4rem 0 3.5rem;
		background: transparent;
		overflow: hidden;
		border-bottom: 1px solid var(--border-subtle);
	}

	/* Photographic edge-to-edge banner with balanced height */
	.page-header-banner.has-bg {
		position: relative;
		min-height: clamp(320px, 42vh, 460px);
		display: flex;
		align-items: center;
		overflow: hidden;
		background: #000000;
		padding: clamp(3.5rem, 6vh, 5rem) 0;
	}

	.header-bg-image {
		position: absolute;
		inset: 0;
		z-index: 0;
		background: #000000;
	}

	.bg-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 34%;
		display: block;
		opacity: 0.95;
		filter: contrast(1.05) saturate(1.08);
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.page-header-banner.has-bg:hover .bg-img {
		transform: scale(1.015);
	}

	/* Transparent, non-blocking overlay: subtle cinematic dark vignette so text is crisp while the entire image remains vibrant and visible */
	.header-bg-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.42) 50%, rgba(0, 0, 0, 0.15) 100%),
			linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, transparent 40%);
		pointer-events: none;
	}

	.header-glow {
		position: absolute;
		top: -120px;
		right: 15%;
		width: 450px;
		height: 450px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(0, 230, 64, 0.08), transparent 70%);
		pointer-events: none;
		z-index: 2;
	}

	:global(html[data-theme="light"]) .header-glow {
		background: radial-gradient(circle, rgba(0, 143, 69, 0.06), transparent 70%);
	}

	.page-header-container {
		position: relative;
		z-index: 3;
		width: 100%;
	}

	.header-content-wrap {
		max-width: 820px;
	}

	.page-header-badge {
		margin-bottom: 0.75rem;
	}

	.page-title {
		font-size: clamp(1.85rem, 3.6vw, 2.75rem);
		color: #ffffff !important;
		font-weight: 700;
		line-height: 1.2;
		margin: 0 0 0.85rem 0;
		letter-spacing: -0.03em;
		text-shadow: 0 2px 14px rgba(0, 0, 0, 0.85) !important;
	}

	/* Subtitle directly over banner: NO grey background, NO rounding, banner 100% visible beneath */
	.page-subtitle {
		font-size: clamp(0.95rem, 1.35vw, 1.1rem);
		color: #f1f5f9 !important;
		font-weight: 400;
		line-height: 1.6;
		margin: 0;
		max-width: 780px;
		background: transparent !important;
		border: none !important;
		border-radius: 0 !important;
		box-shadow: none !important;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.85) !important;
	}

	:global(html[data-theme="light"]) .page-header-banner.has-bg .page-title {
		color: #ffffff !important;
		text-shadow: 0 2px 14px rgba(0, 0, 0, 0.9) !important;
	}

	:global(html[data-theme="light"]) .page-header-banner.has-bg .page-subtitle {
		color: #f8fafc !important;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.9) !important;
	}

	/* Fallback styles for banner without imageSrc */
	.page-header-banner:not(.has-bg) .page-title {
		font-size: clamp(2rem, 3.8vw, 3.2rem);
	}

	:global(html[data-theme="light"]) .page-header-banner:not(.has-bg) .page-title {
		color: #0f172a !important;
		text-shadow: none !important;
	}

	:global(html[data-theme="light"]) .page-header-banner:not(.has-bg) .page-subtitle {
		color: #475569 !important;
		text-shadow: none !important;
	}

	@media (max-width: 640px) {
		.page-header-banner.has-bg {
			min-height: 280px;
			padding: 2.5rem 0;
		}
		.page-title {
			font-size: 1.65rem;
			margin-bottom: 0.6rem;
		}
		.page-subtitle {
			font-size: 0.88rem;
			line-height: 1.5;
		}
	}
</style>
