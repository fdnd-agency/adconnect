<script>
	import NavPros from "$lib/components/header/NavPros.svelte";
	import Hero from "$lib/components/hero/Hero.svelte";
	import logomobile from "$lib/assets/logomobile.svg";
	import addag1 from "$lib/assets/addag-1.png";
	import InfoAddag from "$lib/components/ad/InfoAddag.svelte";
	import Schedule from "$lib/components/ad/Schedule.svelte";
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
  
  <section class="intro">
	<article>
	  <h2>Wat is de landelijke Ad-dag?</h2>
	  <p>
		De Landelijke Ad-dag is het jaarlijkse moment waarop Associate
		degree (Ad)-onderwijs centraal staat. Studenten, docenten,
		coördinatoren, beleidsmakers en het werkveld komen samen om kennis
		te delen, inspiratie op te doen en elkaar te ontmoeten.  Verwacht
		een mix van plenaire sessies, panelgesprekken, workshops en
		praktijkvoorbeelden waarin je ziet wat niveau 5 toevoegt aan het hbo
		en aan organisaties. Het is tegelijk een showcase en werkdag: je
		viert wat er al gebeurt én je neemt concrete ideeën mee om morgen
		toe te passen.
	  </p>
	</article>
	<img src={addag1} alt="" width="450px" />
  </section>
  
  
  <InfoAddag />
  <Schedule />
  
  
  <style>
	.logo {
	  width: 50px;
	  height: 50px;
	}
  
	.intro {
	  display: flex;
	  flex-direction: column;
	  padding: 3em 5%;
	  max-width: 1400px;
	  align-items: center;
	  gap: 0.5em;
	  align-self: center;
	  margin: auto;
  
	  article {
		max-width: 600px;
  
		p {
		  margin-top: 1em;
		}
	  }
	}
  
  
	@media (min-width: 768px) {
		.cards {
			grid-template-columns: repeat(2, 1fr);
			gap: 2em;
		}

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
</style>
