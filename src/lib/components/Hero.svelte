<script lang="ts">
	import { resolve } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);

	function handleChipClick(chipText: string) {
		orderModal.open({ serviceTitle: chipText });
	}
</script>

<section id="hero" class="hero-section">
	<div class="container hero-container">
		<div class="hero-content">
			<!-- Saffron Spark Kicker Label from Design_2.md -->
			<div class="hero-kicker">
				<span class="kicker-spark">✦</span>
				<span class="kicker-text">ОФІЦІЙНА СЛУЖБА • ЧОРНОМОРСЬК ТА ОДЕСА</span>
				<span class="kicker-badge">15 РОКІВ</span>
			</div>

			<!-- Sculptural Display Headline (Weight 400, Negative Tracking) -->
			<h1 class="hero-title">
				{currentContent.hero.titleMain}
				<span class="hero-title-accent">{currentContent.hero.titleHighlight}</span>
			</h1>

			<!-- Ultra-light Airy Body Copy from Design_2.md -->
			<p class="hero-body">
				{currentContent.hero.subtitle}
			</p>

			<!-- Quick Pains / Problem Chips -->
			<div class="hero-chips-wrap">
				<span class="chips-label">{currentContent.hero.quickPainsLabel}</span>
				<div class="chips-list">
					{#each currentContent.hero.quickPains as pain}
						<button
							type="button"
							class="pain-chip"
							onclick={() => handleChipClick(pain)}
						>
							<span class="chip-dot"></span>
							{pain}
						</button>
					{/each}
				</div>
			</div>

			<!-- Actions: Electric Iris Pill Button + Secondary Ghost Button -->
			<div class="hero-actions">
				<a href={resolve('/calculator')} class="btn btn-primary btn-lg">
					<span>{currentContent.hero.ctaPrimary}</span>
					<span class="btn-arrow-symbol">↗</span>
				</a>
				<a
					href="tel:+380508797335"
					class="btn btn-secondary btn-lg"
				>
					<span>📞 {currentContent.hero.ctaSecondary}</span>
				</a>
			</div>

			<!-- Minimalist Trust Row -->
			<div class="hero-trust-row">
				<div class="trust-item">
					<span class="trust-val">{currentContent.hero.stats.stat1Val}</span>
					<span class="trust-lbl">{currentContent.hero.stats.stat1Label}</span>
				</div>
				<div class="trust-divider"></div>
				<div class="trust-item">
					<span class="trust-val">{currentContent.hero.stats.stat2Val}</span>
					<span class="trust-lbl">{currentContent.hero.stats.stat2Sub}</span>
				</div>
				<div class="trust-divider"></div>
				<div class="trust-item">
					<span class="trust-val">{currentContent.hero.stats.stat3Val}</span>
					<span class="trust-lbl">{currentContent.hero.stats.stat3Sub}</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		z-index: 1;
		background-color: transparent;
		padding: clamp(3.5rem, 6vh, 5.5rem) 0 clamp(4rem, 7vh, 6rem);
		overflow: hidden;
		min-height: calc(100vh - 80px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-container {
		width: 100%;
		max-width: 980px;
		margin: 0 auto;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		z-index: 2;
	}

	.hero-kicker {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.4rem 1rem;
		border-radius: var(--radius-tags);
		background: rgba(255, 184, 41, 0.08);
		border: 1px solid var(--color-saffron-border);
		color: var(--color-saffron-spark);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-bottom: 1.6rem;
	}

	.kicker-spark {
		color: var(--color-saffron-spark);
		font-size: 13px;
	}

	.kicker-badge {
		padding: 0.15rem 0.5rem;
		background: rgba(255, 184, 41, 0.2);
		border-radius: var(--radius-tags);
		color: #ffffff;
		font-size: 11px;
		letter-spacing: 0.05em;
	}

	.hero-title {
		font-size: clamp(2.4rem, 4.8vw, 4.4rem);
		font-weight: 400;
		line-height: 1.08;
		letter-spacing: -0.04em;
		color: var(--color-bone-white);
		margin-bottom: 1.4rem;
		max-width: 900px;
	}

	.hero-title-accent {
		color: #bfa6ff;
		display: block;
	}

	.hero-body {
		font-size: clamp(1.05rem, 1.4vw, 1.22rem);
		font-weight: 300;
		line-height: 1.65;
		color: var(--color-ash-gray);
		max-width: 740px;
		margin-bottom: 2rem;
	}

	/* Chips */
	.hero-chips-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.65rem;
		margin-bottom: 2.2rem;
	}

	.chips-label {
		display: block;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-ash-gray);
		font-weight: 500;
	}

	.chips-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.55rem;
		max-width: 760px;
	}

	.pain-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.45rem 1rem;
		border-radius: var(--radius-tags);
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		color: var(--color-silver-mist);
		font-size: 13px;
		font-weight: 400;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.chip-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-electric-iris);
	}

	.pain-chip:hover {
		border-color: var(--color-saffron-spark);
		color: var(--color-bone-white);
		background: var(--color-surface-hover);
		transform: translateY(-1px);
	}

	/* Actions */
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2.8rem;
	}

	.btn-arrow-symbol {
		font-size: 16px;
		margin-left: 0.2rem;
	}

	/* Trust Row */
	.hero-trust-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(1rem, 3vw, 2.5rem);
		padding-top: 1.8rem;
		border-top: 1px solid var(--color-void-border);
		width: 100%;
		max-width: 680px;
	}

	.trust-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.trust-val {
		font-size: 1.4rem;
		font-weight: 400;
		color: var(--color-bone-white);
		letter-spacing: -0.03em;
		font-family: var(--font-heading);
	}

	.trust-lbl {
		font-size: 12px;
		color: var(--color-ash-gray);
		margin-top: 0.2rem;
		font-weight: 300;
	}

	.trust-divider {
		width: 1px;
		height: 32px;
		background: var(--color-void-border);
	}

	@media (max-width: 640px) {
		.hero-trust-row {
			flex-direction: column;
			gap: 1.2rem;
		}

		.trust-divider {
			width: 60px;
			height: 1px;
		}

		.hero-actions {
			flex-direction: column;
			width: 100%;
			max-width: 340px;
		}

		.hero-actions .btn {
			width: 100%;
			justify-content: center;
		}
	}

	/* Light Mode Adjustments */
	:global(html[data-theme="light"]) .hero-title-accent {
		color: #6d3ef7;
	}

	:global(html[data-theme="light"]) .pain-chip {
		background: #ffffff;
		border-color: rgba(15, 23, 42, 0.1);
		color: #334155;
	}

	:global(html[data-theme="light"]) .pain-chip:hover {
		background: #f1f5f9;
		border-color: var(--color-saffron-spark);
		color: #0f172a;
	}
</style>
