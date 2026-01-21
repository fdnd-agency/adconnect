<script>
    import { Development } from '$lib'
    import { Nieuwshero } from "$lib";

    /* Import images */
    import { dots } from "$lib";
    import { calendar } from "$lib";

    /* Import components */
    import { NavPros, Hero } from "$lib";
    import { formatDateNL } from "$lib/molecules/date";

    // Haal data op uit page.server.js via props
    let { data } = $props();
</script>

<Development />