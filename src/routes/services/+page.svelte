<script lang="ts">
	import { asset } from '$app/paths';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Services from '#lib/components/Services.svelte';
	import FaqSection from '#lib/components/FaqSection.svelte';
	import { langState } from '../../lib/state/language.svelte';
	import { contentMap } from '../../lib/data/content';

	let currentContent = $derived(contentMap[langState.current]);
</script>

<svelte:head>
	<title>
		{langState.current === 'ua'
			? 'Послуги дезінфекції, дезінсекції, озонування — ТОВ «ОЗОН-ДЕЗ»'
			: 'Услуги дезинфекции, дезинсекции, озонирования — ООО «ОЗОН-ДЕЗ»'}
	</title>
	<meta
		name="description"
		content="Повний каталог послуг дезінфекції, дезінсекції, дератизації, озонування O₃, фумігації та очищення води в Чорноморську та Одеській області."
	/>
</svelte:head>

<div class="services-page">
	<PageHeader
		badge={currentContent.servicesSection.badge}
		title={currentContent.servicesSection.title}
		subtitle={currentContent.servicesSection.subtitle}
		crumbs={[{ label: currentContent.nav.services }]}
		imageSrc={asset('images/services-bg.jpg')}
	/>

	<Services />
	<FaqSection />
</div>

<style>
	.services-page {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
