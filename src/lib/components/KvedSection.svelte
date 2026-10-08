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
		background: var(--color-liquid-abyss);
		border-top: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
	}

	.kved-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4rem;
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
		padding: 1.6rem;
		display: flex;
		flex-direction: column;
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.kved-card:hover {
		transform: translateY(-2px);
		border-color: rgba(203, 255, 252, 0.28);
	}

	.kved-code-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.25rem 0.65rem;
		background: rgba(237, 255, 254, 0.06);
		border: 1px solid rgba(203, 255, 252, 0.12);
		border-radius: var(--radius-small);
		font-size: 0.76rem;
		color: var(--color-silver-mist);
		margin-bottom: 0.8rem;
		align-self: flex-start;
	}

	.kved-code-tag strong {
		color: var(--color-lavender-phosphor);
		font-family: var(--font-heading);
		font-size: 0.92rem;
		font-weight: 500;
	}

	.kved-title {
		font-size: 1.05rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.4rem;
		line-height: 1.35;
	}

	.kved-desc {
		font-size: 0.85rem;
		color: var(--color-silver-mist);
		line-height: 1.5;
	}

	.legal-guarantee-bar {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 1.25rem 1.8rem;
		background: var(--color-liquid-deep);
		border-radius: var(--radius-cards);
		border: 1px solid var(--border-subtle);
		box-shadow: none;
	}

	@media (max-width: 640px) {
		.legal-guarantee-bar {
			flex-direction: column;
			text-align: center;
		}
	}

	.guarantee-icon {
		font-size: 1.8rem;
		flex-shrink: 0;
	}

	.guarantee-text {
		font-size: 0.88rem;
		color: var(--color-silver-mist);
		line-height: 1.5;
	}

	.guarantee-text strong {
		color: var(--color-platinum);
		font-weight: 500;
	}
</style>
