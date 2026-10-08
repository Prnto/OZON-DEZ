<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let work = $derived(currentContent.howWeWork);
</script>

<section id="how-we-work" class="section work-section">
	<div class="container">
		<div class="section-header">
			<div class="section-badge">{work.badge}</div>
			<h2 class="section-title">{work.title}</h2>
			<p class="section-subtitle">{work.subtitle}</p>
		</div>

		<!-- Step Roadcards -->
		<div class="steps-grid">
			{#each work.steps as item}
				<div class="step-card glass-card">
					<div class="step-badge-circle">
						<span class="step-index">0{item.step}</span>
					</div>

					<div class="step-card-content">
						<div class="step-icon-emoji">
							{#if item.step === 1}📞
							{:else if item.step === 2}🔍
							{:else if item.step === 3}📋
							{:else if item.step === 4}🛡️
							{:else}🏆{/if}
						</div>
						<h3 class="step-card-title">{item.title}</h3>
						<p class="step-card-desc">{item.desc}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Preparation Tips Highlight Banner -->
		<div class="prep-tips-box glass-card">
			<div class="prep-tips-left">
				<div class="prep-icon">💡</div>
				<div>
					<h4 class="prep-title">{work.prepBanner.title}</h4>
					<p class="prep-desc">{work.prepBanner.desc}</p>
				</div>
			</div>
			<button
				type="button"
				class="btn btn-secondary"
				onclick={() => orderModal.open({ serviceTitle: work.prepBanner.btn })}
			>
				{work.prepBanner.btn}
			</button>
		</div>
	</div>
</section>

<style>
	.work-section {
		background: var(--color-liquid-abyss);
	}

	.steps-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1.2rem;
		margin-bottom: 3rem;
		position: relative;
	}

	@media (max-width: 1080px) {
		.steps-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 640px) {
		.steps-grid {
			grid-template-columns: 1fr;
		}
	}

	.step-card {
		padding: 1.8rem 1.4rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		position: relative;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.step-card:hover {
		transform: translateY(-3px);
		border-color: rgba(203, 255, 252, 0.3);
	}

	.step-badge-circle {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--color-liquid-deep);
		border: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.2rem;
		transition: all var(--transition-fast);
	}

	.step-card:hover .step-badge-circle {
		border-color: rgba(203, 255, 252, 0.4);
	}

	.step-index {
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: 1rem;
		color: var(--color-lavender-phosphor);
	}

	.step-icon-emoji {
		font-size: 1.6rem;
		margin-bottom: 0.8rem;
	}

	.step-card-title {
		font-size: 1.02rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	.step-card-desc {
		font-size: 0.84rem;
		line-height: 1.55;
		color: var(--color-silver-mist);
	}

	.prep-tips-box {
		padding: 1.6rem 2.2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		background: var(--color-liquid-deep);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: none;
	}

	@media (max-width: 800px) {
		.prep-tips-box {
			flex-direction: column;
			align-items: flex-start;
			padding: 1.5rem;
		}
	}

	.prep-tips-left {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.prep-icon {
		font-size: 2rem;
	}

	.prep-title {
		font-size: 1.05rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.25rem;
	}

	.prep-desc {
		font-size: 0.86rem;
		color: var(--color-silver-mist);
		line-height: 1.45;
	}
</style>
