<script>
  import DividerText from '$lib/components/divider/DividerText.svelte';
  import DividerText from "$lib/components/divider/DividerText.svelte";
  import Testwinner from "$lib/assets/test-winner.png";
</script>

<section>
  <DividerText text="Voorgaande talent award winaars" />

  <section class="previous-winners">
    <section class="slider">
      <ul>
        <li><a href="#"> <img src={Testwinner} /> </a></li>
        <li><a href="#"> <img src={Testwinner} /> </a></li>
        <li><a href="#"> <img src={Testwinner} /> </a></li>
        <li><a href="#"> <img src={Testwinner} /> </a></li>
        <li><a href="#"> <img src={Testwinner} /> </a></li>
        <li><a href="#"> <img src={Testwinner} /> </a></li>
      </ul>
    </section>

    <a href="/talentaward" class="button-outline-white">Bekijk Talents</a>
  </section>
</section>




