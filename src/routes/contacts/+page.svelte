<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import ContactSection from '#lib/components/ContactSection.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let c = $derived(currentContent.contacts);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Контакти та реквізити ТОВ «ОЗОН-ДЕЗ» — Чорноморськ, Одеська обл.'
			: langState.current === 'ru'
			? 'Контакты и реквизиты ООО «ОЗОН-ДЕЗ» — Черноморск, Одесская обл.'
			: 'Contacts & Requisites LLC "OZON-DEZ" — Chornomorsk, Odesa region'}
	</title>
	<meta
		name="description"
		content={langState.current === 'ua'
			? 'Офіційні контакти ТОВ «ОЗОН-ДЕЗ»: м. Чорноморськ, просп. Миру, 8-а. Телефони: +38 (063) 667-26-53, (04868) 6-03-08. Повні юридичні реквізити, карта та месенджери.'
			: langState.current === 'ru'
			? 'Официальные контакты ООО «ОЗОН-ДЕЗ»: г. Черноморск, просп. Мира, 8-а. Телефоны: +38 (063) 667-26-53, (04868) 6-03-08. Полные юридические реквизиты, карта и мессенджеры.'
			: 'Official contacts of LLC "OZON-DEZ": Chornomorsk, Myru Ave, 8-a. Phones: +38 (063) 667-26-53, (04868) 6-03-08. Legal requisites, map and messengers.'}
	/>
</svelte:head>

