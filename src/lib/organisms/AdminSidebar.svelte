<script>
	const { user = null } = $props()

	import { logo, logowhite } from '$lib'
	import AdminNavLink from '$lib/atoms/AdminNavLink.svelte'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	const navItems = [
		{ href: '/admin', label: 'Dashboard', activePath: '/admin' },
		{ href: '/admin/themes', label: "Thema's", activePath: '/admin/themes' },
		{ href: '/admin/events', label: 'Events', activePath: '/admin/events' },
		{ href: '/admin/documents', label: 'Documenten', activePath: '/admin/documents' },
		{ href: '/admin/nominations', label: 'Nominaties', activePath: '/admin/nominations' },
		{ href: '/admin/news', label: 'Nieuws', activePath: '/admin/news' },
		{ href: '/admin/cooperations', label: 'Samenwerkingen', activePath: '/admin/cooperations' },
		{ href: '/admin/faqs', label: "FAQ's", activePath: '/admin/faqs' }
	]

	let menuElement = $state(null)
</script>

<header class="admin-header">
	<nav class="admin-nav">
		<div class="header-logo">
			<a
				class="logo-admin"
				href="/admin"
				aria-label="Home – AdConnect logo"
			>
				<picture>
					<source
						srcset={logowhite}
						media="(prefers-color-scheme: dark)"
					/>
					<img
						src={logo}
						alt=""
						loading="lazy"
						width="200"
						height="150"
					/>
				</picture>
			</a>
		</div>

		<div class="container-header">
			{#if user}
				<details
					class="menu"
					bind:this={menuElement}
				>
					<summary aria-label="Menu openen">
						<span></span>
						<span></span>
						<span></span>
					</summary>

					<button
						class="panel"
						type="button"
						aria-label="Menu sluiten"
						onclick={() => (menuElement.open = false)}
					>
						<ul class="mobile-links">
							{#each navItems as item (item.activePath)}
								<li>
									<AdminNavLink
										href={item.href}
										label={item.label}
										active={$page.url.pathname === item.activePath}
									/>
								</li>
							{/each}
						</ul>

						<div class="sidebar-footer">
							<a
								href="/admin/logout"
								class="logout-btn"
								data-sveltekit-reload
							>
								Uitloggen
							</a>
						</div>
					</button>
				</details>

				<ul class="desktop-nav">
					{#each navItems as item (item.activePath)}
						<li>
							<AdminNavLink
								href={item.href}
								label={item.label}
								active={$page.url.pathname === item.activePath}
							/>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="welcome-section">
					<h1 class="welcome-text">Welkom Terug!</h1>
				</div>
			{/if}
		</div>
	</nav>
</header>

<style>
	.admin-header {
		background-color: var(--blue-100);
		@media (prefers-color-scheme: dark) {
			background-color: hsl(210, 30%, 8%);
		}
		@supports (color: light-dark(red, blue)){
			background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		}
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 999;
		display: flex;
		justify-content: center;

		@media (min-width: 1000px) {
			position: fixed;
			top: 0;
			left: 0;
			width: 260px;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
		}
	}

	.admin-nav {
		width: 100%;
		align-items: center;
		position: relative;

		@media (min-width: 1000px) {
			flex-direction: column;
			align-items: flex-start;
			height: 100%;
		}
	}

	h1 {
		text-align: center;
	}

	.header-logo {
		background-color: var(--background);
		padding: 1em;
		@media (min-width: 1000px) {
			width: 100%;
			padding: 0;
			margin-bottom: 2rem;
		}
	}

	.container-header {
		padding: 1em;
		align-self: center;

		@media (min-width: 1000px) {
			margin-bottom: auto;
		}
	}

	.logo-admin img {
		height: 3.5em;
		width: auto;
		display: flex;
		justify-self: center;
		@media (min-width: 1000px) {
			margin: 1em;
			display: unset;
		}
	}

	summary {
		display: inline-block;
		cursor: pointer;
		list-style: none;
	}

	summary span {
		display: block;
		width: 28px;
		height: 3px;
		margin: 6px 0;
		background-color: var(--blue-800);
		@media (prefers-color-scheme: dark) {
			background-color: var(--text-white);
		}
		@supports (color: light-dark(red, blue)) {
			background-color: light-dark(var(--blue-800), var(--text-white))
		}
		border-radius: 2px;
		transform-origin: center;
		transition: all 0.3s ease;
	}

	.menu {
		display: block;
		position: relative;
		display: flex;
		justify-content: end;
		@media (min-width: 1000px) {
			display: none;
		}
	}

	.menu::before {
		content: '';
		display: block;
		position: fixed;
		inset: 0;
		z-index: 999;
		background-color: hsl(360 100% 0%);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
	}

	.menu[open]::before {
		background: hsla(0 0% 0% / 0.25);
		opacity: 1;
		pointer-events: auto;
	}

	.panel {
		position: fixed;
		inset: 0;
		z-index: 1000;
		width: 100vw;
		height: 100vh;
		background-color: var(--background);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		transform: translateX(100%);
		transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	.menu[open] .panel {
		transform: translateX(0);
		background-color: var(--blue-100);
		@media (prefers-color-scheme: dark) {
			background-color: hsl(210, 30%, 8%);
		}
		@supports (color: light-dark(red, blue)) {
			background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		}
	}

	.menu[open] summary {
		position: fixed;
		top: 1em;
		right: 1em;
		z-index: 1001;
		padding: 0.5em;
	}

	.menu[open] summary span:nth-child(1) {
		transform: translateY(9px) rotate(45deg);
	}
	.menu[open] summary span:nth-child(2) {
		transform: scaleX(0);
		opacity: 0;
	}
	.menu[open] summary span:nth-child(3) {
		transform: translateY(-9px) rotate(-45deg);
	}

	.mobile-links {
		list-style: none;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 5em 1em;
	}

	.sidebar-footer {
		padding: 1em;
		font-size: 1.2em;
	}

	.logout-btn {
		display: inline-block;
		text-decoration: none;
		font-weight: 600;
		padding: 1em;
		border-radius: var(--button-blue-radius);
		border: 2px solid currentColor;
		color: var(--blue-800);
		@media (prefers-color-scheme: dark) {
			color: var(--text-white);
		}
		@supports (color: light-dark(red, blue)) {
			color: light-dark(var(--blue-800), var(--text-white));
		}

		@media (min-width: 1000px) {
			margin-top: auto;
			width: 100%;
			text-align: center;
		}
	}

	.desktop-nav {
		display: none;
		list-style: none;
		gap: 1em;
		align-items: center;
		margin: 0;
		padding: 0;

		@media (min-width: 1000px) {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 1em;
			width: 100%;
		}
	}
</style>
