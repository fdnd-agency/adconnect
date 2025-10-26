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

<style>
  .wrapper-error {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: auto;
    width: 90%;
    max-width: 1400px;
    padding: 3em 0;


    img {
      width: 20em;
      align-self: center;

    }

    section {
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin: auto;
    }

    h1, p {
      text-align: center;

    }

    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: .5em 1.5em;
      justify-content: center;
    }

    li:first-of-type {
      list-style-type: none;
    }

    a {
      color: var(--blue-800);

      &:hover {
        color: var(--primary-orange);
      }
    }
  }
</style>