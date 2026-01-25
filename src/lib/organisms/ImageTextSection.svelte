<script>
  export let image;
  export let alt;
  export let dots;
  export let title;
  export let text;
  export let link = "#";
  export let linkText = "Lees meer";
  export let imagePosition = "left";
  export let background = "blue";

  import { lightcircle } from "$lib";
</script>

<section
  class:image-right={imagePosition === "right"}
  class:image-left={imagePosition === "left"}
  class:bg-blue={background === "blue"}
  class:bg-white={background === "white"}
>
  <div class="wrapper">
    <div class="img-wrapper">
      <img class="circle" src={lightcircle} alt="" />
      <img class="visual" src={image} {alt} loading="lazy" width="350" height="450" />
    </div>

    <div class="content">
      <img src={dots} alt="" width="80" height="80" />
      <h2>{title}</h2>
      <p>{text}</p>
      <a class="button-outline-white" href={link}>{linkText}</a>
    </div>
  </div>
</section>

<style>
  section {
    width: 100%;
    padding: 3em 0;
    display: flex;
    justify-content: center;
    box-sizing: border-box;

    @media (min-width: 1024px) {
      padding: 5em 0;
    }
  }

  /* Background colors */
  .bg-blue {
    background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
  }

  .bg-white {
    background-color: light-dark(white, var(--blue-800));
  }

  .wrapper {
    display: flex;
    flex-direction: column-reverse;
    gap: 2em;
    width: 90%;
    align-items: center;
    justify-content: center;
  }

  .img-wrapper {
    position: relative;
    width: 100%;

    @media (min-width: 1024px) {
      width: 50%;
    }
  }

  .circle {
    position: absolute;
    z-index: 0;
    right: -10%;
    bottom: -10%;
    width: 20em;

    @media (min-width: 1024px) {
      left: -10%;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
  }

  @media (min-width: 1024px) {
    .wrapper {
      flex-direction: row;
      gap: 4em;
    }

    .image-right .wrapper {
      flex-direction: row-reverse;
    }
  }

  .visual {
    width: 100%;
    border-radius: 1em;
    object-fit: cover;
    position: relative;
    z-index: 1;
    height: 20em;
  }

  @media (min-width: 1024px) {
    .wrapper {
      width: 90%;
      max-width: 1400px;
    }

    .visual {
      width: 100%;
      margin: 0;
      height: 27em;
    }

    .content {
      width: 50%;
    }
  }
</style>
