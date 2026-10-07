<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let kved = $derived(currentContent.kved);
</script>

<section id="kved" class="section kved-section">
	<div class="container">
		<div class="section-header">
			<div class="section-badge">{kved.badge}</div>
			<h2 class="section-title">{kved.title}</h2>
			<p class="section-subtitle">{kved.subtitle}</p>
		</div>

		<div class="kved-grid">
			{#each kved.items as item}
				<div class="kved-card glass-card">
					<div class="kved-code-tag">
						<span>КВЕД</span>
						<strong>{item.code}</strong>
					</div>
					<h4 class="kved-title">{item.title}</h4>
					<p class="kved-desc">{item.desc}</p>
				</div>
			{/each}
		</div>

		<div class="legal-guarantee-bar">
			<div class="guarantee-icon">🛡️</div>
			<div class="guarantee-text">
				<strong>{kved.guaranteeTitle}</strong> {kved.guaranteeText}
			</div>
		</div>
	</div>
</section>

<style>
	.kved-section {
		background: #ffffff;
		border-top: 1px solid var(--border-light);
		border-bottom: 1px solid var(--border-light);
	}

	.kved-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4rem;
		margin-bottom: 3rem;
	}

	@media (max-width: 900px) {
		.kved-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.kved-grid {
			grid-template-columns: 1fr;
		}
	}

	.kved-card {
		padding: 1.6rem;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border-light);
		transition: all var(--transition-fast);
	}

	.kved-card:hover {
		transform: translateY(-3px);
		border-color: var(--primary-600);
		box-shadow: var(--shadow-md);
	}

	.kved-code-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.65rem;
		background: #f1f5f9;
		border-radius: var(--radius-sm);
		font-size: 0.78rem;
		color: var(--text-muted);
		margin-bottom: 0.8rem;
		align-self: flex-start;
	}

	.kved-code-tag strong {
		color: var(--primary-900);
		font-family: var(--font-heading);
		font-size: 0.95rem;
	}

	.kved-title {
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--primary-950);
		margin-bottom: 0.4rem;
		line-height: 1.35;
	}

	.kved-desc {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.legal-guarantee-bar {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 1.25rem 1.8rem;
		background: #f0f7ff;
		border-radius: var(--radius-md);
		border: 1px solid rgba(22, 66, 130, 0.15);
	}

	@media (max-width: 640px) {
		.legal-guarantee-bar {
			flex-direction: column;
			text-align: center;
		}
	}

	.guarantee-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.guarantee-text {
		font-size: 0.9rem;
		color: #1e3a5f;
		line-height: 1.5;
	}

	.guarantee-text strong {
		color: var(--primary-900);
	}
</style>
