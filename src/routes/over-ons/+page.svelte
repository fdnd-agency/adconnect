<script>
  // Import images
  import { doorstroom, overleggen, awards, dots, placeholder, overad } from "$lib";
  import logomobile from "$lib/assets/logomobile.svg";

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

<section class="intro">
  <img class="logo" src={logomobile} alt="Ad Talent Award Logo" width="50" height="50" />
  <h2>Waarom AdConnect?</h2>
  <p>
    Het platform stimuleert naamsbekendheid en kennisdeling over de Associate degree. Het platform doet dit met en vanuit Vereniging Hogescholen en
    zet zich in om samenwerking te bevorderen tussen onderwijs- en werkveldpartners en de overheid om de Ad te positioneren in Nederland. Ook
    ondersteunt het platform de Landelijke Ad-overleggen (LAdO’s) waarin samengewerkt wordt aan de gezamenlijke profilering van de vergelijkbare
    Ad-opleidingen.
  </p>
</section>

<Divider />
