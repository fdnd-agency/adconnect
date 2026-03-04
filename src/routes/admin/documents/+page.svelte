<script>
	/** @type {{ data: { documents: Map<string, any> } }} */
	const { data } = $props()
	import dots from '$lib/assets/dots.svg'
	import { DIRECTUS_URL } from '$lib/constants.js'
	import { enhance } from '$app/forms'

	const directusBase = `${DIRECTUS_URL}/admin/content`

	let filter = $state('all')
	let search = $state('')

	const documents = $derived([...data.documents.values()])

	const filtered = $derived(
		documents
			.filter((doc) => {
				if (filter === 'draft') return doc.status === 'draft'
				if (filter === 'published') return doc.status === 'published'
				return true
			})
			.filter((doc) => doc.title?.toLowerCase().includes(search.toLowerCase()))
	)

	/**
	 * Formats a date string to DD-MM-YY.
	 * @param {string} dateString
	 * @returns {string}
	 */
	function formatDate(dateString) {
		const d = new Date(dateString)
		const day = String(d.getDate()).padStart(2, '0')
		const month = String(d.getMonth() + 1).padStart(2, '0')
		const year = String(d.getFullYear()).slice(-2)
		return `${day}-${month}-${year}`
	}

	/** Tracks which document popup is currently open (null = all closed). */
	let openPopup = $state(null)

	/** Toggles the popup for a given document id. */
	function togglePopup(id) {
		openPopup = openPopup === id ? null : id
	}

	/**
	 * Confirms a destructive action before the form submits.
	 * @param {string} message
	 * @returns {(e: SubmitEvent) => void}
	 */
	function confirmAction(message) {
		return (e) => {
			if (!confirm(message)) e.preventDefault()
		}
	}

	/** Closes any open popup when clicking outside of it. */
	function handleClickOutside(e) {
		if (openPopup !== null && !e.target.closest('.popup-anchor')) {
			openPopup = null
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<svelte:head>
	<title>Documenten | ADConnect Admin</title>
</svelte:head>

<section class="page-header">
	<img
		src={dots}
		alt=""
		class="header-dots"
		width="80"
		height="60"
	/>

	<div class="title-row">
		<h1>Documenten</h1>
		<a
			href="{directusBase}/adconnect_documents/+"
			target="_blank"
			class="add-btn"
			aria-label="Document toevoegen">+</a
		>
	</div>

	<nav
		class="breadcrumb"
		aria-label="Breadcrumb"
	>
		<span>Dashboard</span>
		<span class="separator">›</span>
		<span>Documenten</span>
	</nav>
</section>

<section class="toolbar">
	<div class="filter-buttons">
		<button
			class="filter-btn"
			class:active={filter === 'all'}
			onclick={() => (filter = 'all')}>Alle documenten</button
		>
		<button
			class="filter-btn"
			class:active={filter === 'draft'}
			onclick={() => (filter = 'draft')}>Concept</button
		>
		<button
			class="filter-btn"
			class:active={filter === 'published'}
			onclick={() => (filter = 'published')}>Gepubliceerd</button
		>
	</div>

	<div class="search-bar">
		<input
			type="text"
			placeholder="Zoek..."
			bind:value={search}
		/>
	</div>
</section>

<p class="count">Aantal: {filtered.length}</p>

<ul class="document-list">
	{#each filtered as doc (doc.id)}
		<li
			class="document-card"
			class:draft={doc.status === 'draft'}
			class:published={doc.status === 'published'}
		>
			<div class="card-header">
				<span
					class="status-badge"
					class:badge-draft={doc.status === 'draft'}
					class:badge-published={doc.status === 'published'}
				>
					{doc.status === 'draft' ? 'Concept' : 'Gepubliceerd'}
				</span>
				{#if doc.date_created}
					<span class="card-date">{formatDate(doc.date_created)}</span>
				{/if}
			</div>

			<div class="card-body">
				<p class="card-title">{doc.title ?? 'Zonder titel'}</p>

				<div class="popup-anchor">
					<button
						class="meer-btn"
						onclick={(e) => {
							e.stopPropagation()
							togglePopup(doc.id)
						}}>Meer</button
					>

					{#if openPopup === doc.id}
						<div class="action-popup">
							<a
								href="{directusBase}/adconnect_documents/{doc.id}"
								class="popup-btn btn-edit"
								target="_blank"
								rel="noopener noreferrer">Bewerken</a
							>

							<form
								method="POST"
								action="?/publish"
								use:enhance={() => {
									return async ({ update }) => {
										await update()
										openPopup = null
									}
								}}
								onsubmit={confirmAction('Weet je zeker dat je dit document wil publiceren?')}
							>
								<input
									type="hidden"
									name="id"
									value={doc.id}
								/>
								<button
									type="submit"
									class="popup-btn btn-publish">Publiceren</button
								>
							</form>

							<form
								method="POST"
								action="?/depublish"
								use:enhance={() => {
									return async ({ update }) => {
										await update()
										openPopup = null
									}
								}}
								onsubmit={confirmAction('Weet je zeker dat je dit document wil depubliceren?')}
							>
								<input
									type="hidden"
									name="id"
									value={doc.id}
								/>
								<button
									type="submit"
									class="popup-btn btn-depublish">Depubliceren</button
								>
							</form>

							<form
								method="POST"
								action="?/delete"
								use:enhance={() => {
									return async ({ update }) => {
										await update()
										openPopup = null
									}
								}}
								onsubmit={confirmAction('Weet je zeker dat je dit document wil verwijderen?')}
							>
								<input
									type="hidden"
									name="id"
									value={doc.id}
								/>
								<button
									type="submit"
									class="popup-btn btn-delete">Verwijderen</button
								>
							</form>
						</div>
					{/if}
				</div>
			</div>
		</li>
	{:else}
		<li class="empty-state">Geen documenten gevonden.</li>
	{/each}
</ul>

<style>
	/* ---- Header ---- */
	.page-header {
		margin-bottom: 1.5em;
	}

	.header-dots {
		margin-bottom: 0.5em;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 0.75em;
	}

	.title-row h1 {
		margin: 0;
	}

	.add-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: var(--primary-blue);
		color: var(--text-white);
		font-size: 1.4rem;
		font-weight: 600;
		line-height: 1;
		text-decoration: none;
		border: none;
	}

	.breadcrumb {
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: var(--neutral-600);
		margin-top: 0.25em;
	}

	.separator {
		margin: 0 0.3em;
	}

	/* ---- Toolbar ---- */
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
		background: light-dark(var(--text-white), hsl(210, 30%, 8%));
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
		margin-left: 5em;
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

	/* ---- Count ---- */
	.count {
		font-family: var(--font-body);
		font-weight: var(--weight-medium);
		margin-bottom: 1em;
	}

	/* ---- Document list ---- */
	.document-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.25em;
		max-width: 700px;
	}

	.document-card {
		border-radius: var(--button-outline-radius);
		border: 2px solid var(--neutral-300);
		overflow: visible;
		position: relative;
		padding: 0;
		margin-left: 0.5em;
		margin-right: 0.5em;
	}

	.document-card.draft {
		border-color: hsl(10, 70%, 55%);
	}

	.document-card.published {
		border-color: hsl(140, 50%, 45%);
	}

	/* ---- Card header (status + date) ---- */
	.card-header {
		display: flex;
		align-items: center;
		gap: 0.75em;
		position: relative;
		top: -0.85em;
		left: 1em;
		width: fit-content;
	}

	.status-badge {
		font-family: var(--font-heading);
		font-size: 0.8rem;
		font-weight: var(--weight-medium);
		padding: 0.3em 0.9em;
		border-radius: 8px;
		color: var(--text-white);
	}

	.badge-draft {
		background-color: hsl(10, 70%, 55%);
	}

	.badge-published {
		background-color: hsl(140, 50%, 45%);
	}

	.card-date {
		font-family: var(--font-body);
		font-size: 0.85rem;
		font-weight: var(--weight-medium);
		color: light-dark(var(--neutral-600), var(--neutral-300));
	}

	/* ---- Card body ---- */
	.card-body {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.25em 1em;
		margin-top: -0.5em;
	}

	.card-title {
		margin: 0;
		font-weight: var(--weight-regular);
		font-size: 1rem;
	}

	.popup-anchor {
		position: relative;
	}

	.meer-btn {
		display: inline-block;
		font-family: var(--font-heading);
		font-size: 0.85rem;
		padding: 0.5em 1.5em;
		border-radius: 8px;
		background-color: var(--primary-blue);
		color: var(--text-white);
		border: none;
		cursor: pointer;
		white-space: nowrap;
	}

	.meer-btn:hover {
		opacity: 0.85;
	}

	/* ---- Action popup ---- */
	.action-popup {
		position: absolute;
		top: -6em;
		left: calc(100% + 20px);
		margin: 0;
		padding: 0.5em;
		border: var(--button-outline-border);
		border-radius: var(--button-outline-radius);
		background: light-dark(var(--text-white), hsl(210, 30%, 12%));
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
		min-width: 150px;
		z-index: 100;
		display: flex;
		flex-direction: column;
		gap: 0.35em;
	}

	.action-popup form {
		margin: 0;
	}

	.popup-btn {
		display: block;
		width: 100%;
		text-align: left;
		padding: 0.6em 1em;
		border-radius: 8px;
		border: none;
		cursor: pointer;
		font-family: var(--font-heading);
		font-size: 0.9rem;
		text-decoration: none;
		transition: opacity 0.15s;
	}

	.popup-btn:hover {
		opacity: 0.8;
		transform: none;
	}

	.btn-edit {
		background-color: var(--primary-blue);
		color: var(--text-white);
	}

	.btn-publish {
		background-color: hsl(140, 50%, 45%);
		color: var(--text-white);
	}

	.btn-depublish {
		background-color: hsl(38, 75%, 50%);
		color: var(--text-white);
	}

	.btn-delete {
		background-color: hsl(10, 70%, 55%);
		color: var(--text-white);
	}

	/* ---- Empty ---- */
	.empty-state {
		font-family: var(--font-body);
		padding: 2em;
		text-align: center;
		color: var(--neutral-600);
	}
</style>
