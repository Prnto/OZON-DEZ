<script lang="ts">
	import { X, Lightning, ArrowRight } from 'phosphor-svelte';
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
						{#if langState.current === 'ua'}
							Черговий спеціаліст
						{:else if langState.current === 'ru'}
							Дежурный специалист
						{:else}
							Specialist on duty
						{/if}
					</span>
				</div>
				<button type="button" class="menu-close-btn" onclick={closeWidget} aria-label="Закрити меню" style="display: flex; align-items: center; justify-content: center;">
					<X size={16} weight="bold" />
				</button>
			</div>

			<div class="menu-items">
				<!-- Quick Specialist Call (Modal) -->
				<button
					type="button"
					class="menu-item call-action"
					onclick={() => {
						closeWidget();
						orderModal.open({ serviceTitle: currentContent.modal.defaultTitle });
					}}
					role="menuitem"
				>
					<div class="item-icon-wrap call-icon" style="display: flex; align-items: center; justify-content: center;"><Lightning size={16} weight="fill" /></div>
					<div class="item-content">
						<span class="item-title">
							{#if langState.current === 'ua'}
								Виклик спеціаліста
							{:else if langState.current === 'ru'}
								Вызов специалиста
							{:else}
								Call a specialist
							{/if}
						</span>
						<span class="item-detail">
							{#if langState.current === 'ua'}
								Швидкий виїзд від 30 хв
							{:else if langState.current === 'ru'}
								Срочный выезд от 30 мин
							{:else}
								Fast dispatch from 30 min
							{/if}
						</span>
					</div>
					<span class="item-arrow" style="display: inline-flex; align-items: center;"><ArrowRight size={14} weight="bold" /></span>
				</button>

				<!-- Direct Mobile Call -->
				<a
					href="tel:{currentContent.phones.mobile}"
					class="menu-item phone-action"
					onclick={closeWidget}
					role="menuitem"
				>
					<div class="item-icon-wrap phone-icon">
						<svg class="brand-svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
							<path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
						</svg>
					</div>
					<div class="item-content">
						<span class="item-title">
							{#if langState.current === 'ua'}
								Мобільний зв'язок
							{:else if langState.current === 'ru'}
								Мобильная связь
							{:else}
								Mobile Phone
							{/if}
						</span>
						<span class="item-detail">{currentContent.phones.mobileDisplay}</span>
					</div>
					<span class="item-arrow" style="display: inline-flex; align-items: center;"><ArrowRight size={14} weight="bold" /></span>
				</a>

				<!-- Telegram Chat named OZON-DEZ (without 'Заявки') -->
				<a
					href="https://t.me/OZON_DEZ_bot"
					target="_blank"
					rel="noreferrer"
					class="menu-item tg-action"
					onclick={closeWidget}
					role="menuitem"
				>
					<div class="item-icon-wrap tg-icon">
						<svg class="brand-svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
							<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.895-.964 4.57-1.36 6.69-.168.897-.5 1.197-.82 1.226-.697.065-1.226-.46-1.9-.902-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.481-.43-.01-1.257-.243-1.872-.443-.755-.245-1.355-.375-1.303-.792.027-.217.327-.439.9-.667 3.524-1.535 5.874-2.548 7.05-3.039 3.355-1.398 4.053-1.641 4.507-1.649.1 0 .323.024.468.141.122.099.156.232.169.327-.003.076.012.306-.013.447z"/>
						</svg>
					</div>
					<div class="item-content">
						<span class="item-title">OZON-DEZ</span>
						<span class="item-detail">
							{#if langState.current === 'ua'}
								Telegram-чат із фахівцем
							{:else if langState.current === 'ru'}
								Telegram-чат со специалистом
							{:else}
								Telegram chat with specialist
							{/if}
						</span>
					</div>
					<span class="item-arrow" style="display: inline-flex; align-items: center;"><ArrowRight size={14} weight="bold" /></span>
				</a>

				<!-- Instagram (Coming soon stub) -->
				<button
					type="button"
					class="menu-item insta-action"
					onclick={() => {
						closeWidget();
						alert(
							langState.current === 'ua'
								? 'Офіційна Instagram-сторінка ТОВ «ОЗОН-ДЕЗ» у процесі оформлення та незабаром відкриється!'
								: langState.current === 'ru'
								? 'Официальная Instagram-страница ООО «ОЗОН-ДЕЗ» в процессе оформления и скоро откроется!'
								: 'Official Instagram page of LLC "OZON-DEZ" is coming soon!'
						);
					}}
					role="menuitem"
				>
					<div class="item-icon-wrap insta-icon">
						<svg class="brand-svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
						</svg>
					</div>
					<div class="item-content">
						<span class="item-title">Instagram</span>
						<span class="item-detail">
							{#if langState.current === 'ua'}
								Скоро відкриття
							{:else if langState.current === 'ru'}
								Скоро открытие
							{:else}
								Opening soon
							{/if}
						</span>
					</div>
					<span class="item-arrow" style="display: inline-flex; align-items: center;"><ArrowRight size={14} weight="bold" /></span>
				</button>

				<!-- Viber -->
				<a
					href="viber://chat?number=%2B380636672653"
					target="_blank"
					rel="noreferrer"
					class="menu-item viber-action"
					onclick={closeWidget}
					role="menuitem"
				>
					<div class="item-icon-wrap viber-icon">
						<svg class="brand-svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
							<path d="M19.78 3.23C17.65 1.51 14.89.8 11.96.8c-.37 0-.74.02-1.11.05-5.36.46-9.61 4.7-10.07 10.06-.2 2.37.4 4.7 1.7 6.64L.94 21.6c-.34 1.13.72 2.19 1.85 1.85l4.05-1.54c1.64.91 3.5 1.39 5.41 1.39.29 0 .58-.01.87-.04 5.36-.46 9.61-4.7 10.07-10.06.53-6.17-3.41-9.97-3.41-9.97zm-1.84 13.9c-.33.91-1.74 1.72-2.58 1.84-.71.1-1.63.15-4.73-1.14-3.72-1.55-6.15-5.32-6.33-5.57-.19-.25-1.5-2-1.5-3.81 0-1.82.95-2.72 1.29-3.08.34-.37.75-.46 1-.46.25 0 .5.01.71.02.23.01.53-.09.83.63.31.75 1.05 2.58 1.15 2.77.09.19.16.42.03.67-.12.26-.19.42-.37.64-.19.21-.4.47-.57.63-.19.19-.39.4-.17.78.22.37.99 1.63 2.12 2.64 1.45 1.3 2.68 1.7 3.06 1.89.38.18.6-.01.82-.24.23-.23.97-1.13 1.23-1.52.26-.38.52-.32.88-.19.36.13 2.27 1.07 2.66 1.26.39.2.65.29.74.45.1.18.1 1.05-.23 1.96z"/>
						</svg>
					</div>
					<div class="item-content">
						<span class="item-title">Viber</span>
						<span class="item-detail">
							{#if langState.current === 'ua'}
								Чат у месенджері
							{:else if langState.current === 'ru'}
								Чат в мессенджере
							{:else}
								Viber messenger chat
							{/if}
						</span>
					</div>
					<span class="item-arrow" style="display: inline-flex; align-items: center;"><ArrowRight size={14} weight="bold" /></span>
				</a>

				<!-- Landline / City Office Call -->
				<a
					href="tel:{currentContent.phones.landline}"
					class="menu-item office-action"
					onclick={closeWidget}
					role="menuitem"
				>
					<div class="item-icon-wrap office-icon">
						<svg class="brand-svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
							<path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
						</svg>
					</div>
					<div class="item-content">
						<span class="item-title">
							{#if langState.current === 'ua'}
								Міський / Офіс
							{:else if langState.current === 'ru'}
								Городской / Офис
							{:else}
								Office / Landline
							{/if}
						</span>
						<span class="item-detail">{currentContent.phones.landlineDisplay}</span>
					</div>
					<span class="item-arrow" style="display: inline-flex; align-items: center;"><ArrowRight size={14} weight="bold" /></span>
				</a>
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
		aria-label={langState.current === 'ua' ? 'Швидкий зв’язок та виклик спеціаліста' : langState.current === 'ru' ? 'Быстрая связь и вызов специалиста' : 'Quick contact & specialist call'}
	>
		<span class="ring-pulse"></span>
		<span class="trigger-icon" aria-hidden="true">
			{#if isOpen}
				<X size={20} weight="bold" />
			{:else}
				<svg class="trigger-svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
					<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
				</svg>
			{/if}
		</span>
		<span class="trigger-label"></span>
	</button>
</div>

<style>
	.widget-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.75);
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
		border: 1px solid rgba(255, 255, 255, 0.25);
		background: var(--color-electric-iris);
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
		filter: brightness(1.1);
	}

	.floating-trigger-btn.active {
		background: var(--color-surface);
		border-color: var(--border-subtle);
		transform: scale(1);
	}

	.trigger-icon {
		font-size: 1.45rem;
		line-height: 1;
		transition: transform 0.2s ease;
		color: #ffffff;
	}

	.floating-trigger-btn.active .trigger-icon {
		color: var(--color-bone-white);
		font-size: 1.15rem;
		font-weight: 400;
	}

	.ring-pulse {
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		border: 1.5px solid var(--color-electric-iris);
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



	/* Menu Popup */
	.widget-menu {
		width: 320px;
		max-width: calc(100vw - 2rem);
		padding: 1.4rem;
		background: var(--color-surface);
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
		margin-bottom: 0.85rem;
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
		background: var(--color-electric-iris);
		box-shadow: 0 0 6px var(--color-electric-iris);
		animation: blink 1.5s infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.status-text {
		font-size: 0.74rem;
		font-weight: 600;
		color: var(--color-silver-mist);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.menu-close-btn {
		background: transparent;
		border: none;
		color: var(--color-ash-gray);
		font-size: 0.9rem;
		cursor: pointer;
		width: 26px;
		height: 26px;
		min-width: 26px;
		min-height: 26px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s ease;
	}

	.menu-close-btn:hover {
		background: var(--color-surface-hover);
		color: var(--color-bone-white);
	}

	.menu-items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 0.95rem;
		min-height: 44px;
		background: var(--color-surface-hover);
		border: 1px solid var(--border-subtle);
		border-radius: 14px;
		color: var(--color-bone-white);
		text-align: left;
		cursor: pointer;
		transition: all 0.18s ease;
		width: 100%;
		outline: none;
		text-decoration: none;
	}

	.menu-item:hover {
		border-color: var(--color-electric-iris);
		transform: translateX(-2px);
	}

	.item-icon-wrap {
		width: 34px;
		height: 34px;
		min-width: 34px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.1rem;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border-subtle);
	}

	.item-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		overflow: hidden;
	}

	.item-title {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-bone-white);
		line-height: 1.2;
	}

	.item-detail {
		font-size: 0.74rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.item-arrow {
		color: var(--color-ash-gray);
		font-size: 0.82rem;
		transition: transform 0.15s ease, color 0.15s ease;
	}

	.menu-item:hover .item-arrow {
		color: var(--color-electric-iris);
		transform: translateX(2px);
	}

	.call-action {
		border-color: rgba(128, 82, 255, 0.35);
		background: rgba(128, 82, 255, 0.08);
	}

	.call-action:hover {
		border-color: rgba(128, 82, 255, 0.7);
		background: rgba(128, 82, 255, 0.16);
	}

	.call-icon {
		background: rgba(128, 82, 255, 0.2);
	}

	.tg-icon {
		color: #29b6f6;
		background: rgba(0, 136, 204, 0.14);
	}

	.tg-action:hover {
		border-color: #0088cc;
	}

	.insta-icon {
		color: #ffffff;
		background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
	}

	.insta-action:hover {
		border-color: #e1306c;
	}

	.viber-icon {
		color: #a797ff;
		background: rgba(115, 96, 242, 0.16);
	}

	.viber-action:hover {
		border-color: #7360f2;
	}

	.phone-icon {
		color: #34d399;
		background: rgba(16, 185, 129, 0.14);
	}

	.phone-action:hover {
		border-color: #10b981;
	}

	.office-icon {
		color: #fbbf24;
		background: rgba(245, 158, 11, 0.14);
	}

	.office-action:hover {
		border-color: #f59e0b;
	}

	.brand-svg,
	.trigger-svg {
		display: block;
		flex-shrink: 0;
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
