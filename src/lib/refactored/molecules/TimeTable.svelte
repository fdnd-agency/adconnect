<script>
	const { scheduleData } = $props()
</script>

<ul class="schedule__list">
	<li>Programma in het kort (concept):</li>

	{#each scheduleData.schedule as item}
		<li class="schedule__item">
			<time datetime={item.startTime}>{item.startTime}</time>
			<span class="visually-hidden">tot</span>
			–
			<time datetime={item.endTime}>{item.endTime}</time>
			<span>| {item.event}</span>
		</li>
	{/each}
</ul>

<style>
	.schedule__list {
		display: flex;
		flex-direction: column;
		text-align: start;
		list-style: none;
		gap: 1em;

		font-family: var(--font-body);
		font-weight: var(--text-font-weight);
		font-size: var(--p-s-size);
		line-height: 1.8;

		.schedule__item {
			width: 100%;
			border-bottom: 1px solid var(--orange-500);
		}
	}
</style>
