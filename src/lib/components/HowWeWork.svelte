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
		background: #f8fafc;
	}

	.steps-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1.2rem;
		margin-bottom: 3.5rem;
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
		border: 1px solid var(--border-light);
		position: relative;
		transition: all var(--transition-norm);
	}

	.step-card:hover {
		transform: translateY(-4px);
		border-color: var(--accent-teal);
		box-shadow: 0 12px 28px rgba(0, 212, 170, 0.15);
	}

	.step-badge-circle {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: #f1f5f9;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.2rem;
		transition: all var(--transition-fast);
	}

	.step-card:hover .step-badge-circle {
		background: linear-gradient(135deg, #00d4aa 0%, #00b4d8 100%);
	}

	.step-index {
		font-family: var(--font-heading);
		font-weight: 800;
		font-size: 1.1rem;
		color: var(--primary-900);
	}

	.step-icon-emoji {
		font-size: 1.8rem;
		margin-bottom: 0.8rem;
	}

	.step-card-title {
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--primary-950);
		margin-bottom: 0.6rem;
		line-height: 1.3;
	}

	.step-card-desc {
		font-size: 0.84rem;
		line-height: 1.55;
		color: var(--text-muted);
	}

	.prep-tips-box {
		padding: 1.6rem 2.2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		border: 1px solid rgba(0, 212, 170, 0.3);
		background: linear-gradient(90deg, rgba(0, 212, 170, 0.08) 0%, #ffffff 100%);
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
		font-size: 2.2rem;
	}

	.prep-title {
		font-size: 1.08rem;
		font-weight: 700;
		color: var(--primary-950);
		margin-bottom: 0.25rem;
	}

	.prep-desc {
		font-size: 0.88rem;
		color: #475569;
		line-height: 1.45;
	}
</style>
