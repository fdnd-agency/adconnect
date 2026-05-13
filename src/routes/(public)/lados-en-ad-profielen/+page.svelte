<script>
	import { Hero, LadoInfoCard, LadosOverview, overleggen } from '$lib'

	const { data } = $props()

	const infoCards = [
		{
			title: 'Gezamenlijke profilering van vergelijkbare Ad-opleidingen',
			description:
				'In een LAdO stemmen de aangesloten Ad-opleidingen met elkaar af over een gezamenlijke profilering om tot landelijk herkenbare opleidingen te komen. Deze profilering is richtinggevend voor (aankomende) studenten, werkgevers en kwaliteitstoetsing door de NVAO.'
		},
		{
			title: 'Gezamenlijke afstemming op het specifieke werkveld',
			description:
				'Elke hogeschool heeft met haar eigen regio te maken, maar ook met landelijke werkgeversorganisaties, brancheorganisaties en beroepsverenigingen. Binnen een LAdO wordt hierover gezamenlijk afgestemd.'
		},
		{
			title: 'Gezamenlijke afstemming op andere (overheids)organen',
			description:
				"In de LAdO's is regelmatig afstemming met de NVAO, het ministerie van OCW en de Commissie Doelmatigheid Hoger Onderwijs. Opleidingen kunnen veel van elkaar leren als het gaat om accreditaties en onderwijsvernieuwingen."
		},
		{
			title: 'Onderlinge uitwisseling en afstemming over onderwijsuitvoering',
			description: 'In de ontwikkeling en doorontwikkeling van Ad-opleidingen valt veel van elkaar te leren, bijvoorbeeld over niveau, toetsing, praktijkleren en digitaal onderwijsmateriaal.',
			open: true
		}
	]
</script>

<svelte:head>
	<title>LAdO's en Ad-profielen | Overlegplatform Associate Degrees</title>
</svelte:head>

<Hero
	title="Landelijke Ad-overleggen en Ad-profielen"
	description="Het Overlegplatform Associate degrees ondersteunt het belang van Ad-opleidingen om zich samen te positioneren en te profileren in het Nederlandse onderwijslandschap."
>
	<a
		slot="primary"
		href="#over-lados"
		class="button-outline-white">Lees meer</a
	>
	<a
		slot="secondary"
		href="#overzicht-lados"
		class="button-outline-white">Bekijk overzicht</a
	>
	<img
		class="hero-image"
		src={overleggen}
		alt="Mensen tijdens een landelijk overleg over Associate degree-opleidingen"
		fetchpriority="high"
	/>
</Hero>

<section
	class="lado-info"
	id="over-lados"
>
	<div class="inner-wrapper">
		<h2>Over LAdO's</h2>

		<div class="card-grid">
			{#each infoCards as card (card.title)}
				<LadoInfoCard {...card} />
			{/each}
		</div>
	</div>
</section>

{#if data.loadError}
	<section class="load-error">
		<p>{data.loadError}</p>
	</section>
{/if}

<LadosOverview lados={data.lados} />

<style>
	.hero-image {
		display: block;
		width: 100%;
		height: 20em;
		object-fit: cover;
		border-radius: 1em 1em 0 0;
	}

	.lado-info {
		background: light-dark(var(--text-white), var(--blue-800));
		padding: 3em 5%;
	}

	.inner-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25em;
		max-width: 1400px;
		margin: 0 auto;
	}

	h2 {
		color: light-dark(var(--blue-800), var(--text-white));
	}

	.card-grid {
		display: grid;
		align-items: start;
		gap: 1.5em;
	}

	.load-error {
		background: light-dark(var(--text-white), var(--blue-800));
		padding: 0 5%;
	}

	.load-error p {
		max-width: 1400px;
		margin: 0 auto;
		border: 1px solid var(--primary-orange);
		border-radius: 0.5em;
		padding: 1em;
		color: light-dark(var(--blue-900), var(--text-white));
	}

	@media (min-width: 768px) {
		.hero-image {
			height: 25em;
			border-radius: 1em;
		}

		.card-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
