<script lang="ts">
	const { dividerText, noMargin, center } = $props()
</script>

<section class:noMargin class:center>
	<hr />
	{#if dividerText}
		<p>{dividerText}</p>
		<span></span>
	{/if}
</section>

<style>
	section {
		display: flex;
		align-items: center;
		justify-content: center;
		justify-self: center;
		gap: 1rem;
		width: 90%;
		max-width: 1400px;
		margin: 3em 0;
	}

	.noMargin {
		margin: 0;
	}

	.center {
		margin-left: 50%;
		transform: translateX(-50%);
	}

	hr,
	span {
		flex: 1;
		border: none;
		height: 1px;
		border-top: 1px solid var(--neutral-300);
	}

	p {
		white-space: nowrap;
	}
</style>
