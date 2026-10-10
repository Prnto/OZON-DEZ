<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve, asset } from '$app/paths';
	import { Bug, ShieldCheck, Flask, Wind, Buildings } from 'phosphor-svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import FaqSection from '#lib/components/FaqSection.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';
	import { orderModal } from '../../lib/state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);

	onMount(() => {
		if (typeof window !== 'undefined' && window.location.hash) {
			const hash = window.location.hash.replace('#', '');
			const target = document.getElementById(hash) || document.getElementById(hash.replace('-', '_')) || document.getElementById(hash.replace('_', '-'));
			if (target) {
				setTimeout(() => {
					target.scrollIntoView({ behavior: 'smooth', block: 'center' });
					target.classList.add('card-highlight-pulse');
					setTimeout(() => target.classList.remove('card-highlight-pulse'), 2500);
				}, 200);
			}
		}
	});
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Послуги дезінсекції, дератизації, дезінфекції та озонування — ТОВ «ОЗОН-ДЕЗ»'
			: langState.current === 'ru'
			? 'Услуги дезинсекции, дератизации, дезинфекции и озонирования — ООО «ОЗОН-ДЕЗ»'
			: 'Disinsection, Deratization, Disinfection & Ozonation — LLC "OZON-DEZ"'}
	</title>
	<meta
		name="description"
		content={langState.current === 'ua'
			? 'Повний каталог послуг санітарної безпеки ТОВ «ОЗОН-ДЕЗ»: дезінсекція, дератизація, дезінфекція поверхонь і води, озонування O₃, Пест-контроль для бізнесу за системою HACCP.'
			: langState.current === 'ru'
			? 'Полный каталог услуг санитарной безопасности ООО «ОЗОН-ДЕЗ»: дезинсекция, дератизация, дезинфекция поверхностей и воды, озонирование O₃, Пест-контроль для бизнеса по системе HACCP.'
			: 'Full catalog of sanitary safety services by LLC "OZON-DEZ": disinsection, deratization, surface and water disinfection, O3 ozonation, Pest Control for business under HACCP.'}
	/>
</svelte:head>

