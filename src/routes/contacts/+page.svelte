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
		background: var(--color-liquid-deep);
		border-bottom: 1px solid var(--border-subtle);
	}

	.requisites-card {
		padding: 2.2rem 2.5rem;
		background: var(--color-liquid-kelp);
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
			padding: 1.25rem 0.95rem;
		}
		.geo-city-card {
			padding: 1.4rem 1.15rem;
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
		padding: 0.9rem 0;
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
		font-size: 0.82rem;
		font-weight: 500;
		color: var(--color-liquid-mist);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.req-val {
		font-size: 0.92rem;
		color: var(--color-silver-mist);
		line-height: 1.55;
		word-break: break-word;
	}

	.req-val strong {
		color: var(--color-platinum);
	}

	.req-mono {
		font-family: monospace;
		font-size: 1.1rem;
		color: var(--color-lavender-phosphor);
		letter-spacing: 0.05em;
	}

	.req-link {
		color: var(--color-lavender-phosphor);
		font-weight: 500;
		text-decoration: none;
	}

	.req-link:hover {
		color: var(--color-platinum);
		text-decoration: underline;
	}

	/* Geo */
	.geo-section {
		background: var(--color-liquid-abyss);
	}

	.geo-chips-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4rem;
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
		padding: 1.6rem;
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.geo-city-card:hover {
		transform: translateY(-2px);
		border-color: rgba(203, 255, 252, 0.28);
	}

	.city-icon {
		font-size: 1.8rem;
		margin-bottom: 0.75rem;
	}

	.geo-city-card h4 {
		font-size: 1.05rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.35rem;
	}

	.geo-city-card p {
		font-size: 0.84rem;
		color: var(--color-silver-mist);
		line-height: 1.5;
	}
</style>
