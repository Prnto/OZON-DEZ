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
		padding: 3.5rem 0 3rem;
		background: linear-gradient(135deg, #071933 0%, #0d2e5a 100%);
		overflow: hidden;
		border-bottom: 1px solid rgba(0, 212, 170, 0.2);
	}

	.page-header-banner.has-bg {
		padding: clamp(4.5rem, 7vh, 6rem) 0 clamp(3.5rem, 6vh, 4.5rem);
		min-height: clamp(320px, 42vh, 440px);
		display: flex;
		align-items: center;
	}

	.header-bg-image {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.bg-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 30%;
		display: block;
	}

	.header-bg-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(90deg, rgba(5, 18, 38, 0.92) 0%, rgba(7, 24, 52, 0.78) 45%, rgba(7, 24, 52, 0.40) 80%, rgba(5, 18, 38, 0.55) 100%),
			linear-gradient(to top, rgba(5, 18, 38, 0.90) 0%, transparent 35%);
	}

	.header-glow {
		position: absolute;
		top: -100px;
		right: 10%;
		width: 400px;
		height: 400px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(0, 212, 170, 0.25), transparent 70%);
		pointer-events: none;
		z-index: 2;
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
		font-size: 0.84rem;
		font-weight: 600;
		color: #94a3b8;
		margin-bottom: 1.25rem;
		flex-wrap: wrap;
	}

	.crumb-link {
		color: #cbd5e1;
		transition: color var(--transition-fast);
		text-decoration: none;
	}

	.crumb-link:hover {
		color: var(--accent-teal);
	}

	.crumb-sep {
		color: rgba(255, 255, 255, 0.3);
	}

	.crumb-current {
		color: var(--accent-teal);
	}

	.page-title {
		font-size: clamp(2rem, 3.5vw, 3rem);
		color: #ffffff;
		line-height: 1.2;
		margin-bottom: 0.8rem;
		letter-spacing: -0.02em;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	.page-subtitle {
		font-size: clamp(1rem, 1.6vw, 1.18rem);
		color: #cbd5e1;
		max-width: 820px;
		line-height: 1.6;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
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
