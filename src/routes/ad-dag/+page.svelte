<script>
	import NavPros from "$lib/components/header/NavPros.svelte";
	import Hero from "$lib/components/hero/Hero.svelte";
	import logomobile from "$lib/assets/logomobile.svg";
	import addag1 from "$lib/assets/addag-1.png";
	import InfoAddag from "$lib/components/ad/infoaddag.svelte";
	import Schedule from "$lib/components/ad/schedule.svelte";
  	import Location from "$lib/components/location/location.svelte";
  	import Faq from '$lib/components/faq/MultipleFaq.svelte';
	import SingleFaq from '$lib/components/faq/SingleFaq.svelte';
    import addag2 from "$lib/assets/addag-2.png";
  import MultipleFaq from "$lib/components/faq/MultipleFaq.svelte";
  </script>
  
  <svelte:head>
  <title> Ad dag | Overlegplatform Associate Degrees</title>
</svelte:head>
  
  <NavPros />
  
  <main>
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
  
    <section class="info-addag">
		<img class="logo" src={logomobile} alt="" />
    	<h2>Alles wat je wilt weten over de Ad-dag?</h2>
		
		<MultipleFaq>
			<SingleFaq
				open={true}
				question="Voor wie is de Ad-dag bedoeld?"
				answer="Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna."
			/>
			
			<SingleFaq
				question="Wie komen er naar de Ad-dag?"
				answer="Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna."
			/>

			<SingleFaq
				question="Waarom zou ik naar de Ad-dag moeten gaan?"
				answer="Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna."
			/>

			<SingleFaq
				question="Wanneer en waar vindt de Ad-dag plaats?"
				answer="Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum egestas iaculis. Pellentesque elementum urna."
			/>
		</MultipleFaq>

		<img class="addag-2" src={addag2} alt="" width="600" height="300" />
	</section>
   <Schedule />
   <Location/>
</main>
  
  <style>
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
      background-color: var(--blue-100);
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
  
