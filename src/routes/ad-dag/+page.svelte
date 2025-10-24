<script>
	import NavPros from "$lib/components/header/NavPros.svelte";
	import Hero from "$lib/components/hero/Hero.svelte";
	import logomobile from "$lib/assets/logomobile.svg";
	import addag1 from "$lib/assets/addag-1.png";
	title="Ad Dag "
	description="De landelijke Ad-dag 2025 is hét moment waarop studenten, 
	<article>
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
		p {
			width: 100%;
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
