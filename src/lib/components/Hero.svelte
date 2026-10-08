<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);

	function handleChipClick(chipText: string) {
		orderModal.open({ serviceTitle: chipText });
	}
</script>

<section id="hero" class="hero-section">
	<!-- Fullscreen Doctor Background Image -->
	<div class="hero-bg-media" aria-hidden="true">
		<img
			src={asset('images/hero-doctor.jpg')}
			alt="Санітарний лікар дезінфекції ТОВ ОЗОН-ДЕЗ"
			class="hero-bg-photo"
			loading="eager"
		/>
		<div class="hero-bg-overlay"></div>
		<div class="hero-bg-vignette"></div>
	</div>

	<!-- Ambient glow accents -->
	<div class="hero-bg-glow glow-1"></div>
	<div class="hero-bg-glow glow-2"></div>

	<div class="container hero-container">
		<div class="hero-content">
			<!-- Experience & License Badge -->
			<div class="hero-top-badge animate-float">
				<span class="badge-icon">🛡️</span>
				<span class="badge-text">{currentContent.hero.badge}</span>
				<span class="badge-year">2011 – 2026 • 15 РОКІВ</span>
			</div>

			<!-- Main Title -->
			<h1 class="hero-title">
				{currentContent.hero.titleMain}
				<span class="title-highlight">{currentContent.hero.titleHighlight}</span>
			</h1>

			<!-- Subtitle -->
			<p class="hero-subtitle">
				{currentContent.hero.subtitle}
			</p>

			<!-- Trust Stats Bar directly over hero -->
			<div class="hero-stats-bar">
				<div class="hero-stat-item">
					<div class="stat-highlight">{currentContent.hero.stats.stat1Val}</div>
					<div class="stat-desc">{currentContent.hero.stats.stat1Label}</div>
				</div>
				<div class="hero-stat-sep"></div>
				<div class="hero-stat-item">
					<div class="stat-highlight">
						<span class="stat-icon-sm">💨</span> {currentContent.hero.stats.stat2Val}
					</div>
					<div class="stat-desc">{currentContent.hero.stats.stat2Sub}</div>
				</div>
				<div class="hero-stat-sep"></div>
				<div class="hero-stat-item">
					<div class="stat-highlight">
						<span class="stat-icon-sm">✅</span> {currentContent.hero.stats.stat3Val}
					</div>
					<div class="stat-desc">{currentContent.hero.stats.stat3Sub}</div>
				</div>
			</div>

			<!-- Quick Problem Selector Chips -->
			<div class="pains-block">
				<span class="pains-label">{currentContent.hero.quickPainsLabel}</span>
				<div class="chips-container">
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

			<!-- CTAs -->
			<div class="hero-actions">
				<a href={resolve('/calculator')} class="btn btn-primary btn-lg">
					<span>🧮 {currentContent.hero.ctaPrimary}</span>
				</a>
				<button
					type="button"
					class="btn btn-secondary btn-lg"
					onclick={() => orderModal.open({ serviceTitle: currentContent.hero.ctaSecondary })}
				>
					<span>⚡ {currentContent.hero.ctaSecondary}</span>
				</button>
			</div>

			<!-- Key Triggers / USP Grid -->
			<div class="triggers-grid">
				{#each currentContent.hero.triggers as trigger, i}
					<div class="trigger-card">
						<div class="trigger-icon-wrap">
							{#if i === 0}
								📜
							{:else if i === 1}
								⭐
							{:else}
								🔬
							{/if}
						</div>
						<div class="trigger-text">
							<h3 class="trigger-title">{trigger.title}</h3>
							<p class="trigger-desc">{trigger.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		padding: clamp(3.5rem, 6vh, 5.5rem) 0 clamp(3.5rem, 6vh, 5.5rem);
		background: var(--color-liquid-abyss);
		overflow: hidden;
		min-height: clamp(580px, 80vh, 840px);
		display: flex;
		align-items: center;
	}

	/* Full-bleed background with doctor */
	.hero-bg-media {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
	}

	.hero-bg-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 25%;
		display: block;
		transform: scale(1.01);
		filter: brightness(0.6) contrast(1.1);
		mix-blend-mode: luminosity;
		opacity: 0.45;
	}

	/* Gradient overlay: deep teal abyss transitions */
	.hero-bg-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			rgba(1, 38, 36, 0.98) 0%,
			rgba(1, 38, 36, 0.92) 45%,
			rgba(1, 38, 36, 0.75) 75%,
			rgba(1, 29, 28, 0.85) 100%
		);
	}

	.hero-bg-vignette {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			var(--color-liquid-abyss) 0%,
			transparent 25%,
			transparent 75%,
			rgba(1, 29, 28, 0.9) 100%
		);
	}

	/* Bioluminescent Data Orb / Particle visual */
	.hero-bg-glow {
		position: absolute;
		width: 600px;
		height: 600px;
		border-radius: 50%;
		filter: blur(120px);
		opacity: 0.18;
		pointer-events: none;
		z-index: 1;
	}

	.glow-1 {
		top: -120px;
		right: 5%;
		background: radial-gradient(circle, #cbfffc, #00827c);
	}

	.glow-2 {
		bottom: -150px;
		left: 10%;
		background: radial-gradient(circle, #fde9ff, #003734);
	}

	.hero-container {
		position: relative;
		z-index: 2;
		width: 100%;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		max-width: 860px;
	}

	.hero-top-badge {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.4rem 0.95rem;
		border-radius: var(--radius-small);
		background: rgba(0, 55, 52, 0.7);
		border: 1px solid rgba(203, 255, 252, 0.18);
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-liquid-mist);
		margin-bottom: 1.4rem;
	}

	.badge-year {
		padding: 0.2rem 0.55rem;
		background: rgba(0, 130, 124, 0.35);
		color: #cbfffc;
		border-radius: var(--radius-small);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
	}

	.hero-title {
		font-size: clamp(2.4rem, 4.5vw, 3.8rem);
		font-weight: 500;
		line-height: 1.12;
		color: var(--color-platinum);
		letter-spacing: -0.04em;
		margin-bottom: 1.25rem;
	}

	.title-highlight {
		color: var(--color-liquid-mist);
		display: block;
		background: var(--gradient-bioluminescent);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-subtitle {
		font-size: clamp(1.05rem, 1.6vw, 1.2rem);
		line-height: 1.6;
		color: var(--color-silver-mist);
		margin-bottom: 2rem;
		max-width: 760px;
	}

	/* Trust Stats Bar: Surface Kelp with Lavender Phosphor numbers */
	.hero-stats-bar {
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 2rem;
		padding: 1.1rem 1.8rem;
		background: var(--color-liquid-kelp);
		border-radius: var(--radius-cards);
		border: 1px solid rgba(203, 255, 252, 0.12);
		margin-bottom: 2.2rem;
		align-self: flex-start;
	}

	.hero-stat-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stat-highlight {
		font-family: var(--font-heading);
		font-size: 1.85rem;
		font-weight: 500;
		color: var(--color-lavender-phosphor);
		line-height: 1;
		letter-spacing: -0.03em;
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.stat-icon-sm {
		font-size: 1.1rem;
	}

	.stat-desc {
		font-size: 0.76rem;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-liquid-mist);
		line-height: 1.2;
	}

	.hero-stat-sep {
		width: 1px;
		height: 36px;
		background: rgba(203, 255, 252, 0.12);
	}

	@media (max-width: 640px) {
		.hero-stats-bar {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
			width: 100%;
			padding: 1.2rem;
		}
		.hero-stat-sep {
			display: none;
		}
	}

	/* Problem Selector Chips */
	.pains-block {
		margin-bottom: 2.2rem;
		padding: 1.1rem 1.3rem;
		background: var(--color-liquid-deep);
		border-radius: var(--radius-cards);
		border: 1px solid rgba(203, 255, 252, 0.08);
		max-width: 780px;
	}

	.pains-label {
		display: block;
		font-size: 0.76rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-liquid-mist);
		margin-bottom: 0.75rem;
	}

	.chips-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}

	.pain-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.9rem;
		background: var(--color-liquid-kelp);
		border: 1px solid rgba(203, 255, 252, 0.12);
		border-radius: var(--radius-small);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-silver-mist);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.pain-chip:hover {
		background: #004d49;
		border-color: rgba(203, 255, 252, 0.35);
		color: var(--color-platinum);
		transform: translateY(-2px);
	}

	.chip-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #cbfffc;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2.4rem;
	}

	@media (max-width: 480px) {
		.hero-actions {
			flex-direction: column;
			width: 100%;
		}
		.hero-actions .btn {
			width: 100%;
			justify-content: center;
		}
	}

	/* Triggers Grid */
	.triggers-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.2rem;
		padding-top: 1.8rem;
		border-top: 1px solid rgba(203, 255, 252, 0.08);
		max-width: 860px;
	}

	@media (max-width: 860px) {
		.triggers-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.85rem;
		}
	}

	@media (max-width: 560px) {
		.triggers-grid {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}
	}

	.trigger-card {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
		background: var(--color-liquid-kelp);
		padding: 1rem 1.1rem;
		border-radius: var(--radius-cards);
		border: 1px solid rgba(203, 255, 252, 0.08);
		transition: border-color var(--transition-fast);
	}

	.trigger-card:hover {
		border-color: rgba(203, 255, 252, 0.22);
	}

	.trigger-icon-wrap {
		font-size: 1.4rem;
		flex-shrink: 0;
	}

	.trigger-title {
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.25rem;
	}

	.trigger-desc {
		font-size: 0.8rem;
		line-height: 1.4;
		color: var(--color-silver-mist);
	}

	@media (max-width: 900px) {
		.hero-section {
			padding: 4rem 0 4.5rem;
			min-height: auto;
		}

		.hero-bg-photo {
			object-position: center;
		}

		.hero-bg-overlay {
			background: linear-gradient(
				180deg,
				rgba(1, 38, 36, 0.96) 0%,
				rgba(1, 29, 28, 0.98) 100%
			);
		}
	}
</style>
