<script>
  import NavPros from '$lib/components/header/NavPros.svelte';
  import Hero from "$lib/components/hero/Hero.svelte";
  import DividerText from '$lib/components/divider/DividerText.svelte';
  import Divider from '$lib/components/divider/Divider.svelte';
  import logomobile from '$lib/assets/logo-mobile.svg';
  import logodark from '$lib/assets/logo-dark.svg';
</script>

<svelte:head>
  <title>Talent Award| Overlegplatform Associate Degrees</title>
</svelte:head>

</NavPros >

<Hero
  title="ATalent Award"
  description="Jaarlijks wordt door het Overlegplatform de Ad Talent Award 
  uitgereikt, waarmee twee Associate degree-talenten verkozen worden tot landelijke
   Ad-ambassadeur.  Elke hogeschool aangesloten bij het Overlegplatform Associate 
   degrees kan zijn of haar Ad-talent nomineren. En … twee van hen worden extra 
   in het zonnetje gezet. Op de jaarlijkse Ad-dag ontvangen zij de Ad Talent Award als 
   ambassadeurs van het Ad-onderwijs in Nederland.">
  <a slot="primary" href="#learn-more" class="button-outline-white" id="Nominate">Nomineer Talent</a>
</Hero>

<section class="intro">
    <img src={logomobile} alt="Ad Talent Award Logo" width="50" height="50" />
    <h2> Wat is Ad Talent award?</h2>
    <p> De Ad Talent Award is een jaarlijkse onderscheiding die door het Overlegplatform
        Associate degrees wordt uitgereikt. Elke aangesloten hogeschool kan één student
        nomineren als “Ad Talent” en van alle genomineerden worden er twee landelijk 
        uitgeroepen tot Ad-ambassadeur. Deze erkenning vindt plaats tijdens de jaarlijkse 
        Ad‑dag.
    </p>
</section>

<section class="winner">
    <h2> Dit Jaars Winaar</h2>
    <p> Lorem ipsum dolor sit amet consectetur. Semper semper neque diam ac facilisi orci.
        Amet ultrices et et sagittis. Pharetra sit elit rhoncus leo nisi facilisis sed purus et.
        Pellentesque praesent nisl sed egestas sapien. Odio pellentesque morbi purus erat tempor.
        Non sed tristique malesuada phasellus dolor. Malesuada orci phasellus a amet lectus nisi 
        massa massa.
    </p>
    <img src="https://via.placeholder.com/600x400" alt="Ad Talent Award Winner" width="600" height="400" />
    <p> Naam Winaar </p>
    <a href="#school"> Link school</a>

    <a href="#learn-more" class="button-outline-dark" id="learn-more">Lees meer</a>
</section>

<section>
    <article>
        <img src={logomobile} alt="Ad Talent Award Logo" width="50" height="50" />
        <h2>Wat maakt iemand tot een Ad Talent?</h2>
        <p> Een Ad Talent is een student die uitblinkt in zijn of haar Associate degree-opleiding.
            Dit kan blijken uit academische prestaties, leiderschap, betrokkenheid bij de 
            gemeenschap, innovatie of andere opmerkelijke bijdragen aan de hogeschool en 
            de bredere samenleving. Ad Talenten worden erkend voor hun inzet, passie en 
            potentieel om een positieve impact te maken in hun vakgebied en daarbuiten.
        </p>
    </article>

    <article>
        <img src={logodark} alt="Ad Talent Award Logo" width="50" height="50" />
        <h2>Waarom de Ad Talent Award?</h2>
        <p> De Ad Talent Award is opgericht om de uitmuntendheid en het potentieel van 
            Associate degree-studenten te erkennen en te vieren. Door deze onderscheiding 
            willen we niet alleen de prestaties van individuele studenten benadrukken, 
            maar ook het belang van Ad-onderwijs in Nederland onderstrepen. De award 
            dient als inspiratie voor andere studenten en draagt bij aan het versterken 
            van de reputatie van Associate degrees als waardevolle en impactvolle 
            opleidingsvorm.
        </p>
    </article>

    <article>
        <img src={logomobile} alt="Ad Talent Award Logo" width="50" height="50" />
        <h2>Hoe gaat de verkiezing in zijn werk?</h2>
        <p> Elke hogeschool die is aangesloten bij het Overlegplatform Associate degrees 
            kan één student nomineren voor de Ad Talent Award. Een onafhankelijke jury, 
            bestaande uit vertegenwoordigers van het onderwijsveld en het bedrijfsleven, 
            beoordeelt de nominaties op basis van vooraf vastgestelde criteria. De 
            beoordeling omvat academische prestaties, leiderschap, maatschappelijke 
            betrokkenheid en andere relevante factoren. Na een grondige evaluatie 
            worden twee winnaars geselecteerd en tijdens de jaarlijkse Ad-dag 
            bekendgemaakt als de landelijke Ad-ambassadeurs.
        </p>
    </article>
</section>

</Divider>

<section>
    <img src={logomobile} alt="Ad Talent Award Logo" width="50" height="50" />
    <h2>Nomineer een Ad Talent</h2>
    <p> 
        Ken jij een Associate degree-student die uitblinkt in zijn of haar opleiding 
        en een positieve impact maakt? Nomineer deze student dan voor de Ad Talent 
        Award! Stuur een motivatiebrief en relevante documenten naar het Overlegplatform 
        Associate degrees via [e-mailadres] vóór [deadline]. Samen kunnen we de 
        prestaties van onze Ad-talenten vieren en hen de erkenning geven die ze verdienen.
    </p>
    <a href="#Nominate" class="button-outline-dark" id="Nominate">Nomineer nu</a>
</section>







