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
    <h3 class="truncate two">{document.title}</h3>
    <div class="card-info">
        <span><img src="{label}" alt=""><p>{document.category.title}</p></span>
        <span><img src="{calendar}" alt=""><p>{document.date.slice(0,4)}</p></span>
    </div>
    <p class="truncate two">{document.description}</p>
    <a class="button-outline-blue" href="/publicaties/{document.slug}">Meer informatie</a>
</article>

