<script>
	import { Nieuwshero, RCardNews } from '$lib'

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
	backgroundColor="black"
/>

<section class="news">
	<section class="latest-news">
		<h2 style="margin: 1em;">Laatste nieuws</h2>

		<section class="news-container">
			<ul>
				{#each data.latest3 as item (item.uuid)}
					<li>
						<RCardNews {item} />
					</li>
				{/each}
			</ul>
		</section>
	</section>
</section>

<section class="news">
	<h2>Alle nieuws</h2>

	<p>
		Aantal artikelen: {data.news.length}
	</p>

	<section class="news-container">
		<ul>
			{#each paginatedNews as item (item.uuid)}
				<li>
					<RCardNews {item} />
				</li>
			{/each}
		</ul>

		<div
			style="
				display:flex;
				justify-content:center;
				align-items:center;
				gap:1rem;
				margin-top:2rem;
			"
		>
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
</section>

<style>
	.news {
		display: flex;
		flex-direction: column;
		gap: 2em;
		width: min(90%, 1400px);
		margin: auto;
		padding: 3em 0;
	}

	.news-container {
		container: news-container / inline-size;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;

		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5em;
	}

	@container news-container (min-width: 768px) {
		ul {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@container news-container (min-width: 1024px) {
		ul {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
