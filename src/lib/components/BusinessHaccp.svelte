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
				{#if langState.current === 'ua'}Регламент НАССР & Пест-Контроль{:else if langState.current === 'ru'}Регламент НАССР & Пест-Контроль{:else}HACCP & Pest Control Protocol{/if}
			</div>
			<h2 class="b2b-section-heading">
				{#if langState.current === 'ua'}
					Комплексна програма санітарного аудиту та захисту підприємств
				{:else if langState.current === 'ru'}
					Комплексная программа санитарного аудита и защиты предприятий
				{:else}
					Comprehensive sanitary audit and enterprise protection program
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
		background: transparent;
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.b2b-intro-block {
		max-width: 860px;
		margin-bottom: 3rem;
	}

	.dark-accent {
		background: rgba(255, 184, 41, 0.1);
		color: var(--color-saffron-spark);
		border: 1px solid rgba(255, 184, 41, 0.25);
	}

	.b2b-section-heading {
		font-size: clamp(2rem, 3.5vw, 2.8rem);
		font-weight: 400;
		color: var(--color-bone-white);
		line-height: 1.2;
		margin: 1rem 0 1.2rem;
		letter-spacing: -0.04em;
	}

	.b2b-paragraphs {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		font-size: 1rem;
		line-height: 1.65;
		color: var(--color-ash-gray);
		font-weight: 300;
	}

	/* 4 Points Grid */
	.points-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
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
		padding: 2.2rem 1.8rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.point-item:hover {
		transform: translateY(-2px);
		border-color: var(--color-electric-iris);
	}

	.point-icon-box {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.point-title {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
		line-height: 1.35;
	}

	.point-desc {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
	}

	/* CTA Bar */
	.b2b-cta-bar {
		padding: 2.5rem 3rem;
		border-radius: var(--radius-cards);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2.5rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		box-shadow: none;
	}

	@media (max-width: 960px) {
		.b2b-cta-bar {
			flex-direction: column;
			align-items: flex-start;
			padding: 2rem 1.5rem;
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
		gap: 1rem;
		background: var(--color-surface-hover);
		border: 1px solid var(--border-subtle);
		padding: 0.85rem 1.4rem;
		border-radius: var(--radius-pill);
	}

	.b2b-stat-pill .stat-num {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 400;
		color: var(--color-electric-iris);
		line-height: 1;
		letter-spacing: -0.03em;
	}

	.b2b-stat-pill .stat-lbl {
		font-size: 0.82rem;
		color: var(--color-ash-gray);
		font-weight: 300;
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
