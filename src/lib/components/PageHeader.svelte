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
		<!-- Top content: Badge & Title placed neatly at top without clutter -->
		<div class="header-top-block">
			{#if crumbs.length > 0 && !imageSrc}
				<nav class="breadcrumbs" aria-label="Хлібні крихти">
					<a href={resolve('/')} class="crumb-link">
						{#if langState.current === 'ua'}Головна{:else}Главная{/if}
					</a>
					{#each crumbs as crumb, i}
						<span class="crumb-sep">/</span>
						{#if crumb.href && i < crumbs.length - 1}
							<a href={crumb.href} class="crumb-link">{crumb.label}</a>
						{:else}
							<span class="crumb-current">{crumb.label}</span>
						{/if}
					{/each}
				</nav>
			{/if}

			{#if badge}
				<div class="section-badge dark page-header-badge">{badge}</div>
			{/if}

			<h1 class="page-title">{title}</h1>
		</div>

		<!-- Bottom Dock: Subtitle placed at the bottom inside a frosted pill dock so it doesn't cover center content -->
		{#if subtitle}
			<div class="header-bottom-dock">
				<p class="page-subtitle">{subtitle}</p>
			</div>
		{/if}
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

	/* Photographic edge-to-edge banner with balanced cinematic height */
	.page-header-banner.has-bg {
		position: relative;
		min-height: clamp(340px, 46vh, 490px);
		max-height: 540px;
		display: flex;
		align-items: stretch;
		overflow: hidden;
		background: #000000;
		padding: 0;
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
		object-position: center 32%;
		display: block;
		opacity: 0.96;
		filter: contrast(1.05) saturate(1.06);
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.page-header-banner.has-bg:hover .bg-img {
		transform: scale(1.015);
	}

	/* Dual gradient overlay: subtle top vignette for title, subtle bottom vignette for dock, center is transparent */
	.header-bg-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(to top, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.22) 32%, transparent 60%),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.18) 30%, transparent 52%);
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
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-top: clamp(2rem, 4vh, 2.8rem);
		padding-bottom: clamp(1.2rem, 2.5vh, 1.8rem);
	}

	.header-top-block {
		max-width: 780px;
	}

	.page-header-badge {
		margin-bottom: 0.65rem;
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.82rem;
		font-weight: 400;
		color: var(--color-ash-gray);
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.crumb-link {
		color: #cbd5e1 !important;
		transition: color var(--transition-fast);
		text-decoration: none;
	}

	.crumb-link:hover {
		color: #38bdf8 !important;
	}

	.crumb-sep {
		color: rgba(255, 255, 255, 0.4) !important;
	}

	.crumb-current {
		color: #ffffff !important;
		font-weight: 600;
	}

	.page-title {
		font-size: clamp(1.65rem, 3.2vw, 2.45rem);
		color: #ffffff !important;
		font-weight: 700;
		line-height: 1.2;
		margin: 0;
		letter-spacing: -0.025em;
		text-shadow: 0 2px 14px rgba(0, 0, 0, 0.75) !important;
	}

	/* Bottom dock for description */
	.header-bottom-dock {
		display: inline-flex;
		align-items: center;
		max-width: 820px;
		padding: 0.75rem 1.35rem;
		border-radius: var(--radius-lg, 16px);
		background: rgba(10, 15, 26, 0.78);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border: 1px solid rgba(255, 255, 255, 0.16);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
		margin-top: 1.5rem;
	}

	:global(html[data-theme="light"]) .page-header-banner.has-bg .header-bottom-dock,
	:global(html.theme-light) .page-header-banner.has-bg .header-bottom-dock,
	:global(body[data-theme="light"]) .page-header-banner.has-bg .header-bottom-dock,
	:global([data-theme="light"]) .page-header-banner.has-bg .header-bottom-dock {
		background: rgba(255, 255, 255, 0.92) !important;
		border-color: #c9cbbe !important;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
	}

	.page-subtitle {
		font-size: clamp(0.88rem, 1.25vw, 0.98rem);
		color: #f1f5f9 !important;
		font-weight: 400;
		line-height: 1.55;
		margin: 0;
	}

	:global(html[data-theme="light"]) .page-header-banner.has-bg .page-subtitle,
	:global(html.theme-light) .page-header-banner.has-bg .page-subtitle,
	:global(body[data-theme="light"]) .page-header-banner.has-bg .page-subtitle,
	:global([data-theme="light"]) .page-header-banner.has-bg .page-subtitle {
		color: #222f30 !important;
		font-weight: 500;
	}

	/* Fallback styles for banner without imageSrc */
	.page-header-banner:not(.has-bg) .page-header-container {
		justify-content: flex-start;
		padding: 0;
	}

	.page-header-banner:not(.has-bg) .header-bottom-dock {
		background: transparent !important;
		border: none !important;
		box-shadow: none !important;
		backdrop-filter: none !important;
		-webkit-backdrop-filter: none !important;
		padding: 0 !important;
		margin-top: 1rem;
	}

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

	:global(html[data-theme="light"]) .page-header-banner:not(.has-bg) .crumb-link {
		color: #475569 !important;
	}

	:global(html[data-theme="light"]) .page-header-banner:not(.has-bg) .crumb-current {
		color: #0f172a !important;
	}

	:global(html[data-theme="light"]) .page-header-banner:not(.has-bg) .crumb-sep {
		color: #94a3b8 !important;
	}

	@media (max-width: 640px) {
		.page-header-banner.has-bg {
			min-height: 320px;
		}
		.page-header-container {
			padding-top: 1.5rem;
			padding-bottom: 1rem;
		}
		.header-bottom-dock {
			margin-top: 1rem;
			padding: 0.65rem 0.95rem;
			border-radius: var(--radius-md, 12px);
		}
		.page-subtitle {
			font-size: 0.82rem;
			line-height: 1.5;
		}
	}
</style>
