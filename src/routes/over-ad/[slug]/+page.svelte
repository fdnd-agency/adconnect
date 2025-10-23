<script>
    import NavPros from '$lib/components/header/NavPros.svelte';
    import Hero from "$lib/components/hero/Hero.svelte";

    import placeholder from "$lib/assets/placeholder-hero.png";

    let { data } = $props(); 

    const theme = data.theme[0];
</script>

<svelte:head>
  <title>{theme.title} | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
  title={theme.title}
  description={theme.description}
  image={`https://fdnd-agency.directus.app/assets/${theme.hero}`}
  alt={theme.title}>
</Hero>

<section class="wrapper-detail">
    <div class="detail">
        {@html theme.body}
    </div>

    <div class="wrapper-ad-day">
        <section class="ad-day">
            <h2>Kom naar de Ad-dag!</h2>
            <p>Deze trendanalyse geeft een overzicht van de instroomontwikkeling in de bekostigde Ad’s, als ook de bewegingen per sector...</p>
            <a href="/dev/hero" class="button-outline-blue">Ik wil naar de Ad-dag →</a>
        </section>
    </div>
</section>

<style>
    .wrapper-detail {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 90%;
        padding: 3em 0;
        max-width: 1400px;
    }

    .detail {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    @media (min-width: 768px) {
        .wrapper-detail {
            flex-direction: row;
            gap: 2em;
            padding: 5em 0;
        }
        
        .detail {
            width: 55%;

            :global(p) {
                max-width: unset;
            }

            @media (min-width: 1024px) {
                width: 65%;
            }
        }
    }

    @media (min-width: 1024px) {
        .wrapper-detail {
            gap: 5em;
        }
    }

    :global(.detail img) {
        width: 100%;
        max-width: 70%;
        object-fit: cover;
        border-radius: 1em;
    }

    @media (min-width: 768px) {
        .wrapper-ad-day {
            width: 50%;
        }
    }

    @media (min-width: 1024px) {
        .wrapper-ad-day {
            width: 30%;
        }
    }

    .ad-day {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 2em;
        background-color: var(--primary-blue);
        color: var(--text-white);
        border-radius: 1em;

        h2 {
            color: var(--text-white);
            font-size: var(--h4-size);
        }
    }

    @media (min-width: 768px) {
        .ad-day {
            position: sticky;
            top: 10em;
        }
    }
</style>
