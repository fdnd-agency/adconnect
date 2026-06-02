<script>
	import { RCardNews } from '$lib'
	import { IconCalendar } from '$lib/icons'
	import { formatDateNL } from '$lib/molecules/date'

	const { sectionInfo, newsItems, itemsPerPage } = $props()

	let currentPage = $state(1)

	const totalPages = $derived(itemsPerPage ? Math.ceil(newsItems.length / itemsPerPage) : 1)

	const visibleItems = $derived(itemsPerPage ? newsItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : newsItems)

	function nextPage() {
		if (currentPage < totalPages) currentPage += 1
	}

	function previousPage() {
		if (currentPage > 1) currentPage -= 1
	}
</script>

<section class="news">
	<div>
		<h2>{sectionInfo.title}</h2>
		{#if sectionInfo.totalArticles}
			<p>Aantal artikelen: {sectionInfo.totalArticles}</p>
		{/if}
	</div>

	<section class="news-container">
		<ul>
			{#each visibleItems as item (item.uuid)}
				<li>
					<RCardNews {item} />
				</li>
			{/each}
		</ul>
	</section>

	{#if itemsPerPage && totalPages > 1}
		<div class="button-container">
			<button
				class="button-outline-blue"
				onclick={previousPage}
				disabled={currentPage === 1}
			>
				←
			</button>

			<p>Pagina {currentPage} van {totalPages}</p>

			<button
				class="button-outline-blue"
				onclick={nextPage}
				disabled={currentPage === totalPages}
			>
				→
			</button>
		</div>
	{/if}
</section>

<style>
	.news {
		display: flex;
		flex-direction: column;
		width: min(90%, 1400px);
		margin: auto;
		padding: 3em 0;

		div {
			margin-bottom: 2em;
		}
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

	.button-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}
</style>
