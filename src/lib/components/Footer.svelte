<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight, ArrowUp } from 'phosphor-svelte';
	import Logo from './Logo.svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="site-footer">
	<div class="container footer-grid">
		<!-- Колонка 1: Про компанію -->
		<div class="footer-col footer-about">
			<div class="footer-logo">
				<Logo variant="light" showTagline={true} />
			</div>
			<p class="footer-desc">
				{#if langState.current === 'ua'}
					ТОВ «<strong class="brand-ozon">ОЗОН</strong><span class="brand-sep">-</span><strong class="brand-dez">ДЕЗ</strong>» — професійні санітарні послуги для фізичних та юридичних осіб.
					Комплексна дезінсекція, дератизація, дезінфекція, озонування та Пест-контроль 
					у Чорноморську, Одесі та по всій Одеській області.
				{:else if langState.current === 'ru'}
					ООО «<strong class="brand-ozon">ОЗОН</strong><span class="brand-sep">-</span><strong class="brand-dez">ДЕЗ</strong>» — профессиональные санитарные услуги для физических и юридических лиц.
					Комплексная дезинсекция, дератизация, дезинфекция, озонирование и Пест-контроль 
					в Черноморске, Одессе и по всей Одесской области.
				{:else}
					LLC «<strong class="brand-ozon">OZON</strong><span class="brand-sep">-</span><strong class="brand-dez">DEZ</strong>» — professional sanitary services for individuals and legal entities.
					Comprehensive disinsection, deratization, disinfection, ozonation, and Pest Control 
					in Chornomorsk, Odesa, and throughout the Odesa region.
				{/if}
			</p>
			<div class="footer-badges">
				<span class="badge">
					{#if langState.current === 'ua'}Препарати, зареєстровані в Україні{:else if langState.current === 'ru'}Препараты, зарегистрированные в Украине{:else}Preparations registered in Ukraine{/if}
				</span>
				<span class="badge">
					{#if langState.current === 'ua'}Кваліфіковані спеціалісти{:else if langState.current === 'ru'}Квалифицированные специалисты{:else}Qualified specialists{/if}
				</span>
				<span class="badge">
					{#if langState.current === 'ua'}15 років досвіду{:else if langState.current === 'ru'}15 лет опыта{:else}15 years experience{/if}
				</span>
			</div>
		</div>

		<!-- Колонка 2: Навігація -->
		<div class="footer-col">
			<h4 class="footer-heading">
				{#if langState.current === 'ua'}Навігація{:else if langState.current === 'ru'}Навигация{:else}Navigation{/if}
			</h4>
			<ul class="footer-links">
				<li><a href={resolve('/')}>{#if langState.current === 'ua'}Головна{:else if langState.current === 'ru'}Главная{:else}Home{/if}</a></li>
				<li><a href={resolve('/services')}>{currentContent.nav.services}</a></li>
				<li><a href={resolve('/b2b')}>{currentContent.nav.b2b}</a></li>
				<li><a href={resolve('/how-we-work')}>{currentContent.nav.howWeWork}</a></li>
				<li><a href={resolve('/calculator')}>{currentContent.nav.calculator}</a></li>
				<li><a href={resolve('/contacts')}>{currentContent.nav.contacts}</a></li>
			</ul>
		</div>

		<!-- Колонка 3: Реальні послуги згідно з даними компанії -->
		<div class="footer-col">
			<h4 class="footer-heading">
				{#if langState.current === 'ua'}Послуги компанії{:else if langState.current === 'ru'}Услуги компании{:else}Company Services{/if}
			</h4>
			<ul class="footer-links">
				<li>
					<a href={resolve('/services') + '#disinsection'}>
						{#if langState.current === 'ua'}Дезінсекція (таргани, блохи, кліщі, комарі){:else if langState.current === 'ru'}Дезинсекция (тараканы, блохи, клещи, комары){:else}Disinsection (cockroaches, fleas, ticks, mosquitoes){/if}
					</a>
				</li>
				<li>
					<a href={resolve('/services') + '#deratization'}>
						{#if langState.current === 'ua'}Дератизація (знищення щурів та мишей){:else if langState.current === 'ru'}Дератизация (уничтожение крыс и мышей){:else}Deratization (rat and mouse eradication){/if}
					</a>
				</li>
				<li>
					<a href={resolve('/services') + '#disinfection'}>
						{#if langState.current === 'ua'}Дезінфекція поверхонь, ємностей і води{:else if langState.current === 'ru'}Дезинфекция поверхностей, емкостей и воды{:else}Disinfection of surfaces, tanks and water{/if}
					</a>
				</li>
				<li>
					<a href={resolve('/services') + '#ozonation'}>
						{#if langState.current === 'ua'}Озонування приміщень та харчових ємностей{:else if langState.current === 'ru'}Озонирование помещений и пищевых емкостей{:else}Ozonation of rooms and food storage tanks{/if}
					</a>
				</li>
				<li>
					<a href={resolve('/b2b')}>
						{#if langState.current === 'ua'}Пест-контроль (моніторинг і регулювання){:else if langState.current === 'ru'}Пест-контроль (мониторинг и регулирование){:else}Pest Control (monitoring & regulation){/if}
					</a>
				</li>
			</ul>
		</div>

		<!-- Колонка 4: Контакти та офіс -->
		<div class="footer-col footer-contacts">
			<h4 class="footer-heading">
				{#if langState.current === 'ua'}Контакти та офіс{:else if langState.current === 'ru'}Контакты и офис{:else}Contacts & Office{/if}
			</h4>
			<div class="contact-details">
				<div class="contact-row">
					<span class="label">{#if langState.current === 'ua'}Мобільний:{:else if langState.current === 'ru'}Мобильный:{:else}Mobile:{/if}</span>
					<a href="tel:{currentContent.phones.mobile}" class="val-phone">{currentContent.phones.mobileDisplay}</a>
				</div>
				<div class="contact-row">
					<span class="label">{#if langState.current === 'ua'}Міський / офіс:{:else if langState.current === 'ru'}Городской / офис:{:else}Office / landline:{/if}</span>
					<a href="tel:{currentContent.phones.landline}" class="val-phone">{currentContent.phones.landlineDisplay}</a>
				</div>
				<div class="contact-row">
					<span class="label">Email:</span>
					<a href="mailto:{currentContent.email}" class="val-phone">{currentContent.email}</a>
				</div>
				<div class="contact-row">
					<span class="label">{#if langState.current === 'ua'}Офіс:{:else if langState.current === 'ru'}Офис:{:else}Office:{/if}</span>
					<address class="val-address">{currentContent.address.actual}</address>
				</div>
				<div class="contact-row">
					<span class="label">{#if langState.current === 'ua'}Графік:{:else if langState.current === 'ru'}График:{:else}Schedule:{/if}</span>
					<span class="val-time">
						{#if langState.current === 'ua'}
							Пн – Пт: 09:00 – 15:00 (виїзди за домовленістю)
						{:else if langState.current === 'ru'}
							Пн – Пт: 09:00 – 15:00 (выезды по договоренности)
						{:else}
							Mon – Fri: 09:00 – 15:00 (visits by appointment)
						{/if}
					</span>
				</div>
				<div class="contact-cta">
					<a href={resolve('/contacts')} class="inline-link" style="display: inline-flex; align-items: center; gap: 0.35rem;">
						<span>{#if langState.current === 'ua'}Карта та маршрут до офісу{:else if langState.current === 'ru'}Карта и маршрут к офису{:else}Map & route to office{/if}</span>
						<ArrowRight size={14} weight="bold" />
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Копірайт -->
	<div class="footer-bottom">
		<div class="container footer-bottom-content">
			<div class="footer-copy">
				© 2011 – 2026 {currentContent.companyName}. {#if langState.current === 'ua'}Всі права захищені.{:else if langState.current === 'ru'}Все права защищены.{:else}All rights reserved.{/if}
			</div>
			<div class="footer-subtext">
				{currentContent.address.city}
			</div>
			<button type="button" class="back-to-top" onclick={scrollToTop} aria-label="Вгору" style="display: inline-flex; align-items: center; gap: 0.35rem;">
				<ArrowUp size={14} weight="bold" />
				<span>{#if langState.current === 'ua'}Вгору{:else if langState.current === 'ru'}Вверх{:else}Top{/if}</span>
			</button>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		background: rgba(8, 12, 20, 0.95);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		color: var(--color-ash-gray);
		padding: 5rem 0 0;
		border-top: 1px solid var(--border-subtle);
		position: relative;
		z-index: 1;
	}

	:global(html[data-theme="light"]) .site-footer {
		background: #222f30;
		border-color: #c9cbbe;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1.35fr 0.8fr 1.15fr 1.1fr;
		gap: 2.8rem;
		margin-bottom: 3.5rem;
	}

	@media (max-width: 1024px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 2.5rem;
		}
	}

	@media (max-width: 640px) {
		.footer-grid {
			grid-template-columns: 1fr;
			gap: 2.2rem;
		}
	}

	.footer-col {
		display: flex;
		flex-direction: column;
	}

	.footer-logo {
		text-decoration: none;
		display: inline-flex;
		flex-direction: column;
		gap: 0.35rem;
	}


	.footer-desc {
		font-size: 0.88rem;
		line-height: 1.6;
		color: var(--color-ash-gray);
		margin: 1.1rem 0 1.4rem;
	}

	.footer-desc .brand-ozon {
		color: #00E640;
		font-weight: 800;
	}

	.footer-desc .brand-sep {
		color: #FFA000;
		margin: 0 1.5px;
		font-weight: 800;
	}

	.footer-desc .brand-dez {
		color: #008F45;
		font-weight: 800;
	}

	:global(html[data-theme="light"]) .footer-desc {
		color: #c9cbbe;
	}

	:global(html[data-theme="light"]) .footer-desc .brand-ozon {
		color: #00C835;
	}

	:global(html[data-theme="light"]) .footer-desc .brand-sep {
		color: #D97706;
	}

	:global(html[data-theme="light"]) .footer-desc .brand-dez {
		color: #007A3B;
	}

	.footer-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.badge {
		font-size: 0.72rem;
		font-weight: 500;
		padding: 0.3rem 0.65rem;
		border-radius: var(--radius-pill);
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-silver-mist);
		border: 1px solid var(--border-subtle);
	}

	:global(html[data-theme="light"]) .badge {
		background: rgba(255, 255, 255, 0.08);
		border-color: #4d5757;
		color: #ffffff;
	}

	.footer-heading {
		font-size: 0.88rem;
		font-weight: 700;
		color: var(--color-bone-white);
		margin-bottom: 1.25rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	:global(html[data-theme="light"]) .footer-heading {
		color: #ffffff;
	}

	.footer-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.footer-links a {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	:global(html[data-theme="light"]) .footer-links a {
		color: #c9cbbe;
	}

	.footer-links a:hover {
		color: #38bdf8;
	}

	:global(html[data-theme="light"]) .footer-links a:hover {
		color: #cef79e;
	}

	.contact-details {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		font-size: 0.88rem;
	}

	.contact-row {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.label {
		font-size: 0.72rem;
		color: #38bdf8;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-weight: 700;
	}

	:global(html[data-theme="light"]) .label {
		color: #cef79e;
	}

	.val-phone {
		color: var(--color-bone-white);
		font-weight: 600;
		font-size: 1rem;
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	:global(html[data-theme="light"]) .val-phone {
		color: #ffffff;
	}

	.val-phone:hover {
		color: #38bdf8;
	}

	.val-address {
		font-style: normal;
		color: var(--color-ash-gray);
	}

	:global(html[data-theme="light"]) .val-address {
		color: #c9cbbe;
	}

	.val-time {
		color: var(--color-silver-mist);
		font-size: 0.85rem;
	}

	:global(html[data-theme="light"]) .val-time {
		color: #c9cbbe;
	}

	.inline-link {
		color: #38bdf8;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.85rem;
		display: inline-block;
		margin-top: 0.4rem;
		transition: color var(--transition-fast);
	}

	:global(html[data-theme="light"]) .inline-link {
		color: #cef79e;
	}

	.inline-link:hover {
		text-decoration: underline;
	}

	.footer-bottom {
		border-top: 1px solid var(--border-subtle);
		padding: 1.8rem 0 calc(2rem + env(safe-area-inset-bottom, 0));
	}

	:global(html[data-theme="light"]) .footer-bottom {
		border-color: #4d5757;
	}

	.footer-bottom-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		font-size: 0.82rem;
	}

	.footer-copy {
		color: var(--color-ash-gray);
	}

	.footer-subtext {
		color: var(--color-silver-mist);
		opacity: 0.8;
	}

	:global(html[data-theme="light"]) .footer-copy,
	:global(html[data-theme="light"]) .footer-subtext {
		color: #c9cbbe;
	}

	.back-to-top {
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		color: var(--color-silver-mist);
		padding: 0.45rem 1rem;
		border-radius: var(--radius-pill);
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	:global(html[data-theme="light"]) .back-to-top {
		background: #151f20;
		border-color: #4d5757;
		color: #ffffff;
	}

	:global(html[data-theme="light"]) .back-to-top:hover {
		background: #cef79e;
		border-color: #cef79e;
		color: #222f30;
	}
</style>
