<script>
	import { logo, logowhite, RLink } from '$lib'

	import { page } from '$app/stores'
</script>

<nav aria-label="Primair">
	<a
		class="logo"
		href="/"
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

	<details class="menu">
		<summary>
			<span></span>
			<span></span>
			<span></span>
		</summary>
		<ul class="panel">
			<li><RLink href="/" class="nav-link">Home</RLink></li>
			<li><RLink href="/over-ad" class="nav-link">Over Ad's</RLink></li>
			<li><RLink href="/lados-en-ad-profielen" class="nav-link">LAdO's en Ad-profielen</RLink></li>
			<li><RLink href="/publicaties" class="nav-link">Publicaties</RLink></li>
			<li><RLink href="/talent-award" class="nav-link">Talent Award</RLink></li>
			<li><RLink href="/nieuws" class="nav-link">Nieuws</RLink></li>
			<li><RLink href="/ad-dag" class="nav-link">Ad-dag</RLink></li>
			<li><RLink href="over-ons" class="nav-link">Over ons</RLink></li>
			<li><RLink href="/contact" class="nav-link">Contact</RLink></li>
		</ul>
	</details>

	<ul class="desktop-nav">
		<li>
			<RLink
				class="primary {$page.url.pathname === '/' ? 'menu-button active' : 'menu-button'}"
				href="/">Home</RLink
			>
		</li>
		<li>
			<RLink
				class="primary {$page.url.pathname === '/over-ad' ? 'menu-button active' : 'menu-button'}"
				href="/over-ad">Over Ad's</RLink
			>
		</li>
		<li>
			<RLink
				class="primary {$page.url.pathname === '/lados-en-ad-profielen' ? 'menu-button active' : 'menu-button'}"
				href="/lados-en-ad-profielen">LAdO's en Ad-profielen</RLink
			>
		</li>
		<li>
			<RLink
				class="primary {$page.url.pathname === '/publicaties' ? 'menu-button active' : 'menu-button'}"
				href="/publicaties">Publicaties</RLink
			>
		</li>
		<li>
			<RLink
				class="primary {$page.url.pathname === '/talent-award' ? 'menu-button active' : 'menu-button'}"
				href="/talent-award">Talent Award</RLink
			>
		</li>
		<li>
			<RLink
				class="primary {$page.url.pathname === '/nieuws' ? 'menu-button active' : 'menu-button'}"
				href="/nieuws">Nieuws</RLink
			>
		</li>
		<li>
			<RLink
				class="button-outline-white"
				href="/ad-dag">Kom naar Ad-dag</RLink
			>
		</li>
	</ul>
</nav>

<style>
	/* MOBILE*/
	nav {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		background: var(--background);
		z-index: 99;
		box-sizing: border-box;

		position: fixed;
		top: 2.8em;
		padding: 1em 5%;

		.logo img {
			height: 50px;
		}
	}

	summary {
		display: inline-block;
		position: relative;
		cursor: pointer;
		list-style: none;
		-webkit-tap-highlight-color: transparent;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary span {
		display: block;
		position: relative;
		width: 28px;
		height: 3px;
		margin: 6px 0;
		background: light-dark(var(--blue-800), var(--blue-150));
		border-radius: 2px;
		transform-origin: center;
		transition: all 0.3s ease;
	}

	.menu {
		display: block;
		position: relative;
		z-index: 0;
	}
	.menu:hover summary span {
		width: 32px;
	}

	.menu::before {
		content: '';
		display: block;
		position: fixed;
		inset: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0);
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
		display: flex;
		position: fixed;
		inset: 0;
		z-index: 1000;
		flex-direction: column;
		justify-content: center;
		gap: 1.2rem;
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: clamp(1rem, 3vw, 2rem);
		box-sizing: border-box;
		background: var(--background);
		list-style: none;
		text-align: left;
		transform: translateX(100%);
		transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
		will-change: transform;
	}

	.menu[open] .panel {
		transform: translateX(0);
	}
	.menu[open] summary {
		display: inline-block;
		position: fixed;
		top: 16px;
		right: 16px;
		z-index: 1001;
		padding: 6px;
		background: transparent;
		border-radius: 8px;
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

	:global(body:has(.menu[open])) {
		overflow: hidden;
	}

	.desktop-nav {
		display: none;
	}

	/* Desktop */
	@media (min-width: 1160px) {
		nav {
			padding: 1em 5%;
		}

		.logo {
			display: block;
			height: 50px;
		}

		.logo img {
			width: 12em;
		}

		.menu {
			display: none;
		}

		.desktop-nav {
			display: flex;
			position: relative;
			gap: 1.5rem;
			list-style: none;
		}

		.desktop-nav li:nth-of-type(7) {
			white-space: nowrap;
		}
	}

	/* Accessibility */
	@media (prefers-reduced-motion: reduce) {
		.panel,
		.menu::before,
		summary span {
			transition: none !important;
		}
	}
</style>
