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
        width: 90%;
        padding: 4em 0 4em 0;
        align-self: center;
    }


    @media screen and (min-width: 720px) {
        ul {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));  
        }
    }
     li {
        list-style-type: none;
    }


            
</style>