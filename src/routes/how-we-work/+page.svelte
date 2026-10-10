<script lang="ts">
	import { asset } from '$app/paths';
	import { CookingPot, PawPrint, Door, Wind } from 'phosphor-svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import HowWeWork from '#lib/components/HowWeWork.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';
	import { orderModal } from '../../lib/state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let work = $derived(currentContent.howWeWork);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Як ми працюємо: етапи, стандарти та гарантія — ТОВ «ОЗОН-ДЕЗ»'
			: langState.current === 'ru'
			? 'Как мы работаем: этапы, стандарты и гарантия — ООО «ОЗОН-ДЕЗ»'
			: 'How We Work: Stages, Standards & Guarantee — LLC "OZON-DEZ"'}
	</title>
	<meta
		name="description"
		content={langState.current === 'ua'
			? 'Покроковий регламент проведення дезінфекції, дезінсекції, дератизації, озонування та пест-контролю від ТОВ «ОЗОН-ДЕЗ». Офіційний договір, ліцензії МОЗ та акти виконаних робіт.'
			: langState.current === 'ru'
			? 'Пошаговый регламент проведения дезинфекции, дезинсекции, дератизации, озонирования и пест-контроля от ООО «ОЗОН-ДЕЗ». Официальный договор, лицензии МОЗ и акты выполненных работ.'
			: 'Step-by-step protocol for disinfection, disinsection, deratization, ozonation, and pest control by LLC "OZON-DEZ". Official contract, certified products, and reports.'}
	/>
</svelte:head>

