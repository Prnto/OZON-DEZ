<script lang="ts">
	import { asset } from '$app/paths';
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
		content="Офіційні контакти ТОВ «ОЗОН-ДЕЗ»: м. Чорноморськ, просп. Миру, 8-А. Телефони: +38 (063) 667-26-53, (04868) 6-03-08. Повні юридичні реквізити, карта та месенджери."
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
						<span class="req-val">2011 рік (понад 15 років безперервної діяльності)</span>
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
		background: var(--color-void);
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

	.req-val strong {
		color: var(--color-bone-white);
		font-weight: 500;
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
		background: var(--color-void);
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
		padding: 2.2rem 1.8rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.geo-city-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-electric-iris);
	}

	.city-icon {
		font-size: 2rem;
		margin-bottom: 0.85rem;
	}

	.geo-city-card h4 {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.45rem;
	}

	.geo-city-card p {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
	}
</style>
