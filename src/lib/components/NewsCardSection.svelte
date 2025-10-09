<script>
    // Import component
    import NewsCard from "$lib/components/NewsCard.svelte";

    // Retrieve news data
    export let news;
</script>

<!-- Cards section -->
<ul>
     {#each news as article}
        <li><NewsCard {article}/></li>
    {/each}
</ul>

<style>
    ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 90vw;
        padding: 4em 0 4em 0;
    }


    @media screen and (min-width: 720px) {
        ul {
          display: grid;
          width: 80vw;
          grid-template-columns: repeat(auto-fill, minmax(22em, 1fr));  
          max-height: calc(3 * 25em);
        }
    }
     li {
        list-style-type: none;
    }


            
</style>