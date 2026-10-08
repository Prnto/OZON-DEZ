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
		background: linear-gradient(180deg, #f8fafc 0%, #edf4fc 100%);
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
		padding: 2.4rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
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
		gap: 0.9rem;
	}

	.step-title {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--primary-900);
	}

	.step-num {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: linear-gradient(135deg, #00d4aa 0%, #00b4d8 100%);
		color: #042436;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.85rem;
		font-weight: 800;
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
		padding: 0.75rem 0.9rem;
		border-radius: var(--radius-md);
		border: 1.5px solid var(--border-light);
		background: #ffffff;
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
	}

	.obj-btn:hover {
		border-color: var(--primary-600);
		background: #f8fafc;
	}

	.obj-btn.active {
		border-color: var(--primary-800);
		background: #f0f7ff;
		box-shadow: 0 0 0 2px rgba(16, 46, 94, 0.15);
	}

	.obj-icon {
		font-size: 1.25rem;
	}

	.obj-name {
		font-size: 0.86rem;
		font-weight: 600;
		color: var(--text-title);
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
		padding: 0.8rem 1rem;
		border-radius: var(--radius-md);
		border: 1.5px solid var(--border-light);
		background: #ffffff;
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
	}

	.srv-btn:hover {
		border-color: var(--primary-600);
	}

	.srv-btn.active {
		border-color: var(--accent-teal-dark);
		background: #f0fdf9;
		box-shadow: 0 0 0 2px rgba(0, 212, 170, 0.2);
	}

	.srv-icon {
		font-size: 1.3rem;
	}

	.srv-name {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--text-title);
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
		background: #f1f5f9;
		padding: 0.3rem 0.75rem;
		border-radius: var(--radius-sm);
		font-weight: 700;
		color: var(--primary-900);
	}

	.area-num-input {
		width: 65px;
		background: transparent;
		border: none;
		font-weight: 800;
		font-size: 1.1rem;
		color: var(--primary-900);
		text-align: right;
		outline: none;
	}

	.calc-range-slider {
		width: 100%;
		height: 8px;
		border-radius: 4px;
		background: #e2e8f0;
		outline: none;
		-webkit-appearance: none;
		appearance: none;
		accent-color: #00d4aa;
	}

	.calc-range-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--accent-teal);
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		border: 2px solid #ffffff;
	}

	.quick-area-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.preset-chip {
		padding: 0.35rem 0.75rem;
		border-radius: var(--radius-full);
		border: 1px solid var(--border-light);
		background: #ffffff;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-muted);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.preset-chip.active, .preset-chip:hover {
		background: var(--primary-900);
		color: #ffffff;
		border-color: var(--primary-900);
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
		padding: 0.7rem 1rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-light);
		background: #ffffff;
		cursor: pointer;
		text-align: left;
		transition: all var(--transition-fast);
	}

	.extra-item.active {
		border-color: var(--accent-teal);
		background: #f0fdf9;
	}

	.extra-check {
		width: 20px;
		height: 20px;
		border-radius: 4px;
		border: 1.5px solid #cbd5e1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 800;
		font-size: 0.85rem;
		color: var(--accent-teal-dark);
		background: #ffffff;
	}

	.extra-item.active .extra-check {
		border-color: var(--accent-teal);
		background: var(--accent-teal);
		color: #ffffff;
	}

	.extra-name {
		font-size: 0.86rem;
		font-weight: 600;
		color: var(--text-title);
		flex: 1;
	}

	.extra-price {
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--primary-700);
	}

	/* Result Card */
	.calc-result-card {
		padding: 2.4rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: sticky;
		top: 6rem;
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
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--accent-teal);
		margin-bottom: 0.6rem;
	}

	.price-showcase {
		padding-bottom: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.12);
		margin-bottom: 1.5rem;
	}

	.price-title {
		font-size: 0.92rem;
		color: #cbd5e1;
		margin-bottom: 0.3rem;
	}

	.price-big {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		font-family: var(--font-heading);
	}

	.price-amount {
		font-size: clamp(2.3rem, 7vw, 3.2rem);
		font-weight: 800;
		color: #ffffff;
		line-height: 1;
		background: linear-gradient(135deg, #ffffff 0%, #00f5d4 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.price-currency {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--accent-teal);
	}

	.price-note {
		margin-top: 0.6rem;
		font-size: 0.75rem;
		color: #94a3b8;
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
		color: #cbd5e1;
	}

	.sum-row strong {
		color: #ffffff;
	}

	.calc-form-box {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		padding: 1.4rem;
	}

	.form-title {
		font-size: 0.88rem;
		font-weight: 700;
		color: #ffffff;
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
		padding: 0.75rem 1rem;
		border-radius: var(--radius-sm);
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.08);
		color: #ffffff;
		font-size: 16px;
		outline: none;
		transition: border-color var(--transition-fast);
	}

	.calc-input::placeholder {
		color: #94a3b8;
	}

	.calc-input:focus {
		border-color: var(--accent-teal);
		background: rgba(255, 255, 255, 0.12);
	}

	.privacy-note {
		font-size: 0.72rem;
		color: #94a3b8;
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
		color: #ffffff;
		margin-bottom: 0.4rem;
	}

	.success-message p {
		font-size: 0.86rem;
		color: #cbd5e1;
		line-height: 1.45;
	}
</style>
