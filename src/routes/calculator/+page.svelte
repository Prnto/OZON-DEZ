<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Calculator from '#lib/components/Calculator.svelte';
	import FaqSection from '#lib/components/FaqSection.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let calc = $derived(currentContent.calculator);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Онлайн-калькулятор вартості дезінфекції та озонування — ТОВ «ОЗОН-ДЕЗ»'
			: langState.current === 'ru'
			? 'Онлайн-калькулятор стоимости дезинфекции и озонирования — ООО «ОЗОН-ДЕЗ»'
			: 'Online Price Calculator for Disinfection & Ozonation — LLC "OZON-DEZ"'}
	</title>
	<meta
		name="description"
		content={langState.current === 'ua'
			? 'Розрахуйте точну вартість дезінфекції, дезінсекції, дератизації або озонування O₃ онлайн. Прозорі тарифи від 850 грн у Чорноморську та Одеській області.'
			: langState.current === 'ru'
			? 'Рассчитайте точную стоимость дезинфекции, дезинсекции, дератизации или озонирования O₃ онлайн. Прозрачные тарифы от 850 грн в Черноморске и Одесской области.'
			: 'Calculate the exact cost of disinfection, disinsection, deratization, or O3 ozonation online. Transparent rates from 850 UAH in Chornomorsk and Odesa region.'}
	/>
</svelte:head>

<div class="calculator-page">
	<PageHeader
		badge={langState.current === 'ua' ? 'Прозорий прайс-розрахунок' : langState.current === 'ru' ? 'Прозрачный прайс-расчет' : 'Transparent Price Estimation'}
		title={calc.title}
		subtitle={calc.subtitle}
		crumbs={[{ label: currentContent.nav.calculator }]}
		imageSrc={asset('images/calculator-bg.jpg')}
	/>

	<!-- Full interactive calculator -->
	<Calculator />

	<!-- Pricing Transparency Highlights -->
	<section class="section pricing-transparency-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}Гарантія чесної ціни{:else if langState.current === 'ru'}Гарантия честной цены{:else}Honest Price Guarantee{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Що вже входить у розраховану вартість?
					{:else if langState.current === 'ru'}
						Что уже входит в рассчитанную стоимость?
					{:else}
						What is already included in the calculated price?
					{/if}
				</h2>
				<p class="section-subtitle">
					{#if langState.current === 'ua'}
						Жодних прихованих доплат за приїзд чи «складність». Ви платите фіксовану суму за договором.
					{:else if langState.current === 'ru'}
						Никаких скрытых доплат за выезд или «сложность». Фиксированная сумма по договору.
					{:else}
						No hidden fees for travel or "complexity". You pay a fixed agreed contract amount.
					{/if}
				</p>
			</div>

			<div class="transparency-grid">
				<div class="t-card glass-card">
					<div class="t-icon">🚗</div>
					<h4>
						{#if langState.current === 'ua'}Виїзд спеціаліста з обладнанням{:else if langState.current === 'ru'}Выезд специалиста с оборудованием{:else}Specialist arrival with equipment{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Виїзд спеціаліста в межах Чорноморська та прилеглих районів уже врахований у базовий тариф.
						{:else if langState.current === 'ru'}
							Выезд специалиста в пределах Черноморска и прилегающих районов уже включен в базовый тариф.
						{:else}
							Specialist arrival within Chornomorsk and adjacent districts is already included in the base rate.
						{/if}
					</p>
				</div>

				<div class="t-card glass-card">
					<div class="t-icon">🧪</div>
					<h4>
						{#if langState.current === 'ua'}Сертифіковані препарати МОЗ{:else if langState.current === 'ru'}Сертифицированные препараты Минздрава{:else}Certified Ministry of Health Preparations{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Використовуємо виключно ліцензовані препарати 4 класу безпеки (малонебезпечні, без їдкого запаху).
						{:else if langState.current === 'ru'}
							Используем сертифицированные препараты 4 класса безопасности (малоопасные, без едкого запаха).
						{:else}
							We use exclusively registered class 4 safety products (low hazard, without pungent odors).
						{/if}
					</p>
				</div>

				<div class="t-card glass-card">
					<div class="t-icon">📝</div>
					<h4>
						{#if langState.current === 'ua'}Акти та гарантійний договір{:else if langState.current === 'ru'}Акты и гарантийный договор{:else}Official Acts & Warranty Contract{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Офіційний акт виконаних санітарних робіт та гарантійні зобов'язання від 6 до 12 місяців.
						{:else if langState.current === 'ru'}
							Официальный акт выполненных санитарных работ и гарантийные обязательства от 6 до 12 месяцев.
						{:else}
							Official acts of completed sanitation work and warranty obligations from 6 to 12 months.
						{/if}
					</p>
				</div>

				<div class="t-card glass-card">
					<div class="t-icon">🔄</div>
					<h4>
						{#if langState.current === 'ua'}Безкоштовний контрольний виїзд{:else if langState.current === 'ru'}Бесплатный контрольный выезд{:else}Free Follow-Up Inspection{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							У разі збереження ознак шкідників під час гарантійного періоду повторна обробка проводиться безкоштовно.
						{:else if langState.current === 'ru'}
							В случае сохранения активности вредителей в гарантийный период повторный выезд бесплатный.
						{:else}
							If any signs of pests persist during the warranty period, repeat treatment is free of charge.
						{/if}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<FaqSection />
</div>

<style>
	.calculator-page {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.pricing-transparency-section {
		background: transparent;
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.transparency-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 960px) {
		.transparency-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 540px) {
		.transparency-grid {
			grid-template-columns: 1fr;
		}
	}

	.t-card {
		padding: 2.2rem 1.8rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	@media (max-width: 480px) {
		.t-card {
			padding: 1.5rem 1.25rem;
		}
	}

	.t-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-electric-iris);
	}

	.t-icon {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.t-card h4 {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
	}

	.t-card p {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
	}
</style>
