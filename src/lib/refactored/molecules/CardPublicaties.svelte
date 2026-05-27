<script>
	import { RLink } from '$lib'
	import { IconDots, IconCalendar, IconLabel } from '$lib/icons'
	const { title, description, link, children, document } = $props()

	// Export prop
	// export let document

	// Import images
	import { fallback, calendar, label } from '$lib'

	// Limit description text for screenreaders
	function truncateWords(text, limit = 20) {
		// split text into words, return the first 20 words
		return text.split(/\s+/).slice(0, limit).join(' ') + '…'
	}
</script>

<article>
	<h3 class="truncate two">{document.title}</h3>

	<div class="card-info">
		<span
			><IconLabel />
			<p>{document.category?.title ?? 'Geen categorie'}</p></span
		>
		<span
			><IconCalendar />
			<p>{document.date?.slice(0, 4) ?? 'Geen datum'}</p></span
		>
	</div>

	<p class="truncate two">{truncateWords(document.description, 20)}</p>

	<div class="link">
		<RLink
			href="/publicaties/{document.slug}"
			class="button-outline-blue clickable-container"
		>
			Meer informatie
			<span
				class="visually-hidden"
				aria-hidden="true">over {document.title}</span
			>
		</RLink>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: 1.5em;
		border: 1px solid #cccccc;
		border-radius: 1em;
		padding: 2em;
		transition: 0.2s ease-in-out;

		&:hover {
			border: 1px solid #00408d;
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
			transition: 0.2s ease-in-out;
		}
	}

	.card-info {
		gap: 1em;
		display: flex;
		flex-direction: row;

		span {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0.5em;
		}
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
		-webkit-line-clamp: 2;
	}
</style>
