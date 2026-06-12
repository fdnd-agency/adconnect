<script>
	import { CardTheme } from '$lib'
	const { sectionInfo, themes, backgroundBlue } = $props()
</script>

<section
	class="themes"
	class:themes--background-blue={backgroundBlue}
>
	<h2 class="themes__title">{sectionInfo.title}</h2>

	{#if sectionInfo.description}
		<p class="themes__description">{sectionInfo.description}</p>
	{/if}

	<div class="themes__list">
		{#each themes as theme (theme.title)}
			<CardTheme
				title={theme.title}
				description={theme.description}
				link={{ label: 'Meer informatie', href: `${theme.slug}`, screenReaderText: `over ${theme.title}` }}
				infoCard
			/>
		{/each}
	</div>
</section>

<style>
	.themes {
		--_background: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
		--_color: white;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
		width: 100%;
		padding: 3em 0;
		background-color: var(--_background);

		@media (min-width: 768px) {
			padding: 5em 0;
		}
	}

	.themes--background-blue {
		--_background: light-dark(var(--text-white), var(--blue-800));
	}

	.themes__title {
		text-align: center;
		color: var(--_color);
	}

	.themes__description {
		color: var(--_color);
	}

	.themes__list {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 90%;
		margin-top: 1em;

		@media (min-width: 768px) {
			grid-template-columns: repeat(auto-fill, minmax(22em, 1fr));
			max-width: 1400px;
			display: grid;
		}
	}
</style>
