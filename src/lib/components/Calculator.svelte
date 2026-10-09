<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { sendTelegramLead } from '../services/telegram';

	let currentContent = $derived(contentMap[langState.current]);

	// 5 Confirmed Services with specific formulas from LLC "OZON-DEZ"
	type ServiceKey = 'disinsection' | 'deratization' | 'disinfection' | 'ozonation' | 'pest_control';
	type ObjectKey = 'apartment' | 'house' | 'commercial' | 'storage' | 'tank';

	let selectedService = $state<ServiceKey>('disinsection');
	let selectedObject = $state<ObjectKey>('apartment');
	let area = $state(50);
	let optOdorless = $state(false);
	let optBarrier = $state(false);

	// Lead form state
	let clientName = $state('');
	let clientPhone = $state('');
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	const serviceRates: Record<ServiceKey, { base: number; perSqm: number; timeBase: { ua: string; ru: string; en: string } }> = {
		disinsection: { base: 900, perSqm: 4.5, timeBase: { ua: '40–60 хв', ru: '40–60 мин', en: '40–60 min' } },
		deratization: { base: 950, perSqm: 4.0, timeBase: { ua: '30–50 хв', ru: '30–50 мин', en: '30–50 min' } },
		disinfection: { base: 850, perSqm: 5.0, timeBase: { ua: '45–60 хв', ru: '45–60 мин', en: '45–60 min' } },
		ozonation:    { base: 1100, perSqm: 6.0, timeBase: { ua: '1–2 год', ru: '1–2 часа', en: '1–2 hrs' } },
		pest_control: { base: 1600, perSqm: 3.5, timeBase: { ua: 'плановий аудит', ru: 'плановый аудит', en: 'scheduled audit' } }
	};

	const objectMultipliers: Record<ObjectKey, number> = {
		apartment: 1.0,
		house: 1.15,
		commercial: 1.35,
		storage: 1.1,
		tank: 1.25
	};

	// Only show tank for disinfection & ozonation
	let isTankAvailable = $derived(selectedService === 'disinfection' || selectedService === 'ozonation');

	$effect(() => {
		if (!isTankAvailable && selectedObject === 'tank') {
			selectedObject = 'apartment';
		}
	});

	// Price calculation
	let calculatedPrice = $derived.by(() => {
		const rate = serviceRates[selectedService];
		const multiplier = objectMultipliers[selectedObject] || 1.0;
		let price = (rate.base + (area * rate.perSqm)) * multiplier;

		if (optOdorless) price += 250;
		if (optBarrier) price += 200;

		return Math.round(price / 50) * 50;
	});

	let timeDisplay = $derived.by(() => {
		if (area > 150) {
			return langState.current === 'ua' ? 'від 1.5–2.5 год' : langState.current === 'ru' ? 'от 1.5–2.5 часа' : 'from 1.5–2.5 hrs';
		}
		return serviceRates[selectedService].timeBase[langState.current];
	});

	function getServiceName(key: ServiceKey, lang: string): string {
		switch (key) {
			case 'disinsection':
				return lang === 'ua' ? 'Дезінсекція (таргани, блохи, комарі, кліщі)' : lang === 'ru' ? 'Дезинсекция (тараканы, блохи, комары, клещи)' : 'Disinsection (cockroaches, fleas, mosquitoes, ticks)';
			case 'deratization':
				return lang === 'ua' ? 'Дератизація (щури, миші, гризуни)' : lang === 'ru' ? 'Дератизация (крысы, мыши, грызуны)' : 'Deratization (rats, mice, rodents)';
			case 'disinfection':
				return lang === 'ua' ? 'Дезінфекція (поверхні, ємності, вода)' : lang === 'ru' ? 'Дезинфекция (поверхности, емкости, вода)' : 'Disinfection (surfaces, tanks, water)';
			case 'ozonation':
				return lang === 'ua' ? 'Озонування O₃ (усунення запахів, плісняви)' : lang === 'ru' ? 'Озонирование O₃ (устранение запахов, плесени)' : 'Ozonation O₃ (odor and mold removal)';
			case 'pest_control':
				return lang === 'ua' ? 'Пест-контроль для бізнесу (HACCP)' : lang === 'ru' ? 'Пест-контроль для бизнеса (HACCP)' : 'Pest Control for business (HACCP)';
		}
	}

	function getObjectName(key: ObjectKey, lang: string): string {
		switch (key) {
			case 'apartment':
				return lang === 'ua' ? '🏢 Квартира' : lang === 'ru' ? '🏢 Квартира' : '🏢 Apartment';
			case 'house':
				return lang === 'ua' ? '🏡 Приватний будинок' : lang === 'ru' ? '🏡 Частный дом' : '🏡 Private house';
			case 'commercial':
				return lang === 'ua' ? '☕ Ресторан / HoReCa / Офіс' : lang === 'ru' ? '☕ Ресторан / HoReCa / Офис' : '☕ Restaurant / HoReCa / Office';
			case 'storage':
				return lang === 'ua' ? '📦 Склад / Виробництво / Підвал' : lang === 'ru' ? '📦 Склад / Производство / Подвал' : '📦 Warehouse / Facility / Basement';
			case 'tank':
				return lang === 'ua' ? '💧 Резервуар / Ємність води' : lang === 'ru' ? '💧 Резервуар / Емкость воды' : '💧 Tank / Water reservoir';
		}
	}

	let telegramOrderUrl = $derived.by(() => {
		const srvName = getServiceName(selectedService, langState.current);
		const objName = getObjectName(selectedObject, langState.current);
		const currency = langState.current === 'en' ? 'UAH' : 'грн';
		const msg = langState.current === 'ua'
			? `Добрий день! Цікавить послуга: ${srvName}.\nОб'єкт: ${objName}, площа: ${area} м².\nОрієнтовна вартість на сайті: ${calculatedPrice} грн.`
			: langState.current === 'ru'
			? `Добрый день! Интересует услуга: ${srvName}.\nОбъект: ${objName}, площадь: ${area} м².\nОриентировочная стоимость на сайте: ${calculatedPrice} грн.`
			: `Hello! Interested in service: ${srvName}.\nFacility: ${objName}, area: ${area} m².\nEstimated quote from website: ${calculatedPrice} ${currency}.`;
		return `https://t.me/ozon_dez_lead_bot?start=calc`;
	});

	async function handleSubmitOrder(e: Event) {
		e.preventDefault();
		if (!clientPhone.trim() || isSubmitting) return;

		isSubmitting = true;
		try {
			const srvName = getServiceName(selectedService, langState.current);
			const objName = getObjectName(selectedObject, langState.current);
			const extrasList = [
				optOdorless ? (langState.current === 'ua' ? 'Без запаху (+250)' : langState.current === 'ru' ? 'Без запаха (+250)' : 'Odorless (+250)') : '',
				optBarrier ? (langState.current === 'ua' ? 'Бар\'єрний захист (+200)' : langState.current === 'ru' ? 'Барьерная защита (+200)' : 'Barrier (+200)') : ''
			].filter(Boolean).join(', ') || (langState.current === 'en' ? 'None' : 'Не обрано');

			await sendTelegramLead({
				source: 'Онлайн-калькулятор OZON-DEZ',
				name: clientName,
				phone: clientPhone,
				serviceTitle: srvName,
				objectType: objName,
				area: `${area} м²`,
				price: `${calculatedPrice} грн`,
				extras: extrasList,
				lang: langState.current
			});
		} catch (err) {
			console.error('Error submitting calculator order:', err);
		} finally {
			isSubmitting = false;
			isSuccess = true;
		}
	}
