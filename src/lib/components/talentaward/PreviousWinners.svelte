<script>
  import DividerText from "$lib/molecules/DividerText.svelte";
  import Testwinner from "$lib/assets/test-winner.png";
</script>

<section>
  <DividerText text="Voorgaande talent award winaars" />

  <section class="previous-winners">
    <section class="slider">
      <ul>
        <li><a href="#"> <img src={Testwinner} alt=''/> </a></li>
        <li><a href="#"> <img src={Testwinner} alt=''/> </a></li>
        <li><a href=""> <img src={Testwinner} alt=''/> </a></li>
        <li><a href="#"> <img src={Testwinner} alt=''/> </a></li>
        <li><a href="#"> <img src={Testwinner} alt=''/> </a></li>
        <li><a href="#"> <img src={Testwinner} alt=''/> </a></li>
      </ul>
    </section>

    <a href="/talentaward" class="button-outline-white">Bekijk Talents</a>
  </section>
</section>

<style>
  .previous-winners {
    background-color: var(--blue-100);
    padding: 2rem;
    border-radius: 15px;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

  .slider {
    overflow: hidden;
    width: 90%;
    width: 100vw;
    max-width: 1400px;
  }

  ul {
    display: flex;
    animation: scroll 10s linear infinite;
  }

  li {
    flex: 0 0 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    max-height: 150px;
    filter: grayscale(100%) brightness(0.9);
    opacity: 0.8;
    width: auto;
    border-radius: 15px;
  }

  img:hover {
    filter: grayscale(0%) brightness(1);
    opacity: 1;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-25%);
    }
  }

  @media (min-width: 768px) {
    li {
      flex: 0 0 22%;
    }
    img {
      max-height: 200px;
    }
  }
</style>
