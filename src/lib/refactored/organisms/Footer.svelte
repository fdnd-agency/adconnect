<script>
	import { logowhite, RLink } from '$lib'
	import { IconLogo } from '$lib/icons'

	const menuLinks = [
		{ label: "Over Ad's?", href: '/over-ad' },
		{ label: 'Publicaties', href: '/publicaties' },
		{ label: 'Nieuws', href: '/nieuws' },
		{ label: 'Talent Award', href: '/talent-award' },
		{ label: 'Ad-dag', href: '/ad-dag' },
		{ label: 'Over ons', href: '/over-ons' },
		{ label: 'Contact', href: '/contact' }
	]

	const themaLinks = [
		{ label: 'Handreiking impactmakerschap', href: '/over-ad/handreiking-impactmakerschap' },
		{ label: 'Impactmakerschap', href: '/over-ad/impactmakerschap' },
		{ label: 'Niveau 5', href: '/over-ad/niveau-5' },
		{ label: 'Doorstroom Ad bachelor', href: '/over-ad/doorstroom-ad-bachelor' },
		{ label: 'Leren in beroepspraktijk', href: '/over-ad/leren-in-beroepspraktijk' },
		{ label: 'Internationalisering', href: '/over-ad/internationalisering' }
	]

	const contactLinks = [{ label: "E-mail platform Ad's", href: 'mailto:platformassociatedegrees@outlook.com' }]
</script>

{#snippet miniNavList(links)}
	<ul>
		{#each links as link}
			<li>
				<RLink
					target="_blank"
					href={link.href}
					class="footer-link"
				>
					{link.label}
				</RLink>
			</li>
		{/each}
	</ul>
{/snippet}

<footer class="footer-grid">
	<div class="wrapper">
		<div
			href="/"
			class="logo"
		>
			<IconLogo />
		</div>

		<section>
			<h2>Overlegplatform Ad's</h2>
			<p>
				Het Overlegplatform Associate degrees brengt Ad-opleidingen samen om kennis te delen en profielen af te stemmen. Zo blijven opleidingen relevant voor het werkveld en goed voorbereid op
				doorstroom naar vervolgstudies.
			</p>
		</section>

		<section>
			<details>
				<summary><h2>Menu</h2></summary>
				{@render miniNavList(menuLinks)}
			</details>
		</section>

		<section>
			<details>
				<summary><h2>Thema's</h2></summary>
				{@render miniNavList(themaLinks)}
			</details>
		</section>

		<section>
			<details>
				<summary><h2>Contact</h2></summary>
				{@render miniNavList(contactLinks)}
			</details>
		</section>

		<div class="divider"></div>

		<div class="footer-bottom">
			<p>© Overlegplatform Associate degrees. Alle rechten voorbehouden</p>
			<p>Ontwikkeld door studenten FDND</p>
		</div>
	</div>
</footer>

<style>
	:root {
		interpolate-size: allow-keywords;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		scroll-behavior: smooth;
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

	details {
		margin: -0.7em 0 0 0;
	}

	summary {
		list-style: none;
		cursor: pointer;
		display: flex;
		gap: 0.5em;
	}

	summary::after {
		content: url('/static/chevon-down.svg');
	}

	details[open] summary::after {
		content: url('/static/chevron-up.svg');
	}

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

	@media (min-width: 768px) {
		summary {
			pointer-events: none;
			cursor: default;
		}

		summary::after,
		details[open] summary::after {
			content: none;
		}

		::details-content {
			height: auto;
			content-visibility: visible;
			transition: none;
		}
	}
</style>
