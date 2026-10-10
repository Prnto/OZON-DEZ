<script lang="ts">
	import { Buildings, MapPin, Scales, PhoneCall, Clock, Lightning, CheckCircle, PaperPlaneRight, ShieldCheck, TelegramLogo, InstagramLogo } from 'phosphor-svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { sendTelegramLead } from '../services/telegram';

	let currentContent = $derived(contentMap[langState.current]);
	let contacts = $derived(currentContent.contacts);

	let formName = $state('');
	let formPhone = $state('');
	let formService = $state('disinsection');
	let formComment = $state('');
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	async function handleContactSubmit(e: Event) {
		e.preventDefault();
		if (!formPhone.trim() || isSubmitting) return;

		isSubmitting = true;
		try {
			await sendTelegramLead({
				source: 'Форма розділу Контакти',
				name: formName,
				phone: formPhone,
				serviceTitle: formService,
				comment: formComment,
				lang: langState.current
			});
		} catch (err) {
			console.error('Error submitting contact form:', err);
		} finally {
			isSubmitting = false;
			isSuccess = true;
		}
	}
</script>

<section id="contacts" class="section contacts-section">
	<div class="container">
		<div class="contacts-grid">
			<!-- Contact Information Cards -->
			<div class="contacts-info-column">
				<div class="info-card glass-card">
					<div class="info-card-header">
						<div class="header-icon"><Buildings size={24} weight="duotone" /></div>
						<div>
							<h3 class="info-company-name">{currentContent.companyName}</h3>
							<div class="info-company-sub">{currentContent.companyNameAlt}</div>
						</div>
					</div>

					<div class="details-list">
						<!-- Unified Address -->
						{#if currentContent.address.actual === currentContent.address.legal}
							<div class="detail-row">
								<div class="detail-icon"><MapPin size={20} weight="duotone" /></div>
								<div>
									<span class="detail-label">
										{#if langState.current === 'ua'}
											Офіс та юридична адреса:
										{:else if langState.current === 'ru'}
											Офис и юридический адрес:
										{:else}
											Office & Legal Address:
										{/if}
									</span>
									<div class="detail-val">{currentContent.address.actual}</div>
								</div>
							</div>
						{:else}
							<div class="detail-row">
								<div class="detail-icon"><MapPin size={20} weight="duotone" /></div>
								<div>
									<span class="detail-label">{contacts.labels.actual}</span>
									<div class="detail-val">{currentContent.address.actual}</div>
								</div>
							</div>
							<div class="detail-row">
								<div class="detail-icon"><Scales size={20} weight="duotone" /></div>
								<div>
									<span class="detail-label">{contacts.labels.legal}</span>
									<div class="detail-val">{currentContent.address.legal}</div>
								</div>
							</div>
						{/if}

						<!-- Phones -->
						<div class="detail-row">
							<div class="detail-icon"><PhoneCall size={20} weight="duotone" /></div>
							<div>
								<span class="detail-label">{contacts.labels.phones}</span>
								<div class="phone-links">
									<a href="tel:{currentContent.phones.mobile}" class="contact-phone-link">
										<strong>{currentContent.phones.mobileDisplay}</strong>
										<span class="phone-badge">{contacts.labels.mobileBadge}</span>
									</a>
									<a href="tel:{currentContent.phones.landline}" class="contact-phone-link secondary">
										<span>{currentContent.phones.landlineDisplay}</span>
										<span class="phone-badge-sec">{contacts.labels.cityBadge}</span>
									</a>
								</div>
							</div>
						</div>

						<!-- Schedule -->
						<div class="detail-row">
							<div class="detail-icon"><Clock size={20} weight="duotone" /></div>
							<div>
								<span class="detail-label">{contacts.labels.schedule}</span>
								<div class="detail-val">
									<strong>{currentContent.workingHours.days}:</strong> {currentContent.workingHours.hours}
								</div>
								<div class="schedule-status-sub">
									<Lightning size={14} weight="fill" />
									<span>
										{#if langState.current === 'ua'}
											Виїзди чергових бригад — за домовленістю
										{:else if langState.current === 'ru'}
											Выезды дежурных бригад — по договорённости
										{:else}
											Specialist team visits by appointment
										{/if}
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Messengers Quick Links -->
					<div class="messengers-row">
						<span class="mess-title">{contacts.labels.messengers}</span>
						<div class="mess-buttons">
							<a
								href="viber://chat?number=%2B380636672653"
								class="mess-circle-btn mess-viber"
								target="_blank"
								rel="noreferrer"
								aria-label="Viber"
								title="Viber: +38 (063) 667-26-53"
							>
								<svg class="mess-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
									<path d="M19.78 3.23C17.65 1.51 14.89.8 11.96.8c-.37 0-.74.02-1.11.05-5.36.46-9.61 4.7-10.07 10.06-.2 2.37.4 4.7 1.7 6.64L.94 21.6c-.34 1.13.72 2.19 1.85 1.85l4.05-1.54c1.64.91 3.5 1.39 5.41 1.39.29 0 .58-.01.87-.04 5.36-.46 9.61-4.7 10.07-10.06.53-6.17-3.41-9.97-3.41-9.97zm-1.84 13.9c-.33.91-1.74 1.72-2.58 1.84-.71.1-1.63.15-4.73-1.14-3.72-1.55-6.15-5.32-6.33-5.57-.19-.25-1.5-2-1.5-3.81 0-1.82.95-2.72 1.29-3.08.34-.37.75-.46 1-.46.25 0 .5.01.71.02.23.01.53-.09.83.63.31.75 1.05 2.58 1.15 2.77.09.19.16.42.03.67-.12.26-.19.42-.37.64-.19.21-.4.47-.57.63-.19.19-.39.4-.17.78.22.37.99 1.63 2.12 2.64 1.45 1.3 2.68 1.7 3.06 1.89.38.18.6-.01.82-.24.23-.23.97-1.13 1.23-1.52.26-.38.52-.32.88-.19.36.13 2.27 1.07 2.66 1.26.39.2.65.29.74.45.1.18.1 1.05-.23 1.96z"/>
								</svg>
							</a>
							<a
								href="https://t.me/OZON_DEZ_bot"
								class="mess-circle-btn mess-tg"
								target="_blank"
								rel="noreferrer"
								aria-label="Telegram"
								title="Telegram: @OZON_DEZ_bot"
							>
								<TelegramLogo size={22} weight="fill" />
							</a>
							<button
								type="button"
								class="mess-circle-btn mess-insta"
								aria-label="Instagram"
								title={langState.current === 'ua' ? 'Офіційний Instagram (незабаром)' : langState.current === 'ru' ? 'Официальный Instagram (скоро)' : 'Official Instagram (coming soon)'}
								onclick={() => alert(langState.current === 'ua' ? 'Офіційна Instagram-сторінка ТОВ «ОЗОН-ДЕЗ» у процесі оформлення та незабаром буде доступна!' : langState.current === 'ru' ? 'Официальная Instagram-страница ООО «ОЗОН-ДЕЗ» в процессе оформления и скоро будет доступна!' : 'Official Instagram page of LLC "OZON-DEZ" is coming soon!')}
							>
								<InstagramLogo size={22} weight="fill" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Direct Request Form -->
			<div class="contacts-form-column">
				<div class="form-card glass-card">
					<div class="form-card-header">
						<h3 class="form-title">{contacts.formTitle}</h3>
						<p class="form-subtitle">{contacts.formSubtitle}</p>
					</div>

					{#if isSuccess}
						<div class="contact-success-state" data-testid="contact-success-message">
							<div class="success-check-icon"><CheckCircle size={36} weight="fill" /></div>
							<h3>{contacts.form.successTitle}</h3>
							<p>{contacts.form.successDesc}</p>
							<button
								type="button"
								class="btn btn-primary"
								data-testid="contact-again-btn"
								onclick={() => {
									isSuccess = false;
									formPhone = '';
									formComment = '';
								}}
							>
								{contacts.form.againBtn}
							</button>
						</div>
					{:else}
						<form onsubmit={handleContactSubmit} class="contact-main-form" data-testid="contact-form">
							<div class="input-field">
								<label for="c-name" class="input-lbl">{contacts.form.nameLbl}</label>
								<input
									id="c-name"
									type="text"
									placeholder={contacts.form.namePlaceholder}
									bind:value={formName}
									class="styled-input"
									data-testid="contact-name-input"
								/>
							</div>

							<div class="input-field">
								<label for="c-phone" class="input-lbl">{contacts.form.phoneLbl}</label>
								<input
									id="c-phone"
									type="tel"
									placeholder="+38 (063) 667-26-53"
									bind:value={formPhone}
									required
									class="styled-input"
									data-testid="contact-phone-input"
								/>
							</div>

							<div class="input-field">
								<label for="c-service" class="input-lbl">{contacts.form.serviceLbl}</label>
								<select id="c-service" bind:value={formService} class="styled-input styled-select" data-testid="contact-service-select">
									{#each currentContent.categories as cat}
										<optgroup label={cat.title}>
											{#each cat.services as srv}
												<option value={srv.title}>{srv.title} ({srv.priceFrom})</option>
											{/each}
										</optgroup>
									{/each}
									<option value="HACCP B2B">
										{#if langState.current === 'ua'}Договір для бізнесу (HACCP){:else if langState.current === 'ru'}Договор для бизнеса (HACCP){:else}Business contract (HACCP){/if}
									</option>
								</select>
							</div>

							<div class="input-field">
								<label for="c-comment" class="input-lbl">{contacts.form.commentLbl}</label>
								<textarea
									id="c-comment"
									rows="3"
									placeholder={contacts.form.commentPlaceholder}
									bind:value={formComment}
									class="styled-input styled-textarea"
									data-testid="contact-comment-textarea"
								></textarea>
							</div>

							<button type="submit" class="btn btn-primary btn-lg" style="width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;" disabled={isSubmitting} data-testid="contact-submit-btn">
								{#if isSubmitting}
									...
								{:else}
									<PaperPlaneRight size={18} weight="bold" />
									<span>{contacts.form.submitBtn}</span>
								{/if}
							</button>

							<div class="form-disclaimer">
								<ShieldCheck size={14} weight="bold" style="flex-shrink: 0;" />
								<span>{contacts.form.disclaimer}</span>
							</div>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.contacts-section {
		background: transparent;
		padding: clamp(2rem, 4vh, 3.5rem) 0 clamp(4rem, 7vh, 5.5rem);
	}

	.contacts-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: stretch;
	}

	@media (max-width: 960px) {
		.contacts-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	.contacts-info-column {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.contacts-form-column {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.info-card {
		padding: 2.5rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	@media (max-width: 480px) {
		.info-card {
			padding: 1.5rem 1.25rem;
		}
	}

	.info-card-header {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		padding-bottom: 1.4rem;
		border-bottom: 1px solid var(--border-subtle);
		margin-bottom: 1.6rem;
	}

	.header-icon {
		font-size: 2rem;
		color: var(--color-electric-iris);
	}

	.info-company-name {
		font-size: 1.4rem;
		font-weight: 400;
		letter-spacing: -0.03em;
		color: var(--color-bone-white);
	}

	.info-company-sub {
		font-size: 0.85rem;
		color: var(--color-ash-gray);
		font-weight: 300;
	}

	.details-list {
		display: flex;
		flex-direction: column;
		gap: 1.3rem;
		flex: 1;
	}

	.detail-row {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.detail-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
		margin-top: 2px;
		color: var(--color-electric-iris);
	}

	.detail-label {
		font-size: 0.75rem;
		color: var(--color-saffron-spark);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		display: block;
		margin-bottom: 0.25rem;
	}

	.detail-val {
		font-size: 0.95rem;
		font-weight: 300;
		color: var(--color-bone-white);
		line-height: 1.5;
	}

	.phone-links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.3rem;
	}

	.contact-phone-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.15rem;
		font-weight: 500;
		color: var(--color-bone-white);
		font-family: var(--font-heading);
		text-decoration: none;
		letter-spacing: -0.02em;
		transition: color var(--transition-fast);
	}

	.contact-phone-link:hover {
		color: var(--color-electric-iris);
	}

	.contact-phone-link.secondary {
		font-size: 0.95rem;
		color: var(--color-ash-gray);
	}

	.phone-badge {
		font-size: 0.7rem;
		background: rgba(128, 82, 255, 0.15);
		color: var(--color-electric-iris);
		border: 1px solid rgba(128, 82, 255, 0.3);
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-pill);
		font-weight: 600;
		font-family: var(--font-body);
	}

	.phone-badge-sec {
		font-size: 0.7rem;
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-ash-gray);
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-pill);
		font-weight: 500;
		font-family: var(--font-body);
	}

	.schedule-status-sub {
		margin-top: 0.35rem;
		font-size: 0.8rem;
		font-weight: 400;
		color: var(--color-saffron-spark);
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.messengers-row {
		margin-top: 1.8rem;
		padding-top: 1.4rem;
		border-top: 1px solid var(--border-subtle);
	}

	.mess-title {
		display: block;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-silver-mist);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-bottom: 0.75rem;
	}

	.mess-buttons {
		display: flex;
		align-items: center;
		gap: 0.95rem;
		flex-wrap: wrap;
	}

	.mess-circle-btn {
		width: 48px;
		height: 48px;
		min-width: 48px;
		min-height: 48px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.2);
		cursor: pointer;
		transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, filter 0.22s ease;
		text-decoration: none;
		outline: none;
		padding: 0;
	}

	.mess-circle-btn:hover {
		transform: translateY(-3px) scale(1.08);
	}

	.mess-circle-btn:active {
		transform: translateY(0) scale(0.95);
	}

	/* Authentic brand colors */
	.mess-viber {
		background: linear-gradient(135deg, #7b69f8 0%, #6350e4 100%);
		box-shadow: 0 4px 14px rgba(115, 96, 242, 0.45);
	}

	.mess-viber:hover {
		box-shadow: 0 8px 24px rgba(115, 96, 242, 0.7);
		filter: brightness(1.1);
	}

	.mess-tg {
		background: linear-gradient(135deg, #2cb4eb 0%, #1f94ce 100%);
		box-shadow: 0 4px 14px rgba(34, 158, 217, 0.45);
	}

	.mess-tg:hover {
		box-shadow: 0 8px 24px rgba(34, 158, 217, 0.7);
		filter: brightness(1.1);
	}

	.mess-insta {
		background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
		box-shadow: 0 4px 14px rgba(220, 39, 67, 0.45);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.mess-insta:hover {
		box-shadow: 0 8px 24px rgba(220, 39, 67, 0.7);
		filter: brightness(1.1);
	}

	.mess-icon {
		display: block;
		flex-shrink: 0;
	}

	/* Form Column */
	.form-card {
		padding: 2.5rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	@media (max-width: 640px) {
		.form-card {
			padding: 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.form-card {
			padding: 1.25rem 1rem;
		}
	}

	.form-card-header {
		margin-bottom: 1.4rem;
	}

	.form-title {
		font-size: 1.45rem;
		font-weight: 400;
		letter-spacing: -0.03em;
		color: var(--color-bone-white);
		margin-bottom: 0.35rem;
	}

	.form-subtitle {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.5;
	}

	.contact-main-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 1;
		justify-content: space-between;
	}

	.input-field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.input-lbl {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-silver-mist);
	}

	.styled-input {
		width: 100%;
		padding: 0.85rem 1rem;
		border-radius: 12px;
		border: 1px solid var(--border-subtle);
		background: var(--color-surface-hover);
		color: var(--color-bone-white);
		font-size: 15px;
		font-family: var(--font-body);
		outline: none;
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.styled-input::placeholder {
		color: var(--color-ash-gray);
		opacity: 0.55;
	}

	.styled-input:focus {
		border-color: var(--color-electric-iris);
		box-shadow: 0 0 0 3px rgba(128, 82, 255, 0.15);
	}

	.styled-select {
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 256 256' fill='%239e9ea7'%3E%3Cpath d='M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z'%3E%3C/path%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 1rem center;
		padding-right: 2.5rem;
	}

	.styled-textarea {
		min-height: 85px;
		max-height: 160px;
		resize: vertical;
		line-height: 1.5;
	}

	.form-disclaimer {
		font-size: 0.74rem;
		color: var(--color-ash-gray);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		margin-top: 0.5rem;
		font-weight: 300;
		line-height: 1.4;
		text-align: center;
	}

	.contact-success-state {
		text-align: center;
		padding: 2rem 1rem;
		margin: auto 0;
	}

	.success-check-icon {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: #0284c7;
		box-shadow: 0 4px 18px rgba(2, 132, 199, 0.4);
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.6rem;
		font-weight: 700;
		margin: 0 auto 1.2rem;
	}

	.contact-success-state h3 {
		font-size: 1.4rem;
		font-weight: 400;
		letter-spacing: -0.03em;
		color: var(--color-bone-white);
		margin-bottom: 0.5rem;
	}

	.contact-success-state p {
		font-size: 0.9rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.55;
		margin-bottom: 1.5rem;
	}
</style>
