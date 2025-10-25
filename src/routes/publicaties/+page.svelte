<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import DocumentCard from '$lib/components/documents/DocumentCard.svelte';
    import NavPros from '$lib/components/header/NavPros.svelte';
    import Hero from '$lib/components/hero/Hero.svelte';

    // Haal data op uit page.server.js via props
    let { data } = $props(); 
    let documents = $state(data.documents);
    let categories = $state(data.categories);
    let selectedCategory = $state(data.selectedCategory);

    // Effect om de state te synchroniseren als props veranderen
    $effect(() => {
        documents = data.documents;
        categories = data.categories;
        selectedCategory = data.selectedCategory;
    });

    // Update selectedCategory en URL bij wijziging
    function handleChange(event) {
        const value = event.target.value;
        selectedCategory = value;

        const url = new URL($page.url);
        url.searchParams.set("category", value);
        goto(url.toString(), { replaceState: true });
    }
</script>

<svelte:head>
  <title>Documenten | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
  title="Publicaties"
  description="Lorem ipsum dolor sit amet consectetur. Urna quis turpis egestas mauris. Nulla bibendum ultricies donec porttitor cies donec porttitor tempus eleifend nunc.tempus eleifend nunc.">
</Hero>

<div class="filter-buttons">
    <p>Kies een categorie:</p>
    <div class="filter">
        <a href="?category=alle-publicaties" class="button-outline-blue {selectedCategory === 'alle-publicaties' ? 'active' : ''}"> Alle publicaties</a>

        {#each categories as categorie}
            <a href={`?category=${categorie.title}`} class="button-outline-blue {selectedCategory === categorie.title ? 'active' : ''}"> {categorie.title}</a>
        {/each}  
    </div>
</div>

<div class="section-documents">
    <p>Aantal artikelen: {documents.length}</p>
    <ul>
        {#each documents as document}
            <li><DocumentCard {document}/></li>
        {/each}
    </ul>
</div>


<style>
    .filter-buttons {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 1em;
        width: 90%;
        padding: 3em 0 0 0;

        }

        .filter {
            display: flex;
            flex-direction: row;
            gap: 1em;
        }
    }

    .button-outline-blue.active {
        background-color: var(--primary-blue);
        color: white;
    }

    .section-documents {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 90%;
        padding: 3em 0;

    }

    ul {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        gap: 1em;

    }
</style>