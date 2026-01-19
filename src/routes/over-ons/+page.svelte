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

<div class="origins">
  <section class="origin-text">
    <h2>Oorsprong van de website</h2>
    <p>
      In een gesprek tussen leden van het Overlegplatform Associate Degree en Jan Bogerd (portefeuillehouder onderwijs Vereniging Hogescholen) en
      Bridget Kievits (bestuurscommissie onderwijs) op 21 januari 2019 is het verzoek naar voren gekomen om scenario’s te beschrijven over de positie
      van het Platform Associate degree.
    </p>
    <p>
      Naar aanleiding van dit verzoek hebben Jaap ten Have (Windesheim, voorzitter Landelijk Platform Associate degrees), Niels Strolenberg (Hanze
      Hogeschool) Dirk Cornelissen (Vereniging Hogescholen)en Nina Spithost (NHL-Stenden),  dit document opgesteld.
    </p>
  </section>
  <section class="origin-letter">
    <h2>Oprichtingsbrief</h2>
    <p>
      “Het overlegplatform Ad (OP-Ad) vormt – analoog aan het reeds bestaande landelijk platform masters – een community of practice. In principe zijn
      alle instellingen met een Ad in dit netwerk op medewerkersniveau vertegenwoordigd. Kennis en ervaring van alle hogescholen wordt er gebundeld.
      Daarnaast dient dit platform als een voorportaal voor de besluitvorming in de Vereniging Hogescholen over alle zaken die de Ad-opleidingen
      regarderen. De relevante stukken ter voorbereiding van de bestuurlijke besluitvorming worden in en door het OP-Ad voorbereid. Het OP-Ad
      rapporteert aan de portefeuillehouder onderwijs van de Vereniging Hogescholen.”
    </p>
  </section>
</div>

<Divider />

<section class="advice">
  <img class="logo" src={logomobile} alt="Ad Talent Award Logo" width="50" height="50" />
  <h2>Gevraagd en ongevraagd advies</h2>
  <p>
    Het Ad platform is als onderdeel van de Vereniging Hogescholen het adviserend en beleidsvoorbereidend orgaan dat zich als opdracht heeft gesteld
    de plaats van het Ad in het Nederlands hoger onderwijs te versterken. Het platform geeft gevraagd en ongevraagd advies en werkt programmatisch en
    middels (met de portefeuillehouder onderwijs van de Vereniging Hogescholen afgestemde) jaarplannen aan deze opdracht. Het platform kent vanuit
    elke hogeschool die een Ad verzorgt een afgevaardigde in het platform.
  </p>
</section>

<section class="logo-section">
  <DividerText text="Partijen waarmee wij samenwerken" />
  <LogoSection {cooperation} />
  <Divider />
</section>

<style>
  .intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    padding: 5em;

    h2 {
      padding-bottom: 1em;
    }
  }

  .origins {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2.5em;
    padding: 5em;

    @media (min-width: 1000px) {
      flex-direction: row;
      justify-content: space-evenly;
    }

    .origin-text,
    .origin-letter {
      h2 {
        padding-bottom: 1em;
      }
    }
  }

  .advice {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    padding: 5em;

    h2 {
      padding-bottom: 1em;
    }
  }

  .logo-section {
    display: flex;
    gap: 2em;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: var(--blue-100);
    padding: 0 0 3em 0;

    @media (min-width: 768px) {
      gap: 3em;
      padding: 0 0 5em 0;
    }
  }
</style>
