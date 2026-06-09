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
	<ul class="footer__list">
		{#each links as link}
			<li class="footer__item">
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

<footer class="footer">
	<div class="footer__inner">
		<a
			href="/"
			class="footer__logo"
			aria-label="Home"
		>
			<IconLogo />
		</a>

		<section class="footer__column footer__column--about">
			<h2 class="footer__heading">Overlegplatform Ad's</h2>
			<p>
				Het Overlegplatform Associate degrees brengt Ad-opleidingen samen om kennis te delen en profielen af te stemmen. Zo blijven opleidingen relevant voor het werkveld en goed voorbereid op
				doorstroom naar vervolgstudies.
			</p>
		</section>

		<section class="footer__column">
			<details>
				<summary><h2 class="footer__heading">Menu</h2></summary>
				{@render miniNavList(menuLinks)}
			</details>
		</section>

		<section class="footer__column">
			<details>
				<summary><h2 class="footer__heading">Thema's</h2></summary>
				{@render miniNavList(themaLinks)}
			</details>
		</section>

		<section class="footer__column">
			<details>
				<summary><h2 class="footer__heading">Contact</h2></summary>
				{@render miniNavList(contactLinks)}
			</details>
		</section>

		<div class="footer__divider"></div>

		<div class="footer__bottom">
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

	.footer {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-radius: 1em 1em 0 0;
		background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
	}

	.footer__inner {
		position: relative;
		z-index: 20;
		display: flex;
		flex-direction: column;
		align-self: center;
		gap: 1.5em;
		width: 90%;
		padding: 2em 0;
		color: var(--text-white);

		@media (min-width: 768px) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 2em;
		}

		@media (min-width: 1024px) {
			grid-template-columns: 2fr 1fr 1fr 1fr;
			grid-auto-rows: auto;
			max-width: 1400px;
			padding: 5em 0 2em 0;
		}
	}

	.footer__heading {
		color: var(--text-white);
		font-size: 1.5625rem;
	}

	.footer__column {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.footer__column--about {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
		padding: 0 0 1em 0;

		p {
			@media (min-width: 768px) {
				max-width: 20em;
			}
		}
	}

	.footer__logo {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
	}

	.footer__list {
		display: flex;
		flex-direction: column;
		gap: 0.7em;
		list-style: none;
	}

	.footer__divider {
		height: 1px;
		grid-column: 1 / -1;
		background-color: var(--text-white);
	}

	.footer__bottom {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 0.5em;
		grid-column: 1 / -1;

		@media (min-width: 768px) {
			flex-direction: row;
		}
	}

	details {
		margin: -0.7em 0 0 0;
	}

	summary {
		display: flex;
		gap: 0.5em;
		list-style: none;
		cursor: pointer;
	}

	summary::after {
		content: url('/static/chevon-down.svg');
	}

	details[open] summary::after {
		content: url('/static/chevron-up.svg');
	}

	::details-content {
		height: 0;
		padding: 0.7em 0 0 0;
		overflow: clip;
		transition:
			height 0.5s ease,
			content-visibility 0.5s ease allow-discrete;
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
