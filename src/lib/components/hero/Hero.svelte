<script>
  import { page } from "$app/stores";
  import placeholder from "$lib/assets/placeholder-hero.png";

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
    padding-top: 2em;
    background-color: var(--blue-100);
  
  }

  .hero-light {
    background-color: var(--blue-100);
  }

  .hero-dark {
    background-color: var(--primary-blue);
    color: var(--text-white);

    h1 {
      color: var(--text-white);
    }
  }

  .hero-content {
    padding-bottom: 2em;
    width: 90vw;
    width: 90dvw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
  }

  .hero-image {
    object-fit: cover;
    width: 90vw;
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
    }

    .hero-content {
      width: 40vw;
      width: 40dvw;
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
