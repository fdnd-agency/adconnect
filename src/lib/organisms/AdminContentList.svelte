<script>
	import { enhance } from '$app/forms'
	import { loading } from '$lib/stores/loadingStore'

	const { filtered, directusBase, contentType, labels = { single: 'item', multiple: 'items' } } = $props()

	let openPopup = $state(null)

	function togglePopup(id) {
		openPopup = openPopup === id ? null : id
	}

	function formatDate(dateString) {
		const d = new Date(dateString)
		const day = String(d.getDate()).padStart(2, '0')
		const month = String(d.getMonth() + 1).padStart(2, '0')
		const year = String(d.getFullYear()).slice(-2)
		return `${day}-${month}-${year}`
	}

	function confirmAction(message) {
		return (e) => {
			if (!confirm(message)) e.preventDefault()
		}
	}

	function handleClickOutside(e) {
		if (openPopup !== null && !e.target.closest('.popup-anchor')) {
			openPopup = null
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

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
								href="{directusBase}/{contentType}/{doc.id}"
								class="popup-btn btn-edit"
								target="_blank"
								rel="noopener noreferrer">Bewerken</a
							>

							<form
								method="POST"
								action="?/publish"
								use:enhance={() => {
									loading.set(true)
									return async ({ update }) => {
										await update()
										loading.set(false)
										openPopup = null
									}
								}}
								onsubmit={confirmAction(`Weet je zeker dat je dit ${labels.single} wil publiceren?`)}
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
									loading.set(true)
									return async ({ update }) => {
										await update()
										loading.set(false)
										openPopup = null
									}
								}}
								onsubmit={confirmAction(`Weet je zeker dat je dit ${labels.single} wil depubliceren?`)}
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
									loading.set(true)
									return async ({ update }) => {
										await update()
										loading.set(false)
										openPopup = null
									}
								}}
								onsubmit={confirmAction(`Weet je zeker dat je dit ${labels.single} wil verwijderen?`)}
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
		<li class="empty-state">Geen {labels.multiple} gevonden.</li>
	{/each}
</ul>

<style>
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
