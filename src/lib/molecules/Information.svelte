<script>
  import dots from '$lib/assets/dots.svg'
  import imageSrc from '$lib/assets/doorstroom-ad-dag.webp?enhanced'

  import { overad, PictureImg } from '$lib'

  export let title = ''
  export let description = ''
  export let buttonText = ''
  export let buttonLink = '#'
  export let imageAlt = ''
</script>

<section class="information">
  <div class="information-content">
    <img src={dots} alt="" class="information-dots" width="80" height="60" />
    <h2 class="information-title">{title}</h2>
    <p class="information-description">{description}</p>

    <a href={buttonLink} class="button-outline-white">
      {buttonText}
    </a>
  </div>

  <div class="information-image">
    <PictureImg enhance=true src={overad} alt={imageAlt} width="550" height="250" border-radius="33px 33px 0 0" />
  </div>
</section>

<style>
  .information {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 2rem 4rem;
    margin-bottom: -7.5rem;
  }

  .information-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    max-width: 700px;
    width: 100%;
    gap: 0.75em;
  }

  .information-image {
    width: 100%;
  }

  .information-image img {
    width: 100%;
    border-radius: 33px 33px 0 0;
    object-fit: cover;
    object-position: bottom;
    height: 20em;
  }

  @media (min-width: 768px) {
    .information {
      margin-bottom: -10rem;
    }

    .information-content {
      width: 60%;
    }

    .information-image {
      width: 80%;

      img {
        height: 30em;
      }
    }
  }

  @media (min-width: 1024px) {
    .information {
      margin-bottom: -15rem;
    }
  }
</style>
