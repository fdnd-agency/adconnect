<script>
	// Componenten
	import { Separator, Link, Picture } from '$lib'

	import { DIRECTUS_URL } from '$lib/constants.js'

	let { news } = $props()
</script>

{#snippet newsCard(article)}
	<article class="news-card">
		<div class="news-card__content">
			<h2 class="news-card__title truncate single">{article.title}</h2>
			<p class="news-card__description truncate two">{article.description}</p>
			<Link
				class="button-outline-blue news-card__link"
				href="/nieuws/{article.uuid}"
				screenReaderText="over {article.title}"
				style="margin: 0 1em 1em 1em;"
			>
				Meer informatie
			</Link>

			<div class="news-card__media">
				<Picture
					src={`${DIRECTUS_URL}/assets/${article.hero}`}
					alt={article.title}
					width="300"
					height="210"
					style="height:auto;"
				/>
			</div>
		</div>
	</article>
{/snippet}

<div class="news">
	<Separator dividerText="Het laatste nieuws" center />

	<ul class="news__list">
		{#each news as article (article.uuid)}
			<li class="news__item">{@render newsCard(article)}</li>
		{/each}
	</ul>
</div>

<style>
	.news {
		container: news / inline-size;
		max-width: 1400px;
		margin: auto;
		padding: 2em 5%;
	}

	.news__list {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 0;
		list-style: none;

		@container news (min-width: 520px) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
		}
	}

	.news-card {
		--_border-color: #cccccc;

		padding: 0.7em;
		border: 1px solid var(--_border-color);
		border-radius: 1em;
		transition: 0.2s ease-in-out;

		&:hover {
			--_border-color: #00408d;
			box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
			translate: 0 -1%;
		}
	}

	.news-card__media {
		grid-row: 1;
		height: 210px;
		border-radius: 0.5em;
		overflow: hidden;
	}

	.news-card__content {
		display: grid;
		gap: 1em;
	}

	.news-card__title,
	.news-card__description {
		width: 100%;
		margin: 0;
		padding: 0 1em;

	}

	.news-card__title {
		font-size: 1.375rem;
	}

	.truncate {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}

	.truncate.single {
		-webkit-line-clamp: 1;
		white-space: nowrap;
	}

	.truncate.two {
		-webkit-line-clamp: 2;
	}
</style>
