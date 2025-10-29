<script>
  import InformationCard from "$lib/components/information-cards/informationCard.svelte";

  export let heading = "";
  export let intro = "";
  /** @type {{ title:string, description:string, buttonText:string, buttonLink:string, iconSrc?:string }[]} */
  export let items = [];
</script>

<section class="info-cards">
  {#if heading}<h2 class="info-cards-heading">{heading}</h2>{/if}
  {#if intro}<p class="info-cards-intro">{intro}</p>{/if}

  <div class="info-cards-grid">
    {#each items as item (item.title)}
      <InformationCard
        title={item.title}
        description={item.description}
        buttonText={item.buttonText}
        buttonLink={item.buttonLink}
        iconSrc={item.iconSrc}
      />
    {/each}
  </div>
</section>

<style>
  .info-cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1.5rem;
    gap: 2rem;
    background: var(--primary-blue);
  }

  .info-cards-heading {
    text-align: center;
    color: var(--text-white);
  }

  .info-cards-intro {
    text-align: center;
    color: var(--text-white);
  }

  .info-cards-grid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .info-cards-grid {
      flex-direction: row;
    }
  }
</style>
