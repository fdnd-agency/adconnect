<script>
	const {
		filter,
		search,
		onFilterChange,
		onSearchChange,
		labels = {
			all: 'Alle items',
			draft: 'Concept',
			published: 'Gepubliceerd'
		}
	} = $props()
</script>

<section class="toolbar">
	<div class="filter-buttons">
		<button
			class="filter-btn"
			class:active={filter === 'all'}
			onclick={() => onFilterChange('all')}>{labels.all}</button
		>
		<button
			class="filter-btn"
			class:active={filter === 'draft'}
			onclick={() => onFilterChange('draft')}>{labels.draft}</button
		>
		<button
			class="filter-btn"
			class:active={filter === 'published'}
			onclick={() => onFilterChange('published')}>{labels.published}</button
		>
	</div>

	<div class="search-bar">
		<input
			type="text"
			placeholder="Zoek..."
			value={search}
			oninput={(e) => onSearchChange(e.target.value)}
		/>
	</div>
</section>

<style>
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		align-items: center;
		margin-bottom: 1em;
	}

	.filter-buttons {
		display: flex;
		gap: 0.5em;
		flex-wrap: wrap;
	}

	.filter-btn {
		font-family: var(--font-heading);
		font-size: 0.9rem;
		padding: 0.6em 1.2em;
		border-radius: var(--button-outline-radius);
		border: var(--button-outline-border);
		background: var(--text-white);
		@media (prefers-color-scheme: dark) {
			background: hsl(210, 30%, 8%);
		}
		@supports (color: light-dark(red, blue)) {
			background: light-dark(var(--text-white), hsl(210, 30%, 8%));
		}
		color: var(--button-outline-text);
		cursor: pointer;
		transition: ease-in-out 0.2s;
	}

	.filter-btn.active {
		background-color: var(--primary-blue);
		color: var(--text-white);
		border-color: var(--primary-blue);
	}

	.filter-btn:hover:not(.active) {
		background-color: var(--blue-100);
	}

	.search-bar {
		display: flex;
		align-items: center;
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		overflow: hidden;
	}

	.search-bar input {
		border: none;
		outline: none;
		padding: 0.6em 1em;
		font-family: var(--font-body);
		font-size: 0.9rem;
		background: transparent;
		color: inherit;
		width: 160px;
	}
</style>
