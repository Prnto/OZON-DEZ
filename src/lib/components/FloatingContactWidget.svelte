<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let isOpen = $state(false);

	function toggleWidget() {
		isOpen = !isOpen;
	}

	function closeWidget() {
		isOpen = false;
	}

	function handleEmergencyCall() {
		closeWidget();
		orderModal.open({
			serviceTitle: langState.current === 'ua' ? 'Екстрений виїзд майстра 24/7' : 'Экстренный выезд мастера 24/7',
			serviceCategory: langState.current === 'ua' ? 'Швидкий зв’язок' : 'Быстрая связь'
		});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			closeWidget();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
{#if isOpen}
	<div class="widget-backdrop" onclick={closeWidget} role="presentation"></div>
{/if}

<div class="floating-widget-wrapper">
	{#if isOpen}
		<div class="widget-menu glass-card-dark" role="menu">
			<div class="menu-header">
				<div class="status-indicator">
					<span class="live-pulse"></span>
					<span class="status-text">
						{#if langState.current === 'ua'}Оператор на зв'язку 24/7{:else}Оператор на связи 24/7{/if}
					</span>
				</div>
				<button type="button" class="menu-close-btn" onclick={closeWidget} aria-label="Закрити меню">
					✕
				</button>
			</div>

			<div class="menu-items">
				<!-- Direct Phone Call -->
				<a
					href="tel:{currentContent.phones.mobile}"
					class="menu-item phone-action"
					onclick={closeWidget}
					role="menuitem"
				>
					<div class="item-icon-wrap phone-icon">📞</div>
					<div class="item-content">
						<span class="item-title">
							{#if langState.current === 'ua'}Зателефонувати зараз{:else}Позвонить сейчас{/if}
						</span>
						<span class="item-detail">{currentContent.phones.mobileDisplay}</span>
					</div>
					<span class="item-arrow">→</span>
				</a>

				<!-- Telegram Bot / Chat -->
				<a
					href="https://t.me/ozon_dez_lead_bot"
					target="_blank"
					rel="noreferrer"
					class="menu-item tg-action"
					onclick={closeWidget}
					role="menuitem"
				>
					<div class="item-icon-wrap tg-icon">✈️</div>
					<div class="item-content">
						<span class="item-title">Telegram-чат</span>
						<span class="item-detail">
							{#if langState.current === 'ua'}Миттєва відповідь оператора{:else}Мгновенный ответ оператора{/if}
						</span>
					</div>
					<span class="item-arrow">→</span>
				</a>

				<!-- Viber -->
				<a
					href="viber://chat?number=%2B380636672653"
					target="_blank"
					rel="noreferrer"
					class="menu-item viber-action"
					onclick={closeWidget}
					role="menuitem"
				>
					<div class="item-icon-wrap viber-icon">💜</div>
					<div class="item-content">
						<span class="item-title">Viber</span>
						<span class="item-detail">
							{#if langState.current === 'ua'}Чат у месенджері{:else}Чат в мессенджере{/if}
						</span>
					</div>
					<span class="item-arrow">→</span>
				</a>

				<!-- Order Dispatch Modal -->
				<button
					type="button"
					class="menu-item emergency-action"
					onclick={handleEmergencyCall}
					role="menuitem"
				>
					<div class="item-icon-wrap em-icon">⚡</div>
					<div class="item-content">
						<span class="item-title">
							{#if langState.current === 'ua'}Екстрений виїзд майстра{:else}Экстренный выезд мастера{/if}
						</span>
						<span class="item-detail">
							{#if langState.current === 'ua'}Виїзд від 30 хвилин{:else}Выезд от 30 минут{/if}
						</span>
					</div>
					<span class="item-arrow">→</span>
				</button>
			</div>
		</div>
	{/if}

	<!-- Main Floating Toggle Button -->
	<button
		type="button"
		class="floating-trigger-btn"
		class:active={isOpen}
		onclick={toggleWidget}
		aria-expanded={isOpen}
		aria-label={langState.current === 'ua' ? 'Швидкий зв’язок та виклик майстра' : 'Быстрая связь и вызов мастера'}
	>
		<span class="ring-pulse"></span>
		<span class="trigger-icon" aria-hidden="true">
			{#if isOpen}
				✕
			{:else}
				💬
			{/if}
		</span>
		<span class="trigger-label">
			{#if !isOpen}
				<span class="label-badge">24/7</span>
			{/if}
		</span>
	</button>
</div>

<style>
	.widget-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(1, 29, 28, 0.6);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		z-index: 998;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.floating-widget-wrapper {
		position: fixed;
		bottom: max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)));
		right: max(1.5rem, calc(1.5rem + env(safe-area-inset-right, 0px)));
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.8rem;
	}

	/* Toggle Button */
	.floating-trigger-btn {
		width: 58px;
		height: 58px;
		min-width: 58px;
		min-height: 58px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.4);
		background: var(--gradient-aurora);
		box-shadow: none;
		cursor: pointer;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		outline: none;
	}

	.floating-trigger-btn:hover {
		transform: scale(1.05) translateY(-2px);
		border-color: rgba(255, 255, 255, 0.8);
	}

	.floating-trigger-btn.active {
		background: var(--color-liquid-deep);
		border-color: rgba(203, 255, 252, 0.3);
		transform: scale(1);
	}

	.trigger-icon {
		font-size: 1.45rem;
		line-height: 1;
		transition: transform 0.2s ease;
		color: #02201e;
	}

	.floating-trigger-btn.active .trigger-icon {
		color: var(--color-platinum);
		font-size: 1.15rem;
		font-weight: 500;
	}

	.ring-pulse {
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		border: 1.5px solid #cbfffc;
		opacity: 0.8;
		animation: pulseRing 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
		pointer-events: none;
	}

	.floating-trigger-btn.active .ring-pulse {
		display: none;
	}

	@keyframes pulseRing {
		0% {
			transform: scale(0.95);
			opacity: 0.9;
		}
		70% {
			transform: scale(1.3);
			opacity: 0;
		}
		100% {
			transform: scale(1.35);
			opacity: 0;
		}
	}

	.label-badge {
		position: absolute;
		top: -3px;
		right: -3px;
		background: #e11d48;
		color: #ffffff;
		font-size: 0.62rem;
		font-weight: 700;
		padding: 0.15rem 0.35rem;
		border-radius: var(--radius-small);
		border: 1px solid rgba(255, 255, 255, 0.4);
		line-height: 1;
		letter-spacing: 0.04em;
	}

	/* Menu Popup */
	.widget-menu {
		width: 310px;
		max-width: calc(100vw - 2rem);
		padding: 1.2rem;
		background: var(--color-liquid-kelp);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		box-shadow: none;
		animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		transform-origin: bottom right;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(8px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.menu-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid var(--border-subtle);
		margin-bottom: 0.75rem;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.live-pulse {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #cbfffc;
		box-shadow: 0 0 6px #cbfffc;
		animation: blink 1.5s infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.status-text {
		font-size: 0.74rem;
		font-weight: 500;
		color: var(--color-liquid-mist);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.menu-close-btn {
		background: transparent;
		border: none;
		color: var(--color-silver-mist);
		font-size: 0.9rem;
		cursor: pointer;
		width: 26px;
		height: 26px;
		min-width: 26px;
		min-height: 26px;
		border-radius: var(--radius-small);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s ease;
	}

	.menu-close-btn:hover {
		background: rgba(237, 255, 254, 0.08);
		color: var(--color-platinum);
	}

	.menu-items {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.7rem 0.85rem;
		min-height: 44px;
		background: var(--color-liquid-deep);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-small);
		color: var(--color-platinum);
		text-align: left;
		cursor: pointer;
		transition: all 0.18s ease;
		width: 100%;
		outline: none;
		text-decoration: none;
	}

	.menu-item:hover {
		border-color: rgba(203, 255, 252, 0.35);
		transform: translateX(-2px);
	}

	.item-icon-wrap {
		width: 34px;
		height: 34px;
		min-width: 34px;
		border-radius: var(--radius-small);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.1rem;
		background: rgba(237, 255, 254, 0.06);
		border: 1px solid rgba(203, 255, 252, 0.1);
	}

	.item-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		overflow: hidden;
	}

	.item-title {
		font-size: 0.84rem;
		font-weight: 500;
		color: var(--color-platinum);
		line-height: 1.2;
	}

	.item-detail {
		font-size: 0.74rem;
		color: var(--color-silver-mist);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.item-arrow {
		color: var(--color-silver-mist);
		font-size: 0.82rem;
		transition: transform 0.15s ease, color 0.15s ease;
	}

	.menu-item:hover .item-arrow {
		color: var(--color-liquid-mist);
		transform: translateX(2px);
	}

	.emergency-action {
		border-color: rgba(245, 158, 11, 0.25);
		background: rgba(245, 158, 11, 0.06);
	}

	.emergency-action:hover {
		border-color: rgba(245, 158, 11, 0.6);
		background: rgba(245, 158, 11, 0.12);
	}

	@media (max-width: 480px) {
		.floating-widget-wrapper {
			bottom: max(1rem, calc(1rem + env(safe-area-inset-bottom, 0px)));
			right: max(1rem, calc(1rem + env(safe-area-inset-right, 0px)));
		}

		.widget-menu {
			width: 290px;
			padding: 1rem;
		}

		.floating-trigger-btn {
			width: 52px;
			height: 52px;
			min-width: 52px;
			min-height: 52px;
		}
	}
</style>
