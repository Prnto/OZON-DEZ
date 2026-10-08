<script lang="ts">
	import { orderModal } from '../state/modal.svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { sendTelegramLead } from '../services/telegram';

	let currentContent = $derived(contentMap[langState.current]);
	let modalData = $derived(currentContent.modal);

	let clientName = $state('');
	let clientPhone = $state('');
	let clientAddress = $state('');
	let clientComment = $state('');
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);

	$effect(() => {
		if (typeof document !== 'undefined') {
			if (orderModal.data.isOpen) {
				document.body.classList.add('modal-open');
			} else {
				document.body.classList.remove('modal-open');
			}
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!clientPhone.trim() || isSubmitting) return;

		isSubmitting = true;
		try {
			await sendTelegramLead({
				source: 'Модальне вікно замовлення',
				name: clientName,
				phone: clientPhone,
				address: clientAddress,
				comment: clientComment,
				serviceTitle: orderModal.data.serviceTitle,
				serviceCategory: orderModal.data.serviceCategory,
				lang: langState.current
			});
		} catch (err) {
			console.error('Error submitting order:', err);
		} finally {
			isSubmitting = false;
			isSubmitted = true;
		}
	}

	function handleClose() {
		orderModal.close();
		isSubmitted = false;
		clientName = '';
		clientPhone = '';
		clientAddress = '';
		clientComment = '';
		if (typeof document !== 'undefined') {
			document.body.classList.remove('modal-open');
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && orderModal.data.isOpen) {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if orderModal.data.isOpen}
	<div class="modal-backdrop" onclick={handleClose} role="presentation">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="modal-dialog glass-card"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<button type="button" class="close-btn" onclick={handleClose} aria-label={modalData.closeBtn}>
				✕
			</button>

			{#if isSubmitted}
				<div class="modal-success">
					<div class="modal-success-badge">✓</div>
					<h3 class="modal-success-title">{modalData.successTitle}</h3>
					<p class="modal-success-p">
						{modalData.successText} (<strong>{clientPhone}</strong>).
					</p>
					<div class="direct-call-box">
						<span>{modalData.urgentText}</span>
						<a href="tel:{currentContent.phones.mobile}" class="btn btn-primary" style="margin-top: 0.6rem;">
							📞 {currentContent.phones.mobileDisplay}
						</a>
					</div>
					<button type="button" class="btn btn-secondary btn-sm" style="margin-top: 1.5rem;" onclick={handleClose}>
						{modalData.closeBtn}
					</button>
				</div>
			{:else}
				<div class="modal-header">
					<div class="modal-top-tag">
						<span>{modalData.topTag}</span>
						{#if orderModal.data.serviceCategory}
							<span class="tag-cat">• {orderModal.data.serviceCategory.split('(')[0]}</span>
						{/if}
					</div>
					<h3 class="modal-heading">
						{orderModal.data.serviceTitle || modalData.defaultTitle}
					</h3>
					<p class="modal-sub">
						{modalData.sub}
					</p>
				</div>

				<form onsubmit={handleSubmit} class="modal-form">
					<div class="field-row">
						<label for="m-name" class="m-lbl">{modalData.nameLbl}</label>
						<input
							id="m-name"
							type="text"
							placeholder={modalData.namePlaceholder}
							bind:value={clientName}
							class="m-input"
						/>
					</div>

					<div class="field-row">
						<label for="m-phone" class="m-lbl">{modalData.phoneLbl}</label>
						<input
							id="m-phone"
							type="tel"
							placeholder="+38 (068) 261-53-50"
							bind:value={clientPhone}
							required
							class="m-input"
						/>
					</div>

					<div class="field-row">
						<label for="m-address" class="m-lbl">{modalData.addressLbl}</label>
						<input
							id="m-address"
							type="text"
							placeholder={modalData.addressPlaceholder}
							bind:value={clientAddress}
							class="m-input"
						/>
					</div>

					<div class="field-row">
						<label for="m-comment" class="m-lbl">{modalData.commentLbl}</label>
						<textarea
							id="m-comment"
							rows="2"
							placeholder={modalData.commentPlaceholder}
							bind:value={clientComment}
							class="m-input m-textarea"
						></textarea>
					</div>

					<div class="modal-action-row">
						<button type="submit" class="btn btn-primary btn-lg" style="width: 100%;" disabled={isSubmitting}>
							{#if isSubmitting}
								...
							{:else}
								{modalData.submitBtn}
							{/if}
						</button>
					</div>

					<div class="m-privacy">
						{modalData.privacy}
					</div>
				</form>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(4, 13, 26, 0.72);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.modal-dialog {
		width: 100%;
		max-width: 520px;
		background: #ffffff;
		border-radius: var(--radius-xl);
		padding: 2.2rem;
		position: relative;
		box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.8);
		animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		max-height: 90vh;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	@media (max-width: 480px) {
		.modal-dialog {
			padding: 1.5rem 1.15rem;
			border-radius: var(--radius-lg);
			max-height: 92vh;
		}
	}

	@keyframes popIn {
		from {
			opacity: 0;
			transform: scale(0.94) translateY(12px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.close-btn {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		border: none;
		background: #f1f5f9;
		color: #475569;
		font-size: 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
	}

	.close-btn:hover {
		background: #e2e8f0;
		color: #0f172a;
	}

	.modal-top-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.76rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #00876c;
		background: rgba(0, 212, 170, 0.12);
		padding: 0.25rem 0.65rem;
		border-radius: var(--radius-full);
		margin-bottom: 0.8rem;
	}

	.modal-heading {
		font-size: 1.4rem;
		font-weight: 800;
		color: var(--primary-950);
		line-height: 1.25;
		margin-bottom: 0.4rem;
	}

	.modal-sub {
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.5;
		margin-bottom: 1.6rem;
	}

	.modal-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.field-row {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.m-lbl {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--primary-900);
	}

	.m-input {
		width: 100%;
		padding: 0.75rem 0.95rem;
		border-radius: var(--radius-sm);
		border: 1.5px solid var(--border-light);
		background: #ffffff;
		font-size: 16px;
		color: var(--text-title);
		outline: none;
		transition: border-color var(--transition-fast);
	}

	.m-input:focus {
		border-color: var(--primary-700);
		box-shadow: 0 0 0 3px rgba(22, 66, 130, 0.12);
	}

	.m-textarea {
		resize: vertical;
	}

	.modal-action-row {
		margin-top: 0.6rem;
	}

	.m-privacy {
		font-size: 0.72rem;
		color: var(--text-muted);
		text-align: center;
		margin-top: 0.5rem;
	}

	/* Success State */
	.modal-success {
		text-align: center;
		padding: 1.5rem 0.5rem;
	}

	.modal-success-badge {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: linear-gradient(135deg, #00d4aa 0%, #00b4d8 100%);
		color: #042436;
		font-size: 2rem;
		font-weight: 900;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1.25rem;
	}

	.modal-success-title {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--primary-950);
		margin-bottom: 0.6rem;
	}

	.modal-success-p {
		font-size: 0.92rem;
		color: var(--text-muted);
		line-height: 1.55;
		margin-bottom: 1.5rem;
	}

	.direct-call-box {
		background: #f1f5f9;
		padding: 1rem;
		border-radius: var(--radius-md);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--primary-900);
	}
</style>
