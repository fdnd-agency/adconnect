<script>
	const { error = false } = $props()
</script>

<div class="gate-overlay">
	<div class="gate-container">
		<h2>Toegang vereist</h2>
		<p>Deze website is momenteel niet publiekelijk beschikbaar.</p>

		<form
			method="POST"
			action="/gate"
		>
			<input
				type="password"
				name="password"
				placeholder="Voer wachtwoord in"
				required
			/>
			<button type="submit">Bevestigen</button>
		</form>

		{#if error}
			<p class="error-message">Onjuist wachtwoord</p>
		{/if}
	</div>
</div>

<style>
	.gate-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.gate-container {
		background: white;
		padding: 3rem;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		max-width: 400px;
		width: 90%;
		text-align: center;
	}

	h2 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
		color: #333;
	}

	p {
		margin-bottom: 1.5rem;
		color: #666;
		font-size: 0.95rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	input {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	input:focus {
		outline: none;
		border-color: #0066cc;
		box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
	}

	button {
		padding: 0.75rem;
		background: #0066cc;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.2s;
		font-weight: 500;
	}

	button:hover {
		background: #0052a3;
	}

	button:active {
		transform: scale(0.98);
	}

	.error-message {
		color: #dc2626;
		font-size: 0.9rem;
		margin-top: 1rem;
	}
</style>
