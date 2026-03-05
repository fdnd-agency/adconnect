<script>
	/** @type {{ email?: string }} */
	const { email = '' } = $props()
</script>

<div class="container-nav">
	<button
		popovertarget="my-popover"
		class="button-outline-white"
		id="user-btn"
	>
		{email}
	</button>

	<div
		popover
		id="my-popover"
		class="button-outline-white"
	>
		<a
			href="/admin/logout"
			class="logout-btn"
			data-sveltekit-reload
		>
			Uitloggen
		</a>
	</div>
</div>

<style>
	@media (max-width: 999px) {
		.container-nav {
			display: none;
		}
	}

	@media (min-width: 1000px) {
		.container-nav {
			display: flex;
			justify-content: end;
			position: absolute;
			top: 1em;
			right: 1em;
			z-index: 10;
		}

		#my-popover {
			padding: 1em;
			border-radius: 8px;
			position-area: bottom;
		}

		#user-btn::after {
			content: url('/static/chevon-down.svg');
			padding: 0.05em 0.7em;
			transition: transform 0.3s;
		}
	}

	.logout-btn {
		color: var(--button-blue-text);

		&:hover {
			color: var(--primary-blue);
		}
	}
</style>
