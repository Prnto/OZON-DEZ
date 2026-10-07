<script lang="ts">
	import PageHeader from '#lib/components/PageHeader.svelte';
	import ContactSection from '#lib/components/ContactSection.svelte';
	import KvedSection from '#lib/components/KvedSection.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let c = $derived(currentContent.contacts);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Контакти та реквізити ТОВ «ОЗОН-ДЕЗ» — Чорноморськ, Одеська обл.'
			: 'Контакты и реквизиты ООО «ОЗОН-ДЕЗ» — Черноморск, Одесская обл.'}
	</title>
	<meta
		name="description"
		content="Офіційні контакти ТОВ «ОЗОН-ДЕЗ»: м. Чорноморськ, пр-т Миру 8А. Телефони: (068) 261-53-50, (04868) 5-02-02. Повні юридичні реквізити та карта обслуговування."
	/>
</svelte:head>

<div class="contacts-page">
	<PageHeader
		badge={c.badge}
		title={c.title}
		subtitle={c.subtitle}
		crumbs={[{ label: currentContent.nav.contacts }]}
		imageSrc="/images/contacts-bg.jpg"
	/>

	<!-- Main Contact Section (Addresses, Phones, Schedule, Messengers & Direct Form) -->
	<ContactSection />

	<!-- Full Legal & Corporate Requisites Table -->
	<section class="section requisites-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}Юридичні відомості{:else}Юридические сведения{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Офіційні реквізити компанії
					{:else}
						Официальные реквизиты компании
					{/if}
				</h2>
				<p class="section-subtitle">
					{#if langState.current === 'ua'}
						Для укладання прямих договорів, тендерних закупівель та безготівкових розрахунків з ПДВ.
					{:else}
						Для заключения прямых договоров, тендерных закупок и безналичных расчетов с НДС.
					{/if}
				</p>
			</div>

			<div class="requisites-card glass-card">
				<div class="req-table-grid">
					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Повне найменування:{:else}Полное наименование:{/if}
						</span>
						<strong class="req-val">ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «ОЗОН-ДЕЗ»</strong>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Скорочене найменування:{:else}Сокращенное наименование:{/if}
						</span>
						<span class="req-val">ТОВ «ОЗОН-ДЕЗ» / ТОВ ОЗОН-ДЕЗ</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Код ЄДРПОУ:{:else}Код ЕГРПОУ:{/if}
						</span>
						<strong class="req-val req-mono">37537169</strong>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Дата державної реєстрації:{:else}Дата госрегистрации:{/if}
						</span>
						<span class="req-val">2011 рік (понад 14 років безперервної діяльності)</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Фактична адреса / Офіс:{:else}Фактический адрес / Офис:{/if}
						</span>
						<span class="req-val">{currentContent.address.actual}</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Юридична адреса:{:else}Юридический адрес:{/if}
						</span>
						<span class="req-val">{currentContent.address.legal}</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Основний КВЕД:{:else}Основной КВЭД:{/if}
						</span>
						<span class="req-val">
							<strong>81.29</strong> — Інші види діяльності із прибирання (дезінфекція, дезінсекція, дератизація, озонування)
						</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Аграрні КВЕД:{:else}Аграрные КВЭД:{/if}
						</span>
						<span class="req-val">
							<strong>01.61</strong> (Допоміжна діяльність у рослинництві / фумігація), <strong>01.62</strong> (Допоміжна діяльність у тваринництві)
						</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Водопостачання КВЕД:{:else}Водоснабжение КВЭД:{/if}
						</span>
						<span class="req-val">
							<strong>36.00</strong> — Забір, очищення та постачання води (дезінфекція мереж та резервуарів)
						</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Телефони гарячої лінії:{:else}Телефоны горячей линии:{/if}
						</span>
						<span class="req-val">
							<a href="tel:{currentContent.phones.mobile}" class="req-link">{currentContent.phones.mobileDisplay}</a>,
							<a href="tel:{currentContent.phones.landline}" class="req-link">{currentContent.phones.landlineDisplay}</a>
						</span>
					</div>

					<div class="req-row">
						<span class="req-key">
							{#if langState.current === 'ua'}Форма розрахунків:{:else}Форма расчетов:{/if}
						</span>
						<span class="req-val">Безготівковий розрахунок на р/р за договором, готівковий розрахунок, банківські картки (з наданням чека та акта)</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Geography of work -->
	<section class="section geo-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">Географія виїздів</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Де ми працюємо та виїжджаємо на об'єкти
					{:else}
						Где мы работаем и выезжаем на объекты
					{/if}
				</h2>
			</div>

			<div class="geo-chips-grid">
				<div class="geo-city-card glass-card">
					<div class="city-icon">⚓</div>
					<h4>м. Чорноморськ</h4>
					<p>Базовий офіс компанії. Виїзд на об'єкт протягом 30-45 хвилин.</p>
				</div>
				<div class="geo-city-card glass-card">
					<div class="city-icon">🏙️</div>
					<h4>м. Одеса</h4>
					<p>Усі райони (Київський, Приморський, Хаджибейський, Пересипський).</p>
				</div>
				<div class="geo-city-card glass-card">
					<div class="city-icon">🌾</div>
					<h4>Овідіопольський р-н</h4>
					<p>Великодолинське, Малодолинське, Олександрівка, Таїрове, Сухий Лиман.</p>
				</div>
				<div class="geo-city-card glass-card">
					<div class="city-icon">🚢</div>
					<h4>м. Южне & Порти</h4>
					<p>Портова зона «Південний», Чорноморський морський порт, логістичні хаби.</p>
				</div>
				<div class="geo-city-card glass-card">
					<div class="city-icon">🏰</div>
					<h4>Білгород-Дністровський</h4>
					<p>Агропідприємства, зернові бази, курортні готелі Затоки та Шабо.</p>
				</div>
				<div class="geo-city-card glass-card">
					<div class="city-icon">🗺️</div>
					<h4>Вся Одеська область</h4>
					<p>Виїзні бригади для обробки елеваторів, фермерських господарств та заводів.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Licenses list -->
	<KvedSection />
</div>

<style>
	.contacts-page {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.requisites-section {
		background: #f8fafc;
	}

	.requisites-card {
		padding: 2.5rem;
		border: 1px solid var(--border-light);
	}

	@media (max-width: 640px) {
		.requisites-card {
			padding: 1.5rem;
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
		padding: 1rem 0;
		border-bottom: 1px solid var(--border-light);
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
		font-size: 0.86rem;
		font-weight: 700;
		color: var(--text-muted);
	}

	.req-val {
		font-size: 0.95rem;
		color: var(--primary-950);
		line-height: 1.5;
	}

	.req-mono {
		font-family: monospace;
		font-size: 1.15rem;
		color: var(--primary-800);
		letter-spacing: 0.05em;
	}

	.req-link {
		color: var(--primary-700);
		font-weight: 700;
		text-decoration: none;
	}

	.req-link:hover {
		color: var(--accent-teal-dark);
		text-decoration: underline;
	}

	/* Geo */
	.geo-section {
		background: #ffffff;
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
		padding: 1.8rem;
		border: 1px solid var(--border-light);
		display: flex;
		flex-direction: column;
		transition: all var(--transition-fast);
	}

	.geo-city-card:hover {
		transform: translateY(-3px);
		border-color: var(--primary-600);
		box-shadow: var(--shadow-md);
	}

	.city-icon {
		font-size: 2rem;
		margin-bottom: 0.8rem;
	}

	.geo-city-card h4 {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--primary-950);
		margin-bottom: 0.4rem;
	}

	.geo-city-card p {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.5;
	}
</style>
