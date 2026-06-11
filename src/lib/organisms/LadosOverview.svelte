<script>
	import LadoAccordionItem from '$lib/molecules/LadoAccordionItem.svelte'

	export let lados = []
	let sortedLados = []
	let ladoIds = new Set()
	let rootLados = []
	let leftColumnLados = []
	let rightColumnLados = []

	function getRelationId(value) {
		return value?.id ?? value
	}

	$: sortedLados = [...lados].sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl', { numeric: true }))
	$: ladoIds = new Set(sortedLados.map((lado) => String(lado?.id ?? '')).filter(Boolean))
	$: rootLados = sortedLados.filter((lado) => {
		const parentId = String(getRelationId(lado?.parent) ?? '')
		return !parentId || !ladoIds.has(parentId)
	})
	$: leftColumnLados = rootLados.filter((_, index) => index % 2 === 0)
	$: rightColumnLados = rootLados.filter((_, index) => index % 2 === 1)

	function getSubclusters(parentId) {
		return sortedLados.filter((lado) => String(getRelationId(lado?.parent) ?? '') === String(parentId))
	}
</script>

<section
	class="lados-overview"
	id="overzicht-lados"
>
	<div class="inner-wrapper">
		<div class="heading-group">
			<h2>Overzicht LAdO's</h2>
			<p>Informatie en wijzigingen: Mariëtte Muris, contactpersoon LAdO's.</p>
		</div>

		{#if lados.length}
			<div class="lados-list-mobile">
				{#each rootLados as lado (lado.id)}
					{@const subclusters = getSubclusters(lado.id)}
					<div class="lado-group">
						<LadoAccordionItem
							{lado}
							{subclusters}
						/>

						{#if subclusters.length}
							<div class="subcluster-list">
								{#each subclusters as subcluster (subcluster.id)}
									<LadoAccordionItem
										lado={subcluster}
										parent={lado}
										isSubcluster={true}
									/>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="lados-grid-desktop">
				<div class="lados-column">
					{#each leftColumnLados as lado (lado.id)}
						{@const subclusters = getSubclusters(lado.id)}
						<div class="lado-group">
							<LadoAccordionItem
								{lado}
								{subclusters}
							/>

							{#if subclusters.length}
								<div class="subcluster-list">
									{#each subclusters as subcluster (subcluster.id)}
										<LadoAccordionItem
											lado={subcluster}
											parent={lado}
											isSubcluster={true}
										/>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<div class="lados-column">
					{#each rightColumnLados as lado (lado.id)}
						{@const subclusters = getSubclusters(lado.id)}
						<div class="lado-group">
							<LadoAccordionItem
								{lado}
								{subclusters}
							/>

							{#if subclusters.length}
								<div class="subcluster-list">
									{#each subclusters as subcluster (subcluster.id)}
										<LadoAccordionItem
											lado={subcluster}
											parent={lado}
											isSubcluster={true}
										/>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<p class="empty-state">Er zijn nog geen gepubliceerde LAdO's gevonden.</p>
		{/if}
	</div>
</section>

<style>
	.lados-overview {
		background-color: var(--_main-background);
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

	.lados-list-mobile {
		display: grid;
		align-items: start;
		gap: 1em;
	}

	.lados-grid-desktop {
		display: none;
	}

	.lados-column {
		display: grid;
		align-items: start;
		gap: 1em;
	}

	.lado-group {
		display: grid;
		gap: 0.75em;
	}

	.subcluster-list {
		display: grid;
		gap: 0.65em;
		margin-left: 1.1em;
		padding-left: 0.95em;
		border-left: 4px solid var(--primary-blue);
	}

	.empty-state {
		background: light-dark(var(--text-white), var(--primary-blue));
		border: 1px solid light-dark(var(--neutral-300), var(--blue-300));
		border-radius: 0.5em;
		color: light-dark(var(--blue-900), var(--text-white));
		padding: 1.25em;
	}

	@media (min-width: 768px) {
		.lados-list-mobile {
			display: none;
		}

		.lados-grid-desktop {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			align-items: start;
			gap: 1em;
		}
	}
</style>
