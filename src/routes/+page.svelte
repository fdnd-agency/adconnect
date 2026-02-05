<script>
  import placeholder from "$lib/assets/placeholder-hero.webp";
  import Information from "$lib/components/information-home/Information.svelte";
  import InformationCards from "$lib/components/information-cards/InformationCards.svelte";
  import FeatureSplit from "$lib/components/why-ad-home/FeatureSplit.svelte";

  // Import components
  import { NavPros, DividerText, Divider, LogoSection, Hero, NewsCardSection, Link } from "$lib";

  // Import images
  import { zaal } from "$lib";

  let { data } = $props();
  const news = data.news;
  const cooperation = data.cooperation;
</script>

<svelte:head>
  <title>Home | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
  title="Het landelijke platform voor Associate degrees"
  description="Ad-netwerk samen om kennis te delen, samen te werken en de kwaliteit en zichtbaarheid van Associate degrees te versterken."
>
<Link slot="secondary" href="/ad-dag" class="button-outline-white">Kom naar de Ad-dag →</Link>
<Link slot="primary" href="/over-ad" class="button-outline-blue">Meer over Ad's</Link>
  <img class="hero-image" src={zaal} alt="" fetchpriority="high" width="300" height="210" />
</Hero>

<NewsCardSection news={data.news.slice(0, 3)} />

<Information
  title="Wat zijn Associate degrees en hoe sluit het aan bij jou wensen?"
  description="Associate degrees zijn tweejarige hbo-opleidingen die sterk praktijkgericht zijn en direct aansluiten op de arbeidsmarkt. Ze combineren werken en leren en zijn bedoeld voor studenten die zich willen ontwikkelen op hbo-niveau, zonder direct een vierjarige bachelor te volgen. De opleidingen worden samen met het werkveld vormgegeven en spelen in op actuele beroepsvragen. Hierdoor doe je relevante kennis en vaardigheden op die je meteen kunt toepassen in de praktijk. Een Associate degree biedt daarnaast flexibiliteit: je behaalt een zelfstandig diploma en kunt, als je dat wilt, doorstromen naar een bacheloropleiding."
  buttonText="Meer info over Ad's"
  buttonLink="#"
  imageAlt="Studenten ontvangen award"
/>

<InformationCards
  heading="Ontdek het Ad‑onderwijs"
  intro="Leer alles over Associate degrees, doorstroommogelijkheden en netwerkevenementen.
Blijf op de hoogte van Ad‑opleidingen en activiteiten binnen het overlegplatform."
  items={[
    {
      title: "Doorstroom Ad",
      description: "Met een Associate degree stroom je door naar het derde jaar van een bachelor. Zo combineer je praktijk met een diploma.",
      buttonText: "Meer over doorstroom Ad's",
      buttonLink: "/over-ad/doorstroom-ad-bachelor",
    },
    {
      title: "Ad-dag",
      description:
        "De jaarlijkse Ad‑dag brengt studenten, docenten en werkveldpartners samen. Tijdens workshops staat kennisdeling en netwerken centraal.",
      buttonText: "Meer over de Ad-dag",
      buttonLink: "/ad-dag",
    },
    {
      title: "Ad-talent Award",
      description: "Jaarlijks wordt door het Overlegplatform de Ad Talent Award uitgereikt, waarmee 2 Associate degree-talenten verkozen worden.",
      buttonText: "Meer over Talent Awards",
      buttonLink: "/talent-award",
    },
  ]}
/>

<section class="logo-section">
  <DividerText text="Partijen waarmee wij samenwerken" />
  <LogoSection {cooperation} />
  <Divider />
</section>

<FeatureSplit
  title="Waarom kiezen voor een Associate degree?"
  intro="Een Associate degree combineert praktijkgericht onderwijs met doorstroommogelijkheden, zodat je snel ervaring opdoet én een diploma haalt."
  bullets={[
    "Praktijkgericht leren en direct vaardigheden toepassen",
    "Korte studieduur van 2 jaar",
    "Doorstromen naar een bacheloropleiding mogelijk",
  ]}
  ctaText="Meer over Associate degrees"
  ctaLink="/over-ad"
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
    padding: 0 0 3em 0;
    @media (min-width: 768px) {
      gap: 3em;
      padding: 0 0 5em 0;
    }
  }
</style>
