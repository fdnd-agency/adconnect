<script>
	import { Nieuwshero, RNewsGridContainer, RCardNews } from '$lib'

	/* Import images */
	import { dots, calendar } from '$lib'

	/* Import components */
	import { RSectionHero } from '$lib'
	import { formatDateNL } from '$lib/molecules/date'

	// Haal data op uit page.server.js via props
	const { data } = $props()

	/* Pagination */
	let currentPage = $state(1)

	const itemsPerPage = 9

	const totalPages = $derived(Math.ceil(data.news.length / itemsPerPage))

	const paginatedNews = $derived(data.news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage))

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage += 1
		}
	}

	function previousPage() {
		if (currentPage > 1) {
			currentPage -= 1
		}
	}
</script>

<svelte:head>
	<title>Nieuws | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{
		title: 'Nieuws',
		description: 'Op deze pagina vind je updates en korte verslagen van georganiseerde evenementen.'
	}}
	picture={{
		isEnhanced: true,
		src: Nieuwshero,
		alt: '',
		fetchpriority: 'high'
	}}
/>

<RNewsGridContainer
	sectionInfo={{
		title: 'Laatste nieuws'
	}}
	newsItems={data.latest3}
/>

<section class="news">
	<RNewsGridContainer
		sectionInfo={{
			title: 'Alle nieuws',
			totalArticles: data.news.length
		}}
		newsItems={paginatedNews}
	/>

	<div class="button-container">
		<button
			class="button-outline-blue"
			on:click={previousPage}
			disabled={currentPage === 1}
		>
			←
		</button>

		<p>
			Pagina {currentPage} van {totalPages}
		</p>

		<button
			class="button-outline-blue"
			on:click={nextPage}
			disabled={currentPage === totalPages}
		>
			→
		</button>
	</div>
</section>

<style>
	.button-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}
</style>
