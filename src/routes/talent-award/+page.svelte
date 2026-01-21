<script>
    import Hero from "$lib/components/hero/Hero.svelte";
    import DividerText from "$lib/components/divider/DividerText.svelte";
    import { NavPros } from "$lib";

    import logomobile from "$lib/assets/logomobile.svg";
    import logodark from "$lib/assets/logomobiledark.svg";

    let { data } = $props();

</script>

<svelte:head>
    <title>Talent Award| Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
    title="Ad Talent Award"
    description="Jaarlijks wordt door het Overlegplatform de Ad Talent Award 
    uitgereikt, waarmee twee Associate degree-talenten verkozen worden tot landelijke
     Ad-ambassadeur.  Elke hogeschool aangesloten bij het Overlegplatform Associate 
     degrees kan zijn of haar Ad-talent nomineren. En … twee van hen worden extra 
     in het zonnetje gezet. Op de jaarlijkse Ad-dag ontvangen zij de Ad Talent Award als 
     ambassadeurs van het Ad-onderwijs in Nederland."
>
    >
</Hero>

<section class="intro">
    <img
        class="logo"
        src={logomobile}
        alt="Ad Talent Award Logo"
        width="50"
        height="50"
    />
    <h2>Wat is Ad Talent award?</h2>
    <p>
        De Ad Talent Award is een jaarlijkse onderscheiding die door het
        Overlegplatform Associate degrees wordt uitgereikt. Elke aangesloten
        hogeschool kan één student nomineren als “Ad Talent” en van alle
        genomineerden worden er twee landelijk uitgeroepen tot Ad-ambassadeur.
        Deze erkenning vindt plaats tijdens de jaarlijkse Ad-dag.
    </p>
</section>

<section class="cards-ta">
    <article class="light">
        <img
            class="logo"
            src={logomobile}
            alt="Ad Talent Award Logo"
            width="50"
            height="50"
        />
        <h2>Wat maakt iemand tot een Ad Talent?</h2>
        <p>
            Een Ad Talent is een student die uitblinkt in zijn of haar Associate
            degree-opleiding. Dit kan blijken uit academische prestaties,
            leiderschap, betrokkenheid bij de gemeenschap, innovatie of andere
            opmerkelijke bijdragen aan de hogeschool en de bredere samenleving.
            Ad Talenten worden erkend voor hun inzet, passie en potentieel om
            een positieve impact te maken in hun vakgebied en daarbuiten.
        </p>
    </article>

    <article class="dark">
        <img
            class="logo"
            src={logodark}
            alt="Ad Talent Award Logo"
            width="50"
            height="50"
        />
        <h2>Waarom de Ad Talent Award?</h2>
        <p>
            De Ad Talent Award is opgericht om de uitmuntendheid en het
            potentieel van Associate degree-studenten te erkennen en te vieren.
            Door deze onderscheiding willen we niet alleen de prestaties van
            individuele studenten benadrukken, maar ook het belang van
            Ad-onderwijs in Nederland onderstrepen. De award dient als
            inspiratie voor andere studenten en draagt bij aan het versterken
            van de reputatie van Associate degrees als waardevolle en
            impactvolle opleidingsvorm.
        </p>
    </article>

    <article class="light">
        <img
            class="logo"
            src={logomobile}
            alt="Ad Talent Award Logo"
            width="50"
            height="50"
        />
        <h2>Hoe gaat de verkiezing in zijn werk?</h2>
        <p>
            Elke hogeschool die is aangesloten bij het Overlegplatform Associate
            degrees kan één student nomineren voor de Ad Talent Award. Een
            onafhankelijke jury, bestaande uit vertegenwoordigers van het
            onderwijsveld en het bedrijfsleven, beoordeelt de nominaties op
            basis van vooraf vastgestelde criteria. De beoordeling omvat
            academische prestaties, leiderschap, maatschappelijke betrokkenheid
            en andere relevante factoren. Na een grondige evaluatie worden twee
            winnaars geselecteerd en tijdens de jaarlijkse Ad-dag bekendgemaakt
            als de landelijke Ad-ambassadeurs.
        </p>
    </article>
</section>


<section class="nominate">
    <img
        class="logo"
        src={logomobile}
        alt="Ad Talent Award Logo"
        width="50"
        height="50"
    />
    <p>
    </p>
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
        gap: 2rem;
        padding: 0 1rem;
    }

    .cards-ta article {
        padding: 2rem;
        border-radius: 20px;
    }

    .cards-ta article .logo {
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
        background-color: var(--blue-100);
        border: 1.5px solid var(--primary-blue);
        color: var(--blue-800);
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
</style>
