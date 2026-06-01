<script>
	import { RCardSection, RTimeTable } from '$lib'
	import { IconDots } from '$lib/icons'

	const { sectionInfo, programInfo, workshopInfo } = $props()
</script>

<section>
	<RCardSection
		title={sectionInfo.title}
		description={sectionInfo.description}
	/>

	<section class="cards">
		<article class="card">
			<div class="wrapper-text">
				<IconDots variant="heading-three" />
				<h3>Programma</h3>
			</div>

			<RTimeTable scheduleData={programInfo.schedule} />

			<a
				class="button-outline-blue"
				href={programInfo.link.href}
				>{programInfo.link.label}
			</a>
		</article>

		<article class="card">
			<div class="wrapper-text">
				<IconDots variant="heading-three" />
				<h3>Workshops</h3>
			</div>
			<p>
				{workshopInfo.description}
			</p>
			<a
				class="button-outline-blue"
				href={workshopInfo.link.href}
				>{workshopInfo.link.label}
			</a>
		</article>
	</section>
</section>

<style>
	.cards {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(4, auto);
		margin-top: 5em;
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
			background-color: light-dark(var(--text-white), hsl(210, 30%, 8%));
			text-align: center;
			margin: 0 auto;

			p {
				max-width: 500px;
			}

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

	.card {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 4;
		border: 1px solid var(--text-white);
		background-color: var(--text-white);
		color: light-dark(var(--primary-blue), var(--text-white));
		border-radius: 24px;
		padding: 2em;

		.logo {
			margin: 0;
			text-align: left;
			float: left;
		}
		h2 {
			margin-top: 0;
			margin-bottom: 0.5em;
			right: 1em;
			position: relative;
		}
	}

	a {
		margin-top: 1em;
		align-self: center;
	}
	@media (min-width: 1024px) {
		.cards {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.5em;
		}
	}
</style>
