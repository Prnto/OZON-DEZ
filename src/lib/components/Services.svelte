<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap, type ServiceCategory, type ServiceItem } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let activeTab = $state<string>('all');

	let currentContent = $derived(contentMap[langState.current]);
	let sec = $derived(currentContent.servicesSection);

	let filteredCategories = $derived(
		activeTab === 'all'
			? currentContent.categories
			: currentContent.categories.filter((cat) => cat.id === activeTab)
	);

	function openServiceOrder(service: ServiceItem, category: ServiceCategory) {
		orderModal.open({
			serviceTitle: service.title,
			serviceCategory: category.title
		});
	}
</script>

<section id="services" class="section services-section">
	<div class="container">
		<div class="section-header">
			<div class="section-badge">{sec.badge}</div>
			<h2 class="section-title">{sec.title}</h2>
			<p class="section-subtitle">{sec.subtitle}</p>

			<!-- Direction Navigation Tabs -->
			<div class="category-tabs">
				<button
					type="button"
					class="tab-btn"
					class:active={activeTab === 'all'}
					onclick={() => (activeTab = 'all')}
				>
					{sec.allTab}
				</button>
				{#each currentContent.categories as cat}
					<button
						type="button"
						class="tab-btn cat-{cat.color}"
						class:active={activeTab === cat.id}
						onclick={() => (activeTab = cat.id)}
					>
						<span class="cat-pill-num">{cat.number}</span>
						<span>{cat.title.split('(')[0].trim()}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Services Grid grouped by Direction -->
		<div class="categories-wrapper">
			{#each filteredCategories as category}
				<div class="category-block" id={category.id === 'agro' ? 'agro' : `cat-${category.id}`}>
					<div class="category-header-bar color-{category.color}">
						<div class="cat-bar-left">
							<span class="cat-num-badge">{category.number}</span>
							<div>
								<h3 class="cat-bar-title">{category.title}</h3>
								<div class="cat-bar-subtitle">{category.badge}</div>
							</div>
						</div>
					</div>

					<div class="services-grid">
						{#each category.services as service}
							<div class="service-card glass-card">
								<div class="service-top">
									<div class="service-badge-row">
										{#if service.badge}
											<span class="service-hot-badge">{service.badge}</span>
										{/if}
										<span class="service-target-tag">🎯 {service.target}</span>
									</div>
									<h4 class="service-name">{service.title}</h4>
									<p class="service-desc">{service.shortDesc}</p>
								</div>

								<div class="service-body">
									<p class="service-fulldesc">{service.fullDesc}</p>
									<ul class="features-list">
										{#each service.features as feat}
											<li>
												<span class="check-icon">✓</span>
												<span>{feat}</span>
											</li>
										{/each}
									</ul>
								</div>

								<div class="service-footer">
									<div class="service-price">
										<span class="price-label">{sec.priceLabel}</span>
										<span class="price-val">{service.priceFrom}</span>
									</div>
									<button
										type="button"
										class="btn btn-primary btn-sm"
										onclick={() => openServiceOrder(service, category)}
									>
										{sec.orderBtn}
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Deep dive O3 Ozone Feature Spotlight -->
		<div id="ozone-block" class="ozone-spotlight-card glass-card-dark">
			<div class="ozone-content">
				<div class="section-badge dark">{sec.ozoneSpotlight.badge}</div>
				<h3 class="ozone-title">{sec.ozoneSpotlight.title}</h3>
				<p class="ozone-p">{sec.ozoneSpotlight.desc}</p>
				<div class="ozone-benefits-grid">
					{#each sec.ozoneSpotlight.benefits as benefit}
						<div class="ozone-b-item">
							<div class="b-icon">{benefit.icon}</div>
							<div class="b-title">{benefit.title}</div>
							<div class="b-desc">{benefit.desc}</div>
						</div>
					{/each}
				</div>
				<div class="ozone-cta-row">
					<button
						type="button"
						class="btn btn-primary"
						onclick={() => orderModal.open({ serviceTitle: sec.ozoneSpotlight.title })}
					>
						{sec.ozoneSpotlight.cta}
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.services-section {
		background: var(--color-liquid-abyss);
	}

	.category-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		justify-content: center;
		margin-top: 2rem;
	}

	.tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 1.15rem;
		background: var(--color-liquid-kelp);
		border: 1px solid rgba(203, 255, 252, 0.12);
		border-radius: var(--radius-small);
		font-size: 0.86rem;
		font-weight: 500;
		color: var(--color-silver-mist);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.tab-btn:hover {
		border-color: rgba(203, 255, 252, 0.35);
		color: var(--color-platinum);
		transform: translateY(-1px);
	}

	.tab-btn.active {
		background: var(--gradient-aurora);
		color: #02201e;
		font-weight: 600;
		border-color: rgba(255, 255, 255, 0.6);
	}

	.cat-pill-num {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 4px;
		background: rgba(0, 0, 0, 0.15);
		font-size: 0.72rem;
		font-weight: 700;
	}

	.tab-btn.active .cat-pill-num {
		background: rgba(2, 32, 30, 0.2);
		color: #02201e;
	}

	.categories-wrapper {
		display: flex;
		flex-direction: column;
		gap: 3.5rem;
	}

	.category-block {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.category-header-bar {
		padding: 1.2rem clamp(1rem, 2vw, 1.8rem);
		border-radius: var(--radius-cards);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid rgba(203, 255, 252, 0.12);
		background: var(--color-liquid-kelp);
		gap: 1rem;
		flex-wrap: wrap;
	}

	@media (max-width: 640px) {
		.category-header-bar {
			padding: 0.9rem 1.1rem;
		}
	}

	.cat-bar-left {
		display: flex;
		align-items: center;
		gap: 1.1rem;
	}

	.cat-num-badge {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 500;
		color: var(--color-platinum);
		background: rgba(0, 130, 124, 0.35);
		border: 1px solid rgba(203, 255, 252, 0.15);
		width: 44px;
		height: 44px;
		border-radius: var(--radius-small);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cat-bar-title {
		font-size: 1.3rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.15rem;
		letter-spacing: -0.02em;
	}

	.cat-bar-subtitle {
		font-size: 0.82rem;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-liquid-mist);
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
		gap: 1.5rem;
	}

	@media (max-width: 640px) {
		.services-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	.service-card {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: var(--color-liquid-kelp);
		border-radius: var(--radius-cards);
		border: 1px solid rgba(203, 255, 252, 0.09);
		transition: all var(--transition-norm);
	}

	.service-card:hover {
		transform: translateY(-3px);
		border-color: rgba(203, 255, 252, 0.25);
	}

	.service-badge-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.service-hot-badge {
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-small);
		font-size: 0.72rem;
		font-weight: 600;
		background: rgba(245, 158, 11, 0.2);
		border: 1px solid rgba(245, 158, 11, 0.4);
		color: #fcd34d;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.service-target-tag {
		font-size: 0.74rem;
		color: var(--color-liquid-mist);
		background: rgba(0, 130, 124, 0.25);
		border: 1px solid rgba(203, 255, 252, 0.1);
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-small);
		font-weight: 500;
	}

	.service-name {
		font-size: 1.25rem;
		font-weight: 500;
		color: var(--color-platinum);
		letter-spacing: -0.02em;
		margin-bottom: 0.6rem;
	}

	.service-desc {
		font-size: 0.92rem;
		line-height: 1.5;
		color: var(--color-silver-mist);
		margin-bottom: 1rem;
	}

	.service-fulldesc {
		font-size: 0.84rem;
		line-height: 1.55;
		color: #8e9e9d;
		margin-bottom: 1.1rem;
		border-top: 1px dashed rgba(203, 255, 252, 0.08);
		padding-top: 0.8rem;
	}

	.features-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		margin-bottom: 1.5rem;
	}

	.features-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		font-size: 0.84rem;
		color: var(--color-liquid-mist);
		font-weight: 400;
	}

	.check-icon {
		color: #cbfffc;
		font-weight: 800;
		font-size: 0.9rem;
	}

	.service-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1.2rem;
		border-top: 1px solid rgba(203, 255, 252, 0.08);
		gap: 0.8rem;
	}

	.service-price {
		display: flex;
		flex-direction: column;
	}

	.price-label {
		font-size: 0.7rem;
		color: #8e9e9d;
		text-transform: uppercase;
		font-weight: 500;
		letter-spacing: 0.08em;
	}

	.price-val {
		font-size: 1.25rem;
		font-weight: 500;
		color: var(--color-lavender-phosphor);
		font-family: var(--font-heading);
	}

	/* Ozone Spotlight */
	.ozone-spotlight-card {
		margin-top: 4.5rem;
		padding: 3rem;
		position: relative;
		overflow: hidden;
		background: var(--color-liquid-deep);
		border-radius: var(--radius-cards);
		border: 1px solid rgba(203, 255, 252, 0.15);
	}

	@media (max-width: 768px) {
		.ozone-spotlight-card {
			padding: 2rem 1.5rem;
		}
	}

	.ozone-title {
		font-size: clamp(1.6rem, 2.8vw, 2.2rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		color: var(--color-platinum);
		margin-bottom: 1rem;
	}

	.ozone-p {
		font-size: 1.05rem;
		color: var(--color-silver-mist);
		max-width: 800px;
		margin-bottom: 2.2rem;
		line-height: 1.6;
	}

	.ozone-benefits-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.4rem;
		margin-bottom: 2.5rem;
	}

	@media (max-width: 900px) {
		.ozone-benefits-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 520px) {
		.ozone-benefits-grid {
			grid-template-columns: 1fr;
		}
	}

	.ozone-b-item {
		padding: 1.25rem;
		background: var(--color-liquid-kelp);
		border-radius: var(--radius-cards);
		border: 1px solid rgba(203, 255, 252, 0.08);
		transition: transform var(--transition-fast);
	}

	.ozone-b-item:hover {
		transform: translateY(-2px);
		border-color: rgba(203, 255, 252, 0.25);
	}

	.b-icon {
		font-size: 1.8rem;
		margin-bottom: 0.6rem;
	}

	.b-title {
		font-size: 0.98rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.35rem;
	}

	.b-desc {
		font-size: 0.8rem;
		color: var(--color-silver-mist);
		line-height: 1.45;
	}

	.ozone-cta-row {
		display: flex;
		gap: 1rem;
	}
</style>
