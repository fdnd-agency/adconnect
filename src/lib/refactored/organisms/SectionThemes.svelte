<script>
	import { RCardInfo, ThemeCard } from '$lib'
	const { themes } = $props()
</script>

<section class="themes">
	<h2>Thema's binnen Associate degrees</h2>
	<section class="themes-section">
		<!-- <ThemeCard {themes} /> -->

		{#each themes as theme (theme.id)}
			<RCardInfo
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
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5em;
		padding: 0 0 3em 0;

		@media (min-width: 768px) {
			padding: 0 0 5em 0;
		}
	}

	.themes h2 {
		text-align: center;
	}

	.themes-section {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 90%;

		@media (min-width: 768px) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(22em, 1fr));
			max-width: 1400px;
		}
	}
</style>
