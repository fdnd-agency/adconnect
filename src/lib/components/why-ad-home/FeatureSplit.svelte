<script>
  import dots from "$lib/assets/dots.svg";
  import imageSrc from "$lib/assets/doorstroom-ad-dag.webp";

  export let title = "";
  export let intro = "";
  /** @type {string[]} */
  export let bullets = [];
  export let ctaText = "";
  export let ctaLink = "#";
  export let imageAlt = "";
</script>

<section class="feature">
  <div class="feature-content">
    <img src={dots} alt="" class="feature-dots" />

    <h2 class="feature-title">{title}</h2>

    {#if intro}
      <p class="feature-intro">{intro}</p>
    {/if}

    {#if bullets?.length}
      <ul class="feature-list">
        {#each bullets as item}
          <li class="feature-list-item">
            <img src="/check-circle.svg" alt="" />
            <p>{item}</p>
          </li>
        {/each}
      </ul>
    {/if}

    {#if ctaText}
      <a href={ctaLink} class="button-outline-white">{ctaText}</a>
    {/if}
  </div>

  <div class="feature-media">
    {#if imageSrc}
      <img class="feature-img" src={imageSrc} alt={imageAlt} />
    {/if}
  </div>
</section>

<style>
  .feature {
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: stretch;
    justify-content: center;
    padding-bottom: 5rem;
  }

  .feature-dots {
    width: 102px;
  }

  .feature-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    gap: 1rem;
    padding: 2rem;
  }

  .feature-intro {
    max-width: 40ch;
  }

  .feature-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .feature-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
  }

  .feature-media {
    display: none;
    flex: 1;
    height: 100%;
  }

  @media (min-width: 768px) {
    .feature-content {
      max-width: 575px;
    }

    .feature-media {
      display: block;
      padding: 2rem;
    }

    .feature-img {
      max-height: 455px;
      width: 100%;
      max-width: 590px;
      border-radius: 33px;
      object-fit: cover;
    }
  }
</style>
