<script>
  import { page } from "$app/stores";
  import placeholder from "$lib/assets/placeholder-hero.jpeg";

  export let title = "";
  export let description = "";
  export let breadcrumb = "";
</script>

<article class="hero {$page.url.pathname === '/' ? 'hero-light' : 'hero-dark'}">
  <section class="hero-content">
    {#if $page.url.pathname !== "/"}
      <nav class="hero-breadcrumb">
        {#if breadcrumb}
          {breadcrumb}
        {:else}
          {$page.url.pathname}
        {/if}
      </nav>
    {/if}
    <h1>{title}</h1>
    <p>{description}</p>
    <div class="hero-cta">
      <slot name="primary" />
      <slot name="secondary" />
    </div>
  </section>
  <img class="hero-image" src={placeholder} alt="" />
</article>

<style>
  .hero {
    width: 100vw;
    width: 100dvw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .hero-light {
    background-color: hsl(218 39% 81% / 30%);
  }

  .hero-dark {
    background-color: hsl(213 100% 28% / 100%); /* darker blue */
    color: var(--text-white);
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
    max-height: 416px;
    border-radius: 30px 30px 0 0;
  }

  .hero-cta {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  @media (min-width: 768px) {
    .hero {
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 2em 1em 0 1em;
    }

    .hero-content {
      width: 40vw;
      width: 40dvw;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .hero-image {
      width: 50vw;
      width: 50dvw;
      align-self: flex-end;
    }

    .hero-cta {
      flex-direction: row;
      padding-bottom: 2em;
    }
  }

  @media (min-width: 1024px) {
    .hero-content {
      width: 30vw;
      width: 30dvw;
    }

    .hero-image {
      max-width: 604px;
    }
  }
</style>
