<script>
	import { RCardNews } from '$lib'
	import { IconCalendar } from '$lib/icons'
	const { sectionInfo, newsItems } = $props()

	import { formatDateNL } from '$lib/molecules/date'
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
			{#each newsItems as item (item.uuid)}
				<li>
					<RCardNews {item} />
				</li>
			{/each}
		</ul>
	</section>
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
</style>
