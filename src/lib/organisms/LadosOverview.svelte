<script>
	import LadoAccordionItem from '$lib/molecules/LadoAccordionItem.svelte'

	export let lados = []
</script>

<section
	class="lados-overview"
	id="overzicht-lados"
>
	<div class="inner-wrapper">
		<div class="heading-group">
			<h2>Overzicht LAdO's</h2>
			<p>Informatie en wijzigingen: Maritiem Muris, contactpersoon LAdO's.</p>
		</div>

		{#if lados.length}
			<div class="lados-grid">
				{#each lados as lado (lado.id)}
					<LadoAccordionItem {lado} />
				{/each}
			</div>
		{:else}
			<p class="empty-state">Er zijn nog geen gepubliceerde LAdO's gevonden.</p>
		{/if}
	</div>
</section>

<style>
	.lados-overview {
		background: light-dark(var(--text-white), var(--blue-800));
		color: light-dark(var(--blue-800), var(--text-white));
		padding: 3em 5% 5em;
	}

	.inner-wrapper {
		display: flex;
		flex-direction: column;
		gap: 2em;
		max-width: 1400px;
		margin: 0 auto;
	}

	.heading-group {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	h2,
	p {
		color: light-dark(var(--blue-800), var(--text-white));
	}

	.heading-group p {
		font-size: var(--p-xs-size);
	}

	.lados-grid {
		display: grid;
		align-items: start;
		gap: 1em;
	}

	.empty-state {
		background: light-dark(var(--text-white), var(--primary-blue));
		border: 1px solid light-dark(var(--neutral-300), var(--blue-300));
		border-radius: 0.5em;
		color: light-dark(var(--blue-900), var(--text-white));
		padding: 1.25em;
	}

	@media (min-width: 768px) {
		.lados-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
