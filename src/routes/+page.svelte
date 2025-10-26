<script>
  import NewsCardSection from "$lib/components/NewsCardSection.svelte";
  import NavPros from "$lib/components/header/NavPros.svelte";
  import Hero from "$lib/components/hero/Hero.svelte";
  import placeholder from "$lib/assets/placeholder-hero.png";
  import Cooperation from "$lib/components/cooperation/LogoSection.svelte";

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
  <img class="hero-image" src={placeholder} alt="" />
</Hero>

<NewsCardSection news={data.news.slice(0, 3)} />

<Cooperation />

<style>
  .hero-image {
    display: block;
    width: 100%;
    max-height: 416px;
    object-fit: cover;
    border-radius: 30px 30px 0 0;
  }

  @media (min-width: 768px) {
    .hero-image {
      border-radius: 24px;
      max-width: 604px;
      margin-left: auto;
    }
  }

  @media (min-width: 1024px) {
    .hero-image {
      max-width: 640px;
    }
  }
</style>
