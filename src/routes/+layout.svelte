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
