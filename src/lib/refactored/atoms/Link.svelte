<script>
	const { href, children, screenReaderText, ...props } = $props()
</script>

<a
	{href}
	{...props}
>
	{@render children?.()}

	{#if screenReaderText}
		<span class="visually-hidden">{screenReaderText}</span>
	{/if}
</a>

<style>
	.nav-link {
		--_underline-width: 0;

		position: relative;
		border-radius: 10px;
		text-decoration: none;
		color: light-dark(#000, #fff);
		transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

		&.desktop {
			white-space: nowrap;
			font-weight: var(--heading-font-weight);
			color: light-dark(var(--blue-800), var(--blue-150));
			padding: 0.5rem 1rem;
		}

		&.hamburger {
			display: block;
			color: light-dark(var(--blue-800), var(--blue-150));
			font-weight: 500;
			font-size: 1.2rem;
			padding: 0.5rem 1rem;

			&::after {
				all: unset;
			}
		}

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -2px;
			height: 2px;
			width: var(--_underline-width);
			background: currentColor;
			transition: width 0.3s ease;
		}

		&:hover,
		&.active {
			--_underline-width: 100%;
		}
	}
</style>
