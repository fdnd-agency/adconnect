<script>
	import { RPicture, birdcheck } from '$lib'
	export let status
</script>

{#if status === 'success'}
	<section class="success visible">
		<div class="info">
			<h3>Bedankt, je formulier is verzonden!</h3>
			<p>Jouw formulier is succesvol naar ons verzonden. We nemen zo snel mogelijk contact op per mail.</p>
		</div>
		<div class="img-container">
			<RPicture
				isEnhanced
				src={birdcheck}
				alt=""
				width="300px"
				height="300px"
				fetchpriority="high"
				loading="eager"
				style="height:auto;"
			/>
		</div>
	</section>
{/if}

<style>
	.success {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
        gap: 1em;

		.info {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1em;

			@media (min-width: 768px) {
				width: 50%;
			}
		}

        .img-container {
            max-height: 300px;
            max-width: 300px;
        }

		@media (min-width: 768px) {
			flex-direction: row;
		}
	}
</style>
