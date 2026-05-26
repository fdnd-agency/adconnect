<script>
	// TODO: schedule data that needs to be added to directus
	const scheduleData = {
		schedule: [
			{
				startTime: '09:30',
				endTime: '10:00',
				event: 'Inloop met koffie/thee'
			},
			{
				startTime: '10:00',
				endTime: '13:00',
				event: 'Opening, keynote, gesprekken en Ad Talent Award'
			},
			{
				startTime: '13:00',
				endTime: '13:45',
				event: 'Lunch'
			},
			{
				startTime: '13:45',
				endTime: '15:30',
				event: 'Workshops en excursies'
			},
			{
				startTime: '15:30',
				endTime: '17:00',
				event: 'Borrel & ontmoeting'
			}
		]
	}
</script>

<ul>
	Programma in het kort (concept):
	{#each scheduleData.schedule as item}
		<li>
			<time datetime={item.startTime}>{item.startTime}</time>
			<span class="visually-hidden">tot</span>
			–
			<time datetime={item.endTime}>{item.endTime}</time>
			<span>| {item.event}</span>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		text-align: start;
		list-style: none;
        gap: 1em;

		font-family: var(--font-body);
		font-weight: var(--text-font-weight);
		font-size: var(--p-s-size);
		line-height: 1.8;

        li {
            width: 100%;
            border-bottom: 1px solid var(--orange-500);
        }
	}
</style>
