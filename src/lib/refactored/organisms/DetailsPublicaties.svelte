<script>
	import { RTextSection } from '$lib'

	const { data } = $props()
</script>

<div class="detail-layout">
	<RTextSection {data} />

	<section class="ad-day">
		<h2 class="ad-day__title">Kom naar de Ad-dag!</h2>
		<p class="ad-day__text">Ontdek alles over Associate Degrees en laat je inspireren tijdens workshops en presentaties op de Landelijke Ad-dag.</p>
		<a href="/ad-dag" class="button-outline-white ad-day__link">Meer weten over de Ad-dag</a>
	</section>
</div>

<style>
	.detail-layout {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		min-height: 600px;
		padding: min(5%, 3em);

		@media (min-width: 1025px) {
			flex-direction: row;
			justify-content: center;
		}
	}

	.ad-day {
		display: flex;
		flex-direction: column;
		align-self: center;
		gap: 1em;
		max-width: 360px;
		height: max-content;
		margin-bottom: 3em;
		padding: 2em;
		border-radius: 1em;
		background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
		color: var(--text-white);

		@media (min-width: 1025px) {
			position: sticky;
			top: 10em;
			margin: 2em 0 0 0;
			align-self: start;
		}
	}

	.ad-day__title {
		color: var(--text-white);
		font-size: var(--h4-size);
	}

	.ad-day__link:hover {
		color: var(--text-darkblue);
		background-color: var(--text-white);
	}
</style>