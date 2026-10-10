<script lang="ts">
	import { Buildings, MapPin, Scales, PhoneCall, Clock, Lightning, CheckCircle, PaperPlaneRight, ShieldCheck } from 'phosphor-svelte';
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
									<path d="M17.94 17.13c-.33.91-1.74 1.72-2.58 1.84-.71.1-1.63.15-4.73-1.14-3.72-1.55-6.15-5.32-6.33-5.57-.19-.25-1.5-2-1.5-3.81 0-1.82.95-2.72 1.29-3.08.34-.37.75-.46 1-.46.25 0 .5.01.71.02.23.01.53-.09.83.63.31.75 1.05 2.58 1.15 2.77.09.19.16.42.03.67-.12.26-.19.42-.37.64-.19.21-.4.47-.57.63-.19.19-.39.4-.17.78.22.37.99 1.63 2.12 2.64 1.45 1.3 2.68 1.7 3.06 1.89.38.18.6-.01.82-.24.23-.23.97-1.13 1.23-1.52.26-.38.52-.32.88-.19.36.13 2.27 1.07 2.66 1.26.39.2.65.29.74.45.1.18.1 1.05-.23 1.96z"/>
									<path d="M12.7 5.8c2.1.2 3.8 1.9 4 4 .1.4-.2.7-.6.7s-.7-.2-.7-.6c-.2-1.3-1.3-2.4-2.6-2.6-.4-.1-.7-.4-.6-.8 0-.4.3-.7.7-.7zm-.3-2.6c3.6.3 6.4 3.1 6.7 6.7.1.4-.2.8-.6.8s-.8-.2-.8-.6c-.3-2.7-2.4-4.8-5.1-5.1-.4-.1-.7-.4-.6-.8 0-.4.4-.7.8-.8z"/>
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
								<svg class="mess-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
									<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.673c.458 0 .661-.21.916-.457l2.199-2.138 4.574 3.38c.843.464 1.448.225 1.658-.783l2.997-14.127c.307-1.232-.47-1.79-1.207-1.516z"/>
								</svg>
							</a>
							<button
								type="button"
								class="mess-circle-btn mess-insta"
								aria-label="Instagram"
								title={langState.current === 'ua' ? 'Офіційний Instagram (незабаром)' : langState.current === 'ru' ? 'Официальный Instagram (скоро)' : 'Official Instagram (coming soon)'}
								onclick={() => alert(langState.current === 'ua' ? 'Офіційна Instagram-сторінка ТОВ «ОЗОН-ДЕЗ» у процесі оформлення та незабаром буде доступна!' : langState.current === 'ru' ? 'Официальная Instagram-страница ООО «ОЗОН-ДЕЗ» в процессе оформления и скоро будет доступна!' : 'Official Instagram page of LLC "OZON-DEZ" is coming soon!')}
							>
								<svg class="mess-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
								</svg>
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
		padding: clamp(1.5rem, 3vh, 2.5rem) 0 clamp(2.5rem, 5vh, 3.5rem);
	}

	.contacts-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		align-items: start;
	}

	@media (max-width: 960px) {
		.contacts-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	.contacts-info-column {
		display: flex;
		flex-direction: column;
	}

	.contacts-form-column {
		display: flex;
		flex-direction: column;
	}

	.info-card {
		padding: 1.6rem 1.85rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	@media (max-width: 480px) {
		.info-card {
			padding: 1.25rem 1rem;
		}
	}

	.info-card-header {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding-bottom: 0.85rem;
		border-bottom: 1px solid var(--border-subtle);
		margin-bottom: 0;
	}

	.header-icon {
		font-size: 1.75rem;
		color: var(--color-electric-iris);
	}

	.info-company-name {
		font-size: 1.25rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
	}

	.info-company-sub {
		font-size: 0.82rem;
		color: var(--color-ash-gray);
		font-weight: 300;
	}

	.details-list {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.detail-row {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.detail-icon {
		font-size: 1.15rem;
		flex-shrink: 0;
		margin-top: 2px;
		color: var(--color-electric-iris);
	}

	.detail-label {
		font-size: 0.72rem;
		color: var(--color-silver-mist);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		display: block;
		margin-bottom: 0.15rem;
	}

	.detail-val {
		font-size: 0.92rem;
		font-weight: 300;
		color: var(--color-bone-white);
		line-height: 1.45;
	}

	.phone-links {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin-top: 0.2rem;
	}

	.contact-phone-link {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		font-size: 1.05rem;
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
		font-size: 0.9rem;
		color: var(--color-ash-gray);
	}

	.phone-badge {
		font-size: 0.68rem;
		background: rgba(2, 132, 199, 0.15);
		color: #38bdf8;
		border: 1px solid rgba(2, 132, 199, 0.3);
		padding: 0.15rem 0.55rem;
		border-radius: var(--radius-pill);
		font-weight: 600;
		font-family: var(--font-body);
	}

	.phone-badge-sec {
		font-size: 0.68rem;
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-ash-gray);
		padding: 0.15rem 0.55rem;
		border-radius: var(--radius-pill);
		font-weight: 500;
		font-family: var(--font-body);
	}

	.schedule-status-sub {
		margin-top: 0.25rem;
		font-size: 0.78rem;
		font-weight: 400;
		color: #38bdf8;
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.messengers-row {
		margin-top: 0.25rem;
		padding-top: 0.85rem;
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
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.mess-circle-btn {
		width: 42px;
		height: 42px;
		min-width: 42px;
		min-height: 42px;
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
		transform: translateY(-2px) scale(1.05);
	}

	.mess-circle-btn:active {
		transform: translateY(0) scale(0.96);
	}

	/* Classic authentic brand colors */
	.mess-viber {
		background: #7360f2;
		box-shadow: 0 4px 12px rgba(115, 96, 242, 0.35);
	}

	.mess-viber:hover {
		background: #6450e8;
		box-shadow: 0 6px 18px rgba(115, 96, 242, 0.55);
	}

	.mess-tg {
		background: #229ed9;
		box-shadow: 0 4px 12px rgba(34, 158, 217, 0.35);
	}

	.mess-tg:hover {
		background: #1e8ec3;
		box-shadow: 0 6px 18px rgba(34, 158, 217, 0.55);
	}

	.mess-insta {
		background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%);
		box-shadow: 0 4px 12px rgba(220, 39, 67, 0.35);
	}

	.mess-insta:hover {
		filter: brightness(1.08);
		box-shadow: 0 6px 18px rgba(220, 39, 67, 0.55);
	}

	.mess-icon {
		display: block;
		flex-shrink: 0;
	}

	/* Form Column */
	.form-card {
		padding: 1.6rem 1.85rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 640px) {
		.form-card {
			padding: 1.25rem 1rem;
		}
	}

	@media (max-width: 480px) {
		.form-card {
			padding: 1.25rem 1rem;
		}
	}

	.form-card-header {
		margin-bottom: 0.9rem;
	}

	.form-title {
		font-size: 1.25rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--color-bone-white);
		margin-bottom: 0.25rem;
	}

	.form-subtitle {
		font-size: 0.84rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.45;
	}

	.contact-main-form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.input-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.input-lbl {
		font-size: 0.76rem;
		font-weight: 500;
		color: var(--color-silver-mist);
	}

	.styled-input {
		width: 100%;
		padding: 0.65rem 0.95rem;
		border-radius: 10px;
		border: 1px solid var(--border-subtle);
		background: var(--color-surface-hover);
		color: var(--color-bone-white);
		font-size: 14.5px;
		font-family: var(--font-body);
		outline: none;
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.styled-input::placeholder {
		color: var(--color-ash-gray);
		opacity: 0.55;
	}

	.styled-input:focus {
		border-color: #0284c7;
		box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.2);
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
		min-height: 60px;
		max-height: 120px;
		resize: vertical;
		line-height: 1.45;
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

	:global(html[data-theme="light"]) .info-card {
		background: rgba(255, 255, 255, 0.8);
		border-color: rgba(15, 23, 42, 0.08);
		box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
	}

	:global(html[data-theme="light"]) .form-card {
		background: rgba(255, 255, 255, 0.85);
		border-color: rgba(15, 23, 42, 0.08);
		box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
	}

	:global(html[data-theme="light"]) .styled-input {
		background: #f8fafc;
		border-color: #cbd5e1;
		color: #0f172a;
	}
</style>
