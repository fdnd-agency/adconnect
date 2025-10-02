<script>
	import favicon from '$lib/assets/favicon-adc.svg';
	import logodark from '$lib/assets/logo-dark.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<footer class="footer-grid">
	<img src="{logodark}" alt="Terug naar homepagina" width="230" height="75">
	
	<section>
		<h3>AdConnect</h3>
		<p>Lorem ipsum dolor sit amet consectetur. Massa et enim vitae quis eget. Quam elit elementum vivamus libero vitae nulla nec eget. Porttitor nunc tristique dictumst dui at augue vitae a. Nisl orci ultricies nec quisque. Nulla laoreet elit id vitae ullamcorper.</p>
	</section>
	
	<section>
		<div class="desktop-menu">
			<h3>Menu</h3>
			<ul>
				<li><a href="/">Wat zijn Ad's?</a></li>
				<li><a href="/">Documenten</a></li>
				<li><a href="/">Nieuws</a></li>
				<li><a href="/">Evenementen</a></li>
				<li><a href="/">Nominaties</a></li>
			</ul>
		</div>
	
		<details class="mobile-menu">
			<summary><h3>Menu</h3></summary>
				<ul>
					<li><a href="/">Wat zijn Ad's?</a></li>
					<li><a href="/">Documenten</a></li>
					<li><a href="/">Nieuws</a></li>
					<li><a href="/">Evenementen</a></li>
					<li><a href="/">Nominaties</a></li>
				</ul>
		</details>
	</section>

	<section>
		<div class="desktop-menu">
			<h3>Thema's</h3>
			<ul>
				<li><a href="/">Impactmakerschap</a></li>
				<li><a href="/">Niveau 5</a></li>
				<li><a href="/">Doorstroom Ad’s</a></li>
				<li><a href="/">Onderzoek houding</a></li>
			</ul>
		</div>
	
		<details class="mobile-menu">
			<summary><h3>Thema's</h3></summary>
				<ul>
					<li><a href="/">Impactmakerschap</a></li>
					<li><a href="/">Niveau 5</a></li>
					<li><a href="/">Doorstroom Ad’s</a></li>
					<li><a href="/">Onderzoek houding</a></li>
				</ul>
		</details>
	</section>

	<section>
		<div class="desktop-menu">
			<h3>Leden van bestuur</h3>
			<ul>
				<li><a href="/">Roland van der Poel (voorzitter)</a></li>
				<li><a href="/">Carolien van Rijswijk</a></li>
				<li><a href="/">Carolien van Rijswijk</a></li>
				<li><a href="/">Carolien van Rijswijk</a></li>
				<li><a href="/">Carolien van Rijswijk</a></li>
			</ul>
		</div>
	
		<details class="mobile-menu">
			<summary><h3>Leden van bestuur</h3></summary>
				<ul>
					<li><a href="/">Roland van der Poel (voorzitter)</a></li>
					<li><a href="/">Roland van der Poel (voorzitter)</a></li>
					<li><a href="/">Roland van der Poel (voorzitter)</a></li>
					<li><a href="/">Roland van der Poel (voorzitter)</a></li>
					<li><a href="/">Roland van der Poel (voorzitter)</a></li>
				</ul>
		</details>
	</section>

	<section>
		<div class="desktop-menu">
			<h3>Contact</h3>
			<ul>
				<li><a href="mailto:platformassociatedegrees@outlook.com">platformassociatedegrees@outlook.com</a></li>
			</ul>
		</div>
	
		<details class="mobile-menu">
			<summary><h3>Contact</h3></summary>
				<ul>
					<li><a href="mailto:platformassociatedegrees@outlook.com">platformassociatedegrees@outlook.com</a></li>
				</ul>
		</details>
	</section>

	<div class="divider"></div>

	<div class="footer-bottom">
		<p>© Overlegplatform Associate Degrees. Alle rechten voorbehouden</p>
		<p>Ontwikkeld door studenten FDND</p>
	</div>

</footer>

<style>


	:global(*) {
		margin: 0;
		padding: 0;
	}

	footer {
		background-color: #00408D;
		border-radius: 1em 1em 0 0;
		margin: 0;
		padding: 2em;
		color: #fff;
		display: flex;
		flex-direction: column;
		gap: 1.5em;

	}

	a {
		color: #fff;
		text-decoration: none;
		display: block;
		transition: .2s ease-in-out;

		&:hover {
			transition: .2s ease-in-out;
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
		gap: .7em;

		li {
			list-style-type: none;
		}
	}

	footer img {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
	}

	footer section:nth-of-type(1) {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
		padding: 0 0 1em 0;

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
		gap: .5em;
		justify-content: space-between;

	}

	.desktop-menu {
		display: none;
		
	}

	.mobile-menu {
		display: block;
		
	}

	/* Dropdown menu */
	details {
		margin: -.7em 0 0 0;
	}

	summary {
		list-style: none;
		cursor: pointer;
		display: flex;
		gap: .5em;
	}

	/* Change icon when open and close */
	summary::after {
		content: url('/static/chevon-down.svg'); 
	}

	details[open] summary::after {
		content: url('/static/chevron-up.svg'); 
	}

</style>