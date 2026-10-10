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
		<div class="header-bg-overlay"></div>
	{/if}
	<div class="header-glow"></div>
	<div class="container page-header-container">
		<!-- Breadcrumbs -->
		{#if crumbs.length > 0}
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
			<div class="section-badge dark">{badge}</div>
		{/if}

		<h1 class="page-title">{title}</h1>

		{#if subtitle}
			<p class="page-subtitle">{subtitle}</p>
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

	.page-header-banner.has-bg {
		padding: clamp(4.5rem, 7vh, 6rem) 0 clamp(3.5rem, 6vh, 4.5rem);
		min-height: clamp(300px, 38vh, 420px);
		display: flex;
		align-items: center;
		background: #0b0f19;
	}

	.header-bg-image {
		position: absolute;
		inset: 0;
		z-index: 0;
		background: #0b0f19;
	}

	.bg-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 30%;
		display: block;
		opacity: 0.92;
		filter: contrast(1.05) saturate(1.08);
	}

	.header-bg-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.48) 55%, rgba(0, 0, 0, 0.15) 100%),
			linear-gradient(to top, rgba(0, 0, 0, 0.35) 0%, transparent 40%);
		pointer-events: none;
	}

	.header-glow {
		position: absolute;
		top: -120px;
		right: 15%;
		width: 450px;
		height: 450px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(128, 82, 255, 0.12), transparent 70%);
		pointer-events: none;
		z-index: 2;
	}

	:global(html[data-theme="light"]) .header-glow {
		background: radial-gradient(circle, rgba(2, 132, 199, 0.08), transparent 70%);
	}

	.page-header-container {
		position: relative;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.82rem;
		font-weight: 400;
		color: var(--color-ash-gray);
		margin-bottom: 1.25rem;
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
		font-size: clamp(2.2rem, 4vw, 3.5rem);
		color: #ffffff !important;
		font-weight: 500;
		line-height: 1.15;
		margin-bottom: 0.8rem;
		letter-spacing: -0.04em;
		text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6) !important;
	}

	.page-subtitle {
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		color: #f1f5f9 !important;
		font-weight: 300;
		max-width: 820px;
		line-height: 1.6;
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5) !important;
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

	@media (max-width: 768px) {
		.page-header-banner.has-bg {
			padding: 3.5rem 0 3rem;
			min-height: 220px;
		}
	}

	@media (max-width: 480px) {
		.page-header-banner {
			padding: 2.5rem 0 2rem;
		}
		.page-header-banner.has-bg {
			padding: 2.8rem 0 2.2rem;
			min-height: 190px;
		}
	}
</style>
