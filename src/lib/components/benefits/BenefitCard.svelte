<script>
    // Export prop
    export let title = "";
    export let excerpt = "";

    // Import afbeeldingen
    import check from '$lib/assets/icon-check-white.svg';
</script>

<article>
    <img src="{check}" alt="">
    <h3>{title}</h3>
    <p class="truncate two">{excerpt}</p>
    <a class="button-outline-blue" href="/">Lees meer</a>
</article>

<style>
    article {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1.5em;
        border: 1px solid var(--neutral-300);
        border-radius: 1em;
    }

    img {
        width: 1em;
        background-color: var(--orange-500);
        padding: 1em;
        border-radius: .5em;
        margin: -3em 0 0 0;
    }
</style>