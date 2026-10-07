<script lang="ts">
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
			: 'Дезинфекция систем водоснабжения и очистка воды — ООО «ОЗОН-ДЕЗ»'}
	</title>
	<meta
		name="description"
		content="Очищення та дезінфекція резервуарів, колодязів, свердловин та інженерних мереж водопроводу за КВЕД 36.00 у Чорноморську та Одеській області."
	/>
</svelte:head>

<div class="water-page">
	<PageHeader
		badge={water.badge}
		title={water.title}
		subtitle={water.subtitle}
		crumbs={[{ label: currentContent.nav.water }]}
		imageSrc="/images/water-purification.jpg"
	/>

	<WaterSection />

	<!-- Water Process Steps -->
	<section class="section water-process-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">ДСанПіН Стандарти</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}Регламент дезінфекції водопровідних систем{:else}Регламент дезинфекции водопроводных систем{/if}
				</h2>
			</div>

			<div class="water-steps-grid">
				<div class="w-step glass-card">
					<div class="w-num">01</div>
					<h4>Аудит та аналіз біоплівки</h4>
					<p>Візуальний огляд внутрішніх поверхонь резервуарів або колодязів, замір бактеріального забруднення.</p>
				</div>
				<div class="w-step glass-card">
					<div class="w-num">02</div>
					<h4>Механічна очистка стінок</h4>
					<p>Видалення мулу, вапняного нальоту, залізистих відкладень та осаду за допомогою гідродинамічного обладнання.</p>
				</div>
				<div class="w-step glass-card">
					<div class="w-num">03</div>
					<h4>Антимікробна санація</h4>
					<p>Заповнення системи дезінфікуючим розчином або озонування води для 100% знищення легіонели та патогенів.</p>
				</div>
				<div class="w-step glass-card">
					<div class="w-num">04</div>
					<h4>Промивка та контроль якості</h4>
					<p>Скидання технологічної води, промивка чистою водою та видача паспорта санітарної обробки резервуара.</p>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.water-process-section {
		background: #ffffff;
	}

	.water-steps-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.4rem;
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
		padding: 1.8rem;
		border: 1px solid var(--border-light);
		display: flex;
		flex-direction: column;
	}

	.w-num {
		font-family: var(--font-heading);
		font-size: 1.6rem;
		font-weight: 800;
		color: var(--accent-teal);
		margin-bottom: 0.8rem;
	}

	.w-step h4 {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--primary-950);
		margin-bottom: 0.5rem;
	}

	.w-step p {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.55;
	}
</style>
