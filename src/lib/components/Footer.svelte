<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';
	import { langState } from '../state/language.svelte';
	import { contentMap } from '../data/content';

	let currentContent = $derived(contentMap[langState.current]);
	let ftr = $derived(currentContent.footer);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-grid">
			<!-- Col 1: Brand & Credentials -->
			<div class="footer-col brand-col">
				<Logo variant="light" />
				<p class="footer-about">
					{currentContent.companyName} — {ftr.about}
				</p>
				<div class="footer-badges">
					<span class="f-badge">
						{#if langState.current === 'ua'}МОЗ України{:else}Минздрав Украины{/if}
					</span>
					<span class="f-badge">HACCP</span>
					<span class="f-badge">
						{#if langState.current === 'ua'}15 років досвіду{:else}15 лет опыта{/if}
					</span>
				</div>
			</div>

			<!-- Col 2: Navigation to Pages -->
			<div class="footer-col">
				<h4 class="footer-heading">{ftr.navTitle}</h4>
				<ul class="footer-links">
					<li><a href={resolve('/services')}>{currentContent.nav.services}</a></li>
					<li><a href={resolve('/ozone')}>{currentContent.nav.ozone}</a></li>
					<li><a href={resolve('/b2b')}>{currentContent.nav.b2b}</a></li>
					<li><a href={resolve('/agro')}>{currentContent.nav.agro}</a></li>
					<li><a href={resolve('/water')}>{currentContent.nav.water}</a></li>
					<li><a href={resolve('/how-we-work')}>{currentContent.nav.howWeWork}</a></li>
					<li><a href={resolve('/calculator')}>{currentContent.nav.calculator}</a></li>
					<li><a href={resolve('/contacts')}>{currentContent.nav.contacts}</a></li>
				</ul>
			</div>

			<!-- Col 3: Direct Services links -->
			<div class="footer-col">
				<h4 class="footer-heading">{ftr.servicesTitle}</h4>
				<ul class="footer-links">
					<li>
						<a href={resolve('/services') + '#cat-dez'}>
							{#if langState.current === 'ua'}Дезінсекція та дезінфекція{:else}Дезинсекция и дезинфекция{/if}
						</a>
					</li>
					<li>
						<a href={resolve('/ozone')}>
							{#if langState.current === 'ua'}Озонування приміщень O₃{:else}Озонирование помещений O₃{/if}
						</a>
					</li>
					<li>
						<a href={resolve('/ozone') + '#odor'}>
							{#if langState.current === 'ua'}Усунення стійких запахів{:else}Устранение стойких запахов{/if}
						</a>
					</li>
					<li>
						<a href={resolve('/ozone') + '#mold'}>
							{#if langState.current === 'ua'}Видалення грибка і плісняви{:else}Удаление грибка и плесени{/if}
						</a>
					</li>
					<li>
						<a href={resolve('/ozone') + '#demercurization'}>
							{#if langState.current === 'ua'}Демеркуризація (пари ртуті){:else}Демеркуризация (пары ртути){/if}
						</a>
					</li>
					<li>
						<a href={resolve('/agro')}>
							{#if langState.current === 'ua'}Фумігація зерна й елеваторів{:else}Фумигация зерна и элеваторов{/if}
						</a>
					</li>
					<li>
						<a href={resolve('/water')}>
							{#if langState.current === 'ua'}Очищення та дезінфекція води{:else}Очистка и дезинфекция воды{/if}
						</a>
					</li>
					<li>
						<a href={resolve('/b2b')}>
							{#if langState.current === 'ua'}Пест-контроль для HoReCa (HACCP){:else}Пест-контроль для HoReCa (HACCP){/if}
						</a>
					</li>
				</ul>
			</div>

			<!-- Col 4: Contacts & Official details -->
			<div class="footer-col">
				<h4 class="footer-heading">{ftr.contactsTitle}</h4>
				<div class="footer-contacts">
					<div class="fc-item">
						<span class="fc-lbl">{#if langState.current === 'ua'}Гаряча лінія:{:else}Горячая линия:{/if}</span>
						<a href="tel:{currentContent.phones.mobile}" class="fc-phone">
							{currentContent.phones.mobileDisplay}
						</a>
					</div>
					<div class="fc-item">
						<span class="fc-lbl">{#if langState.current === 'ua'}Міський:{:else}Городской:{/if}</span>
						<a href="tel:{currentContent.phones.landline}" class="fc-phone">
							{currentContent.phones.landlineDisplay}
						</a>
					</div>
					<div class="fc-item">
						<span class="fc-lbl">{#if langState.current === 'ua'}Режим роботи:{:else}Режим работы:{/if}</span>
						<span>{currentContent.workingHours.days}: {currentContent.workingHours.hours}</span>
					</div>
					<div class="fc-item fc-action-item">
						<a href={resolve('/contacts')} class="btn btn-secondary btn-sm" style="margin-top: 0.5rem; text-align: center;">
							📍 {#if langState.current === 'ua'}Контакти та локація офісу →{:else}Контакты и локация офиса →{/if}
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer Bottom Bar -->
		<div class="footer-bottom">
			<div class="copyright">
				© 2011 – 2026 {currentContent.companyName} ({currentContent.companyNameAlt}). {ftr.copyright}
			</div>
			<button type="button" class="back-to-top" onclick={scrollToTop} aria-label="Вгору">
				<span>{ftr.backToTop}</span>
			</button>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: rgba(0, 0, 0, 0.65);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		color: var(--color-ash-gray);
		padding: 5.5rem 0 calc(2.5rem + env(safe-area-inset-bottom, 0));
		border-top: 1px solid var(--border-subtle);
		position: relative;
		z-index: 1;
	}

	:global(html[data-theme="light"]) .footer {
		background: rgba(244, 246, 249, 0.75);
	}

	@media (max-width: 600px) {
		.footer {
			padding: 4rem 0 calc(1.8rem + env(safe-area-inset-bottom, 0));
		}
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1.3fr 0.8fr 1fr 1.1fr;
		gap: 3rem;
		margin-bottom: 3.5rem;
	}

	@media (max-width: 1024px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 2.5rem;
		}
	}

	@media (max-width: 600px) {
		.footer-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	.footer-col {
		display: flex;
		flex-direction: column;
	}

	.footer-about {
		font-size: 0.88rem;
		line-height: 1.6;
		color: var(--color-ash-gray);
		font-weight: 300;
		margin: 1.2rem 0 1.5rem;
	}

	.footer-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.f-badge {
		font-size: 0.72rem;
		font-weight: 500;
		padding: 0.25rem 0.6rem;
		border-radius: var(--radius-pill);
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-silver-mist);
		border: 1px solid var(--border-subtle);
	}

	.footer-heading {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-bone-white);
		margin-bottom: 1.25rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.footer-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.footer-links a {
		font-size: 0.88rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		transition: color var(--transition-fast);
		text-decoration: none;
	}

	.footer-links a:hover {
		color: var(--color-electric-iris);
	}

	.footer-contacts {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		font-size: 0.88rem;
	}

	.fc-item {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.fc-lbl {
		font-size: 0.72rem;
		color: var(--color-saffron-spark);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-weight: 600;
	}

	.fc-phone {
		color: var(--color-bone-white);
		font-weight: 500;
		font-family: var(--font-heading);
		font-size: 0.98rem;
		text-decoration: none;
		letter-spacing: -0.02em;
		transition: color var(--transition-fast);
	}

	.fc-phone:hover {
		color: var(--color-electric-iris);
	}

	.footer-bottom {
		padding-top: 2rem;
		border-top: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		font-size: 0.82rem;
	}

	@media (max-width: 600px) {
		.footer-bottom {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.8rem;
		}
	}

	.copyright {
		color: var(--color-ash-gray);
		font-weight: 300;
		opacity: 0.8;
	}

	.back-to-top {
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		color: var(--color-silver-mist);
		padding: 0.45rem 1.1rem;
		border-radius: var(--radius-pill);
		font-size: 0.8rem;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.back-to-top:hover {
		border-color: var(--color-electric-iris);
		color: var(--color-bone-white);
	}
</style>
