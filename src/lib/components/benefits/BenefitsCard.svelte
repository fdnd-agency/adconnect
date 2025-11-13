<script>
    // Export prop
    export let title = "";
    export let excerpt = "";

    // Import afbeeldingen
    import check from '$lib/assets/icon-check-white.svg';
</script>

<article>
    <div class="inner-wrapper">
        <img src="{check}" alt="">
        <div class="info">
            <h3>{title}</h3>
            <p class="truncate two">{excerpt}</p>
        </div>
    </div>
</article>
