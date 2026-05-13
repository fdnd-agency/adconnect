<script>
	export let title = ''
	export let description = ''
	export let open = false
</script>

<article class:open>
	<details {open}>
		<summary>
			<span>{title}</span>
			<span
				class="toggle"
				aria-hidden="true"
			></span>
		</summary>

		<p>{description}</p>
	</details>
</article>

<style>
	article {
		--_background: light-dark(var(--text-white), var(--primary-blue));
		--_border: light-dark(var(--neutral-300), var(--blue-300));
		--_title: light-dark(var(--blue-900), var(--text-white));
		--_text: light-dark(var(--blue-900), var(--text-white));
		--_accent: var(--primary-orange);

		align-self: start;
		background: var(--_background);
		border: 1px solid var(--_border);
		border-radius: 0.5em;
		color: var(--_text);
	}

	article:has(details[open]) {
		--_border: light-dark(var(--blue-300), var(--blue-150));
	}

	details {
		display: flex;
		flex-direction: column;
		padding: 1.5em;
	}

	summary {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 1em;
		cursor: pointer;
		list-style: none;
		font-family: var(--font-heading);
		font-size: 1.05rem;
		font-weight: var(--heading-font-weight);
		line-height: 1.35;
		color: var(--_title);
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.toggle {
		position: relative;
		width: 2.4rem;
		height: 2.4rem;
		flex: 0 0 auto;
		border-radius: 0.4em;
		background: var(--_accent);
	}

	.toggle::before,
	.toggle::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 45%;
		height: 2px;
		background: var(--text-white);
		transform: translate(-50%, -50%);
	}

	.toggle::after {
		transform: translate(-50%, -50%) rotate(90deg);
	}

	details[open] .toggle::after {
		transform: translate(-50%, -50%) rotate(0deg);
	}

	p {
		margin-top: 2em;
		color: var(--_text);
	}
</style>
