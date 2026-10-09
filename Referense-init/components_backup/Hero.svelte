<script lang="ts">
	import { resolve } from '$app/paths';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
</script>

<section id="hero" class="hero-section">
	<div class="container hero-container">
		<div class="hero-content">
			<!-- Верхній бейдж довіри -->
			<div class="hero-badge">
				<span class="badge-icon">🛡️</span>
				<span>
					{#if langState.current === 'ua'}
						15 РОКІВ ДОСВІДУ • ЧОРНОМОРСЬК, ОДЕСА ТА ОБЛАСТЬ
					{:else if langState.current === 'ru'}
						15 ЛЕТ ОПЫТА • ЧЕРНОМОРСК, ОДЕССА И ОБЛАСТЬ
					{:else}
						15 YEARS OF EXPERIENCE • CHORNOMORSK, ODESA & REGION
					{/if}
				</span>
			</div>

			<!-- Головний заголовок -->
			<h1 class="hero-title">
				{#if langState.current === 'ua'}
					Професійна дезінсекція, дератизація, дезінфекція та озонування
				{:else if langState.current === 'ru'}
					Профессиональная дезинсекция, дератизация, дезинфекция и озонирование
				{:else}
					Professional Disinsection, Deratization, Disinfection and Ozonation
				{/if}
			</h1>

			<!-- Опис на основі даних замовника -->
			<p class="hero-description">
				{#if langState.current === 'ua'}
					ТОВ «ОЗОН-ДЕЗ» — служба санітарної безпеки для фізичних та юридичних осіб.
					Знищення комах (тарганів, бліх, кліщів, комарів), гризунів (щурів, мишей),
					знезараження поверхонь, ємностей і води, а також комплексний Пест-контроль.
				{:else if langState.current === 'ru'}
					ООО «ОЗОН-ДЕЗ» — служба санитарной безопасности для физических и юридических лиц.
					Уничтожение насекомых (тараканов, блох, клещей, комаров), грызунов (крыс, мышей),
					обеззараживание поверхностей, емкостей и воды, а также комплексный Пест-контроль.
				{:else}
					LLC "OZON-DEZ" — sanitary safety service for individuals and businesses.
					Extermination of insects (cockroaches, fleas, ticks, mosquitoes), rodents (rats, mice),
					sanitization of surfaces, tanks and water, as well as comprehensive Pest Control.
				{/if}
			</p>

			<!-- Перелік використовуваних технологій -->
			<div class="hero-features-list">
				<span class="feature-item">✓ {#if langState.current === 'ua'}Препарати, зареєстровані в Україні{:else if langState.current === 'ru'}Препараты, зарегистрированные в Украине{:else}Preparations registered in Ukraine{/if}</span>
				<span class="feature-item">✓ {#if langState.current === 'ua'}Генератори холодного та гарячого туману{:else if langState.current === 'ru'}Генераторы холодного и горячего тумана{:else}Cold and thermal fog generators{/if}</span>
				<span class="feature-item">✓ {#if langState.current === 'ua'}Професійні озонатори{:else if langState.current === 'ru'}Профессиональные озонаторы{:else}Professional ozone generators{/if}</span>
				<span class="feature-item">✓ {#if langState.current === 'ua'}Кваліфіковані спеціалісти{:else if langState.current === 'ru'}Квалифицированные специалисты{:else}Qualified specialists{/if}</span>
			</div>

			<!-- Кнопки дій (CTA) -->
			<div class="hero-actions">
				<a
					href="tel:{currentContent.phones.mobile}"
					class="btn btn-primary"
					title={langState.current === 'ua' ? 'Замовити виїзд' : langState.current === 'ru' ? 'Заказать выезд' : 'Order dispatch'}
				>
					<span>📞</span>
					<span>{#if langState.current === 'ua'}Викликати спеціаліста{:else if langState.current === 'ru'}Вызвать специалиста{:else}Call a specialist{/if}</span>
				</a>
				<a href={resolve('/calculator')} class="btn btn-secondary">
					<span>🧮</span>
					<span>{#if langState.current === 'ua'}Розрахувати вартість{:else if langState.current === 'ru'}Рассчитать стоимость{:else}Calculate cost{/if}</span>
				</a>
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
		justify-content: center;
	}

	.hero-container {
		width: 100%;
		max-width: 980px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		z-index: 2;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.45rem 1.1rem;
		border-radius: var(--radius-tags);
		background: rgba(2, 132, 199, 0.1);
		border: 1px solid rgba(2, 132, 199, 0.35);
		color: #38bdf8;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-bottom: 1.5rem;
	}

	.badge-icon {
		font-size: 14px;
	}

	.hero-title {
		font-size: clamp(2.2rem, 4.2vw, 3.8rem);
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.03em;
		color: var(--color-bone-white);
		margin-bottom: 1.4rem;
		max-width: 900px;
	}

	.hero-description {
		font-size: clamp(1.05rem, 1.35vw, 1.2rem);
		font-weight: 350;
		line-height: 1.65;
		color: var(--color-ash-gray);
		max-width: 780px;
		margin-bottom: 1.8rem;
	}

	.hero-features-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem 1.25rem;
		margin-bottom: 2.2rem;
		max-width: 840px;
	}

	.feature-item {
		display: inline-flex;
		align-items: center;
		padding: 0.4rem 0.95rem;
		border-radius: var(--radius-tags);
		background: var(--color-surface);
		border: 1px solid var(--color-void-border);
		color: var(--color-silver-mist);
		font-size: 13.5px;
		font-weight: 500;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2.6rem;
	}

	.hero-actions .btn {
		font-size: 1rem;
		font-weight: 700;
		padding: 0.9rem 1.8rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	@media (max-width: 640px) {
		.hero-actions {
			flex-direction: column;
			width: 100%;
			max-width: 320px;
		}

		.hero-actions .btn {
			width: 100%;
			justify-content: center;
		}

		.hero-features-list {
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
		}
	}

	/* Light Mode Adjustments */
	:global(html[data-theme="light"]) .hero-badge {
		background: rgba(2, 132, 199, 0.08);
		border-color: rgba(2, 132, 199, 0.3);
		color: #0284c7;
	}

	:global(html[data-theme="light"]) .hero-title {
		color: #0f172a;
	}

	:global(html[data-theme="light"]) .hero-description {
		color: #475569;
	}

	:global(html[data-theme="light"]) .feature-item {
		background: #ffffff;
		border-color: #e2e8f0;
		color: #334155;
	}
</style>
