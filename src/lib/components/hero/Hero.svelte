<script>
  import { page } from "$app/stores";
  import placeholder from "$lib/assets/placeholder-hero.jpeg";

  export let title = "";
  export let description = "";
  export let breadcrumb = "";
</script>

<h1>{title}</h1>
<p>{description}</p>
{#if $page.url.pathname !== "/"}
  <nav class="hero__breadcrumb">
    {#if breadcrumb}
      {breadcrumb}
    {:else}
      {$page.url.pathname}
    {/if}
  </nav>
{/if}
<slot name="primary" />
<slot name="secondary" />
<img src={placeholder} alt="" />
