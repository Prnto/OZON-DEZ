<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import BusinessHaccp from '#lib/components/BusinessHaccp.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';
	import { orderModal } from '../../lib/state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let b2b = $derived(currentContent.b2bSection);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Пест-контроль HACCP для бізнесу та HoReCa — ТОВ «ОЗОН-ДЕЗ»'
			: 'Пест-контроль HACCP для бизнеса и HoReCa — ООО «ОЗОН-ДЕЗ»'}
	</title>
	<meta
		name="description"
		content="Комплексний пест-контроль за стандартами HACCP (ХАССП) для ресторанів, готелів, складів та підприємств у Чорноморську. Повний пакет документів для перевірок."
	/>
</svelte:head>

<div class="b2b-page">
	<PageHeader
		badge={b2b.badge}
		title={b2b.title}
		subtitle={b2b.subtitle}
		crumbs={[{ label: currentContent.nav.b2b }]}
		imageSrc={asset('images/b2b-haccp-audit.jpg')}
	/>

	<BusinessHaccp />

	<!-- Industry segments section -->
	<section class="section industries-section">
		<div class="container">
			<div class="section-header">
				<div class="section-badge">
					{#if langState.current === 'ua'}Галузеві рішення{:else}Отраслевые решения{/if}
				</div>
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Кому ми гарантуємо 100% відповідність нормам HACCP
					{:else}
						Кому мы гарантируем 100% соответствие нормам HACCP
					{/if}
				</h2>
			</div>

			<div class="industries-grid">
				<div class="ind-card glass-card">
					<div class="ind-icon">🍽️</div>
					<h3>HoReCa (Ресторани & Готелі)</h3>
					<p>
						Захист кухонь, залів та продуктових комор від тарганів і гризунів. Проведення обробок виключно у нічні або неробочі години з видачею актів.
					</p>
					<ul class="ind-list">
						<li>Моніторинг пасток за графіком</li>
						<li>Без запаху та слідів на інвентарі</li>
					</ul>
				</div>

				<div class="ind-card glass-card">
					<div class="ind-icon">🏬</div>
					<h3>Супермаркети та Торгові мережі</h3>
					<p>
						Бар'єрний захист торгових залів, рамп та складських накопичувачів. Регулярна профілактика та швидке реагування на одиничні інциденти.
					</p>
					<ul class="ind-list">
						<li>Контейнери з ключем безпеки</li>
						<li>Журнал обліку для інспекцій</li>
					</ul>
				</div>

				<div class="ind-card glass-card">
					<div class="ind-icon">📦</div>
					<h3>Логістичні центри та Склади</h3>
					<p>
						Дератизація периметру та внутрішніх зон зберігання вантажів. Контроль переміщення гризунів на великих площах.
					</p>
					<ul class="ind-list">
						<li>Карта точок контролю об'єкта</li>
						<li>Офіційні протоколи дератизації</li>
					</ul>
				</div>

				<div class="ind-card glass-card">
					<div class="ind-icon">🥖</div>
					<h3>Харчові виробництва</h3>
					<p>
						Суворе дотримання санітарно-гігієнічних вимог харчової промисловості за міжнародним сертифікатом ISO 22000 / HACCP.
					</p>
					<ul class="ind-list">
						<li>Індивідуальний регламент санації</li>
						<li>Персональний технолог-аудитор</li>
					</ul>
				</div>
			</div>

			<div class="b2b-doc-banner glass-card-dark">
				<div class="doc-banner-content">
					<div class="section-badge dark">Юридичний захист</div>
					<h3>
						{#if langState.current === 'ua'}
							Повний пакет документів для Держпродспоживслужби
						{:else}
							Полный пакет документов для Госпродпотребслужбы
						{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							Укладаючи офіційний договір з ТОВ «ОЗОН-ДЕЗ», ви отримуєте затверджену програму пест-контролю, карти розміщення пасток, сертифікати якості на всі препарати та акти виконаних робіт із мокрими печатками.
						{:else}
							Заключая официальный договор с ООО «ОЗОН-ДЕЗ», вы получаете утвержденную программу пест-контроля, карты размещения станций, сертификаты на препараты и официальные акты с мокрыми печатями.
						{/if}
					</p>
				</div>
				<button
					type="button"
					class="btn btn-primary btn-lg"
					onclick={() => orderModal.open({ serviceTitle: 'Запит комерційної пропозиції HACCP' })}
				>
					{#if langState.current === 'ua'}Отримати зразок договору та КП{:else}Получить образец договора и КП{/if}
				</button>
			</div>
		</div>
	</section>
</div>

<style>
	.industries-section {
		background: transparent;
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.industries-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.ind-card {
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
		.ind-card {
			padding: 1.5rem 1.25rem;
		}
	}

	.ind-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-electric-iris);
	}

	.ind-icon {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	.ind-card h3 {
		font-size: 1.2rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.6rem;
	}

	.ind-card p {
		font-size: 0.88rem;
		line-height: 1.6;
		color: var(--color-ash-gray);
		font-weight: 300;
		margin-bottom: 1.2rem;
		flex: 1;
	}

	.ind-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 0.84rem;
		font-weight: 300;
		color: var(--color-ash-gray);
		border-top: 1px dashed var(--border-subtle);
		padding-top: 0.9rem;
	}

	.ind-list li::before {
		content: '✔ ';
		color: var(--color-electric-iris);
		font-weight: 600;
	}

	.b2b-doc-banner {
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

	@media (max-width: 900px) {
		.b2b-doc-banner {
			flex-direction: column;
			align-items: flex-start;
			padding: 2rem 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.b2b-doc-banner {
			padding: 1.5rem 1.15rem;
		}
		.b2b-doc-banner .btn {
			width: 100%;
		}
	}

	.doc-banner-content h3 {
		font-size: 1.45rem;
		font-weight: 400;
		letter-spacing: -0.03em;
		color: var(--color-bone-white);
		margin-bottom: 0.6rem;
	}

	.doc-banner-content p {
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--color-ash-gray);
		font-weight: 300;
		max-width: 700px;
	}
</style>
