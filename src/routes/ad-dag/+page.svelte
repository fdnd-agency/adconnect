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

	<section class="faqs">
		<details open>
			<summary>Voor wie is de Ad-dag bedoeld?</summary>
			<p>
				Lorem ipsum dolor sit amet consectetur. Ultrices at quis
				pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
				eu lectus interdum egestas iaculis. Pellentesque elementum urna
			</p>
		</details>
		<details>
			<summary>Wie komen er naar de Ad-dag?</summary>
			<p>
				Lorem ipsum dolor sit amet consectetur. Ultrices at quis
				pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
				eu lectus interdum egestas iaculis. Pellentesque elementum urna.
			</p>
		</details>
		<details>
			<summary>Waarom zou ik naar de Ad-dag gaan?</summary>
			<p>
				Lorem ipsum dolor sit amet consectetur. Ultrices at quis
				pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
				eu lectus interdum egestas iaculis. Pellentesque elementum urna.
			</p>
		</details>
		<details>
			<summary>Wanneer en waar vindt de Ad-dag plaats?</summary>
			<p>
				Lorem ipsum dolor sit amet consectetur. Ultrices at quis
				pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
				eu lectus interdum egestas iaculis. Pellentesque elementum urna.
			</p>
		</details>
	</section>
	<img src={addag2} alt="" width="500" height="300" />
</section>

<section class="schedule">
	<h2>Planning</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur. Ultrices at quis pellentesque at
		eget ut suspendisse. Rhoncus purus ultrices quis eu lectus interdum
		egestas iaculis. Pellentesque elementum urna.
	</p>

	<section class="cards">
		<article class="programma">
			<div class="wrapper-text">
				<img class="logo" src={logomobile} alt="Logo" />
				<h2>Programma</h2>
			</div>
			<p>
				Lorem ipsum dolor sit amet consectetur. Ultrices at quis
				pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
				eu lectus interdum egestas iaculis. Pellentesque elementum urna.
			</p>
			<a class="button-outline-blue">Bekijk Programma </a>
		</article>

		<article class="workshops">
			<div class="wrapper-text">
				<img class="logo" src={logomobile} alt="Logo" />
				<h2>Workshops</h2>
			</div>
			<p>
				Lorem ipsum dolor sit amet consectetur. Ultrices at quis
				pellentesque at eget ut suspendisse. Rhoncus purus ultrices quis
				eu lectus interdum egestas iaculis. Pellentesque elementum urna.
			</p>
			<a class="button-outline-blue">Bekijk Workshops </a>
		</article>
	</section>
</section>

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

	.info-addag {
		display: flex;
		flex-direction: column;
		background-color: var(--blue-100);
		padding: 3em 5%;
		box-sizing: border-box;
		position: relative;

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

	.faqs {
		display: flex;
		flex-direction: column;
		margin-top: 2em;
		align-items: center;
		margin-top: 2em;
		gap: 1em;
	}

	details {
		border: 1px solid var(--neutral-300);
		border-radius: 0.5em;
		padding: 1em;
		margin-top: 2em;
		width: 80%;
		position: relative;
		z-index: 1;
		background-color: var(--text-white);
		margin-top: 0;

		p {
			width: 100%;
		}

		@media (min-width: 768px) {
			width: 55vw;
			align-self: center;
		}
		summary {
			list-style: none;
			font-family: var(--font-heading);
			font-weight: var(--heading-font-weight);
			font-size: var(--h4-size);
			line-height: 2em;
			cursor: pointer;
		}
	}

	::details-content {
		transition:
			height 0.5s ease,
			content-visibility 0.5s ease allow-discrete;
		height: 0;
		overflow: clip;
	}

	[open]::details-content {
		height: auto;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	details summary::after {
		content: url("/static/chevron-down-blue.svg");
		transition: transform 0.3s;
	}

	details[open] summary::after {
		transform: rotate(180deg);
	}

	img {
		margin-top: 5em;
	}

	.schedule {
		background-color: var(--primary-blue);
		color: var(--text-white);
		padding: 2em;
		margin: auto;
		text-align: center;

		h2 {
			margin-top: 1em;
			color: var(--text-white);
		}

		p {
			text-align: left;
		}
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
		grid-template-rows: repeat(4, auto);
		margin-top: 3em;
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
			background-color: var(--text-white);

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

	.wrapper-text {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.programma,
	.workshops {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 4;
		border: 1px solid var(--text-white);
		background-color: var(--text-white);
		color: var(--primary-blue);
		border-radius: 24px;
		padding: 2em;

		.logo {
			padding: 1em;
			margin: 0;
		}

		h2 {
			margin: 0.6em;
		}

		a {
			margin-top: 1em;
			align-self: center;
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
