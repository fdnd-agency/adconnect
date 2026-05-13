<script>
	export let lado = {}

	const contactPersons = Array.isArray(lado.contact_persons) ? lado.contact_persons : []
	const courses = Array.isArray(lado.courses) ? lado.courses : []
	const sectoralAdvisoryBoard = typeof lado.sectoral_advisory_board === 'object' ? lado.sectoral_advisory_board : null
</script>

<article>
	<details>
		<summary>
			<span>{lado.title}</span>
			<span
				class="toggle"
				aria-hidden="true"
			></span>
		</summary>

		<div class="content">
			{#if lado.national_ad_profile}
				<p><strong>Landelijk Ad-profiel</strong>{lado.national_ad_profile}</p>
			{/if}

			{#if lado.lado_status}
				<p><strong>Status</strong>{lado.lado_status}</p>
			{/if}

			{#if sectoralAdvisoryBoard?.title}
				<p><strong>Sectoraal adviescollege</strong>{sectoralAdvisoryBoard.title}</p>
			{/if}

			{#if contactPersons.length}
				<section aria-label="Contactpersonen">
					<strong>Contactpersonen</strong>
					<ul class="chip-list">
						{#each contactPersons as contactPerson (contactPerson)}
							<li>{contactPerson}</li>
						{/each}
					</ul>
				</section>
			{/if}

			{#if courses.length}
				<section aria-label="Gekoppelde opleidingen">
					<strong>Opleidingen</strong>
					<ul class="course-list">
						{#each courses as course (course.id)}
							<li class="course-card">
								<span class="course-title">{course.title ?? `Opleiding ${course.id}`}</span>
								{#if course.cooperations?.length}
									<span class="cooperation-row">
										<span>Hogescholen</span>
										<span class="cooperation-list">
											{#each course.cooperations as cooperation (cooperation.id)}
												{#if cooperation.url}
													<a
														class="cooperation-item"
														href={cooperation.url}>{cooperation.name}</a
													>
												{:else}
													<span class="cooperation-item">{cooperation.name}</span>
												{/if}
											{/each}
										</span>
									</span>
								{/if}
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		</div>
	</details>
</article>

<style>
	article {
		--_background: light-dark(var(--text-white), var(--primary-blue));
		--_border: light-dark(var(--neutral-300), var(--blue-300));
		--_text: light-dark(var(--blue-900), var(--text-white));
		--_chip-background: light-dark(var(--blue-100), var(--blue-800));
		--_content-border: light-dark(var(--blue-150), var(--blue-300));

		align-self: start;
		background: var(--_background);
		border: 1px solid var(--_border);
		border-radius: 0.45em;
		color: var(--_text);
	}

	details {
		padding: 1em 1.25em;
	}

	summary {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 1em;
		min-height: 2.25rem;
		cursor: pointer;
		list-style: none;
		font-family: var(--font-heading);
		font-weight: var(--heading-font-weight);
		color: var(--_text);
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.toggle {
		position: relative;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 0.4em;
		background: var(--primary-orange);
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

	.content {
		display: grid;
		gap: 1em;
		padding-top: 1em;
		border-top: 1px solid var(--_content-border);
		margin-top: 1em;
	}

	p {
		color: var(--_text);
	}

	p,
	section {
		display: grid;
		gap: 0.35em;
	}

	strong {
		font-family: var(--font-heading);
		font-weight: var(--heading-font-weight);
	}

	ul {
		padding: 0;
		list-style: none;
	}

	.chip-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	.chip-list li {
		background: var(--_chip-background);
		border-radius: 999px;
		padding: 0.35em 0.75em;
		font-family: var(--font-body);
		font-size: 0.95rem;
	}

	.course-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
		gap: 0.65em;
	}

	.course-card {
		display: grid;
		gap: 0.35em;
		align-content: start;
		background: var(--_chip-background);
		border-radius: 0.45em;
		padding: 0.65em 0.8em;
		font-family: var(--font-body);
		font-size: 0.95rem;
		line-height: 1.35;
	}

	.course-title {
		font-weight: var(--weight-medium);
	}

	.cooperation-row {
		display: grid;
		gap: 0.1em;
		font-size: 0.85rem;
		font-weight: var(--text-font-weight);
		opacity: 0.85;
	}

	.cooperation-row > span:first-child {
		font-size: 0.75rem;
		font-weight: var(--weight-medium);
		text-transform: uppercase;
	}

	.cooperation-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35em 0.5em;
		overflow-wrap: anywhere;
	}

	.cooperation-item {
		line-height: 1.25;
	}

	a {
		color: inherit;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.15em;
	}
</style>
