<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { BETA_TABS } from '../../lib/beta/checklist';
	import {
		doneOnVersion,
		generateReport,
		readMarks,
		sortChecks,
		tid,
		vote,
		VOTES
	} from '../../lib/beta/progress';
	import type { BetaCheck, ChecklistLang, Coverage, Marks, Vote } from '../../lib/beta/types';

	const APP_VERSION = '0.0.1';
	const STORAGE_KEY = 'ozon_dez_beta_checklist_marks';

	const isBrowser = typeof window !== 'undefined';

	let checklistLang = $state<ChecklistLang>('uk');
	let marks = $state<Marks>({});
	let armedClear = $state(false);
	let clearTimer: ReturnType<typeof setTimeout> | undefined;

	let reportCopied = $state(false);
	let reportFailed = $state(false);
	let reportText = $state('');

	const allChecks = $derived(BETA_TABS.flatMap((t: any) => t.checks));
	const knownIds = $derived(new Set(allChecks.map((c: any) => c.id)));

	// Read active tab from query parameter ?tab=... or default to first tab
	let activeTabId = $state(BETA_TABS[0].id);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const param = page.url.searchParams.get('tab');
			if (param && BETA_TABS.some((t: any) => t.id === param)) {
				activeTabId = param;
			}
		}
	});

	// Load stored marks on client mount safely
	$effect(() => {
		if (typeof window !== 'undefined') {
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				if (raw) {
					marks = readMarks(JSON.parse(raw), knownIds);
				}
			} catch {
				marks = {};
			}
		}
	});

	function selectTab(id: string) {
		activeTabId = id;
		if (typeof window !== 'undefined') {
			const url = new URL(page.url.href);
			url.searchParams.set('tab', id);
			replaceState(url.href, page.state);
		}
	}

	function handleVote(checkId: string, nextVote: Vote) {
		marks = vote(marks, checkId, nextVote, APP_VERSION);
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
			} catch {
				// storage write fallback
			}
		}
	}

	function handleClear() {
		clearTimeout(clearTimer);
		if (!armedClear) {
			armedClear = true;
			clearTimer = setTimeout(() => {
				armedClear = false;
			}, 5000);
			return;
		}
		armedClear = false;
		marks = {};
		if (isBrowser) {
			try {
				localStorage.removeItem(STORAGE_KEY);
			} catch {
				// storage clear
			}
		}
	}

	$effect(() => () => clearTimeout(clearTimer));

	async function copyReport() {
		reportText = generateReport({
			version: APP_VERSION,
			lang: checklistLang,
			theme: 'dark',
			userAgent: isBrowser ? navigator.userAgent : 'Server',
			checks: allChecks,
			marks
		});

		reportCopied = false;
		reportFailed = false;

		if (isBrowser && navigator.clipboard && navigator.clipboard.writeText) {
			try {
				await navigator.clipboard.writeText(reportText);
				reportCopied = true;
				setTimeout(() => {
					reportCopied = false;
				}, 4000);
				return;
			} catch {
				reportFailed = true;
			}
		} else {
			reportFailed = true;
		}
	}

	function toggleLang() {
		checklistLang = checklistLang === 'uk' ? 'en' : 'uk';
	}

	const currentTab = $derived(BETA_TABS.find((t: any) => t.id === activeTabId) ?? BETA_TABS[0]);
	const currentChecks = $derived(sortChecks(currentTab.checks));

	const totalDone = $derived(doneOnVersion(allChecks, marks, APP_VERSION));
	const currentTabDone = $derived(doneOnVersion(currentTab.checks, marks, APP_VERSION));

	// Group checks by coverage level
	const manualChecks = $derived(currentChecks.filter((c: any) => c.coverage === 'manual'));
	const testableChecks = $derived(currentChecks.filter((c: any) => c.coverage === 'testable'));
	const coveredChecks = $derived(currentChecks.filter((c: any) => c.coverage === 'covered'));

	const voteLabels: Record<ChecklistLang, Record<Vote, string>> = {
		uk: {
			ok: 'Працює',
			fail: 'Не працює',
			unclear: 'Не зрозуміло',
			skip: 'Пропустити'
		},
		en: {
			ok: 'Works',
			fail: 'Broken',
			unclear: 'Unclear',
			skip: 'Skip'
		}
	};
