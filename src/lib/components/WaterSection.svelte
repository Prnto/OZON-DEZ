<script lang="ts">
	import { asset } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let water = $derived(currentContent.waterSection);
</script>

<section id="water" class="section water-section">
	<div class="container">
		<div class="water-card glass-card-dark">
			<div class="water-grid">
				<div class="water-info">
					<div class="section-badge dark">{water.badge}</div>
					<h2 class="water-title">{water.title}</h2>
					<div class="water-kved-tag">
						{#if langState.current === 'ua'}
							Забір, очищення та безпечне постачання води
						{:else if langState.current === 'ru'}
							Забор, очистка и безопасная поставка воды
						{:else}
							Water intake, purification, and safe supply
						{/if}
					</div>
					<p class="water-desc">{water.description}</p>

					<div class="water-points-list">
						{#each water.points as point}
							<div class="water-point">
								<span class="water-dot">💧</span>
								<span>{point}</span>
							</div>
						{/each}
					</div>

					<div class="water-action">
						<button
							type="button"
							class="btn btn-primary btn-lg"
							onclick={() => orderModal.open({ serviceTitle: water.title })}
						>
							<span>🚿 {water.cta}</span>
						</button>
					</div>
				</div>

				<div class="water-media">
					<div class="media-frame">
						<img
							src={asset('images/water-purification.webp')}
							alt="Дезінфекція систем водопостачання та очищення води ОЗОН-ДЕЗ"
							class="water-img"
							loading="lazy"
						/>
						<div class="water-badge-overlay">
							<span class="shield-badge">{water.badgeOverlay.shield}</span>
							<span class="clean-badge">{water.badgeOverlay.clean}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.water-section {
		background: transparent;
		padding: var(--space-3xl) 0;
	}

	.water-card {
		padding: 3.5rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: none;
	}

	@media (max-width: 900px) {
		.water-card {
			padding: 2rem 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.water-card {
			padding: 1.5rem 1.15rem;
		}
		.water-action .btn {
			width: 100%;
		}
	}

	.water-grid {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 3.5rem;
		align-items: center;
	}

	@media (max-width: 960px) {
		.water-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	.water-title {
		font-size: clamp(2rem, 3.2vw, 2.8rem);
		font-weight: 400;
		color: var(--color-bone-white);
		margin-bottom: 0.8rem;
		line-height: 1.2;
		letter-spacing: -0.04em;
	}

	.water-kved-tag {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-pill);
		font-size: 0.76rem;
		font-weight: 500;
		color: var(--color-silver-mist);
		margin-bottom: 1.25rem;
	}

	.water-desc {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-ash-gray);
		font-weight: 300;
		margin-bottom: 1.6rem;
	}

	.water-points-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 2.2rem;
	}

	.water-point {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.88rem;
		font-weight: 300;
		color: var(--color-ash-gray);
	}

	.water-dot {
		font-size: 1.1rem;
	}

	.media-frame {
		position: relative;
		border-radius: var(--radius-cards);
		overflow: hidden;
		border: 1px solid var(--border-subtle);
		box-shadow: none;
	}

	.water-img {
		width: 100%;
		aspect-ratio: 4/3;
		object-fit: cover;
		display: block;
	}

	.water-badge-overlay {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;
		background: rgba(9, 9, 9, 0.92);
		backdrop-filter: blur(8px);
		padding: 0.85rem 1.1rem;
		border-radius: 14px;
		border: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.shield-badge {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--color-saffron-spark);
	}

	.clean-badge {
		font-size: 0.74rem;
		color: var(--color-ash-gray);
		font-weight: 300;
	}
</style>
