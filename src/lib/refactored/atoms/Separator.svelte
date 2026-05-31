<script lang="ts">
	let { dividerText }: { dividerText: string } = $props()
</script>

<section>
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
		gap: 1rem;
		width: 90%;
		max-width: 1400px;
		margin: 3em auto;
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
