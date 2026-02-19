<script>
	/** @type {{ data: { user: any }, children: import('svelte').Snippet }} */
	const { data, children } = $props()
</script>

<div class="admin-layout">
	<aside
		class="sidebar"
		class:sidebar-wide={!data.user}
	>
		<!-- Decorative blobs -->
		<div class="sidebar-blob sidebar-blob-top"></div>
		<div class="sidebar-blob sidebar-blob-bottom"></div>

		<div class="sidebar-inner">
			<!-- Logo -->
			<div class="sidebar-logo">
				<div class="logo-dots">
					<div class="dot-row">
						<span class="dot dot-sm"></span>
						<span class="dot dot-sm"></span>
						<span class="dot dot-sm"></span>
						<span class="dot dot-sm dot-orange"></span>
					</div>
					<div class="dot-row">
						<span class="dot dot-lg"></span>
						<span class="dot dot-lg"></span>
						<span class="dot dot-lg"></span>
					</div>
				</div>
				<span class="logo-text">AdConnect</span>
			</div>

			{#if data.user}
				<!-- Logged in: show nav -->
				<nav>
					<a
						href="/admin"
						class="nav-link">Dashboard</a
					>
				</nav>

				<!-- Footer with user info -->
				<div class="sidebar-footer">
					<div class="user-info">
						<span class="user-email">{data.user?.email ?? ''}</span>
					</div>
					<a
						href="/admin/logout"
						class="logout-btn"
						data-sveltekit-reload>Uitloggen</a
					>
				</div>
			{:else}
				<!-- Not logged in (login page): show welcome -->
				<div class="welcome-section">
					<h2 class="welcome-text">Welkom Terug!</h2>
				</div>
			{/if}
		</div>
	</aside>

	<main class="admin-content">
		{@render children()}
	</main>
</div>

<style>
	.admin-layout {
		display: flex;
		min-height: 100vh;
		font-family: 'Archivo', sans-serif;
	}

	/* ===== Sidebar ===== */
	.sidebar {
		width: 220px;
		background: var(--primary-blue, hsl(213, 100%, 28%));
		color: #fff;
		flex-shrink: 0;
		position: relative;
		overflow: hidden;
		transition: width 0.2s ease;
	}

	.sidebar-wide {
		width: 35%;
		min-width: 320px;
		max-width: 450px;
	}

	.sidebar-inner {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding: 1.5rem 1.25rem;
		box-sizing: border-box;
	}

	/* Decorative blobs */
	.sidebar-blob {
		position: absolute;
		border-radius: 50%;
		background: hsla(213, 100%, 40%, 0.3);
		z-index: 1;
	}

	.sidebar-blob-top {
		width: 200px;
		height: 200px;
		top: -60px;
		right: -70px;
	}

	.sidebar-blob-bottom {
		width: 180px;
		height: 180px;
		bottom: -50px;
		left: -60px;
	}

	/* Logo */
	.sidebar-logo {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		margin-bottom: 1.5rem;
	}

	.logo-dots {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.dot-row {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}

	.dot {
		border-radius: 50%;
		background: #fff;
	}

	.dot-sm {
		width: 8px;
		height: 8px;
	}

	.dot-lg {
		width: 14px;
		height: 14px;
	}

	.dot-orange {
		background: var(--primary-orange, hsl(10, 80%, 55%));
	}

	.logo-text {
		font-family: 'ClashDisplay', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		margin-top: 0.15rem;
	}

	/* Navigation */
	nav {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		flex: 1;
	}

	.nav-link {
		color: rgba(255, 255, 255, 0.9);
		text-decoration: none;
		padding: 0.55rem 0.75rem;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 500;
		transition:
			background 0.15s,
			color 0.15s;
	}

	.nav-link:hover {
		background: hsla(0, 0%, 100%, 0.12);
		color: #fff;
	}

	/* Footer */
	.sidebar-footer {
		border-top: 1px solid hsla(0, 0%, 100%, 0.15);
		padding-top: 1rem;
		margin-top: 0.5rem;
	}

	.user-info {
		margin-bottom: 0.5rem;
	}

	.user-email {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.7);
	}

	.logout-btn {
		display: block;
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-size: 0.8rem;
		padding: 0.45rem 0.75rem;
		border-radius: 6px;
		border: 1px solid hsla(0, 0%, 100%, 0.2);
		transition:
			background 0.15s,
			color 0.15s;
	}

	.logout-btn:hover {
		background: hsla(0, 0%, 100%, 0.1);
		color: #fff;
	}

	/* Welcome (login page) */
	.welcome-section {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.welcome-text {
		font-family: 'ClashDisplay', sans-serif;
		font-size: 1.75rem;
		font-weight: 600;
		color: #fff;
		margin: 0;
	}

	/* ===== Content ===== */
	.admin-content {
		flex: 1;
		background: #f0f2f8;
		overflow-y: auto;
	}

	/* ===== Responsive ===== */
	@media (max-width: 768px) {
		.sidebar {
			width: 180px;
		}

		.welcome-text {
			font-size: 1.35rem;
		}

		.admin-content {
			padding: 1.5rem 1rem;
		}
	}
</style>
