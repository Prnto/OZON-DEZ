<script lang="ts">
	import { resolve } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);

	function handleChipClick(chipText: string) {
		orderModal.open({ serviceTitle: chipText });
	}
</script>

<section id="hero" class="hero-section">
	<div class="container hero-container">
		<div class="hero-grid">
			<!-- Left Column: Typographic composition on black void -->
			<div class="hero-left">
				<!-- Saffron Spark Kicker Label from Design_2.md -->
				<div class="hero-kicker">
					<span class="kicker-spark">✦</span>
					<span class="kicker-text">ОФІЦІЙНА СЛУЖБА • ЧОРНОМОРСЬК ТА ОДЕСА</span>
					<span class="kicker-badge">15 РОКІВ</span>
				</div>

				<!-- Sculptural Display Headline (Weight 400, Negative Tracking) -->
				<h1 class="hero-title">
					{currentContent.hero.titleMain}
					<span class="hero-title-accent">{currentContent.hero.titleHighlight}</span>
				</h1>

				<!-- Ultra-light Airy Body Copy from Design_2.md -->
				<p class="hero-body">
					{currentContent.hero.subtitle}
				</p>

				<!-- Quick Pains / Problem Chips -->
				<div class="hero-chips-wrap">
					<span class="chips-label">{currentContent.hero.quickPainsLabel}</span>
					<div class="chips-list">
						{#each currentContent.hero.quickPains as pain}
							<button
								type="button"
								class="pain-chip"
								onclick={() => handleChipClick(pain)}
							>
								<span class="chip-dot"></span>
								{pain}
							</button>
						{/each}
					</div>
				</div>

				<!-- Actions: Electric Iris Pill Button + Secondary Ghost Button -->
				<div class="hero-actions">
					<a href={resolve('/calculator')} class="btn btn-primary btn-lg">
						<span>{currentContent.hero.ctaPrimary}</span>
						<span class="btn-arrow-symbol">↗</span>
					</a>
					<a
						href="tel:+380508797335"
						class="btn btn-secondary btn-lg"
					>
						<span>📞 {currentContent.hero.ctaSecondary}</span>
					</a>
				</div>

				<!-- Minimalist Trust Row -->
				<div class="hero-trust-row">
					<div class="trust-item">
						<span class="trust-val">{currentContent.hero.stats.stat1Val}</span>
						<span class="trust-lbl">{currentContent.hero.stats.stat1Label}</span>
					</div>
					<div class="trust-divider"></div>
					<div class="trust-item">
						<span class="trust-val">{currentContent.hero.stats.stat2Val}</span>
						<span class="trust-lbl">{currentContent.hero.stats.stat2Sub}</span>
					</div>
					<div class="trust-divider"></div>
					<div class="trust-item">
						<span class="trust-val">{currentContent.hero.stats.stat3Val}</span>
						<span class="trust-lbl">{currentContent.hero.stats.stat3Sub}</span>
					</div>
				</div>
			</div>

			<!-- Right Column: Interactive Sanitary Command Center on Fullpage Constellation -->
			<div class="hero-right">
				<div class="hero-command-panel glass-card">
					<!-- Top Badge Row -->
					<div class="panel-badge-row">
						<div class="constellation-badge">
							<span class="badge-dot-iris"></span>
							<span class="badge-txt">OZONE O₃ & SANITARY TECH</span>
						</div>
						<div class="live-status-pill">
							<span class="live-pulse-dot"></span>
							<span>НА ЗВ'ЯЗКУ</span>
						</div>
					</div>

					<div class="panel-card-inner">
						<div class="panel-brand-header">
							<span class="panel-kicker">{#if langState.current === 'ua'}РЕГЛАМЕНТ САНОБРОБКИ{:else}РЕГЛАМЕНТ САНОБРАБОТКИ{/if}</span>
							<h3 class="panel-title">{#if langState.current === 'ua'}Швидке замовлення виїзду{:else}Быстрый заказ выезда{/if}</h3>
							<p class="panel-desc">{#if langState.current === 'ua'}Оберіть потрібну послугу для миттєвого прорахунку та виїзду фахівця:{:else}Выберите услугу для быстрого расчета и выезда специалиста:{/if}</p>
						</div>

						<div class="panel-quick-services">
							<button type="button" class="panel-srv-btn" onclick={() => orderModal.open({ serviceTitle: 'Дезінсекція (таргани, клопи)' })}>
								<span class="srv-emoji">🪳</span>
								<div class="srv-meta">
									<span class="srv-name">{#if langState.current === 'ua'}Дезінсекція{:else}Дезинсекция{/if}</span>
									<span class="srv-detail">{#if langState.current === 'ua'}Таргани, клопи, блохи{:else}Тараканы, клопы, блохи{/if}</span>
								</div>
								<span class="srv-price">від 850 грн ↗</span>
							</button>

							<button type="button" class="panel-srv-btn" onclick={() => orderModal.open({ serviceTitle: 'Дератизація (миші, щури)' })}>
								<span class="srv-emoji">🐀</span>
								<div class="srv-meta">
									<span class="srv-name">{#if langState.current === 'ua'}Дератизація{:else}Дератизация{/if}</span>
									<span class="srv-detail">{#if langState.current === 'ua'}Миші, щури, контейнери{:else}Мыши, крысы, контейнеры{/if}</span>
								</div>
								<span class="srv-price">від 950 грн ↗</span>
							</button>

							<button type="button" class="panel-srv-btn" onclick={() => orderModal.open({ serviceTitle: 'Дезінфекція приміщень' })}>
								<span class="srv-emoji">🦠</span>
								<div class="srv-meta">
									<span class="srv-name">{#if langState.current === 'ua'}Дезінфекція{:else}Дезинфекция{/if}</span>
									<span class="srv-detail">{#if langState.current === 'ua'}Віруси, бактерії, грибок{:else}Вирусы, бактерии, грибок{/if}</span>
								</div>
								<span class="srv-price">від 850 грн ↗</span>
							</button>

							<button type="button" class="panel-srv-btn" onclick={() => orderModal.open({ serviceTitle: 'Озонування газом O3' })}>
								<span class="srv-emoji">💨</span>
								<div class="srv-meta">
									<span class="srv-name">{#if langState.current === 'ua'}Озонування O₃{:else}Озонирование O₃{/if}</span>
									<span class="srv-detail">{#if langState.current === 'ua'}Запахи, дим, стерилізація{:else}Запахи, дым, стерилизация{/if}</span>
								</div>
								<span class="srv-price">від 1 200 грн ↗</span>
							</button>
						</div>

						<!-- Direct Call action -->
						<div class="panel-call-footer">
							<a href="tel:+380508797335" class="panel-direct-call">
								<span class="call-icon">📞</span>
								<span class="call-txt">{#if langState.current === 'ua'}Здійснити виклик:{:else}Совершить вызов:{/if} <strong>+38 (050) 879-73-35</strong></span>
							</a>
						</div>
					</div>

					<!-- Bottom Badge -->
					<div class="panel-badge-bottom">
						<div class="constellation-badge">
							<span class="badge-dot-amber"></span>
							<span class="badge-txt">HACCP & ДЕРЖПРОДСПОЖИВСЛУЖБА</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		z-index: 1;
		background-color: transparent;
		padding: clamp(3.5rem, 6vh, 5.5rem) 0 clamp(4rem, 7vh, 6rem);
		overflow: hidden;
		min-height: calc(100vh - 80px);
		display: flex;
		align-items: center;
	}

	.hero-container {
		width: 100%;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: clamp(2rem, 5vw, 4.5rem);
		align-items: center;
	}

	/* Left Column */
	.hero-left {
		display: flex;
		flex-direction: column;
		z-index: 2;
	}

	.hero-kicker {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.35rem 0.85rem;
		border-radius: var(--radius-tags);
		background: rgba(255, 184, 41, 0.08);
		border: 1px solid var(--color-saffron-border);
		color: var(--color-saffron-spark);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-bottom: 1.5rem;
		align-self: flex-start;
	}

	.kicker-spark {
		color: var(--color-saffron-spark);
		font-size: 13px;
	}

	.kicker-badge {
		padding: 0.15rem 0.5rem;
		background: rgba(255, 184, 41, 0.2);
		border-radius: var(--radius-tags);
		color: #ffffff;
		font-size: 11px;
		letter-spacing: 0.05em;
	}

	.hero-title {
		font-size: clamp(2.5rem, 4.8vw, 4.6rem);
		font-weight: 400;
		line-height: 1.05;
		letter-spacing: -0.04em;
		color: var(--color-bone-white);
		margin-bottom: 1.35rem;
	}

	.hero-title-accent {
		color: #bfa6ff;
		display: block;
	}

	.hero-body {
		font-size: clamp(1.05rem, 1.4vw, 1.2rem);
		font-weight: 300;
		line-height: 1.6;
		color: var(--color-ash-gray);
		max-width: 580px;
		margin-bottom: 2rem;
	}

	/* Chips */
	.hero-chips-wrap {
		margin-bottom: 2.2rem;
	}

	.chips-label {
		display: block;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-ash-gray);
		margin-bottom: 0.65rem;
		font-weight: 500;
	}

	.chips-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.pain-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.45rem 1rem;
		border-radius: var(--radius-tags);
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		color: var(--color-silver-mist);
		font-size: 13px;
		font-weight: 400;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.chip-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-electric-iris);
	}

	.pain-chip:hover {
		border-color: var(--color-saffron-spark);
		color: var(--color-bone-white);
		background: var(--color-surface-hover);
		transform: translateY(-1px);
	}

	/* Actions */
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-bottom: 2.75rem;
	}

	.btn-arrow-symbol {
		font-size: 16px;
		margin-left: 0.2rem;
	}

	/* Trust Row */
	.hero-trust-row {
		display: flex;
		align-items: center;
		gap: clamp(1rem, 2.5vw, 2.2rem);
		padding-top: 1.8rem;
		border-top: 1px solid var(--color-void-border);
		max-width: 580px;
	}

	.trust-item {
		display: flex;
		flex-direction: column;
	}

	.trust-val {
		font-size: 1.4rem;
		font-weight: 400;
		color: var(--color-bone-white);
		letter-spacing: -0.03em;
		font-family: var(--font-heading);
	}

	.trust-lbl {
		font-size: 12px;
		color: var(--color-ash-gray);
		margin-top: 0.2rem;
		font-weight: 300;
	}

	.trust-divider {
		width: 1px;
		height: 32px;
		background: var(--color-void-border);
	}

	/* Right Column: Hero Command Panel */
	.hero-right {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-command-panel {
		position: relative;
		width: 100%;
		border-radius: var(--radius-cards);
		background: rgba(13, 13, 13, 0.75);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid var(--color-void-border);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
		box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
	}

	:global(html[data-theme="light"]) .hero-command-panel {
		background: rgba(255, 255, 255, 0.9);
		border-color: rgba(15, 23, 42, 0.08);
		box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.06);
	}

	.panel-badge-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.constellation-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.35rem 0.8rem;
		background: rgba(255, 255, 255, 0.06);
		backdrop-filter: blur(8px);
		border-radius: var(--radius-tags);
		border: 1px solid var(--color-void-border);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--color-bone-white);
	}

	:global(html[data-theme="light"]) .constellation-badge {
		background: #ffffff;
		border-color: rgba(15, 23, 42, 0.1);
		color: #1e293b;
	}

	.live-status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.3rem 0.7rem;
		border-radius: var(--radius-tags);
		background: rgba(21, 132, 110, 0.15);
		border: 1px solid rgba(21, 132, 110, 0.3);
		color: #34d399;
		font-size: 10.5px;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.live-pulse-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #10b981;
		box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
		animation: pulseDot 2s infinite;
	}

	.panel-brand-header {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.panel-kicker {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: var(--color-saffron-spark);
		text-transform: uppercase;
	}

	.panel-title {
		font-size: 1.35rem;
		font-weight: 600;
		color: var(--color-bone-white);
		margin: 0;
		letter-spacing: -0.02em;
	}

	.panel-desc {
		font-size: 13px;
		color: var(--color-ash-gray);
		line-height: 1.45;
		margin: 0;
	}

	.panel-quick-services {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 0.85rem 0;
	}

	.panel-srv-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.65rem 0.95rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--color-void-border);
		border-radius: var(--radius-md);
		color: inherit;
		text-align: left;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.panel-srv-btn:hover {
		background: rgba(128, 82, 255, 0.08);
		border-color: rgba(128, 82, 255, 0.35);
		transform: translateX(3px);
	}

	:global(html[data-theme="light"]) .panel-srv-btn {
		background: #f8fafc;
		border-color: rgba(15, 23, 42, 0.08);
	}

	:global(html[data-theme="light"]) .panel-srv-btn:hover {
		background: #f1f5f9;
		border-color: rgba(99, 66, 232, 0.3);
	}

	.srv-emoji {
		font-size: 1.35rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.srv-meta {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}

	.srv-name {
		font-size: 13.5px;
		font-weight: 600;
		color: var(--color-bone-white);
	}

	.srv-detail {
		font-size: 11.5px;
		color: var(--color-ash-gray);
	}

	.srv-price {
		font-size: 12.5px;
		font-weight: 600;
		color: var(--color-saffron-spark);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.panel-call-footer {
		margin-top: 0.5rem;
	}

	.panel-direct-call {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.7rem 1rem;
		border-radius: var(--radius-buttons);
		background: rgba(128, 82, 255, 0.12);
		border: 1px solid var(--color-iris-border);
		color: var(--color-bone-white);
		text-decoration: none;
		font-size: 13px;
		transition: all var(--transition-fast);
	}

	.panel-direct-call:hover {
		background: var(--color-electric-iris);
		color: #ffffff;
		border-color: var(--color-electric-iris);
	}

	:global(html[data-theme="light"]) .panel-direct-call {
		background: #f1f5f9;
		border-color: rgba(99, 66, 232, 0.25);
		color: #1e293b;
	}

	:global(html[data-theme="light"]) .panel-direct-call:hover {
		background: var(--color-electric-iris);
		color: #ffffff;
	}

	.panel-badge-bottom {
		display: flex;
		justify-content: center;
	}

	.badge-dot-iris {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-electric-iris);
	}

	.badge-dot-amber {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-saffron-spark);
	}

	@media (max-width: 960px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
	}

	/* Light Mode Adjustments */
	:global(html[data-theme="light"]) .hero-title-accent {
		color: #6d3ef7;
	}

	:global(html[data-theme="light"]) .constellation-badge {
		background: #ffffff;
		color: #0f172a;
		border-color: rgba(15, 23, 42, 0.1);
		box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
	}


	:global(html[data-theme="light"]) .pain-chip {
		background: #ffffff;
		border-color: rgba(15, 23, 42, 0.1);
		color: #334155;
	}

	:global(html[data-theme="light"]) .pain-chip:hover {
		background: #f1f5f9;
		border-color: var(--color-saffron-spark);
		color: #0f172a;
	}
</style>
