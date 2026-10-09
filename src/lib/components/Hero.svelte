<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { Sparkle, PhoneCall, Calculator, ShieldCheck, Clock, Flask, Lightning, CheckCircle } from 'phosphor-svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let hero = $derived(currentContent.hero);
</script>

<section id="hero" class="hero-section">
	<div class="container hero-container">
		<!-- Top Trust Badge -->
		<div class="hero-header-box">
			<div class="section-badge hero-badge saffron-badge" style="display: inline-flex; align-items: center; gap: 0.35rem;">
				<Sparkle size={14} weight="fill" />
				<span>{hero.badge}</span>
			</div>

			<h1 class="hero-title">
				<span class="hero-title-main">{hero.titleMain}</span>
				<span class="hero-title-sub">{hero.titleHighlight}</span>
			</h1>

			<p class="hero-subtitle">
				{hero.subtitle}
			</p>

			<!-- Quick CTAs -->
			<div class="hero-actions">
				<button
					type="button"
					class="btn btn-primary btn-lg"
					data-testid="hero-call-btn"
					onclick={() =>
						orderModal.open({
							serviceTitle:
								langState.current === 'ua'
									? 'Виклик спеціаліста'
									: langState.current === 'ru'
									? 'Вызов специалиста'
									: 'Call a specialist'
						})}
				>
					<Lightning size={18} weight="fill" />
					<span>{hero.ctaPrimary}</span>
				</button>

				<a
					href={resolve('/calculator')}
					class="btn btn-secondary btn-lg"
					data-testid="hero-calc-link"
				>
					<Calculator size={18} weight="bold" />
					<span>{hero.ctaSecondary}</span>
				</a>

				<a
					href="tel:{currentContent.phones.mobile}"
					class="btn btn-ghost btn-lg hero-phone-cta"
					data-testid="hero-phone-link"
				>
					<PhoneCall size={18} weight="bold" />
					<span>{currentContent.phones.mobileDisplay}</span>
				</a>
			</div>
		</div>

		<!-- Promotional Hero Visual Showcase -->
		<div class="hero-banner-wrapper">
			<div class="hero-banner-frame">
				<img
					src="{asset('images/hero-main.webp')}"
					alt="{hero.titleMain} — {currentContent.companyName}"
					class="hero-banner-img"
					data-testid="hero-promo-image"
					width="1376"
					height="768"
					loading="eager"
					fetchpriority="high"
				/>

				<div class="hero-banner-overlay" aria-hidden="true"></div>

				<!-- Floating feature badges at bottom of the banner -->
				<div class="hero-banner-pills">
					<div class="banner-pill">
						<ShieldCheck size={16} weight="duotone" />
						<span>
							{#if langState.current === 'ua'}100% гарантія за договором{:else if langState.current === 'ru'}100% гарантия по договору{:else}100% contract warranty{/if}
						</span>
					</div>
					<div class="banner-pill">
						<Clock size={16} weight="duotone" />
						<span>
							{#if langState.current === 'ua'}Виїзд від 30–45 хв{:else if langState.current === 'ru'}Выезд от 30–45 мин{:else}Arrival in 30–45 min{/if}
						</span>
					</div>
					<div class="banner-pill">
						<Flask size={16} weight="duotone" />
						<span>
							{#if langState.current === 'ua'}Сертифіковано МОЗ України{:else if langState.current === 'ru'}Сертифицировано МОЗ Украины{:else}Ministry of Health certified{/if}
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 3 Core Triggers / Value Props -->
		<div class="hero-triggers-grid">
			{#each hero.triggers as trg, idx}
				<div class="trigger-card glass-card">
					<div class="trigger-card-header">
						<span class="trigger-check">
							<CheckCircle size={18} weight="fill" color="var(--color-electric-iris)" />
						</span>
						<h3 class="trigger-title">{trg.title}</h3>
					</div>
					<p class="trigger-desc">{trg.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		z-index: 1;
		background: transparent;
		padding: clamp(2.5rem, 5vh, 4.5rem) 0 clamp(3.5rem, 6vh, 5rem);
		border-bottom: 1px solid var(--color-void-border);
		overflow: hidden;
	}

	.hero-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2.2rem;
	}

	.hero-header-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 960px;
		margin: 0 auto;
	}

	.hero-badge {
		margin-bottom: 1.25rem;
	}

	.hero-title {
		font-size: clamp(2.1rem, 4.4vw, 3.6rem);
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.03em;
		color: var(--color-bone-white);
		margin-bottom: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.hero-title-sub {
		color: var(--color-electric-iris);
		background: linear-gradient(135deg, #a78bfa 0%, #8052ff 50%, #6366f1 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	:global(html[data-theme="light"]) .hero-title-sub {
		color: #6366f1;
		background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-subtitle {
		font-size: clamp(1rem, 1.35vw, 1.18rem);
		font-weight: 350;
		line-height: 1.65;
		color: var(--color-ash-gray);
		max-width: 820px;
		margin-bottom: 2rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.9rem;
	}

	.hero-actions .btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.85rem 1.6rem;
		font-size: 0.95rem;
	}

	.hero-phone-cta {
		border: 1px solid var(--border-subtle);
		background: rgba(255, 255, 255, 0.04);
		color: var(--color-bone-white);
	}

	.hero-phone-cta:hover {
		border-color: var(--color-electric-iris);
		background: rgba(128, 82, 255, 0.12);
		color: #ffffff;
	}

	/* Hero Promotional Banner */
	.hero-banner-wrapper {
		width: 100%;
		max-width: 1140px;
		margin-top: 0.5rem;
	}

	.hero-banner-frame {
		position: relative;
		width: 100%;
		border-radius: var(--radius-cards);
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: #09090b;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(128, 82, 255, 0.18);
		aspect-ratio: 16 / 9;
	}

	:global(html[data-theme="light"]) .hero-banner-frame {
		border-color: rgba(99, 102, 241, 0.25);
		box-shadow: 0 16px 40px rgba(15, 23, 42, 0.14), 0 0 25px rgba(99, 102, 241, 0.12);
	}

	.hero-banner-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-banner-frame:hover .hero-banner-img {
		transform: scale(1.02);
	}

	.hero-banner-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.05) 0%,
			transparent 55%,
			rgba(0, 0, 0, 0.75) 100%
		);
		pointer-events: none;
	}

	.hero-banner-pills {
		position: absolute;
		bottom: 1.25rem;
		left: 1.25rem;
		right: 1.25rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		z-index: 2;
	}

	.banner-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.95rem;
		border-radius: var(--radius-full);
		font-size: 0.82rem;
		font-weight: 600;
		color: #ffffff;
		background: rgba(13, 17, 28, 0.75);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
	}

	/* 3 Triggers Grid */
	.hero-triggers-grid {
		width: 100%;
		max-width: 1140px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-top: 0.5rem;
	}

	.trigger-card {
		padding: 1.35rem 1.45rem;
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.trigger-card:hover {
		transform: translateY(-2px);
		border-color: rgba(128, 82, 255, 0.4);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
	}

	.trigger-card-header {
		display: flex;
		align-items: center;
		gap: 0.55rem;
	}

	.trigger-title {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--color-bone-white);
	}

	.trigger-desc {
		font-size: 0.84rem;
		line-height: 1.5;
		color: var(--color-ash-gray);
	}

	@media (max-width: 900px) {
		.hero-triggers-grid {
			grid-template-columns: 1fr;
			gap: 0.85rem;
		}

		.hero-banner-pills {
			bottom: 0.85rem;
			left: 0.85rem;
			right: 0.85rem;
		}

		.banner-pill {
			font-size: 0.76rem;
			padding: 0.35rem 0.75rem;
		}
	}

	@media (max-width: 600px) {
		.hero-actions {
			flex-direction: column;
			width: 100%;
		}

		.hero-actions .btn {
			width: 100%;
		}

		.hero-banner-pills {
			display: none;
		}
	}
</style>
