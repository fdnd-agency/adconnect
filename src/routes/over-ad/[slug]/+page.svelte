<script>
    import Hero from "$lib/components/hero/Hero.svelte";
    import ThemeCard from '$lib/components/theme/ThemeCard.svelte';
    import Divider from '$lib/components/divider/Divider.svelte';

    import placeholder from "$lib/assets/placeholder-hero.png";

    import { NavPros } from '$lib'

    let { data } = $props(); 

    const theme = data.theme[0];
    const themes = data.themes;
</script>

<svelte:head>
  <title>{theme.title} | Overlegplatform Associate Degrees</title>
</svelte:head>

<NavPros />

<Hero
  title={theme.title}
  description={theme.description}>
  <img class="hero-image" src={`https://fdnd-agency.directus.app/assets/${theme.hero}`} alt={theme.title} />
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

<Divider />

<section class="other-themes">
    <h2>Bekijk andere populaire thema's</h2>
    <section class="themes">
        <ThemeCard themes={themes.slice(0, 3)} />
    </section>
</section>

<style>
    .wrapper-detail {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 90%;
        padding: 3em 0;
        max-width: 1400px;
        margin: auto;
    }

    .detail {
        display: flex;
        flex-direction: column;
        gap: 2em;
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
        object-fit: cover;
        border-radius: 1em;

        @media (min-width: 768px) {
           max-width: 70%;
        }
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

    .other-themes {
        display: flex;
        flex-direction: column;
        gap: 2em;
        width: 90%;
        margin: auto;
        padding: 3em 0;
        align-items: center;

        @media (min-width: 768px) {
            max-width: 1400px;
            padding: 5em 0;
        }
    }

    .other-themes .themes {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    @media (min-width: 768px) {
        .other-themes .themes {
            flex-direction: row;
        }
    }
</style>
