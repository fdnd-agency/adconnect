<script>
      import NavPros from '$lib/components/header/NavPros.svelte';
      import NewsCardSection from "$lib/components/NewsCardSection.svelte";
      import Hero from "$lib/components/hero/Hero.svelte";
      import logomobile from '$lib/assets/logomobile.svg';
</script>

<NavPros />

<Hero
  title="Ad Dag "
  description="De landelijke Ad-dag 2025 is hét moment waarop studenten, 
  docenten en professionals uit het Ad-onderwijs samenkomen.Ontdek, leer en 
  inspireer elkaar tijdens een dag vol sprekers, workshops en ontmoetingen.
  Ervaar hoe de Ad-professional als veranderaar impact maakt en vier samen de
   uitreiking van de Ad Talent Awards. Meld je aan voor de komende ad dag of 
   blijf op de hoogte ">
	<a slot="primary" href="/dev/hero" class="button-outline-white">Meld je aan</a>
</Hero>

<article>
	<img class="logo-mobile" src={logomobile} alt="Logo" />
	<h2>Wat is de landelijke Ad-dag?</h2>
	<p> 
    De landelijke Ad-dag is een jaarlijks event georganiseerd door het 
    Overlegplatform Associate degrees. Op 11 april 2025 vindt de vijfde 
    editie plaats bij Aeres Hogeschool in Dronten (goed bereikbaar met het OV).
    Tijdens deze dag ontmoeten Ad-docenten, studenten, coördinatoren en 
    werkveldpartners elkaar om kennis en ervaringen te delen over de ontwikkelingen
    binnen het Ad-onderwijs. Ook worden die dag de Ad Talent Awards uitgereikt.
</p>
	<p>
    Het thema van dit jaar is:
    “De Ad-professional als veranderaar.”
</p>
</article>

<section class='cards'>
	<article>
		<img class="logo-mobile" src={logomobile} alt="Logo" />
		<h2>Wie komt er naar de Ad-dag?</h2>
		<p>De Ad-dag is bedoeld voor iedereen die betrokken is bij het Ad-onderwijs:</p>
		<ul>
			<li>Ad-studenten</li>
			<li>Docenten en coördinatoren</li>
			<li>Onderwijsinstellingen</li>
			<li>Werkveldpartners</li>
			<li>Beleidsmakers en onderzoekers</li>
		</ul>
	</article>
	<article>
		<img class="logo-mobile" src={logomobile} alt="Logo" />
		<h2>Waarom is het de moeite waard om te komen?</h2>
		<p>Waarom is het de moeite waard om te komen?
            Je ontmoet professionals uit het hele land</p>
		<ul>
			<li>Je leert van inspirerende sprekers en praktijkvoorbeelden</li>
			<li>Je ontdekt hoe Ad’ers verschil maken in hun vakgebied</li>
			<li>Je vergroot je netwerk en deelt kennis</li>
			<li>Je maakt kans om de Ad Talent Awards bij te wonen</li>
		</ul>
	</article>
</section>

<section>
	<article>
		<h2>Wat kun je verwachten van de Ad-dag?</h2>
		<p>De dag bestaat uit een inspirerend programma vol discussies, presentaties en workshops.
             Het thema komt terug in alle onderdelen van de dag:</p>
		<ul>
			<li>Ochtendprogramma: plenaire start met paneldiscussies en de uitreiking van de Ad Talent Awards.</li>
			<li>Panelgesprekken: vertegenwoordigers uit onderwijs, overheid en werkveld gaan in gesprek over de 
                vraag:“Welk onderscheidend vermogen heeft hbo-niveau 5 en hoe komt dat tot uiting in het werkveld?”</li>
			<li>Workshops en informatiesessies: delen van good practices en ervaringen over hoe Ad-professionals bijdragen
                 aan verandering in hun vakgebied.</li>
		</ul>
		<p> 
            Tijdens de dag kun je je ook ter plekke inschrijven voor de workshops. Er is daarnaast een 
            programmaboekje beschikbaar met alle sessies en sprekers.
        </p>
	</article>
	<img src="https://fdnd-agency.directus.app/assets/8f4e5b1e-1f3e-4c7d-9f7e-4e2b8e6f0c3b" alt="Ad-dag afbeelding" width="300" height="210" />
</section>
<section>
	<img src="https://fdnd-agency.directus.app/assets/8f4e5b1e-1f3e-4c7d-9f7e-4e2b8e6f0c3b" alt="Ad-dag afbeelding" width="300" height="210" />
	<article>
		<h2>Wat kun je verwachten van de Ad-dag?</h2>
		<p>De dag bestaat uit een inspirerend programma vol discussies, presentaties en workshops.
             Het thema komt terug in alle onderdelen van de dag:</p>
		<ul>
			<li>Ochtendprogramma: plenaire start met paneldiscussies en de uitreiking van de Ad Talent Awards.</li>
			<li>Panelgesprekken: vertegenwoordigers uit onderwijs, overheid en werkveld gaan in gesprek over de 
                vraag:“Welk onderscheidend vermogen heeft hbo-niveau 5 en hoe komt dat tot uiting in het werkveld?”</li>
			<li>Workshops en informatiesessies: delen van good practices en ervaringen over hoe Ad-professionals bijdragen
                 aan verandering in hun vakgebied.</li>
		</ul>
		<p> 
            Tijdens de dag kun je je ook ter plekke inschrijven voor de workshops. Er is daarnaast een 
            programmaboekje beschikbaar met alle sessies en sprekers.
        </p>
	</article>
</section>
