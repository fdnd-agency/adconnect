<script>
	import { page } from '$app/state'
</script>

<nav aria-label="Secundair">
	<section class="nav-right">
		<ul>
			<li><a href="/#faq">FAQ's</a></li>
			<li>
				<a
					class={page.url.pathname === '/over-ons' ? 'active' : 'menu-button'}
					href="/over-ons">Over ons</a
				>
			</li>
			<li>
				<a
					class={page.url.pathname === '/contact' ? 'active' : 'menu-button'}
					href="/contact">Contact</a
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

		a {
			position: relative;
			text-decoration: none;
			color: light-dark(#000, #fff);
			border-radius: 10px;
			transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

			&::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: -2px;
				width: 0;
				height: 2px;
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
	}
</style>
