<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let faq = $derived(currentContent.faq);

	let openIndex = $state<number | null>(0);

	function toggleFaq(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<section id="faq" class="section faq-section">
	<div class="container">
		<div class="section-header">
			<div class="section-badge">Відповіді на запитання</div>
			<h2 class="section-title">{faq.title}</h2>
			<p class="section-subtitle">{faq.subtitle}</p>
		</div>

		<div class="faq-list">
			{#each faq.items as item, index}
				<div class="faq-item glass-card" class:is-open={openIndex === index}>
					<button
						type="button"
						class="faq-question-btn"
						onclick={() => toggleFaq(index)}
						aria-expanded={openIndex === index}
					>
						<span class="q-text">{item.q}</span>
						<span class="faq-arrow">{openIndex === index ? '−' : '+'}</span>
					</button>

					{#if openIndex === index}
						<div class="faq-answer">
							<p>{item.a}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.faq-section {
		background: var(--color-liquid-abyss);
		border-top: 1px solid var(--border-subtle);
	}

	.faq-list {
		max-width: 860px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.faq-item {
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		overflow: hidden;
		transition: border-color var(--transition-fast);
		box-shadow: none;
	}

	.faq-item.is-open {
		border-color: rgba(203, 255, 252, 0.28);
	}

	.faq-question-btn {
		width: 100%;
		padding: 1.25rem 1.6rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		background: transparent;
		border: none;
		cursor: pointer;
		text-align: left;
	}

	.q-text {
		font-family: var(--font-heading);
		font-size: 1.05rem;
		font-weight: 500;
		color: var(--color-platinum);
		line-height: 1.35;
	}

	.faq-arrow {
		width: 30px;
		height: 30px;
		border-radius: var(--radius-small);
		background: var(--color-liquid-deep);
		border: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.15rem;
		font-weight: 500;
		color: var(--color-silver-mist);
		flex-shrink: 0;
		transition: all var(--transition-fast);
	}

	.faq-item.is-open .faq-arrow {
		background: var(--gradient-aurora);
		color: #02201e;
		border-color: rgba(255, 255, 255, 0.5);
	}

	.faq-answer {
		padding: 0 1.6rem 1.3rem;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.faq-answer p {
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--color-silver-mist);
	}

	@media (max-width: 480px) {
		.faq-question-btn {
			padding: 1.1rem 1.15rem;
		}
		.q-text {
			font-size: 0.96rem;
		}
		.faq-answer {
			padding: 0 1.15rem 1.15rem;
		}
	}
</style>
