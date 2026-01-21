<script>
    import { Development } from '$lib'
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

<Development /><svelte:head>
<svelte:head>
    <title>Nieuws | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
    title="Nieuws"
    description="Op deze pagina vind je updates en korte verslagen van georganiseerde evenementen."
>
    <img class="hero-image" src={Nieuwshero} alt="" fetchpriority="high" />
</Hero>

<section class="news">
    <section class="intro">
        <img class="dots" src={dots} alt="" width="80px" height="60px" />
        <h1>Bekijk ons laatste nieuws!</h1>
        <p>
            Blijf op de hoogte van alles rond Associate degree-onderwijs in
            Nederland.
        </p>
    </section>

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

                            <a
                                class="button-outline-blue"
                                alt="{item.title}"
                                href={`/nieuws/${item.uuid}`}
                            >
                                Meer informatie
                            </a>
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

                        <a
                            class="button-outline-blue"
                             alt="{item.title}"
                            href={`/nieuws/${item.uuid}`}
                        >
                            Meer informatie
                        </a>
                    </article>
                </li>
            {/each}
        </ul>
    </section>
</section>
