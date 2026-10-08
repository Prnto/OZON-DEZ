<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import Hero from '#lib/components/Hero.svelte';
	import ReviewsSection from '#lib/components/ReviewsSection.svelte';

	import { langState } from '../lib/state/language.svelte';
	import { contentMap } from '../lib/data/content';
	import { orderModal } from '../lib/state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
</script>

<svelte:head>
	<title>{currentContent.companyName} — {currentContent.hero.titleMain} {currentContent.hero.titleHighlight}</title>
	<meta name="description" content="{currentContent.hero.subtitle}" />
</svelte:head>

<div class="homepage">
	<!-- Hero Section -->
	<Hero />

	<!-- Direction Navigation Hub: 5 Separate Direction Portals -->
	<!-- Direction Navigation Hub: 6 Real Photo Visual Directions + Water Sanitization -->
	<section class="section hub-directions-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}Напрямки діяльності & Фото робіт{:else}Направления деятельности & Фото работ{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Чим займається ТОВ «ОЗОН-ДЕЗ»: повний спектр санітарної безпеки
					{:else}
						Чем занимается ООО «ОЗОН-ДЕЗ»: полный спектр санитарной безопасности
					{/if}
				</h2>
				<p class="section-subtitle">
					{#if langState.current === 'ua'}
						Професійна боротьба з комахами, гризунами, промислова дезінфекція кухонь ресторанів, складів, озонування та фумігація зерна у м. Чорноморськ, Одесі та області:
					{:else}
						Профессиональная борьба с насекомыми, грызунами, дезинфекция кухонь ресторанов, складов, озонирование и фумигация зерна в Черноморске, Одессе и области:
					{/if}
				</p>
			</div>

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
							<a href={resolve('/services')} class="btn btn-outline dir-btn">
								{#if langState.current === 'ua'}Каталог послуг →{:else}Каталог услуг →{/if}
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
							<a href={resolve('/services')} class="btn btn-outline dir-btn">
								{#if langState.current === 'ua'}Каталог послуг →{:else}Каталог услуг →{/if}
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

	<!-- Interactive Calculator Teaser Section -->
	<section class="section calc-teaser-section">
		<div class="container">
			<div class="calc-teaser-card glass-card-dark">
				<div class="teaser-left">
					<div class="section-badge dark">
						{#if langState.current === 'ua'}Точний розрахунок онлайн{:else}Точный расчет онлайн{/if}
					</div>
					<h2 class="teaser-heading">
						{#if langState.current === 'ua'}
							Дізнайтесь точну вартість обробки вашого приміщення за 30 секунд
						{:else}
							Узнайте точную стоимость обработки вашего помещения за 30 секунд
						{/if}
					</h2>
					<p class="teaser-sub">
						{#if langState.current === 'ua'}
							Скористайтеся нашим інтерактивним калькулятором: оберіть тип об'єкта (квартира, будинок, ресторан, склад), вкажіть площу та отримайте миттєву фіксовану вартість з гарантією.
						{:else}
							Воспользуйтесь нашим интерактивным калькулятором: выберите тип объекта, укажите площадь и получите мгновенный расчет стоимости с гарантией.
						{/if}
					</p>
					<div class="teaser-actions">
						<a href={resolve('/calculator')} class="btn btn-primary btn-lg">
							<span>🧮 {#if langState.current === 'ua'}Відкрити онлайн-калькулятор{:else}Открыть онлайн-калькулятор{/if}</span>
						</a>
						<a href={resolve('/how-we-work')} class="btn btn-secondary btn-lg">
							<span>⚙️ {#if langState.current === 'ua'}Як ми працюємо{:else}Как мы работаем{/if}</span>
						</a>
					</div>
				</div>

				<div class="teaser-right">
					<div class="teaser-preview-box">
						<div class="prev-header">⚡ Приклад базових тарифів</div>
						<div class="prev-row">
							<span>1-кімнатна квартира:</span>
							<strong>від 850 грн</strong>
						</div>
						<div class="prev-row">
							<span>2-кімнатна квартира:</span>
							<strong>від 1 050 грн</strong>
						</div>
						<div class="prev-row">
							<span>Приватний будинок (100 м²):</span>
							<strong>від 1 450 грн</strong>
						</div>
						<div class="prev-row">
							<span>Озонування кімнати / авто:</span>
							<strong>від 1 200 грн</strong>
						</div>
						<div class="prev-row">
							<span>HoReCa / Ресторан (HACCP):</span>
							<strong>від 1 800 грн</strong>
						</div>
						<div class="prev-footnote">
							* Всі ціни включають виїзд фахівця, сертифіковані препарати та гарантійний акт.
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>



	<!-- Quick Link to How We Work Preview -->
	<section class="section quick-work-preview-section">
		<div class="container">
			<div class="preview-banner glass-card">
				<div class="preview-text">
					<h3>
						{#if langState.current === 'ua'}
							Бажаєте дізнатися більше про підготовку приміщення та гарантії?
						{:else}
							Хотите узнать больше о подготовке помещения и гарантиях?
						{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							Ознайомтеся з детальним 5-кроковим регламентом нашої роботи, пам'яткою з підготовки квартири та юридичними гарантіями ТОВ «ОЗОН-ДЕЗ».
						{:else}
							Ознакомьтесь с подробным 5-шаговым регламентом нашей работы, памяткой по подготовке и юридическими гарантиями ООО «ОЗОН-ДЕЗ».
						{/if}
					</p>
				</div>
				<div class="preview-buttons">
					<a href={resolve('/how-we-work')} class="btn btn-primary">
						{#if langState.current === 'ua'}Читати розділ «Як ми працюємо» →{:else}Читать раздел «Как мы работаем» →{/if}
					</a>
					<a href={resolve('/contacts')} class="btn btn-secondary">
						{#if langState.current === 'ua'}Контакти та реквізити{:else}Контакты и реквизиты{/if}
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Real Case Studies & Customer Reviews -->
	<ReviewsSection />
</div>

<style>
	.homepage {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden;
		background-color: transparent;
	}

	/* Directions Hub */
	.hub-directions-section {
		position: relative;
		z-index: 1;
		background: transparent;
		border-bottom: 1px solid var(--color-void-border);
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
		background: var(--color-surface);
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


	/* Calc Teaser */
	.calc-teaser-section {
		position: relative;
		z-index: 1;
		background: transparent;
	}

	.calc-teaser-card {
		padding: 3.2rem;
		border-radius: var(--radius-cards);
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 3rem;
		align-items: center;
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		box-shadow: none;
	}

	@media (max-width: 960px) {
		.calc-teaser-card {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 2rem 1.6rem;
		}
	}

	@media (max-width: 520px) {
		.calc-teaser-card {
			padding: 1.5rem 1.15rem;
			gap: 1.5rem;
		}

		.teaser-actions {
			width: 100%;
			flex-direction: column;
		}

		.teaser-actions .btn {
			width: 100%;
		}

		.teaser-preview-box {
			padding: 1.25rem 1rem;
		}
	}

	.teaser-heading {
		font-size: clamp(2rem, 3vw, 2.8rem);
		font-weight: 400;
		color: var(--color-bone-white);
		margin: 0.8rem 0 1rem;
		letter-spacing: -0.035em;
		line-height: 1.15;
	}

	.teaser-sub {
		font-size: 0.98rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
		margin-bottom: 1.8rem;
		max-width: 620px;
	}

	.teaser-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.teaser-preview-box {
		background: var(--color-surface-hover);
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-cards);
		padding: 1.8rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.prev-header {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--color-saffron-spark);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid var(--color-void-border);
	}

	.prev-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.86rem;
		color: var(--color-ash-gray);
	}

	.prev-row strong {
		color: var(--color-bone-white);
		font-family: var(--font-heading);
		font-weight: 500;
	}

	.prev-footnote {
		font-size: 0.72rem;
		color: var(--color-ash-gray);
		opacity: 0.75;
		padding-top: 0.75rem;
		border-top: 1px dashed var(--color-void-border);
		line-height: 1.4;
	}



	/* Preview banner */
	.quick-work-preview-section {
		position: relative;
		z-index: 1;
		background: transparent;
		border-top: 1px solid var(--color-void-border);
	}

	.preview-banner {
		padding: 2.5rem 3rem;
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-cards);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		box-shadow: none;
	}

	@media (max-width: 900px) {
		.preview-banner {
			flex-direction: column;
			align-items: flex-start;
			padding: 1.8rem 1.4rem;
		}
	}

	@media (max-width: 480px) {
		.preview-banner {
			padding: 1.4rem 1.15rem;
		}

		.preview-buttons {
			width: 100%;
			flex-direction: column;
		}

		.preview-buttons .btn {
			width: 100%;
		}
	}

	.preview-text h3 {
		font-size: 1.35rem;
		font-weight: 400;
		color: var(--color-bone-white);
		letter-spacing: -0.025em;
		margin-bottom: 0.5rem;
	}

	.preview-text p {
		font-size: 0.9rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.55;
		max-width: 650px;
	}

	.preview-buttons {
		display: flex;
		gap: 1rem;
		flex-shrink: 0;
		flex-wrap: wrap;
	}
</style>
