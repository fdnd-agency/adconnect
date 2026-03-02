<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	// Import images
	import { Nieuwshero } from '$lib'
	// Import components
	import { NavPros, Hero } from '$lib'
	// Haal data op uit page.server.js via props
	const { data } = $props()
</script>

<svelte:head>
	<title>Nieuws | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

{#each data.news as item (item.uuid)}
	<Hero
		title={item.title}
		description={item.description}
	>
		<a
			slot="primary"
			href="/nieuws"
			class="button-outline-white"
		>
			Terug
		</a>
		<img
			src={`https://fdnd-agency.directus.app/assets/${item.hero}`}
			alt={item.title}
		/>
	</Hero>
{/each}
<section class="news-detail">
	{#each data.news as item (item.uuid)}
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
	img {
		width: 100%;
		max-width: 500px;
		height: auto;
		border-radius: 0.5em;
		margin: 0 auto;
		display: block;
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
		img {
			width: 500px;
			height: 500px;
			object-fit: cover;
		}
	}
</style>
