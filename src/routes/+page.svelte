<script>
  import NewsCardSection from "$lib/components/NewsCardSection.svelte";
  import NavPros from "$lib/components/header/NavPros.svelte";
  import Hero from "$lib/components/hero/Hero.svelte";
  import placeholder from "$lib/assets/placeholder-hero.png";
  import Information from "$lib/components/information-home/information.svelte";

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

<Information
  title="Wat zijn Associate degrees en hoe sluit het aan bij jou wensen?"
  description="Lorem ipsum dolor sit amet consectetur. Id dolor elementum ultrices feugiat aliquam ornare phasellus fames. Egestas libero sit elementum felis tellus fames imperdiet consectetur. Mauris tincidunt nibh ac at. Suscipit eu urna non est. Etiam mi auctor sapien diam tortor. Pharetra quisque ipsum velit tortor velit. Risus elementum morbi commodo est. Risus sed purus dui dolor odio lobortis nulla. Ac ultricies adipiscing felis ultricies viverra aliquam molestie. Tellus orci volutpat sit id quam varius nam nunc. Facilisis dui risus duis id erat interdum consectetur risus pharetra. Posuere purus ultricies auctor."
  buttonText="Lorem ipsum dolor"
  buttonLink="#"
  imageAlt="Studenten ontvangen award"
/>

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