<div class="services-page">
	<PageHeader
		badge={langState.current === 'ua' ? 'ПРОФЕСІЙНИЙ САНІТАРНИЙ ЗАХИСТ' : langState.current === 'ru' ? 'ПРОФЕССИОНАЛЬНАЯ САНИТАРНАЯ ЗАЩИТА' : 'PROFESSIONAL SANITARY DEFENSE'}
		title={langState.current === 'ua' ? 'Послуги санітарної безпеки для дому та бізнесу' : langState.current === 'ru' ? 'Услуги санитарной безопасности для дома и бизнеса' : 'Sanitary Safety Services for Home & Business'}
		subtitle={langState.current === 'ua'
			? 'Надаємо повний комплекс послуг фізичним і юридичним особам у Чорноморську, Одесі та Одеській області. Використовуємо виключно зареєстровані в Україні препарати, генератори туману та промислові озонатори.'
			: langState.current === 'ru'
			? 'Предоставляем полный комплекс услуг физическим и юридическим лицам в Черноморске, Одессе и Одесской области. Используем исключительно зарегистрированные в Украине препараты, генераторы тумана и промышленные озонаторы.'
			: 'We provide a complete range of services to individuals and businesses in Chornomorsk, Odesa, and the Odesa region. We use exclusively Ukraine-registered preparations, fog generators, and industrial ozone machines.'}
		crumbs={[{ label: currentContent.nav.services }]}
		imageSrc={asset('images/services-bg.webp')}
	/>

	<!-- 5 Confirmed Services of LLC "OZON-DEZ" -->
	<section class="section services-section" id="services">
		<div class="container">
			<div class="services-grid">

				<!-- Картка 1: Дезінсекція -->
				<article class="service-card glass-card" id="disinsection">
					<div class="service-card-media">
						<img
							src={asset('images/pest-cockroaches.webp')}
							alt="Дезінсекція тарганів, клопів, бліх холодним туманом ULV"
							class="service-img"
							loading="lazy"
						/>
						<div class="service-media-overlay"></div>
						<div class="service-media-badge-row">
							<span class="service-badge-pill">
								<Bug size={14} weight="fill" /> {#if langState.current === 'ua'}Популярна послуга{:else if langState.current === 'ru'}Популярная услуга{:else}Popular Service{/if}
							</span>
							<span class="service-price-tag">{#if langState.current === 'en'}from 900 UAH{:else}від 900 грн{/if}</span>
						</div>
					</div>
					<div class="service-body">
						<h3 class="service-title">
							{#if langState.current === 'ua'}Дезінсекція{:else if langState.current === 'ru'}Дезинсекция{:else}Disinsection{/if}
						</h3>
						<p class="service-subtitle">
							{#if langState.current === 'ua'}Знищення синантропних комах{:else if langState.current === 'ru'}Уничтожение синантропных насекомых{:else}Synanthropic Insect Extermination{/if}
						</p>
						<p class="service-text">
							{#if langState.current === 'ua'}
								Повне винищення тарганів, бліх, кліщів, комарів, клопів та інших комах у квартирах, приватних будинках, підвалах і комерційних приміщеннях.
							{:else if langState.current === 'ru'}
								Полное уничтожение тараканов, блох, клещей, комаров, клопов и других насекомых в квартирах, частных домах, подвалах и коммерческих помещениях.
							{:else}
								Complete extermination of cockroaches, fleas, ticks, mosquitoes, bedbugs, and other insects in apartments, private houses, basements, and commercial spaces.
							{/if}
						</p>
						<ul class="service-features">
							<li>
								<strong>{#if langState.current === 'ua'}Об'єкти:{:else if langState.current === 'ru'}Объекты:{:else}Facilities:{/if}</strong>
								<span>{#if langState.current === 'ua'}житло, ОСББ, склади, відкриті ділянки{:else if langState.current === 'ru'}жилье, ОСМД, склады, открытые участки{:else}housing, HOA, warehouses, open grounds{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Обладнання:{:else if langState.current === 'ru'}Оборудование:{:else}Equipment:{/if}</strong>
								<span>{#if langState.current === 'ua'}холодний і гарячий туман, акумуляторні обприскувачі{:else if langState.current === 'ru'}холодный и горячий туман, аккумуляторные опрыскиватели{:else}cold and thermal fog, battery sprayers{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Безпека:{:else if langState.current === 'ru'}Безопасность:{:else}Safety:{/if}</strong>
								<span>{#if langState.current === 'ua'}сертифіковані препарати без тривалого токсичного осаду{:else if langState.current === 'ru'}сертифицированные препараты без токсичного осадка{:else}certified preparations with zero lasting toxic residue{/if}</span>
							</li>
						</ul>
						<div class="service-card-footer">
							<button
								type="button"
								class="btn btn-primary"
								onclick={() => orderModal.open({ serviceTitle: langState.current === 'ua' ? 'Дезінсекція: знищення комах' : langState.current === 'ru' ? 'Дезинсекция: уничтожение насекомых' : 'Disinsection: insect extermination' })}
							>
								{#if langState.current === 'ua'}Замовити дезінсекцію{:else if langState.current === 'ru'}Заказать дезинсекцию{:else}Order disinsection{/if}
							</button>
						</div>
					</div>
				</article>

				<!-- Картка 2: Дератизація -->
				<article class="service-card glass-card" id="deratization">
					<div class="service-card-media">
						<img
							src={asset('images/deratization-rodents.webp')}
							alt="Дератизація: знищення щурів, мишей, встановлення принадних станцій"
							class="service-img"
							loading="lazy"
						/>
						<div class="service-media-overlay"></div>
						<div class="service-media-badge-row">
							<span class="service-badge-pill">
								<ShieldCheck size={14} weight="fill" /> {#if langState.current === 'ua'}Гарантія зачистки{:else if langState.current === 'ru'}Гарантия зачистки{:else}Guaranteed Eradication{/if}
							</span>
							<span class="service-price-tag">{#if langState.current === 'en'}from 950 UAH{:else}від 950 грн{/if}</span>
						</div>
					</div>
					<div class="service-body">
						<h3 class="service-title">
							{#if langState.current === 'ua'}Дератизація{:else if langState.current === 'ru'}Дератизация{:else}Deratization{/if}
						</h3>
						<p class="service-subtitle">
							{#if langState.current === 'ua'}Знищення гризунів (щурів та мишей){:else if langState.current === 'ru'}Уничтожение грызунов (крыс и мышей){:else}Extermination of Rodents (Rats & Mice){/if}
						</p>
						<p class="service-text">
							{#if langState.current === 'ua'}
								Комплексне винищення щурів і мишей із перекриттям шляхів міграції. Захист житлових будівель, присадибних ділянок, виробництв і харчових складів.
							{:else if langState.current === 'ru'}
								Комплексное уничтожение крыс и мышей с перекрытием путей миграции. Защита жилых зданий, приусадебных участков, производств и складов.
							{:else}
								Comprehensive extermination of rats and mice with blocking of migration routes. Protection of residences, grounds, factories, and warehouses.
							{/if}
						</p>
						<ul class="service-features">
							<li>
								<strong>{#if langState.current === 'ua'}Методи:{:else if langState.current === 'ru'}Методы:{:else}Methods:{/if}</strong>
								<span>{#if langState.current === 'ua'}безпечні принадні станції, механічні та хімічні бар'єри{:else if langState.current === 'ru'}безопасные приманочные станции, механические и химбарьеры{:else}safe bait stations, mechanical & chemical barriers{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Результат:{:else if langState.current === 'ru'}Результат:{:else}Result:{/if}</strong>
								<span>{#if langState.current === 'ua'}100% зачистка вогнища та профілактика повернення{:else if langState.current === 'ru'}100% зачистка очага и профилактика возврата{:else}100% eradication and return prevention{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Документи:{:else if langState.current === 'ru'}Документы:{:else}Documentation:{/if}</strong>
								<span>{#if langState.current === 'ua'}офіційні санітарні акти для перевірок{:else if langState.current === 'ru'}официальные санитарные акты для проверок{:else}official sanitary acts for inspection authorities{/if}</span>
							</li>
						</ul>
						<div class="service-card-footer">
							<button
								type="button"
								class="btn btn-primary"
								onclick={() => orderModal.open({ serviceTitle: langState.current === 'ua' ? 'Дератизація: знищення гризунів' : langState.current === 'ru' ? 'Дератизация: уничтожение грызунов' : 'Deratization: rodent extermination' })}
							>
								{#if langState.current === 'ua'}Замовити дератизацію{:else if langState.current === 'ru'}Заказать дератизацию{:else}Order deratization{/if}
							</button>
						</div>
					</div>
				</article>

				<!-- Картка 3: Дезінфекція -->
				<article class="service-card glass-card" id="disinfection">
					<div class="service-card-media">
						<img
							src={asset('images/restaurant-kitchen-dez.webp')}
							alt="Дезінфекція поверхонь, ємностей та питної води"
							class="service-img"
							loading="lazy"
						/>
						<div class="service-media-overlay"></div>
						<div class="service-media-badge-row">
							<span class="service-badge-pill">
								<Flask size={14} weight="fill" /> {#if langState.current === 'ua'}Антимікробний захист{:else if langState.current === 'ru'}Антимикробная защита{:else}Antimicrobial Defense{/if}
							</span>
							<span class="service-price-tag">{#if langState.current === 'en'}from 850 UAH{:else}від 850 грн{/if}</span>
						</div>
					</div>
					<div class="service-body">
						<h3 class="service-title">
							{#if langState.current === 'ua'}Дезінфекція{:else if langState.current === 'ru'}Дезинфекция{:else}Disinfection{/if}
						</h3>
						<p class="service-subtitle">
							{#if langState.current === 'ua'}Знезараження поверхонь, ємностей та води{:else if langState.current === 'ru'}Обеззараживание поверхностей, емкостей и воды{:else}Sanitization of Surfaces, Tanks & Water{/if}
						</p>
						<p class="service-text">
							{#if langState.current === 'ua'}
								Професійне знищення патогенних бактерій, вірусів, грибка і плісняви. Спеціалізована санітарна обробка резервуарів і систем питної води.
							{:else if langState.current === 'ru'}
								Профессиональное уничтожение патогенных бактерий, вирусов, грибка и плесени. Специализированная санитарная обработка резервуаров и систем питьевой воды.
							{:else}
								Professional destruction of pathogenic bacteria, viruses, fungi, and mold. Specialized sanitary treatment of potable water tanks and supply pipelines.
							{/if}
						</p>
						<ul class="service-features">
							<li>
								<strong>{#if langState.current === 'ua'}Напрямки:{:else if langState.current === 'ru'}Направления:{:else}Coverage:{/if}</strong>
								<span>{#if langState.current === 'ua'}приміщення, накопичувальні ємності, питна вода{:else if langState.current === 'ru'}помещения, накопительные емкости, питьевая вода{:else}facilities, storage tanks, drinking water{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Засоби:{:else if langState.current === 'ru'}Средства:{:else}Agents:{/if}</strong>
								<span>{#if langState.current === 'ua'}антимікробні препарати державної реєстрації МОЗ{:else if langState.current === 'ru'}антимикробные препараты госрегистрации МОЗ{:else}antimicrobial agents with state registration{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Контроль:{:else if langState.current === 'ru'}Контроль:{:else}Compliance:{/if}</strong>
								<span>{#if langState.current === 'ua'}дотримання санітарно-епідеміологічних норм України{:else if langState.current === 'ru'}соблюдение санитарно-эпидемиологических норм Украины{:else}full compliance with sanitary-epidemiological norms{/if}</span>
							</li>
						</ul>
						<div class="service-card-footer">
							<button
								type="button"
								class="btn btn-primary"
								onclick={() => orderModal.open({ serviceTitle: langState.current === 'ua' ? 'Дезінфекція поверхонь та води' : langState.current === 'ru' ? 'Дезинфекция поверхностей и воды' : 'Disinfection of surfaces and water' })}
							>
								{#if langState.current === 'ua'}Замовити дезінфекцію{:else if langState.current === 'ru'}Заказать дезинфекцию{:else}Order disinfection{/if}
							</button>
						</div>
					</div>
				</article>

				<!-- Картка 4: Озонування -->
				<article class="service-card glass-card" id="ozonation">
					<div class="service-card-media">
						<img
							src={asset('images/ozone-bg.webp')}
							alt="Озонування приміщень, ємностей та видалення стійких запахів"
							class="service-img"
							loading="lazy"
						/>
						<div class="service-media-overlay"></div>
						<div class="service-media-badge-row">
							<span class="service-badge-pill highlight-pill">
								<Wind size={14} weight="fill" /> {#if langState.current === 'ua'}Технологія O₃{:else if langState.current === 'ru'}Технология O₃{:else}O₃ Technology{/if}
							</span>
							<span class="service-price-tag">{#if langState.current === 'en'}from 1,100 UAH{:else}від 1 100 грн{/if}</span>
						</div>
					</div>
					<div class="service-body">
						<h3 class="service-title">
							{#if langState.current === 'ua'}Озонування{:else if langState.current === 'ru'}Озонирование{:else}Ozonation{/if}
						</h3>
						<p class="service-subtitle">
							{#if langState.current === 'ua'}Газова стерилізація приміщень і тари{:else if langState.current === 'ru'}Газовая стерилизация помещений и тары{:else}Gas Sterilization of Facilities & Containers{/if}
						</p>
						<p class="service-text">
							{#if langState.current === 'ua'}
								Молекулярне очищення повітря та поверхонь промисловим озоном: знищення плісняви, спор, бактерій і стійких запахів (диму, тютюну, вогкості, ремонту).
							{:else if langState.current === 'ru'}
								Молекулярная очистка воздуха и поверхностей промышленным озоном: уничтожение плесени, спор, бактерий и стойких запахов (дыма, табака, сырости, ремонта).
							{:else}
								Molecular purification of air and surfaces with industrial ozone: eradication of mold, spores, bacteria, and stubborn odors (smoke, tobacco, dampness, renovation).
							{/if}
						</p>
						<ul class="service-features">
							<li>
								<strong>{#if langState.current === 'ua'}Сфери:{:else if langState.current === 'ru'}Сферы:{:else}Applications:{/if}</strong>
								<span>{#if langState.current === 'ua'}приміщення, ємності для води та харчової продукції{:else if langState.current === 'ru'}помещения, емкости для воды и пищевой продукции{:else}facilities, tanks for water and food products{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Обладнання:{:else if langState.current === 'ru'}Оборудование:{:else}Equipment:{/if}</strong>
								<span>{#if langState.current === 'ua'}генератори активного озону високої потужності{:else if langState.current === 'ru'}генераторы активного озона высокой мощности{:else}high-capacity industrial active ozone generators{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Перевага:{:else if langState.current === 'ru'}Преимущество:{:else}Advantage:{/if}</strong>
								<span>{#if langState.current === 'ua'}екологічно, проникає у важкодоступні пори без хімопадів{:else if langState.current === 'ru'}экологично, проникает в труднодоступные поры без химосадков{:else}eco-friendly, deep pore penetration with zero chemical fallout{/if}</span>
							</li>
						</ul>
						<div class="service-card-footer">
							<button
								type="button"
								class="btn btn-primary"
								onclick={() => orderModal.open({ serviceTitle: langState.current === 'ua' ? 'Озонування приміщень та тари' : langState.current === 'ru' ? 'Озонирование помещений и тары' : 'Ozonation of facilities & containers' })}
							>
								{#if langState.current === 'ua'}Замовити озонування{:else if langState.current === 'ru'}Заказать озонирование{:else}Order ozonation{/if}
							</button>
						</div>
					</div>
				</article>

				<!-- Картка 5: Пест-контроль -->
				<article class="service-card glass-card service-card-b2b" id="pest-control">
					<span id="pest_control" style="position: absolute; top: -110px; visibility: hidden;" aria-hidden="true"></span>
					<div class="service-card-media">
						<img
							src={asset('images/warehouse-logistics-dez.webp')}
							alt="Пест-контроль для бізнесу за системою HACCP: склади, виробництва, HoReCa"
							class="service-img"
							loading="lazy"
						/>
						<div class="service-media-overlay"></div>
						<div class="service-media-badge-row">
							<span class="service-badge-pill b2b-pill">
								<Buildings size={14} weight="fill" /> {#if langState.current === 'ua'}Для бізнесу & HACCP{:else if langState.current === 'ru'}Для бизнеса & HACCP{:else}For Business & HACCP{/if}
							</span>
							<span class="service-price-tag">{#if langState.current === 'en'}from 1,600 UAH{:else}від 1 600 грн{/if}</span>
						</div>
					</div>
					<div class="service-body">
						<h3 class="service-title">
							{#if langState.current === 'ua'}Пест-контроль{:else if langState.current === 'ru'}Пест-контроль{:else}Pest Control{/if}
						</h3>
						<p class="service-subtitle">
							{#if langState.current === 'ua'}Моніторинг і регулювання шкідників{:else if langState.current === 'ru'}Мониторинг и регулирование вредителей{:else}Pest Monitoring & Population Control{/if}
						</p>
						<p class="service-text">
							{#if langState.current === 'ua'}
								Системний аудит і контроль біологічних шкідників для HoReCa, виробництв, складів і торгівлі згідно з міжнародними стандартами безпеки.
							{:else if langState.current === 'ru'}
								Системный аудит и контроль биологических вредителей для HoReCa, производств, складов и торговли по международным стандартам безопасности.
							{:else}
								Systemic audit and biological pest control for HoReCa, manufacturers, warehouses, and trade under international food safety standards.
							{/if}
						</p>
						<ul class="service-features">
							<li>
								<strong>{#if langState.current === 'ua'}Комплекс:{:else if langState.current === 'ru'}Комплекс:{:else}System:{/if}</strong>
								<span>{#if langState.current === 'ua'}виявлення, моніторинг чисельності, профілактика, ліквідація{:else if langState.current === 'ru'}выявление, мониторинг численности, профилактика, ликвидация{:else}detection, count monitoring, prevention, elimination{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Документація:{:else if langState.current === 'ru'}Документация:{:else}Records:{/if}</strong>
								<span>{#if langState.current === 'ua'}контрольні карти, журнали спостережень, акти виконаних робіт{:else if langState.current === 'ru'}контрольные карты, журналы наблюдений, акты выполненных работ{:else}control sheets, monitoring logs, completion acts{/if}</span>
							</li>
							<li>
								<strong>{#if langState.current === 'ua'}Договір:{:else if langState.current === 'ru'}Договор:{:else}Contract:{/if}</strong>
								<span>{#if langState.current === 'ua'}планове регулярне обслуговування юридичних осіб{:else if langState.current === 'ru'}плановое регулярное обслуживание юридических лиц{:else}scheduled contractual service for business entities{/if}</span>
							</li>
						</ul>
						<div class="service-card-footer">
							<a href={resolve('/b2b')} class="btn btn-primary">
								{#if langState.current === 'ua'}Замовити аудит об'єкта{:else if langState.current === 'ru'}Заказать аудит объекта{:else}Order facility audit{/if}
							</a>
						</div>
					</div>
				</article>

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

	.services-section {
		padding: 4rem 1.25rem 5rem;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 28px;
		margin-bottom: 45px;
	}

	.service-card {
		display: flex;
		flex-direction: column;
		border-radius: 16px;
		overflow: hidden;
		transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		scroll-margin-top: 110px;
	}

	:global(html[data-theme="light"]) .service-card {
		background: #ffffff;
		border-color: #e2e8f0;
	}

	@keyframes cardPulse {
		0%, 100% {
			border-color: var(--color-void-border);
		}
		50% {
			border-color: #38bdf8;
			box-shadow: 0 0 35px rgba(56, 189, 248, 0.45);
			transform: translateY(-4px);
		}
	}

	:global(.card-highlight-pulse) {
		animation: cardPulse 1.2s ease-in-out 2;
	}

	.service-card:hover {
		transform: translateY(-4px);
		border-color: #0284c7;
		box-shadow: 0 16px 30px -10px rgba(2, 132, 199, 0.2);
	}

	.service-card-media {
		position: relative;
		height: 200px;
		overflow: hidden;
	}

	.service-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.service-card:hover .service-img {
		transform: scale(1.05);
	}

	.service-media-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.75) 100%);
	}

	.service-media-badge-row {
		position: absolute;
		bottom: 12px;
		left: 14px;
		right: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;
	}

	.service-badge-pill {
		font-size: 0.75rem;
		font-weight: 700;
		padding: 4px 10px;
		border-radius: 20px;
		background: rgba(15, 23, 42, 0.85);
		color: #e2e8f0;
		backdrop-filter: blur(4px);
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.highlight-pill {
		background: rgba(2, 132, 199, 0.85);
		color: #ffffff;
	}

	.b2b-pill {
		background: rgba(217, 119, 6, 0.85);
		color: #ffffff;
	}

	.service-price-tag {
		font-size: 0.82rem;
		font-weight: 800;
		padding: 4px 10px;
		border-radius: 20px;
		background: #0284c7;
		color: #ffffff;
	}

	.service-body {
		padding: 24px;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.service-title {
		font-size: 1.45rem;
		font-weight: 800;
		color: var(--color-bone-white);
		margin-bottom: 4px;
	}

	:global(html[data-theme="light"]) .service-title {
		color: #0f172a;
	}

	.service-subtitle {
		font-size: 0.92rem;
		font-weight: 600;
		color: #38bdf8;
		margin-bottom: 14px;
	}

	:global(html[data-theme="light"]) .service-subtitle {
		color: #0284c7;
	}

	.service-text {
		font-size: 0.92rem;
		color: var(--color-ash-gray);
		line-height: 1.55;
		margin-bottom: 18px;
	}

	:global(html[data-theme="light"]) .service-text {
		color: #64748b;
	}

	.service-features {
		list-style: none;
		padding: 0;
		margin: 0 0 24px 0;
		border-top: 1px solid var(--color-void-border);
		padding-top: 14px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 0.85rem;
	}

	:global(html[data-theme="light"]) .service-features {
		border-color: #f1f5f9;
	}

	.service-features li {
		color: var(--color-silver-mist);
		line-height: 1.45;
	}

	:global(html[data-theme="light"]) .service-features li {
		color: #334155;
	}

	.service-features strong {
		color: var(--color-bone-white);
		margin-right: 4px;
	}

	:global(html[data-theme="light"]) .service-features strong {
		color: #0f172a;
	}

	.service-card-footer {
		margin-top: auto;
		width: 100%;
	}

	.service-card-footer .btn {
		width: 100%;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 640px) {
		.services-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
