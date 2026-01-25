<script>
  import logomobile from "$lib/assets/logomobile.svg";
  import logodark from "$lib/assets/logomobiledark.svg";
  import Talent from "$lib/assets/ad-talent-awards.jpg";

  let { data } = $props();

  import { NavPros, Hero, Divider, DividerText } from "$lib";

  const imageUrl = (id) => `https://fdnd-agency.directus.app/assets/${id}`;
</script>

<svelte:head>
  <title>Talent Award| Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
  title="Ad Talent Award"
  description="Jaarlijks reikt het Overlegplatform de Ad Talent Award uit aan twee Associate degree-talenten, die worden benoemd tot landelijke Ad-ambassadeurs. Alle aangesloten hogescholen kunnen een Ad-talent nomineren. De winnaars ontvangen de award tijdens de jaarlijkse Ad-dag en vertegenwoordigen het Ad-onderwijs in Nederland."
>
  <img class="hero-image" src={Talent} alt="" fetchpriority="high" />
  <a slot="primary" href="#benefit" class="button-outline-white" id="benefit">Lees meer →</a>
</Hero>

<section class="intro">
  <img class="logo" src={logomobile} alt="Logo" width="50" height="50" />
  <h2>Wat is Ad Talent award?</h2>
  <p>
    De Ad Talent Award is een jaarlijkse onderscheiding die door het Overlegplatform Associate degrees wordt uitgereikt. Elke aangesloten hogeschool
    kan één student nomineren als “Ad Talent” en van alle genomineerden worden er twee landelijk uitgeroepen tot Ad-ambassadeur. Deze erkenning vindt
    plaats tijdens de jaarlijkse Ad-dag.
  </p>
</section>

<section class="cards-ta">
  <article class="light">
    <img class="logo" src={logomobile} alt="Logo" width="50" height="50" />
    <h2>Wat maakt iemand tot een Ad Talent?</h2>
    <p>
      Een Ad Talent is een student die uitblinkt in zijn of haar Associate degree-opleiding. Dit kan blijken uit academische prestaties, leiderschap,
      betrokkenheid bij de gemeenschap, innovatie of andere opmerkelijke bijdragen aan de hogeschool en de bredere samenleving. Ad Talenten worden
      erkend voor hun inzet, passie en potentieel om een positieve impact te maken in hun vakgebied en daarbuiten.
    </p>
  </article>

  <article class="dark">
    <img class="logo" src={logodark} alt="Logo" width="50" height="50" />
    <h2>Waarom de Ad Talent Award?</h2>
    <p>
      De Ad Talent Award is opgericht om de uitmuntendheid en het potentieel van Associate degree-studenten te erkennen en te vieren. Door deze
      onderscheiding willen we niet alleen de prestaties van individuele studenten benadrukken, maar ook het belang van Ad-onderwijs in Nederland
      onderstrepen. De award dient als inspiratie voor andere studenten en draagt bij aan het versterken van de reputatie van Associate degrees als
      waardevolle en impactvolle opleidingsvorm.
    </p>
  </article>

  <article class="light">
    <img class="logo" src={logomobile} alt="Logo" width="50" height="50" />
    <h2>Hoe gaat de verkiezing in zijn werk?</h2>
    <p>
      Elke hogeschool die is aangesloten bij het Overlegplatform Associate degrees kan één student nomineren voor de Ad Talent Award. Een
      onafhankelijke jury, bestaande uit vertegenwoordigers van het onderwijsveld en het bedrijfsleven, beoordeelt de nominaties op basis van vooraf
      vastgestelde criteria. De beoordeling omvat academische prestaties, leiderschap, maatschappelijke betrokkenheid en andere relevante factoren. Na
      een grondige evaluatie worden twee winnaars geselecteerd en tijdens de jaarlijkse Ad-dag bekendgemaakt als de landelijke Ad-ambassadeurs.
    </p>
  </article>
</section>

