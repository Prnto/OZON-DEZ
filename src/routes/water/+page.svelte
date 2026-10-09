<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import WaterSection from '#lib/components/WaterSection.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';
	import { orderModal } from '../../lib/state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let water = $derived(currentContent.waterSection);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Дезінфекція систем водопостачання та очистка води — ТОВ «ОЗОН-ДЕЗ»'
			: langState.current === 'ru'
			? 'Дезинфекция систем водоснабжения и очистка воды — ООО «ОЗОН-ДЕЗ»'
			: 'Water System Disinfection & Purification — LLC "OZON-DEZ"'}
	</title>
	<meta
		name="description"
		content={langState.current === 'ua'
			? 'Очищення та дезінфекція резервуарів, колодязів, свердловин та інженерних мереж водопроводу у Чорноморську та Одеській області.'
			: langState.current === 'ru'
			? 'Очистка и дезинфекция резервуаров, колодцев, скважин и инженерных сетей водопровода в Черноморске и Одесской области.'
			: 'Cleaning and disinfection of storage tanks, wells, boreholes, and water pipeline networks in Chornomorsk and Odesa region.'}
	/>
</svelte:head>

<div class="water-page">
	<PageHeader
		badge={water.badge}
		title={water.title}
		subtitle={water.subtitle}
		crumbs={[{ label: currentContent.nav.water }]}
		imageSrc={asset('images/water-purification.webp')}
	/>

	<WaterSection />

	<!-- Water Process Steps -->
	<section class="section water-process-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}ДСанПіН Стандарти{:else if langState.current === 'ru'}ГСанПиН Стандарты{:else}Sanitary Standards{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Регламент дезінфекції водопровідних систем
					{:else if langState.current === 'ru'}
						Регламент дезинфекции водопроводных систем
					{:else}
						Water Pipeline Disinfection Protocol
					{/if}
				</h2>
			</div>

			<div class="water-steps-grid">
				<div class="w-step glass-card">
					<div class="w-num">01</div>
					<h4>
						{#if langState.current === 'ua'}Аудит та аналіз біоплівки{:else if langState.current === 'ru'}Аудит и анализ биопленки{:else}Audit & Biofilm Analysis{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Візуальний огляд внутрішніх поверхонь резервуарів або колодязів, замір бактеріального забруднення.
						{:else if langState.current === 'ru'}
							Визуальный осмотр внутренних поверхностей резервуаров или колодцев, замер бактериального загрязнения.
						{:else}
							Visual inspection of interior tank surfaces, boreholes, or wells, and bacterial contamination testing.
						{/if}
					</p>
				</div>
				<div class="w-step glass-card">
					<div class="w-num">02</div>
					<h4>
						{#if langState.current === 'ua'}Механічна очистка стінок{:else if langState.current === 'ru'}Механическая очистка стенок{:else}Mechanical Surface Cleaning{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Видалення мулу, вапняного нальоту, залізистих відкладень та осаду за допомогою гідродинамічного обладнання.
						{:else if langState.current === 'ru'}
							Удаление ила, известкового налета, железистых отложений и осадка гидродинамическим оборудованием.
						{:else}
							Removal of silt, limescale, ferrous deposits, and sediments using hydrodynamic washing equipment.
						{/if}
					</p>
				</div>
				<div class="w-step glass-card">
					<div class="w-num">03</div>
					<h4>
						{#if langState.current === 'ua'}Антимікробна санація{:else if langState.current === 'ru'}Антимикробная санация{:else}Antimicrobial Sanitation{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Заповнення системи дезінфікуючим розчином або озонування води для 100% знищення легіонели та патогенів.
						{:else if langState.current === 'ru'}
							Заполнение системы дезинфицирующим раствором или озонирование воды для 100% уничтожения легионеллы и патогенов.
						{:else}
							System filling with certified disinfectant solution or water ozonation for 100% pathogen eradication.
						{/if}
					</p>
				</div>
				<div class="w-step glass-card">
					<div class="w-num">04</div>
					<h4>
						{#if langState.current === 'ua'}Промивка та контроль якості{:else if langState.current === 'ru'}Промывка и контроль качества{:else}Flushing & Quality Control{/if}
					</h4>
					<p>
						{#if langState.current === 'ua'}
							Скидання технологічної води, промивка чистою водою та видача паспорта санітарної обробки резервуара.
						{:else if langState.current === 'ru'}
							Сброс технологической воды, промывка чистой водой и выдача паспорта санитарной обработки резервуара.
						{:else}
							Discharge of technical water, flushing with clean potable water, and issuing the sanitary service certificate.
						{/if}
					</p>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.water-process-section {
		background: transparent;
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.water-steps-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 900px) {
		.water-steps-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 540px) {
		.water-steps-grid {
			grid-template-columns: 1fr;
		}
	}

	.w-step {
		padding: 2.2rem 1.8rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast);
		box-shadow: none;
	}

	.w-step:hover {
		transform: translateY(-2px);
		border-color: var(--color-electric-iris);
	}

	.w-num {
		font-family: var(--font-heading);
		font-size: 1.8rem;
		font-weight: 400;
		color: var(--color-electric-iris);
		margin-bottom: 0.8rem;
		letter-spacing: -0.02em;
	}

	.w-step h4 {
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
	}

	.w-step p {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
	}
</style>
