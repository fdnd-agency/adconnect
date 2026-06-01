<script>
	export let nominations = []
	export let cooperations = []
	export let imageUrl = (id) => id

	const normalizeInstitutionKey = (value) =>
		String(value ?? '')
			.trim()
			.toLowerCase()

	const resolveCooperation = (institution) => {
		if (!institution) return null

		if (typeof institution === 'object') {
			if (institution.logo || institution.name || institution.id) return institution
			if (institution.adconnect_cooperation_id) return institution.adconnect_cooperation_id
		}

		const key = normalizeInstitutionKey(institution)
		if (!key) return null

		return (
			cooperations?.find((cooperation) => {
				const id = normalizeInstitutionKey(cooperation?.id)
				const name = normalizeInstitutionKey(cooperation?.name)
				return key === id || (name && key === name)
			}) ?? null
		)
	}
</script>

<section class="nomination-carousel">
	<ul
		class="track"
		style={`--item-count: ${nominations?.length ?? 0}`}
	>
		{#each [...(nominations ?? []), ...(nominations ?? [])] as nomination, index (`${nomination.id}-${index}`)}
			{@const cooperation = resolveCooperation(nomination.institution)}
			{@const nominationHref = `/talent-award/nominaties/${nomination.slug ?? nomination.id}`}
			<li class="nomination">
				<a
					class="nomination-link"
					href={nominationHref}
				>
					<h3>{nomination.title}</h3>

					{#if cooperation?.logo}
						<img
							src={imageUrl(cooperation.logo?.id ?? cooperation.logo)}
							alt={cooperation?.name ?? 'Institution logo'}
							class="institution-logo"
						/>
					{/if}
				</a>

				{#if nomination.profile_picture}
					<img
						src={imageUrl(nomination.profile_picture.id ?? nomination.profile_picture)}
						alt={nomination.title}
						class="profile-photo"
					/>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	.nomination-carousel {
		overflow: visible;
		width: min(100%, 1400px);
		max-width: 1400px;
		clip-path: inset(-9999px 0 -9999px 0);
		margin: 0 auto 30px;
	}

	.track {
		display: flex;
		align-items: center;
		gap: 2rem;
		width: max-content;
		animation: scroll calc(max(var(--item-count, 1), 1) * 4s) linear infinite;
	}

	.nomination-carousel:hover .track {
		animation-play-state: paused;
	}

	.nomination {
		position: relative;
		flex: 0 0 auto;
		width: clamp(160px, 20vw, 240px);
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		justify-content: center;
		align-items: center;
	}

	.nomination-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		text-decoration: none;
		color: inherit;
		text-align: center;
		padding: 0.2rem 0.4rem;
		border-radius: 8px;
	}

	.nomination-link:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 3px;
	}

	.nomination h3 {
		text-align: center;
	}

	.institution-logo {
		height: 28px;
		max-width: 140px;
		width: auto;
		filter: grayscale(100%) brightness(0.85);
		opacity: 0.85;
	}

	.profile-photo {
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%) translateY(10px);
		width: 150px;
		opacity: 0;
		pointer-events: none;
		transition: 0.2s ease;
		z-index: 2;
	}

	.nomination:hover .profile-photo {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
		}
	}
</style>
