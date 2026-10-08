<script lang="ts">
	import '../app.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import OrderModal from '#lib/components/OrderModal.svelte';
	import FloatingContactWidget from '#lib/components/FloatingContactWidget.svelte';
	import { langState } from '../lib/state/language.svelte';
	import { contentMap } from '../lib/data/content';
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
			image: 'https://prnto.github.io/OZON-DEZ/images/ozone-bg.jpg',
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
						'Friday',
						'Saturday',
						'Sunday'
					],
					opens: '00:00',
					closes: '23:59'
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
	<Header />
	<main class="site-main">
		{@render children()}
	</main>
	<Footer />
	<OrderModal />
	<FloatingContactWidget />
</div>

<style>
	.site-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.site-main {
		flex: 1;
	}
</style>
