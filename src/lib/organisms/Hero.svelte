<script>
  import { page } from '$app/stores'
  import { Breadcrumb } from '$lib'

  export let title = ''
  export let description = ''
  export let image = ''
  export let alt = ''
  export let placeholder = ''
</script>

<div class="wrapper-hero hero-light">
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
    <img class="hero-image" src={image || placeholder} {alt} />
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
    padding: 2.3em 0 0 0;

    @media (prefers-color-scheme: dark) {
      background-color: var(--blue-800);
    }

    @supports (color: light-dark(red, blue)) {
      background-color: light-dark(var(--blue-100), var(--blue-800));
    }
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

    @media (prefers-color-scheme: dark) {
      background-color: var(--blue-800);
    }

    @supports (color: light-dark(red, blue)) {
      background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
    }

    h1 {
      color: var(--blue-800);

      @media (prefers-color-scheme: dark) {
        color: var(--text-white);
      }
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

  .hero-cta {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .hero-media {
    width: 100%;
    display: flex;

    :global(img) {
      border-radius: 1em 1em 0 0;
      height: 20em;
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

      :global(img) {
        height: 25em;
      }
    }

    .hero-content {
      width: 40vw;
      width: 40dvw;
      max-width: 35vw;
    }

    .hero-cta {
      flex-direction: row;
      padding-bottom: 2em;
      flex-wrap: wrap;
    }
  }

  @media (min-width: 1024px) {
    .hero-content {
      width: 50vw;
      width: 50dvw;
    }
  }
</style>
