This component was made for ad-dag page for the planning  
because the data is stored as plain text in directus we cant use it now.  
When that gets fixed this component can be used here:

<details>
<summary>image</summary>

  <img width="452" height="430" alt="image" src="https://github.com/user-attachments/assets/a25f38d5-cf68-4ed9-a759-89c641679519" />
</details>

# TimeTable.svelte Component Documentation

## Overview

The TimeTable component (TimeTable.svelte) renders a schedule as a list of time ranges paired with event names. Each entry uses semantic `<time>` elements for its start and end times, making it suitable for displaying a programme or agenda.

---

## Component Structure

### Script

```svelte
<script>
	const { scheduleData } = $props()
</script>
```

Props:
- `scheduleData` - Object holding the schedule
  - `schedule` - Array of `{ startTime, endTime, event }` objects, each rendered as one row

> The schedule entries are bundled into a single `scheduleData` object instead of being passed as a loose array.

---

### HTML

```svelte
<ul class="schedule__list">
	<li>Programma in het kort (concept):</li>

	<!-- one row per schedule entry -->
	{#each scheduleData.schedule as item}
		<li class="schedule__item">
			<!-- semantic start/end times -->
			<time datetime={item.startTime}>{item.startTime}</time>
			<span class="visually-hidden">tot</span>
			–
			<time datetime={item.endTime}>{item.endTime}</time>
			<span>| {item.event}</span>
		</li>
	{/each}
</ul>
```

> The visually hidden "tot" gives screen readers a spoken "to" in place of the dash between times.

### Usage Examples

The parent passes the schedule bundled in `scheduleData`:

```svelte
scheduleData = { schedule: [ { startTime, endTime, event }, ... ] }
```

Example: a programme timetable, typically inside a planning card

```svelte
<TimeTable scheduleData={card.schedule} />
```

### CSS

This component is standard layout with no dynamic or conditional styling; the only notable rule is the divider line under each row.

```svelte
<style>
	.schedule__item {
		border-bottom: 1px solid var(--orange-500);  /* divider line under each entry */
	}
</style>
```
