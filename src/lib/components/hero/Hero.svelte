<script>
  import { page } from "$app/stores";
  import { Breadcrumb } from '$lib'

  export let title = "";
  export let description = "";
  export let breadcrumb = "";
  export let image = "";
  export let alt = "";
  export let placeholder = "";
</script>

<div class="wrapper-hero {$page.url.pathname === '/' ? 'hero-light' : 'hero-dark'}">
  <article class="hero" id="main">
    <section class="hero-content">

      <!-- Breadcrumbs -->
      <Breadcrumb />

      <h1>{title}</h1>
      <p>{description}</p>
      <div class="hero-cta">
        <slot name="primary" />
        <slot name="secondary" />
      </div>
    </section>
    <img class="hero-image" src={image || placeholder} alt="{alt}" />
    <section class="hero-media">
      <slot name="media" />
      <slot />
    </section>
  </article>
</div>

<style>
  .wrapper-hero {
    background-color: var(--blue-100);
    justify-content: center;
    display: flex;
  }

  .hero {
    width: 100vw;
    width: 100dvw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 2em;
    max-width: 1400px;
    margin: 0 5% 0 5%;
  }

  .hero-light {
    background-color: var(--blue-100);
  }

  .hero-dark {
    background-color: var(--primary-blue);
    color: var(--text-white);

    .hero-breadcrumb {
      display: flex;
      flex-direction: row;
      gap: .5em;
    }

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

    a {
      color: var(--text-white);
    }
  }

  .hero-cta {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .hero-media {
    width: 90%;
    display: flex;

    :global(img) {
      border-radius: 1em 1em 0 0;
      height: 25em;
      width: 100%;
      object-fit: cover;
    }
  }

  @media (min-width: 768px) {
    .hero {
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 3em 0 0 0;
      gap: 2em;
    }

    .hero-media {
      width: 50%;
    }

    .hero-content {
      width: 40vw;
      width: 40dvw;
      max-width: 35vw;
    }

    .hero-cta {
      flex-direction: row;
      padding-bottom: 2em;
    }
  }

  @media (min-width: 1024px) {
    .hero-content {
      width: 50vw;
      width: 50dvw;
    }
  }
</style>

