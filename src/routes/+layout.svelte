<script lang="ts">
	import '../app.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import OrderModal from '#lib/components/OrderModal.svelte';
	import { langState } from '../lib/state/language.svelte';
	import { contentMap } from '../lib/data/content';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	let currentContent = $derived(contentMap[langState.current]);
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<title>{currentContent.companyName} — {currentContent.hero.titleMain}</title>
</svelte:head>

<div class="site-layout">
	<Header />
	<main class="site-main">
		{@render children()}
	</main>
	<Footer />
	<OrderModal />
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
