<script>
	/** @type {{ icon?: string, label?: string, href?: string, iconHeight?: string }} */
	const { icon = '', label = '', href = '', iconHeight = '60px' } = $props()
</script>

<li class="item-card">
	<img
		class="item-img"
		src={icon}
		alt=""
		height={iconHeight}
		width="90px"
	/>
	<p>{label}</p>
	<a
		class="button-outline-white"
		{href}>+</a
	>
</li>

<style>
	.item-card {
		background-color: var(--background);
		padding: 1em;
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		text-align: center;
		list-style: none;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.item-card p {
		margin: 0;
	}

	.item-card :global(.button-outline-white) {
		width: 25%;
		height: 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.item-img {
		display: flex;
		align-self: center;
		filter: brightness(0) saturate(100%) invert(11%) sepia(21%) saturate(2878%) hue-rotate(198deg) brightness(95%) contrast(99%);
	}

	@media (prefers-color-scheme: dark) {
		.item-img {
			filter: brightness(0) saturate(100%) invert(30%) sepia(75%) saturate(600%) hue-rotate(322deg) brightness(125%);
		}
	}
</style>
