<script>
  import NewsCardSection from "$lib/components/NewsCardSection.svelte";
  import NavPros from "$lib/components/header/NavPros.svelte";
  import Hero from "$lib/components/hero/Hero.svelte";
  import placeholder from "$lib/assets/placeholder-hero.png";
  import LogoSection from "$lib/components/cooperation/LogoSection.svelte";
  import DividerText from "$lib/components/divider/DividerText.svelte";
  import Divider from "$lib/components/divider/Divider.svelte";
  import FeatureSplit from "$lib/components/why-ad-home/FeatureSplit.svelte";

  let { data } = $props();
  const news = data.news;
  const cooperation = data.cooperation;
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

<section class="logo-section">
  <DividerText text="Partijen waarmee wij samenwerken" />
  <LogoSection {cooperation} />
  <Divider />
</section>
<FeatureSplit
  title="Waarom kiezen voor een Associate Degree"
  intro="Lorem ipsum dolor sit amet consectetur. Vitae arcu justo ultricies aliquet morbi eu ac faucibus. Purus porta cursus risus interdum consequat nec."
  bullets={["Lorem ipsum dolor sit amet consectetur.", "Lorem ipsum dolor sit amet consectetur. Nam.", "Lorem ipsum dolor sit"]}
  ctaText="Lorem ipsum dolor sit"
  ctaLink="/meer"
  imageSrc="/images/award.jpg"
  imageAlt="Studenten bij AdTalent award"
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

  .logo-section {
    display: flex;
    gap: 2em;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: var(--text-white);
    padding: 0 0 3em 0;

    @media (min-width: 768px) {
      gap: 3em;
      padding: 0 0 5em 0;
    }
  }
</style>
