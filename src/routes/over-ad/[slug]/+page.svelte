<script>
    import NavPros from '$lib/components/header/NavPros.svelte';
    import Hero from "$lib/components/hero/Hero.svelte";

    import placeholder from "$lib/assets/placeholder-hero.png";

    let { data } = $props(); 

    const theme = data.theme[0];
</script>