</script>

<section class="calc-section" id="calculator">
	<div class="calc-container">
		<div class="calc-header">
			<span class="calc-tag">
				🧮 {#if langState.current === 'ua'}ОНЛАЙН РОЗРАХУНОК{:else if langState.current === 'ru'}ОНЛАЙН РАСЧЕТ{:else}ONLINE CALCULATION{/if}
			</span>
			<h2 class="calc-title">
				{#if langState.current === 'ua'}
					Розрахуйте орієнтовну вартість обробки за 20 секунд
				{:else if langState.current === 'ru'}
					Рассчитайте ориентировочную стоимость обработки за 20 секунд
				{:else}
					Calculate Estimated Treatment Cost in 20 Seconds
				{/if}
			</h2>
			<p class="calc-subtitle">
				{#if langState.current === 'ua'}
					Оберіть послугу, тип об'єкта та площу. Точну фіксовану ціну спеціаліст озвучить перед початком робіт.
				{:else if langState.current === 'ru'}
					Выберите услугу, тип объекта и площадь. Точную фиксированную цену специалист озвучит до начала работ.
				{:else}
					Select service, facility type, and area. Exact fixed price is confirmed by our specialist prior to work.
				{/if}
			</p>
		</div>

		<div class="calc-card">
			<div class="calc-grid">
				<!-- Ліва колонка: Параметри -->
				<div class="calc-inputs">
					<!-- 1. Напрямок послуги -->
					<div class="calc-group">
						<label class="calc-label" for="calcService">
							1. {#if langState.current === 'ua'}Оберіть необхідну послугу:{:else if langState.current === 'ru'}Выберите необходимую услугу:{:else}Select required service:{/if}
						</label>
						<select id="calcService" class="calc-select" bind:value={selectedService}>
							<option value="disinsection">
								{#if langState.current === 'ua'}Дезінсекція (таргани, блохи, комарі, кліщі){:else if langState.current === 'ru'}Дезинсекция (тараканы, блохи, комары, клещи){:else}Disinsection (cockroaches, fleas, mosquitoes, ticks){/if}
							</option>
							<option value="deratization">
								{#if langState.current === 'ua'}Дератизація (щури, миші, гризуни){:else if langState.current === 'ru'}Дератизация (крысы, мыши, грызуны){:else}Deratization (rats, mice, rodents){/if}
							</option>
							<option value="disinfection">
								{#if langState.current === 'ua'}Дезінфекція (знезараження поверхонь, ємностей, води){:else if langState.current === 'ru'}Дезинфекция (обеззараживание поверхностей, емкостей, воды){:else}Disinfection (surfaces, tanks, water){/if}
							</option>
							<option value="ozonation">
								{#if langState.current === 'ua'}Озонування O₃ (усунення запахів, плісняви, дезінфекція повітря){:else if langState.current === 'ru'}Озонирование O₃ (устранение запахов, плесени, очистка воздуха){:else}Ozonation O₃ (odor, mold & air sanitization){/if}
							</option>
							<option value="pest_control">
								{#if langState.current === 'ua'}Пест-контроль для бізнесу (HACCP, моніторинг, акти){:else if langState.current === 'ru'}Пест-контроль для бизнеса (HACCP, мониторинг, акты){:else}Pest Control for business (HACCP, monitoring, acts){/if}
							</option>
						</select>
					</div>

					<!-- 2. Тип об'єкта -->
					<div class="calc-group">
						<span class="calc-label">
							2. {#if langState.current === 'ua'}Тип об'єкта:{:else if langState.current === 'ru'}Тип объекта:{:else}Facility type:{/if}
						</span>
						<div class="calc-radio-group">
							<label class="radio-card" class:checked={selectedObject === 'apartment'}>
								<input type="radio" name="objectType" value="apartment" bind:group={selectedObject} />
								<span class="radio-label">🏢 {#if langState.current === 'ua'}Квартира{:else if langState.current === 'ru'}Квартира{:else}Apartment{/if}</span>
							</label>
							<label class="radio-card" class:checked={selectedObject === 'house'}>
								<input type="radio" name="objectType" value="house" bind:group={selectedObject} />
								<span class="radio-label">🏡 {#if langState.current === 'ua'}Приватний будинок{:else if langState.current === 'ru'}Частный дом{:else}Private house{/if}</span>
							</label>
							<label class="radio-card" class:checked={selectedObject === 'commercial'}>
								<input type="radio" name="objectType" value="commercial" bind:group={selectedObject} />
								<span class="radio-label">☕ {#if langState.current === 'ua'}Ресторан / HoReCa / Офіс{:else if langState.current === 'ru'}Ресторан / HoReCa / Офис{:else}HoReCa / Office{/if}</span>
							</label>
							<label class="radio-card" class:checked={selectedObject === 'storage'}>
								<input type="radio" name="objectType" value="storage" bind:group={selectedObject} />
								<span class="radio-label">📦 {#if langState.current === 'ua'}Склад / Виробництво / Підвал{:else if langState.current === 'ru'}Склад / Производство / Подвал{:else}Storage / Facility{/if}</span>
							</label>
							{#if isTankAvailable}
								<label class="radio-card" class:checked={selectedObject === 'tank'}>
									<input type="radio" name="objectType" value="tank" bind:group={selectedObject} />
									<span class="radio-label">💧 {#if langState.current === 'ua'}Резервуар / Ємність води{:else if langState.current === 'ru'}Резервуар / Емкость воды{:else}Tank / Reservoir{/if}</span>
								</label>
							{/if}
						</div>
					</div>

					<!-- 3. Площа об'єкта (Range слайдер) -->
					<div class="calc-group" id="areaGroup">
						<div class="calc-label-row">
							<label class="calc-label" for="calcArea">
								3. {#if langState.current === 'ua'}Орієнтовна площа:{:else if langState.current === 'ru'}Ориентировочная площадь:{:else}Estimated area:{/if}
							</label>
							<span class="calc-range-value">
								<strong>{area}</strong> {langState.current === 'en' ? 'm²' : 'м²'}
							</span>
						</div>
						<input
							type="range"
							id="calcArea"
							min="20"
							max="350"
							step="5"
							bind:value={area}
							class="calc-range"
						/>
						<div class="calc-range-scale">
							<span>20 {langState.current === 'en' ? 'm²' : 'м²'}</span>
							<span>100 {langState.current === 'en' ? 'm²' : 'м²'}</span>
							<span>200 {langState.current === 'en' ? 'm²' : 'м²'}</span>
							<span>350+ {langState.current === 'en' ? 'm²' : 'м²'}</span>
						</div>
					</div>

					<!-- 4. Додаткові параметри -->
					<div class="calc-group">
						<span class="calc-label">
							4. {#if langState.current === 'ua'}Додаткові параметри:{:else if langState.current === 'ru'}Дополнительные параметры:{:else}Additional options:{/if}
						</span>
						<div class="calc-checkbox-group">
							<label class="checkbox-item">
								<input type="checkbox" bind:checked={optOdorless} />
								<span>
									{#if langState.current === 'ua'}Препарати без запаху (преміум){:else if langState.current === 'ru'}Препараты без запаха (премиум){:else}Odorless preparations (premium){/if}
									<strong>(+250 {langState.current === 'en' ? 'UAH' : 'грн'})</strong>
								</span>
							</label>
							<label class="checkbox-item">
								<input type="checkbox" bind:checked={optBarrier} />
								<span>
									{#if langState.current === 'ua'}Встановлення бар'єрного захисту по периметру{:else if langState.current === 'ru'}Установка барьерной защиты по периметру{:else}Perimeter barrier protection{/if}
									<strong>(+200 {langState.current === 'en' ? 'UAH' : 'грн'})</strong>
								</span>
							</label>
						</div>
					</div>
				</div>

				<!-- Права колонка: Результат розрахунку -->
				<div class="calc-summary">
					<div class="summary-box">
						<span class="summary-caption">
							{#if langState.current === 'ua'}Попередній розрахунок:{:else if langState.current === 'ru'}Предварительный расчет:{:else}Estimated Quote:{/if}
						</span>
						<div class="summary-price">
							<span class="price-from">{#if langState.current === 'ua'}від{:else if langState.current === 'ru'}от{:else}from{/if}</span>
							<span class="price-val">{calculatedPrice}</span>
							<span class="price-currency">{#if langState.current === 'en'}UAH{:else}грн{/if}</span>
						</div>

						<ul class="summary-list">
							<li>
								<span>⏱ {#if langState.current === 'ua'}Орієнтовний час обробки:{:else if langState.current === 'ru'}Ориентировочное время обработки:{:else}Estimated duration:{/if}</span>
								<strong>{timeDisplay}</strong>
							</li>
							<li>
								<span>🛡 {#if langState.current === 'ua'}Гарантія:{:else if langState.current === 'ru'}Гарантия:{:else}Warranty:{/if}</span>
								<strong>{#if langState.current === 'ua'}Офіційний договір{:else if langState.current === 'ru'}Официальный договор{:else}Official contract{/if}</strong>
							</li>
							<li>
								<span>🧪 {#if langState.current === 'ua'}Препарати:{:else if langState.current === 'ru'}Препараты:{:else}Preparations:{/if}</span>
								<strong>{#if langState.current === 'ua'}Сертифіковані МОЗ України{:else if langState.current === 'ru'}Сертифицированные МОЗ Украины{:else}Ministry of Health certified{/if}</strong>
							</li>
							<li>
								<span>📍 {#if langState.current === 'ua'}Виїзд:{:else if langState.current === 'ru'}Выезд:{:else}Dispatch area:{/if}</span>
								<strong>{#if langState.current === 'ua'}Чорноморськ, Одеса та область{:else if langState.current === 'ru'}Черноморск, Одесса и область{:else}Chornomorsk, Odesa & region{/if}</strong>
							</li>
						</ul>

						<div class="summary-cta">
							<a href="tel:{currentContent.phones.mobile}" class="btn-calc-submit">
								<span>📞</span>
								<span>
									{#if langState.current === 'ua'}Замовити за цією ціною{:else if langState.current === 'ru'}Заказать по этой цене{:else}Order at this price{/if}
								</span>
							</a>
							<a
								href={telegramOrderUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="btn-calc-tg"
							>
								<svg class="calc-tg-svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
									<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.895-.964 4.57-1.36 6.69-.168.897-.5 1.197-.82 1.226-.697.065-1.226-.46-1.9-.902-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.481-.43-.01-1.257-.243-1.872-.443-.755-.245-1.355-.375-1.303-.792.027-.217.327-.439.9-.667 3.524-1.535 5.874-2.548 7.05-3.039 3.355-1.398 4.053-1.641 4.507-1.649.1 0 .323.024.468.141.122.099.156.232.169.327-.003.076.012.306-.013.447z"/>
								</svg>
								<span>{#if langState.current === 'ua'}Відправити розрахунок у Telegram{:else if langState.current === 'ru'}Отправить расчет в Telegram{:else}Send calculation to Telegram{/if}</span>
							</a>
						</div>

						<!-- Quick callback submit -->
						<div class="calc-lead-section">
							{#if isSuccess}
								<div class="lead-success-badge">
									✓ {#if langState.current === 'ua'}Заявку надіслано! Спеціаліст зв'яжеться з вами.{:else if langState.current === 'ru'}Заявка отправлена! Специалист свяжется с вами.{:else}Request sent! Our specialist will contact you.{/if}
								</div>
							{:else}
								<form onsubmit={handleSubmitOrder} class="quick-lead-form">
									<div class="lead-inputs">
										<input
											type="tel"
											placeholder={langState.current === 'ua' ? 'Ваш телефон (+380...)' : langState.current === 'ru' ? 'Ваш телефон (+380...)' : 'Phone number (+380...)'}
											bind:value={clientPhone}
											required
											class="lead-input"
										/>
										<button type="submit" class="lead-btn" disabled={isSubmitting}>
											{#if isSubmitting}...{:else}⚡ {#if langState.current === 'ua'}Виклик спеціаліста{:else if langState.current === 'ru'}Вызов специалиста{:else}Call specialist{/if}{/if}
										</button>
									</div>
								</form>
							{/if}
						</div>

						<p class="summary-note">
							{#if langState.current === 'ua'}
								* Вартість є орієнтовною. Остаточна сума залежить від ступеня зараження, планування та висоти стелі.
							{:else if langState.current === 'ru'}
								* Стоимость является ориентировочной. Окончательная сумма зависит от степени заражения, планировки и высоты потолков.
							{:else}
								* Price is estimated. Final cost depends on contamination level, layout, and ceiling height.
							{/if}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.calc-section {
		padding: 5rem 1.25rem;
		background: transparent;
		color: var(--color-bone-white);
	}

	.calc-container {
		max-width: 1040px;
		margin: 0 auto;
	}

	.calc-header {
		text-align: center;
		margin-bottom: 2.8rem;
	}

	.calc-tag {
		display: inline-block;
		font-size: 0.85rem;
		font-weight: 700;
		color: #38bdf8;
		letter-spacing: 0.05em;
		margin-bottom: 8px;
	}

	:global(html[data-theme="light"]) .calc-tag {
		color: #0284c7;
	}

	.calc-title {
		font-size: clamp(1.8rem, 3.2vw, 2.5rem);
		font-weight: 800;
		margin: 0 0 12px 0;
		line-height: 1.25;
		color: var(--color-bone-white);
	}

	:global(html[data-theme="light"]) .calc-title {
		color: #0f172a;
	}

	.calc-subtitle {
		color: var(--color-ash-gray);
		font-size: 1rem;
		max-width: 680px;
		margin: 0 auto;
		line-height: 1.6;
	}

	:global(html[data-theme="light"]) .calc-subtitle {
		color: #64748b;
	}

	.calc-card {
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		border-radius: 20px;
		box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.25);
		padding: 36px;
	}

	:global(html[data-theme="light"]) .calc-card {
		background: #ffffff;
		border-color: #e2e8f0;
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
	}

	.calc-grid {
		display: grid;
		grid-template-columns: 1.35fr 1fr;
		gap: 36px;
		align-items: start;
	}

	.calc-group {
		margin-bottom: 24px;
	}

	.calc-label {
		display: block;
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--color-bone-white);
		margin-bottom: 10px;
	}

	:global(html[data-theme="light"]) .calc-label {
		color: #1e293b;
	}

	.calc-label-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.calc-range-value {
		color: #38bdf8;
		font-size: 1.15rem;
	}

	:global(html[data-theme="light"]) .calc-range-value {
		color: #0284c7;
	}

	.calc-select {
		width: 100%;
		padding: 12px 16px;
		border-radius: 10px;
		border: 1.5px solid var(--color-void-border);
		background-color: var(--color-surface-hover);
		font-size: 0.95rem;
		color: var(--color-bone-white);
		outline: none;
		cursor: pointer;
		transition: border-color 0.2s;
	}

	:global(html[data-theme="light"]) .calc-select {
		border-color: #cbd5e1;
		background-color: #f8fafc;
		color: #0f172a;
	}

	.calc-select:focus {
		border-color: #38bdf8;
	}

	:global(html[data-theme="light"]) .calc-select:focus {
		border-color: #0284c7;
		background-color: #ffffff;
	}

	.calc-radio-group {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 10px;
	}

	.radio-card {
		display: flex;
		align-items: center;
		padding: 10px 14px;
		border: 1.5px solid var(--color-void-border);
		border-radius: 10px;
		cursor: pointer;
		background: var(--color-surface);
		transition: all 0.2s;
		color: var(--color-silver-mist);
	}

	:global(html[data-theme="light"]) .radio-card {
		border-color: #e2e8f0;
		background: #f8fafc;
		color: #334155;
	}

	.radio-card:hover {
		border-color: #38bdf8;
	}

	:global(html[data-theme="light"]) .radio-card:hover {
		border-color: #94a3b8;
	}

	.radio-card input {
		margin-right: 10px;
		accent-color: #0284c7;
	}

	.radio-card.checked {
		border-color: #0284c7;
		background: rgba(2, 132, 199, 0.15);
		color: var(--color-bone-white);
	}

	:global(html[data-theme="light"]) .radio-card.checked {
		background: #e0f2fe;
		color: #0f172a;
	}

	.calc-range {
		width: 100%;
		accent-color: #0284c7;
		cursor: pointer;
	}

	.calc-range-scale {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		color: var(--color-ash-gray);
		margin-top: 4px;
	}

	:global(html[data-theme="light"]) .calc-range-scale {
		color: #94a3b8;
	}

	.calc-checkbox-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.9rem;
		color: var(--color-silver-mist);
		cursor: pointer;
	}

	:global(html[data-theme="light"]) .checkbox-item {
		color: #334155;
	}

	.checkbox-item input {
		width: 18px;
		height: 18px;
		accent-color: #0284c7;
	}

	.checkbox-item strong {
		color: #38bdf8;
		font-size: 0.82rem;
		margin-left: 0.3rem;
	}

	:global(html[data-theme="light"]) .checkbox-item strong {
		color: #0284c7;
	}

	/* Права колонка з сумою */
	.calc-summary {
		background: var(--color-surface-hover);
		border-radius: 16px;
		padding: 28px;
		border: 1px solid var(--color-void-border);
	}

	:global(html[data-theme="light"]) .calc-summary {
		background: #f1f5f9;
		border-color: #e2e8f0;
	}

	.summary-caption {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-ash-gray);
		font-weight: 700;
	}

	:global(html[data-theme="light"]) .summary-caption {
		color: #64748b;
	}

	.summary-price {
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin: 8px 0 20px 0;
	}

	.price-from {
		font-size: 1.3rem;
		color: var(--color-ash-gray);
	}

	:global(html[data-theme="light"]) .price-from {
		color: #64748b;
	}

	.price-val {
		font-size: 3rem;
		font-weight: 900;
		color: #38bdf8;
		line-height: 1;
	}

	:global(html[data-theme="light"]) .price-val {
		color: #0284c7;
	}

	.price-currency {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--color-bone-white);
	}

	:global(html[data-theme="light"]) .price-currency {
		color: #0f172a;
	}

	.summary-list {
		list-style: none;
		padding: 0;
		margin: 0 0 24px 0;
		border-top: 1px solid var(--color-void-border);
		border-bottom: 1px solid var(--color-void-border);
		padding: 16px 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-size: 0.88rem;
	}

	:global(html[data-theme="light"]) .summary-list {
		border-color: #e2e8f0;
	}

	.summary-list li {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		color: var(--color-silver-mist);
	}

	:global(html[data-theme="light"]) .summary-list li {
		color: #334155;
	}

	.summary-list strong {
		color: var(--color-bone-white);
		text-align: right;
	}

	:global(html[data-theme="light"]) .summary-list strong {
		color: #0f172a;
	}

	.summary-cta {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.btn-calc-submit {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		background: #0284c7;
		color: #ffffff;
		font-weight: 700;
		padding: 14px;
		border-radius: 10px;
		text-decoration: none;
		transition: background 0.2s;
		font-size: 1rem;
	}

	.btn-calc-submit:hover {
		background: #0369a1;
	}

	.btn-calc-tg {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		text-align: center;
		background: rgba(255, 255, 255, 0.05);
		color: #38bdf8;
		border: 1px solid var(--color-void-border);
		font-weight: 600;
		font-size: 0.9rem;
		padding: 11px;
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.2s;
	}

	:global(html[data-theme="light"]) .btn-calc-tg {
		background: #ffffff;
		color: #0284c7;
		border-color: #cbd5e1;
	}

	.btn-calc-tg:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	:global(html[data-theme="light"]) .btn-calc-tg:hover {
		background: #e2e8f0;
	}

	.calc-lead-section {
		margin-top: 16px;
		padding-top: 16px;
		border-top: 1px dashed var(--color-void-border);
	}

	:global(html[data-theme="light"]) .calc-lead-section {
		border-color: #cbd5e1;
	}

	.lead-inputs {
		display: flex;
		gap: 8px;
	}

	.lead-input {
		flex: 1;
		padding: 10px 12px;
		border-radius: 8px;
		border: 1px solid var(--color-void-border);
		background: var(--color-surface);
		color: var(--color-bone-white);
		font-size: 0.88rem;
		outline: none;
	}

	:global(html[data-theme="light"]) .lead-input {
		border-color: #cbd5e1;
		background: #ffffff;
		color: #0f172a;
	}

	.lead-btn {
		padding: 10px 14px;
		border-radius: 8px;
		border: none;
		background: #0284c7;
		color: #ffffff;
		font-weight: 700;
		font-size: 0.85rem;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.2s;
	}

	.lead-btn:hover {
		background: #0369a1;
	}

	.lead-success-badge {
		background: rgba(16, 185, 129, 0.15);
		border: 1px solid #10b981;
		color: #34d399;
		padding: 10px;
		border-radius: 8px;
		font-size: 0.85rem;
		text-align: center;
	}

	.summary-note {
		margin: 16px 0 0 0;
		font-size: 0.75rem;
		color: var(--color-ash-gray);
		line-height: 1.4;
	}

	:global(html[data-theme="light"]) .summary-note {
		color: #94a3b8;
	}

	@media (max-width: 860px) {
		.calc-grid {
			grid-template-columns: 1fr;
		}
		.calc-card {
			padding: 24px;
		}
		.lead-inputs {
			flex-direction: column;
		}
	}
</style>
