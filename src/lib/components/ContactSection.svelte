<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let contacts = $derived(currentContent.contacts);

	let formName = $state('');
	let formPhone = $state('');
	let formService = $state('disinsection');
	let formComment = $state('');
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	function handleContactSubmit(e: Event) {
		e.preventDefault();
		if (!formPhone.trim()) return;

		isSubmitting = true;
		setTimeout(() => {
			isSubmitting = false;
			isSuccess = true;
		}, 500);
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
								href="viber://chat?number=%2B380682615350"
								class="mess-btn mess-viber"
								target="_blank"
								rel="noreferrer"
							>
								💜 Viber
							</a>
							<a
								href="https://t.me/+380682615350"
								class="mess-btn mess-tg"
								target="_blank"
								rel="noreferrer"
							>
								✈️ Telegram
							</a>
						</div>
					</div>
				</div>

				<!-- Chornomorsk Map Info Card & Office Location -->
				<div class="map-card glass-card">
					<div class="map-preview-header">
						<div>
							<div class="map-title">{contacts.map.title}</div>
							<div class="map-subtitle">{contacts.map.subtitle}</div>
						</div>
						<a
							href="https://maps.google.com/?q=г.+Черноморск,+проспект+Мира,+8А"
							target="_blank"
							rel="noreferrer"
							class="btn btn-secondary btn-sm"
						>
							{contacts.map.btn}
						</a>
					</div>
					<div class="map-photo-visual">
						<img
							src="/images/port-chornomorsk-office.jpg"
							alt="Вид на місто Чорноморськ та морський порт — локація офісу ТОВ ОЗОН-ДЕЗ"
							class="map-port-photo"
							loading="lazy"
						/>
						<div class="map-photo-overlay">
							<div class="office-location-badge">
								<span class="badge-pulse-dot"></span>
								<div>
									<strong>{currentContent.address.actual}</strong>
									<div class="location-sub-text">м. Чорноморськ (Іллічівськ) • Виїзд на об'єкт від 30 хв</div>
								</div>
							</div>
						</div>
					</div>
					<div class="map-route-tags-bar">
						<span class="route-city-tag">⚓ {contacts.map.routeCities}</span>
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
									placeholder="+38 (068) 261-53-50"
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
										{#if langState.current === 'ua'}Договір для бізнесу (HACCP){:else}Договор для бизнеса (HACCP){/if}
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
		background: #ffffff;
		border-top: 1px solid var(--border-light);
	}

	.contacts-grid {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 3rem;
		align-items: start;
	}

	@media (max-width: 960px) {
		.contacts-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}

	.contacts-info-column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-card {
		padding: 2.2rem;
		border: 1px solid var(--border-light);
	}

	.info-card-header {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border-light);
		margin-bottom: 1.6rem;
	}

	.header-icon {
		font-size: 2.2rem;
	}

	.info-company-name {
		font-size: 1.35rem;
		font-weight: 800;
		color: var(--primary-950);
	}

	.info-company-sub {
		font-size: 0.85rem;
		color: var(--text-muted);
		font-weight: 600;
	}

	.details-list {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
	}

	.detail-row {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.detail-icon {
		font-size: 1.35rem;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.detail-label {
		font-size: 0.78rem;
		color: var(--text-muted);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		display: block;
		margin-bottom: 0.2rem;
	}

	.detail-val {
		font-size: 0.98rem;
		font-weight: 600;
		color: var(--primary-900);
		line-height: 1.4;
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
		font-weight: 800;
		color: var(--primary-900);
		font-family: var(--font-heading);
		text-decoration: none;
	}

	.contact-phone-link:hover {
		color: var(--primary-700);
	}

	.contact-phone-link.secondary {
		font-size: 1rem;
		color: var(--text-body);
	}

	.phone-badge {
		font-size: 0.72rem;
		background: rgba(0, 212, 170, 0.18);
		color: #00876c;
		padding: 0.2rem 0.55rem;
		border-radius: var(--radius-full);
		font-weight: 700;
		font-family: var(--font-body);
	}

	.phone-badge-sec {
		font-size: 0.72rem;
		background: #f1f5f9;
		color: var(--text-muted);
		padding: 0.2rem 0.55rem;
		border-radius: var(--radius-full);
		font-weight: 600;
		font-family: var(--font-body);
	}

	.schedule-status-sub {
		margin-top: 0.35rem;
		font-size: 0.82rem;
		font-weight: 600;
		color: #00876c;
	}

	.messengers-row {
		margin-top: 1.8rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-light);
	}

	.mess-title {
		display: block;
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--text-muted);
		margin-bottom: 0.75rem;
	}

	.mess-buttons {
		display: flex;
		gap: 0.75rem;
	}

	.mess-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.55rem 1.1rem;
		border-radius: var(--radius-full);
		font-size: 0.85rem;
		font-weight: 700;
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.mess-viber {
		background: #7360f2;
		color: #ffffff;
	}

	.mess-viber:hover {
		background: #5e47ec;
		transform: translateY(-2px);
	}

	.mess-tg {
		background: #0088cc;
		color: #ffffff;
	}

	.mess-tg:hover {
		background: #0077b5;
		transform: translateY(-2px);
	}

	/* Map card */
	.map-card {
		padding: 1.5rem;
		border: 1px solid var(--border-light);
	}

	.map-preview-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.map-title {
		font-size: 1rem;
		font-weight: 700;
		color: var(--primary-900);
	}

	.map-subtitle {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.map-photo-visual {
		position: relative;
		border-radius: var(--radius-md);
		overflow: hidden;
		aspect-ratio: 16/9;
		margin-bottom: 0.85rem;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.08);
	}

	.map-port-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
		transition: transform var(--transition-norm);
	}

	.map-card:hover .map-port-photo {
		transform: scale(1.03);
	}

	.map-photo-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(7, 25, 51, 0.85) 0%,
			rgba(7, 25, 51, 0.25) 55%,
			transparent 100%
		);
		display: flex;
		align-items: flex-end;
		padding: 0.85rem;
	}

	.office-location-badge {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		padding: 0.55rem 0.85rem;
		border-radius: var(--radius-md);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
	}

	.badge-pulse-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #00d4aa;
		box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.35);
		flex-shrink: 0;
	}

	.office-location-badge strong {
		font-size: 0.84rem;
		color: var(--primary-950);
		display: block;
		line-height: 1.2;
	}

	.location-sub-text {
		font-size: 0.72rem;
		color: #475569;
		font-weight: 600;
	}

	.map-route-tags-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.route-city-tag {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--primary-800);
	}

	/* Form Column */
	.form-card {
		padding: 2.4rem;
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-lg);
	}

	@media (max-width: 640px) {
		.form-card {
			padding: 1.5rem;
		}
	}

	.form-card-header {
		margin-bottom: 1.8rem;
	}

	.form-title {
		font-size: 1.4rem;
		font-weight: 800;
		color: var(--primary-950);
		margin-bottom: 0.4rem;
	}

	.form-subtitle {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.contact-main-form {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.input-field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.input-lbl {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--primary-900);
	}

	.styled-input {
		width: 100%;
		padding: 0.8rem 1rem;
		border-radius: var(--radius-sm);
		border: 1.5px solid var(--border-light);
		background: #ffffff;
		color: var(--text-title);
		font-size: 0.92rem;
		outline: none;
		transition: border-color var(--transition-fast);
	}

	.styled-input:focus {
		border-color: var(--primary-700);
		box-shadow: 0 0 0 3px rgba(22, 66, 130, 0.1);
	}

	.styled-select {
		cursor: pointer;
	}

	.styled-textarea {
		resize: vertical;
	}

	.form-disclaimer {
		font-size: 0.72rem;
		color: var(--text-muted);
		text-align: center;
		margin-top: 0.5rem;
	}

	.contact-success-state {
		text-align: center;
		padding: 2rem 1rem;
	}

	.success-check-icon {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: linear-gradient(135deg, #00d4aa 0%, #00b4d8 100%);
		color: #042436;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.8rem;
		font-weight: 900;
		margin: 0 auto 1.2rem;
	}

	.contact-success-state h3 {
		font-size: 1.35rem;
		color: var(--primary-950);
		margin-bottom: 0.6rem;
	}

	.contact-success-state p {
		font-size: 0.92rem;
		color: var(--text-muted);
		line-height: 1.55;
		margin-bottom: 1.5rem;
	}
</style>
