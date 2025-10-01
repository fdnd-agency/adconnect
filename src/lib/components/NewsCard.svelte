<script>
    // Import afbeeldingen
    import fallback from '$lib/assets/news-fallback.jpg';
    import calendar from '$lib/assets/icon-calendar.svg';

    // Import component
    import ButtonLight from "$lib/components/ButtonLight.svelte";
</script>

<!-- News card -->
<article>
    <img src="{fallback}" alt="" width="300" height="210">

    <section>
        <h3>Titel</h3>
        <p><img src="{calendar}" alt="" width="15" height="15">17 april 2026</p>
        <p>Description</p>
        <ButtonLight href="/">Bekijk artikel</ButtonLight>
    </section>
</article>
