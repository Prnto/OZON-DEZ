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
			: langState.current === 'ru'
			? 'Озонирование помещений O₃, удаление запахов и плесени — ООО «ОЗОН-ДЕЗ»'
			: 'Room Ozonation O₃, Odor & Mold Removal — LLC "OZON-DEZ"'}
	</title>
	<meta
		name="description"
		content={langState.current === 'ua'
			? 'Глибоке озонування газом O₃ приміщень та ємностей, видалення запахів, знищення плісняви та демеркуризація ртуті в Чорноморську та Одеській області.'
			: langState.current === 'ru'
			? 'Глубокое озонирование газом O₃ помещений и емкостей, удаление запахов, уничтожение плесени и демеркуризация ртути в Черноморске и Одесской области.'
			: 'Deep O3 gas ozonation of premises and storage containers, odor elimination, mold destruction, and mercury demercurization in Chornomorsk and Odesa region.'}
	/>
</svelte:head>

<div class="ozone-page">
	<PageHeader
		badge={langState.current === 'ua' ? 'Екологічна стерилізація O₃' : langState.current === 'ru' ? 'Экологическая стерилизация O₃' : 'Eco Sterilization O₃'}
		title={langState.current === 'ua'
			? 'Професійне озонування, усунення запахів та плісняви'
			: langState.current === 'ru'
			? 'Профессиональное озонирование, устранение запахов и плесени'
			: 'Professional Ozonation, Odor & Mold Elimination'}
		subtitle={langState.current === 'ua'
			? 'Глибоке знезараження повітря та матеріалів газом озоном. Знищує 99.9% бактерій, спор грибка та вірусів без токсичної хімії.'
			: langState.current === 'ru'
			? 'Глубокое обеззараживание воздуха и материалов газом озоном. Убивает 99.9% патогенов, спор плесени и вирусов без токсичной химии.'
			: 'Deep disinfection of air and materials using ozone gas. Destroys 99.9% of bacteria, fungal spores, and viruses without toxic chemicals.'}
		crumbs={[{ label: currentContent.nav.ozone }]}
		imageSrc={asset('images/ozone-bg.webp')}
	/>

	<!-- Hero Feature Section -->
	<section class="section ozone-intro-section">
		<div class="container">
			<div class="ozone-intro-grid">
				<div class="intro-text-col">
					<div class="section-badge">
						{#if langState.current === 'ua'}Принцип дії озону{:else if langState.current === 'ru'}Принцип действия озона{:else}How Ozone Works{/if}
					</div>
					<h2 class="section-title">
						{#if langState.current === 'ua'}
							Чому озон O₃ перевершує звичайну хлорну хімію?
						{:else if langState.current === 'ru'}
							Почему озон O₃ превосходит обычную хлорную химию?
						{:else}
							Why O₃ Ozone Outperforms Conventional Chlorine Chemistry
						{/if}
					</h2>
					<p class="intro-p">
						{#if langState.current === 'ua'}
							Озон є найпотужнішим природним окислювачем. Маючи три атоми кисню замість двох, він миттєво вступає в реакцію з білковими оболонками вірусів, бактерій та ароматичних вуглеводнів, окислюючи та руйнуючи їх клітинну структуру.
						{:else if langState.current === 'ru'}
							Озон является мощнейшим природным окислителем. Имея три атома кислорода вместо двух, он мгновенно окисляет белковые оболочки вирусов, бактерий и ароматических углеводородов, полностью разрушая их структуру.
						{:else}
							Ozone is the strongest natural oxidizer. With three oxygen atoms instead of two, it immediately reacts with the protein membranes of viruses, bacteria, and aromatic hydrocarbons, completely breaking down their cellular structure.
						{/if}
					</p>

					<div class="comparison-cards">
						<div class="comp-card good">
							<div class="comp-badge">✅ {#if langState.current === 'en'}Ozone (O₃){:else}Озон (O₃){/if}</div>
							<ul>
								<li>{#if langState.current === 'ua'}100% проникнення в пори бетону і тканини{:else if langState.current === 'ru'}100% проникновение в поры бетона и ткани{:else}100% penetration into concrete pores and fabrics{/if}</li>
								<li>{#if langState.current === 'ua'}Розпадається на чистий кисень (O₂) за 30-40 хв{:else if langState.current === 'ru'}Распадается на чистый кислород (O₂) за 30-40 мин{:else}Decomposes into pure oxygen (O₂) in 30-40 min{/if}</li>
								<li>{#if langState.current === 'ua'}Не залишає нальоту і хімічних слідів{:else if langState.current === 'ru'}Не оставляет налета и химических следов{:else}Leaves zero residue and chemical traces{/if}</li>
								<li>{#if langState.current === 'ua'}Руйнує джерело запаху, а не маскує його{:else if langState.current === 'ru'}Разрушает источник запаха, а не маскирует его{:else}Destroys odor at molecular level, never masks{/if}</li>
							</ul>
						</div>

						<div class="comp-card bad">
							<div class="comp-badge bad-b">❌ {#if langState.current === 'ua'}Звичайна побутова хімія{:else if langState.current === 'ru'}Обычная бытовая химия{:else}Standard Household Chemicals{/if}</div>
							<ul>
								<li>{#if langState.current === 'ua'}Покриває лише зовнішню поверхню{:else if langState.current === 'ru'}Покрывает только внешнюю поверхность{:else}Covers only surface layer{/if}</li>
								<li>{#if langState.current === 'ua'}Токсичні випари хлору тримаються цілодобово{:else if langState.current === 'ru'}Токсичные испарения хлора держатся сутками{:else}Toxic chlorine vapors linger for days{/if}</li>
								<li>{#if langState.current === 'ua'}Може викликати алергію та астму{:else if langState.current === 'ru'}Может вызывать аллергию и астму{:else}Can cause allergic reactions and asthma{/if}</li>
								<li>{#if langState.current === 'ua'}Лише тимчасово маскує стійкі запахи{:else if langState.current === 'ru'}Лишь временно маскирует стойкие запахи{:else}Only temporarily covers odors with scents{/if}</li>
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
							{:else if langState.current === 'ru'}
								Свежесть после грозы с медицинской чистотой
							{:else}
								Post-thunderstorm freshness with clinical purity
							{/if}
						</h3>
						<div class="key-facts-list">
							<div class="fact-row">
								<span class="fact-num">300x</span>
								<span class="fact-txt">
									{#if langState.current === 'ua'}сильніший за дію хлору проти вірусів{:else if langState.current === 'ru'}сильнее действия хлора против вирусов{:else}stronger than chlorine against viruses{/if}
								</span>
							</div>
							<div class="fact-row">
								<span class="fact-num">99.9%</span>
								<span class="fact-txt">
									{#if langState.current === 'ua'}загибель бактерій та спор цвілі{:else if langState.current === 'ru'}гибель бактерий и спор плесени{:else}destruction of bacteria & mold spores{/if}
								</span>
							</div>
							<div class="fact-row">
								<span class="fact-num">0%</span>
								<span class="fact-txt">
									{#if langState.current === 'ua'}залишкової хімії або алергенів{:else if langState.current === 'ru'}остаточной химии или аллергенов{:else}residual chemistry or allergens{/if}
								</span>
							</div>
						</div>
						<button
							type="button"
							class="btn btn-primary"
							style="width: 100%; margin-top: 1.5rem;"
							onclick={() => orderModal.open({ serviceTitle: langState.current === 'ua' ? 'Озонування приміщення' : langState.current === 'ru' ? 'Озонирование помещения' : 'Facility ozonation' })}
						>
							{#if langState.current === 'ua'}Виклик спеціаліста з озонування{:else if langState.current === 'ru'}Вызов специалиста по озонированию{:else}Call ozonation specialist{/if}
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
					{#if langState.current === 'ua'}Спеціалізація озон-послуг{:else if langState.current === 'ru'}Специализация озон-услуг{:else}Ozone Services{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}4 напрямки еко-очищення приміщень{:else if langState.current === 'ru'}4 направления эко-очистки помещений{:else}4 eco-purification directions{/if}
				</h2>
				<p class="section-subtitle">
					{#if langState.current === 'ua'}
						Від комплексного знезараження квартир та ємностей до ліквідації стійких запахів, плісняви та демеркуризації ртуті.
					{:else if langState.current === 'ru'}
						От комплексного обеззараживания квартир и емкостей до ликвидации стойких запахов, плесени и демеркуризации ртути.
					{:else}
						From comprehensive purification of rooms and storage containers to permanent odor elimination, mold remediation, and mercury demercurization.
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
									{#if langState.current === 'ua'}Вартість:{:else if langState.current === 'ru'}Стоимость:{:else}Price:{/if}
								</span>
								<span class="price-digit">{srv.priceFrom}</span>
							</div>
							<button
								type="button"
								class="btn btn-primary btn-sm"
								onclick={() => orderModal.open({ serviceTitle: srv.title, serviceCategory: 'Озонування O₃' })}
							>
								{#if langState.current === 'ua'}Виклик спеціаліста{:else if langState.current === 'ru'}Вызов специалиста{:else}Call specialist{/if}
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
		background: transparent;
		padding: var(--space-3xl) 0;
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
		color: var(--color-ash-gray);
		font-weight: 300;
		margin-bottom: 2rem;
	}

	.comparison-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	@media (max-width: 600px) {
		.comparison-cards {
			grid-template-columns: 1fr;
		}
	}

	.comp-card {
		padding: 1.8rem;
		border-radius: var(--radius-cards);
		border: 1px solid var(--border-subtle);
		background: var(--color-surface);
	}

	.comp-card.good {
		border-color: rgba(128, 82, 255, 0.3);
	}

	.comp-card.bad {
		border-color: rgba(244, 63, 94, 0.25);
	}

	.comp-badge {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-saffron-spark);
		margin-bottom: 1rem;
	}

	.bad-b {
		color: #fb7185;
	}

	.comp-card ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		font-size: 0.85rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.5;
	}

	.ozone-glass-banner {
		padding: 2.5rem;
		border-radius: var(--radius-cards);
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		box-shadow: none;
	}

	.banner-o3-tag {
		font-size: 0.74rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--color-saffron-spark);
		margin-bottom: 0.6rem;
	}

	.ozone-glass-banner h3 {
		color: var(--color-bone-white);
		font-size: 1.45rem;
		font-weight: 400;
		letter-spacing: -0.03em;
		margin-bottom: 1.8rem;
		line-height: 1.3;
	}

	.key-facts-list {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.fact-row {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-subtle);
	}

	.fact-num {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 400;
		color: var(--color-electric-iris);
		line-height: 1;
		width: 85px;
		flex-shrink: 0;
		letter-spacing: -0.03em;
	}

	.fact-txt {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.5;
	}

	/* Services Grid */
	.ozone-services-section {
		background: transparent;
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
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
			padding: 1.5rem 1.25rem;
		}
	}

	.ozone-srv-card {
		padding: 2.2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.ozone-srv-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-electric-iris);
	}

	.srv-top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.2rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.srv-tag-badge {
		font-size: 0.72rem;
		font-weight: 600;
		background: rgba(255, 184, 41, 0.1);
		color: var(--color-saffron-spark);
		border: 1px solid rgba(255, 184, 41, 0.25);
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-pill);
	}

	.srv-target-pill {
		font-size: 0.74rem;
		color: var(--color-silver-mist);
		background: rgba(255, 255, 255, 0.05);
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-pill);
		font-weight: 500;
	}

	.srv-card-heading {
		font-size: 1.3rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.6rem;
	}

	.srv-card-intro {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.srv-card-desc-box {
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--color-ash-gray);
		font-weight: 300;
		padding: 0.9rem 0;
		border-top: 1px dashed var(--border-subtle);
		border-bottom: 1px dashed var(--border-subtle);
		margin-bottom: 1.2rem;
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
		color: var(--color-ash-gray);
		font-weight: 300;
	}

	.feat-check {
		color: var(--color-electric-iris);
		font-weight: 600;
	}

	.srv-card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1.2rem;
		border-top: 1px solid var(--border-subtle);
	}

	.srv-card-price {
		display: flex;
		flex-direction: column;
	}

	.price-lbl {
		font-size: 0.72rem;
		color: var(--color-ash-gray);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-weight: 500;
	}

	.price-digit {
		font-family: var(--font-heading);
		font-size: 1.3rem;
		font-weight: 500;
		color: var(--color-saffron-spark);
		letter-spacing: -0.02em;
	}
</style>
