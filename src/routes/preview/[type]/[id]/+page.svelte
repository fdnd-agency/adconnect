<script>
	import { PreviewBanner, SectionHero, DetailsPublicaties, DetailsOverOns, NominationDetail, LadosOverview } from '$lib'
	import { DIRECTUS_URL } from '$lib/constants.js'
	const { data } = $props()
</script>

<PreviewBanner status={data.content[0].status} />

{#if data.loadError}
	<p class="preview-message">{data.loadError}</p>
{:else if data.type === 'news'}
	{#each data.content as item (item.uuid)}
		<SectionHero
			sectionInfo={{
				title: item.title,
				description: item.description
			}}
			primaryLink={{ label: 'Terug', href: '/nieuws', screenReaderText: 'naar nieuws pagina' }}
			picture={{
				src: `${DIRECTUS_URL}/assets/${item.hero}`,
				alt: item.title,
				fetchpriority: 'high',
				loading: 'eager'
			}}
		/>
	{/each}
	<section class="news-detail">
		{#each data.content as item (item.uuid)}
			<article class="news-detail__article">
				<h2 class="news-detail__title">{item.title}</h2>
				<div class="news-detail__content">{@html item.body}</div>
			</article>
		{/each}
	</section>
{:else if data.type === 'themes'}
	{@const theme = data.content[0]}
	<SectionHero
		sectionInfo={{ title: theme?.title, description: theme?.description }}
		picture={{
			isEnhanced: true,
			src: `${DIRECTUS_URL}/assets/${theme?.hero}`,
			alt: '',
			width: '300',
			height: '210',
			fetchpriority: 'high',
			loading: 'eager'
		}}
	/>
	<DetailsOverOns documentData={theme} />
{:else if data.type === 'documents'}
	{@const doc = data.content[0]}
	<SectionHero
		sectionInfo={{ title: doc.title }}
		picture={{
			isEnhanced: true,
			src: `${DIRECTUS_URL}/assets/${doc.hero_image}?format=webp`,
			alt: doc.title,
			width: '300',
			height: '210',
			fetchpriority: 'high',
			loading: 'eager'
		}}
	/>
	<DetailsPublicaties data={{ document: doc }} />
{:else if data.type === 'nominations'}
	<NominationDetail data={{ nomination: data.content[0] }} />
{:else if data.type === 'lados'}
	<LadosOverview lados={data.content} />
{:else}
	<p class="preview-message">Geen preview beschikbaar voor dit contenttype.</p>
{/if}

<style>
	.preview-message {
		width: min(90%, 1400px);
		margin: 1rem auto;
		color: light-dark(var(--neutral-700), var(--neutral-200));
	}

	.news-detail {
		display: flex;
		flex-direction: column;
		gap: 2em;
		width: 80%;
		margin: auto;
		padding: 3em 0;

		@media (min-width: 900px) {
			flex-direction: row;
			align-items: flex-start;
			justify-content: center;
			gap: 4em;
		}
	}

	.news-detail__article {
		max-width: 800px;
		margin: 0 auto;
		padding: 1.5em 0;

		@media (min-width: 900px) {
			margin: 0;
			padding: 2em 0;
		}
	}

	.news-detail__title {
		margin-bottom: 1em;
		font-size: 1.5rem;
	}

	.news-detail__content {
		list-style-position: inside;
		font-family: var(--font-body);
		font-weight: var(--text-font-weight);
		font-size: var(--p-s-size);
		line-height: var(--p-s-line-height);
		max-width: var(--p-s-max-width);

		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
