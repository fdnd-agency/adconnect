<script>
  import dots from "$lib/assets/dots.svg";
  import imageSrc from "$lib/assets/doorstroom-ad-dag.jpg";

  export let title = "";
  export let description = "";
  export let buttonText = "";
  export let buttonLink = "#";
  export let imageAlt = "";
</script>

<section class="information">
  <div class="information-content">
    <img src={dots} alt="" class="information-dots" />
    <h2 class="information-title">{title}</h2>
    <p class="information-description">{description}</p>

    <a href={buttonLink} class="button-outline-white">
      {buttonText}
    </a>
  </div>

  <div class="information-image">
    <img src={imageSrc} alt={imageAlt} />
  </div>
</section>

<style>
  .information {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 4rem 2rem;
    background: var(--background);
    margin-bottom: -7.5rem;
  }

  .information-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    width: 75%;
    gap: 0.75em;
  }

  .information-image {
    width: 80%;
  }

  .information-image img {
    width: 100%;
    border-radius: 33px 33px 0 0;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    .information {
      margin-bottom: -10rem;
    }
  }

  @media (min-width: 1024px) {
    .information {
      margin-bottom: -15rem;
    }
  }
</style>
