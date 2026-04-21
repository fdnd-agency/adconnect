<script>
	/** @type {{ href?: string, label?: string, active?: boolean }} */
	const { href = '', label = '', active = false } = $props()
</script>

<a
	{href}
	class="nav-link"
	class:active>{label}</a
>

<style>
	.nav-link {
		display: block;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.2em;
		color: var(--blue-800);

		@media (prefers-color-scheme: dark) {
			color: var(--text-white);
		}

		@supports (color: light-dark(red, blue)) {
			color: light-dark(var(--blue-800), var(--text-white));
		}

		padding: 0.5em 1em;
		position: relative;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -2px;
		height: 2px;
		width: 0%;
		background: currentColor;
		transition: width 0.3s ease;
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-link.active::after {
		width: 100%;
	}
</style>
