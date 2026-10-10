<script lang="ts">
	import { ClipboardText } from 'phosphor-svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let b2b = $derived(currentContent.b2bSection);
</script>

<section id="b2b" class="section b2b-section">
	<div class="container">
		<!-- Section Header -->
		<div class="b2b-intro-block">

			<h2 class="b2b-section-heading">
				{#if langState.current === 'ua'}
					Комплексна програма санітарного аудиту та захисту підприємств
				{:else if langState.current === 'ru'}
					Комплексная программа санитарного аудита и защиты предприятий
				{:else}
					Comprehensive sanitary audit and enterprise protection program
				{/if}
			</h2>
			<p class="b2b-lead-desc">
				{b2b.content1}
			</p>
		</div>

		<!-- 4 Key HACCP Standards Cards -->
		<div class="points-grid">
			{#each b2b.points as pt}
				<div class="point-item glass-card">
					<div class="point-icon-box">
						<ClipboardText size={24} weight="duotone" />
					</div>
					<div class="point-content">
						<h3 class="point-title">{pt.title}</h3>
						<p class="point-desc">{pt.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.b2b-section {
		background: transparent;
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.b2b-intro-block {
		max-width: 860px;
		margin-bottom: 3rem;
	}


	.b2b-section-heading {
		font-size: clamp(2rem, 3.5vw, 2.8rem);
		font-weight: 400;
		color: var(--color-bone-white);
		line-height: 1.2;
		margin: 1rem 0 1.2rem;
		letter-spacing: -0.04em;
	}

	.b2b-lead-desc {
		font-size: 1.05rem;
		line-height: 1.65;
		color: var(--color-ash-gray);
		font-weight: 300;
		max-width: 760px;
	}

	:global(html[data-theme="light"]) .b2b-lead-desc {
		color: #4d5757;
	}

	/* 4 Points Grid */
	.points-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 1024px) {
		.points-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.points-grid {
			grid-template-columns: 1fr;
		}
	}

	.point-item {
		padding: 2.2rem 1.8rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.point-item:hover {
		transform: translateY(-2px);
		border-color: var(--color-electric-iris);
	}

	.point-icon-box {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: var(--color-deep-verdant);
	}

	.point-title {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
		line-height: 1.35;
	}

	.point-desc {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
	}

	:global(html[data-theme="light"]) .point-item {
		background: #ffffff;
		border: 1px solid #c9cbbe;
		box-shadow: none !important;
	}

	:global(html[data-theme="light"]) .point-item:hover {
		border-color: #222f30;
		box-shadow: none !important;
	}

	:global(html[data-theme="light"]) .point-title {
		color: #222f30;
	}

	:global(html[data-theme="light"]) .point-desc {
		color: #4d5757;
	}

	:global(html[data-theme="light"]) .point-icon-box {
		color: #15846e;
	}
</style>
