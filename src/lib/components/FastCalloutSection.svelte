<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { sendTelegramLead } from '../services/telegram';

	let currentContent = $derived(contentMap[langState.current]);

	let phone = $state('');
	let address = $state('');
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	const calloutData = {
		ua: {
			badge: '⚡ Чергова служба 24/7',
			title: 'Потрібен терміновий виїзд спеціаліста сьогодні?',
			subtitle: 'Оперативна бригада по м. Чорноморськ, Одесі та прилеглих районах. Виїзд від 30 хвилин із повним комплектом сертифікованого обладнання.',
			phonePlaceholder: '+38 (063) 667-26-53',
			addressPlaceholder: 'Адреса (наприклад, Чорноморськ, Миру 8)',
			submitBtn: 'Викликати чергову бригаду',
			callDirectLabel: 'Або зателефонуйте черговому прямо зараз:',
			successTitle: 'Заявку прийнято!',
			successText: 'Черговий спеціаліст зв’яжеться з вами протягом 2-3 хвилин для узгодження часу прибуття.',
			againBtn: 'Надіслати інший номер',
			trustBullets: [
				'⏱️ Прибуття на об’єкт від 30 хв',
				'🛡️ Препарати 4-го класу безпеки (без запаху)',
				'📜 Договір та гарантійний талон на місці'
			]
		},
		ru: {
			badge: '⚡ Дежурная служба 24/7',
			title: 'Нужен срочный выезд специалиста сегодня?',
			subtitle: 'Оперативная бригада по г. Черноморск, Одессе и области. Выезд от 30 минут с полным комплектом сертифицированного оборудования.',
			phonePlaceholder: '+38 (063) 667-26-53',
			addressPlaceholder: 'Адрес (например, Черноморск, Мира 8)',
			submitBtn: 'Вызвать дежурную бригаду',
			callDirectLabel: 'Или позвоните дежурному прямо сейчас:',
			successTitle: 'Заявка принята!',
			successText: 'Дежурный специалист свяжется с вами в течение 2-3 минут для согласования времени прибытия.',
			againBtn: 'Отправить другой номер',
			trustBullets: [
				'⏱️ Прибытие на объект от 30 мин',
				'🛡️ Препараты 4-го класса безопасности (без запаха)',
				'📜 Договор и гарантийный талон на месте'
			]
		}
	};

	let data = $derived(calloutData[langState.current]);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!phone.trim() || isSubmitting) return;

		isSubmitting = true;
		try {
			await sendTelegramLead({
				source: 'Терміновий виклик чергової бригади 24/7 (Головна)',
				phone: phone,
				address: address || 'Не вказано (уточнить оператор)',
				serviceTitle: 'Екстрений виїзд фахівця',
				lang: langState.current
			});
		} catch (err) {
			console.error('Error in emergency dispatch:', err);
		} finally {
			isSubmitting = false;
			isSuccess = true;
		}
	}
</script>

