<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import { RLink } from '$lib'

	const { data } = $props()

	const sourceFileId = data?.document?.source_file?.id ?? data?.document?.source_file ?? null
</script>

<article class="document-detail">
	<p>{data.document.description}</p>

	{#if sourceFileId}
		<div class="document-detail__file">
			<p>
				Hieronder een preview van het document of bekijk
				<RLink
					target="_blank"
					href={`${DIRECTUS_URL}/assets/${sourceFileId}`}
				>
					hier
				</RLink>
				het hele document
			</p>
			<iframe
				class="document-detail__preview"
				title={data.document.title}
				src={`${DIRECTUS_URL}/assets/${sourceFileId}`}
			></iframe>
		</div>
	{/if}
</article>

<style>
	.document-detail {
		display: flex;
		flex-direction: column;
		align-self: center;
		gap: 1em;
		margin: 2em min(6%, 3em);

		@media (min-width: 1025px) {
			align-self: start;
			width: 60%;
		}
	}

	.document-detail__file {
		display: flex;
		flex-direction: column;
		gap: 1em;

		iframe {
			height: 900px;
		}
	}

	.document-detail__preview {
		height: 30em;
	}
</style>
