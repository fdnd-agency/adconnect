<script>
	import DividerText from './DividerText.svelte'

	import { locationImage } from '$lib'

	export let heading = ''
	export let body = ''
</script>

<DividerText text={heading} />

<p>{body}</p>

<img
	class="location-img"
	src={locationImage}
	alt=""
	width="600"
	height="300"
/>

<style>
	p {
		max-width: 800px;
		font-size: 18px;
		padding: 2em;
		margin: 2em auto;
	}

	img {
		display: block;
		margin: auto;
		width: 90%;
		height: auto;
		border-radius: 33px 33px 0 0;
	}

	@media (min-width: 768px) {
		img {
			width: 60%;
		}
	}
</style>
