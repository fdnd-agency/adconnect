<script>
  import { Nieuwshero } from "$lib";
  /* Import images */
  import { dots } from "$lib";
  import { calendar } from "$lib";
  /* Import components */
  import { NavPros, Hero } from "$lib";
  import { formatDateNL } from "$lib/molecules/date";
  // Haal data op uit page.server.js via props
  let { data } = $props();
</script>

<svelte:head>
  <title>Nieuws | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero title="Nieuws" description="Op deze pagina vind je updates en korte verslagen van georganiseerde evenementen.">
  <img class="hero-image" src={Nieuwshero} alt="" fetchpriority="high" />
</Hero>

<section class="news">
  <section class="latest-news">
    <h2 style="margin: 1em;">Laatste nieuws</h2>

    <section class="news-container">
      <ul>
        {#each data.latest3 as item}
          <li>
            <article>
              <section class="date">
                <img src={calendar} alt="" />
                <p>{formatDateNL(item.date)}</p>
              </section>

              <h2>{item.title}</h2>
              <p>{item.description}</p>

              <a class="button-outline-blue" href={`/nieuws/${item.uuid}`}> Meer informatie <span class="sr-only"> over {item.title}</span></a>
            </article>
          </li>
        {/each}
      </ul>
    </section>
  </section>
</section>
<section class="news">
  <h2>Alle nieuws</h2>
  <p>Aantal artikelen: {data.news.length}</p>

  <section class="news-container">
    <ul>
      {#each data.latest9 as item}
        <li>
          <article>
            <section class="date">
              <img src={calendar} alt="" />
              <p>{formatDateNL(item.date)}</p>
            </section>

            <h2>{item.title}</h2>
            <p>{item.description}</p>

            <a class="button-outline-blue" href={`/nieuws/${item.uuid}`}> Meer informatie <span class="sr-only"> over {item.title}</span> </a>
          </article>
        </li>
      {/each}
    </ul>
  </section>
</section>

<style>
 .news {
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: min(90%, 1400px);
  margin: auto;
  padding: 3em 0;
}

.news-container {
  container: news-container / inline-size;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5em;

  h2 {
    font-size: 25px;
  }
  article {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: 1.25em;
    border: 1px solid var(--neutral-700);
    border-radius: 1em;
    padding: 2em;
    background: light-dark(var(--text-white), hsl(210, 30%, 8%));
    transition: 0.2s ease-in-out;
    h2 {
      max-width: 30ch;
    }
    p {
      max-width: 60ch;
      line-height: 1.6;
    }
    a {
      align-self: start;
      margin-top: auto;
    }
  }

  p {
    max-width: 60ch;
    line-height: 1.6;
  }

  a {
    align-self: start;
    margin-top: auto;
  }
}

article:hover {
  border-color: var(--blue-900);
  box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
  translate: 0 -1%;
}

.date {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75em;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@container news-container (min-width: 768px) {
  ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container news-container (min-width: 1024px) {
  ul {
    grid-template-columns: repeat(3, 1fr);
  }

  article {
    padding: 2.5em;
  }
}

</style>
