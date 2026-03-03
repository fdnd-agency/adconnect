<script>
  // Export prop
  export let news
  // Import images
  import { fallback, calendar, label } from '$lib'
</script>

<article>
  <h2 class="truncate two">{news.title}</h2>

  <div class="card-info">
    <span>
      <img src={label} alt="" />
      <p>{news.category.title}</p>
    </span>

    <span>
      <img src={calendar} alt="" />
      <p>{news.date.slice(0, 4)}</p>
    </span>
  </div>

  <p class="truncate two">{news.description}</p>

  <a class="button-outline-blue" href="/nieuws/{news.slug}"> Meer informatie </a>
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
  }
  article:hover {
    border: 1px solid #00408d;
    box-shadow: 0 3px 10px rgba(141, 141, 141, 0.2);
    translate: 0 -1%;
  }
  .card-info {
    gap: 1em;
    display: flex;
    flex-direction: row;
  }
  .card-info span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
  }
  h2,
  p {
    margin: 0;
    width: 100%;
  }
  h2 {
    font-size: 25px;
    height: 2.5em;
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .truncate.single {
    white-space: nowrap;
    -webkit-line-clamp: 1;
  }
  .truncate.two {
    -webkit-line-clamp: 2;
  }
</style>
