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
		background: #ffffff;
		border-top: 1px solid var(--border-light);
		padding: 4.5rem 0;
	}

	.b2b-intro-block {
		max-width: 860px;
		margin-bottom: 3rem;
	}

	.dark-accent {
		background: rgba(0, 212, 170, 0.12);
		color: #00876c;
		border: 1px solid rgba(0, 212, 170, 0.35);
	}

	.b2b-section-heading {
		font-size: clamp(1.85rem, 3.2vw, 2.6rem);
		font-weight: 800;
		color: var(--primary-950);
		line-height: 1.25;
		margin: 0.8rem 0 1.2rem;
		letter-spacing: -0.02em;
	}

	.b2b-paragraphs {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		font-size: 1.05rem;
		line-height: 1.65;
		color: #475569;
	}

	/* 4 Points Grid */
	.points-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.4rem;
		margin-bottom: 3.5rem;
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
		padding: 2rem 1.6rem;
		border: 1.5px solid var(--border-light);
		border-radius: var(--radius-lg);
		background: #ffffff;
		display: flex;
		flex-direction: column;
		transition: all var(--transition-norm);
	}

	.point-item:hover {
		transform: translateY(-4px);
		border-color: var(--primary-600);
		box-shadow: var(--shadow-lg);
	}

	.point-icon-box {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.point-title {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--primary-950);
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	.point-desc {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.55;
	}

	/* CTA Bar */
	.b2b-cta-bar {
		padding: 2.5rem 3rem;
		border-radius: var(--radius-xl);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2.5rem;
		background: linear-gradient(135deg, #071933 0%, #0d2e5a 100%);
		border: 1px solid rgba(0, 212, 170, 0.35);
		box-shadow: 0 20px 45px rgba(5, 17, 36, 0.25);
	}

	@media (max-width: 960px) {
		.b2b-cta-bar {
			flex-direction: column;
			align-items: flex-start;
			padding: 2rem 1.6rem;
		}
	}

	.b2b-stats-cluster {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.b2b-stat-pill {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
		padding: 0.75rem 1.25rem;
		border-radius: var(--radius-md);
	}

	.b2b-stat-pill .stat-num {
		font-family: var(--font-heading);
		font-size: 1.85rem;
		font-weight: 800;
		color: var(--accent-teal);
		line-height: 1;
	}

	.b2b-stat-pill .stat-lbl {
		font-size: 0.82rem;
		color: #cbd5e1;
		font-weight: 600;
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
