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
		background: #f8fafc;
	}

	.faq-list {
		max-width: 860px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.faq-item {
		border: 1px solid var(--border-light);
		overflow: hidden;
		transition: all var(--transition-fast);
	}

	.faq-item.is-open {
		border-color: rgba(0, 212, 170, 0.4);
		box-shadow: var(--shadow-md);
	}

	.faq-question-btn {
		width: 100%;
		padding: 1.35rem 1.6rem;
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
		font-size: 1.08rem;
		font-weight: 700;
		color: var(--primary-950);
		line-height: 1.35;
	}

	.faq-arrow {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: #f1f5f9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary-800);
		flex-shrink: 0;
		transition: all var(--transition-fast);
	}

	.faq-item.is-open .faq-arrow {
		background: var(--accent-teal);
		color: #042436;
	}

	.faq-answer {
		padding: 0 1.6rem 1.4rem;
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
		color: #475569;
	}
</style>
