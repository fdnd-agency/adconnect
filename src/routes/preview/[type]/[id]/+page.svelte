<script>
	import { PreviewBanner, NewsDetail, ThemeDetail, PublicationDetail } from '$lib'
	const { data } = $props()
</script>

<PreviewBanner status={data.content[0].status} />

{#if data.loadError}
	<p class="preview-message">{data.loadError}</p>
{:else if data.type === 'news'}
	<NewsDetail data={{ content: data.content }} />
{:else if data.type === 'themes'}
	<ThemeDetail
		data={data.content}
		themes={data.content}
	/>
{:else if data.type === 'documents'}
	<PublicationDetail data={{ document: data.content[0] }} />
{:else}
	<p class="preview-message">Geen preview beschikbaar voor dit contenttype.</p>
{/if}

<style>
	.preview-message {
		width: min(90%, 1400px);
		margin: 1rem auto;
		color: light-dark(var(--neutral-700), var(--neutral-200));
	}
</style>
