<script lang="ts">
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
		<div class="section-header">
			<div class="section-badge">{contacts.badge}</div>
			<h2 class="section-title">{contacts.title}</h2>
			<p class="section-subtitle">{contacts.subtitle}</p>
		</div>

		<div class="contacts-grid">
			<!-- Contact Information Cards -->
			<div class="contacts-info-column">
				<div class="info-card glass-card">
					<div class="info-card-header">
						<div class="header-icon">🏢</div>
						<div>
							<h3 class="info-company-name">{currentContent.companyName}</h3>
							<div class="info-company-sub">{currentContent.companyNameAlt}</div>
						</div>
					</div>

					<div class="details-list">
						<!-- Actual Address -->
						<div class="detail-row">
							<div class="detail-icon">📍</div>
							<div>
								<span class="detail-label">{contacts.labels.actual}</span>
								<div class="detail-val">{currentContent.address.actual}</div>
							</div>
						</div>

						<!-- Legal Address -->
						<div class="detail-row">
							<div class="detail-icon">⚖️</div>
							<div>
								<span class="detail-label">{contacts.labels.legal}</span>
								<div class="detail-val">{currentContent.address.legal}</div>
							</div>
						</div>

						<!-- Phones -->
						<div class="detail-row">
							<div class="detail-icon">📞</div>
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
							<div class="detail-icon">🕒</div>
							<div>
								<span class="detail-label">{contacts.labels.schedule}</span>
								<div class="detail-val">
									<strong>{currentContent.workingHours.days}:</strong> {currentContent.workingHours.hours}
								</div>
								<div class="schedule-status-sub">
									⚡ {currentContent.workingHours.status}
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
								class="mess-btn mess-viber"
								target="_blank"
								rel="noreferrer"
								title="Viber"
							>
								<svg class="mess-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
									<path d="M19.78 3.23C17.65 1.51 14.89.8 11.96.8c-.37 0-.74.02-1.11.05-5.36.46-9.61 4.7-10.07 10.06-.2 2.37.4 4.7 1.7 6.64L.94 21.6c-.34 1.13.72 2.19 1.85 1.85l4.05-1.54c1.64.91 3.5 1.39 5.41 1.39.29 0 .58-.01.87-.04 5.36-.46 9.61-4.7 10.07-10.06.53-6.17-3.41-9.97-3.41-9.97zm-1.84 13.9c-.33.91-1.74 1.72-2.58 1.84-.71.1-1.63.15-4.73-1.14-3.72-1.55-6.15-5.32-6.33-5.57-.19-.25-1.5-2-1.5-3.81 0-1.82.95-2.72 1.29-3.08.34-.37.75-.46 1-.46.25 0 .5.01.71.02.23.01.53-.09.83.63.31.75 1.05 2.58 1.15 2.77.09.19.16.42.03.67-.12.26-.19.42-.37.64-.19.21-.4.47-.57.63-.19.19-.39.4-.17.78.22.37.99 1.63 2.12 2.64 1.45 1.3 2.68 1.7 3.06 1.89.38.18.6-.01.82-.24.23-.23.97-1.13 1.23-1.52.26-.38.52-.32.88-.19.36.13 2.27 1.07 2.66 1.26.39.2.65.29.74.45.1.18.1 1.05-.23 1.96z"/>
								</svg>
								<span>Viber</span>
							</a>
							<a
								href="https://t.me/ozon_dez_lead_bot"
								class="mess-btn mess-tg"
								target="_blank"
								rel="noreferrer"
								title="Telegram"
							>
								<svg class="mess-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
									<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.895-.964 4.57-1.36 6.69-.168.897-.5 1.197-.82 1.226-.697.065-1.226-.46-1.9-.902-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.481-.43-.01-1.257-.243-1.872-.443-.755-.245-1.355-.375-1.303-.792.027-.217.327-.439.9-.667 3.524-1.535 5.874-2.548 7.05-3.039 3.355-1.398 4.053-1.641 4.507-1.649.1 0 .323.024.468.141.122.099.156.232.169.327-.003.076.012.306-.013.447z"/>
								</svg>
								<span>Telegram</span>
							</a>
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
						<div class="contact-success-state">
							<div class="success-check-icon">✓</div>
							<h3>{contacts.form.successTitle}</h3>
							<p>{contacts.form.successDesc}</p>
							<button
								type="button"
								class="btn btn-primary"
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
						<form onsubmit={handleContactSubmit} class="contact-main-form">
							<div class="input-field">
								<label for="c-name" class="input-lbl">{contacts.form.nameLbl}</label>
								<input
									id="c-name"
									type="text"
									placeholder={contacts.form.namePlaceholder}
									bind:value={formName}
									class="styled-input"
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
								/>
							</div>

							<div class="input-field">
								<label for="c-service" class="input-lbl">{contacts.form.serviceLbl}</label>
								<select id="c-service" bind:value={formService} class="styled-input styled-select">
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
								></textarea>
							</div>

							<button type="submit" class="btn btn-primary btn-lg" style="width: 100%;" disabled={isSubmitting}>
								{#if isSubmitting}
									...
								{:else}
									{contacts.form.submitBtn}
								{/if}
							</button>

							<div class="form-disclaimer">
								{contacts.form.disclaimer}
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
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-3xl) 0;
	}

	.contacts-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: start;
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
		gap: 1.5rem;
	}

	.info-card {
		padding: 2.5rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: none;
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
	}

	.messengers-row {
		margin-top: 1.6rem;
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
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.mess-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.65rem 1.35rem;
		border-radius: var(--radius-pill);
		font-size: 0.9rem;
		font-weight: 500;
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.mess-icon {
		display: block;
		flex-shrink: 0;
	}

	.mess-viber {
		background: #7360f2;
		color: #ffffff;
	}

	.mess-viber:hover {
		background: #5e47ec;
		transform: translateY(-1px);
	}

	.mess-tg {
		background: #0088cc;
		color: #ffffff;
	}

	.mess-tg:hover {
		background: #0077b5;
		transform: translateY(-1px);
	}

	/* Form Column */
	.form-card {
		padding: 2.5rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: none;
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
		margin-bottom: 1.6rem;
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
		transition: border-color var(--transition-fast);
	}

	.styled-input::placeholder {
		color: var(--color-ash-gray);
		opacity: 0.55;
	}

	.styled-input:focus {
		border-color: var(--color-electric-iris);
	}

	.styled-select {
		cursor: pointer;
	}

	.styled-textarea {
		resize: vertical;
	}

	.form-disclaimer {
		font-size: 0.72rem;
		color: var(--color-ash-gray);
		text-align: center;
		margin-top: 0.4rem;
		font-weight: 300;
	}

	.contact-success-state {
		text-align: center;
		padding: 2rem 1rem;
	}

	.success-check-icon {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: var(--color-electric-iris);
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
