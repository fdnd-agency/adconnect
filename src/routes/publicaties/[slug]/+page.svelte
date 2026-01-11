<script>
    import DocumentCard from "$lib/molecules/DocumentCard.svelte";

    import { NavPros, Hero } from '$lib'

    let { data } = $props(); 
    let documents = data.documents;
    const { document } = data;
</script>

<svelte:head>
  <title>Documenten | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
    title={document.title}
    description={document.description.split(' ').slice(0, 20).join(' ') + '...'}>
    <img class="hero-image" src={`https://fdnd-agency.directus.app/assets/${document.hero_image}?format=webp`} alt={document.title} fetchpriority=high />
</Hero>

<div class="wrapper-detail">
    <div class="detail">
        <p>{document.description}</p>
        {#if document.source_file}
        <div class="file">
            <p>Hieronder een preview van het document of bekijk <a target="_blank" href={`https://fdnd-agency.directus.app/assets/${document.source_file.id}`}>hier</a> het hele document</p>
            <iframe title="{document.title}" src={`https://fdnd-agency.directus.app/assets/${document.source_file.id}`}></iframe>
        </div>
        {/if}
    </div>
    
    <div class="wrapper-ad-day">
        <section class="ad-day">
            <h2>Kom naar de Ad-dag!</h2>
            <p>Ontdek alles over Associate Degrees en laat je inspireren tijdens workshops en presentaties op de Landelijke Ad-dag.</p>
            <a href="/ad-dag" class="button-outline-blue">Meer weten over de Ad-dag</a>
        </section>
    </div>
</div>

<style>
    .wrapper-detail {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 90%;
        padding: 3em 0;
        max-width: 1400px;
        margin: auto;
    }

    .detail {
        display: flex;
        flex-direction: column;
        gap: 1em;

    }

    @media (min-width: 768px) {
        .wrapper-detail {
            flex-direction: row;
            gap: 2em;
            padding: 5em 0;
        }
        
        .detail {
            width: 55%;

            :global(p) {
                max-width: unset;
            }

            @media (min-width: 1024px) {
                width: 65%;
            }
        }
    }

    .file {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        gap: 1em;

        iframe {
            height: 30em;
        }

        #document {
            width: 100%;
        }
    }

    /* Truncate words */
    .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; 
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        }

    @media (min-width: 1024px) {
        .wrapper-detail {
            gap: 5em;
        }
    }

    :global(.detail img) {
        width: 100%;
        max-width: 70%;
        object-fit: cover;
        border-radius: 1em;
    }

    @media (min-width: 768px) {
        .wrapper-ad-day {
            width: 50%;
        }
    }

    @media (min-width: 1024px) {
        .wrapper-ad-day {
            width: 30%;
        }
    }

    .ad-day {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 2em;
        background-color: var(--primary-blue);
        color: var(--text-white);
        border-radius: 1em;

        h2 {
            color: var(--text-white);
            font-size: var(--h4-size);
        }
    }

    @media (min-width: 768px) {
        .ad-day {
            position: sticky;
            top: 10em;
        }
    }
</style>
