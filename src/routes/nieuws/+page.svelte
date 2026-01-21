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
