<script>
  // Import images
  import { doorstroom, overleggen, awards, dots, placeholder, overad } from "$lib";

  // Import components
  import { BenefitsCard, NavPros, ThemeCard, ImageTextSection, Divider, DividerText, LogoSection, Hero } from "$lib";

  let { data } = $props();

  const themes = data.themes;
  const cooperation = data.cooperation;
</script>

<svelte:head>
  <title>Over ons | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
  title="Over ons"
  description="Het Overlegplatform Associate degrees is opgericht in 2019 en biedt een platform voor iedereen die geïnteresseerd is in Ad-onderwijs. Alle bekostigde hogescholen die Ad-opleidingen aanbieden of dit willen gaan doen, kunnen deelnemen aan het platform."
>
  <img class="hero-image" src={overad} alt="" fetchpriority="high" />
</Hero>
