<script lang="ts">
	import { resolve } from '$app/paths';
	import Hero from '#lib/components/Hero.svelte';
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

	<!-- Interactive Calculator Teaser Section -->
	<section class="section calc-teaser-section">
		<div class="container">
			<div class="calc-teaser-card glass-card-dark">
				<div class="teaser-left">
					<div class="section-badge dark">
						{#if langState.current === 'ua'}Точний розрахунок онлайн{:else}Точный расчет онлайн{/if}
					</div>
					<h2 class="teaser-heading">
						{#if langState.current === 'ua'}
							Дізнайтесь точну вартість обробки вашого приміщення за 30 секунд
						{:else}
							Узнайте точную стоимость обработки вашего помещения за 30 секунд
						{/if}
					</h2>
					<p class="teaser-sub">
						{#if langState.current === 'ua'}
							Скористайтеся нашим інтерактивним калькулятором: оберіть тип об'єкта (квартира, будинок, ресторан, склад), вкажіть площу та отримайте миттєву фіксовану вартість з гарантією.
						{:else}
							Воспользуйтесь нашим интерактивным калькулятором: выберите тип объекта, укажите площадь и получите мгновенный расчет стоимости с гарантией.
						{/if}
					</p>
					<div class="teaser-actions">
						<a href={resolve('/calculator')} class="btn btn-primary btn-lg">
							<span>🧮 {#if langState.current === 'ua'}Відкрити онлайн-калькулятор{:else}Открыть онлайн-калькулятор{/if}</span>
						</a>
						<a href={resolve('/how-we-work')} class="btn btn-secondary btn-lg">
							<span>⚙️ {#if langState.current === 'ua'}Як ми працюємо{:else}Как мы работаем{/if}</span>
						</a>
					</div>
				</div>

				<div class="teaser-right">
					<div class="teaser-preview-box">
						<div class="prev-header">⚡ Приклад базових тарифів</div>
						<div class="prev-row">
							<span>1-кімнатна квартира:</span>
							<strong>від 850 грн</strong>
						</div>
						<div class="prev-row">
							<span>2-кімнатна квартира:</span>
							<strong>від 1 050 грн</strong>
						</div>
						<div class="prev-row">
							<span>Приватний будинок (100 м²):</span>
							<strong>від 1 450 грн</strong>
						</div>
						<div class="prev-row">
							<span>Озонування кімнати / авто:</span>
							<strong>від 1 200 грн</strong>
						</div>
						<div class="prev-row">
							<span>HoReCa / Ресторан (HACCP):</span>
							<strong>від 1 800 грн</strong>
						</div>
						<div class="prev-footnote">
							* Всі ціни включають виїзд фахівця, сертифіковані препарати та гарантійний акт.
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>



	<!-- Quick Link to How We Work Preview -->
	<section class="section quick-work-preview-section">
		<div class="container">
			<div class="preview-banner glass-card">
				<div class="preview-text">
					<h3>
						{#if langState.current === 'ua'}
							Бажаєте дізнатися більше про підготовку приміщення та гарантії?
						{:else}
							Хотите узнать больше о подготовке помещения и гарантиях?
						{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							Ознайомтеся з детальним 5-кроковим регламентом нашої роботи, пам'яткою з підготовки квартири та юридичними гарантіями ТОВ «ОЗОН-ДЕЗ».
						{:else}
							Ознакомьтесь с подробным 5-шаговым регламентом нашей работы, памяткой по подготовке и юридическими гарантиями ООО «ОЗОН-ДЕЗ».
						{/if}
					</p>
				</div>
				<div class="preview-buttons">
					<a href={resolve('/how-we-work')} class="btn btn-primary">
						{#if langState.current === 'ua'}Читати розділ «Як ми працюємо» →{:else}Читать раздел «Как мы работаем» →{/if}
					</a>
					<a href={resolve('/contacts')} class="btn btn-secondary">
						{#if langState.current === 'ua'}Контакти та реквізити{:else}Контакты и реквизиты{/if}
					</a>
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



	/* Preview banner */
	.quick-work-preview-section {
		position: relative;
		z-index: 1;
		background: transparent;
		border-top: 1px solid var(--color-void-border);
	}

	.preview-banner {
		padding: 2.5rem 3rem;
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-cards);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		box-shadow: none;
	}

	@media (max-width: 900px) {
		.preview-banner {
			flex-direction: column;
			align-items: flex-start;
			padding: 1.8rem 1.4rem;
		}
	}

	@media (max-width: 480px) {
		.preview-banner {
			padding: 1.4rem 1.15rem;
		}

		.preview-buttons {
			width: 100%;
			flex-direction: column;
		}

		.preview-buttons .btn {
			width: 100%;
		}
	}

	.preview-text h3 {
		font-size: 1.35rem;
		font-weight: 400;
		color: var(--color-bone-white);
		letter-spacing: -0.025em;
		margin-bottom: 0.5rem;
	}

	.preview-text p {
		font-size: 0.9rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.55;
		max-width: 650px;
	}

	.preview-buttons {
		display: flex;
		gap: 1rem;
		flex-shrink: 0;
		flex-wrap: wrap;
	}
</style>
