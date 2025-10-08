<script>
  import NewsCardSection from "$lib/components/NewsCardSection.svelte";
  import NavPros from '$lib/components/header/NavPros.svelte';
  import Hero from "$lib/components/hero/Hero.svelte";

  let { data } = $props(); 
  const news = data.news;
</script>

<svelte:head>
  <title>Home | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />
<Hero title="Overlegplatform Associate Degrees" description="Het overlegplatform voor Associate Degree opleidingen in Nederland.">
  <a slot="primary" href="/dev/hero" class="button-outline-white">Lorum Ipsum →</a>
  <a slot="secondary" href="/dev/hero" class="button-outline-blue">Lorum Action →</a>
</Hero>
<NewsCardSection news={data.news.slice(0, 3)}/>