<div class="how-we-work-page">
	<PageHeader
		badge={work.badge}
		title={work.title}
		subtitle={work.subtitle}
		crumbs={[{ label: currentContent.nav.howWeWork }]}
		imageSrc={asset('images/how-we-work-bg.webp')}
	/>

	<!-- Main How We Work component -->
	<HowWeWork />

	<!-- Extra in-depth standards & client preparation guide -->
	<section class="section prep-guide-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Як підготувати приміщення перед приїздом спеціаліста
					{:else if langState.current === 'ru'}
						Как подготовить помещение перед приездом специалиста
					{:else}
						How to prepare premises before the specialist arrives
					{/if}
				</h2>
				<p class="section-subtitle">
					{#if langState.current === 'ua'}
						Дотримання простих правил підготовки гарантує 100% результат знищення шкідників з першого разу та абсолютну безпеку для людей і тварин.
					{:else if langState.current === 'ru'}
						Соблюдение простых правил подготовки гарантирует 100% результат уничтожения вредителей с первого раза и безопасность для людей и животных.
					{:else}
						Following simple preparation rules ensures a 100% pest eradication result on the first attempt and safety for people and pets.
					{/if}
				</p>
			</div>

			<div class="prep-cards-grid">
				<div class="prep-card glass-card">
					<div class="prep-card-icon"><CookingPot size={28} weight="duotone" /></div>
					<h3>
						{#if langState.current === 'ua'}1. Продукти та посуд{:else if langState.current === 'ru'}1. Продукты и посуда{:else}1. Food & tableware{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							Сховайте відкриті продукти харчування, посуд, столові прибори у герметичні пакети або приберіть у холодильник та закриті шафи.
						{:else if langState.current === 'ru'}
							Спрячьте открытые продукты, посуду, столовые приборы в герметичные пакеты или уберите в холодильник и закрытые шкафы.
						{:else}
							Pack open food products, dishes, and cutlery into sealed bags or store them in the refrigerator and closed cabinets.
						{/if}
					</p>
				</div>

				<div class="prep-card glass-card">
					<div class="prep-card-icon"><PawPrint size={28} weight="duotone" /></div>
					<h3>
						{#if langState.current === 'ua'}2. Домашні улюбленці{:else if langState.current === 'ru'}2. Домашние питомцы{:else}2. Pets & animals{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							Коти, собаки, птахи мають покинути приміщення на час обробки (на 2-3 години). Акваріуми щільно закрийте та вимкніть компресор.
						{:else if langState.current === 'ru'}
							Кошки, собаки, птицы должны покинуть помещение на время обработки (на 2-3 часа). Аквариумы плотно закройте и выключите компрессор.
						{:else}
							Cats, dogs, and birds should leave premises during treatment (for 2-3 hours). Cover aquariums tightly and turn off air compressors.
						{/if}
					</p>
				</div>

				<div class="prep-card glass-card">
					<div class="prep-card-icon"><Door size={28} weight="duotone" /></div>
					<h3>
						{#if langState.current === 'ua'}3. Доступ до плінтусів{:else if langState.current === 'ru'}3. Доступ к плинтусам{:else}3. Access to baseboards{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							По можливості відсуньте меблі від стін на 15–20 см, звільніть доступ до кутів, вентиляційних решіток та стояків комунікацій.
						{:else if langState.current === 'ru'}
							По возможности отодвиньте мебель от стен на 15–20 см, освободите доступ к углам, вентиляционным решеткам и стоякам.
						{:else}
							Move furniture 15–20 cm away from walls if possible, clearing access to corners, ventilation grilles, and utility risers.
						{/if}
					</p>
				</div>

				<div class="prep-card glass-card">
					<div class="prep-card-icon"><Wind size={28} weight="duotone" /></div>
					<h3>
						{#if langState.current === 'ua'}4. Провітрювання після{:else if langState.current === 'ru'}4. Проветривание после{:else}4. Airing out afterwards{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							Після закінчення експозиції відкрийте вікна на 30–40 хвилин для наскрізного провітрювання. Протріть вологою ганчіркою робочі поверхні столів.
						{:else if langState.current === 'ru'}
							После окончания экспозиции откройте окна на 30–40 минут для проветривания. Протрите влажной тканью контактные поверхности столов.
						{:else}
							After the exposure period, open windows for 30–40 minutes for thorough ventilation. Wipe table work surfaces with a damp cloth.
						{/if}
					</p>
				</div>
			</div>

			<!-- Quick Call Banner -->
			<div class="prep-action-banner glass-card-dark">
				<div>
					<div class="prep-banner-badge">
						{#if langState.current === 'ua'}Консультація технолога{:else if langState.current === 'ru'}Консультация технолога{:else}Technologist consultation{/if}
					</div>
					<h3>
						{#if langState.current === 'ua'}
							Маєте нестандартний об'єкт або складні умови?
						{:else if langState.current === 'ru'}
							Нестандартный объект или сложные условия?
						{:else}
							Have a non-standard facility or complex conditions?
						{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							Наш спеціаліст проконсультує вас телефоном, підбере оптимальний безпечний препарат та узгодить зручний час виїзду бригади.
						{:else if langState.current === 'ru'}
							Наш специалист проконсультирует по телефону, подберет оптимальный безопасный препарат и согласует удобное время выезда.
						{:else}
							Our specialist will consult you by phone, choose the optimal safe preparation, and coordinate a convenient arrival time.
						{/if}
					</p>
				</div>
				<button
					type="button"
					class="btn btn-primary btn-lg"
					onclick={() => orderModal.open({ serviceTitle: langState.current === 'ua' ? 'Консультація спеціаліста перед виїздом' : langState.current === 'ru' ? 'Консультация специалиста перед выездом' : 'Specialist consultation before arrival' })}
				>
					{#if langState.current === 'ua'}Отримати інструктаж{:else if langState.current === 'ru'}Получить инструктаж{:else}Get instructions{/if}
				</button>
			</div>
		</div>
	</section>

	<!-- Official Licenses & Compliance -->
</div>

<style>
	.how-we-work-page {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.prep-guide-section {
		background: transparent;
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.prep-cards-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	@media (max-width: 960px) {
		.prep-cards-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 540px) {
		.prep-cards-grid {
			grid-template-columns: 1fr;
		}
	}

	.prep-card {
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
		.prep-card {
			padding: 1.5rem 1.25rem;
		}
	}

	.prep-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-electric-iris);
	}

	.prep-card-icon {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.prep-card h3 {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
	}

	.prep-card p {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
	}

	.prep-action-banner {
		padding: 2.5rem 3rem;
		border-radius: var(--radius-cards);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2.5rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		box-shadow: none;
	}

	@media (max-width: 860px) {
		.prep-action-banner {
			flex-direction: column;
			align-items: flex-start;
			padding: 2rem 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.prep-action-banner {
			padding: 1.5rem 1.15rem;
		}
		.prep-action-banner .btn {
			width: 100%;
		}
	}

	.prep-banner-badge {
		display: inline-block;
		font-size: 0.74rem;
		font-weight: 600;
		color: var(--color-saffron-spark);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-bottom: 0.5rem;
	}

	.prep-action-banner h3 {
		font-size: 1.45rem;
		font-weight: 400;
		letter-spacing: -0.03em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
	}

	.prep-action-banner p {
		font-size: 0.9rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
		max-width: 650px;
	}

	:global(html[data-theme="light"]) .prep-card {
		background: rgba(255, 255, 255, 0.8);
		border-color: rgba(15, 23, 42, 0.08);
		box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
	}

	:global(html[data-theme="light"]) .prep-action-banner {
		background: rgba(255, 255, 255, 0.85);
		border-color: rgba(15, 23, 42, 0.08);
		box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
	}
</style>
