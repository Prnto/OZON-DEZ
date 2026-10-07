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
		background: #f8fafc;
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
		background: #ffffff;
		border: 1px solid var(--border-light);
		border-radius: var(--radius-full);
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--text-body);
		cursor: pointer;
		transition: all var(--transition-fast);
		box-shadow: var(--shadow-sm);
	}

	.tab-btn:hover {
		border-color: var(--primary-600);
		color: var(--primary-800);
		transform: translateY(-1px);
	}

	.tab-btn.active {
		background: var(--primary-900);
		color: #ffffff;
		border-color: var(--primary-900);
		box-shadow: 0 4px 14px rgba(8, 26, 54, 0.25);
	}

	.cat-pill-num {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.08);
		font-size: 0.72rem;
		font-weight: 700;
	}

	.tab-btn.active .cat-pill-num {
		background: var(--accent-teal);
		color: var(--primary-950);
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
		padding: 1.1rem 1.6rem;
		border-radius: var(--radius-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-left: 5px solid;
		background: #ffffff;
		box-shadow: var(--shadow-sm);
	}

	.category-header-bar.color-blue {
		border-left-color: #1f5cb5;
		background: linear-gradient(90deg, rgba(31, 92, 181, 0.06) 0%, #ffffff 100%);
	}

	.category-header-bar.color-teal {
		border-left-color: #00d4aa;
		background: linear-gradient(90deg, rgba(0, 212, 170, 0.08) 0%, #ffffff 100%);
	}

	.category-header-bar.color-amber {
		border-left-color: #f59e0b;
		background: linear-gradient(90deg, rgba(245, 158, 11, 0.08) 0%, #ffffff 100%);
	}

	.category-header-bar.color-cyan {
		border-left-color: #00b4d8;
		background: linear-gradient(90deg, rgba(0, 180, 216, 0.08) 0%, #ffffff 100%);
	}

	.cat-bar-left {
		display: flex;
		align-items: center;
		gap: 1.1rem;
	}

	.cat-num-badge {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--primary-900);
		background: rgba(0, 0, 0, 0.04);
		width: 44px;
		height: 44px;
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cat-bar-title {
		font-size: 1.3rem;
		font-weight: 800;
		color: var(--primary-950);
		margin-bottom: 0.15rem;
	}

	.cat-bar-subtitle {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-muted);
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1.6rem;
	}

	@media (max-width: 640px) {
		.services-grid {
			grid-template-columns: 1fr;
		}
	}

	.service-card {
		padding: 1.8rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border: 1px solid var(--border-light);
		transition: all var(--transition-norm);
	}

	.service-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: rgba(0, 212, 170, 0.4);
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
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-full);
		font-size: 0.72rem;
		font-weight: 700;
		background: linear-gradient(135deg, #f59e0b, #ef4444);
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.service-target-tag {
		font-size: 0.76rem;
		color: var(--text-muted);
		background: #f1f5f9;
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-full);
		font-weight: 600;
	}

	.service-name {
		font-size: 1.28rem;
		font-weight: 800;
		color: var(--primary-900);
		margin-bottom: 0.6rem;
	}

	.service-desc {
		font-size: 0.92rem;
		line-height: 1.5;
		color: #334155;
		font-weight: 500;
		margin-bottom: 1rem;
	}

	.service-fulldesc {
		font-size: 0.85rem;
		line-height: 1.55;
		color: #64748b;
		margin-bottom: 1.1rem;
		border-top: 1px dashed var(--border-light);
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
		color: #1e293b;
		font-weight: 600;
	}

	.check-icon {
		color: #00a886;
		font-weight: 800;
		font-size: 0.9rem;
	}

	.service-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1.2rem;
		border-top: 1px solid var(--border-light);
		gap: 0.8rem;
	}

	.service-price {
		display: flex;
		flex-direction: column;
	}

	.price-label {
		font-size: 0.72rem;
		color: var(--text-muted);
		text-transform: uppercase;
		font-weight: 700;
	}

	.price-val {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--primary-900);
		font-family: var(--font-heading);
	}

	/* Ozone Spotlight */
	.ozone-spotlight-card {
		margin-top: 4.5rem;
		padding: 3rem;
		position: relative;
		overflow: hidden;
		background: radial-gradient(circle at 10% 20%, #0d2850 0%, #06152b 100%);
		border: 1px solid rgba(0, 212, 170, 0.3);
		box-shadow: 0 20px 45px rgba(4, 13, 26, 0.4);
	}

	@media (max-width: 768px) {
		.ozone-spotlight-card {
			padding: 2rem 1.5rem;
		}
	}

	.ozone-title {
		font-size: clamp(1.6rem, 2.8vw, 2.2rem);
		color: #ffffff;
		margin-bottom: 1rem;
	}

	.ozone-p {
		font-size: 1.05rem;
		color: #cbd5e1;
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
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius-md);
		padding: 1.25rem;
		transition: transform var(--transition-fast);
	}

	.ozone-b-item:hover {
		transform: translateY(-2px);
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(0, 212, 170, 0.3);
	}

	.b-icon {
		font-size: 1.8rem;
		margin-bottom: 0.6rem;
	}

	.b-title {
		font-size: 0.98rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 0.35rem;
	}

	.b-desc {
		font-size: 0.8rem;
		color: #94a3b8;
		line-height: 1.45;
	}

	.ozone-cta-row {
		display: flex;
		gap: 1rem;
	}
</style>
