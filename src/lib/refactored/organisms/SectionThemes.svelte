<script>
	import { RCardTheme } from '$lib'
	const { sectionInfo, themes, backgroundBlue } = $props()
</script>

<section
	class="themes"
	class:backgroundBlue
>
	<h2>{sectionInfo.title}</h2>
	{#if sectionInfo.description}
		<p>{sectionInfo.description}</p>
	{/if}

	<section class="themes-section">
		{#each themes as theme (theme.title)}
			<RCardTheme
				title={theme.title}
				description={theme.description}
				link={{ label: 'Meer informatie', href: `/over-ad/${theme.slug}`, screenReaderText: `over ${theme.title}` }}
				infoCard
			/>
		{/each}
	</section>
</section>

<style>
	.themes {
        --_background: light-dark(var(--primary-blue), hsl(210, 30%, 8%));

		background-color: var(--_background);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
		padding: 3em 0;

		@media (min-width: 768px) {
			padding: 6em 0;
		}
	}

	.backgroundBlue {
		--_background: light-dark(var(--text-white), var(--blue-800));
	}

	.themes h2 {
		text-align: center;
	}

	.themes-section {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 90%;
		margin-top: 1em;

		@media (min-width: 768px) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(22em, 1fr));
			max-width: 1400px;
		}
	}
</style>
