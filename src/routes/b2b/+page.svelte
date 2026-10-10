<script lang="ts">
	import { asset } from '$app/paths';
	import { CookingPot, Storefront, Package, Bread, Check } from 'phosphor-svelte';
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
			: langState.current === 'ru'
			? 'Пест-контроль HACCP для бизнеса и HoReCa — ООО «ОЗОН-ДЕЗ»'
			: 'Pest Control HACCP for Business & HoReCa — LLC "OZON-DEZ"'}
	</title>
	<meta
		name="description"
		content={langState.current === 'ua'
			? 'Комплексний пест-контроль за стандартами HACCP (ХАССП) для ресторанів, готелів, складів та підприємств у Чорноморську. Повний пакет документів для перевірок.'
			: langState.current === 'ru'
			? 'Комплексный пест-контроль по стандартам HACCP (ХАССП) для ресторанов, отелей, складов и предприятий в Черноморске. Полный пакет документов для проверок.'
			: 'Comprehensive pest control under HACCP standards for restaurants, hotels, warehouses, and enterprises in Chornomorsk and Odesa region.'}
	/>
</svelte:head>

<div class="b2b-page">
	<PageHeader
		badge={b2b.badge}
		title={b2b.title}
		subtitle={b2b.subtitle}
		crumbs={[{ label: currentContent.nav.b2b }]}
		imageSrc={asset('images/b2b-haccp-audit.webp')}
	/>

	<BusinessHaccp />

	<!-- Industry segments section -->
	<section class="section industries-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title">
					{#if langState.current === 'ua'}
						Об'єкти та бізнеси, які ми обслуговуємо
					{:else if langState.current === 'ru'}
						Объекты и бизнесы, которые мы обслуживаем
					{:else}
						Facilities and Businesses We Service
					{/if}
				</h2>
			</div>

			<div class="industries-grid">
				<!-- 1. HoReCa -->
				<div class="ind-card glass-card">
					<div class="ind-card-media">
						<img src="{asset('images/b2b-horeca.webp')}" alt="Ресторани, бари та готелі HoReCa" class="ind-img" loading="lazy" />
						<div class="ind-media-overlay"></div>
						<div class="ind-icon-floating"><CookingPot size={22} weight="duotone" /></div>
					</div>
					<div class="ind-card-body">
						<h3>
							{#if langState.current === 'ua'}HoReCa (Ресторани & Готелі){:else if langState.current === 'ru'}HoReCa (Рестораны & Отели){:else}HoReCa (Restaurants & Hotels){/if}
						</h3>
						<p>
							{#if langState.current === 'ua'}
								Захист кухонь, залів та продуктових комор від тарганів і гризунів. Проведення обробок виключно у нічні або неробочі години з видачею актів.
							{:else if langState.current === 'ru'}
								Защита кухонь, залов и продуктовых кладовых от тараканов и грызунов. Проведение обработок исключительно в ночные или нерабочие часы с выдачей актов.
							{:else}
								Protection of kitchens, dining halls, and storage pantries from cockroaches and rodents. Treatments conducted during off-hours or nighttime with official compliance acts.
							{/if}
						</p>
						<ul class="ind-list">
							<li><Check size={14} weight="bold" color="var(--color-electric-iris)" /> <span>{#if langState.current === 'ua'}Моніторинг пасток за графіком{:else if langState.current === 'ru'}Мониторинг ловушек по графику{:else}Scheduled trap monitoring{/if}</span></li>
							<li><Check size={14} weight="bold" color="var(--color-electric-iris)" /> <span>{#if langState.current === 'ua'}Без запаху та слідів на інвентарі{:else if langState.current === 'ru'}Без запаха и следов на инвентаре{:else}No odor or residue on equipment{/if}</span></li>
						</ul>
					</div>
				</div>

				<!-- 2. Супермаркети -->
				<div class="ind-card glass-card">
					<div class="ind-card-media">
						<img src="{asset('images/b2b-supermarket.webp')}" alt="Супермаркети та торгові мережі" class="ind-img" loading="lazy" />
						<div class="ind-media-overlay"></div>
						<div class="ind-icon-floating"><Storefront size={22} weight="duotone" /></div>
					</div>
					<div class="ind-card-body">
						<h3>
							{#if langState.current === 'ua'}Супермаркети та Торгові мережі{:else if langState.current === 'ru'}Супермаркеты и Торговые сети{:else}Supermarkets & Retail Chains{/if}
						</h3>
						<p>
							{#if langState.current === 'ua'}
								Бар'єрний захист торгових залів, рамп та складських накопичувачів. Регулярна профілактика та швидке реагування на одиничні інциденти.
							{:else if langState.current === 'ru'}
								Барьерная защита торговых залов, рамп и складских накопителей. Регулярная профилактика и быстрое реагирование на единичные инциденты.
							{:else}
								Barrier protection for retail floors, loading ramps, and stockrooms. Regular prevention and rapid response to isolated pest sightings.
							{/if}
						</p>
						<ul class="ind-list">
							<li><Check size={14} weight="bold" color="var(--color-electric-iris)" /> <span>{#if langState.current === 'ua'}Контейнери з ключем безпеки{:else if langState.current === 'ru'}Контейнеры с ключом безопасности{:else}Tamper-resistant bait stations with keys{/if}</span></li>
							<li><Check size={14} weight="bold" color="var(--color-electric-iris)" /> <span>{#if langState.current === 'ua'}Журнал обліку для інспекцій{:else if langState.current === 'ru'}Журнал учета для инспекций{:else}Official pest control log for state audits{/if}</span></li>
						</ul>
					</div>
				</div>

				<!-- 3. Логістичні центри -->
				<div class="ind-card glass-card">
					<div class="ind-card-media">
						<img src="{asset('images/b2b-warehouse.webp')}" alt="Логістичні центри та склади" class="ind-img" loading="lazy" />
						<div class="ind-media-overlay"></div>
						<div class="ind-icon-floating"><Package size={22} weight="duotone" /></div>
					</div>
					<div class="ind-card-body">
						<h3>
							{#if langState.current === 'ua'}Логістичні центри та Склади{:else if langState.current === 'ru'}Логистические центры и Склады{:else}Logistics Centers & Warehouses{/if}
						</h3>
						<p>
							{#if langState.current === 'ua'}
								Дератизація периметру та внутрішніх зон зберігання вантажів. Контроль переміщення гризунів на великих площах.
							{:else if langState.current === 'ru'}
								Дератизация периметра и внутренних зон хранения грузов. Контроль перемещения грызунов на больших площадях.
							{:else}
								Perimeter and interior deratization for cargo storage facilities. Monitoring rodent migration across large industrial floor areas.
							{/if}
						</p>
						<ul class="ind-list">
							<li><Check size={14} weight="bold" color="var(--color-electric-iris)" /> <span>{#if langState.current === 'ua'}Карта точок контролю об'єкта{:else if langState.current === 'ru'}Карта точек контроля объекта{:else}Comprehensive control point layout map{/if}</span></li>
							<li><Check size={14} weight="bold" color="var(--color-electric-iris)" /> <span>{#if langState.current === 'ua'}Офіційні протоколи дератизації{:else if langState.current === 'ru'}Официальные протоколы дератизации{:else}Certified deratization protocols{/if}</span></li>
						</ul>
					</div>
				</div>

				<!-- 4. Харчові виробництва -->
				<div class="ind-card glass-card">
					<div class="ind-card-media">
						<img src="{asset('images/b2b-food-factory.webp')}" alt="Харчові виробництва та фабрики" class="ind-img" loading="lazy" />
						<div class="ind-media-overlay"></div>
						<div class="ind-icon-floating"><Bread size={22} weight="duotone" /></div>
					</div>
					<div class="ind-card-body">
						<h3>
							{#if langState.current === 'ua'}Харчові виробництва{:else if langState.current === 'ru'}Пищевые производства{:else}Food Processing Plants{/if}
						</h3>
						<p>
							{#if langState.current === 'ua'}
								Суворе дотримання санітарно-гігієнічних вимог харчової промисловості за міжнародним стандартом ISO 22000 / HACCP.
							{:else if langState.current === 'ru'}
								Строгое соблюдение санитарно-гигиенических требований пищевой промышленности по международному стандарту ISO 22000 / HACCP.
							{:else}
								Strict compliance with food safety sanitation requirements under international ISO 22000 and HACCP standards.
							{/if}
						</p>
						<ul class="ind-list">
							<li><Check size={14} weight="bold" color="var(--color-electric-iris)" /> <span>{#if langState.current === 'ua'}Індивідуальний регламент санації{:else if langState.current === 'ru'}Индивидуальный регламент санации{:else}Customized sanitation protocol{/if}</span></li>
							<li><Check size={14} weight="bold" color="var(--color-electric-iris)" /> <span>{#if langState.current === 'ua'}Персональний спеціаліст-аудитор{:else if langState.current === 'ru'}Персональный специалист-аудитор{:else}Dedicated specialist auditor{/if}</span></li>
						</ul>
					</div>
				</div>
			</div>

			<div class="b2b-doc-banner glass-card-dark">
				<div class="doc-banner-content">
					<div class="section-badge dark">
						{#if langState.current === 'ua'}Юридичний захист{:else if langState.current === 'ru'}Юридическая защита{:else}Legal protection{/if}
					</div>
					<h3>
						{#if langState.current === 'ua'}
							Повний пакет документів для Держпродспоживслужби
						{:else if langState.current === 'ru'}
							Полный пакет документов для Госпродпотребслужбы
						{:else}
							Full document package for state inspections
						{/if}
					</h3>
					<p>
						{#if langState.current === 'ua'}
							Укладаючи офіційний договір з ТОВ «ОЗОН-ДЕЗ», ви отримуєте затверджену програму пест-контролю, карти розміщення пасток, сертифікати якості на всі препарати та акти виконаних робіт із мокрими печатками.
						{:else if langState.current === 'ru'}
							Заключая официальный договор с ООО «ОЗОН-ДЕЗ», вы получаете утвержденную программу пест-контроля, карты размещения станций, сертификаты на препараты и официальные акты с мокрыми печатями.
						{:else}
							By signing an official contract with LLC "OZON-DEZ", you receive an approved pest control program, trap layout maps, certificates of quality for all preparations, and stamped acts of completed work.
						{/if}
					</p>
				</div>
				<button
					type="button"
					class="btn btn-primary btn-lg"
					onclick={() => orderModal.open({ serviceTitle: langState.current === 'ua' ? 'Запит комерційної пропозиції HACCP' : langState.current === 'ru' ? 'Запрос коммерческого предложения HACCP' : 'HACCP Commercial Proposal Request' })}
				>
					{#if langState.current === 'ua'}Отримати зразок договору та КП{:else if langState.current === 'ru'}Получить образец договора и КП{:else}Get contract sample & proposal{/if}
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
		padding: 0;
		overflow: hidden;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.ind-card:hover {
		transform: translateY(-4px);
		border-color: #0284c7;
		box-shadow: 0 14px 34px rgba(0, 0, 0, 0.4), 0 0 20px rgba(2, 132, 199, 0.25);
	}

	.ind-card-media {
		position: relative;
		height: 180px;
		width: 100%;
		overflow: hidden;
	}

	.ind-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.45s ease;
	}

	.ind-card:hover .ind-img {
		transform: scale(1.07);
	}

	.ind-media-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.65) 100%);
	}

	.ind-icon-floating {
		position: absolute;
		bottom: 12px;
		left: 14px;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: rgba(15, 23, 42, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #38bdf8;
		z-index: 2;
	}

	.ind-card-body {
		padding: 1.5rem 1.6rem 1.8rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	@media (max-width: 480px) {
		.ind-card-body {
			padding: 1.25rem 1.1rem 1.5rem;
		}
	}

	.ind-card h3 {
		font-size: 1.2rem;
		font-weight: 500;
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

	.ind-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.45rem;
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
