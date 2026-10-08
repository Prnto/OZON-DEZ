<script lang="ts">
	import { asset } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let b2b = $derived(currentContent.b2bSection);
</script>

<section id="b2b" class="section b2b-section">
	<div class="container">
		<!-- Section Header -->
		<div class="b2b-intro-block">
			<div class="section-badge dark-accent">
				{#if langState.current === 'ua'}Регламент НАССР & Пест-Контроль{:else}Регламент НАССР & Пест-Контроль{/if}
			</div>
			<h2 class="b2b-section-heading">
				{#if langState.current === 'ua'}
					Комплексна програма санітарного аудиту та захисту підприємств
				{:else}
					Комплексная программа санитарного аудита и защиты предприятий
				{/if}
			</h2>
			<div class="b2b-paragraphs">
				<p>{b2b.content1}</p>
				<p>{b2b.content2}</p>
			</div>
		</div>

		<!-- 4 Key HACCP Standards Cards -->
		<div class="points-grid">
			{#each b2b.points as pt}
				<div class="point-item glass-card">
					<div class="point-icon-box">📋</div>
					<div class="point-content">
						<h3 class="point-title">{pt.title}</h3>
						<p class="point-desc">{pt.desc}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Trust, Stats & Direct Call to Action Bar -->
		<div class="b2b-cta-bar glass-card-dark">
			<div class="b2b-stats-cluster">
				<div class="b2b-stat-pill">
					<span class="stat-num">{b2b.stats.stat1Val}</span>
					<span class="stat-lbl">{b2b.stats.stat1Text}</span>
				</div>
				<div class="b2b-stat-pill">
					<span class="stat-num">{b2b.stats.stat2Val}</span>
					<span class="stat-lbl">{b2b.stats.stat2Text}</span>
				</div>
			</div>

			<div class="b2b-cta-actions">
				<button
					type="button"
					class="btn btn-primary btn-lg"
					onclick={() =>
						orderModal.open({
							serviceTitle: b2b.cta,
							serviceCategory: 'HoReCa & HACCP'
						})}
				>
					<span>📁 {b2b.cta}</span>
				</button>
				<a href="tel:{currentContent.phones.mobile}" class="btn btn-outline-white btn-lg">
					<span>📞 {b2b.consultBtn}</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.b2b-section {
		background: var(--color-liquid-abyss);
		border-top: 1px solid var(--border-subtle);
		padding: 4.5rem 0;
	}

	.b2b-intro-block {
		max-width: 860px;
		margin-bottom: 3rem;
	}

	.dark-accent {
		background: rgba(237, 255, 254, 0.06);
		color: var(--color-liquid-mist);
		border: 1px solid rgba(203, 255, 252, 0.12);
	}

	.b2b-section-heading {
		font-size: clamp(1.85rem, 3vw, 2.5rem);
		font-weight: 500;
		color: var(--color-platinum);
		line-height: 1.25;
		margin: 0.8rem 0 1.2rem;
		letter-spacing: -0.03em;
	}

	.b2b-paragraphs {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		font-size: 1rem;
		line-height: 1.65;
		color: var(--color-silver-mist);
	}

	/* 4 Points Grid */
	.points-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.4rem;
		margin-bottom: 3rem;
	}

	@media (max-width: 1024px) {
		.points-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.points-grid {
			grid-template-columns: 1fr;
		}
	}

	.point-item {
		padding: 1.8rem 1.5rem;
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.point-item:hover {
		transform: translateY(-2px);
		border-color: rgba(203, 255, 252, 0.28);
	}

	.point-icon-box {
		font-size: 1.8rem;
		margin-bottom: 0.8rem;
	}

	.point-title {
		font-size: 1.05rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.4rem;
		line-height: 1.3;
	}

	.point-desc {
		font-size: 0.85rem;
		color: var(--color-silver-mist);
		line-height: 1.55;
	}

	/* CTA Bar */
	.b2b-cta-bar {
		padding: 2.2rem 2.8rem;
		border-radius: var(--radius-cards);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2.5rem;
		background: var(--color-liquid-deep);
		border: 1px solid var(--border-subtle);
		box-shadow: none;
	}

	@media (max-width: 960px) {
		.b2b-cta-bar {
			flex-direction: column;
			align-items: flex-start;
			padding: 1.8rem 1.4rem;
		}
	}

	.b2b-stats-cluster {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		flex-wrap: wrap;
	}

	.b2b-stat-pill {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		padding: 0.75rem 1.2rem;
		border-radius: var(--radius-small);
	}

	.b2b-stat-pill .stat-num {
		font-family: var(--font-heading);
		font-size: 1.8rem;
		font-weight: 500;
		color: var(--color-lavender-phosphor);
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.b2b-stat-pill .stat-lbl {
		font-size: 0.8rem;
		color: var(--color-silver-mist);
		font-weight: 500;
		max-width: 170px;
		line-height: 1.35;
	}

	.b2b-cta-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	@media (max-width: 600px) {
		.b2b-stats-cluster {
			width: 100%;
			flex-direction: column;
			align-items: stretch;
		}
		.b2b-cta-actions {
			width: 100%;
			flex-direction: column;
		}
		.b2b-cta-actions .btn {
			width: 100%;
		}
	}
</style>
