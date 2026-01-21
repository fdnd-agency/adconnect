<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	// Import images
	import { Nieuwshero } from "$lib";

	// Import components
	import { NavPros, Hero } from "$lib";

	// Haal data op uit page.server.js via props
	let { data } = $props();
</script>

<svelte:head>
	<title>Nieuws | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

{#each data.news as item}
	<Hero title={item.title} description={item.description}>
		<a slot="primary" href="/nieuws" class="button-outline-white">
			Terug
		</a>
	</Hero>
{/each}

<section class="news-detail">
	{#each data.news as item}
		<article>
			<h2>{item.title}</h2>
			<p>{@html item.body}</p>
		</article>

		<img
			src={`https://fdnd-agency.directus.app/assets/${item.hero}`}
			alt={item.title}
		/>
	{/each}
</section>

<style>
