<script>
    // Import component
    import { DividerText, NewsCard } from '$lib'

    // Retrieve news data
    export let news;
</script>

<!-- Cards section -->
<div class="container">
  <DividerText text="Het laatste nieuws" />
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

  :global(.divider-container) {
    margin: 0;
    width: 100%;
    padding: 0 0 2em 0;
  }
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