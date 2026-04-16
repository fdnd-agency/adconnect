<script>
	import favicon from '$lib/assets/favicon-adc.svg'
	import logodark from '$lib/assets/logo-dark.svg'

	import { Footer, NavPros, TopNav, icondown, logowhite } from '$lib'

	const { children } = $props()
</script>

<a
	href="#main"
	class="skip-link">Ga naar inhoud</a
>

<header class="general-header">
	<TopNav />
	<NavPros />
</header>

<main>
	{@render children?.()}
</main>

<a
	class="scroll"
	href="#"
	><img
		src={icondown}
		alt=""
	/><span class="sr-only">Scroll naar beneden</span></a
>

<Footer />

<style>
	:root {
		interpolate-size: allow-keywords;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		scroll-behavior: smooth;
	}

	main {
		margin: 7.9em 0 0 0;
	}

	/* Skiplink */
	.skip-link {
		text-decoration: none;
		color: var(--text-white);
		background-color: var(--primary-blue);
		border: 1px solid var(--primary-text);
		padding: 0.7em 1.2em;
		border-radius: 5px;
		transition: 0.3s ease-in;
		position: absolute;
		top: -10rem;
		left: 45%;
		z-index: 99999999;

		&:focus-visible {
			top: 0;
		}
	}

	footer {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
		border-radius: 1em 1em 0 0;

		h2 {
			color: var(--text-white);
			font-size: 25px;
		}
	}

	.wrapper {
		background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
		margin: 0;
		color: #fff;
		display: flex;
		flex-direction: column;
		gap: 1.5em;
		position: relative;
		z-index: 20;
		width: 90%;
		align-self: center;
		padding: 2em 0;

		@media (min-width: 768px) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 2em;
		}

		@media (min-width: 1024px) {
			grid-template-columns: 2fr 1fr 1fr 1fr;
			grid-auto-rows: auto;
			width: 90%;
			max-width: 1400px;
			padding: 5em 0 2em 0;
		}
	}

	a {
		color: #fff;
		text-decoration: none;
		display: block;
		transition: 0.2s ease-in-out;

		&:hover {
			transform: translate(5%, 0%);
		}
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.7em;

		li {
			list-style-type: none;
		}
	}

	.logo {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
	}

	footer section:nth-of-type(1) {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
		padding: 0 0 1em 0;

		p {
			@media (min-width: 768px) {
				max-width: 20em;
			}
		}
	}

	footer section:nth-of-type(5) {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
	}

	.divider {
		height: 1px;
		background-color: #fff;
		grid-column: 1 / -1;
	}

	.footer-bottom {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		justify-content: space-between;

		@media (min-width: 768px) {
			flex-direction: row;
		}
	}

	.desktop-menu {
		display: none;
	}

	.mobile-menu {
		display: block;
	}

	@media (min-width: 768px) {
		.desktop-menu {
			display: flex;
			flex-direction: column;
			gap: 1em;
		}

		.mobile-menu {
			display: none;
		}
	}

	/* Dropdown menu */
	details {
		margin: -0.7em 0 0 0;
	}

	summary {
		list-style: none;
		cursor: pointer;
		display: flex;
		gap: 0.5em;
	}

	/* Change icon when open and close */
	summary::after {
		content: url('/static/chevon-down.svg');
	}

	details[open] summary::after {
		content: url('/static/chevron-up.svg');
	}

	/* Animation open and close */
	::details-content {
		transition:
			height 0.5s ease,
			content-visibility 0.5s ease allow-discrete;
		height: 0;
		overflow: clip;
		padding: 0.7em 0 0 0;
	}

	[open]::details-content {
		height: auto;
	}

	.scroll {
		position: fixed;
		bottom: 2em;
		right: 5%;
		font-size: 20px;
		padding: 0.6em 0.8em 0.8em 0.8em;
		z-index: 999999;
		background-color: var(--primary-orange);

		img {
			width: 1em;
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
	}
</style>
