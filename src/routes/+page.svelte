<script lang="ts">
	import { resolve } from '$app/paths';
	import Hero from '#lib/components/Hero.svelte';
	import AboutCompany from '#lib/components/AboutCompany.svelte';
	import ReviewsSection from '#lib/components/ReviewsSection.svelte';

	import { langState } from '../lib/state/language.svelte';
	import { contentMap } from '../lib/data/content';

	let currentContent = $derived(contentMap[langState.current]);
</script>

<svelte:head>
	<title>{currentContent.companyName} — {currentContent.hero.titleMain} {currentContent.hero.titleHighlight}</title>
	<meta name="description" content="{currentContent.hero.subtitle}" />
</svelte:head>

<div class="homepage">
	<!-- Hero Section -->
	<Hero />

	<!-- Official Company Profile & Core 5 Directions -->
	<AboutCompany />

	<!-- Interactive Calculator Teaser Section -->
	<section class="section calc-teaser-section">
		<div class="container">
			<div class="calc-teaser-card glass-card-dark">
				<div class="teaser-left">
					<div class="section-badge dark">
						{#if langState.current === 'ua'}Точний розрахунок онлайн{:else if langState.current === 'ru'}Точный расчет онлайн{:else}Precise Online Estimate{/if}
					</div>
					<h2 class="teaser-heading">
						{#if langState.current === 'ua'}
							Дізнайтесь точну вартість обробки вашого приміщення за 30 секунд
						{:else if langState.current === 'ru'}
							Узнайте точную стоимость обработки вашего помещения за 30 секунд
						{:else}
							Calculate the exact cost of treating your facility in 30 seconds
						{/if}
					</h2>
					<p class="teaser-sub">
						{#if langState.current === 'ua'}
							Скористайтеся нашим інтерактивним калькулятором: оберіть тип об'єкта (квартира, будинок, ресторан, склад), вкажіть площу та отримайте миттєву фіксовану вартість з гарантією.
						{:else if langState.current === 'ru'}
							Воспользуйтесь нашим интерактивным калькулятором: выберите тип объекта, укажите площадь и получите мгновенный расчет стоимости с гарантией.
						{:else}
							Use our interactive calculator: select facility type, specify square meters, and get an instant fixed quote with a contract warranty.
						{/if}
					</p>
					<div class="teaser-actions">
						<a href={resolve('/calculator')} class="btn btn-primary btn-lg">
							<span>🧮 {#if langState.current === 'ua'}Відкрити онлайн-калькулятор{:else if langState.current === 'ru'}Открыть онлайн-калькулятор{:else}Open Online Calculator{/if}</span>
						</a>
						<a href={resolve('/how-we-work')} class="btn btn-secondary btn-lg">
							<span>⚙️ {#if langState.current === 'ua'}Як ми працюємо{:else if langState.current === 'ru'}Как мы работаем{:else}How We Work{/if}</span>
						</a>
					</div>
				</div>

				<div class="teaser-right">
					<div class="teaser-preview-box">
						<div class="prev-header">
							{#if langState.current === 'ua'}⚡ Приклад базових тарифів{:else if langState.current === 'ru'}⚡ Пример базовых тарифов{:else}⚡ Sample Standard Rates{/if}
						</div>
						<div class="prev-row">
							<span>{#if langState.current === 'ua'}1-кімнатна квартира:{:else if langState.current === 'ru'}1-комнатная квартира:{:else}1-room apartment:{/if}</span>
							<strong>{#if langState.current === 'en'}from 850 UAH{:else}від 850 грн{/if}</strong>
						</div>
						<div class="prev-row">
							<span>{#if langState.current === 'ua'}2-кімнатна квартира:{:else if langState.current === 'ru'}2-комнатная квартира:{:else}2-room apartment:{/if}</span>
							<strong>{#if langState.current === 'en'}from 1 050 UAH{:else}від 1 050 грн{/if}</strong>
						</div>
						<div class="prev-row">
							<span>{#if langState.current === 'ua'}Приватний будинок (100 м²):{:else if langState.current === 'ru'}Частный дом (100 м²):{:else}Private house (100 m²):{/if}</span>
							<strong>{#if langState.current === 'en'}from 1 450 UAH{:else}від 1 450 грн{/if}</strong>
						</div>
						<div class="prev-row">
							<span>{#if langState.current === 'ua'}HoReCa / Ресторан (HACCP):{:else if langState.current === 'ru'}HoReCa / Ресторан (HACCP):{:else}HoReCa / Restaurant (HACCP):{/if}</span>
							<strong>{#if langState.current === 'en'}from 1 800 UAH{:else}від 1 800 грн{/if}</strong>
						</div>
						<div class="prev-footnote">
							{#if langState.current === 'ua'}
								* Всі ціни включають виїзд спеціаліста, сертифіковані препарати та гарантійний акт.
							{:else if langState.current === 'ru'}
								* Все цены включают выезд специалиста, сертифицированные препараты и гарантийный акт.
							{:else}
								* All prices include specialist visit, certified preparations, and warranty certificate.
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Real Case Studies & Customer Reviews -->
	<ReviewsSection />
</div>

<style>
	.homepage {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden;
		background-color: transparent;
	}

	/* Calc Teaser */
	.calc-teaser-section {
		position: relative;
		z-index: 1;
		background: transparent;
	}

	.calc-teaser-card {
		padding: 3.2rem;
		border-radius: var(--radius-cards);
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 3rem;
		align-items: center;
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		box-shadow: none;
	}

	@media (max-width: 960px) {
		.calc-teaser-card {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 2rem 1.6rem;
		}
	}

	@media (max-width: 520px) {
		.calc-teaser-card {
			padding: 1.5rem 1.15rem;
			gap: 1.5rem;
		}

		.teaser-actions {
			width: 100%;
			flex-direction: column;
		}

		.teaser-actions .btn {
			width: 100%;
		}

		.teaser-preview-box {
			padding: 1.25rem 1rem;
		}
	}

	.teaser-heading {
		font-size: clamp(2rem, 3vw, 2.8rem);
		font-weight: 400;
		color: var(--color-bone-white);
		margin: 0.8rem 0 1rem;
		letter-spacing: -0.035em;
		line-height: 1.15;
	}

	.teaser-sub {
		font-size: 0.98rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
		margin-bottom: 1.8rem;
		max-width: 620px;
	}

	.teaser-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.teaser-preview-box {
		background: var(--color-surface-hover);
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-cards);
		padding: 1.8rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.prev-header {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--color-saffron-spark);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid var(--color-void-border);
	}

	.prev-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.86rem;
		color: var(--color-ash-gray);
	}

	.prev-row strong {
		color: var(--color-bone-white);
		font-family: var(--font-heading);
		font-weight: 500;
	}

	.prev-footnote {
		font-size: 0.72rem;
		color: var(--color-ash-gray);
		opacity: 0.75;
		padding-top: 0.75rem;
		border-top: 1px dashed var(--color-void-border);
		line-height: 1.4;
	}
</style>