<div class="contacts-page">
	<PageHeader
		badge={c.badge}
		title={c.title}
		subtitle={c.subtitle}
		crumbs={[{ label: currentContent.nav.contacts }]}
		imageSrc={asset('images/contacts-bg.jpg')}
	/>

	<!-- Main Contact Section (Addresses, Phones, Schedule, Messengers & Direct Form) -->
	<ContactSection />

	<!-- Full Legal & Corporate Requisites Table -->
	<section class="section requisites-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}Юридичні відомості{:else if langState.current === 'ru'}Юридические сведения{:else}Legal information{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Офіційні реквізити компанії
					{:else if langState.current === 'ru'}
						Официальные реквизиты компании
					{:else}
						Official company requisites
					{/if}
				</h2>
				<p class="section-subtitle">
					{#if langState.current === 'ua'}
						Для укладання прямих договорів, тендерних закупівель та безготівкових розрахунків з ПДВ.
					{:else if langState.current === 'ru'}
						Для заключения прямых договоров, тендерных закупок и безналичных расчетов с НДС.
					{:else}
						For direct contracts, tender procurement, and bank settlements with VAT.
					{/if}
				</p>
			</div>

			<div class="requisites-card glass-card">
				<div class="req-table-grid">
					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Повне найменування:{:else if langState.current === 'ru'}Полное наименование:{:else}Full legal name:{/if}
						</span>
						<strong class="req-val">
							{#if langState.current === 'en'}
								LIMITED LIABILITY COMPANY "OZON-DEZ" (ТОВ «ОЗОН-ДЕЗ»)
							{:else}
								ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «ОЗОН-ДЕЗ»
							{/if}
						</strong>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Скорочене найменування:{:else if langState.current === 'ru'}Сокращенное наименование:{:else}Short name:{/if}
						</span>
						<span class="req-val">ТОВ «ОЗОН-ДЕЗ» / LLC OZON-DEZ</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Код ЄДРПОУ:{:else if langState.current === 'ru'}Код ЕГРПОУ:{:else}EDRPOU Code:{/if}
						</span>
						<strong class="req-val req-mono">37537169</strong>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Досвід та реєстрація:{:else if langState.current === 'ru'}Опыт и регистрация:{:else}Experience & Registration:{/if}
						</span>
						<span class="req-val">
							{#if langState.current === 'ua'}
								Засновано у 2011 році (15 років безперервного практичного досвіду)
							{:else if langState.current === 'ru'}
								Основано в 2011 году (15 лет непрерывного практического опыта)
							{:else}
								Established in 2011 (15 years of continuous professional experience)
							{/if}
						</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Фактична адреса / Офіс:{:else if langState.current === 'ru'}Фактический адрес / Офис:{:else}Actual address / Office:{/if}
						</span>
						<span class="req-val">{currentContent.address.actual}</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Юридична адреса:{:else if langState.current === 'ru'}Юридический адрес:{:else}Legal address:{/if}
						</span>
						<span class="req-val">{currentContent.address.legal}</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Напрямки діяльності:{:else if langState.current === 'ru'}Направления деятельности:{:else}Core activities:{/if}
						</span>
						<span class="req-val">
							{#if langState.current === 'ua'}
								Дезінсекція (комахи), дератизація (гризуни), дезінфекція поверхонь і води, озонування приміщень газом O₃ та професійний Пест-контроль
							{:else if langState.current === 'ru'}
								Дезинсекция (насекомые), дератизация (грызуны), дезинфекция поверхностей и воды, озонирование помещений газом O₃ и профессиональный Пест-контроль
							{:else}
								Disinsection (insects), deratization (rodents), disinfection of surfaces and water, room ozonation with O₃ gas, and professional Pest Control
							{/if}
						</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Контактні телефони:{:else if langState.current === 'ru'}Контактные телефоны:{:else}Contact phone numbers:{/if}
						</span>
						<span class="req-val">
							<a href="tel:{currentContent.phones.mobile}" class="req-link">{currentContent.phones.mobileDisplay}</a> ({#if langState.current === 'ua'}мобільний{:else if langState.current === 'ru'}мобильный{:else}mobile{/if}),
							<a href="tel:{currentContent.phones.landline}" class="req-link">{currentContent.phones.landlineDisplay}</a> ({#if langState.current === 'ua'}міський / офіс{:else if langState.current === 'ru'}городской / офис{:else}city office{/if})
						</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Форма розрахунків:{:else if langState.current === 'ru'}Форма расчетов:{:else}Payment methods:{/if}
						</span>
						<span class="req-val">
							{#if langState.current === 'ua'}
								Безготівковий розрахунок на р/р за договором (з ПДВ), готівковий розрахунок, банківські картки (з наданням чека та акта виконаних робіт)
							{:else if langState.current === 'ru'}
								Безналичный расчет на р/с по договору (с НДС), наличный расчет, банковские карты (с предоставлением чека и акта выполненных работ)
							{:else}
								Non-cash bank settlement via contract (with VAT), cash, bank card payments (with official receipt and act of work completed)
							{/if}
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Geography of work -->
	<section class="section geo-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}Географія виїздів{:else if langState.current === 'ru'}География выездов{:else}Service Geography{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Де ми працюємо та виїжджаємо на об'єкти
					{:else if langState.current === 'ru'}
						Где мы работаем и выезжаем на объекты
					{:else}
						Where we operate and deploy specialist teams
					{/if}
				</h2>
			</div>

			<div class="geo-chips-grid">
				<div class="geo-city-card glass-card">
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/chornomorsk.png')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/chornomorsk.png')}"
							alt="Герб м. Чорноморськ"
							width="44"
							height="44"
							loading="lazy"
						/>
					</div>
					<div class="city-card-body">
						<h4>{#if langState.current === 'ua'}м. Чорноморськ{:else if langState.current === 'ru'}г. Черноморск{:else}Chornomorsk{/if}</h4>
						<p>
							{#if langState.current === 'ua'}
								Базовий офіс компанії (просп. Миру, 8-а). Виїзд на об'єкт протягом 30-45 хвилин.
							{:else if langState.current === 'ru'}
								Базовый офис компании (просп. Мира, 8-а). Выезд на объект в течение 30-45 минут.
							{:else}
								Company headquarters (Myru Ave, 8-a). On-site specialist arrival within 30-45 minutes.
							{/if}
						</p>
					</div>
				</div>

				<div class="geo-city-card glass-card">
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/odesa.png')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/odesa.png')}"
							alt="Герб м. Одеса"
							width="44"
							height="44"
							loading="lazy"
						/>
					</div>
					<div class="city-card-body">
						<h4>{#if langState.current === 'ua'}м. Одеса{:else if langState.current === 'ru'}г. Одесса{:else}Odesa{/if}</h4>
						<p>
							{#if langState.current === 'ua'}
								Усі райони міста: Київський, Приморський, Хаджибейський, Пересипський.
							{:else if langState.current === 'ru'}
								Все районы города: Киевский, Приморский, Хаджибейский, Пересыпский.
							{:else}
								All city districts: Kyivskyi, Prymorskyi, Khadzhybeyskyi, Peresyp skyi.
							{/if}
						</p>
					</div>
				</div>

				<div class="geo-city-card glass-card">
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/ovidiopol.png')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/ovidiopol.png')}"
							alt="Герб Овідіопольського району"
							width="44"
							height="44"
							loading="lazy"
						/>
					</div>
					<div class="city-card-body">
						<h4>{#if langState.current === 'ua'}Овідіопольський р-н{:else if langState.current === 'ru'}Овидиопольский р-н{:else}Ovidiopol district{/if}</h4>
						<p>
							{#if langState.current === 'ua'}
								Великодолинське, Малодолинське, Олександрівка, Таїрове, Сухий Лиман.
							{:else if langState.current === 'ru'}
								Великодолинское, Малодолинское, Александровка, Таирово, Сухой Лиман.
							{:else}
								Velykodolynske, Malodolynske, Oleksandrivka, Tairove, Sukhyi Lyman.
							{/if}
						</p>
					</div>
				</div>

				<div class="geo-city-card glass-card">
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/yuzhne.png')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/yuzhne.png')}"
							alt="Герб м. Южне"
							width="44"
							height="44"
							loading="lazy"
						/>
					</div>
					<div class="city-card-body">
						<h4>{#if langState.current === 'ua'}м. Южне & Порти{:else if langState.current === 'ru'}г. Южное & Порты{:else}Yuzhne & Seaports{/if}</h4>
						<p>
							{#if langState.current === 'ua'}
								Портова зона «Південний», Чорноморський морський порт, логістичні хаби.
							{:else if langState.current === 'ru'}
								Портовая зона «Южный», Черноморский морской порт, логистические хабы.
							{:else}
								Pivdennyi port zone, Chornomorsk sea trading port, logistics cargo hubs.
							{/if}
						</p>
					</div>
				</div>

				<div class="geo-city-card glass-card">
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/bilhorod.png')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/bilhorod.png')}"
							alt="Герб м. Білгород-Дністровський"
							width="44"
							height="44"
							loading="lazy"
						/>
					</div>
					<div class="city-card-body">
						<h4>{#if langState.current === 'ua'}Білгород-Дністровський{:else if langState.current === 'ru'}Белгород-Днестровский{:else}Bilhorod-Dnistrovskyi{/if}</h4>
						<p>
							{#if langState.current === 'ua'}
								Виробництва, склади, курортні готелі та бази відпочинку Затоки і Шабо.
							{:else if langState.current === 'ru'}
								Производства, склады, курортные отели и базы отдыха Затоки и Шабо.
							{:else}
								Production plants, warehouses, resort hotels, and recreation complexes in Zatoka and Shabo.
							{/if}
						</p>
					</div>
				</div>

				<div class="geo-city-card glass-card">
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/odesa-oblast.png')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/odesa-oblast.png')}"
							alt="Герб Одеської області"
							width="44"
							height="44"
							loading="lazy"
						/>
					</div>
					<div class="city-card-body">
						<h4>{#if langState.current === 'ua'}Вся Одеська область{:else if langState.current === 'ru'}Вся Одесская область{:else}Entire Odesa region{/if}</h4>
						<p>
							{#if langState.current === 'ua'}
								Виїзні мобільні бригади для обробки підприємств, складських комплексів, фермерських господарств та заводів.
							{:else if langState.current === 'ru'}
								Выездные мобильные бригады для обработки предприятий, складских комплексов, фермерских хозяйств и заводов.
							{:else}
								Mobile specialist teams for enterprises, logistics warehouses, farms, and industrial plants.
							{/if}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Licenses list -->
</div>

<style>
	.contacts-page {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.requisites-section {
		background: transparent;
		border-bottom: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.requisites-card {
		padding: 2.5rem 3rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: none;
	}

	@media (max-width: 640px) {
		.requisites-card {
			padding: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.requisites-card {
			padding: 1.25rem 1rem;
		}
		.geo-city-card {
			padding: 1.5rem 1.25rem;
		}
	}

	.req-table-grid {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.req-row {
		display: grid;
		grid-template-columns: 280px 1fr;
		padding: 1.1rem 0;
		border-bottom: 1px solid var(--border-subtle);
		align-items: baseline;
		gap: 1.5rem;
	}

	@media (max-width: 768px) {
		.req-row {
			grid-template-columns: 1fr;
			gap: 0.35rem;
		}
	}

	.req-row:last-child {
		border-bottom: none;
	}

	.req-key {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-saffron-spark);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.req-val {
		font-size: 0.95rem;
		color: var(--color-bone-white);
		font-weight: 300;
		line-height: 1.6;
		word-break: break-word;
	}


	.req-mono {
		font-family: monospace;
		font-size: 1.15rem;
		color: var(--color-electric-iris);
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.req-link {
		color: var(--color-electric-iris);
		font-weight: 400;
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.req-link:hover {
		color: var(--color-bone-white);
		text-decoration: underline;
	}

	/* Geo */
	.geo-section {
		background: transparent;
		padding: var(--space-3xl) 0;
	}

	.geo-chips-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 900px) {
		.geo-chips-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.geo-chips-grid {
			grid-template-columns: 1fr;
		}
	}

	.geo-city-card {
		position: relative;
		overflow: hidden;
		padding: 2.2rem 1.8rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.geo-city-card:hover {
		transform: translateY(-3px);
		border-color: rgba(99, 102, 241, 0.45);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35), 0 0 20px rgba(99, 102, 241, 0.15);
	}

	.card-crest-watermark {
		position: absolute;
		right: -15px;
		bottom: -20px;
		width: 145px;
		height: 145px;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		opacity: 0.08;
		pointer-events: none;
		filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.25));
		transition: opacity var(--transition-fast), transform var(--transition-normal);
		z-index: 0;
	}

	.geo-city-card:hover .card-crest-watermark {
		opacity: 0.18;
		transform: scale(1.1) rotate(-4deg);
	}

	.city-crest-badge {
		position: relative;
		z-index: 1;
		width: 58px;
		height: 58px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.15rem;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
		padding: 7px;
		backdrop-filter: blur(8px);
		transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
	}

	.geo-city-card:hover .city-crest-badge {
		transform: translateY(-2px) scale(1.05);
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(99, 102, 241, 0.6);
		box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
	}

	.city-crest-badge img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
	}

	.city-card-body {
		position: relative;
		z-index: 1;
	}

	.geo-city-card h4 {
		font-size: 1.15rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
	}

	.geo-city-card p {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
	}
</style>
