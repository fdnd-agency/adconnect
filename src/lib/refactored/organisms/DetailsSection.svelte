<script>
    import Hero from "$lib/organisms/Hero.svelte";
    import { RTextSection } from "$lib";

    const { data } = $props()
</script>

<Hero/>
<RTextSection { data }/>
