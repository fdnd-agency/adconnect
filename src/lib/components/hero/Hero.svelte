<script>
  import { page } from "$app/stores";
  import placeholder from "$lib/assets/placeholder-hero.jpeg";

  export let title = "";
  export let description = "";
  export let breadcrumb = "";
</script>

<article class="hero">
  <section class="hero-content">
    <h1>{title}</h1>
    <p>{description}</p>
    {#if $page.url.pathname !== "/"}
      <nav class="hero__breadcrumb">
        {#if breadcrumb}
          {breadcrumb}
        {:else}
          {$page.url.pathname}
        {/if}
      </nav>
    {/if}
    <slot name="primary" />
    <slot name="secondary" />
  </section>
  <img class="hero-image" src={placeholder} alt="" />
</article>

<style>
  .hero {
    background-color: hsl(218 39 81 / 30%);
    width: 100vw;
    width: 100dvw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .hero-content {
    padding-top: 2em;
    padding-bottom: 2em;
    width: 90vw;
    width: 90dvw;
  }

  .hero-image {
    width: 90vw;
    width: 90dvw;
    border-radius: 30px 30px 0 0;
  }
</style>
