<script>
    import { DIRECTUS_URL } from '$lib/constants.js'
    import { RLink } from '$lib'

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
</div>


<style>
    .wrapper-detail {
        container: detail / inline-size;
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 100%;
        max-width: 1400px;
    }
 
    .detail {
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin: auto 3em;
    }
 
    @media (min-width: 768px) {
        .wrapper-detail {
            flex-direction: row;
            gap: 2em;
            padding: 5em 0;
        }
 
        .detail {
            width: clamp(55%, 60%, 65%);
        }
    }
 
    .file {
        display: flex;
        flex-direction: column;
        gap: 1em;
 
        iframe {
            height: 30em;
        }
    }
 
    @media (min-width: 1024px) {
        .wrapper-detail {
            gap: 5em;
        }
    }
</style>