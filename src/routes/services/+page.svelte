<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import FaqSection from '#lib/components/FaqSection.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';
	import { orderModal } from '../../lib/state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Послуги дезінфекції, дезінсекції, озонування — ТОВ «ОЗОН-ДЕЗ»'
			: 'Услуги дезинфекции, дезинсекции, озонирования — ООО «ОЗОН-ДЕЗ»'}
	</title>
	<meta
		name="description"
		content="Повний каталог послуг санітарної безпеки ТОВ «ОЗОН-ДЕЗ»: дезінсекція, дератизація, озонування O₃, фумігація зерна, дезінфекція кухонь ресторанів HACCP."
	/>
</svelte:head>

<div class="services-page">
	<PageHeader
		badge={langState.current === 'ua' ? 'Напрямки діяльності & Фото робіт' : 'Направления деятельности & Фото работ'}
		title={langState.current === 'ua' ? 'Чим займається ТОВ «ОЗОН-ДЕЗ»: повний спектр санітарної безпеки' : 'Чем занимается ООО «ОЗОН-ДЕЗ»: полный спектр санитарной безопасности'}
		subtitle={langState.current === 'ua'
			? 'Професійна боротьба з комахами, гризунами, промислова дезінфекція кухонь ресторанів, складів, озонування та фумігація зерна у м. Чорноморськ, Одесі та області:'
			: 'Профессиональная борьба с насекомыми, грызунами, дезинфекция кухонь ресторанов, складов, озонирование и фумигация зерна в Черноморске, Одессе и области:'}
		crumbs={[{ label: currentContent.nav.services }]}
		imageSrc={asset('images/services-bg.jpg')}
	/>

	<!-- 6 Real Photo Visual Directions -->
	<section class="section hub-directions-section">
		<div class="container">
			<div class="directions-hub-grid">
				<!-- Card 1: Cockroaches & Insect Disinsection -->
				<div class="dir-card glass-card">
					<div class="dir-card-media">
						<img
							src={asset('images/pest-cockroaches.jpg')}
							alt="Дезінсекція тарганів, клопів, бліх холодним туманом ULV"
							class="dir-card-img"
							loading="lazy"
						/>
						<div class="dir-media-overlay"></div>
						<div class="dir-media-badges">
							<span class="dir-pill dir-pill-blue">🪳 {#if langState.current === 'ua'}Дезінсекція • Таргани & Клопи{:else}Дезинсекция • Тараканы & Клопы{/if}</span>
							<span class="dir-price">від 850 грн</span>
						</div>
					</div>
					<div class="dir-card-content">
						<h3 class="dir-title">
							{#if langState.current === 'ua'}Знищення тарганів, клопів і бліх{:else}Уничтожение тараканов, клопов и блох{/if}
						</h3>
						<p class="dir-desc">
							{#if langState.current === 'ua'}
								Швидке винищення прусаків, постільних клопів, мурах і кліщів дрібнодисперсним холодним туманом ULV. 100% проникнення в щілини без слідів на меблях.
							{:else}
								Быстрое уничтожение прусаков, постельных клопов, муравьев и клещей мелкодисперсным холодным туманом ULV. 100% проникновение в щели без следов.
							{/if}
						</p>
						<ul class="dir-checklist">
							<li>✓ {#if langState.current === 'ua'}100% загибель комах та кладок з 1-ї обробки{:else}100% гибель насекомых и кладок с 1-й обработки{/if}</li>
							<li>✓ {#if langState.current === 'ua'}Сертифіковані препарати МОЗ (безпечно для дітей та тварин){:else}Сертифицированные препараты МОЗ (безопасно для детей и животных){/if}</li>
							<li>✓ {#if langState.current === 'ua'}Офіційний гарантійний договір до 12 міс.{:else}Официальный гарантийный договор до 12 мес.{/if}</li>
						</ul>
						<div class="dir-card-footer">
							<a href={resolve('/calculator')} class="btn btn-outline dir-btn">
								{#if langState.current === 'ua'}Розрахувати онлайн →{:else}Рассчитать онлайн →{/if}
							</a>
							<button
								type="button"
								class="btn btn-primary btn-sm"
								onclick={() => orderModal.open({ serviceTitle: 'Дезінсекція: знищення тарганів та комах' })}
							>
								{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
							</button>
						</div>
					</div>
				</div>

				<!-- Card 2: Rodents Deratization (Rats & Mice) -->
				<div class="dir-card glass-card">
					<div class="dir-card-media">
						<img
							src={asset('images/deratization-rodents.jpg')}
							alt="Дератизація: знищення щурів, мишей, встановлення принадних станцій"
							class="dir-card-img"
							loading="lazy"
						/>
						<div class="dir-media-overlay"></div>
						<div class="dir-media-badges">
							<span class="dir-pill dir-pill-amber">🐀 {#if langState.current === 'ua'}Дератизація • Щури & Миші{:else}Дератизация • Крысы & Мыши{/if}</span>
							<span class="dir-price">від 950 грн</span>
						</div>
					</div>
					<div class="dir-card-content">
						<h3 class="dir-title">
							{#if langState.current === 'ua'}Знищення щурів та мишей{:else}Уничтожение крыс и мышей{/if}
						</h3>
						<p class="dir-desc">
							{#if langState.current === 'ua'}
								Бар'єрний захист приватних осель, підвалів, магазинів та складів від сірих щурів і мишей. Встановлення антивандальних принадних станцій із замком.
							{:else}
								Барьерная защита частных домов, подвалов, магазинов и складов от крыс и мышей. Установка антивандальных приманочных контейнеров с замком.
							{/if}
						</p>
						<ul class="dir-checklist">
							<li>✓ {#if langState.current === 'ua'}Європейські родентициди з муміфікуючим ефектом (без запаху){:else}Европейские родентициды с мумифицирующим эффектом (без запаха){/if}</li>
							<li>✓ {#if langState.current === 'ua'}Закриті контейнери: захист для домашніх улюбленців{:else}Закрытые контейнеры: защита для домашних питомцев{/if}</li>
							<li>✓ {#if langState.current === 'ua'}Ліквідація колонії та перекриття шляхів міграції{:else}Ликвидация колонии и перекрытие путей миграции{/if}</li>
						</ul>
						<div class="dir-card-footer">
							<a href={resolve('/calculator')} class="btn btn-outline dir-btn">
								{#if langState.current === 'ua'}Розрахувати онлайн →{:else}Рассчитать онлайн →{/if}
							</a>
							<button
								type="button"
								class="btn btn-primary btn-sm"
								onclick={() => orderModal.open({ serviceTitle: 'Дератизація: знищення щурів та мишей' })}
							>
								{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
							</button>
						</div>
					</div>
				</div>

				<!-- Card 3: Ozone O3 Treatment -->
				<div class="dir-card glass-card">
					<div class="dir-card-media">
						<img
							src={asset('images/ozone-bg.jpg')}
							alt="Озонування газом O3: видалення запахів після пожежі, цвілі, демеркуризація"
							class="dir-card-img"
							loading="lazy"
						/>
						<div class="dir-media-overlay"></div>
						<div class="dir-media-badges">
							<span class="dir-pill dir-pill-teal">💨 {#if langState.current === 'ua'}Озонування O₃ • Без хімії{:else}Озонирование O₃ • Без химии{/if}</span>
							<span class="dir-price">від 1 200 грн</span>
						</div>
					</div>
					<div class="dir-card-content">
						<h3 class="dir-title">
							{#if langState.current === 'ua'}Озонування O₃ & Видалення запахів{:else}Озонирование O₃ & Удаление запахов{/if}
						</h3>
						<p class="dir-desc">
							{#if langState.current === 'ua'}
								Потужна газова стерилізація озоном. Знищення запаху гару після пожежі, трупного запаху, тютюну, спор чорної цвілі та демеркуризація парів ртуті.
							{:else}
								Мощная газовая стерилизация озоном. Удаление гари после пожара, трупного запаха, табака, спор черной плесени и демеркуризация паров ртути.
							{/if}
						</p>
						<ul class="dir-checklist">
							<li>✓ {#if langState.current === 'ua'}У 300 разів сильніший за хлор, без нальоту та залишків{:else}В 300 раз сильнее хлора, без налета и остатков{/if}</li>
							<li>✓ {#if langState.current === 'ua'}Повне розщеплення молекул запаху та мікроорганізмів{:else}Полное расщепление молекул запаха и микроорганизмов{/if}</li>
							<li>✓ {#if langState.current === 'ua'}Замір концентрації парів ртуті сертифікованим приладом{:else}Замер паров ртути сертифицированным прибором{/if}</li>
						</ul>
						<div class="dir-card-footer">
							<a href={resolve('/ozone')} class="btn btn-outline dir-btn">
								{#if langState.current === 'ua'}Про озонування →{:else}Об озонировании →{/if}
							</a>
							<button
								type="button"
								class="btn btn-primary btn-sm"
								onclick={() => orderModal.open({ serviceTitle: 'Озонування O3 та демеркуризація' })}
							>
								{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
							</button>
						</div>
					</div>
				</div>

				<!-- Card 4: Restaurant Kitchens & HoReCa (HACCP) -->
				<div class="dir-card glass-card">
					<div class="dir-card-media">
						<img
							src={asset('images/restaurant-kitchen-dez.jpg')}
							alt="Дезінфекція кухонь ресторанів та пест-контроль HACCP для HoReCa"
							class="dir-card-img"
							loading="lazy"
						/>
						<div class="dir-media-overlay"></div>
						<div class="dir-media-badges">
							<span class="dir-pill dir-pill-dark">🍽️ {#if langState.current === 'ua'}Ресторани & HoReCa • HACCP{:else}Рестораны & HoReCa • HACCP{/if}</span>
							<span class="dir-price">від 1 800 грн/міс</span>
						</div>
					</div>
					<div class="dir-card-content">
						<h3 class="dir-title">
							{#if langState.current === 'ua'}Дезінфекція кухонь ресторанів & HACCP{:else}Дезинфекция кухонь ресторанов & HACCP{/if}
						</h3>
						<p class="dir-desc">
							{#if langState.current === 'ua'}
								Санітарне обслуговування кухонь закладів харчування, пекарень, кафе та готелів. Офіційний захист від штрафів Держпродспоживслужби.
							{:else}
								Санитарное обслуживание кухонь общепита, пекарен, кафе и гостиниц. Официальная защита от штрафов Госпотребслужбы.
							{/if}
						</p>
						<ul class="dir-checklist">
							<li>✓ {#if langState.current === 'ua'}Обробка в неробочий час та вночі (без простою закладу){:else}Обработка в нерабочее время и ночью (без простоя заведения){/if}</li>
							<li>✓ {#if langState.current === 'ua'}Впровадження та підтримка програми пест-контролю HACCP{:else}Внедрение и поддержка программы пест-контроля HACCP{/if}</li>
							<li>✓ {#if langState.current === 'ua'}Офіційний договір, акти виконаних робіт, схема пасток{:else}Официальный договор, акты выполненных работ, схема ловушек{/if}</li>
						</ul>
						<div class="dir-card-footer">
							<a href={resolve('/b2b')} class="btn btn-outline dir-btn">
								{#if langState.current === 'ua'}Для бізнесу →{:else}Для бизнеса →{/if}
							</a>
							<button
								type="button"
								class="btn btn-primary btn-sm"
								onclick={() => orderModal.open({ serviceTitle: 'Пест-контроль HACCP для ресторанів та кухонь' })}
							>
								{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
							</button>
						</div>
					</div>
				</div>

				<!-- Card 5: Warehouses & Logistics Facilities -->
				<div class="dir-card glass-card">
					<div class="dir-card-media">
						<img
							src={asset('images/warehouse-logistics-dez.jpg')}
							alt="Санація та дезінфекція логістичних складів, митних терміналів та виробництв"
							class="dir-card-img"
							loading="lazy"
						/>
						<div class="dir-media-overlay"></div>
						<div class="dir-media-badges">
							<span class="dir-pill dir-pill-cyan">🏢 {#if langState.current === 'ua'}Склади & Логістика • Промисловість{:else}Склады & Логистика • Промбезопасность{/if}</span>
							<span class="dir-price">від 2 200 грн</span>
						</div>
					</div>
					<div class="dir-card-content">
						<h3 class="dir-title">
							{#if langState.current === 'ua'}Санація складів та логістики{:else}Санация складов и логистики{/if}
						</h3>
						<p class="dir-desc">
							{#if langState.current === 'ua'}
								Промислова дезінфекція логістичних комплексів, митних складів порту Чорноморськ та Одеси, виробничих цехів великої кубатури.
							{:else}
								Промышленная дезинфекция логистических комплексов, складов порта Черноморск и Одессы, производственных цехов большой кубатуры.
							{/if}
						</p>
						<ul class="dir-checklist">
							<li>✓ {#if langState.current === 'ua'}Потужні генератори для обробки висотних складських зон{:else}Мощные генераторы для обработки высотных складских зон{/if}</li>
							<li>✓ {#if langState.current === 'ua'}Збереження продукції та сировини від псування шкідниками{:else}Защита продукции и сырья от порчи вредителями{/if}</li>
							<li>✓ {#if langState.current === 'ua'}Повний пакет санітарної документації та протоколів{:else}Полный пакет санитарной документации и протоколов{/if}</li>
						</ul>
						<div class="dir-card-footer">
							<a href={resolve('/b2b')} class="btn btn-outline dir-btn">
								{#if langState.current === 'ua'}Для складів →{:else}Для складов →{/if}
							</a>
							<button
								type="button"
								class="btn btn-primary btn-sm"
								onclick={() => orderModal.open({ serviceTitle: 'Санація та дезінфекція складських комплексів' })}
							>
								{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
							</button>
						</div>
					</div>
				</div>

				<!-- Card 6: Agro Sector & Fumigation -->
				<div class="dir-card glass-card">
					<div class="dir-card-media">
						<img
							src={asset('images/agro-fumigation.jpg')}
							alt="Фумігація елеваторів, зерна, силосів препаратами фосфіну"
							class="dir-card-img"
							loading="lazy"
						/>
						<div class="dir-media-overlay"></div>
						<div class="dir-media-badges">
							<span class="dir-pill dir-pill-amber">🌾 {#if langState.current === 'ua'}Агросектор • Фумігація Зерна{:else}Агросектор • Фумигация Зерна{/if}</span>
							<span class="dir-price">від 15 грн/т</span>
						</div>
					</div>
					<div class="dir-card-content">
						<h3 class="dir-title">
							{#if langState.current === 'ua'}Фумігація елеваторів & зерна{:else}Фумигация элеваторов & зерна{/if}
						</h3>
						<p class="dir-desc">
							{#if langState.current === 'ua'}
								Газація зернових культур у силосах, складах підлогового зберігання та трюмах суден препаратами фосфіду алюмінію (PH₃).
							{:else}
								Газация зерновых культур в силосах, напольных складах и трюмах судов препаратами фосфида алюминия (PH₃).
							{/if}
						</p>
						<ul class="dir-checklist">
							<li>✓ {#if langState.current === 'ua'}Знищення довгоносика, хрущака, борошноїда на всіх стадіях{:else}Уничтожение долгоносика, хрущака, мукоеда на всех стадиях{/if}</li>
							<li>✓ {#if langState.current === 'ua'}Атестовані фахівці з допусками до небезпечних робіт{:else}Аттестованные специалисты с допусками к опасным работам{/if}</li>
							<li>✓ {#if langState.current === 'ua'}Видача фітосанітарних сертифікатів для експорту{:else}Выдача фитосанитарных сертификатов для экспорта{/if}</li>
						</ul>
						<div class="dir-card-footer">
							<a href={resolve('/agro')} class="btn btn-outline dir-btn">
								{#if langState.current === 'ua'}Про агросектор →{:else}Об агросекторе →{/if}
							</a>
							<button
								type="button"
								class="btn btn-primary btn-sm"
								onclick={() => orderModal.open({ serviceTitle: 'Фумігація елеваторів та зерносховищ' })}
							>
								{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<FaqSection />
</div>

<style>
	.services-page {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: transparent;
	}

	.hub-directions-section {
		position: relative;
		z-index: 1;
		background: transparent;
		padding: clamp(3rem, 6vh, 5rem) 0 clamp(4rem, 8vh, 6rem);
	}

	.directions-hub-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 1180px) {
		.directions-hub-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.25rem;
		}
	}

	@media (max-width: 680px) {
		.directions-hub-grid {
			grid-template-columns: 1fr;
		}
	}

	.dir-card {
		padding: 0;
		display: flex;
		flex-direction: column;
		background: rgba(10, 10, 14, 0.8);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-cards);
		overflow: hidden;
		transition: border-color var(--transition-norm), transform var(--transition-norm), box-shadow var(--transition-norm);
		box-shadow: none;
	}

	.dir-card:hover {
		transform: translateY(-4px);
		border-color: rgba(128, 82, 255, 0.45);
		box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.35);
	}

	:global(html[data-theme="light"]) .dir-card {
		background: rgba(255, 255, 255, 0.88);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	:global(html[data-theme="light"]) .dir-card:hover {
		box-shadow: 0 16px 32px -10px rgba(15, 23, 42, 0.12);
	}

	.dir-card-media {
		position: relative;
		width: 100%;
		height: 200px;
		overflow: hidden;
		background: #000000;
	}

	.dir-card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		display: block;
	}

	.dir-card:hover .dir-card-img {
		transform: scale(1.06);
	}

	.dir-media-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.45) 100%);
		pointer-events: none;
	}

	.dir-media-badges {
		position: absolute;
		bottom: 0.85rem;
		left: 1rem;
		right: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		z-index: 2;
	}

	.dir-pill {
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(8px);
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 0.28rem 0.7rem;
		border-radius: var(--radius-tags);
	}

	.dir-pill-blue {
		border-color: rgba(96, 165, 250, 0.5);
		color: #93c5fd;
	}

	.dir-pill-amber {
		border-color: rgba(255, 184, 41, 0.5);
		color: var(--color-saffron-spark);
	}

	.dir-pill-teal {
		border-color: rgba(128, 82, 255, 0.5);
		color: #c4b5fd;
	}

	.dir-pill-cyan {
		border-color: rgba(45, 212, 191, 0.5);
		color: #5eead4;
	}

	.dir-pill-dark {
		border-color: rgba(244, 114, 182, 0.5);
		color: #f472b6;
	}

	.dir-price {
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--color-saffron-spark);
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-tags);
		border: 1px solid rgba(255, 184, 41, 0.3);
	}

	.dir-card-content {
		padding: 1.6rem 1.6rem 1.8rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	@media (max-width: 480px) {
		.dir-card-content {
			padding: 1.25rem 1.1rem 1.4rem;
		}
	}

	.dir-title {
		font-size: 1.25rem;
		font-weight: 400;
		color: var(--color-bone-white);
		margin-bottom: 0.65rem;
		letter-spacing: -0.025em;
		line-height: 1.25;
	}

	.dir-desc {
		font-size: 0.88rem;
		line-height: 1.55;
		color: var(--color-ash-gray);
		font-weight: 300;
		margin-bottom: 1.2rem;
	}

	.dir-checklist {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		font-size: 0.82rem;
		font-weight: 300;
		color: var(--color-silver-mist);
		margin-bottom: 1.5rem;
		border-top: 1px dashed var(--color-void-border);
		padding-top: 0.9rem;
		flex: 1;
	}

	.dir-checklist li {
		color: var(--color-silver-mist);
		line-height: 1.4;
	}

	.dir-card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem;
		border-top: 1px solid var(--color-void-border);
		padding-top: 1rem;
	}

	.dir-btn {
		font-size: 0.82rem;
		font-weight: 500;
		padding: 0.5rem 0.95rem;
		background: transparent;
		color: var(--color-bone-white);
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-buttons);
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.dir-btn:hover {
		border-color: var(--color-electric-iris);
		background: rgba(128, 82, 255, 0.1);
		color: var(--color-bone-white);
	}
</style>
