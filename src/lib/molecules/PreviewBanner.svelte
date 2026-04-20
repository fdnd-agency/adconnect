<script>
	import { page } from '$app/stores'

	$: type = $page.params.type
	$: id = $page.params.id

	export let status
</script>

<div
	class="preview-banner"
	role="status"
	aria-live="polite"
>
	<div class="preview-banner__content">
		<div class="preview-banner__label">
			<span class="preview-banner__dot"></span>
			Conceptweergave
		</div>
		{#if status === 'draft'}
			<p class="preview-banner__info">
				Je bekijkt een ongepubliceerde versie van <strong>{type} #{id}</strong>. Deze pagina is niet zichtbaar op de live website.
			</p>
		{:else if status === 'published'}
			<p class="preview-banner__info">
				Je bekijkt een gepubliceerde versie van <strong>{type} #{id}</strong>. Deze pagina is zichtbaar op de live website.
			</p>
		{/if}
	</div>
	<a
		href="/admin/{type}"
		class="preview-banner__back"
	>
		← Terug naar overzicht
	</a>
</div>

<style>
	.preview-banner {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.6rem;
		padding: 0.95rem 1rem;
		margin-bottom: 1.25rem;
		background: var(--blue-100);
		border: 1px solid var(--blue-200);
		border-left: 4px solid var(--primary-orange);
		border-radius: 0.75rem;
		color: var(--blue-800);
		font-size: 0.875rem;
		line-height: 1.45;

		@media (prefers-color-scheme: dark) {
			background: var(--blue-800);
			border: var(--neutral-700);
			color: var(--text-white);
		}

		@supports (color-scheme: light-dark(red, blue)) {
			background: light-dark(var(--blue-100), var(--blue-800));
			border: 1px solid light-dark(var(--blue-200), var(--neutral-700));
			color: light-dark(var(--blue-800), var(--text-white));
		}
	}

	.preview-banner__content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.3rem;
		min-width: 0;
	}

	.preview-banner__label {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-heading);
		font-weight: var(--weight-medium);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-size: 0.75rem;
		color: var(--primary-orange);
		white-space: nowrap;
	}

	.preview-banner__dot {
		display: inline-block;
		width: 0.52rem;
		height: 0.52rem;
		border-radius: 50%;
		background-color: var(--primary-orange);
		box-shadow: 0 0 0 3px hsla(10 80% 55% / 0.27);

		@supports (color-mix(in oklch, red 30%, blue 30%)) {
			box-shadow: color-mix(in srgb, var(--primary-orange) 28%, transparent);
		}

		animation: pulse 2s infinite;
	}

	.preview-banner__info {
		margin: 0;
		font-family: var(--font-body);
		font-weight: var(--weight-regular);
		font-size: 0.88rem;
		color: var(--neutral-700);

		@media (prefers-color-scheme: dark) {
			color: var(--neutral-200);
		}

		@supports (color-scheme: light-dark(red, blue)) {
			color: light-dark(var(--neutral-700), var(--neutral-200));
		}

		max-width: 75ch;
	}

	.preview-banner__info strong {
		color: var(--blue-800);

		@media (prefers-color-scheme: dark) {
			color: var(--text-white);
		}

		@supports (color-scheme: light-dark(red, blue)) {
			color: light-dark(var(--blue-800), var(--text-white));
		}

		font-weight: var(--weight-medium);
	}

	.preview-banner__back {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		white-space: nowrap;
		color: var(--blue-800);
		font-family: var(--font-heading);
		text-decoration: none;
		font-weight: var(--weight-medium);
		font-size: 0.84rem;
		padding: 0.35rem 0.7rem;
		border: 1px solid var(--blue-300);
		border-radius: 0.55rem;
		background: transparent;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;

		@media (prefers-color-scheme: dark) {
			color: var(--text-white);
			border: var(--neutral-600);
		}

		@supports (color-scheme: light-dark(red, blue)) {
			color: light-dark(var(--blue-800), var(--text-white));
			border: light-dark(var(--blue-300), var(--neutral-600));
		}
	}

	.preview-banner__back:hover {
		background-color: var(--text-white);

		@media (prefers-color-scheme: dark) {
			background-color: var(--neutral-800);
		}

		@supports (color-scheme: light-dark()) {
			background-color: light-dark(var(--text-white), var(--neutral-800));
		}
		
		border-color: var(--primary-orange);
		transform: translateY(-1px);
	}

	@media (min-width: 700px) {
		.preview-banner {
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-between;
			gap: 1rem;
			padding: 1rem 1.2rem;
		}

		.preview-banner__content {
			gap: 0.4rem;
		}

		.preview-banner__back {
			margin-top: 0.1rem;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}
</style>
