<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	interface Props {
		variant?: 'light' | 'dark';
		showTagline?: boolean;
	}

	let { variant = 'dark', showTagline = true }: Props = $props();
	let currentContent = $derived(contentMap[langState.current]);
</script>

<a href={resolve('/')} class="logo-wrapper logo" title="{currentContent.companyName}">
	<div class="logo-image-container">
		{#if langState.current === 'en'}
			<div class="logo-composite-en" aria-label="OZON-DEZ">
				<img
					src="{asset('images/logo-shield-mark.webp')}"
					alt="OZON-DEZ"
					class="logo-shield-mark"
					width="40"
					height="42"
					loading="eager"
				/>
				<span class="logo-text-en">
					<span class="brand-ozon">OZON</span><span class="brand-sep">-</span><span class="brand-dez">DEZ</span>
				</span>
			</div>
		{:else}
			<picture>
				<source srcset="{asset('images/ozon_dez_logo_transparent.webp')}" type="image/webp" />
				<img
					src="{asset('images/ozon_dez_logo_transparent.webp')}"
					alt="{currentContent.companyName}"
					height="48"
					class="logo-graphic"
					style="height: 48px; width: auto; display: block;"
					loading="eager"
				/>
			</picture>
		{/if}
		{#if showTagline}
			<div class="brand-sub">
				{#if langState.current === 'ua'}
					САНІТАРНА СЛУЖБА • 15 РОКІВ
				{:else if langState.current === 'ru'}
					САНИТАРНАЯ СЛУЖБА • 15 ЛЕТ
				{:else}
					SANITARY DEFENSE • 15 YEARS
				{/if}
			</div>
		{/if}
	</div>
</a>

<style>
	.logo-wrapper {
		display: inline-flex;
		align-items: center;
		text-decoration: none;
		user-select: none;
		flex-shrink: 0;
		white-space: nowrap;
		transition: transform var(--transition-fast);
	}

	.logo-wrapper:hover {
		transform: translateY(-1px);
	}

	.logo-image-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}

	.logo-graphic {
		height: 48px;
		width: auto;
		display: block;
		object-fit: contain;
		filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.35));
		transition: transform var(--transition-fast), filter var(--transition-fast);
	}

	.logo-wrapper:hover .logo-graphic {
		transform: scale(1.03);
		filter: drop-shadow(0 0 16px rgba(0, 214, 100, 0.45));
	}

	:global(html[data-theme="light"]) .logo-graphic {
		filter: drop-shadow(0 1px 4px rgba(15, 23, 42, 0.15));
	}

	.brand-sub {
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--color-silver-mist);
		text-transform: uppercase;
		margin-top: 2px;
	}

	:global(html[data-theme="light"]) .brand-sub {
		color: #475569 !important;
	}

	.logo-composite-en {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		height: 48px;
		filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.35));
		transition: transform var(--transition-fast), filter var(--transition-fast);
	}

	.logo-wrapper:hover .logo-composite-en {
		transform: scale(1.03);
		filter: drop-shadow(0 0 16px rgba(0, 214, 100, 0.45));
	}

	.logo-shield-mark {
		height: 42px;
		width: 40px;
		object-fit: contain;
		display: block;
		flex-shrink: 0;
	}

	.logo-text-en {
		font-size: 1.85rem;
		font-weight: 900;
		letter-spacing: -0.01em;
		display: inline-flex;
		align-items: center;
		line-height: 1;
		font-family: inherit;
	}

	.logo-text-en .brand-ozon {
		color: #00E640;
	}

	.logo-text-en .brand-sep {
		color: #f59e0b;
		margin: 0 1px;
	}

	.logo-text-en .brand-dez {
		color: #008F45;
	}

	:global(html[data-theme="light"]) .logo-composite-en {
		filter: drop-shadow(0 1px 4px rgba(15, 23, 42, 0.15));
	}

	:global(html[data-theme="light"]) .logo-text-en .brand-ozon {
		color: #008F45;
	}

	:global(html[data-theme="light"]) .logo-text-en .brand-sep {
		color: #d97706;
	}

	:global(html[data-theme="light"]) .logo-text-en .brand-dez {
		color: #065f46;
	}

	@media (max-width: 1360px) and (min-width: 1240px) {
		.brand-sub {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.logo-graphic {
			height: 38px !important;
		}
		.logo-composite-en {
			height: 38px !important;
			gap: 0.4rem;
		}
		.logo-shield-mark {
			height: 32px !important;
			width: 32px !important;
		}
		.logo-text-en {
			font-size: 1.45rem !important;
		}
		.brand-sub {
			font-size: 0.6rem;
			letter-spacing: 0.08em;
		}
	}
</style>
