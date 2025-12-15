<script>
    // Import component
    import NewsCard from "$lib/components/NewsCard.svelte";

    // Retrieve news data
    export let news;
</script>

<!-- Cards section -->
<div class="container">
    <ul>
        {#each news as article}
            <li><NewsCard {article}/></li>
        {/each}
    </ul>
</div>

<style>
.container {
  container-type: inline-size;
  container-name: news-container;
  padding: 0;
  padding: 2em 5%;
  max-width: 1400px;
  margin: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  list-style: none;
}

@container news-container (min-width: 720px) {
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
    gap: 1em;
  }
}
</style>