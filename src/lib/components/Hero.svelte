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
				<span class="badge-year">2011 – 2025</span>
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
		padding: 5rem 0 6rem;
		background: #061730;
		overflow: hidden;
		min-height: 860px;
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
		filter: brightness(0.95) contrast(1.05);
	}

	/* Gradient overlay: dark on left where text is, translucent on right so doctor and logo are visible */
	.hero-bg-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			rgba(5, 18, 38, 0.92) 0%,
			rgba(6, 23, 49, 0.84) 45%,
			rgba(7, 27, 58, 0.62) 75%,
			rgba(8, 31, 66, 0.38) 100%
		);
	}

	.hero-bg-vignette {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			#061730 0%,
			transparent 30%,
			transparent 75%,
			rgba(5, 18, 38, 0.8) 100%
		);
	}

	.hero-bg-glow {
		position: absolute;
		width: 550px;
		height: 550px;
		border-radius: 50%;
		filter: blur(140px);
		opacity: 0.22;
		pointer-events: none;
		z-index: 1;
	}

	.glow-1 {
		top: -100px;
		left: 10%;
		background: radial-gradient(circle, #00d4aa, #00b4d8);
	}

	.glow-2 {
		bottom: -100px;
		right: 15%;
		background: radial-gradient(circle, #1f5cb5, #00d4aa);
	}

	.hero-container {
		position: relative;
		z-index: 2;
		width: 100%;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		max-width: 820px;
	}

	.hero-top-badge {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.45rem 1.1rem;
		border-radius: var(--radius-full);
		background: rgba(13, 38, 77, 0.85);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(0, 212, 170, 0.4);
		box-shadow: 0 4px 18px rgba(0, 212, 170, 0.16);
		font-size: 0.86rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 1.4rem;
	}

	.badge-year {
		padding: 0.2rem 0.55rem;
		background: rgba(0, 212, 170, 0.22);
		color: #00e5b0;
		border-radius: var(--radius-full);
		font-size: 0.76rem;
	}

	.hero-title {
		font-size: clamp(2.4rem, 4.4vw, 3.8rem);
		font-weight: 800;
		line-height: 1.15;
		color: #ffffff;
		letter-spacing: -0.03em;
		margin-bottom: 1.25rem;
		text-shadow: 0 2px 14px rgba(0, 0, 0, 0.5);
	}

	.title-highlight {
		background: linear-gradient(135deg, #00e5b0 0%, #38bdf8 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		display: block;
	}

	.hero-subtitle {
		font-size: clamp(1.05rem, 1.6vw, 1.22rem);
		line-height: 1.65;
		color: #cbd5e1;
		margin-bottom: 2rem;
		max-width: 720px;
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
	}

	/* Trust Stats Horizontal Bar */
	.hero-stats-bar {
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.6rem;
		padding: 0.9rem 1.6rem;
		background: rgba(10, 31, 64, 0.75);
		backdrop-filter: blur(14px);
		border-radius: var(--radius-lg);
		border: 1px solid rgba(0, 212, 170, 0.3);
		box-shadow: 0 8px 32px rgba(4, 15, 33, 0.35);
		margin-bottom: 2rem;
		align-self: flex-start;
	}

	.hero-stat-item {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.stat-highlight {
		font-family: var(--font-heading);
		font-size: 1.35rem;
		font-weight: 800;
		color: #00e5b0;
		line-height: 1.1;
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.stat-icon-sm {
		font-size: 1.1rem;
	}

	.stat-desc {
		font-size: 0.78rem;
		font-weight: 600;
		color: #94a3b8;
		line-height: 1.2;
	}

	.hero-stat-sep {
		width: 1px;
		height: 34px;
		background: rgba(255, 255, 255, 0.15);
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
		padding: 1.2rem 1.4rem;
		background: rgba(8, 26, 54, 0.7);
		backdrop-filter: blur(12px);
		border-radius: var(--radius-md);
		border: 1px solid rgba(255, 255, 255, 0.12);
		max-width: 760px;
	}

	.pains-label {
		display: block;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #38bdf8;
		margin-bottom: 0.75rem;
	}

	.chips-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.pain-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.95rem;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 600;
		color: #e2e8f0;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.pain-chip:hover {
		background: rgba(0, 212, 170, 0.2);
		border-color: #00e5b0;
		color: #ffffff;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 212, 170, 0.25);
	}

	.chip-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #00e5b0;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1.2rem;
		margin-bottom: 2.8rem;
	}

	/* Triggers Grid */
	.triggers-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
		max-width: 860px;
	}

	@media (max-width: 768px) {
		.triggers-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	.trigger-card {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
		background: rgba(8, 26, 54, 0.45);
		backdrop-filter: blur(8px);
		padding: 0.9rem 1rem;
		border-radius: var(--radius-md);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.trigger-icon-wrap {
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.trigger-title {
		font-size: 0.92rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 0.2rem;
	}

	.trigger-desc {
		font-size: 0.8rem;
		line-height: 1.4;
		color: #94a3b8;
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
				rgba(5, 18, 38, 0.92) 0%,
				rgba(6, 23, 49, 0.94) 100%
			);
		}
	}
</style>
