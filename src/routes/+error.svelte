<script>
	import { page } from '$app/state';
  import bird from "$lib/assets/vector-bird.jpg";
  import NavPros from '$lib/components/header/NavPros.svelte';
</script>

<svelte:head>
    <title>Error {page.status} | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<div class="wrapper-error" id="main">
  <img src="{bird}" alt="">

  <section>
    <h1>Oeps {page.status} error</h1>
    <p>De pagina die je probeert te bereiken lijkt niet te bestaan. Navigeer naar een van onze werkende pagina's hieronder. </p>

    <ul>
      <li><a href="/over-ad">Over Ad's</a></li>
      <li><a href="/publicaties">Publicaties</a></li>
      <li><a href="/talent-award">Talent Award</a></li>
      <li><a href="/nieuws">Nieuws</a></li>
      <li><a href="/talent-award/nominaties">Nominaties</a></li>
      <li><a href="/over-ons">Over ons</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </section>
</div>