<section class="section fast-callout-section">
	<div class="container">
		<div class="callout-card glass-card-dark">
			<div class="callout-grid">
				<div class="callout-text-column">
					<div class="section-badge dark">{data.badge}</div>
					<h2 class="callout-title">{data.title}</h2>
					<p class="callout-sub">{data.subtitle}</p>

					<div class="callout-bullets">
						{#each data.trustBullets as bullet}
							<div class="bullet-item">{bullet}</div>
						{/each}
					</div>

					<div class="direct-phone-block">
						<span class="direct-lbl">{data.callDirectLabel}</span>
						<a href="tel:{currentContent.phones.mobile}" class="direct-link">
							📞 {currentContent.phones.mobileDisplay}
						</a>
					</div>
				</div>

				<div class="callout-form-column">
					{#if isSuccess}
						<div class="callout-success-box glass-card">
							<div class="success-badge-icon">✓</div>
							<h3>{data.successTitle}</h3>
							<p>{data.successText}</p>
							<a href="tel:{currentContent.phones.mobile}" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">
								📞 {currentContent.phones.mobileDisplay}
							</a>
							<button
								type="button"
								class="btn btn-secondary btn-sm"
								style="margin-top: 1rem;"
								onclick={() => {
									isSuccess = false;
									phone = '';
									address = '';
								}}
							>
								{data.againBtn}
							</button>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="callout-form glass-card">
							<div class="form-badge-tag">
								<span class="live-dot"></span>
								<span>Вільна чергова бригада: Черноморськ</span>
							</div>

							<div class="form-input-group">
								<label for="fc-phone" class="f-lbl">Ваш номер телефону *</label>
								<input
									id="fc-phone"
									type="tel"
									placeholder={data.phonePlaceholder}
									bind:value={phone}
									required
									class="f-input"
								/>
							</div>

							<div class="form-input-group">
								<label for="fc-address" class="f-lbl">Місто або адреса виклику</label>
								<input
									id="fc-address"
									type="text"
									placeholder={data.addressPlaceholder}
									bind:value={address}
									class="f-input"
								/>
							</div>

							<button type="submit" class="btn btn-primary btn-lg" style="width: 100%;" disabled={isSubmitting}>
								{#if isSubmitting}
									...
								{:else}
									⚡ {data.submitBtn}
								{/if}
							</button>

							<div class="form-security-note">
								🔒 Конфіденційно. Без спаму. Виїзд на авто без спецсимволіки за бажанням.
							</div>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.fast-callout-section {
		padding: clamp(3rem, 6vw, 4.5rem) 0;
		background: transparent;
		border-top: 1px solid var(--color-void-border);
	}

	.callout-card {
		border-radius: var(--radius-cards);
		padding: clamp(2rem, 5vw, 3.5rem);
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		box-shadow: none;
	}

	.callout-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	@media (max-width: 860px) {
		.callout-grid {
			grid-template-columns: 1fr;
			gap: 2.2rem;
		}
	}

	.callout-title {
		font-size: clamp(2rem, 3.2vw, 2.7rem);
		font-weight: 400;
		color: var(--color-bone-white);
		letter-spacing: -0.035em;
		line-height: 1.15;
		margin: 0.8rem 0;
	}

	.callout-sub {
		font-size: 0.98rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.callout-bullets {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-bottom: 1.8rem;
	}

	.bullet-item {
		font-size: 0.88rem;
		font-weight: 400;
		color: var(--color-silver-mist);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.direct-phone-block {
		background: #040404;
		border: 1px solid var(--color-void-border);
		padding: 1rem 1.4rem;
		border-radius: var(--radius-small);
		display: inline-flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.direct-lbl {
		font-size: 0.74rem;
		color: var(--color-ash-gray);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.direct-link {
		font-size: 1.25rem;
		font-weight: 500;
		color: var(--color-saffron-spark);
		font-family: var(--font-heading);
		text-decoration: none;
		letter-spacing: -0.02em;
		transition: color var(--transition-fast);
	}

	.direct-link:hover {
		color: var(--color-bone-white);
	}

	/* Form */
	.callout-form {
		padding: 2.4rem 2rem;
		border-radius: var(--radius-cards);
		background: #040404;
		border: 1px solid var(--color-void-border);
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		box-shadow: none;
	}

	.form-badge-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		background: rgba(128, 82, 255, 0.1);
		color: #bfa6ff;
		border: 1px solid var(--color-iris-border);
		font-size: 0.76rem;
		font-weight: 500;
		padding: 0.3rem 0.75rem;
		border-radius: var(--radius-tags);
		align-self: flex-start;
	}

	.live-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-electric-iris);
	}

	.form-input-group {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.f-lbl {
		font-size: 0.82rem;
		font-weight: 400;
		color: var(--color-bone-white);
	}

	.f-input {
		width: 100%;
		padding: 0.85rem 1.1rem;
		border-radius: var(--radius-small);
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: #0d0d0d;
		font-size: 16px;
		color: var(--color-bone-white);
		outline: none;
		min-height: 44px;
		transition: border-color var(--transition-fast);
	}

	.f-input::placeholder {
		color: #666666;
	}

	.f-input:focus {
		border-color: var(--color-electric-iris);
	}

	.form-security-note {
		font-size: 0.72rem;
		color: var(--color-ash-gray);
		text-align: center;
		line-height: 1.4;
	}

	/* Success */
	.callout-success-box {
		padding: 2.2rem 1.8rem;
		text-align: center;
		background: #040404;
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-cards);
		box-shadow: none;
	}

	.success-badge-icon {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: var(--color-electric-iris);
		color: #ffffff;
		font-size: 1.6rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem;
	}

	.callout-success-box h3 {
		font-size: 1.35rem;
		font-weight: 400;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
	}

	.callout-success-box p {
		font-size: 0.9rem;
		color: var(--color-silver-mist);
		line-height: 1.5;
	}

	:global(html[data-theme="light"]) .f-input {
		background: #ffffff;
		border-color: rgba(15, 23, 42, 0.15);
		color: #0f172a;
	}

	:global(html[data-theme="light"]) .f-input::placeholder {
		color: #94a3b8;
	}

	:global(html[data-theme="light"]) .callout-success-box {
		background: #ffffff;
		border-color: rgba(15, 23, 42, 0.1);
	}

	:global(html[data-theme="light"]) .callout-card {
		box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.08);
	}
</style>
