<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	interface Props {
		variant?: 'light' | 'dark';
		showTagline?: boolean;
	}

	let { variant = 'dark', showTagline = true }: Props = $props();
	let currentContent = $derived(contentMap[langState.current]);
</script>

<a href="/" class="logo-wrapper" class:is-light={variant === 'light'}>
	<div class="logo-icon">
		<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="44" height="44" rx="12" fill="url(#shieldGrad)" />
			<!-- Shield Outline -->
			<path
				d="M22 7C16.5 7 11 9.8 11 9.8V23.5C11 31.8 17.9 36.6 22 38C26.1 36.6 33 31.8 33 23.5V9.8C33 9.8 27.5 7 22 7Z"
				fill="#071b34"
				stroke="url(#accentGrad)"
				stroke-width="1.8"
			/>
			<!-- Ozone O3 Symbol -->
			<circle cx="22" cy="19.5" r="5.8" stroke="url(#accentGrad)" stroke-width="2" fill="none" />
			<path
				d="M29.5 26.5C30.4 26.5 31.2 27.3 31.2 28.2C31.2 29.1 30.4 29.8 29.5 29.8C28.6 29.8 28 29.1 28 28.2"
				stroke="#00d4aa"
				stroke-width="1.4"
				stroke-linecap="round"
			/>
			<!-- Small satellite ozone atoms -->
			<circle cx="15.5" cy="17" r="2" fill="#00d4aa" />
			<circle cx="28.5" cy="17" r="2" fill="#00d4aa" />
			<path d="M16.8 17.8L19.2 18.8" stroke="#00d4aa" stroke-width="1.2" />
			<path d="M27.2 17.8L24.8 18.8" stroke="#00d4aa" stroke-width="1.2" />

			<defs>
				<linearGradient id="shieldGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stop-color="#0f3567" />
					<stop offset="100%" stop-color="#06152b" />
				</linearGradient>
				<linearGradient id="accentGrad" x1="11" y1="7" x2="33" y2="38" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stop-color="#00f5d4" />
					<stop offset="100%" stop-color="#00b4d8" />
				</linearGradient>
			</defs>
		</svg>
	</div>

	<div class="logo-text">
		<div class="brand-name">
			<span class="brand-ozon">ОЗОН</span><span class="brand-sep">-</span><span class="brand-dez">ДЕЗ</span>
		</div>
		{#if showTagline}
			<div class="brand-sub">{currentContent.taglineShort}</div>
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
		width: 44px;
		height: 44px;
		flex-shrink: 0;
		filter: drop-shadow(0 2px 8px rgba(0, 212, 170, 0.25));
	}

	.logo-icon svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.logo-text {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		white-space: nowrap;
	}

	.brand-name {
		font-family: var(--font-heading);
		font-size: 1.45rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.1;
		color: var(--primary-950);
		white-space: nowrap;
	}

	.is-light .brand-name {
		color: #ffffff;
	}

	.brand-ozon {
		color: var(--primary-900);
		background: linear-gradient(135deg, #092042 0%, #174b8f 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.is-light .brand-ozon {
		background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.brand-sep {
		color: var(--accent-teal);
		margin: 0 1px;
	}

	.brand-dez {
		color: #00b4d8;
		background: linear-gradient(135deg, #00d4aa 0%, #0096c7 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.brand-sub {
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--text-muted);
		margin-top: 1px;
	}

	.is-light .brand-sub {
		color: rgba(255, 255, 255, 0.65);
	}
</style>
