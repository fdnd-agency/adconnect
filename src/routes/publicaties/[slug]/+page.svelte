<script>
    import DocumentCard from "$lib/components/documents/DocumentCard.svelte";
    import NavPros from '$lib/components/header/NavPros.svelte';
    import Hero from '$lib/components/hero/Hero.svelte';

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
    <img class="hero-image" src={`https://fdnd-agency.directus.app/assets/${document.hero}`} alt={document.title} />
</Hero>

<section class="wrapper-detail">
    <div class="detail">
        <p>{document.description}</p>
        {#if document.source_file}
        <div class="file">
            <p>Hieronder een preview van het document of bekijk <a target="_blank" href={`https://fdnd-agency.directus.app/assets/${document.source_file.id}`}>hier</a> het hele document</p>
            <iframe title="{document.title}" src={`https://fdnd-agency.directus.app/assets/${document.source_file.id}`} type="application/pdf"></iframe>
        </div>
        {/if}
    </div>
    
    <div class="wrapper-ad-day">
        <section class="ad-day">
            <h2>Kom naar de Ad-dag!</h2>
            <p>Deze trendanalyse geeft een overzicht van de instroomontwikkeling in de bekostigde Ad’s, als ook de bewegingen per sector...</p>
            <a href="/dev/hero" class="button-outline-blue">Ik wil naar de Ad-dag →</a>
        </section>
    </div>
</section>
<!-- 
<section class="other-documents">
    <h2>Bekijk andere populaire thema's</h2>
    <section class="documents">
        <DocumentCard documents={documents.slice(0, 3)} />
    </section>
</section> -->
