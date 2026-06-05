<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import { RSectionHero } from '$lib'

	let { data } = $props()
</script>

<svelte:head>
	<title>Nieuws | Overlegplatform Associate Degrees</title>
</svelte:head>

{#each data.content as item (item.uuid)}
	<RSectionHero
		sectionInfo={{
			title: item.title,
			description: item.description
		}}
		primaryLink={{ label: 'Terug', href: '/nieuws', screenReaderText: 'naar nieuws pagina' }}
		picture={{
			src: `${DIRECTUS_URL}/assets/${item.hero}`,
			alt: item.title,
			fetchpriority: 'high',
			loading: 'eager'
		}}
	/>
{/each}

<section class="news-detail">
	{#each data.content as item (item.uuid)}
		<article class="news-detail__article">
			<h2 class="news-detail__title">{item.title}</h2>
			<div class="news-detail__content">{@html item.body}</div>
		</article>
	{/each}
</section>

<style>
	.news-detail {
		display: flex;
		flex-direction: column;
		gap: 2em;
		width: 80%;
		margin: auto;
		padding: 3em 0;

		@media (min-width: 900px) {
			flex-direction: row;
			align-items: flex-start;
			justify-content: center;
			gap: 4em;
		}
	}

	.news-detail__article {
		max-width: 800px;
		margin: 0 auto;
		padding: 1.5em 0;

		@media (min-width: 900px) {
			margin: 0;
			padding: 2em 0;
		}
	}

	.news-detail__title {
		margin-bottom: 1em;
		font-size: 1.5rem;
	}

	.news-detail__content {
		list-style-position: inside;
		font-family: var(--font-body);
		font-weight: var(--text-font-weight);
		font-size: var(--p-s-size);
		line-height: var(--p-s-line-height);
		max-width: var(--p-s-max-width);

		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
