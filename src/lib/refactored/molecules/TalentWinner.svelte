<script>
    import { RPicture } from "$lib";
    import { DIRECTUS_URL } from '$lib/constants.js'
    
    const { data } =  $props()
    const imageUrl = (id) => `${DIRECTUS_URL}/assets/${id}`
</script>

<section class="previous-winners">
    <ul>
        {#each data.nominations.filter((item) => item.header?.toLowerCase() === 'winnaar' && item.profile_picture) as winner (winner.id)}
            <li>
                <section>
                    <h3>{winner.title}</h3>
                    <p>{winner.excerpt}</p>
                </section>
                <div>
                    <RPicture
                        src={imageUrl(winner.profile_picture)}
                        alt="{winner.title} met krullend haar, glimlachend naar de camera"
                        height="200px"
                        width="200px"
                        style="height:auto; border-radius: 15px;"
                    />
                </div>   
            </li>
        {/each}
    </ul>
</section>

<style>
	.previous-winners {
		background-color: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		padding: 2rem;
		border-radius: 15px;
		width: 90%;
		max-width: 1000px;

		li {
			display: flex;
			flex-direction: column-reverse;
			gap: 2em;
			align-items: start;

			section {
                display: grid;
                gap: 1.5rem;
                margin: 1rem 0rem 2rem 0rem
			}

			@media (min-width: 768px) {
				flex-direction: row-reverse;
				align-items: center;
			}
		}
	}

    div {
        display: none;

        @media (min-width: 768px) {
            display: block;
            width: 100%;
            max-width: 200px;
            max-height: 200px;
        }
    }
    </style>