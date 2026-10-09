<script lang="ts">
	import '../app.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import OrderModal from '#lib/components/OrderModal.svelte';
	import FloatingContactWidget from '#lib/components/FloatingContactWidget.svelte';
	import ConstellationCanvas from '#lib/components/ConstellationCanvas.svelte';
	import { langState } from '../lib/state/language.svelte';
	import { contentMap } from '../lib/data/content';
	import { page, navigating } from '$app/state';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	let currentContent = $derived(contentMap[langState.current]);

	let schemaOrgJson = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			name: currentContent.companyName,
			alternateName: currentContent.companyNameAlt,
			description: currentContent.hero.subtitle,
			url: 'https://prnto.github.io/OZON-DEZ/',
			telephone: currentContent.phones.mobile,
			priceRange: '₴₴',
			image: 'https://prnto.github.io/OZON-DEZ/images/ozone-bg.webp',
			address: {
				'@type': 'PostalAddress',
				streetAddress: 'проспект Миру, 8А',
				addressLocality: 'Чорноморськ',
				addressRegion: 'Одеська область',
				postalCode: '68000',
				addressCountry: 'UA'
			},
			geo: {
				'@type': 'GeoCoordinates',
				latitude: 46.2995,
				longitude: 30.6558
			},
			openingHoursSpecification: [
				{
					'@type': 'OpeningHoursSpecification',
					dayOfWeek: [
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday'
					],
					opens: '09:00',
					closes: '15:00'
				}
			],
			areaServed: [
				{ '@type': 'City', name: 'Чорноморськ' },
				{ '@type': 'City', name: 'Одеса' },
				{ '@type': 'AdministrativeArea', name: 'Одеська область' }
			],
			hasOfferCatalog: {
				'@type': 'OfferCatalog',
				name: 'Послуги дезінфекції та пест-контролю',
				itemListElement: (currentContent.categories || []).flatMap((cat) => cat.services || []).map((srv) => ({
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: srv.title,
						description: srv.shortDesc
					}
				}))
			}
		})
	);
</script>

<svelte:head>
	<title>{currentContent.companyName} — {currentContent.hero.titleMain}</title>
	<!-- Structured Data (Schema.org LocalBusiness) -->
	{@html `<script type="application/ld+json">${schemaOrgJson}</script>`}
</svelte:head>

<div class="site-layout">
	<!-- Top navigation progress bar during page transitions -->
	{#if navigating.to}
		<div class="route-progress-bar" aria-hidden="true"></div>
	{/if}

	<!-- Persistent Constellation Canvas across all pages and full scroll height -->
	<ConstellationCanvas mode="fullpage" />

	<Header />
	<main class="site-main">
		{#key page.url.pathname}
			<div class="page-transition-wrapper">
				{@render children()}
			</div>
		{/key}
	</main>
	<Footer />
	<OrderModal />
	<FloatingContactWidget />
</div>

<style>
	.route-progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #8052ff, #06b6d4, #8052ff);
		background-size: 200% 100%;
		z-index: 99999;
		animation: routeProgressGlow 0.8s infinite linear;
		box-shadow: 0 0 12px rgba(128, 82, 255, 0.9), 0 0 6px rgba(6, 182, 212, 0.7);
	}

	@keyframes routeProgressGlow {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: -100% 0;
		}
	}

	.site-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		background: transparent;
	}

	.site-main {
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 1;
		background: transparent;
	}

	.page-transition-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		animation: pageFadeSlide 0.36s cubic-bezier(0.16, 1, 0.3, 1) both;
		will-change: opacity, transform;
	}

	@keyframes pageFadeSlide {
		0% {
			opacity: 0;
			transform: translateY(14px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.page-transition-wrapper {
			animation: none;
		}
		.route-progress-bar {
			display: none;
		}
	}
</style>
