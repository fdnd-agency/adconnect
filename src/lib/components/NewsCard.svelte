<script>
    // Export prop
    export let article;

    // Import afbeeldingen
    import fallback from '$lib/assets/news-fallback.jpg';
    import calendar from '$lib/assets/icon-calendar.svg';

    // Import component
    import ButtonLight from "$lib/components/ButtonLight.svelte";
</script>

<article>
    <img src="{fallback}" alt="" width="300" height="210">

    <div>
        <h3>{article.title}</h3>
        <p><img src="{calendar}" alt="" width="15" height="15">17 april 2026</p>
        <p>{article.description}</p>
        <ButtonLight href="/">Bekijk artikel</ButtonLight>
    </div>
    
</article>

<style>
    article {
        border: 1px solid #CCCCCC;
        border-radius: 1em;
        padding: .7em;
    }

    article > img:first-of-type {
        width: 100%;
        border-radius: .5em;
        object-fit: cover;
    }

    section {
        padding: 1em;
        gap: 1em;
        display: flex;
        flex-direction: column;
        align-items: flex-start
    }

    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
    }
  
</style>