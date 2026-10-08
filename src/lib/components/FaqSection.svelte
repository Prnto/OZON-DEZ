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
		background: var(--color-void);
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.faq-list {
		max-width: 860px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.faq-item {
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		overflow: hidden;
		transition: border-color var(--transition-fast);
		box-shadow: none;
	}

	.faq-item.is-open {
		border-color: var(--color-electric-iris);
	}

	.faq-question-btn {
		width: 100%;
		padding: 1.4rem 1.8rem;
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
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		line-height: 1.35;
	}

	.faq-arrow {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--color-surface-hover);
		border: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.1rem;
		font-weight: 400;
		color: var(--color-ash-gray);
		flex-shrink: 0;
		transition: all var(--transition-fast);
	}

	.faq-item.is-open .faq-arrow {
		background: var(--color-electric-iris);
		color: #ffffff;
		border-color: var(--color-electric-iris);
	}

	.faq-answer {
		padding: 0 1.8rem 1.5rem;
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
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-ash-gray);
		font-weight: 300;
	}

	@media (max-width: 480px) {
		.faq-question-btn {
			padding: 1.15rem 1.25rem;
		}
		.q-text {
			font-size: 0.98rem;
		}
		.faq-answer {
			padding: 0 1.25rem 1.25rem;
		}
	}
</style>