<section>
  <DividerText text="Voorgaande talent award winnaars" />

  <section class="previous-winners">
    <ul>
      {#each data.nomination.filter((item) => item.header?.toLowerCase() === "winnaar" && item.profile_picture) as winner (winner.id)}
        <li>
          <img src={imageUrl(winner.profile_picture)} alt={winner.title} height="200px" width="200px" />
          <section>
            <h3>{winner.title}</h3>
            <p>{winner.excerpt}</p>
          </section>
        </li>
      {/each}
    </ul>
  </section>
</section>

<section class="nominate">
  <img class="logo" src={logomobile} alt="Logo" width="50" height="50" />
  <h2>Voorgaande nominaties</h2>
  <p>
    Ontdek de talentvolle studenten die zijn genomineerd voor de AD Talent Award. Jaarlijks dragen hogescholen Associate degree-studenten voor die
    uitblinken in de praktijk, waarna een jury de uiteindelijke winnaars kiest.
  </p>
</section>

<section>
  <DividerText text="Voorgaande nominaties" />
</section>

<section class="slider">
  <ul class="slider-ul">
    {#each data.nomination as item (item.id)}
      <li class="nomination">
        <h3>{item.title}</h3>

        {#if item.profile_picture}
          <img src={imageUrl(item.profile_picture.id ?? item.profile_picture)} alt="item.title" class="profile-photo" />
        {/if}
      </li>
    {/each}
  </ul>
</section>

<style>
  .intro,
  .nominate {
    text-align: left;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: min(900px, 92vw);

    .logo {
      display: block;
      margin: 1rem auto;
    }

    h2 {
      text-align: center;
      margin-bottom: 1em;
    }

    p {
      max-width: 500px;
      margin: 0 auto;
      text-align: left;
    }
  }

  .nominate {
    align-items: center;
    gap: 1em;
  }

  .cards-ta {
    container-type: inline-size;
    container-name: cards;

    display: grid;
    gap: 2rem;
    padding: 0 1rem;
    margin: 2rem auto 5rem;
    width: 90%;
    max-width: 1400px;
  }

  @container cards (min-width: 1024px) {
    .cards-ta {
      grid-template-columns: repeat(3, 1fr);
    }

    .cards-ta article:nth-child(3) {
      grid-column: auto;
      justify-self: stretch;
      max-width: none;
    }
  }

  .cards-ta article {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;

    padding: 2rem;
    border-radius: 20px;
  }

  .cards-ta article .logo {
    justify-self: center;
    margin-bottom: 1rem;
  }

  .cards-ta article h2 {
    max-width: 36ch;
    margin: 0 auto 1rem;
    text-align: left;
  }

  .cards-ta article p {
    max-width: 50ch;
    margin: 0 auto;
    text-align: left;
  }

  .cards-ta article.dark {
    background-color: var(--primary-blue);
    color: var(--text-white);
  }

  .cards-ta article.dark h2 {
    color: var(--text-white);
  }

  .cards-ta article.light {
    background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
    border: 1.5px solid var(--primary-blue);
    color: light-dark(var(--blue-800), var(--text-white));
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

  .slider {
    overflow: visible;
    width: 100vw;
    max-width: 1400px;
  }

  .slider-ul {
    display: flex;
    animation: scroll 10s linear infinite;
  }

  ul:hover {
    animation-play-state: paused;
  }

  h3 {
    min-width: 200px;
  }

  li {
    flex: 0 0 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nomination {
    position: relative;
    margin-bottom: 3rem;
  }

  .profile-photo {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    width: 150px;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s ease;
  }

  .nomination:hover .profile-photo {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .previous-winners {
    background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
    padding: 2rem;
    border-radius: 15px;
    width: 90%;
    max-width: 1000px;

    li {
      display: flex;
      flex-direction: column;
      gap: 2em;
      align-items: flex-start;

      section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  }

  .previous-winners img {
    border-radius: 15px;
  }

  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-25%);
    }
  }

  @media (min-width: 768px) {
    .cards-ta {
      gap: 2rem;
      margin-bottom: 5em;
    }
  }

  @media (min-width: 1024px) {
    .cards-ta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      justify-content: center;
      max-width: 1500px;
      margin: 0 auto;
      margin-bottom: 5em;
    }
  }

  :global(main) {
    overflow-x: hidden;
  }
</style>
