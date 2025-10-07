<script>
 // import NewsCardSection component
    import NewsCardSection from "$lib/components/NewsCardSection.svelte";
    import NavPros from '$lib/components/NavPros.svelte';
    import Hero from "$lib/components/hero/Hero.svelte"; // import Hero componen

  let { data } = $props(); // rune die data doorgeeft tussen page.server.js en page.svelte ("magische property")
  // Retrieve news data
  const news = data.news;
</script>

<svelte:head>
  <title>Home | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />
<NewsCardSection news={data.news.slice(0, 3)}/>

<Hero title="Overlegplatform Associate Degrees" description="Het overlegplatform voor Associate Degree opleidingen in Nederland.">
  <a slot="primary" href="/dev/hero" class="button-outline-white">Lorum Ipsum →</a>
  <a slot="secondary" href="/dev/hero" class="button-outline-blue">Lorum Action →</a>
</Hero>



