<script>
  import logomobile from "$lib/assets/logomobile.svg";
  import addag1 from "$lib/assets/addag-1.png";
  import addag2 from "$lib/assets/addag-2.png";
  import addag3 from "$lib/assets/addag-3.webp";

  import { MultipleFaq, SingleFaq, NavPros, Hero, Addag, Location, Schedule } from "$lib";
</script>

<svelte:head>
  <title>Ad dag | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<main>
  <Hero
    title="Ad Dag "
    description="De landelijks Ad-dag 2025 is hét moment waarop studenten, 
	docenten en professionals uit het Ad-onderwijs samenkomen.Ontdek, leer en 
	inspireer elkaar tijdens een dag vol sprekers, workshops en ontmoetingen.
	Ervaar hoe de Ad-professional als veranderaar impact maakt en vier samen de
	 uitreiking van de Ad Talent Awards. Meld je aan voor de komende ad dag of 
	 blijf op de hoogte "
  >
    <img class="hero-image" src={Addag} alt="" fetchpriority="high" />
  </Hero>

  <section class="intro">
    <article>
      <h2>Wat is de landelijke Ad-dag?</h2>
      <p>
        De Landelijke Ad-dag is het jaarlijkse moment waarop Associate degree (Ad)-onderwijs centraal staat. Studenten, docenten, coördinatoren,
        beleidsmakers en het werkveld komen samen om kennis te delen, inspiratie op te doen en elkaar te ontmoeten. Verwacht een mix van plenaire
        sessies, panelgesprekken, workshops en praktijkvoorbeelden waarin je ziet wat niveau 5 toevoegt aan het hbo en aan organisaties. Het is
        tegelijk een showcase en werkdag: je viert wat er al gebeurt én je neemt concrete ideeën mee om morgen toe te passen.
      </p>
    </article>
    <img src={addag3} alt="" width="450px" />
  </section>

  <section class="info-addag">
    <img class="logo" src={logomobile} alt="" />
    <h2>Alles wat je wilt weten over de Ad-dag?</h2>

    <MultipleFaq>
      <SingleFaq
        open={true}
        question="Voor wie is de Ad-dag bedoeld?"
        answer="De Landelijke Ad‑dag is bedoeld voor iedereen die betrokken is bij of interesse heeft in Associate degree‑onderwijs in Nederland. Dit omvat studenten, docenten, onderwijsprofessionals, werkveldpartners, onderwijsinstellingen en andere geïnteresseerden die willen zien hoe Ad‑onderwijs impact maakt op onderwijs en arbeidsmarkt."
      />

      <SingleFaq
        question="Wie komen er naar de Ad-dag?"
        answer="De Landelijke Ad‑dag brengt alle betrokkenen van Associate degree‑onderwijs samen, zoals studenten en alumni, docenten en onderwijsprofessionals, werkveldpartners en werkgevers, en beleidsmakers en onderwijsorganisaties die kennis en ervaringen willen uitwisselen. Het is een dag vol inspiratie, netwerken en het delen van de impact van Ad‑onderwijs."
      />

      <SingleFaq
        question="Waarom zou ik naar de Ad-dag moeten gaan?"
        answer="De Landelijke Ad‑dag is dé gelegenheid om inspiratie op te doen, te netwerken met studenten, docenten, werkveldpartners en beleidsmakers, en te ontdekken hoe Associate degree‑onderwijs impact maakt op zowel onderwijs als arbeidsmarkt. Je leert over innovatie, doorstroommogelijkheden en krijgt inzichten die je direct kunt toepassen in je studie, werk of organisatie."
      />

      <SingleFaq
        question="Wanneer en waar vindt de Ad-dag plaats?"
        answer="De Landelijke Ad‑dag 2026 vindt plaats op vrijdag 17 april 2026 in Groningen, georganiseerd bij de Hanzehogeschool."
      />
    </MultipleFaq>

    <img class="addag-2" src={addag2} alt="" width="600" height="300" />
  </section>
  <Schedule />
  <Location />
</main>

<style>
  .intro {
    display: flex;
    flex-direction: column;
    padding: 3em 5%;
    max-width: 1400px;
    align-items: center;
    gap: 4em;
    align-self: center;
    margin: auto;

    img {
      width: 100%;
      border-radius: 1em;
    }

    article {
      max-width: 600px;

      p {
        margin-top: 1em;
      }
    }
  }

  @media (min-width: 768px) {
    .intro {
      flex-direction: row;
      gap: 2em;
      align-items: center;
      padding: 5em 5%;
      gap: 4em;

      img {
        width: 600px;
      }
    }
  }

  .info-addag {
    display: flex;
    flex-direction: column;
    background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
    gap: 2em;
    padding: 3em 5%;
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 0 100vmax var(--blue-100);
    clip-path: inset(0 -100vmax);

    .logo {
      margin-top: 2em;
      align-self: center;
    }

    h2 {
      text-align: center;
      margin: auto;
      max-width: 350px;
    }
  }

  .addag-2 {
    margin-top: 5em;
    align-self: center;
    object-fit: cover;
    width: 100%;
    border-radius: 5em;
  }

  @media (min-width: 768px) {
    .addag-2 {
      height: 400px;
      width: 1000px;
    }
  }
</style>
