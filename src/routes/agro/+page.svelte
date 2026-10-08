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
		background: var(--color-liquid-abyss);
		padding: 4.5rem 0;
	}

	.agro-showcase-box {
		padding: clamp(2rem, 4vw, 3.2rem);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		background: var(--color-liquid-deep);
		box-shadow: none;
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
		background: rgba(237, 255, 254, 0.06);
		color: var(--color-liquid-mist);
		padding: 0.3rem 0.75rem;
		border-radius: var(--radius-small);
		font-size: 0.76rem;
		font-weight: 500;
		border: 1px solid rgba(203, 255, 252, 0.12);
	}

	.agro-p {
		font-size: 1rem;
		line-height: 1.65;
		color: var(--color-silver-mist);
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
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: none;
	}

	.hl-item {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.4rem 1.25rem;
		transition: border-color var(--transition-fast);
	}

	.hl-item:hover {
		border-color: rgba(203, 255, 252, 0.3);
	}

	.hl-icon {
		font-size: 1.8rem;
		flex-shrink: 0;
	}

	.hl-item strong {
		display: block;
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.3rem;
	}

	.hl-item p {
		font-size: 0.84rem;
		color: var(--color-silver-mist);
		line-height: 1.5;
	}

	/* Agro services list */
	.agro-cards-section {
		background: var(--color-liquid-deep);
		border-top: 1px solid var(--border-subtle);
	}

	.agro-services-list {
		display: flex;
		flex-direction: column;
		gap: 1.8rem;
	}

	.agro-srv-item {
		padding: 2.2rem;
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 2.5rem;
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		align-items: center;
		box-shadow: none;
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
		font-size: 0.74rem;
		color: var(--color-liquid-mist);
		background: rgba(237, 255, 254, 0.06);
		padding: 0.2rem 0.65rem;
		border-radius: var(--radius-small);
		font-weight: 500;
		border: 1px solid rgba(203, 255, 252, 0.1);
	}

	.badge-tag {
		font-size: 0.74rem;
		background: rgba(245, 158, 11, 0.15);
		color: #fbbf24;
		padding: 0.2rem 0.65rem;
		border-radius: var(--radius-small);
		font-weight: 600;
	}

	.agro-srv-item h3 {
		font-size: 1.4rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.5rem;
	}

	.srv-short {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-liquid-mist);
		margin-bottom: 0.8rem;
	}

	.srv-detailed {
		font-size: 0.86rem;
		line-height: 1.6;
		color: var(--color-silver-mist);
	}

	.srv-perks {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.86rem;
		font-weight: 500;
		color: var(--color-silver-mist);
		margin-bottom: 1.5rem;
	}

	.srv-bottom-action {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1.2rem;
		border-top: 1px solid var(--border-subtle);
	}

	.srv-price-box {
		display: flex;
		flex-direction: column;
	}

	.p-lbl {
		font-size: 0.72rem;
		color: var(--color-silver-mist);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.p-val {
		font-family: var(--font-heading);
		font-size: 1.35rem;
		font-weight: 500;
		color: var(--color-lavender-phosphor);
		letter-spacing: -0.02em;
	}
</style>
