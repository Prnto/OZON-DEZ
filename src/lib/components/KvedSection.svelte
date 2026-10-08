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
		background: transparent;
		border-top: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.kved-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 2.5rem;
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
		padding: 2.2rem 1.8rem;
		display: flex;
		flex-direction: column;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.kved-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-electric-iris);
	}

	.kved-code-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-pill);
		font-size: 0.76rem;
		color: var(--color-silver-mist);
		margin-bottom: 1rem;
		align-self: flex-start;
	}

	.kved-code-tag strong {
		color: var(--color-electric-iris);
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 600;
	}

	.kved-title {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
		line-height: 1.35;
	}

	.kved-desc {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
	}

	.legal-guarantee-bar {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1.5rem 2rem;
		background: var(--color-surface);
		border-radius: var(--radius-cards);
		border: 1px solid var(--border-subtle);
		box-shadow: none;
	}

	@media (max-width: 640px) {
		.legal-guarantee-bar {
			flex-direction: column;
			text-align: center;
			padding: 1.25rem 1rem;
		}
	}

	.guarantee-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.guarantee-text {
		font-size: 0.9rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
	}

	.guarantee-text strong {
		color: var(--color-bone-white);
		font-weight: 500;
	}

	:global(html[data-theme="light"]) .kved-code-tag {
		background: rgba(15, 23, 42, 0.05);
		border-color: rgba(15, 23, 42, 0.1);
		color: #334155;
	}

	:global(html[data-theme="light"]) .kved-card,
	:global(html[data-theme="light"]) .legal-guarantee-bar {
		box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
	}
</style>
