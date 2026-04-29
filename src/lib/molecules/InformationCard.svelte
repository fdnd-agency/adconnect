<script>
  // Allows a default icon, but you can override per card
  import defaultDots from '$lib/assets/dots.svg'
	import { PictureImg } from '$lib'


  export let title = ''
  export let description = ''
  export let buttonText = ''
  export let buttonLink = '#'
  export let iconSrc = defaultDots // override with any image if needed
</script>

<article class="info-card">
  <section class="info-card-head">
    <PictureImg isIcon=true src={iconSrc} width="51" />
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
    background: light-dark(var(--background), var(--blue-800)); /* light panel */
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

  .info-card-desc {
    color: light-dark(#0e3a40, var(--text-white));
  }

  @media (min-width: 768px) {
    .button-outline-blue {
      margin-top: auto;
    }
  }
</style>
