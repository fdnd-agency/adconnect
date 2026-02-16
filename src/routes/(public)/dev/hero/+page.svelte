<script>
  import Hero from '$lib/organisms/Hero.svelte'
  // import ButtonDark from "$lib/components/ButtonDark.svelte";
</script>

<Hero
  title="Het platform die de waarde van Associate Degrees deelt"
  description="Lorem ipsum dolor sit amet consectetur. Semper semper neque diam ac
  facilisi orci. Amet ultrices et et sagittis."
  breadcrumb="Dev / Hero"
>
  <a slot="primary" href="/dev/hero" class="button-outline-white">Lorum Ipsum →</a>
  <a slot="secondary" href="/dev/hero" class="button-outline-blue">Lorum Action →</a>
</Hero>
