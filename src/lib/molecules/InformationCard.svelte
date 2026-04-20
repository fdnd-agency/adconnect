<script>
  // Allows a default icon, but you can override per card
  import defaultDots from '$lib/assets/dots.svg'

  export let title = ''
  export let description = ''
  export let buttonText = ''
  export let buttonLink = '#'
  export let iconSrc = defaultDots // override with any image if needed
</script>

<article class="info-card">
  <section class="info-card-head">
    <img src={iconSrc} alt="" class="info-card-icon" />
    <h3 class="info-card-title">{title}</h3>
  </section>

  <p class="info-card-desc">{description}</p>

  <a href={buttonLink} class="button-outline-blue">
    {buttonText}
    <span class="info-card-cta-arrow" aria-hidden="true">→</span>
  </a>
</article>

<style>
  .info-card {
    background: var(--background);/* light panel */

    @media (prefers-color-scheme: dark) {
      background: var(--blue-800);
    }

    @supports (color-scheme: light-dark(red, blue)) {
      background: light-dark(var(--background), var(--blue-800));
    }

    border-radius: 20px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .info-card-head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .info-card-icon {
    width: 51px;
    height: auto;
    display: block;
  }

  .info-card-desc {
    color: hsl(187 64.1% 15.3%);

    @media (prefers-color-scheme: dark) {
      color: var(--text-white);
    }

    @supports (color-scheme: light-dark(red, blue)) {
      color: light-dark(hsl(187 64.1% 15.3%), var(--text-white));
    }
  }

  @media (min-width: 768px) {
    .button-outline-blue {
      margin-top: auto;
    }
  }
</style>
