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
