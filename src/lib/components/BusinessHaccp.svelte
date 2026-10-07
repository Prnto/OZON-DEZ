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
		<div class="b2b-grid">
			<!-- Visual Side with generated image and HACCP Badges -->
			<div class="b2b-visual">
				<div class="b2b-image-frame glass-card">
					<img
						src={asset('images/agro-fumigation.jpg')}
						alt="Санітарний контроль та фумігація зерносховищ HACCP"
						class="b2b-img"
						loading="lazy"
					/>
					<div class="b2b-floating-tag">
						<span class="tag-haccp">{b2b.floatingTag.badge}</span>
						<span class="tag-title">{b2b.floatingTag.text}</span>
					</div>
				</div>

				<div class="b2b-stats-bar">
					<div class="b2b-stat">
						<div class="stat-num">{b2b.stats.stat1Val}</div>
						<div class="stat-lbl">{b2b.stats.stat1Text}</div>
					</div>
					<div class="b2b-stat">
						<div class="stat-num">{b2b.stats.stat2Val}</div>
						<div class="stat-lbl">{b2b.stats.stat2Text}</div>
					</div>
				</div>
			</div>

			<!-- Content Side -->
			<div class="b2b-content">
				<div class="section-badge">{b2b.badge}</div>
				<h2 class="section-title">{b2b.title}</h2>
				<p class="b2b-intro-text">{b2b.subtitle}</p>

				<div class="b2b-paragraphs">
					<p>{b2b.content1}</p>
					<p>{b2b.content2}</p>
				</div>

				<!-- 4 Key Points Grid -->
				<div class="points-grid">
					{#each b2b.points as pt}
						<div class="point-item">
							<div class="point-icon">📋</div>
							<div>
								<h4 class="point-title">{pt.title}</h4>
								<p class="point-desc">{pt.desc}</p>
							</div>
						</div>
					{/each}
				</div>

				<div class="b2b-actions">
					<button
						type="button"
						class="btn btn-primary btn-lg"
						onclick={() => orderModal.open({ serviceTitle: b2b.cta })}
					>
						<span>📁 {b2b.cta}</span>
					</button>
					<a href="tel:{currentContent.phones.mobile}" class="btn btn-secondary btn-lg">
						<span>📞 {b2b.consultBtn}</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.b2b-section {
		background: #ffffff;
		border-top: 1px solid var(--border-light);
		border-bottom: 1px solid var(--border-light);
	}

	.b2b-grid {
		display: grid;
		grid-template-columns: 0.95fr 1.05fr;
		gap: 3.5rem;
		align-items: center;
	}

	@media (max-width: 992px) {
		.b2b-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}

	.b2b-visual {
		position: relative;
	}

	.b2b-image-frame {
		position: relative;
		border-radius: var(--radius-xl);
		padding: 0.5rem;
		box-shadow: var(--shadow-lg);
	}

	.b2b-img {
		width: 100%;
		border-radius: calc(var(--radius-xl) - 4px);
		aspect-ratio: 16/10;
		object-fit: cover;
	}

	.b2b-floating-tag {
		position: absolute;
		bottom: 1.5rem;
		left: 1.5rem;
		background: rgba(8, 26, 54, 0.9);
		backdrop-filter: blur(12px);
		padding: 0.6rem 1rem;
		border-radius: var(--radius-md);
		border: 1px solid rgba(0, 212, 170, 0.35);
		color: #ffffff;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
	}

	.tag-haccp {
		background: var(--accent-teal);
		color: #042436;
		padding: 0.2rem 0.55rem;
		border-radius: var(--radius-sm);
		font-weight: 800;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
	}

	.tag-title {
		font-size: 0.82rem;
		font-weight: 600;
		color: #e2e8f0;
	}

	.b2b-stats-bar {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 1.25rem;
	}

	.b2b-stat {
		background: #f8fafc;
		border: 1px solid var(--border-light);
		border-radius: var(--radius-md);
		padding: 1rem 1.2rem;
	}

	.b2b-stat .stat-num {
		font-family: var(--font-heading);
		font-size: 1.8rem;
		font-weight: 800;
		color: var(--primary-900);
		line-height: 1.1;
		margin-bottom: 0.2rem;
	}

	.b2b-stat .stat-lbl {
		font-size: 0.78rem;
		color: var(--text-muted);
		line-height: 1.35;
		font-weight: 600;
	}

	.b2b-content {
		display: flex;
		flex-direction: column;
	}

	.b2b-intro-text {
		font-size: 1.12rem;
		font-weight: 600;
		color: var(--primary-800);
		line-height: 1.55;
		margin-bottom: 1.2rem;
	}

	.b2b-paragraphs {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		font-size: 0.95rem;
		color: #475569;
		line-height: 1.6;
		margin-bottom: 1.8rem;
	}

	.points-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.2rem;
		margin-bottom: 2.2rem;
	}

	@media (max-width: 600px) {
		.points-grid {
			grid-template-columns: 1fr;
		}
	}

	.point-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.point-icon {
		font-size: 1.2rem;
		flex-shrink: 0;
	}

	.point-title {
		font-size: 0.92rem;
		font-weight: 700;
		color: var(--primary-950);
		margin-bottom: 0.2rem;
	}

	.point-desc {
		font-size: 0.8rem;
		color: var(--text-muted);
		line-height: 1.4;
	}

	.b2b-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
