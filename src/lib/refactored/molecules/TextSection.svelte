<script>
    import { DIRECTUS_URL } from '$lib/constants.js'
    import { RLink } from '$lib';

    export let data

    const sourceFileId = data?.document?.source_file?.id ?? data?.document?.source_file ?? null
</script>

<svelte:head>
	<title>Documenten | Overlegplatform Associate Degrees</title>
</svelte:head>

<div class="wrapper-detail">
	<article class="detail">
		<p>{data.document.description}</p>
		{#if sourceFileId}
			<div class="file">
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
					title={data.document.title}
					src={`${DIRECTUS_URL}/assets/${sourceFileId}`}
				></iframe>
			</div>
		{/if}
        </article>
<!-- 
	<div class="wrapper-ad-day">
		<section class="ad-day">
			<h2>Kom naar de Ad-dag!</h2>
			<p>Ontdek alles over Associate Degrees en laat je inspireren tijdens workshops en presentaties op de Landelijke Ad-dag.</p>
            <RLink
                href="/ad-dag"
                class="button-outline-white"
            >
                Meer weten over de AD-dag
            </RLink>
		</section>
	</div> -->
</div>

