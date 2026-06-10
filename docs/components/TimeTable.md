## TimeTable.svelte Component Documentation
### Overview
A simple list component with an each loop over the li elements.  
Each li contains the start time, end time, and name of the event.  
All events have currently been added in the script element as JavaScript objects. This data still needs to be added to the database.  
Once that is implemented, a prop should be created for passing the data into the component when it is called.  

### HTML
```svelte
<ul>
    <li>Programma in het kort (concept):</li>

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
```

### Usage Examples
```svelte
<TimeTable />


```
