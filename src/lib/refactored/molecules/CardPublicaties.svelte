<script>
	import { Link } from '$lib'
	import { IconCalendar, IconLabel } from '$lib/icons'
	const { document } = $props()

	// Limit description text for screenreaders
	function truncateWords(text, limit = 20) {
		// split text into words, return the first 20 words
		return text.split(/\s+/).slice(0, limit).join(' ') + '…'
	}
</script>

<article class="publication-card">
	<h3 class="truncate truncate--two">{document.title}</h3>

	<div class="publication-card__info">
		<span class="publication-card__meta">
			<IconLabel />
			<p>{document.category?.title ?? 'Geen categorie'}</p>
		</span>

		<span class="publication-card__meta">
			<IconCalendar />
			<p>{document.date?.slice(0, 4) ?? 'Geen datum'}</p>
		</span>
	</div>

	<p class="truncate truncate--two">{truncateWords(document.description, 20)}</p>

	<div class="publication-card__link">
		<Link
			href="/publicaties/{document.slug}"
			class="button-outline-blue clickable-container"
		>
			Meer informatie
			<span
				class="visually-hidden"
				aria-hidden="true"
			>
				over {document.title}
			</span>
		</Link>
	</div>
</article>

<style>
	.publication-card {
		display: flex;
		flex-direction: column;
		gap: 1.5em;
		border: 1px solid #cccccc;
		border-radius: 1em;
		padding: 2em;
		transition: 0.2s ease-in-out;
		position: relative;

		&:hover {
			border: 1px solid #00408d;
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
			transition: 0.2s ease-in-out;
		}

		.publication-card__info {
			display: flex;
			flex-direction: row;
			gap: 1em;
		}

		.publication-card__meta {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0.5em;
		}

		.publication-card__link {
			margin: 1em 0;
			text-wrap: nowrap;
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
	.truncate--single {
		white-space: nowrap;
		-webkit-line-clamp: 1;
	}

	/* Truncate two sentences */
	.truncate--two {
		-webkit-line-clamp: 2;
	}
</style>
