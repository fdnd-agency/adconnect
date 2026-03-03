<script>
	// Retrieve themes data
	export let themes

	// Import image
	import { dots } from '$lib'
</script>

{#each themes as theme (theme.id)}
	<article>
		<div class="wrapper-text">
			<img
				src={dots}
				alt=""
				width="50"
				height="50"
			/>
			<h3 class="truncate single">{theme.title}</h3>
		</div>
		<p class="truncate two">{theme.description}</p>
		<a
			class="button-outline-blue"
			href={`/over-ad/${theme.slug}`}
			aria-label="Meer informatie over {theme.title}">Meer informatie</a
		>
	</article>
{/each}

<style>
	article {
		border: 1px solid #cccccc;
		border-radius: 1em;
		padding: 2em;
		transition: 0.2s ease-in-out;
		display: flex;
		flex-direction: column;
		gap: 1em;
		background-color: light-dark(var(--text-white), var(--blue-800));
		flex: 1;

		&:hover {
			border: 1px solid #00408d;
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
			transition: 0.2s ease-in-out;
		}
	}

	:global(.themes) {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
	}

	@media (min-width: 768px) {
		:global(.themes) {
			flex-direction: row;
		}

		:global(.themes) > * {
			flex: 1; /* alle artikelen nemen evenveel ruimte */
			min-width: 0; /* voorkomt dat content uitrekt */
		}
	}

	h3 {
		font-size: 23px;
	}

	.wrapper-text {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	/* Truncate words */
	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	/* Truncate one sentence */
	.truncate.single {
		white-space: nowrap;
		-webkit-line-clamp: 1;
	}

	/* Truncate two sentences */
	.truncate.two {
		-webkit-line-clamp: 3;
	}
</style>
