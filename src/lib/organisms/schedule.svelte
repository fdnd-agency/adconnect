<script>
	import logomobile from '$lib/assets/logomobile.svg'

	export let planningHeading = ''
	export let planningBody = ''
	export let programHeading = ''
	export let programBody = ''
	export let programButtonText = ''
	export let programButtonUrl = '#'
	export let workshopsHeading = ''
	export let workshopsBody = ''
	export let workshopsButtonText = ''
	export let workshopsButtonUrl = '#'
</script>

<section
	class="schedule"
	style="text-align: center;"
>
	<section style="display: inline-block; max-width: 700px;">
		<h2>{planningHeading}</h2>
		<p>{planningBody}</p>
	</section>

	<section class="cards">
		<article class="card">
			<div class="wrapper-text">
				<img
					class="logo"
					src={logomobile}
					alt="Logo"
					aria-hidden="true"
				/>
				<h2>{programHeading}</h2>
			</div>
			<p>{programBody}</p>
			<a
				class="button-outline-blue"
				href={programButtonUrl}>{programButtonText}</a
			>
		</article>

		<article class="card">
			<div class="wrapper-text">
				<img
					class="logo"
					src={logomobile}
					alt="Logo"
					aria-hidden="true"
				/>
				<h2>{workshopsHeading}</h2>
			</div>
			<p>{workshopsBody}</p>
			<a
				class="button-outline-blue"
				href={workshopsButtonUrl}>{workshopsButtonText}</a
			>
		</article>
	</section>
</section>

<style>
	.schedule {
		background-color: light-dark(var(--primary-blue), var(--blue-800));
		color: var(--text-white);
		padding: 2em;
		margin: auto;
		text-align: center;
		box-shadow: 0 0 0 100vmax var(--primary-blue);
		clip-path: inset(0 -100vmax);

		h2 {
			margin-top: 1em;
			color: var(--text-white);
			margin-bottom: 1em;
		}

		p {
			text-align: left;
			white-space: pre-line;
		}
	}

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
