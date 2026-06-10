<script>
	import { Link } from '$lib'

	const { documentData } = $props()

	const theme = $derived(documentData)
</script>

<svelte:head>
	<title>{theme.title} | Overlegplatform Associate Degrees</title>
</svelte:head>

<section class="detail-layout">
	<div class="detail-layout__content">
		{@html theme.body}
	</div>

	<div class="detail-layout__sidebar">
		<section class="ad-day">
			<h2 class="ad-day__title">Kom naar de Ad-dag!</h2>
			<p class="ad-day__text">Ontdek alles over Associate Degrees en laat je inspireren tijdens workshops en presentaties op de Landelijke Ad-dag.</p>
			<Link
				href="/ad-dag"
				class="button-outline-white">Meer weten over de Ad-dag</Link
			>
		</section>
	</div>
</section>

<style>
	.detail-layout {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 90%;
		max-width: 1400px;
		margin: auto;
		padding: 3em 0;

		@media (min-width: 768px) {
			flex-direction: row;
			gap: 2em;
			padding: 5em 0;
		}

		@media (min-width: 1024px) {
			gap: 5em;
		}
	}

	.detail-layout__content {
		display: flex;
		flex-direction: column;
		gap: 2em;

		@media (min-width: 768px) {
			width: 55%;
		}

		@media (min-width: 1024px) {
			width: 65%;
		}
	}

	/* Content uit {@html}: geen scoped class, dus via :global */
	:global(.detail-layout__content img) {
		width: 100%;
		border-radius: 1em;
		object-fit: cover;

		@media (min-width: 768px) {
			max-width: 70%;
		}
	}

	:global(.detail-layout__content p) {
		@media (min-width: 768px) {
			max-width: unset;
		}
	}

	.detail-layout__sidebar {
		@media (min-width: 768px) {
			width: 50%;
		}

		@media (min-width: 1024px) {
			width: 30%;
		}
	}

	.ad-day {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 2em;
		border-radius: 1em;
		background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
		color: var(--text-white);

		@media (min-width: 768px) {
			position: sticky;
			top: 10em;
		}
	}

	.ad-day__title {
		color: var(--text-white);
		font-size: var(--h4-size);
	}
</style>
