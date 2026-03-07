<script>
	import { loading as loadingIcon } from '$lib'
	import { loading } from '$lib/stores/loadingStore'
</script>

{#if $loading}
	<div class="loading-overlay">
		<div class="loading-content">
			<img class="spinner" src={loadingIcon} alt="" />
			<p>Laden...</p>
		</div>
	</div>
{/if}

<style>
	.loading-overlay {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.45);
	}

	.loading-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
		color: #fff;
		font-family: var(--font-heading, sans-serif);
		font-size: 1.1rem;
	}

	.loading-content p {
		margin: 0;
	}

	.spinner {
		width: 4em;
		height: 4em;
		animation: spin 1s linear infinite;
		filter: brightness(0) invert(1);
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
