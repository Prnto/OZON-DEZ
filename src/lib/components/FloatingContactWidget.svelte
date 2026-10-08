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
					href="viber://chat?number=%2B380682615350"
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
		background: rgba(4, 13, 26, 0.4);
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
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
		width: 60px;
		height: 60px;
		min-width: 60px;
		min-height: 60px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.35);
		background: linear-gradient(135deg, #00d4aa 0%, #00b4d8 100%);
		box-shadow: 0 10px 28px rgba(0, 212, 170, 0.42), 0 4px 12px rgba(4, 13, 26, 0.3);
		cursor: pointer;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		outline: none;
	}

	.floating-trigger-btn:hover {
		transform: scale(1.08) translateY(-2px);
		box-shadow: 0 14px 34px rgba(0, 212, 170, 0.55), 0 6px 16px rgba(4, 13, 26, 0.35);
	}

	.floating-trigger-btn.active {
		background: #081a36;
		border-color: rgba(255, 255, 255, 0.2);
		transform: scale(1);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	.trigger-icon {
		font-size: 1.55rem;
		line-height: 1;
		transition: transform 0.2s ease;
		color: #04192f;
	}

	.floating-trigger-btn.active .trigger-icon {
		color: #ffffff;
		font-size: 1.25rem;
		font-weight: 700;
	}

	.ring-pulse {
		position: absolute;
		inset: -5px;
		border-radius: 50%;
		border: 2px solid #00d4aa;
		opacity: 0.8;
		animation: pulseRing 2.2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
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
			transform: scale(1.35);
			opacity: 0;
		}
		100% {
			transform: scale(1.4);
			opacity: 0;
		}
	}

	.label-badge {
		position: absolute;
		top: -4px;
		right: -4px;
		background: #ef4444;
		color: #ffffff;
		font-size: 0.64rem;
		font-weight: 800;
		padding: 0.15rem 0.4rem;
		border-radius: var(--radius-full);
		border: 1.5px solid #ffffff;
		line-height: 1;
		letter-spacing: 0.02em;
	}

	/* Menu Popup */
	.widget-menu {
		width: 320px;
		max-width: calc(100vw - 2rem);
		padding: 1.2rem;
		border-radius: var(--radius-xl);
		animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		transform-origin: bottom right;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: scale(0.9) translateY(12px);
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
		padding-bottom: 0.85rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		margin-bottom: 0.75rem;
	}

	.status-indicator {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.live-pulse {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #00d4aa;
		box-shadow: 0 0 8px #00d4aa;
		animation: blink 1.5s infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.status-text {
		font-size: 0.76rem;
		font-weight: 700;
		color: #00d4aa;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.menu-close-btn {
		background: transparent;
		border: none;
		color: #94a3b8;
		font-size: 0.95rem;
		cursor: pointer;
		width: 28px;
		height: 28px;
		min-width: 28px;
		min-height: 28px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s ease, color 0.15s ease;
	}

	.menu-close-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.menu-items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.75rem 0.9rem;
		min-height: 48px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius-md);
		color: #ffffff;
		text-align: left;
		cursor: pointer;
		transition: all 0.18s ease;
		width: 100%;
		outline: none;
	}

	.menu-item:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(0, 212, 170, 0.4);
		transform: translateX(-3px);
	}

	.item-icon-wrap {
		width: 38px;
		height: 38px;
		min-width: 38px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.15rem;
	}

	.phone-icon {
		background: rgba(16, 185, 129, 0.2);
	}

	.tg-icon {
		background: rgba(0, 180, 216, 0.2);
	}

	.viber-icon {
		background: rgba(139, 92, 246, 0.2);
	}

	.em-icon {
		background: rgba(245, 158, 11, 0.2);
	}

	.item-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		overflow: hidden;
	}

	.item-title {
		font-size: 0.86rem;
		font-weight: 700;
		color: #ffffff;
		line-height: 1.2;
	}

	.item-detail {
		font-size: 0.74rem;
		color: #94a3b8;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.item-arrow {
		color: #64748b;
		font-size: 0.85rem;
		transition: transform 0.15s ease, color 0.15s ease;
	}

	.menu-item:hover .item-arrow {
		color: #00d4aa;
		transform: translateX(3px);
	}

	.emergency-action {
		border-color: rgba(245, 158, 11, 0.3);
		background: rgba(245, 158, 11, 0.08);
	}

	.emergency-action:hover {
		border-color: #f59e0b;
		background: rgba(245, 158, 11, 0.16);
	}

	@media (max-width: 480px) {
		.floating-widget-wrapper {
			bottom: max(1rem, calc(1rem + env(safe-area-inset-bottom, 0px)));
			right: max(1rem, calc(1rem + env(safe-area-inset-right, 0px)));
		}

		.widget-menu {
			width: 295px;
			padding: 1rem;
		}

		.floating-trigger-btn {
			width: 54px;
			height: 54px;
			min-width: 54px;
			min-height: 54px;
		}
	}
</style>
