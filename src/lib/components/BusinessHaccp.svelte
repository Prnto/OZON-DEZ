<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';
	import { orderModal } from '../state/modal.svelte';

	let currentContent = $derived(contentMap[langState.current]);
	let b2b = $derived(currentContent.b2bSection);
</script>

<section id="b2b" class="section b2b-section">
	<div class="container">
		<div class="b2b-hero-banner">
			<!-- Background Image: authentic HACCP restaurant kitchen audit -->
			<div class="b2b-banner-bg">
				<img
					src={asset('images/b2b-haccp-audit.jpg')}
					alt="Санітарний аудит ресторанів та підприємств за нормами HACCP"
					class="b2b-bg-image"
					loading="eager"
				/>
				<!-- Semi-matte frosted overlay with dark gradient and backdrop-blur -->
				<div class="b2b-matte-overlay"></div>
			</div>

			<!-- Content on top of background -->
			<div class="b2b-banner-content">
				<!-- Breadcrumbs -->
				<nav class="breadcrumbs" aria-label="Хлібні крихти">
					<a href={resolve('/')} class="crumb-link">
						{#if langState.current === 'ua'}Головна{:else}Главная{/if}
					</a>
					<span class="crumb-sep">/</span>
					<span class="crumb-current">{currentContent.nav.b2b}</span>
				</nav>

				<!-- Header Group -->
				<div class="b2b-header-group">
					<div class="badge-row">
						<span class="section-badge dark">{b2b.badge}</span>
						<span class="haccp-compliance-tag">
							<span class="tag-dot"></span>
							{b2b.floatingTag.badge} • {b2b.floatingTag.text}
						</span>
					</div>
					<h1 class="b2b-main-title">{b2b.title}</h1>
					<p class="b2b-intro-text">{b2b.subtitle}</p>
				</div>

				<!-- Semi-Matte Card with Description & Key Points -->
				<div class="b2b-matte-card">
					<div class="b2b-paragraphs">
						<p>{b2b.content1}</p>
						<p>{b2b.content2}</p>
					</div>

					<!-- 4 Key Points Grid -->
					<div class="points-grid">
						{#each b2b.points as pt}
							<div class="point-item">
								<div class="point-icon">📋</div>
								<div class="point-text">
									<h3 class="point-title">{pt.title}</h3>
									<p class="point-desc">{pt.desc}</p>
								</div>
							</div>
						{/each}
					</div>

					<!-- Bottom Row: Stats & Action Buttons -->
					<div class="b2b-bottom-row">
						<div class="b2b-stats-bar">
							<div class="b2b-stat">
								<div class="stat-num">{b2b.stats.stat1Val}</div>
								<div class="stat-lbl">{b2b.stats.stat1Text}</div>
							</div>
							<div class="b2b-stat">
								<div class="stat-num">{b2b.stats.stat2Val}</div>
								<div class="stat-lbl">{b2b.stats.stat2Text}</div>
							</div>
						</div>

						<div class="b2b-actions">
							<button
								type="button"
								class="btn btn-primary btn-lg"
								onclick={() =>
									orderModal.open({
										serviceTitle: b2b.cta,
										serviceCategory: 'HoReCa & HACCP'
									})}
							>
								<span>📁 {b2b.cta}</span>
							</button>
							<a href="tel:{currentContent.phones.mobile}" class="btn btn-outline-white btn-lg">
								<span>📞 {b2b.consultBtn}</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.b2b-section {
		padding: 2.5rem 0 3.5rem;
		background: #f8fafc;
	}

	.b2b-hero-banner {
		position: relative;
		border-radius: var(--radius-xl);
		overflow: hidden;
		padding: clamp(2rem, 4.5vw, 3.8rem);
		border: 1px solid rgba(0, 212, 170, 0.35);
		box-shadow: 0 25px 60px rgba(5, 17, 36, 0.35);
		background: #061730;
	}

	.b2b-banner-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.b2b-bg-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 30%;
		display: block;
	}

	/* Semi-matte frosted overlay: dark navy gradient + soft matte blur */
	.b2b-matte-overlay {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				135deg,
				rgba(5, 18, 38, 0.91) 0%,
				rgba(8, 28, 60, 0.84) 45%,
				rgba(4, 15, 32, 0.93) 100%
			),
			radial-gradient(circle at 85% 15%, rgba(0, 212, 170, 0.18) 0%, transparent 60%);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}

	.b2b-banner-content {
		position: relative;
		z-index: 1;
		color: #ffffff;
		display: flex;
		flex-direction: column;
		gap: 1.8rem;
	}

	/* Breadcrumbs */
	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.84rem;
		font-weight: 600;
		color: #94a3b8;
		flex-wrap: wrap;
	}

	.crumb-link {
		color: #cbd5e1;
		transition: color var(--transition-fast);
		text-decoration: none;
	}

	.crumb-link:hover {
		color: var(--accent-teal);
	}

	.crumb-sep {
		color: rgba(255, 255, 255, 0.3);
	}

	.crumb-current {
		color: var(--accent-teal);
	}

	/* Header group */
	.b2b-header-group {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		max-width: 960px;
	}

	.badge-row {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		flex-wrap: wrap;
	}

	.haccp-compliance-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.35rem 0.85rem;
		border-radius: var(--radius-full);
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.18);
		font-size: 0.78rem;
		font-weight: 700;
		color: #ffffff;
		backdrop-filter: blur(8px);
	}

	.tag-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent-teal);
		box-shadow: 0 0 8px rgba(0, 212, 170, 0.8);
	}

	.b2b-main-title {
		font-size: clamp(2rem, 3.8vw, 3rem);
		font-weight: 800;
		color: #ffffff;
		line-height: 1.2;
		letter-spacing: -0.02em;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
	}

	.b2b-intro-text {
		font-size: clamp(1.05rem, 1.8vw, 1.22rem);
		font-weight: 600;
		color: #a5f3fc;
		line-height: 1.55;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
	}

	/* Frosted semi-matte inner card */
	.b2b-matte-card {
		background: rgba(8, 26, 54, 0.72);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: var(--radius-lg);
		padding: clamp(1.4rem, 3vw, 2.4rem);
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
		display: flex;
		flex-direction: column;
		gap: 1.8rem;
	}

	.b2b-paragraphs {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		font-size: 0.98rem;
		line-height: 1.65;
		color: #cbd5e1;
		max-width: 900px;
	}

	/* 4 Points Grid */
	.points-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.1rem;
	}

	@media (max-width: 768px) {
		.points-grid {
			grid-template-columns: 1fr;
		}
	}

	.point-item {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
		padding: 1.1rem 1.25rem;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all var(--transition-fast);
	}

	.point-item:hover {
		background: rgba(255, 255, 255, 0.09);
		border-color: rgba(0, 212, 170, 0.4);
		transform: translateY(-2px);
	}

	.point-icon {
		font-size: 1.35rem;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.point-title {
		font-size: 0.98rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 0.3rem;
	}

	.point-desc {
		font-size: 0.85rem;
		color: #94a3b8;
		line-height: 1.45;
	}

	/* Bottom row */
	.b2b-bottom-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.b2b-stats-bar {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.b2b-stat {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.75rem 1.2rem;
		border-radius: var(--radius-md);
		background: rgba(0, 212, 170, 0.08);
		border: 1px solid rgba(0, 212, 170, 0.25);
	}

	.b2b-stat .stat-num {
		font-family: var(--font-heading);
		font-size: 1.85rem;
		font-weight: 800;
		color: var(--accent-teal);
		line-height: 1;
	}

	.b2b-stat .stat-lbl {
		font-size: 0.78rem;
		color: #e2e8f0;
		line-height: 1.35;
		font-weight: 600;
		max-width: 170px;
	}

	.b2b-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	@media (max-width: 900px) {
		.b2b-bottom-row {
			flex-direction: column;
			align-items: stretch;
		}
		.b2b-stats-bar {
			width: 100%;
		}
		.b2b-stat {
			flex: 1;
			min-width: 220px;
		}
		.b2b-actions {
			width: 100%;
		}
		.b2b-actions .btn {
			flex: 1;
		}
	}

	@media (max-width: 480px) {
		.b2b-hero-banner {
			padding: 1.5rem 1.15rem;
			border-radius: var(--radius-lg);
		}
		.b2b-matte-card {
			padding: 1.25rem 1rem;
		}
		.b2b-actions {
			flex-direction: column;
		}
		.b2b-actions .btn {
			width: 100%;
		}
	}
</style>
