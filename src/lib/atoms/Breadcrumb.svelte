<script>
  import { page } from '$app/stores'

  // Current URL path and split it into usable segments (remove the empty ones)
  $: segments = $page.url.pathname.split('/').filter(Boolean)

  // The first part of the URL is the main section of the page (example: /publicaties/slug -> "publicaties")
  $: firstBreadcrumb = segments[0]

  // Replace '-' with space and capitalize the first letter of words
  const format = breadcrumb => breadcrumb.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
</script>

<!-- Only show breadcrumbs when there's at least one segment in the URL -->
{#if firstBreadcrumb}
    <nav class="hero-breadcrumb" aria-label="Breadcrumb">

        <!-- Always start the breadcrumb trail with Home -->
        <a href="/">Home</a>
        <span class="separator"> \ </span>

        <!-- Show the main section based on the first URL segment -->
        <a href="/{firstBreadcrumb}">{format(firstBreadcrumb)}</a>
    </nav>
{/if}


<style>
    a {
        font-size: 16px;
        font-weight: var(--button-font-weight);
        font-family: var(--font-body);
        color: var(--blue-800);

        @media (prefers-color-scheme: dark) {
            color: var(--text-white);
        }

        @supports (color: light-dark(red, blue)) {
            color: light-dark(var(--blue-800), var(--text-white));
        }
    }

    span {
        font-weight: var(--text-font-weight);
        font-family: var(--font-body);
    }

    .separator {
        margin: 0 0.35em 0 0.15em;
    }
</style>
