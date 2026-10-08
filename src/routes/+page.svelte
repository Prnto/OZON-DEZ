<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import Hero from '#lib/components/Hero.svelte';
	import KvedSection from '#lib/components/KvedSection.svelte';
	import ReviewsSection from '#lib/components/ReviewsSection.svelte';
	import FastCalloutSection from '#lib/components/FastCalloutSection.svelte';
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
	<section class="section hub-directions-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}Напрямки діяльності{:else}Направления деятельности{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Оберіть необхідний напрямок санітарних послуг
					{:else}
						Выберите требуемое направление санитарных услуг
					{/if}
				</h2>
				<p class="section-subtitle">
					{#if langState.current === 'ua'}
						ТОВ «ОЗОН-ДЕЗ» надає повний комплекс послуг з дезінфекції, дезінсекції, озонування та пест-контролю на окремих профільних напрямках:
					{:else}
						ООО «ОЗОН-ДЕЗ» предоставляет полный комплекс услуг по дезинфекции, дезинсекции, озонированию и пест-контролю по отдельным профильным направлениям:
					{/if}
				</p>
			</div>

			<div class="directions-hub-grid">
				<!-- Direction 1: Comprehensive Disinfection & Disinsection -->
				<div class="dir-card glass-card dir-blue">
					<div class="dir-card-top">
						<span class="dir-pill">#1 КВЕД 81.29</span>
						<span class="dir-price">від 850 грн</span>
					</div>
					<div class="dir-icon">🧹</div>
					<h3 class="dir-title">
						{#if langState.current === 'ua'}Дезінфекція & Дезінсекція{:else}Дезинфекция & Дезинсекция{/if}
					</h3>
					<p class="dir-desc">
						{#if langState.current === 'ua'}
							Знищення тарганів, клопів, бліх, кліщів та мурах холодним туманом. Антибактеріальна санація приміщень без їдкого запаху.
						{:else}
							Уничтожение тараканов, клопов, блох, клещей и муравьев холодным туманом. Антибактериальная санация помещений без запаха.
						{/if}
					</p>
					<ul class="dir-checklist">
						<li>✓ 100% загибель комах з 1-ї обробки</li>
						<li>✓ Безпечно для дітей та улюбленців</li>
						<li>✓ Гарантійний договір до 12 міс.</li>
					</ul>
					<div class="dir-card-footer">
						<a href={resolve('/services')} class="btn btn-outline dir-btn">
							{#if langState.current === 'ua'}Каталог послуг →{:else}Каталог услуг →{/if}
						</a>
						<button
							type="button"
							class="btn btn-primary btn-sm"
							onclick={() => orderModal.open({ serviceTitle: 'Дезінсекція та дезінфекція' })}
						>
							{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
						</button>
					</div>
				</div>

				<!-- Direction 2: Ozone Treatment O3 -->
				<div class="dir-card glass-card dir-teal">
					<div class="dir-card-top">
						<span class="dir-pill-teal">#2 Газ O₃ Стерилізація</span>
						<span class="dir-price">від 1 200 грн</span>
					</div>
					<div class="dir-icon">💨</div>
					<h3 class="dir-title">
						{#if langState.current === 'ua'}Озонування O₃ та Запахи{:else}Озонирование O₃ и Запахи{/if}
					</h3>
					<p class="dir-desc">
						{#if langState.current === 'ua'}
							Глибока екологічна дезінфекція озоном. Виведення запаху гару після пожежі, цвілі, затхлості, тютюну та демеркуризація ртуті.
						{:else}
							Глубокая экологическая дезинфекция озоном. Удаление гари после пожара, плесени, затхлости, табака и демеркуризация ртути.
						{/if}
					</p>
					<ul class="dir-checklist">
						<li>✓ 300х сильніший за дію хлору</li>
						<li>✓ 0% хімічних залишків і нальоту</li>
						<li>✓ Свіжість гірського повітря</li>
					</ul>
					<div class="dir-card-footer">
						<a href={resolve('/ozone')} class="btn btn-outline dir-btn">
							{#if langState.current === 'ua'}Про озонування →{:else}Об озонировании →{/if}
						</a>
						<button
							type="button"
							class="btn btn-primary btn-sm"
							onclick={() => orderModal.open({ serviceTitle: 'Озонування O3' })}
						>
							{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
						</button>
					</div>
				</div>

				<!-- Direction 3: Business & HACCP -->
				<div class="dir-card glass-card dir-dark">
					<div class="dir-card-top">
						<span class="dir-pill-dark">#3 HoReCa & Склади</span>
						<span class="dir-price">від 1 800 грн/міс</span>
					</div>
					<div class="dir-icon">🏢</div>
					<h3 class="dir-title">
						{#if langState.current === 'ua'}Пест-контроль & HACCP{:else}Пест-контроль & HACCP{/if}
					</h3>
					<p class="dir-desc">
						{#if langState.current === 'ua'}
							Санітарне обслуговування ресторанів, готелів, виробництв та торгових мереж. Офіційний договір та акти для Держпродспоживслужби.
						{:else}
							Санитарное обслуживание ресторанов, отелей, производств и торговых сетей. Официальный договор и акты для проверяющих органов.
						{/if}
					</p>
					<ul class="dir-checklist">
						<li>✓ Повна відповідність нормам HACCP</li>
						<li>✓ Нічні та неробочі години виїздів</li>
						<li>✓ Контрольні карти точок песту</li>
					</ul>
					<div class="dir-card-footer">
						<a href={resolve('/b2b')} class="btn btn-outline dir-btn">
							{#if langState.current === 'ua'}Для бізнесу →{:else}Для бизнеса →{/if}
						</a>
						<button
							type="button"
							class="btn btn-primary btn-sm"
							onclick={() => orderModal.open({ serviceTitle: 'Пест-контроль HACCP для бізнесу' })}
						>
							{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
						</button>
					</div>
				</div>

				<!-- Direction 4: Agro Sector & Fumigation -->
				<div class="dir-card glass-card dir-amber">
					<div class="dir-card-top">
						<span class="dir-pill-amber">#4 КВЕД 01.61 / 01.62</span>
						<span class="dir-price">від 15 грн/т</span>
					</div>
					<div class="dir-icon">🌾</div>
					<h3 class="dir-title">
						{#if langState.current === 'ua'}Агросектор & Фумігація{:else}Агросектор & Фумигация{/if}
					</h3>
					<p class="dir-desc">
						{#if langState.current === 'ua'}
							Газація та фумігація зернових елеваторів, складів, силосів від довгоносика та комах запасів перед прийманням врожаю.
						{:else}
							Газация и фумигация зерновых элеваторов, складов, силосов от долгоносика и вредителей запасов перед приемом урожая.
						{/if}
					</p>
					<ul class="dir-checklist">
						<li>✓ Препарати фосфіду алюмінію</li>
						<li>✓ Фітосанітарні сертифікати експорту</li>
						<li>✓ Обробка великих кубатур</li>
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

				<!-- Direction 5: Water Purification & Sanitization -->
				<div class="dir-card glass-card dir-cyan">
					<div class="dir-card-top">
						<span class="dir-pill-cyan">#5 КВЕД 36.00</span>
						<span class="dir-price">від 2 500 грн</span>
					</div>
					<div class="dir-icon">💧</div>
					<h3 class="dir-title">
						{#if langState.current === 'ua'}Очищення та Дезінфекція Води{:else}Очистка и Дезинфекция Воды{/if}
					</h3>
					<p class="dir-desc">
						{#if langState.current === 'ua'}
							Санація питних і технічних резервуарів, колодязів, свердловин та інженерних трубопроводів відповідно до ДСанПіН.
						{:else}
							Санация питьевых и технических резервуаров, колодцев, скважин и трубопроводов в соответствии с ДСанПиН.
						{/if}
					</p>
					<ul class="dir-checklist">
						<li>✓ Видалення біоплівки та осаду</li>
						<li>✓ Знищення легіонели й бактерій</li>
						<li>✓ Паспорт санітарної обробки</li>
					</ul>
					<div class="dir-card-footer">
						<a href={resolve('/water')} class="btn btn-outline dir-btn">
							{#if langState.current === 'ua'}Про очистку води →{:else}Об очистке воды →{/if}
						</a>
						<button
							type="button"
							class="btn btn-primary btn-sm"
							onclick={() => orderModal.open({ serviceTitle: 'Дезінфекція систем водопостачання' })}
						>
							{#if langState.current === 'ua'}Замовити{:else}Заказать{/if}
						</button>
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

	<!-- Why Choose Us / Trust Triggers -->
	<section class="section trust-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}Переваги ТОВ «ОЗОН-ДЕЗ»{:else}Преимущества ООО «ОЗОН-ДЕЗ»{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Чому нам довіряють жителі та бізнес Одещини понад 15 років
					{:else}
						Почему нам доверяют жители и бизнес Одесской области более 15 лет
					{/if}
				</h2>
			</div>

			<!-- Official Brand Showcase Card -->
			<div class="brand-visual-showcase glass-card-dark">
				<div class="brand-photo-wrap">
					<img
						src={asset('images/ozon-dez-brand-doctor.jpg')}
						alt="Офіційний представник та санітарний лікар ТОВ ОЗОН-ДЕЗ"
						class="brand-showcase-img"
						loading="lazy"
					/>
					<div class="brand-photo-tag">
						<span class="tag-dot"></span>
						<span>Офіційний центр санітарної безпеки ОЗОН-ДЕЗ</span>
					</div>
				</div>
				<div class="brand-showcase-info">
					<div class="section-badge dark">Атестована санітарна служба</div>
					<h3>
						{#if langState.current === 'ua'}
							Науковий медичний підхід та екологічна безпека
						{:else}
							Научный медицинский подход и экологическая безопасность
						{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							ТОВ «ОЗОН-ДЕЗ» — це офіційно зареєстроване українське підприємство (ЄДРПОУ 37537169) з 15-річним досвідом. Ми використовуємо виключно сертифіковані препарати МОЗ України 4-го класу безпеки та високопродуктивні промислові генератори озону O₃, забезпечуючи 100% захист об'єктів будь-якої складності.
						{:else}
							ООО «ОЗОН-ДЕЗ» — официально зарегистрированное украинское предприятие (ЕГРПОУ 37537169) с 15-летним опытом. Мы используем сертифицированные препараты Минздрава Украины 4-го класса безопасности и промышленные генераторы озона O₃, обеспечивая 100% защиту объектов.
						{/if}
					</p>
					<div class="brand-perks-row">
						<div class="brand-perk-item">
							<span class="perk-icon">🛡️</span>
							<span>Ліцензії МОЗ України</span>
						</div>
						<div class="brand-perk-item">
							<span class="perk-icon">📋</span>
							<span>Стандарти HACCP & ISO</span>
						</div>
						<div class="brand-perk-item">
							<span class="perk-icon">🧪</span>
							<span>Без запаху та алергенів</span>
						</div>
					</div>
				</div>
			</div>

			<div class="trust-grid">
				<div class="trust-card glass-card">
					<div class="t-badge-num">15+</div>
					<h4>{#if langState.current === 'ua'}Років досвіду на ринку{:else}Лет опыта на рынке{/if}</h4>
					<p>Працюємо безперервно з 2011 року. Знаємо специфіку приморського клімату, вологість та резистентність комах.</p>
				</div>
				<div class="trust-card glass-card">
					<div class="t-badge-num">100%</div>
					<h4>{#if langState.current === 'ua'}Ліцензії та МОЗ України{:else}Лицензии и Минздрав{/if}</h4>
					<p>Всі препарати мають діючі сертифікати МОЗ України, відносяться до безпечного 4-го класу малотоксичних речовин.</p>
				</div>
				<div class="trust-card glass-card">
					<div class="t-badge-num">24/7</div>
					<h4>{#if langState.current === 'ua'}Екстрені виїзди та HoReCa{:else}Экстренные выезды и HoReCa{/if}</h4>
					<p>Проводимо обробки у зручний для клієнта час: вранці, вночі або у вихідні дні без зупинки вашого бізнес-процесу.</p>
				</div>
				<div class="trust-card glass-card">
					<div class="t-badge-num">HACCP</div>
					<h4>{#if langState.current === 'ua'}Повний пакет документів{:else}Полный пакет документов{/if}</h4>
					<p>Офіційний договір, акти виконаних робіт з мокрими печатками, карти контролю шкідників для будь-яких перевірок.</p>
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

	<!-- Fast 24/7 Emergency Dispatch Callout Form -->
	<FastCalloutSection />

	<!-- Official Licenses & KVEDs -->
	<KvedSection />
</div>

<style>
	.homepage {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden;
		background-color: var(--color-void);
	}

	/* Directions Hub */
	.hub-directions-section {
		background: var(--color-void);
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
		padding: 2.2rem 1.8rem;
		display: flex;
		flex-direction: column;
		background: #090909;
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-cards);
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	@media (max-width: 480px) {
		.dir-card {
			padding: 1.5rem 1.25rem;
		}
	}

	.dir-card:hover {
		transform: translateY(-3px);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.dir-card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.2rem;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.dir-pill,
	.dir-pill-teal,
	.dir-pill-dark,
	.dir-pill-amber,
	.dir-pill-cyan {
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		background: #141414;
		color: var(--color-silver-mist);
		border: 1px solid var(--color-void-border);
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-tags);
	}

	.dir-pill-amber {
		color: var(--color-saffron-spark);
		background: rgba(255, 184, 41, 0.08);
		border-color: var(--color-saffron-border);
	}

	.dir-pill-teal {
		color: #bfa6ff;
		background: rgba(128, 82, 255, 0.08);
		border-color: var(--color-iris-border);
	}

	.dir-price {
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-saffron-spark);
	}

	.dir-icon {
		font-size: 2.2rem;
		margin-bottom: 0.75rem;
	}

	.dir-title {
		font-size: 1.3rem;
		font-weight: 400;
		color: var(--color-bone-white);
		margin-bottom: 0.6rem;
		letter-spacing: -0.025em;
		line-height: 1.2;
	}

	.dir-desc {
		font-size: 0.88rem;
		line-height: 1.55;
		color: var(--color-ash-gray);
		font-weight: 300;
		margin-bottom: 1.25rem;
	}

	.dir-checklist {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		font-size: 0.82rem;
		font-weight: 300;
		color: var(--color-silver-mist);
		margin-bottom: 1.6rem;
		border-top: 1px dashed var(--color-void-border);
		padding-top: 0.9rem;
		flex: 1;
	}

	.dir-checklist li {
		color: var(--color-silver-mist);
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
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius-buttons);
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.dir-btn:hover {
		border-color: rgba(255, 255, 255, 0.4);
		background: rgba(255, 255, 255, 0.05);
	}

	/* Calc Teaser */
	.calc-teaser-section {
		background: var(--color-void);
	}

	.calc-teaser-card {
		padding: 3.2rem;
		border-radius: var(--radius-cards);
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 3rem;
		align-items: center;
		background: #090909;
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
		background: #040404;
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

	/* Trust Grid & Brand Showcase */
	.trust-section {
		background: var(--color-void);
		border-top: 1px solid var(--color-void-border);
	}

	.brand-visual-showcase {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 2.5rem;
		align-items: center;
		padding: 2.2rem;
		border-radius: var(--radius-cards);
		background: #090909;
		border: 1px solid var(--color-void-border);
		margin-bottom: 2.5rem;
		box-shadow: none;
	}

	@media (max-width: 960px) {
		.brand-visual-showcase {
			grid-template-columns: 1fr;
			padding: 1.5rem;
			gap: 1.6rem;
		}
	}

	@media (max-width: 480px) {
		.brand-visual-showcase {
			padding: 1.25rem 1rem;
		}
	}

	.brand-photo-wrap {
		position: relative;
		border-radius: var(--radius-cards);
		overflow: hidden;
		border: 1px solid var(--color-void-border);
	}

	.brand-showcase-img {
		width: 100%;
		height: 100%;
		aspect-ratio: 16/10;
		object-fit: cover;
		display: block;
		filter: brightness(0.85) contrast(1.1);
	}

	.brand-photo-tag {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(8px);
		padding: 0.35rem 0.8rem;
		border-radius: var(--radius-tags);
		font-size: 0.76rem;
		font-weight: 500;
		color: var(--color-bone-white);
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.tag-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-electric-iris);
	}

	.brand-showcase-info {
		display: flex;
		flex-direction: column;
	}

	.brand-showcase-info h3 {
		font-size: clamp(1.5rem, 2.2vw, 2rem);
		font-weight: 400;
		color: var(--color-bone-white);
		letter-spacing: -0.03em;
		line-height: 1.2;
		margin: 0.8rem 0 1rem;
	}

	.brand-showcase-info p {
		font-size: 0.94rem;
		line-height: 1.6;
		color: var(--color-ash-gray);
		font-weight: 300;
		margin-bottom: 1.4rem;
	}

	.brand-perk-item {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.35rem 0.8rem;
		background: #0d0d0d;
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-tags);
		font-size: 0.8rem;
		font-weight: 400;
		color: var(--color-silver-mist);
	}

	.perk-icon {
		font-size: 0.95rem;
	}

	.trust-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
	}

	@media (max-width: 960px) {
		.trust-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 540px) {
		.trust-grid {
			grid-template-columns: 1fr;
		}
	}

	.trust-card {
		padding: 2rem 1.6rem;
		background: #090909;
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.trust-card:hover {
		transform: translateY(-2px);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.t-badge-num {
		font-family: var(--font-heading);
		font-size: 2.4rem;
		font-weight: 400;
		color: var(--color-bone-white);
		line-height: 1;
		margin-bottom: 0.8rem;
		letter-spacing: -0.04em;
	}

	.trust-card h4 {
		font-size: 1.05rem;
		font-weight: 400;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
	}

	.trust-card p {
		font-size: 0.84rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.55;
	}

	/* Preview banner */
	.quick-work-preview-section {
		background: var(--color-void);
		border-top: 1px solid var(--color-void-border);
	}

	.preview-banner {
		padding: 2.5rem 3rem;
		background: #090909;
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
