<script>
  import { page } from "$app/stores";

 // Get all URL breadcrumbs, removing empty breadcrumbs
  $: breadcrumbs = $page.url.pathname.split("/").filter(Boolean);

  // Replace '-' with space and capitalize the first letter of words 
  const format = breadcrumb => breadcrumb.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  // Creates the URL for this breadcrumb so it can be clickable (example = Publicatie \ Detailpage)
  const buildPath = (index) => '/' + breadcrumbs.slice(0, index + 1).join('/');
</script>

<!-- Checks if there are any breadcrumbs to show -->
{#if breadcrumbs.length}
    <nav class="hero-breadcrumb" aria-label="Breadcrumb">

        <!-- Top level page -->
        {#if breadcrumbs.length === 1}
        <a href="/">Home</a>
        <span> \ </span>
        {/if}

        {#each breadcrumbs as breadcrumb, i}
            {#if i < breadcrumbs.length - 1}
                <!-- All breadcrumbs except last are clickable -->
                <a href="{buildPath(i)}">{format(breadcrumb)}</a>
                <span class="separator"> \ </span>
            {:else}
                <!-- Last breadcrumb -->
                <span aria-current="page">{format(breadcrumb)}</span>
            {/if}
        {/each}
    </nav>
{/if}

<style>
    a {
        font-size: 16px;
        font-weight: var(--button-font-weight);
        font-family: var(--font-body);
        color: var(--text-white);
    }

    span {
        font-weight: var(--text-font-weight);
        font-family: var(--font-body);
    }

    .separator {
        margin: 0 0.35em 0 0.15em;
    }
</style>