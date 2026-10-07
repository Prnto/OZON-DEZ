<script lang="ts">
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
		imageSrc="/images/ozone-bg.jpg"
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
		background: #f8fafc;
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
		font-size: 1.05rem;
		line-height: 1.65;
		color: #475569;
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
		border-radius: var(--radius-md);
		border: 1px solid var(--border-light);
	}

	.comp-card.good {
		background: #f0fdf9;
		border-color: rgba(0, 212, 170, 0.4);
	}

	.comp-card.bad {
		background: #fef2f2;
		border-color: rgba(239, 68, 68, 0.2);
	}

	.comp-badge {
		font-size: 0.88rem;
		font-weight: 800;
		color: #00876c;
		margin-bottom: 0.8rem;
	}

	.bad-b {
		color: #b91c1c;
	}

	.comp-card ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.82rem;
		color: #334155;
	}

	.ozone-glass-banner {
		padding: 2.5rem;
		border-radius: var(--radius-xl);
		background: radial-gradient(circle at 10% 20%, #0c2d58 0%, #06152b 100%);
		border: 1px solid rgba(0, 212, 170, 0.35);
		box-shadow: 0 20px 45px rgba(6, 21, 43, 0.35);
	}

	.banner-o3-tag {
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		color: var(--accent-teal);
		margin-bottom: 0.5rem;
	}

	.ozone-glass-banner h3 {
		color: #ffffff;
		font-size: 1.4rem;
		margin-bottom: 1.8rem;
		line-height: 1.3;
	}

	.key-facts-list {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.fact-row {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.fact-num {
		font-family: var(--font-heading);
		font-size: 1.8rem;
		font-weight: 800;
		color: var(--accent-teal);
		line-height: 1;
		width: 80px;
		flex-shrink: 0;
	}

	.fact-txt {
		font-size: 0.85rem;
		color: #cbd5e1;
		line-height: 1.4;
	}

	/* Services Grid */
	.ozone-services-section {
		background: #ffffff;
	}

	.ozone-services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 1.8rem;
	}

	@media (max-width: 640px) {
		.ozone-services-grid {
			grid-template-columns: 1fr;
		}
	}

	.ozone-srv-card {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border: 1px solid var(--border-light);
		transition: all var(--transition-norm);
	}

	.ozone-srv-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: rgba(0, 212, 170, 0.4);
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
		font-weight: 700;
		background: rgba(0, 212, 170, 0.15);
		color: #00876c;
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-full);
	}

	.srv-target-pill {
		font-size: 0.76rem;
		color: var(--text-muted);
		background: #f1f5f9;
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-full);
		font-weight: 600;
	}

	.srv-card-heading {
		font-size: 1.35rem;
		font-weight: 800;
		color: var(--primary-950);
		margin-bottom: 0.5rem;
	}

	.srv-card-intro {
		font-size: 0.92rem;
		color: var(--text-body);
		line-height: 1.5;
		margin-bottom: 1rem;
	}

	.srv-card-desc-box {
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--text-muted);
		padding: 0.8rem 0;
		border-top: 1px dashed var(--border-light);
		border-bottom: 1px dashed var(--border-light);
		margin-bottom: 1.1rem;
	}

	.srv-feats {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.6rem;
	}

	.srv-feats li {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		font-size: 0.84rem;
		color: #1e293b;
		font-weight: 600;
	}

	.feat-check {
		color: #00a886;
		font-weight: 800;
	}

	.srv-card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1.2rem;
		border-top: 1px solid var(--border-light);
	}

	.srv-card-price {
		display: flex;
		flex-direction: column;
	}

	.price-lbl {
		font-size: 0.72rem;
		color: var(--text-muted);
		text-transform: uppercase;
		font-weight: 700;
	}

	.price-digit {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--primary-900);
	}
</style>
