<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { sendTelegramLead } from '../services/telegram';

	let currentContent = $derived(contentMap[langState.current]);
	let calcData = $derived(currentContent.calculator);

	let selectedObject = $state('apartment');
	let selectedService = $state('disinsection');
	let area = $state(60);
	let selectedExtras = $state<string[]>(['barrier']);

	// Form state
	let clientName = $state('');
	let clientPhone = $state('');
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	// Calculation logic
	let calculatedPrice = $derived.by(() => {
		const obj = calcData.objectTypes.find((o) => o.id === selectedObject) || calcData.objectTypes[0];
		const srv = calcData.serviceTypes.find((s) => s.id === selectedService) || calcData.serviceTypes[0];

		// Base area cost with logarithmic scaling for large areas
		let effectiveRate = srv.baseRate;
		if (area > 100) effectiveRate *= 0.9;
		if (area > 300) effectiveRate *= 0.8;
		if (area > 1000) effectiveRate *= 0.65;

		let rawPrice = area * effectiveRate * obj.multiplier;

		// Add extras
		let extrasSum = 0;
		for (const extraId of selectedExtras) {
			const ext = calcData.extras.find((e) => e.id === extraId);
			if (ext) extrasSum += ext.price;
		}

		let total = Math.round(rawPrice + extrasSum);
		return Math.max(850, total);
	});

	function toggleExtra(id: string) {
		if (selectedExtras.includes(id)) {
			selectedExtras = selectedExtras.filter((e) => e !== id);
		} else {
			selectedExtras = [...selectedExtras, id];
		}
	}

	async function handleSubmitOrder(e: Event) {
		e.preventDefault();
		if (!clientPhone.trim() || isSubmitting) return;

		isSubmitting = true;
		try {
			const currentObj = calcData.objectTypes.find((o) => o.id === selectedObject);
			const currentSrv = calcData.serviceTypes.find((s) => s.id === selectedService);
			const extrasNames = selectedExtras
				.map((id) => calcData.extras.find((e) => e.id === id)?.name)
				.filter(Boolean)
				.join(', ');

			await sendTelegramLead({
				source: 'Онлайн-калькулятор вартості',
				name: clientName,
				phone: clientPhone,
				serviceTitle: currentSrv?.name,
				objectType: currentObj?.name,
				area: `${area} м²`,
				price: `${calculatedPrice} грн`,
				extras: extrasNames || 'Не обрано',
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

<section id="calculator" class="section calc-section">
	<div class="container">
		<div class="section-header">
			<div class="section-badge">
				{#if langState.current === 'ua'}Прозорий розрахунок{:else}Прозрачный расчет{/if}
			</div>
			<h2 class="section-title">{calcData.title}</h2>
			<p class="section-subtitle">{calcData.subtitle}</p>
		</div>

		<div class="calc-grid">
			<!-- Calculator Controls -->
			<div class="calc-card glass-card">
				<!-- Step 1: Object Type -->
				<div class="step-group">
					<div class="step-title">
						<span class="step-num">1</span>
						<span>{calcData.step1}</span>
					</div>
					<div class="obj-buttons-grid">
						{#each calcData.objectTypes as obj}
							<button
								type="button"
								class="obj-btn"
								class:active={selectedObject === obj.id}
								onclick={() => (selectedObject = obj.id)}
							>
								<span class="obj-icon">
									{#if obj.id === 'apartment'}🏢
									{:else if obj.id === 'house'}🏡
									{:else if obj.id === 'office'}💼
									{:else if obj.id === 'horeca'}🍽️
									{:else if obj.id === 'warehouse'}🏭
									{:else}⚙️{/if}
								</span>
								<span class="obj-name">{obj.name}</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- Step 2: Service Type -->
				<div class="step-group">
					<div class="step-title">
						<span class="step-num">2</span>
						<span>{calcData.step2}</span>
					</div>
					<div class="srv-buttons-grid">
						{#each calcData.serviceTypes as srv}
							<button
								type="button"
								class="srv-btn"
								class:active={selectedService === srv.id}
								onclick={() => (selectedService = srv.id)}
							>
								<span class="srv-icon">
									{#if srv.id === 'disinsection'}🪳
									{:else if srv.id === 'ozonation'}💨
									{:else if srv.id === 'disinfection'}🧪
									{:else if srv.id === 'mold'}🍄
									{:else if srv.id === 'deratization'}🐀
									{:else}🌾{/if}
								</span>
								<span class="srv-name">{srv.name}</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- Step 3: Area Slider -->
				<div class="step-group">
					<div class="area-header-row">
						<label class="step-title" for="area-input">
							<span class="step-num">3</span>
							<span>{calcData.step3}</span>
						</label>
						<div class="area-val-badge">
							<input
								id="area-input"
								type="number"
								min="15"
								max="2000"
								bind:value={area}
								class="area-num-input"
							/>
							<span>м²</span>
						</div>
					</div>

					<input
						type="range"
						min="15"
						max="1000"
						step="5"
						bind:value={area}
						class="calc-range-slider"
					/>

					<div class="quick-area-chips">
						{#each [35, 55, 80, 150, 300, 600] as preset}
							<button
								type="button"
								class="preset-chip"
								class:active={area === preset}
								onclick={() => (area = preset)}
							>
								{preset} м²
							</button>
						{/each}
					</div>
				</div>

				<!-- Step 4: Extras -->
				<div class="step-group">
					<div class="step-title">
						<span class="step-num">4</span>
						<span>{calcData.step4}</span>
					</div>
					<div class="extras-list">
						{#each calcData.extras as extra}
							<button
								type="button"
								class="extra-item"
								class:active={selectedExtras.includes(extra.id)}
								onclick={() => toggleExtra(extra.id)}
							>
								<div class="extra-check">
									{#if selectedExtras.includes(extra.id)}✓{/if}
								</div>
								<span class="extra-name">{extra.name}</span>
								<span class="extra-price">+{extra.price} грн</span>
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Price Result & Fast Order Form Card -->
			<div class="calc-result-card glass-card-dark">
				<div class="result-top">
					<div class="result-badge">{calcData.estimateBadge}</div>
					<div class="price-showcase">
						<div class="price-title">{calcData.estimateTitle}</div>
						<div class="price-big">
							<span class="price-amount">{calculatedPrice}</span>
							<span class="price-currency">грн</span>
						</div>
						<div class="price-note">{calcData.estimateNote}</div>
					</div>

					<div class="calc-summary-list">
						<div class="sum-row">
							<span>{calcData.labels.object}</span>
							<strong>
								{calcData.objectTypes.find((o) => o.id === selectedObject)?.name}
							</strong>
						</div>
						<div class="sum-row">
							<span>{calcData.labels.service}</span>
							<strong>
								{calcData.serviceTypes.find((s) => s.id === selectedService)?.name.split('(')[0]}
							</strong>
						</div>
						<div class="sum-row">
							<span>{calcData.labels.area}</span>
							<strong>{area} м²</strong>
						</div>
					</div>
				</div>

				<!-- Fast Lead Capture -->
				<div class="calc-form-box">
					{#if isSuccess}
						<div class="success-message">
							<div class="success-icon">🎉</div>
							<h4>{calcData.form.successTitle}</h4>
							<p>{calcData.form.successDesc} {calculatedPrice} грн.</p>
							<a href="tel:{currentContent.phones.mobile}" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">
								📞 {calcData.form.callNow} {currentContent.phones.mobileDisplay}
							</a>
						</div>
					{:else}
						<form onsubmit={handleSubmitOrder} class="lead-form">
							<div class="form-title">{calcData.form.title}</div>
							<div class="form-inputs">
								<input
									type="text"
									placeholder={calcData.form.namePlaceholder}
									bind:value={clientName}
									class="calc-input"
								/>
								<input
									type="tel"
									placeholder={calcData.form.phonePlaceholder}
									bind:value={clientPhone}
									required
									class="calc-input"
								/>
							</div>
							<button type="submit" class="btn btn-primary" style="width: 100%;" disabled={isSubmitting}>
								{#if isSubmitting}
									...
								{:else}
									{calcData.form.submitBtn} {calculatedPrice} грн
								{/if}
							</button>
							<div class="privacy-note">
								{calcData.form.privacy}
							</div>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.calc-section {
		background: transparent;
	}

	.calc-grid {
		display: grid;
		grid-template-columns: 1.25fr 0.85fr;
		gap: 2.2rem;
		align-items: start;
	}

	@media (max-width: 960px) {
		.calc-grid {
			grid-template-columns: 1fr;
		}
	}

	.calc-card {
		padding: 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 2.2rem;
		background: var(--color-surface);
		border-radius: var(--radius-cards);
		border: 1px solid var(--color-void-border);
	}

	@media (max-width: 640px) {
		.calc-card {
			padding: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.calc-card {
			padding: 1.25rem 0.95rem;
		}
	}

	.step-group {
		display: flex;
		flex-direction: column;
		gap: 0.95rem;
	}

	.step-title {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-size: 1.05rem;
		font-weight: 400;
		color: var(--color-bone-white);
		letter-spacing: -0.02em;
	}

	.step-num {
		width: 26px;
		height: 26px;
		border-radius: var(--radius-buttons);
		background: rgba(128, 82, 255, 0.15);
		border: 1px solid var(--color-iris-border);
		color: #bfa6ff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	/* Objects buttons */
	.obj-buttons-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	@media (max-width: 600px) {
		.obj-buttons-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 380px) {
		.obj-buttons-grid {
			grid-template-columns: 1fr;
		}
	}

	.obj-btn {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.85rem 1rem;
		border-radius: var(--radius-small);
		border: 1px solid var(--color-void-border);
		background: var(--color-surface);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
	}

	.obj-btn:hover {
		border-color: rgba(255, 255, 255, 0.2);
		background: var(--color-surface-hover);
	}

	.obj-btn.active {
		border-color: var(--color-electric-iris);
		background: rgba(128, 82, 255, 0.12);
	}

	.obj-icon {
		font-size: 1.25rem;
	}

	.obj-name {
		font-size: 0.86rem;
		font-weight: 400;
		color: var(--color-bone-white);
	}

	/* Service Buttons */
	.srv-buttons-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
	}

	@media (max-width: 600px) {
		.srv-buttons-grid {
			grid-template-columns: 1fr;
		}
	}

	.srv-btn {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.85rem 1.1rem;
		border-radius: var(--radius-small);
		border: 1px solid var(--color-void-border);
		background: var(--color-surface);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
	}

	.srv-btn:hover {
		border-color: rgba(255, 255, 255, 0.2);
		background: var(--color-surface-hover);
	}

	.srv-btn.active {
		border-color: var(--color-electric-iris);
		background: rgba(128, 82, 255, 0.12);
	}

	.srv-icon {
		font-size: 1.3rem;
	}

	.srv-name {
		font-size: 0.88rem;
		font-weight: 400;
		color: var(--color-bone-white);
	}

	/* Slider */
	.area-header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.area-val-badge {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		background: var(--color-surface-hover);
		border: 1px solid var(--color-void-border);
		padding: 0.35rem 0.85rem;
		border-radius: var(--radius-buttons);
		font-weight: 500;
		color: var(--color-bone-white);
	}

	.area-num-input {
		width: 65px;
		background: transparent;
		border: none;
		font-weight: 600;
		font-size: 1.1rem;
		color: var(--color-bone-white);
		text-align: right;
		outline: none;
	}

	.calc-range-slider {
		width: 100%;
		height: 6px;
		border-radius: 3px;
		background: var(--color-surface-hover);
		outline: none;
		-webkit-appearance: none;
		appearance: none;
		accent-color: var(--color-electric-iris);
	}

	.calc-range-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--color-electric-iris);
		cursor: pointer;
		border: 2px solid #ffffff;
	}

	.quick-area-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.preset-chip {
		padding: 0.4rem 0.85rem;
		border-radius: var(--radius-buttons);
		border: 1px solid var(--color-void-border);
		background: #0d0d0d;
		font-size: 0.82rem;
		font-weight: 400;
		color: var(--color-silver-mist);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.preset-chip.active, .preset-chip:hover {
		background: var(--color-electric-iris);
		color: #ffffff;
		border-color: var(--color-electric-iris);
	}

	/* Extras */
	.extras-list {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.extra-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.85rem 1.1rem;
		border-radius: var(--radius-small);
		border: 1px solid var(--color-void-border);
		background: #0d0d0d;
		cursor: pointer;
		text-align: left;
		transition: all var(--transition-fast);
	}

	.extra-item.active {
		border-color: var(--color-electric-iris);
		background: rgba(128, 82, 255, 0.08);
	}

	.extra-check {
		width: 20px;
		height: 20px;
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.85rem;
		color: #ffffff;
		background: var(--color-surface);
	}

	.extra-item.active .extra-check {
		background: var(--color-electric-iris);
		border-color: var(--color-electric-iris);
		color: #ffffff;
	}

	.extra-name {
		font-size: 0.86rem;
		font-weight: 400;
		color: var(--color-bone-white);
		flex: 1;
	}

	.extra-price {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-saffron-spark);
	}

	/* Result Card */
	.calc-result-card {
		padding: 2.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: sticky;
		top: 6rem;
		background: var(--color-surface);
		border-radius: var(--radius-cards);
		border: 1px solid var(--color-void-border);
	}

	@media (max-width: 640px) {
		.calc-result-card {
			padding: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.calc-result-card {
			padding: 1.25rem 0.95rem;
		}
	}

	.result-badge {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-saffron-spark);
		margin-bottom: 0.6rem;
	}

	.price-showcase {
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-void-border);
		margin-bottom: 1.5rem;
	}

	.price-title {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		margin-bottom: 0.4rem;
	}

	.price-big {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		font-family: var(--font-heading);
	}

	.price-amount {
		font-size: clamp(2.5rem, 6vw, 3.8rem);
		font-weight: 400;
		color: var(--color-bone-white);
		line-height: 1;
		letter-spacing: -0.04em;
	}

	.price-currency {
		font-size: 1.5rem;
		font-weight: 500;
		color: var(--color-saffron-spark);
	}

	.price-note {
		margin-top: 0.6rem;
		font-size: 0.75rem;
		color: var(--color-ash-gray);
		line-height: 1.4;
	}

	.calc-summary-list {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-bottom: 2rem;
	}

	.sum-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.86rem;
		color: var(--color-ash-gray);
	}

	.sum-row strong {
		color: var(--color-bone-white);
		font-weight: 400;
	}

	.calc-form-box {
		background: var(--color-surface-hover);
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-small);
		padding: 1.4rem;
	}

	:global(html[data-theme="light"]) .calc-form-box {
		background: #f8fafc;
		border-color: rgba(15, 23, 42, 0.08);
	}

	:global(html[data-theme="light"]) .obj-btn:hover,
	:global(html[data-theme="light"]) .srv-btn:hover {
		border-color: rgba(15, 23, 42, 0.25);
		background: #f1f5f9;
	}

	:global(html[data-theme="light"]) .calc-result-card {
		box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.08);
	}

	.form-title {
		font-size: 0.88rem;
		font-weight: 400;
		color: var(--color-bone-white);
		margin-bottom: 1rem;
		text-align: center;
	}

	.form-inputs {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.calc-input {
		width: 100%;
		padding: 0.85rem 1.1rem;
		border-radius: var(--radius-small);
		border: 1px solid var(--color-void-border);
		background: var(--color-surface);
		color: var(--color-bone-white);
		font-size: 16px;
		outline: none;
		transition: border-color var(--transition-fast);
	}

	.calc-input::placeholder {
		color: var(--color-ash-gray);
	}

	.calc-input:focus {
		border-color: var(--color-electric-iris);
		background: var(--color-surface-hover);
	}

	.privacy-note {
		font-size: 0.72rem;
		color: var(--color-ash-gray);
		text-align: center;
		margin-top: 0.75rem;
	}

	.success-message {
		text-align: center;
		padding: 1rem 0;
	}

	.success-icon {
		font-size: 2.2rem;
		margin-bottom: 0.5rem;
	}

	.success-message h4 {
		font-size: 1.2rem;
		color: var(--color-bone-white);
		margin-bottom: 0.4rem;
		font-weight: 400;
	}

	.success-message p {
		font-size: 0.86rem;
		color: var(--color-silver-mist);
		line-height: 1.45;
	}
</style>
