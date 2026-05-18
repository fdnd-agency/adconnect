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
	.button-outline-white {
		--_bg: var(--button-blue-bg);
		--_color: var(--button-blue-text);
		--_border: var(--button-blue-border);

		background: var(--_bg);
		color: var(--_color);
		border: var(--_border);
		border-radius: var(--button-blue-radius);
		padding: var(--button-blue-padding);
		font-size: var(--button-blue-font-size);
		font-weight: var(--button-font-weight);
		font-family: var(--button-blue-font-family);
		cursor: pointer;
		width: fit-content;
		transition: ease-in-out 0.2s;

		&:hover {
			--_bg: var(--text-white);
			--_color: var(--primary-blue);
			--_border: var(--button-outline-border);
		}
	}

	.button-outline-blue {
		--_bg: light-dark(var(--text-white), hsl(210, 30%, 8%));
		--_color: var(--button-outline-text);
		--_border: var(--button-outline-border);

		background: var(--_bg);
		color: var(--_color);
		border: var(--_border);
		border-radius: var(--button-outline-radius);
		padding: var(--button-outline-padding);
		font-size: var(--button-outline-font-size);
		font-weight: var(--button-font-weight);
		font-family: var(--button-outline-font-family);
		cursor: pointer;
		width: fit-content;
		transition: ease-in-out 0.2s;

		&:hover {
			--_bg: var(--primary-blue);
			--_color: var(--text-white);
			--_border: var(--button-blue-border);
		}
	}

	.nav-link {
		display: block;
		color: light-dark(var(--blue-800), var(--blue-150));
		font-weight: 500;
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
	}

	.menu-button {
		--_underline-width: 0;

		&.primary {
			white-space: nowrap;
			font-weight: var(--heading-font-weight);
			color: light-dark(var(--blue-800), var(--blue-150));
			padding: 0.5rem 1rem;
		}

		position: relative;
		border-radius: 10px;
		text-decoration: none;
		color: light-dark(#000, #fff);
		transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

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

		&:hover {
			--_underline-width: 100%;
		}

		&.active {
			--_underline-width: 100%;
		}
	}
</style>
