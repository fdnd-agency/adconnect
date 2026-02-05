<script>
    let { href, children, ...restProps } = $props();
</script>

<a {href} {...restProps}>
    {@render children?.()}
</a>
