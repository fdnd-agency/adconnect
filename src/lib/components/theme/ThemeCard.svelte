<script>
    // Retrieve themes data
    export let themes;

    // Import image
    import dots from '$lib/assets/dots.svg';
    
</script>

{#each themes as theme}
  <article>
    <div class="wrapper-text">
        <img src={dots} alt="" width="50" height="50" />
         <h3 class="truncate single">{theme.title}</h3>
    </div>
    <p class="truncate two">{theme.description}</p>
    <a class="button-outline-blue" href={`over-ad/${theme.slug}`}>Meer informatie</a>
  </article>
{/each}

