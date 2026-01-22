<script>
  // Export prop
  export let article;

  // Import afbeeldingen
  import fallback from "$lib/assets/news-fallback.jpg";
  import calendar from "$lib/assets/icon-calendar.svg";

</script>

<article>
  <img src={`https://fdnd-agency.directus.app/assets/${article.hero}`} alt={article.title} width="300" height="210" />

  <div>
    <h2 class="truncate single">{article.title}</h2>
    <p class="truncate two">{article.description}</p>
    <a class="button-outline-blue" href="/nieuws/{article.uuid}" aria-label="Meer informatie over {article.title}">Meer informatie</a>
  </div>
</article>

<style>
  article {
    border: 1px solid #cccccc;
    border-radius: 1em;
    padding: 0.7em;
    transition: 0.2s ease-in-out;

    &:hover {
      border: 1px solid #00408d;
      box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
      translate: 0 -1%;
      transition: 0.2s ease-in-out;
    }
  }

  article > img:first-of-type {
    width: 100%;
    border-radius: 0.5em;
    object-fit: cover;
  }

  div {
    padding: 1em;
    gap: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  h2,
  p {
    margin: 0;
    width: 100%;
  }

  h2 {
    font-size: 22px;
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
