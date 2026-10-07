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
			<div class="agro-grid">
				<div class="agro-media-col">
					<div class="agro-image-wrap glass-card">
						<img
							src={asset('images/agro-fumigation.jpg')}
							alt="Фумігація елеватора та зерносховища ОЗОН-ДЕЗ"
							class="agro-photo"
							loading="lazy"
						/>
						<div class="agro-kved-chips">
							<span class="kved-chip">КВЕД 01.61 (Рослинництво)</span>
							<span class="kved-chip">КВЕД 01.62 (Тваринництво)</span>
						</div>
					</div>
				</div>

				<div class="agro-text-col">
					<div class="section-badge">
						{#if langState.current === 'ua'}Елеватори та Логістика{:else}Элеваторы и Логистика{/if}
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

					<div class="agro-highlights">
						<div class="hl-item">
							<span class="hl-icon">🌾</span>
							<div>
								<strong>100% знищення шкідників</strong>
								<p>Препарати на основі фосфіду алюмінію діють на всі стадії комах (імаго, личинки, яйця).</p>
							</div>
						</div>
						<div class="hl-item">
							<span class="hl-icon">📜</span>
							<div>
								<strong>Фітосанітарний допуск</strong>
								<p>Видаємо акти газації та дегазації для отримання експортних сертифікатів.</p>
							</div>
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
	}

	.agro-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3.5rem;
		align-items: center;
	}

	@media (max-width: 960px) {
		.agro-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	.agro-image-wrap {
		position: relative;
		border-radius: var(--radius-xl);
		padding: 0.5rem;
		box-shadow: var(--shadow-lg);
	}

	.agro-photo {
		width: 100%;
		border-radius: calc(var(--radius-xl) - 4px);
		aspect-ratio: 16/11;
		object-fit: cover;
	}

	.agro-kved-chips {
		position: absolute;
		bottom: 1.25rem;
		left: 1.25rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.kved-chip {
		background: rgba(8, 26, 54, 0.9);
		backdrop-filter: blur(8px);
		color: var(--accent-teal);
		padding: 0.35rem 0.8rem;
		border-radius: var(--radius-full);
		font-size: 0.78rem;
		font-weight: 700;
		border: 1px solid rgba(0, 212, 170, 0.3);
	}

	.agro-p {
		font-size: 1.05rem;
		line-height: 1.65;
		color: #475569;
		margin-bottom: 2rem;
	}

	.agro-highlights {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.hl-item {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.hl-icon {
		font-size: 1.8rem;
	}

	.hl-item strong {
		display: block;
		font-size: 1.05rem;
		color: var(--primary-950);
		margin-bottom: 0.2rem;
	}

	.hl-item p {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.45;
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
