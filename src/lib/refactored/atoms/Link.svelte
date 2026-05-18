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
		--_button-background: var(--button-blue-bg);
		--_button-text: var(--button-blue-text);
		--_button-border: var(--button-blue-border);
		--_button-background-hover: var(--text-white);
		--_button-text-hover: var(--primary-blue);
		--_button-border-hover: var(--button-outline-border);

		border-radius: var(--button-blue-radius);
		padding: var(--button-blue-padding);
		font-size: var(--button-blue-font-size);
		font-family: var(--button-blue-font-family);
	}

	.button-outline-blue {
		--_button-background: light-dark(var(--text-white), hsl(210, 30%, 8%));
		--_button-text: var(--button-outline-text);
		--_button-border: var(--button-outline-border);
		--_button-background-hover: var(--primary-blue);
		--_button-text-hover: var(--text-white);
		--_button-border-hover: var(--button-blue-border);

		border-radius: var(--button-outline-radius);
		padding: var(--button-outline-padding);
		font-size: var(--button-outline-font-size);
		font-family: var(--button-outline-font-family);
	}

	.button-outline-white,
	.button-outline-blue {
		background: var(--_button-background);
		color: var(--_button-text);
		border: var(--_button-border);
		font-weight: var(--button-font-weight);
		cursor: pointer;
		width: fit-content;
		transition: ease-in-out 0.2s;

		&:hover {
			--_button-background: var(--_button-background-hover);
			--_button-text: var(--_button-text-hover);
			--_button-border: var(--_button-border-hover);
		}
	}

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
