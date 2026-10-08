<script lang="ts">
	import { resolve } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';
	import ConstellationCanvas from './ConstellationCanvas.svelte';

	let currentContent = $derived(contentMap[langState.current]);

	function handleChipClick(chipText: string) {
		orderModal.open({ serviceTitle: chipText });
	}
</script>

<section id="hero" class="hero-section">
	<div class="container hero-container">
		<div class="hero-grid">
			<!-- Left Column: Typographic composition on black void -->
			<div class="hero-left">
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
					<button
						type="button"
						class="btn btn-secondary btn-lg"
						onclick={() => orderModal.open({ serviceTitle: currentContent.hero.ctaSecondary })}
					>
						<span>{currentContent.hero.ctaSecondary}</span>
					</button>
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

			<!-- Right Column: Constellation Floating on Black Velvet -->
			<div class="hero-right">
				<div class="constellation-frame">
					<ConstellationCanvas />

					<!-- Floating Molecular / Service Badge on Constellation -->
					<div class="constellation-badge constellation-badge-top">
						<span class="badge-dot-iris"></span>
						<span class="badge-txt">OZONE O₃ & SANITARY TECH</span>
					</div>

					<div class="constellation-badge constellation-badge-bottom">
						<span class="badge-dot-amber"></span>
						<span class="badge-txt">HACCP & ДЕРЖПРОДСПОЖИВСЛУЖБА</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		background-color: var(--color-void);
		padding: clamp(3.5rem, 6vh, 5.5rem) 0 clamp(4rem, 7vh, 6rem);
		overflow: hidden;
		min-height: calc(100vh - 80px);
		display: flex;
		align-items: center;
	}

	.hero-container {
		width: 100%;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: clamp(2rem, 5vw, 4.5rem);
		align-items: center;
	}

	/* Left Column */
	.hero-left {
		display: flex;
		flex-direction: column;
		z-index: 2;
	}

	.hero-kicker {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.35rem 0.85rem;
		border-radius: var(--radius-tags);
		background: rgba(255, 184, 41, 0.08);
		border: 1px solid var(--color-saffron-border);
		color: var(--color-saffron-spark);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-bottom: 1.5rem;
		align-self: flex-start;
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
		font-size: clamp(2.5rem, 4.8vw, 4.6rem);
		font-weight: 400;
		line-height: 1.05;
		letter-spacing: -0.04em;
		color: var(--color-bone-white);
		margin-bottom: 1.35rem;
	}

	.hero-title-accent {
		color: #bfa6ff;
		display: block;
	}

	.hero-body {
		font-size: clamp(1.05rem, 1.4vw, 1.2rem);
		font-weight: 300;
		line-height: 1.6;
		color: var(--color-ash-gray);
		max-width: 580px;
		margin-bottom: 2rem;
	}

	/* Chips */
	.hero-chips-wrap {
		margin-bottom: 2.2rem;
	}

	.chips-label {
		display: block;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-ash-gray);
		margin-bottom: 0.65rem;
		font-weight: 500;
	}

	.chips-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
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
		gap: 0.9rem;
		margin-bottom: 2.75rem;
	}

	.btn-arrow-symbol {
		font-size: 16px;
		margin-left: 0.2rem;
	}

	/* Trust Row */
	.hero-trust-row {
		display: flex;
		align-items: center;
		gap: clamp(1rem, 2.5vw, 2.2rem);
		padding-top: 1.8rem;
		border-top: 1px solid var(--color-void-border);
		max-width: 580px;
	}

	.trust-item {
		display: flex;
		flex-direction: column;
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

	/* Right Column: Constellation */
	.hero-right {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.constellation-frame {
		position: relative;
		width: 100%;
		height: clamp(380px, 50vw, 540px);
		border-radius: var(--radius-cards);
		background: radial-gradient(circle at center, var(--color-surface-hover) 0%, var(--color-surface) 70%);
		border: 1px solid var(--color-void-border);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.constellation-badge {
		position: absolute;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.9rem;
		background: var(--color-surface);
		backdrop-filter: blur(12px);
		border-radius: var(--radius-tags);
		border: 1px solid var(--color-void-border);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: var(--color-bone-white);
		pointer-events: none;
	}

	.constellation-badge-top {
		top: 24px;
		left: 24px;
	}

	.constellation-badge-bottom {
		bottom: 24px;
		right: 24px;
	}

	.badge-dot-iris {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-electric-iris);
	}

	.badge-dot-amber {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-saffron-spark);
	}

	@media (max-width: 960px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.constellation-frame {
			height: 380px;
		}
	}
</style>
