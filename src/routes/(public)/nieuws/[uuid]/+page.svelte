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
		<article>
			<h2>{item.title}</h2>
			<p>{@html item.body}</p>
		</article>
	{/each}
</section>

<style>
	.news-detail {
		display: flex;
		flex-direction: column;
		gap: 2em;
		width: 80%;
		padding: 3em 0;
		margin: auto;
	}

	article {
		max-width: 600px;
		margin: 0 auto;
		padding: 1.5em 0;
		h2 {
			font-size: 1.5rem;
			margin-bottom: 1em;
		}
	}

	@media (min-width: 900px) {
		.news-detail {
			flex-direction: row;
			align-items: flex-start;
			justify-content: center;
			gap: 4em;
		}
		article {
			margin: 0;
			padding: 2em 0;
		}
	}
</style>
