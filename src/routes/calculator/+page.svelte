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
			: 'Онлайн-калькулятор стоимости дезинфекции и озонирования — ООО «ОЗОН-ДЕЗ»'}
	</title>
	<meta
		name="description"
		content="Розрахуйте точну вартість дезінфекції, дезінсекції, дератизації або озонування O₃ онлайн. Прозорі тарифи від 850 грн у Чорноморську та Одеській області."
	/>
</svelte:head>

<div class="calculator-page">
	<PageHeader
		badge={langState.current === 'ua' ? 'Прозорий прайс-розрахунок' : 'Прозрачный прайс-расчет'}
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
					{#if langState.current === 'ua'}Гарантія чесної ціни{:else}Гарантия честной цены{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Що вже входить у розраховану вартість?
					{:else}
						Что уже входит в рассчитанную стоимость?
					{/if}
				</h2>
				<p class="section-subtitle">
					{#if langState.current === 'ua'}
						Жодних прихованих доплат за приїзд чи «складність». Ви платите фіксовану суму за договором.
					{:else}
						Никаких скрытых доплат за выезд или «сложность». Фиксированная сумма по договору.
					{/if}
				</p>
			</div>

			<div class="transparency-grid">
				<div class="t-card glass-card">
					<div class="t-icon">🚗</div>
					<h4>
						{#if langState.current === 'ua'}Виїзд бригади з обладнанням{:else}Выезд бригады с оборудованием{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Виїзд фахівця в межах Чорноморська та прилеглих районів уже врахований у базовий тариф.
						{:else}
							Выезд специалиста в пределах Черноморска и прилегающих районов уже включен в базовый тариф.
						{/if}
					</p>
				</div>

				<div class="t-card glass-card">
					<div class="t-icon">🧪</div>
					<h4>
						{#if langState.current === 'ua'}Сертифіковані препарати МОЗ{:else}Сертифицированные препараты Минздрава{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Використовуємо виключно ліцензовані препарати 4 класу безпеки (малонебезпечні, без їдкого запаху).
						{:else}
							Используем сертифицированные препараты 4 класса безопасности (малоопасные, без едкого запаха).
						{/if}
					</p>
				</div>

				<div class="t-card glass-card">
					<div class="t-icon">📝</div>
					<h4>
						{#if langState.current === 'ua'}Акти та гарантійний договір{:else}Акты и гарантийный договор{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Офіційний акт виконаних санітарних робіт та гарантійні зобов'язання від 6 до 12 місяців.
						{:else}
							Официальный акт выполненных санитарных работ и гарантийные обязательства от 6 до 12 месяцев.
						{/if}
					</p>
				</div>

				<div class="t-card glass-card">
					<div class="t-icon">🔄</div>
					<h4>
						{#if langState.current === 'ua'}Безкоштовний контрольний виїзд{:else}Бесплатный контрольный выезд{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							У разі збереження ознак шкідників під час гарантійного періоду повторна обробка проводиться безкоштовно.
						{:else}
							В случае сохранения активности вредителей в гарантийный период повторный выезд бесплатный.
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
		background: var(--color-liquid-deep);
		border-top: 1px solid var(--border-subtle);
	}

	.transparency-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.4rem;
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
		padding: 1.8rem 1.5rem;
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	@media (max-width: 480px) {
		.t-card {
			padding: 1.4rem 1.15rem;
		}
	}

	.t-card:hover {
		transform: translateY(-2px);
		border-color: rgba(203, 255, 252, 0.28);
	}

	.t-icon {
		font-size: 2rem;
		margin-bottom: 0.8rem;
	}

	.t-card h4 {
		font-size: 1.05rem;
		font-weight: 500;
		color: var(--color-platinum);
		margin-bottom: 0.4rem;
	}

	.t-card p {
		font-size: 0.85rem;
		color: var(--color-silver-mist);
		line-height: 1.55;
	}
</style>
