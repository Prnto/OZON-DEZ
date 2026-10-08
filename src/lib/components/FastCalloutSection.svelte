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
			phonePlaceholder: '+38 (068) 261-53-50',
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
			phonePlaceholder: '+38 (068) 261-53-50',
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
		padding: 3.5rem 0;
		background: #ffffff;
	}

	.callout-card {
		border-radius: var(--radius-xl);
		padding: 3rem 3.5rem;
		background: linear-gradient(135deg, #040d1a 0%, #081a36 60%, #0d284f 100%);
		border: 1px solid rgba(0, 212, 170, 0.25);
		box-shadow: 0 20px 50px rgba(4, 13, 26, 0.4), 0 0 30px rgba(0, 212, 170, 0.15);
	}

	@media (max-width: 992px) {
		.callout-card {
			padding: 2.2rem 1.8rem;
		}
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
		font-size: 2.1rem;
		font-weight: 800;
		color: #ffffff;
		line-height: 1.22;
		margin: 0.8rem 0;
	}

	@media (max-width: 600px) {
		.callout-title {
			font-size: 1.6rem;
		}
	}

	.callout-sub {
		font-size: 1.02rem;
		color: #94a3b8;
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
		font-size: 0.92rem;
		font-weight: 600;
		color: #e0ecfd;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.direct-phone-block {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 1rem 1.4rem;
		border-radius: var(--radius-md);
		display: inline-flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.direct-lbl {
		font-size: 0.78rem;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.direct-link {
		font-size: 1.25rem;
		font-weight: 800;
		color: #00d4aa;
		font-family: var(--font-heading);
		transition: color var(--transition-fast);
	}

	.direct-link:hover {
		color: #ffffff;
	}

	/* Form */
	.callout-form {
		padding: 2.2rem 2rem;
		border-radius: var(--radius-lg);
		background: #ffffff;
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
	}

	.form-badge-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		background: rgba(0, 212, 170, 0.12);
		color: #00876c;
		font-size: 0.78rem;
		font-weight: 700;
		padding: 0.35rem 0.75rem;
		border-radius: var(--radius-full);
	}

	.live-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #00d4aa;
		box-shadow: 0 0 6px #00d4aa;
	}

	.form-input-group {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.f-lbl {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--primary-900);
	}

	.f-input {
		width: 100%;
		padding: 0.85rem 1rem;
		border-radius: var(--radius-sm);
		border: 1.5px solid var(--border-light);
		background: #ffffff;
		font-size: 16px;
		color: var(--text-title);
		outline: none;
		min-height: 48px;
		transition: border-color var(--transition-fast);
	}

	.f-input:focus {
		border-color: var(--primary-700);
		box-shadow: 0 0 0 3px rgba(22, 66, 130, 0.12);
	}

	.form-security-note {
		font-size: 0.72rem;
		color: var(--text-muted);
		text-align: center;
		line-height: 1.4;
	}

	/* Success */
	.callout-success-box {
		padding: 2.5rem 2rem;
		text-align: center;
		background: #ffffff;
		border-radius: var(--radius-lg);
	}

	.success-badge-icon {
		width: 54px;
		height: 54px;
		border-radius: 50%;
		background: linear-gradient(135deg, #00d4aa 0%, #00b4d8 100%);
		color: #042436;
		font-size: 1.8rem;
		font-weight: 900;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem;
	}

	.callout-success-box h3 {
		font-size: 1.4rem;
		color: var(--primary-950);
		margin-bottom: 0.5rem;
	}

	.callout-success-box p {
		font-size: 0.92rem;
		color: var(--text-muted);
		line-height: 1.5;
	}
</style>
