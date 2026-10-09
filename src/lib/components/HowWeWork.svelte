<script lang="ts">
	import { PhoneCall, MagnifyingGlass, ClipboardText, ShieldCheck, Trophy, Lightbulb } from 'phosphor-svelte';
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
							{#if item.step === 1}
								<PhoneCall size={32} weight="duotone" color="var(--color-electric-iris)" />
							{:else if item.step === 2}
								<MagnifyingGlass size={32} weight="duotone" color="var(--color-electric-iris)" />
							{:else if item.step === 3}
								<ClipboardText size={32} weight="duotone" color="var(--color-electric-iris)" />
							{:else if item.step === 4}
								<ShieldCheck size={32} weight="duotone" color="var(--color-electric-iris)" />
							{:else}
								<Trophy size={32} weight="duotone" color="var(--color-electric-iris)" />
							{/if}
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
				<div class="prep-icon" style="display: flex; align-items: center; justify-content: center; color: var(--color-saffron-spark);">
					<Lightbulb size={36} weight="duotone" />
				</div>
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
		background: transparent;
		padding: var(--space-3xl) 0;
	}

	.steps-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1.4rem;
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
		padding: 2.2rem 1.6rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		position: relative;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.step-card:hover {
		transform: translateY(-3px);
		border-color: var(--color-electric-iris);
	}

	.step-badge-circle {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		background: var(--color-surface-hover);
		border: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.4rem;
		transition: all var(--transition-fast);
	}

	.step-card:hover .step-badge-circle {
		border-color: var(--color-electric-iris);
	}

	.step-index {
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--color-electric-iris);
	}

	.step-icon-emoji {
		font-size: 1.8rem;
		margin-bottom: 1rem;
	}

	.step-card-title {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
		line-height: 1.35;
	}

	.step-card-desc {
		font-size: 0.86rem;
		line-height: 1.6;
		color: var(--color-ash-gray);
		font-weight: 300;
	}

	.prep-tips-box {
		padding: 2rem 2.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		background: var(--color-surface);
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
		gap: 1.4rem;
	}

	.prep-icon {
		font-size: 2.2rem;
	}

	.prep-title {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.35rem;
	}

	.prep-desc {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.55;
	}
</style>
