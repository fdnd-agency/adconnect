<script>
	import favicon from '$lib/assets/favicon-adc.svg'
	import logodark from '$lib/assets/logo-dark.svg'

	import { Footer, NavPros, TopNav, icondown, logowhite, PasswordGate } from '$lib'

	const { data, children } = $props()
</script>

{#if !data.isAuthenticated}
	<PasswordGate error={data.gateError} />
{:else}
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

	<RFooter themaLinks={data.themaLinks} />

	<a
		class="scroll"
		href="#"
		data-sveltekit-replacestate
		><img
			src={icondown}
			alt=""
		/><span class="visually-hidden">Scroll naar boven</span></a
	>
{/if}

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
</style>
