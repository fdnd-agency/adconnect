<script>
	import { page } from '$app/state'
	import { RLink } from '$lib'

</script>

<nav aria-label="Secundair">
	<section class="nav-right">
		<ul>
			<li><RLink href="/#faq" class="nav-link">FAQ's</RLink></li>
			<li>
				<RLink
					class="nav-link {page.url.pathname === '/over-ons' ? 'active' : ''}"
					href="/over-ons">Over ons</RLink
				>
			</li>
			<li>
				<RLink
					class="nav-link {page.url.pathname === '/contact' ? 'active' : ''}"
					href="/contact">Contact</RLink
				>
			</li>
		</ul>
	</section>
</nav>

<style>
	:global(body) {
		margin: 0;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(header) {
		position: fixed;
		top: 0;
		z-index: 99;
		width: 100%;
	}

	nav {
		display: flex;
		justify-content: flex-end;
		position: sticky;
		top: 0;
		z-index: 99;
		background-color: light-dark(var(--blue-150), var(--blue-800));
		padding: 1rem 5%;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-right ul {
		width: 100%;
		display: flex;
		gap: 2rem;
		justify-content: flex-end;
	}
</style>