</script>

<svelte:head>
	<title>{checklistLang === 'uk' ? 'Чеклист бета-тестування' : 'Beta Test Checklist'} — OZON-DEZ</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="beta-page-container">
	<header class="beta-header glass-card">
		<div class="beta-header-top">
			<div class="beta-title-block">
				<div class="beta-badge">QA BETA SUITE v10</div>
				<h1 class="beta-title">
					{#if checklistLang === 'uk'}
						Чеклист перевірки якості сайту
					{:else}
						Quality Beta Testing Checklist
					{/if}
				</h1>
				<div class="beta-meta-row">
					<span class="beta-meta-pill">
						Версія: <strong data-testid="beta-version-text">{APP_VERSION}</strong>
					</span>
					<span class="beta-meta-pill">
						Поступ вкладки: <strong>{currentTabDone} / {currentTab.checks.length}</strong>
					</span>
					<span class="beta-meta-pill highlight">
						Загальний поступ: <strong data-testid="beta-progress-value">{totalDone} / {allChecks.length}</strong>
					</span>
				</div>
			</div>

			<div class="beta-header-actions">
				<button
					type="button"
					class="btn-beta-lang"
					data-testid="beta-lang-btn"
					onclick={toggleLang}
					title="Перемкнути мову чеклиста"
				>
					🌐 {checklistLang.toUpperCase()}
				</button>
				<a
					href={resolve('/')}
					data-testid="beta-home-link"
					class="btn-beta-home"
					target="_blank"
					rel="noreferrer"
				>
					↗ {checklistLang === 'uk' ? 'Відкрити сайт' : 'Open Website'}
				</a>
			</div>
		</div>

		<!-- Screen / Target routes links for active tab -->
		<div class="beta-screens-bar" data-sveltekit-preload-data="off">
			<span class="beta-screens-label">
				{#if checklistLang === 'uk'}Цільові екрани:{:else}Target routes:{/if}
			</span>
			<div class="beta-screens-chips">
				{#each currentTab.routes as routePath}
					<a
						href={resolve(routePath as any)}
						target="_blank"
						rel="noreferrer"
						class="beta-screen-badge"
						data-testid="beta-screen-{routePath.replace('/', '') || 'root'}-link"
					>
						🔗 {routePath === '/' ? 'Головна (/)' : routePath}
					</a>
				{/each}
			</div>
		</div>

		<!-- Tabs bar with progress -->
		<nav class="beta-tabs-nav" aria-label="Розділи чеклиста">
			{#each BETA_TABS as tab (tab.id)}
				{@const tabDone = doneOnVersion(tab.checks, marks, APP_VERSION)}
				<button
					type="button"
					class="beta-tab-btn"
					class:active={activeTabId === tab.id}
					aria-pressed={activeTabId === tab.id}
					data-testid="beta-tab-{tab.id}-btn"
					onclick={() => selectTab(tab.id)}
				>
					<span class="tab-title">{tab.title[checklistLang]}</span>
					<span class="tab-progress-badge" data-testid="beta-tab-{tab.id}-progress-text">
						{tabDone}/{tab.checks.length}
					</span>
				</button>
			{/each}
		</nav>
	</header>

	<!-- Main Checks Container -->
	<main class="beta-main-content">
		{#if currentChecks.length === 0}
			<div class="beta-empty-card glass-card">
				<p>тут поки нічого</p>
			</div>
		{:else}
			<!-- Level 1: Manual Checks -->
			{#if manualChecks.length > 0}
				<section class="beta-level-section" data-testid="beta-level-manual-section">
					<div class="beta-level-header">
						<div class="level-indicator manual-indicator"></div>
						<div>
							<h2 class="level-title">
								{#if checklistLang === 'uk'}
									Тільки людина · {manualChecks.length}
								{:else}
									Manual Only · {manualChecks.length}
								{/if}
							</h2>
							<p class="level-subtitle">
								{#if checklistLang === 'uk'}
									Машина цього не побачить. Починайте звідси.
								{:else}
									Automated tools cannot verify this. Start here.
								{/if}
							</p>
						</div>
					</div>

					<div class="beta-cards-grid">
						{#each manualChecks as check, index (check.id)}
							{@render checkCard(check, index + 1)}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Level 2: Testable Checks -->
			{#if testableChecks.length > 0}
				<section class="beta-level-section" data-testid="beta-level-testable-section">
					<div class="beta-level-header">
						<div class="level-indicator testable-indicator"></div>
						<div>
							<h2 class="level-title">
								{#if checklistLang === 'uk'}
									Можна покрити тестом · {testableChecks.length}
								{:else}
									Testable · {testableChecks.length}
								{/if}
							</h2>
							<p class="level-subtitle">
								{#if checklistLang === 'uk'}
									Беклог автоматичних перевірок.
								{:else}
									Backlog for automated test coverage.
								{/if}
							</p>
						</div>
					</div>

					<div class="beta-cards-grid">
						{#each testableChecks as check, index (check.id)}
							{@render checkCard(check, manualChecks.length + index + 1)}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Level 3: Covered Checks -->
			{#if coveredChecks.length > 0}
				<section class="beta-level-section" data-testid="beta-level-covered-section">
					<div class="beta-level-header">
						<div class="level-indicator covered-indicator"></div>
						<div>
							<h2 class="level-title">
								{#if checklistLang === 'uk'}
									Покрито автотестом · {coveredChecks.length}
								{:else}
									Covered by Tests · {coveredChecks.length}
								{/if}
							</h2>
							<p class="level-subtitle">
								{#if checklistLang === 'uk'}
									Контрольна група перевірок.
								{:else}
									Control group verified by test suites.
								{/if}
							</p>
						</div>
					</div>

					<div class="beta-cards-grid">
						{#each coveredChecks as check, index (check.id)}
							{@render checkCard(check, manualChecks.length + testableChecks.length + index + 1)}
						{/each}
					</div>
				</section>
			{/if}
		{/if}
	</main>

	<!-- Footer Toolbar (Report & Clear) -->
	<footer class="beta-toolbar glass-card">
		<div class="toolbar-left">
			<button
				type="button"
				class="btn-report-export"
				data-testid="beta-report-btn"
				onclick={copyReport}
			>
				📋 {checklistLang === 'uk' ? 'Копіювати звіт у буфер' : 'Copy Report to Clipboard'}
			</button>

			{#if reportCopied}
				<span class="report-status-badge success" data-testid="beta-report-hint">
					✓ {checklistLang === 'uk' ? 'Звіт скопійовано!' : 'Report copied!'}
				</span>
			{/if}

			{#if reportFailed}
				<span class="report-status-badge fail" data-testid="beta-report-failed-hint">
					⚠️ {checklistLang === 'uk' ? 'Буфер недоступний. Скопіюйте текст нижче:' : 'Clipboard unavailable. Copy manually below:'}
				</span>
			{/if}
		</div>

		<div class="toolbar-right">
			<button
				type="button"
				class="btn-clear-marks"
				class:armed={armedClear}
				data-testid="beta-clear-btn"
				onclick={handleClear}
			>
				{#if armedClear}
					⚠️ {checklistLang === 'uk' ? 'Підтвердіть: стерти всі позначки?' : 'Confirm: erase all marks?'}
				{:else}
					🗑️ {checklistLang === 'uk' ? 'Скинути позначки' : 'Reset Marks'}
				{/if}
			</button>
		</div>

		{#if reportFailed || reportText}
			<div class="report-textarea-container">
				<textarea
					readonly
					class="report-textarea"
					data-testid="beta-report-textarea"
					rows="8"
					bind:value={reportText}
				></textarea>
			</div>
		{/if}
	</footer>
</div>

<!-- Reusable Check Card Snippet -->
{#snippet checkCard(check: BetaCheck, displayIndex: number)}
	{@const tId = tid(check.id)}
	{@const mark = marks[check.id]}
	{@const currentVote = mark?.vote}
	{@const isStale = mark && mark.version !== APP_VERSION}

	<article
		class="check-card glass-card"
		class:voted-ok={currentVote === 'ok'}
		class:voted-fail={currentVote === 'fail'}
		class:voted-unclear={currentVote === 'unclear'}
		class:voted-skip={currentVote === 'skip'}
		data-testid="beta-check-{tId}-item"
	>
		<div class="check-card-header">
			<div class="check-number-badge">#{displayIndex}</div>
			<div class="check-category-pill" data-testid="beta-check-{tId}-category-text">
				{check.category[checklistLang]}
			</div>
			{#if check.negative}
				<span class="boundary-pill">
					{checklistLang === 'uk' ? '⚠️ Межа / Ліміт' : '⚠️ Boundary'}
				</span>
			{/if}
			{#if isStale}
				<span class="stale-pill" data-testid="beta-check-{tId}-stale-hint">
					{checklistLang === 'uk' ? `позначено на іншій версії: ${mark.version}` : `marked on version: ${mark.version}`}
				</span>
			{/if}
		</div>

		<p class="check-description" data-testid="beta-check-{tId}-text">
			{check.text[checklistLang]}
		</p>

		{#if check.coverage === 'covered' && check.test}
			<div class="check-test-file">
				🧪 {check.test}
			</div>
		{/if}

		<!-- 4 Vote Buttons in fixed order: ok -> fail -> unclear -> skip -->
		<div class="vote-buttons-row">
			{#each VOTES as v}
				{@const isPicked = currentVote === v}
				<button
					type="button"
					class="vote-btn vote-{v}"
					class:picked={isPicked}
					aria-pressed={isPicked}
					data-testid="beta-vote-{tId}-{v}-btn"
					onclick={() => handleVote(check.id, v)}
				>
					<span class="vote-icon">
						{#if v === 'ok'}✓{:else if v === 'fail'}✕{:else if v === 'unclear'}?{:else}⏭{/if}
					</span>
					<span class="vote-label">{voteLabels[checklistLang][v]}</span>
				</button>
			{/each}
		</div>
	</article>
{/snippet}

<style>
	:global(:root) {
		--vote-ok: #22c55e;
		--vote-fail: #ef4444;
		--vote-unclear: #fbbf24;
		--vote-skip: #38bdf8;
	}

	.beta-page-container {
		max-width: 1240px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-height: 100vh;
	}

	/* Header */
	.beta-header {
		padding: 2rem;
		border-radius: var(--radius-cards);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		background: rgba(13, 17, 28, 0.7);
		backdrop-filter: blur(14px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.beta-header-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.beta-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: rgba(128, 82, 255, 0.2);
		border: 1px solid rgba(128, 82, 255, 0.5);
		color: #c084fc;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		margin-bottom: 0.5rem;
	}

	.beta-title {
		font-size: 1.85rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 0.8rem;
		font-family: var(--font-heading);
	}

	.beta-meta-row {
		display: flex;
		gap: 0.8rem;
		flex-wrap: wrap;
	}

	.beta-meta-pill {
		padding: 0.35rem 0.8rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius-buttons);
		font-size: 0.82rem;
		color: var(--color-silver-mist);
	}

	.beta-meta-pill.highlight strong {
		color: #38bdf8;
	}

	.beta-header-actions {
		display: flex;
		gap: 0.8rem;
		align-items: center;
	}

	.btn-beta-lang,
	.btn-beta-home {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		min-width: 44px;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: #ffffff;
		border-radius: var(--radius-buttons);
		font-size: 0.88rem;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.btn-beta-lang:hover,
	.btn-beta-home:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: #ffffff;
	}

	/* Screen links bar (§ 8.4) */
	.beta-screens-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		padding-top: 0.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.beta-screens-label {
		font-size: 0.82rem;
		color: var(--color-ash-gray);
		font-weight: 500;
	}

	.beta-screens-chips {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.beta-screen-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 0.4rem 1rem;
		background: rgba(56, 189, 248, 0.08);
		border: 1px solid rgba(56, 189, 248, 0.3);
		color: #38bdf8;
		border-radius: var(--radius-buttons);
		font-size: 0.82rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.beta-screen-badge:hover {
		background: rgba(56, 189, 248, 0.2);
		border-color: #38bdf8;
		transform: translateY(-1px);
	}

	/* Tabs Bar */
	.beta-tabs-nav {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		padding-top: 0.5rem;
	}

	.beta-tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		min-height: 44px;
		padding: 0.5rem 1.1rem;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.09);
		color: var(--color-silver-mist);
		border-radius: var(--radius-buttons);
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.beta-tab-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.beta-tab-btn.active {
		background: var(--color-electric-iris);
		border-color: var(--color-electric-iris);
		color: #ffffff;
		box-shadow: 0 4px 15px rgba(128, 82, 255, 0.35);
	}

	.tab-progress-badge {
		font-size: 0.75rem;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.3);
	}

	/* Main Content */
	.beta-main-content {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.beta-level-section {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.beta-level-header {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.level-indicator {
		width: 4px;
		height: 38px;
		border-radius: 2px;
	}

	.manual-indicator {
		background: #8052ff;
	}

	.testable-indicator {
		background: #fbbf24;
	}

	.covered-indicator {
		background: #22c55e;
	}

	.level-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0;
	}

	.level-subtitle {
		font-size: 0.82rem;
		color: var(--color-ash-gray);
		margin: 0.2rem 0 0;
	}

	.beta-cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 1.2rem;
	}

	@media (max-width: 640px) {
		.beta-cards-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Check Card with 2px dynamic border */
	.check-card {
		padding: 1.4rem;
		border-radius: var(--radius-cards);
		background: rgba(13, 17, 28, 0.6);
		backdrop-filter: blur(8px);
		border: 2px solid rgba(255, 255, 255, 0.08);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition: border-color 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease;
	}

	.check-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	/* Border 2px per selected vote state (§ 2) */
	.check-card.voted-ok {
		border-color: var(--vote-ok);
	}

	.check-card.voted-fail {
		border-color: var(--vote-fail);
	}

	.check-card.voted-unclear {
		border-color: var(--vote-unclear);
	}

	.check-card.voted-skip {
		border-color: var(--vote-skip);
	}

	.check-card-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.check-number-badge {
		font-size: 0.75rem;
		font-weight: 800;
		color: var(--color-silver-mist);
		background: rgba(255, 255, 255, 0.08);
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
	}

	.check-category-pill {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #c084fc;
		background: rgba(128, 82, 255, 0.12);
		padding: 0.2rem 0.55rem;
		border-radius: 4px;
	}

	.boundary-pill {
		font-size: 0.72rem;
		font-weight: 700;
		color: #fbbf24;
		background: rgba(251, 191, 36, 0.12);
		border: 1px solid rgba(251, 191, 36, 0.3);
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
	}

	.stale-pill {
		font-size: 0.72rem;
		color: #94a3b8;
		background: rgba(148, 163, 184, 0.12);
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
	}

	.check-description {
		font-size: 0.94rem;
		line-height: 1.55;
		color: var(--color-bone-white);
		margin: 0;
		flex: 1;
	}

	.check-test-file {
		font-size: 0.75rem;
		font-family: monospace;
		color: #86efac;
		background: rgba(34, 197, 94, 0.08);
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
	}

	/* Vote buttons in fixed order: ok -> fail -> unclear -> skip */
	.vote-buttons-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.4rem;
		margin-top: auto;
	}

	.vote-btn {
		min-height: 44px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.15rem;
		padding: 0.35rem 0.4rem;
		border-radius: 6px;
		font-size: 0.72rem;
		font-weight: 600;
		cursor: pointer;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		color: var(--color-silver-mist);
		transition: all 0.2s ease;
	}

	.vote-icon {
		font-size: 0.85rem;
	}

	/* Neutral hover tint before selection (§ 2) */
	.vote-btn.vote-ok:hover {
		background: rgba(34, 197, 94, 0.12);
		border-color: var(--vote-ok);
		color: #ffffff;
	}

	.vote-btn.vote-fail:hover {
		background: rgba(239, 68, 68, 0.12);
		border-color: var(--vote-fail);
		color: #ffffff;
	}

	.vote-btn.vote-unclear:hover {
		background: rgba(251, 191, 36, 0.12);
		border-color: var(--vote-unclear);
		color: #ffffff;
	}

	.vote-btn.vote-skip:hover {
		background: rgba(56, 189, 248, 0.12);
		border-color: var(--vote-skip);
		color: #ffffff;
	}

	/* Picked state: 4px outline and saturated background (§ 2) */
	.vote-btn.vote-ok.picked {
		background: #15803d;
		border-color: #22c55e;
		outline: 4px solid rgba(34, 197, 94, 0.35);
		color: #ffffff;
		font-weight: 700;
	}

	.vote-btn.vote-fail.picked {
		background: #b91c1c;
		border-color: #ef4444;
		outline: 4px solid rgba(239, 68, 68, 0.35);
		color: #ffffff;
		font-weight: 700;
	}

	.vote-btn.vote-unclear.picked {
		background: #b45309;
		border-color: #fbbf24;
		outline: 4px solid rgba(251, 191, 36, 0.35);
		color: #ffffff;
		font-weight: 700;
	}

	.vote-btn.vote-skip.picked {
		background: #0369a1;
		border-color: #38bdf8;
		outline: 4px solid rgba(56, 189, 248, 0.35);
		color: #ffffff;
		font-weight: 700;
	}

	/* Toolbar */
	.beta-toolbar {
		padding: 1.5rem 2rem;
		border-radius: var(--radius-cards);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		background: rgba(13, 17, 28, 0.85);
		backdrop-filter: blur(14px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.toolbar-left {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.btn-report-export {
		min-height: 44px;
		padding: 0.6rem 1.4rem;
		background: linear-gradient(135deg, #8052ff, #6366f1);
		border: none;
		border-radius: var(--radius-buttons);
		color: #ffffff;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 4px 15px rgba(128, 82, 255, 0.3);
		transition: all 0.2s ease;
	}

	.btn-report-export:hover {
		transform: translateY(-1px);
		box-shadow: 0 6px 20px rgba(128, 82, 255, 0.45);
	}

	.report-status-badge {
		font-size: 0.85rem;
		font-weight: 600;
		padding: 0.35rem 0.8rem;
		border-radius: 6px;
	}

	.report-status-badge.success {
		color: #86efac;
		background: rgba(34, 197, 94, 0.15);
	}

	.report-status-badge.fail {
		color: #fca5a5;
		background: rgba(239, 68, 68, 0.15);
	}

	.btn-clear-marks {
		min-height: 44px;
		padding: 0.6rem 1.2rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius-buttons);
		color: var(--color-silver-mist);
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-clear-marks:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.btn-clear-marks.armed {
		background: #dc2626;
		border-color: #ef4444;
		color: #ffffff;
		animation: pulseRed 1s infinite alternate;
	}

	@keyframes pulseRed {
		0% {
			box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
		}
		100% {
			box-shadow: 0 0 14px 4px rgba(239, 68, 68, 0.6);
		}
	}

	.report-textarea-container {
		width: 100%;
		margin-top: 1rem;
	}

	.report-textarea {
		width: 100%;
		background: #090d16;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 8px;
		padding: 1rem;
		color: #e2e8f0;
		font-family: monospace;
		font-size: 0.85rem;
		resize: vertical;
	}

	.beta-empty-card {
		padding: 3rem;
		text-align: center;
		color: var(--color-ash-gray);
		font-size: 1.1rem;
	}
</style>
