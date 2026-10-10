<script lang="ts">
	import { resolve } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	interface Props {
		variant?: 'light' | 'dark';
		showTagline?: boolean;
	}

	let { variant = 'dark', showTagline = true }: Props = $props();
	let currentContent = $derived(contentMap[langState.current]);
</script>

<a href={resolve('/')} class="logo-wrapper">
	<div class="logo-icon">
		<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
			<!-- Geometric Sharp-Edged Shield from Design_2.md -->
			<rect class="logo-shield-rect" width="44" height="44" rx="12" fill="#090909" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
			<!-- Triangular Core Particle in #8052ff -> #15846e -->
			<path
				d="M22 10L33 29H11L22 10Z"
				fill="url(#irisTealGrad)"
				stroke="rgba(255, 255, 255, 0.2)"
				stroke-width="1.2"
			/>
			<!-- Central O3 Core Atom -->
			<circle cx="22" cy="22.5" r="4" fill="#ffffff" />
			<!-- Micro Satellite Points -->
			<circle cx="16" cy="26" r="1.8" fill="#ffb829" />
			<circle cx="28" cy="26" r="1.8" fill="#15846e" />

			<defs>
				<linearGradient id="irisTealGrad" x1="11" y1="10" x2="33" y2="29" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stop-color="#8052ff" />
					<stop offset="100%" stop-color="#15846e" />
				</linearGradient>
			</defs>
		</svg>
	</div>

	<div class="logo-text">
		<div class="brand-name">
			<span class="brand-ozon">ОЗОН</span><span class="brand-sep">-</span><span class="brand-dez">ДЕЗ</span>
		</div>
		{#if showTagline}
			<div class="brand-sub">САНІТАРНА СЛУЖБА • 15 РОКІВ</div>
		{/if}
	</div>
</a>

<style>
	.logo-wrapper {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		text-decoration: none;
		user-select: none;
		flex-shrink: 0;
		white-space: nowrap;
		transition: transform var(--transition-fast);
	}

	.logo-wrapper:hover {
		transform: translateY(-1px);
	}

	.logo-icon {
		width: 42px;
		height: 42px;
		flex-shrink: 0;
	}

	.logo-icon svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.logo-shield-rect {
		fill: #090909;
		stroke: rgba(255, 255, 255, 0.1);
		transition: fill var(--transition-fast), stroke var(--transition-fast);
	}

	:global(html[data-theme="light"]) .logo-shield-rect {
		fill: #ffffff;
		stroke: rgba(15, 23, 42, 0.12);
	}

	.logo-text {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		white-space: nowrap;
	}

	.brand-name {
		font-family: var(--font-heading);
		font-size: 1.35rem;
		font-weight: 500;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--color-bone-white);
		white-space: nowrap;
	}

	.brand-ozon {
		color: var(--color-bone-white);
	}

	.brand-sep {
		color: var(--color-saffron-spark);
		margin: 0 1px;
	}

	.brand-dez {
		color: #bfa6ff;
	}

	:global(html[data-theme="light"]) .brand-name,
	:global(html.theme-light) .brand-name,
	:global(body[data-theme="light"]) .brand-name,
	:global([data-theme="light"]) .brand-name,
	:global(html[data-theme="light"]) .brand-ozon,
	:global(html.theme-light) .brand-ozon,
	:global(body[data-theme="light"]) .brand-ozon,
	:global([data-theme="light"]) .brand-ozon {
		color: #0f172a !important;
	}

	:global(html[data-theme="light"]) .brand-dez,
	:global(html.theme-light) .brand-dez,
	:global(body[data-theme="light"]) .brand-dez,
	:global([data-theme="light"]) .brand-dez {
		color: #0284c7 !important;
	}

	.brand-sub {
		font-size: 0.65rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		color: var(--color-ash-gray);
		text-transform: uppercase;
		margin-top: 1px;
	}

	:global(html[data-theme="light"]) .brand-sub,
	:global(html.theme-light) .brand-sub,
	:global(body[data-theme="light"]) .brand-sub,
	:global([data-theme="light"]) .brand-sub {
		color: #64748b !important;
	}

	@media (max-width: 1360px) and (min-width: 1240px) {
		.brand-sub {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.logo-wrapper {
			gap: 0.6rem;
		}
		.logo-icon {
			width: 36px;
			height: 36px;
		}
		.brand-name {
			font-size: 1.2rem;
		}
		.brand-sub {
			display: none;
		}
	}
</style>
