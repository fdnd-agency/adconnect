<script>
    export let href = "";
</script>

<!-- Knop -->
<a href={href}>
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