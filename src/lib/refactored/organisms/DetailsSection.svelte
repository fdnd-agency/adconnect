<script>
	import { RTextSection } from '$lib'

	const { data } = $props()
</script>

<div class="wrapper-detail">
	<RTextSection {data} />

	<div class="wrapper-ad-day">
		<section class="ad-day">
			<h2>Kom naar de Ad-dag!</h2>
			<p>Ontdek alles over Associate Degrees en laat je inspireren tijdens workshops en presentaties op de Landelijke Ad-dag.</p>
			<a
				href="/ad-dag"
				class="button-outline-white">Meer weten over de Ad-dag</a
			>
		</section>
	</div>
</div>

<style>
	.wrapper-detail {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 90%;
		padding: 3em 0;
		max-width: 1400px;
		margin: auto;
	}

	.detail {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	@media (min-width: 768px) {
		.wrapper-detail {
			flex-direction: row;
			gap: 2em;
			padding: 5em 0;
		}
	}

	@media (min-width: 768px) {
		.wrapper-ad-day {
			width: 50%;
		}
	}

	@media (min-width: 1024px) {
		.wrapper-ad-day {
			width: 30%;
		}
	}

	.ad-day {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 2em;
		background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
		color: var(--text-white);
		border-radius: 1em;

		h2 {
			color: var(--text-white);
			font-size: var(--h4-size);
		}

		a:hover {
			color: var(--text-darkblue);
			background-color: var(--text-white);
		}
	}

	@media (min-width: 768px) {
		.ad-day {
			position: sticky;
			top: 10em;
		}
	}
</style>
