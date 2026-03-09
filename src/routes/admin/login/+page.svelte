<script>
	import { bird } from '$lib'

	/** @type {{ form: import('./$types').ActionData }} */
	const { form } = $props()
</script>

<svelte:head>
	<title>Inloggen | ADConnect Admin</title>
</svelte:head>

<div class="login-page">
	<div class="login-form-side">
		<!-- Decorative blob top-right -->
		<div class="blob-tr"></div>

		<div class="login-form-wrapper">
			<!-- Logo dots -->
			<div class="logo-dots">
				<span class="dot dot-blue"></span>
				<span class="dot dot-orange"></span>
			</div>

			<h1>Inloggen</h1>

			{#if form?.error}
				<div class="error-message">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle
							cx="12"
							cy="12"
							r="10"
						/>
						<line
							x1="15"
							y1="9"
							x2="9"
							y2="15"
						/>
						<line
							x1="9"
							y1="9"
							x2="15"
							y2="15"
						/>
					</svg>
					<span>Ongeldige inloggegevens. Probeer het opnieuw.</span>
				</div>
			{/if}

			<form method="POST">
				<div class="form-group">
					<div class="input-wrapper">
						<svg
							class="input-icon"
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
							<circle
								cx="12"
								cy="7"
								r="4"
							/>
						</svg>
						<input
							type="email"
							id="email"
							name="email"
							required
							autocomplete="email"
							placeholder="E-mail"
						/>
					</div>
				</div>

				<div class="form-group">
					<div class="input-wrapper">
						<svg
							class="input-icon"
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect
								x="3"
								y="11"
								width="18"
								height="11"
								rx="2"
								ry="2"
							/>
							<path d="M7 11V7a5 5 0 0 1 10 0v4" />
						</svg>
						<input
							type="password"
							id="password"
							name="password"
							required
							autocomplete="current-password"
							placeholder="Wachtwoord"
						/>
					</div>
				</div>

				<button type="submit">Inloggen</button>
			</form>
		</div>

		<!-- Bird mascot -->
		<img
			class="bird-mascot"
			src={bird}
			alt="ADConnect mascotte"
		/>

		<!-- Decorative blob bottom-right -->
		<div class="blob-br"></div>
	</div>
</div>

<style>
	.login-page {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		z-index: 10;
		font-family: 'Archivo', sans-serif;
		background: light-dark(var(--text-white), var(--blue-900));
		overflow: auto;
	}

	/* ===== Form Side ===== */
	.login-form-side {
		flex: 1;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 2rem;
	}

	.login-form-wrapper {
		width: 100%;
		max-width: 380px;
		z-index: 1;
	}

	/* Logo dots */
	.logo-dots {
		display: flex;
		gap: 0.4rem;
		justify-content: center;
		margin-bottom: 0.75rem;
	}

	.dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
	}

	.dot-blue {
		background: var(--primary-blue, hsl(213, 100%, 28%));
	}

	.dot-orange {
		background: var(--primary-orange, hsl(10, 80%, 55%));
	}

	h1 {
		font-family: 'ClashDisplay', sans-serif;
		font-size: 1.75rem;
		font-weight: 600;
		color: #111;
		text-align: center;
		margin: 0 0 2rem;
	}

	/* Error */
	.error-message {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: #fef2f2;
		color: #dc2626;
		padding: 0.65rem 0.85rem;
		border-radius: 8px;
		font-size: 0.85rem;
		margin-bottom: 1.25rem;
		border: 1px solid #fecaca;
	}

	/* Form */
	.form-group {
		margin-bottom: 1rem;
	}

	.input-wrapper {
		position: relative;
	}

	.input-icon {
		position: absolute;
		left: 0.85rem;
		top: 50%;
		transform: translateY(-50%);
		color: #9ca3af;
		pointer-events: none;
	}

	input {
		width: 100%;
		padding: 0.75rem 0.85rem 0.75rem 2.75rem;
		font-size: 0.95rem;
		font-family: 'Archivo', sans-serif;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		background: #f9fafb;
		color: #111;
		box-sizing: border-box;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	input::placeholder {
		color: #9ca3af;
	}

	input:focus {
		outline: none;
		border-color: var(--primary-blue, hsl(213, 100%, 28%));
		box-shadow: 0 0 0 3px hsla(213, 100%, 28%, 0.1);
		background: #fff;
	}

	button {
		display: block;
		margin: 1.5rem auto 0;
		padding: 0.7rem 3rem;
		font-size: 0.95rem;
		font-weight: 600;
		font-family: 'Archivo', sans-serif;
		color: #fff;
		background: var(--primary-blue, hsl(213, 100%, 28%));
		border: 2px solid var(--primary-blue, hsl(213, 100%, 28%));
		border-radius: 8px;
		cursor: pointer;
		transition:
			background 0.15s,
			transform 0.1s;
	}

	button:hover {
		background: hsl(213, 100%, 23%);
		border-color: hsl(213, 100%, 23%);
	}

	button:active {
		transform: scale(0.98);
	}

	/* Bird mascot */
	.bird-mascot {
		position: absolute;
		bottom: 1rem;
		right: 2rem;
		width: 160px;
		height: auto;
		z-index: 2;
		object-fit: contain;
	}

	/* Decorative blobs */
	.blob-tr {
		position: absolute;
		top: -100px;
		right: -100px;
		width: 280px;
		height: 280px;
		border-radius: 50%;
		background: hsla(213, 60%, 90%, 0.5);
	}

	.blob-br {
		position: absolute;
		bottom: -40px;
		right: 30%;
		width: 180px;
		height: 180px;
		border-radius: 50%;
		background: hsla(213, 60%, 92%, 0.4);
	}

	/* ===== Responsive ===== */
	@media (max-width: 768px) {
		.login-form-side {
			padding: 2rem 1.5rem 6rem;
		}

		.bird-mascot {
			width: 120px;
			bottom: 0.5rem;
			right: 1rem;
		}

		.blob-tr {
			width: 180px;
			height: 180px;
			top: -60px;
			right: -60px;
		}
	}
</style>
