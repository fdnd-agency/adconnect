<script>
  import logomobile from '$lib/assets/logomobile.svg'
</script>

<section class="schedule" style="text-align: center;">
  <section style="display: inline-block; max-width: 700px;">
    <h2>Planning</h2>
    <p>
      Beleef de Landelijke Ad‑dag! De Landelijke Ad‑dag belooft een bruisende dag vol inspiratie, ontmoetingen en praktijkvoorbeelden te worden.
      Geleid door Maikel van Duinen, radiotalent en docent, word je meegenomen in een energieke dag vol boeiende sessies, waaronder een keynote over
      de maatschappelijke en economische impact van de Ad, inspirerende gesprekken tussen onderwijs, werkveld en studenten, de feestelijke uitreiking
      van de Ad Talent Award, workshops en excursies om de impact van Ad‑studenten van dichtbij te ervaren, en optredens met volop gelegenheid om
      elkaar te ontmoeten.
    </p>
  </section>

  <section class="cards">
    <article class="card">
      <div class="wrapper-text">
        <img class="logo" src={logomobile} alt="Logo" />
        <h2>Programma</h2>
      </div>
      <p>
        Programma in het kort (concept):<br />
        09.30 – 10.00 | Inloop met koffie/thee<br />
        10.00 – 13.00 | Opening, keynote, gesprekken en Ad Talent Award<br />
        13.00 – 13.45 | Lunch<br />
        13.45 – 15.30 | Workshops en excursies<br />
        15.30 – 17.00 | Borrel & ontmoeting<br /><br />
      </p>
      <a class="button-outline-blue" href="#">Bekijk Programma </a>
    </article>

    <article class="card">
      <div class="wrapper-text">
        <img class="logo" src={logomobile} alt="Logo" />
        <h2>Workshops</h2>
      </div>
      <p>
        Tijdens de Landelijke Ad‑dag worden verschillende workshops georganiseerd waarin deelnemers samen leren, ervaringen delen en praktische
        handvatten krijgen op thema’s zoals diversiteit, professionalisering, inzet van technologie binnen Ad‑onderwijs, loopbaanontwikkeling,
        duurzaamheid en samenwerking met werkveld en onderwijs. De precieze workshoptitels en inhoud worden jaarlijks aangepast en zijn onderdeel van
        het programma
      </p>
      <a class="button-outline-blue" href="link">Bekijk Workshops </a>
    </article>
  </section>
</section>

<style>
  .schedule {
    background-color: light-dark(var(--primary-blue), var(--blue-800));
    color: var(--text-white);
    padding: 2em;
    margin: auto;
    text-align: center;
    box-shadow: 0 0 0 100vmax var(--primary-blue);
    clip-path: inset(0 -100vmax);

    h2 {
      margin-top: 1em;
      color: var(--text-white);
      margin-bottom: 1em;
    }

    p {
      text-align: left;
    }
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    margin-top: 5em;
    gap: 1em;
    margin-bottom: 2em;

    article {
      border: 1px solid #cccccc;
      border-radius: 1em;
      padding: 2em;
      transition: 0.2s ease-in-out;
      display: flex;
      flex-direction: column;
      gap: 1em;
      background-color: light-dark(var(--text-white), hsl(210, 30%, 8%));
      text-align: center;
      margin: 0 auto;

      p {
        max-width: 500px;
      }

      &:hover {
        border: 1px solid #00408d;
        box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
        translate: 0 -1%;
        transition: 0.2s ease-in-out;
      }
    }

    h2 {
      color: var(--primary-blue);
    }
  }

  .card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 4;
    border: 1px solid var(--text-white);
    background-color: var(--text-white);
    color: light-dark(var(--primary-blue), var(--text-white));
    border-radius: 24px;
    padding: 2em;

    .logo {
      margin: 0;
      text-align: left;
      float: left;
    }
    h2 {
      margin-top: 0;
      margin-bottom: 0.5em;
      right: 1em;
      position: relative;
    }
  }

  a {
    margin-top: 1em;
    align-self: center;
  }
  @media (min-width: 1024px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5em;
    }
  }
</style>
