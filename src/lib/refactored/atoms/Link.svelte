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
		background: var(--button-blue-bg);
		color: var(--button-blue-text);
		border: var(--button-blue-border);
		border-radius: var(--button-blue-radius);
		padding: var(--button-blue-padding);
		font-size: var(--button-blue-font-size);
		font-weight: var(--button-font-weight);
		cursor: pointer;
		font-family: var(--button-blue-font-family);
		width: fit-content;
		transition: ease-in-out 0.2s;

		&:hover {
			background-color: var(--text-white);
			color: var(--primary-blue);
			border: var(--button-outline-border);
		}
	}

	.button-outline-blue {
		background: light-dark(var(--text-white), hsl(210, 30%, 8%));
		color: var(--button-outline-text);
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		padding: var(--button-outline-padding);
		font-size: var(--button-outline-font-size);
		font-weight: var(--button-font-weight);
		font-family: var(--button-outline-font-family);
		cursor: pointer;
		width: fit-content;
		transition: ease-in-out 0.2s;

		&:hover {
			background-color: var(--primary-blue);
			color: var(--text-white);
			border: var(--button-blue-border);
		}
	}

	.nav-link {
		display: block;
		color: light-dark(var(--blue-800), var(--blue-150));
		font-weight: 500;
		font-size: 1.2rem;
		text-decoration: none;
		padding: 0.5rem 1rem;
	}

	.menu-button {
		position: relative;
		white-space: nowrap;
		font-weight: var(--heading-font-weight);
		color: light-dark(var(--blue-800), var(--blue-150));
		padding: 0.5rem 1rem;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -2px;
			height: 2px;
			width: 0%;
			background: currentColor;
			transition: 0.3s ease;
		}

		&:hover::after {
			width: 100%;
		}
	}

	a {
		position: relative;
		text-decoration: none;
		color: light-dark(#000, #fff);
		border-radius: 10px;
		transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -2px;
			width: 0;
			height: 2px;
			background: currentColor;
			transition: width 0.3s ease;
		}

		&:hover::after {
			width: 100%;
		}

		&.active::after {
			width: 100%;
		}
	}
</style>
