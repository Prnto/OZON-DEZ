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
							КВЕД 36.00: Забір, очищення та постачання води
						{:else}
							КВЭД 36.00: Забор, очистка и поставка воды
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
							src={asset('images/water-purification.jpg')}
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
		background: #f8fafc;
	}

	.water-card {
		padding: 3.5rem;
		background: linear-gradient(135deg, #071933 0%, #0d2e5a 100%);
		border: 1px solid rgba(0, 180, 216, 0.35);
		box-shadow: 0 24px 50px rgba(7, 25, 51, 0.35);
	}

	@media (max-width: 900px) {
		.water-card {
			padding: 2rem 1.5rem;
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
		font-size: clamp(1.8rem, 3vw, 2.4rem);
		color: #ffffff;
		margin-bottom: 0.8rem;
		line-height: 1.2;
	}

	.water-kved-tag {
		display: inline-block;
		padding: 0.3rem 0.8rem;
		background: rgba(0, 212, 170, 0.15);
		border: 1px solid rgba(0, 212, 170, 0.4);
		border-radius: var(--radius-full);
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--accent-teal);
		margin-bottom: 1.25rem;
	}

	.water-desc {
		font-size: 0.98rem;
		line-height: 1.65;
		color: #cbd5e1;
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
		font-size: 0.92rem;
		font-weight: 600;
		color: #ffffff;
	}

	.water-dot {
		font-size: 1.1rem;
	}

	.media-frame {
		position: relative;
		border-radius: var(--radius-xl);
		overflow: hidden;
		border: 2px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
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
		background: rgba(4, 13, 26, 0.85);
		backdrop-filter: blur(8px);
		padding: 0.8rem 1rem;
		border-radius: var(--radius-md);
		border: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.shield-badge {
		font-size: 0.85rem;
		font-weight: 800;
		color: var(--accent-teal);
	}

	.clean-badge {
		font-size: 0.76rem;
		color: #e2e8f0;
	}
</style>
