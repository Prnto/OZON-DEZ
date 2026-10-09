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
		imageSrc={asset('images/contacts-bg.webp')}
	/>

	<!-- Main Contact Section (Addresses, Phones, Schedule, Messengers & Direct Form) -->
	<ContactSection />

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
				<!-- 1. Чорноморськ -->
				<a
					href="https://od.cmr.gov.ua/"
					target="_blank"
					rel="noopener noreferrer"
					class="geo-city-card glass-card"
					title="{langState.current === 'ua' ? 'Офіційний вебсайт Чорноморської міської ради' : langState.current === 'ru' ? 'Официальный веб-сайт Черноморского городского совета' : 'Official website of Chornomorsk City Council'}"
				>
					<div class="city-link-pill">
						<span>{langState.current === 'ua' ? 'Офіційний сайт' : langState.current === 'ru' ? 'Официальный сайт' : 'Official Portal'}</span>
						<span class="link-arrow">↗</span>
					</div>
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/chornomorsk.webp')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/chornomorsk.webp')}"
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
				</a>

				<!-- 2. Одеса -->
				<a
					href="https://omr.gov.ua/"
					target="_blank"
					rel="noopener noreferrer"
					class="geo-city-card glass-card"
					title="{langState.current === 'ua' ? 'Офіційний сайт Одеської міської ради' : langState.current === 'ru' ? 'Официальный сайт Одесского городского совета' : 'Official website of Odesa City Council'}"
				>
					<div class="city-link-pill">
						<span>{langState.current === 'ua' ? 'Офіційний сайт' : langState.current === 'ru' ? 'Официальный сайт' : 'Official Portal'}</span>
						<span class="link-arrow">↗</span>
					</div>
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/odesa.webp')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/odesa.webp')}"
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
				</a>

				<!-- 3. Овідіопольський р-н -->
				<a
					href="https://ovidiopol-selrada.od.gov.ua/"
					target="_blank"
					rel="noopener noreferrer"
					class="geo-city-card glass-card"
					title="{langState.current === 'ua' ? 'Офіційний вебсайт Овідіопольської селищної ради' : langState.current === 'ru' ? 'Официальный веб-сайт Овидиопольского поселкового совета' : 'Official website of Ovidiopol Settlement Council'}"
				>
					<div class="city-link-pill">
						<span>{langState.current === 'ua' ? 'Офіційний сайт' : langState.current === 'ru' ? 'Официальный сайт' : 'Official Portal'}</span>
						<span class="link-arrow">↗</span>
					</div>
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/ovidiopol.webp')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/ovidiopol.webp')}"
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
				</a>

				<!-- 4. м. Южне (прибрано слово & Порти) -->
				<a
					href="https://ymtg.gov.ua/"
					target="_blank"
					rel="noopener noreferrer"
					class="geo-city-card glass-card"
					title="{langState.current === 'ua' ? 'Офіційний вебсайт Південнівської (Южненської) міської громади' : langState.current === 'ru' ? 'Официальный веб-сайт Южненской городской громады' : 'Official website of Yuzhne / Pivdenne Municipality'}"
				>
					<div class="city-link-pill">
						<span>{langState.current === 'ua' ? 'Офіційний сайт' : langState.current === 'ru' ? 'Официальный сайт' : 'Official Portal'}</span>
						<span class="link-arrow">↗</span>
					</div>
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/yuzhne.webp')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/yuzhne.webp')}"
							alt="Герб м. Южне"
							width="44"
							height="44"
							loading="lazy"
						/>
					</div>
					<div class="city-card-body">
						<h4>{#if langState.current === 'ua'}м. Южне{:else if langState.current === 'ru'}г. Южное{:else}Yuzhne{/if}</h4>
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
				</a>

				<!-- 5. Білгород-Дністровський -->
				<a
					href="https://bilgorod-d.gov.ua/"
					target="_blank"
					rel="noopener noreferrer"
					class="geo-city-card glass-card"
					title="{langState.current === 'ua' ? 'Офіційний вебсайт Білгород-Дністровської міської ради' : langState.current === 'ru' ? 'Официальный веб-сайт Белгород-Днестровского городского совета' : 'Official website of Bilhorod-Dnistrovskyi City Council'}"
				>
					<div class="city-link-pill">
						<span>{langState.current === 'ua' ? 'Офіційний сайт' : langState.current === 'ru' ? 'Официальный сайт' : 'Official Portal'}</span>
						<span class="link-arrow">↗</span>
					</div>
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/bilhorod.webp')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/bilhorod.webp')}"
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
				</a>

				<!-- 6. Одеська область (посилання на Google Maps) -->
				<a
					href="https://www.google.com/maps/place/%D0%9E%D0%B4%D0%B5%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C"
					target="_blank"
					rel="noopener noreferrer"
					class="geo-city-card glass-card geo-card-map"
					title="{langState.current === 'ua' ? 'Переглянути Одеську область на карті Google Maps' : langState.current === 'ru' ? 'Посмотреть Одесскую область на карте Google Maps' : 'View Odesa region on Google Maps'}"
				>
					<div class="city-link-pill city-link-pill-map">
						<span>Google Maps</span>
						<span class="link-arrow">↗</span>
					</div>
					<div
						class="card-crest-watermark"
						style="background-image: url('{asset('images/crests/odesa-oblast.webp')}');"
						aria-hidden="true"
					></div>
					<div class="city-crest-badge">
						<img
							src="{asset('images/crests/odesa-oblast.webp')}"
							alt="Герб Одеської області"
							width="44"
							height="44"
							loading="lazy"
						/>
					</div>
					<div class="city-card-body">
						<h4>{#if langState.current === 'ua'}Одеська область{:else if langState.current === 'ru'}Одесская область{:else}Odesa region{/if}</h4>
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
				</a>
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

	@media (max-width: 480px) {
		.geo-city-card {
			padding: 1.5rem 1.25rem;
		}
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
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		transition: border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.geo-city-card:hover {
		transform: translateY(-4px);
		border-color: rgba(128, 82, 255, 0.55);
		background: var(--color-surface-hover);
		box-shadow: 0 14px 34px rgba(0, 0, 0, 0.4), 0 0 24px rgba(128, 82, 255, 0.2);
	}

	.city-link-pill {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-ash-gray);
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.09);
		padding: 0.25rem 0.6rem;
		border-radius: var(--radius-full);
		transition: all var(--transition-fast);
		z-index: 2;
		pointer-events: none;
	}

	.city-link-pill-map {
		color: var(--color-saffron-spark);
		background: rgba(255, 184, 41, 0.08);
		border-color: rgba(255, 184, 41, 0.22);
	}

	.geo-city-card:hover .city-link-pill {
		color: #ffffff;
		background: rgba(128, 82, 255, 0.3);
		border-color: rgba(128, 82, 255, 0.6);
		transform: translateY(-1px);
	}

	.geo-city-card:hover .city-link-pill-map {
		color: #ffffff;
		background: rgba(255, 184, 41, 0.3);
		border-color: rgba(255, 184, 41, 0.7);
	}

	.link-arrow {
		font-size: 0.82rem;
		transition: transform var(--transition-fast);
	}

	.geo-city-card:hover .link-arrow {
		transform: translate(2px, -2px);
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
