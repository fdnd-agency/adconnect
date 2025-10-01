<script>
    // Import component
    import NewsCard from "$lib/components/NewsCard.svelte";
</script>

<ul>
    {#each news.slice(0, 3) as article}
        <li><NewsCard /></li>
    {/each}
</ul>
