<script>
    export let href = "";
</script>

<!-- Knop -->
<a href={href}>
  <slot/>
</a>

<style>
    a {
        padding: .6em 1.2em;
        border: 1px solid var(--secondary-text);
        background-color: #fff;
        color: #000A1A;
        border: 1px solid #00408D;
        border-radius: .5em;
        transition: .2s ease-in-out;
        text-decoration: none;
    }

    a:hover {
        background-color: #00408D;
        color: #fff;
        transition: .2s ease-in-out;
    }
</style>