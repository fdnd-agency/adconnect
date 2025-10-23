<script>
	import NavPros from "$lib/components/header/NavPros.svelte";
	import NewsCardSection from "$lib/components/NewsCardSection.svelte";
	import Hero from "$lib/components/hero/Hero.svelte";
	import logomobile from "$lib/assets/logomobile.svg";
	import addag1 from "$lib/assets/addag-1.png";
	import addag2 from "$lib/assets/addag-2.png";
</script>

<NavPros />

<Hero
	title="Ad Dag "
	description="De landelijke Ad-dag 2025 is hét moment waarop studenten, 
  docenten en professionals uit het Ad-onderwijs samenkomen.Ontdek, leer en 
  inspireer elkaar tijdens een dag vol sprekers, workshops en ontmoetingen.
  Ervaar hoe de Ad-professional als veranderaar impact maakt en vier samen de
   uitreiking van de Ad Talent Awards. Meld je aan voor de komende ad dag of 
   blijf op de hoogte "
></Hero>

<article>
	<h2>Wat is de landelijke Ad-dag?</h2>
	<p>
		De Landelijke Ad-dag is het jaarlijkse moment waarop Associate degree
		(Ad)-onderwijs centraal staat. Studenten, docenten, coördinatoren,
		beleidsmakers en het werkveld komen samen om kennis te delen, inspiratie
		op te doen en elkaar te ontmoeten.  Verwacht een mix van plenaire
		sessies, panelgesprekken, workshops en praktijkvoorbeelden waarin je
		ziet wat niveau 5 toevoegt aan het hbo en aan organisaties. Het is
		tegelijk een showcase en werkdag: je viert wat er al gebeurt én je neemt
		concrete ideeën mee om morgen toe te passen.
	</p>
	<img src={addag1} alt="Ad-dag afbeelding" />
</article>

<section>
	<img src={logomobile} alt="logo" />
	<h2>Alles wat je wilt weten over de Ad-dag?</h2>
	<details>
		<summary>Voor wie is de Ad-dag bedoeld?</summary>
		<p>
			Lorem ipsum dolor sit amet consectetur. Ultrices at quis
			pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu
			lectus interdum egestas iaculis. Pellentesque elementum urna
		</p>
	</details>

	<details>
		<summary>Wie komen er naar de Ad-dag?</summary>
		<p>
			Lorem ipsum dolor sit amet consectetur. Ultrices at quis
			pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu
			lectus interdum egestas iaculis. Pellentesque elementum urna.
		</p>
	</details>

	<details>
		<summary>Waarom zou ik naar de Ad-dag gaan?</summary>
		<p>
			Lorem ipsum dolor sit amet consectetur. Ultrices at quis
			pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu
			lectus interdum egestas iaculis. Pellentesque elementum urna.
		</p>
	</details>

	<details>
		<summary>Wanneer en waar vindt de Ad-dag plaats?</summary>
		<p>
			Lorem ipsum dolor sit amet consectetur. Ultrices at quis
			pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu
			lectus interdum egestas iaculis. Pellentesque elementum urna.
		</p>
	</details>

	<img src={addag2} alt="Ad-dag afbeelding" />
</section>

<section>
	<h2>Planning</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at
		eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum
		egestas iaculis. Pellentesque elementum urna.
	</p>
</section>

<section class="cards">
	<article>
		<img class="logo-mobile" src={logomobile} alt="Logo" />
		<h2>Programma</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur. Ultrices at quis
			pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu
			lectus interdum egestas iaculis. Pellentesque elementum urna.
		</p>
		<a class="button-outline-blue">Bekijk Programma </a>
	</article>
	<article>
		<img class="logo-mobile" src={logomobile} alt="Logo" />
		<h2>Workshops</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur. Ultrices at quis
			pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu
			lectus interdum egestas iaculis. Pellentesque elementum urna.
		</p>
		<a class="button-outline-blue">Bekijk Workshops </a>
	</article>
</section>
