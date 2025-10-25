<script>
    // Export prop
    export let document;

    // Import afbeeldingen
    import fallback from '$lib/assets/news-fallback.jpg';
    import calendar from '$lib/assets/icon-calendar-orange.svg';
    import label from '$lib/assets/icon-label.svg';

    // Import component
    import ButtonLight from "$lib/components/ButtonLight.svelte";
</script>

<article>
    <h2 class="truncate two">{document.title}</h2>
    <div class="card-info">
        <span><img src="{label}" alt=""><p>{document.category.title}</p></span>
        <span><img src="{calendar}" alt=""><p>{document.date.slice(0,4)}</p></span>
    </div>
    <p class="truncate two">{document.description}</p>
    <a class="button-outline-blue" href="/publicaties/{document.slug}">Meer informatie</a>
</article>

<style>
    article {
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        border: 1px solid #CCCCCC;
        border-radius: 1em;
        padding: 2em;
        transition: .2s ease-in-out;

        &:hover {
            border: 1px solid #00408D;
            box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
            translate: 0 -1%;
            transition: .2s ease-in-out;
        }
    }

    .card-info {
        gap: 1em;
        display: flex;
        flex-direction: row;

        span {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: .5em;
        }
    }

    h2, p {
        margin: 0;
        width: 100%;
    }

    h2{
        font-size: 25px;
        height: 2.5em;
    }

    /* Truncate words */
    .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; 
        -webkit-box-orient: vertical;
        }

    /* Truncate one sentence */
    .truncate.single {
        white-space: nowrap;
        -webkit-line-clamp: 1;
    }

    /* Truncate two sentences */
    .truncate.two {
        -webkit-line-clamp: 2;
    }
  
</style>