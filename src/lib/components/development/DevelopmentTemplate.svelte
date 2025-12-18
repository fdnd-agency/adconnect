<script>
  import { page } from '$app/state';

  // Import Atomic Design
  import { bird } from '$lib'
</script>

<svelte:head>
    <title>Pagina in ontwikkeling | Overlegplatform Associate Degrees</title>
</svelte:head>

<div class="wrapper-error" id="main">
  <img src="{bird}" alt="404 error">

  <section>
    <h1>Deze pagina is in ontwikkeling</h1>
    <p>De pagina die je probeert te bereiken is op dit moment in ontwikkeling. Navigeer naar een van onze werkende pagina's hieronder. </p>

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

    @media (min-width: 768px) {
      padding: 5em 0;
      flex-direction: row;
    }

    img {
      width: 20em;
      align-self: center;

      @media (min-width: 768px) {
        width: 25em;
      }
    }

    section {
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin: auto;
    }

    h1, p {
      text-align: center;

      @media (min-width: 768px) {
        text-align: left;
        max-width: 30em;
      }
    }

    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: .5em 1.5em;
      justify-content: center;

      @media (min-width: 768px) {
        justify-content: left;
      }
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