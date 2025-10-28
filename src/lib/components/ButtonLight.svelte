<script>
    export let href = "";
    export let className = "";
</script>

<!-- Knop -->
<a class={className} href={href}>
  <slot/>
</a>

<style>
    a {
        transition: .2s ease-in-out;
    }

    a:hover {
        transition: .2s ease-in-out;
    }
</style>