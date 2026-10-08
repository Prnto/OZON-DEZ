<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';
	import { orderModal } from '../../lib/state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let ozoneCategory = $derived(
		currentContent.categories.find((c) => c.id === 'ozone') || currentContent.categories[1]
	);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Озонування приміщень O₃, видалення запахів та плісняви — ТОВ «ОЗОН-ДЕЗ»'
			: 'Озонирование помещений O₃, удаление запахов и плесени — ООО «ОЗОН-ДЕЗ»'}
	</title>
	<meta
		name="description"
		content="Глибоке озонування газом O₃, виведення запаху гару після пожежі, знищення плісняви та демеркуризація ртуті в Чорноморську та Одеській області."
	/>
</svelte:head>

<div class="ozone-page">
	<PageHeader
		badge={langState.current === 'ua' ? 'Екологічна стерилізація O₃' : 'Экологическая стерилизация O₃'}
		title={langState.current === 'ua'
			? 'Професійне озонування, усунення запахів та плісняви'
			: 'Профессиональное озонирование, устранение запахов и плесени'}
		subtitle={langState.current === 'ua'
			? 'Глибоке знезараження повітря та матеріалів газом озоном. Знищує 99.9% бактерій, спор грибка та вірусів без токсичної хімії.'
			: 'Глубокое обеззараживание воздуха и материалов газом озоном. Убивает 99.9% патогенов, спор плесени и вирусов без токсичной химии.'}
		crumbs={[{ label: currentContent.nav.ozone }]}
		imageSrc={asset('images/ozone-bg.jpg')}
	/>

	<!-- Hero Feature Section -->
	<section class="section ozone-intro-section">
		<div class="container">
			<div class="ozone-intro-grid">
				<div class="intro-text-col">
					<div class="section-badge">
						{#if langState.current === 'ua'}Принцип дії озону{:else}Принцип действия озона{/if}
					</div>
					<h2 class="section-title">
						{#if langState.current === 'ua'}
							Чому озон O₃ перевершує звичайну хлорну хімію?
						{:else}
							Почему озон O₃ превосходит обычную хлорную химию?
						{/if}
					</h2>
					<p class="intro-p">
						{#if langState.current === 'ua'}
							Озон є найпотужнішим природним окислювачем. Маючи три атоми кисню замість двох, він миттєво вступає в реакцію з білковими оболонками вірусів, бактерій та ароматичних вуглеводнів, окислюючи та руйнуючи їх клітинну структуру.
						{:else}
							Озон является мощнейшим природным окислителем. Имея три атома кислорода вместо двух, он мгновенно окисляет белковые оболочки вирусов, бактерий и ароматических углеводородов, полностью разрушая их структуру.
						{/if}
					</p>

					<div class="comparison-cards">
						<div class="comp-card good">
							<div class="comp-badge">✅ Озон (O₃)</div>
							<ul>
								<li>100% проникнення в пори бетону і тканини</li>
								<li>Розпадається на чистий кисень (O₂) за 30-40 хв</li>
								<li>Не залишає нальоту і хімічних слідів</li>
								<li>Руйнує джерело запаху, а не маскує його</li>
							</ul>
						</div>

						<div class="comp-card bad">
							<div class="comp-badge bad-b">❌ Звичайна побутова хімія</div>
							<ul>
								<li>Покриває лише зовнішню поверхню</li>
								<li>Токсичні випари хлору тримаються цілодобово</li>
								<li>Може викликати алергію та астму</li>
								<li>Лише тимчасово маскує стійкі запахи</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="intro-visual-col">
					<div class="ozone-glass-banner glass-card-dark">
						<div class="banner-o3-tag">O₃ MOLECULAR DEFENSE</div>
						<h3>
							{#if langState.current === 'ua'}
								Свіжість після грози з медичною чистотою
							{:else}
								Свежесть после грозы с медицинской чистотой
							{/if}
						</h3>
						<div class="key-facts-list">
							<div class="fact-row">
								<span class="fact-num">300x</span>
								<span class="fact-txt">
									{#if langState.current === 'ua'}сильніший за дію хлору проти вірусів{:else}сильнее действия хлора против вирусов{/if}
								</span>
							</div>
							<div class="fact-row">
								<span class="fact-num">99.9%</span>
								<span class="fact-txt">
									{#if langState.current === 'ua'}загибель бактерій та спор цвілі{:else}гибель бактерий и спор плесени{/if}
								</span>
							</div>
							<div class="fact-row">
								<span class="fact-num">0%</span>
								<span class="fact-txt">
									{#if langState.current === 'ua'}залишкової хімії або алергенів{:else}остаточной химии или аллергенов{/if}
								</span>
							</div>
						</div>
						<button
							type="button"
							class="btn btn-primary"
							style="width: 100%; margin-top: 1.5rem;"
							onclick={() => orderModal.open({ serviceTitle: 'Озонування приміщення' })}
						>
							{#if langState.current === 'ua'}Замовити озонування об'єкта{:else}Заказать озонирование объекта{/if}
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Dedicated 4 Services Showcase -->
	<section class="section ozone-services-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}Спеціалізація озон-послуг{:else}Специализация озон-услуг{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}4 напрямки еко-очищення приміщень{:else}4 направления эко-очистки помещений{/if}
				</h2>
				<p class="section-subtitle">
					{#if langState.current === 'ua'}
						Від комплексного знезараження квартир до екстреного виведення гару після пожеж та демеркуризації ртуті.
					{:else}
						От комплексного обеззараживания квартир до экстренного выведения гари после пожаров и демеркуризации ртути.
					{/if}
				</p>
			</div>

			<div class="ozone-services-grid">
				{#each ozoneCategory.services as srv}
					<div class="ozone-srv-card glass-card" id={srv.id}>
						<div class="srv-top-row">
							{#if srv.badge}
								<span class="srv-tag-badge">{srv.badge}</span>
							{/if}
							<span class="srv-target-pill">🎯 {srv.target}</span>
						</div>

						<h3 class="srv-card-heading">{srv.title}</h3>
						<p class="srv-card-intro">{srv.shortDesc}</p>

						<div class="srv-card-desc-box">
							<p>{srv.fullDesc}</p>
						</div>

						<ul class="srv-feats">
							{#each srv.features as feat}
								<li>
									<span class="feat-check">✓</span>
									<span>{feat}</span>
								</li>
							{/each}
						</ul>

						<div class="srv-card-footer">
							<div class="srv-card-price">
								<span class="price-lbl">
									{#if langState.current === 'ua'}Вартість:{:else}Стоимость:{/if}
								</span>
								<span class="price-digit">{srv.priceFrom}</span>
							</div>
							<button
								type="button"
								class="btn btn-primary btn-sm"
								onclick={() => orderModal.open({ serviceTitle: srv.title, serviceCategory: 'Озонування O₃' })}
							>
								{#if langState.current === 'ua'}Замовити виїзд{:else}Заказать выезд{/if}
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.ozone-intro-section {
		background: var(--color-liquid-abyss);
	}

	.ozone-intro-grid {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 3.5rem;
		align-items: center;
	}

	@media (max-width: 992px) {
		.ozone-intro-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}

	.intro-p {
		font-size: 1rem;
		line-height: 1.65;
		color: var(--color-silver-mist);
		margin-bottom: 2rem;
	}

	.comparison-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	@media (max-width: 600px) {
		.comparison-cards {
			grid-template-columns: 1fr;
		}
	}

	.comp-card {
		padding: 1.4rem;
		border-radius: var(--radius-cards);
		border: 1px solid var(--border-subtle);
	}

	.comp-card.good {
		background: var(--color-liquid-kelp);
		border-color: rgba(203, 255, 252, 0.2);
	}

	.comp-card.bad {
		background: var(--color-liquid-deep);
		border-color: rgba(244, 63, 94, 0.2);
	}

	.comp-badge {
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--color-liquid-mist);
		margin-bottom: 0.8rem;
	}

	.bad-b {
		color: #fb7185;
	}

	.comp-card ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.82rem;
		color: var(--color-silver-mist);
	}

	.ozone-glass-banner {
		padding: 2.2rem 2.5rem;
		border-radius: var(--radius-cards);
		background: var(--color-liquid-deep);
		border: 1px solid var(--border-subtle);
		box-shadow: none;
	}

	.banner-o3-tag {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--color-liquid-mist);
		margin-bottom: 0.5rem;
	}

	.ozone-glass-banner h3 {
		color: var(--color-platinum);
		font-size: 1.35rem;
		font-weight: 500;
		margin-bottom: 1.6rem;
		line-height: 1.3;
	}

	.key-facts-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.fact-row {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid var(--border-subtle);
	}

	.fact-num {
		font-family: var(--font-heading);
		font-size: 1.8rem;
		font-weight: 500;
		color: var(--color-lavender-phosphor);
		line-height: 1;
		width: 80px;
		flex-shrink: 0;
		letter-spacing: -0.02em;
	}

	.fact-txt {
		font-size: 0.84rem;
		color: var(--color-silver-mist);
		line-height: 1.4;
	}

	/* Services Grid */
	.ozone-services-section {
		background: var(--color-liquid-deep);
		border-top: 1px solid var(--border-subtle);
	}

	.ozone-services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 310px), 1fr));
		gap: 1.5rem;
	}

	@media (max-width: 640px) {
		.ozone-services-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		.ozone-srv-card {
			padding: 1.4rem 1.15rem;
		}
	}

	.ozone-srv-card {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.ozone-srv-card:hover {
		transform: translateY(-2px);
		border-color: rgba(203, 255, 252, 0.28);
	}

	.srv-top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.srv-tag-badge {
		font-size: 0.72rem;
		font-weight: 500;
		background: rgba(237, 255, 254, 0.08);
		color: var(--color-liquid-mist);
		border: 1px solid rgba(203, 255, 252, 0.15);
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-small);
	}

	.srv-target-pill {
		font-size: 0.74rem;
		color: var(--color-silver-mist);
		background: rgba(237, 255, 254, 0.05);
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-small);
		font-weight: 500;
	}

	.srv-card-heading {
		font-size: 1.25rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.5rem;
	}

	.srv-card-intro {
		font-size: 0.88rem;
		color: var(--color-silver-mist);
		line-height: 1.5;
		margin-bottom: 1rem;
	}

	.srv-card-desc-box {
		font-size: 0.84rem;
		line-height: 1.6;
		color: var(--color-silver-mist);
		padding: 0.8rem 0;
		border-top: 1px dashed rgba(203, 255, 252, 0.1);
		border-bottom: 1px dashed rgba(203, 255, 252, 0.1);
		margin-bottom: 1.1rem;
	}

	.srv-feats {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		margin-bottom: 1.6rem;
	}

	.srv-feats li {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		font-size: 0.82rem;
		color: var(--color-silver-mist);
		font-weight: 500;
	}

	.feat-check {
		color: var(--color-liquid-mist);
		font-weight: 600;
	}

	.srv-card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1.1rem;
		border-top: 1px solid var(--border-subtle);
	}

	.srv-card-price {
		display: flex;
		flex-direction: column;
	}

	.price-lbl {
		font-size: 0.72rem;
		color: var(--color-silver-mist);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.price-digit {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 500;
		color: var(--color-lavender-phosphor);
		letter-spacing: -0.02em;
	}
</style>
