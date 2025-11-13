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

<style>
    article {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 2.5em;
        border: 1px solid var(--neutral-300);
        border-radius: 1em;
        container-type: inline-size;
    }

    .inner-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.3em;
        align-items: baseline;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: .7em;

        h3 {
            font-size: 20px;
        }
    }

    img {
        width: .8em;
        background-color: var(--orange-500);
        padding: .8em;
        border-radius: .5em;
    }

    @container (width > 300px) {
        .inner-wrapper {
            flex-direction: row;
            align-items: start;
        }
    }
</style>