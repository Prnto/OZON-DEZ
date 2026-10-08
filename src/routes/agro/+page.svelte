<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';
	import { orderModal } from '../../lib/state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let agroCat = $derived(
		currentContent.categories.find((c) => c.id === 'agro') || currentContent.categories[2]
	);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Фумігація елеваторів та складів зерна — ТОВ «ОЗОН-ДЕЗ»'
			: 'Фумигация элеваторов и складов зерна — ООО «ОЗОН-ДЕЗ»'}
	</title>
	<meta
		name="description"
		content="Професійна фумігація зерносховищ, елеваторів та складів від довгоносика, хрущака та вогнівки. Санітарний супровід агропідприємств за КВЕД 01.61, 01.62."
	/>
</svelte:head>

<div class="agro-page">
	<PageHeader
		badge={agroCat.badge}
		title={agroCat.title}
		subtitle={langState.current === 'ua'
			? 'Надійний захист врожаю, зерносховищ та елеваторів від шкідників запасів за експортними та фітосанітарними вимогами України.'
			: 'Надежная защита урожая, зернохранилищ и элеваторов от вредителей запасов по экспортным и фитосанитарным стандартам.'}
		crumbs={[{ label: currentContent.nav.agro }]}
		imageSrc={asset('images/agro-fumigation.jpg')}
	/>

	<section class="section agro-showcase-section">
		<div class="container">
			<div class="agro-showcase-box glass-card">
				<div class="agro-showcase-header">
					<div class="badge-row">
						<div class="section-badge">
							{#if langState.current === 'ua'}Елеватори та Логістика{:else}Элеваторы и Логистика{/if}
						</div>
						<span class="kved-chip">КВЕД 01.61 (Рослинництво)</span>
						<span class="kved-chip">КВЕД 01.62 (Тваринництво)</span>
					</div>
					<h2 class="section-title">
						{#if langState.current === 'ua'}
							Збереження якості зерна для внутрішнього ринку та експорту
						{:else}
							Сохранение качества зерна для внутреннего рынка и экспорта
						{/if}
					</h2>
					<p class="agro-p">
						{#if langState.current === 'ua'}
							Комірні шкідники (амбарний довгоносик, борошняний хрущак, зернова вогнівка) здатні знищити до 25% маси зерна за сезон та призвести до втрати схожості й зараження мікотоксинами. ТОВ «ОЗОН-ДЕЗ» проводить дезінсекцію порожніх ємностей, газацію силосів та вологу обробку складів перед завантаженням нового врожаю.
						{:else}
							Амбарные вредители способны уничтожить до 25% массы зерна и привести к потере экспортной кондиции. ООО «ОЗОН-ДЕЗ» выполняет газацию силосов, дезинсекцию пустых складов и влажную обработку зернохранилищ современными препаратами.
						{/if}
					</p>
				</div>

				<div class="agro-highlights-grid">
					<div class="hl-item glass-card-subtle">
						<span class="hl-icon">🌾</span>
						<div>
							<strong>100% знищення шкідників</strong>
							<p>Препарати на основі фосфіду алюмінію діють на всі стадії комах (імаго, личинки, яйця).</p>
						</div>
					</div>
					<div class="hl-item glass-card-subtle">
						<span class="hl-icon">📜</span>
						<div>
							<strong>Фітосанітарний допуск</strong>
							<p>Видаємо акти газації та дегазації для отримання експортних сертифікатів.</p>
						</div>
					</div>
					<div class="hl-item glass-card-subtle">
						<span class="hl-icon">⚡</span>
						<div>
							<strong>Швидка газація силосів</strong>
							<p>Безперебійна робота елеваторних комплексів без зупинки приймання автопоїздів.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Agro Services list -->
	<section class="section agro-cards-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title">
					{#if langState.current === 'ua'}Послуги напрямку для агропідприємств{:else}Услуги направления для агропредприятий{/if}
				</h2>
			</div>

			<div class="agro-services-list">
				{#each agroCat.services as srv}
					<div class="agro-srv-item glass-card">
						<div class="srv-main-info">
							<div class="srv-header-row">
								<span class="target-tag">🎯 {srv.target}</span>
								{#if srv.badge}
									<span class="badge-tag">{srv.badge}</span>
								{/if}
							</div>
							<h3>{srv.title}</h3>
							<p class="srv-short">{srv.shortDesc}</p>
							<p class="srv-detailed">{srv.fullDesc}</p>
						</div>

						<div class="srv-sidebar-info">
							<ul class="srv-perks">
								{#each srv.features as feat}
									<li>✔ {feat}</li>
								{/each}
							</ul>
							<div class="srv-bottom-action">
								<div class="srv-price-box">
									<span class="p-lbl">Вартість:</span>
									<span class="p-val">{srv.priceFrom}</span>
								</div>
								<button
									type="button"
									class="btn btn-primary"
									onclick={() => orderModal.open({ serviceTitle: srv.title, serviceCategory: 'Агросектор' })}
								>
									Замовити аудит
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.agro-showcase-section {
		background: #ffffff;
		padding: 4.5rem 0;
	}

	.agro-showcase-box {
		padding: clamp(2rem, 4vw, 3.2rem);
		border: 1.5px solid var(--border-light);
		border-radius: var(--radius-xl);
		background: #ffffff;
	}

	.agro-showcase-header {
		max-width: 900px;
		margin-bottom: 2.5rem;
	}

	.badge-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.kved-chip {
		background: #f1f5f9;
		color: var(--primary-900);
		padding: 0.35rem 0.8rem;
		border-radius: var(--radius-full);
		font-size: 0.78rem;
		font-weight: 700;
		border: 1px solid var(--border-light);
	}

	.agro-p {
		font-size: 1.05rem;
		line-height: 1.65;
		color: #475569;
		margin-top: 1rem;
	}

	.agro-highlights-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4rem;
	}

	@media (max-width: 900px) {
		.agro-highlights-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	.glass-card-subtle {
		background: #f8fafc;
		border: 1px solid var(--border-light);
		border-radius: var(--radius-md);
	}

	.hl-item {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.4rem 1.25rem;
		transition: all var(--transition-fast);
	}

	.hl-item:hover {
		transform: translateY(-2px);
		border-color: var(--primary-600);
		box-shadow: var(--shadow-sm);
	}

	.hl-icon {
		font-size: 1.8rem;
		flex-shrink: 0;
	}

	.hl-item strong {
		display: block;
		font-size: 1.02rem;
		color: var(--primary-950);
		margin-bottom: 0.3rem;
	}

	.hl-item p {
		font-size: 0.86rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	/* Agro services list */
	.agro-cards-section {
		background: #f8fafc;
	}

	.agro-services-list {
		display: flex;
		flex-direction: column;
		gap: 1.8rem;
	}

	.agro-srv-item {
		padding: 2.5rem;
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 2.5rem;
		border: 1px solid var(--border-light);
		align-items: center;
	}

	@media (max-width: 860px) {
		.agro-srv-item {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			padding: 1.8rem;
		}
	}

	@media (max-width: 480px) {
		.agro-srv-item {
			padding: 1.35rem 1rem;
		}
		.srv-bottom-action {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.85rem;
		}
		.srv-bottom-action .btn {
			width: 100%;
		}
	}

	.srv-header-row {
		display: flex;
		gap: 0.6rem;
		margin-bottom: 0.8rem;
	}

	.target-tag {
		font-size: 0.78rem;
		color: var(--text-muted);
		background: #f1f5f9;
		padding: 0.25rem 0.7rem;
		border-radius: var(--radius-full);
		font-weight: 600;
	}

	.badge-tag {
		font-size: 0.75rem;
		background: #fef3c7;
		color: #92400e;
		padding: 0.25rem 0.7rem;
		border-radius: var(--radius-full);
		font-weight: 700;
	}

	.agro-srv-item h3 {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--primary-950);
		margin-bottom: 0.6rem;
	}

	.srv-short {
		font-size: 0.98rem;
		font-weight: 600;
		color: var(--primary-800);
		margin-bottom: 0.8rem;
	}

	.srv-detailed {
		font-size: 0.88rem;
		line-height: 1.6;
		color: #64748b;
	}

	.srv-perks {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.88rem;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 1.6rem;
	}

	.srv-bottom-action {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1.2rem;
		border-top: 1px solid var(--border-light);
	}

	.srv-price-box {
		display: flex;
		flex-direction: column;
	}

	.p-lbl {
		font-size: 0.72rem;
		color: var(--text-muted);
		text-transform: uppercase;
		font-weight: 700;
	}

	.p-val {
		font-family: var(--font-heading);
		font-size: 1.35rem;
		font-weight: 800;
		color: var(--primary-900);
	}
</style>
