<script>
	/** @type {{ data: { user: any }, children: import('svelte').Snippet }} */
	const { data, children } = $props()
	import { logo, logowhite } from '$lib'
	import { page } from '$app/stores'
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
			{#if data.user}
				<details class="menu">
					<summary aria-label="Menu openen">
						<span></span>
						<span></span>
						<span></span>
					</summary>

					<div class="panel">
						<ul class="mobile-links">
							<li>
								<a
									href="/admin"
									class="nav-link">Dashboard</a
								>
							</li>
							<li>
								<a
									href=""
									class="nav-link">Thema's</a
								>
							</li>
							<li>
								<a
									href=""
									class="nav-link">Events</a
								>
							</li>
							<li>
								<a
									href=""
									class="nav-link">Documenten</a
								>
							</li>
							<li>
								<a
									href=""
									class="nav-link">Nominaties</a
								>
							</li>
							<li>
								<a
									href=""
									class="nav-link">Nieuws</a
								>
							</li>
							<li>
								<a
									href=""
									class="nav-link">Samenwerken</a
								>
							</li>
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
					</div>
				</details>

				<ul class="desktop-nav">
					<li>
						<a
							href="/admin"
							class="nav-link"
							class:active={$page.url.pathname === '/admin'}>Dashboard</a
						>
					</li>
					<li>
						<a
							href=""
							class="nav-link"
							class:active={$page.url.pathname === '/themas'}>Thema's</a
						>
					</li>
					<li>
						<a
							href=""
							class="nav-link"
							class:active={$page.url.pathname === '/events'}>Events</a
						>
					</li>
					<li>
						<a
							href=""
							class="nav-link"
							class:active={$page.url.pathname === '/documenten'}>Documenten</a
						>
					</li>
					<li>
						<a
							href=""
							class="nav-link"
							class:active={$page.url.pathname === '/nominaties'}>Nominaties</a
						>
					</li>
					<li>
						<a
							href=""
							class="nav-link"
							class:active={$page.url.pathname === '/nieuws'}>Nieuws</a
						>
					</li>
					<li>
						<a
							href=""
							class="nav-link"
							class:active={$page.url.pathname === '/samenwerken'}>Samenwerken</a
						>
					</li>
				</ul>
			{:else}
				<div class="welcome-section">
					<h1 class="welcome-text">Welkom Terug!</h1>
				</div>
			{/if}
		</div>
	</nav>
</header>

<main class="admin-content">
	{@render children()}
</main>

<style>
	.nav-link {
		position: relative;
		text-decoration: none;
		padding-bottom: 0.2em;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -2px;
			height: 2px;
			width: 0%;
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
	.nav-link.active::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 2px;
		width: 100%;
		background: currentColor;
	}
	.admin-header {
		background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
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
			background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
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
		color: var(--button-blue-text);
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
		background-color: var(--background);
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
		background-color: rgba(0, 0, 0, 0);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
	}

	.menu[open]::before {
		background: rgba(0, 0, 0, 0.25);
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
		background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
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

	.nav-link {
		display: block;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.2em;
		color: var(--background);
		padding: 0.5em 1em;
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
		color: var(--background);
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

	@media (min-width: 1000px) {
		.desktop-nav .nav-link {
			color: var(--background);
			font-size: 1.2em;
			width: 100%;
			display: block;
		}
	}

	@media (min-width: 1000px) {
		.admin-content {
			margin-left: 260px;
			padding: 2em;
		}
	}
</style>
