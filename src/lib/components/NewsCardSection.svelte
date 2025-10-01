<script>
    // Import component
    import NewsCard from "$lib/components/NewsCard.svelte";
</script>

<ul>
    {#each news.slice(0, 3) as article}
        <li><NewsCard /></li>
    {/each}
</ul>

<style>
    ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 90vw;
        width: 90dvw;

    }

     li {
        list-style-type: none;
    }

</style>