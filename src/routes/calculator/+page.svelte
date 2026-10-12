<script lang="ts">
	import { asset } from '$app/paths';
	import { Car, Flask, FileText, ArrowsClockwise } from 'phosphor-svelte';
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
		title={calc.title}
		subtitle={calc.subtitle}
		crumbs={[]}
		imageSrc={asset('images/calculator-bg.webp')}
	/>

	<!-- Full interactive calculator -->
	<Calculator />

	<!-- Pricing Transparency Highlights -->
	<section class="section pricing-transparency-section">
		<div class="container">
			<div class="section-header">
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
					<div class="t-icon"><Car size={26} weight="duotone" /></div>
					<h4>
						{#if langState.current === 'ua'}Виїзд по всій Одеській області{:else if langState.current === 'ru'}Выезд по всей Одесской области{:else}Dispatch Across Odesa Region{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Виїзди здійснюються по всій Одеській області без доплат за виїзд. Для бізнесу можливі виїзди в зручний час (включаючи нічні зміни).
						{:else if langState.current === 'ru'}
							Выезды осуществляются по всей Одесской области без доплат за выезд. Для бизнеса возможны выезды в удобное время (включая ночные смены).
						{:else}
							Dispatches across the entire Odesa region without extra travel fees. Flexible scheduling for businesses including night shifts.
						{/if}
					</p>
				</div>

				<div class="t-card glass-card">
					<div class="t-icon"><Flask size={26} weight="duotone" /></div>
					<h4>
						{#if langState.current === 'ua'}Висновки на держреєстрацію{:else if langState.current === 'ru'}Заключения на госрегистрацию{:else}State Registration Conclusions{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Використовуємо виключно препарати з Висновками на державну реєстрацію деззасобів (4 клас — малонебезпечні, без їдкого запаху).
						{:else if langState.current === 'ru'}
							Используем исключительно препараты с Заключениями на государственную регистрацию дезсредств (4 класс — малоопасные).
						{:else}
							Exclusively using preparations with State Registration Conclusions (Class 4 safety — low hazard, odorless).
						{/if}
					</p>
				</div>

				<div class="t-card glass-card">
					<div class="t-icon"><FileText size={26} weight="duotone" /></div>
					<h4>
						{#if langState.current === 'ua'}Офіційний договір та акти{:else if langState.current === 'ru'}Официальный договор и акты{:else}Official Contract & Acts{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Офіційний акт виконаних санітарних робіт, повний пакет документів для перевірок та відповідність нормам HACCP.
						{:else if langState.current === 'ru'}
							Официальный акт выполненных санитарных работ, полный пакет документов для проверок и соответствие нормам HACCP.
						{:else}
							Official acts of completed sanitation work, full documentation package for inspections and HACCP compliance.
						{/if}
					</p>
				</div>

				<div class="t-card glass-card">
					<div class="t-icon"><ArrowsClockwise size={26} weight="duotone" /></div>
					<h4>
						{#if langState.current === 'ua'}Гарантія 6–12 місяців{:else if langState.current === 'ru'}Гарантия 6–12 месяцев{:else}6–12 Months Warranty{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Гарантія 6–12 міс. та знижка 10–15% на повторну обробку при необхідності довготривалого захисту.
						{:else if langState.current === 'ru'}
							Гарантия 6–12 мес. и скидка 10–15% на повторную обработку при необходимости долговременной защиты.
						{:else}
							6–12 months warranty and 10–15% discount on repeated treatment if long-term barrier protection is required.
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
		border: 1.5px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: var(--hover-transition);
		box-shadow: none;
		cursor: pointer;
	}

	@media (max-width: 480px) {
		.t-card {
			padding: 1.5rem 1.25rem;
		}
	}

	.t-card:hover {
		transform: translateY(-2px);
		border-color: var(--hover-border-color);
		box-shadow: var(--hover-shadow);
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

	:global(html[data-theme="light"]) .t-card {
		background: #ffffff;
		border: 1.5px solid #c9cbbe;
		box-shadow: none !important;
		transition: var(--hover-transition);
	}

	:global(html[data-theme="light"]) .t-card:hover {
		border-color: var(--hover-border-color) !important;
		box-shadow: var(--hover-shadow) !important;
		transform: translateY(-2px);
	}

	:global(html[data-theme="light"]) .t-card h4 {
		color: #222f30;
	}

	:global(html[data-theme="light"]) .t-card p {
		color: #4d5757;
	}
</style>
