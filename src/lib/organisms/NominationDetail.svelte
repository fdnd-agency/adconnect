<script>
	import { DIRECTUS_URL } from '$lib/constants.js'
	import { formatDateNL } from '$lib/molecules/date'

	export let data

	const nomination = data?.nomination ?? {}
	const nominationTitle = nomination?.title ? String(nomination.title) : 'Nominatie'
	const heroTag = nomination?.header ? String(nomination.header) : 'Ad Talent Award'
	const profilePictureId = nomination?.profile_picture?.id ?? nomination?.profile_picture ?? null
	const profilePictureUrl = profilePictureId ? `${DIRECTUS_URL}/assets/${profilePictureId}?format=webp` : ''
	const nominationDate = nomination?.date ? formatDateNL(nomination.date) : ''

	const metaItems = [
		{ label: 'Hogeschool', value: nomination.institution },
		{ label: 'Opleiding', value: nomination.course },
		{ label: 'Vorige opleiding', value: nomination.previous_course },
		{ label: 'Onderwijsvariant', value: nomination.education_variant },
		{ label: 'Alumnus', value: nomination.alumnus },
		{ label: 'Datum', value: nominationDate }
	].filter((item) => item.value)
</script>

<svelte:head>
	<title>{nominationTitle} | Ad Talent Award</title>
</svelte:head>

<section class="nomination-hero">
	<div class="hero-inner">
		<div class="hero-content">
			<p class="hero-tag">{heroTag}</p>
			<h1>{nominationTitle}</h1>

			{#if metaItems.length > 0}
				<dl class="hero-meta">
					{#each metaItems as item (item.label)}
						<div>
							<dt>{item.label}</dt>
							<dd>{item.value}</dd>
						</div>
					{/each}
				</dl>
			{/if}

			<div class="hero-actions">
				<a
					class="button-outline-white"
					href="/talent-award"
				>
					Terug naar Talent Award
				</a>
			</div>
		</div>

		{#if profilePictureUrl}
			<figure class="hero-image">
				<img
					src={profilePictureUrl}
					alt={`Portret van ${nominationTitle}`}
					loading="eager"
					fetchpriority="high"
				/>
			</figure>
		{/if}
	</div>
</section>

<section class="nomination-intro">
	<div class="intro-inner">
		<h2>Introductie</h2>

		<div class="intro-card">
			{#if profilePictureUrl}
				<figure class="intro-media">
					<img
						src={profilePictureUrl}
						alt=""
						loading="lazy"
					/>
				</figure>
			{/if}

			<div class="intro-copy">
				{#if nomination.body}
					<div class="intro-body">{@html nomination.body}</div>
				{:else}
					<p>Er is nog geen introductietekst beschikbaar.</p>
				{/if}
			</div>
		</div>
	</div>
</section>

{#if nomination.excerpt}
	<section class="nomination-callout">
		<div class="callout-inner">
			<div class="callout-heading">
				<h2>Nominatie hogeschool</h2>
			</div>

			<div class="callout-card">
				<h3>Aanbeveling externe stakeholder</h3>
				<p class="callout-text">{nomination.excerpt}</p>
				{#if nomination.alumnus}
					<p class="callout-signature">{nomination.alumnus}</p>
				{/if}
			</div>
		</div>
	</section>
{/if}

<style>
	.nomination-hero {
		position: relative;
		overflow: hidden;
		padding: clamp(2.5rem, 5vw, 4.5rem) 0 3.5rem;
		background:
			radial-gradient(circle at 12% 20%, rgba(255, 255, 255, 0.16), transparent 48%), radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.12), transparent 42%),
			linear-gradient(145deg, #061f3f 0%, #0b2f63 45%, #04142a 100%);
		color: var(--text-white);
	}

	.hero-inner {
		width: 90%;
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}

	.hero-content {
		display: grid;
		gap: 1.25rem;
	}

	.hero-tag {
		width: fit-content;
		padding: 0.35rem 0.9rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.12);
		font-size: 0.75rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--blue-150);
		font-weight: var(--weight-medium);
	}

	.hero-meta {
		display: grid;
		gap: 0.75rem;
		margin: 0;
	}

	.hero-meta div {
		display: flex;
		gap: 0.75rem;
		align-items: baseline;
	}

	.hero-meta dt {
		margin: 0;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--blue-200);
		min-width: 9.5rem;
	}

	.hero-meta dd {
		margin: 0;
		color: var(--text-white);
		font-size: 1rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.hero-image {
		margin: 0;
		padding: 0.85rem;
		border-radius: 1.5rem;
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 18px 40px rgba(4, 20, 42, 0.45);
	}

	.hero-image img {
		width: 100%;
		border-radius: 1.1rem;
		object-fit: cover;
		aspect-ratio: 4 / 5;
		background: var(--blue-150);
	}

	.nomination-intro {
		background: light-dark(var(--blue-100), hsl(210, 30%, 8%));
		padding: clamp(2.5rem, 4vw, 4rem) 0;
	}

	.intro-inner {
		width: 90%;
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		gap: 1.5rem;
	}

	.intro-card {
		display: grid;
		gap: 2rem;
		padding: clamp(1.5rem, 3vw, 2.5rem);
		border-radius: 1.75rem;
		background: light-dark(#ffffff, hsl(210, 35%, 12%));
		box-shadow: 0 20px 45px rgba(3, 20, 46, 0.15);
	}

	.intro-media {
		margin: 0;
	}

	.intro-media img {
		width: 100%;
		border-radius: 1.25rem;
		object-fit: cover;
		aspect-ratio: 4 / 3;
	}

	.intro-copy {
		display: grid;
		gap: 1rem;
	}

	:global(.intro-body p) {
		margin: 0 0 1rem 0;
	}

	:global(.intro-body p:last-child) {
		margin-bottom: 0;
	}

	.nomination-callout {
		background: linear-gradient(180deg, light-dark(#f7f9ff, #05162f) 0%, light-dark(#ffffff, #031024) 100%);
		padding: clamp(2.5rem, 4vw, 4.5rem) 0;
	}

	.callout-inner {
		width: 90%;
		max-width: 1000px;
		margin: 0 auto;
		display: grid;
		gap: 2rem;
	}

	.callout-heading {
		display: grid;
		gap: 0.5rem;
	}

	.callout-card {
		position: relative;
		padding: clamp(1.5rem, 3vw, 2.5rem);
		border-radius: 1.5rem;
		background: var(--primary-blue);
		color: var(--text-white);
		box-shadow: 0 20px 35px rgba(4, 20, 44, 0.35);
		overflow: hidden;
	}

	.callout-card::before {
		content: '"';
		position: absolute;
		top: 1rem;
		right: 1.5rem;
		font-size: 5rem;
		line-height: 1;
		color: rgba(255, 255, 255, 0.15);
		font-family: var(--font-heading);
	}

	.callout-card h3 {
		color: var(--text-white);
		margin-bottom: 1rem;
	}

	.callout-text {
		font-size: 1.05rem;
		max-width: 60ch;
	}

	.callout-signature {
		margin-top: 1.5rem;
		text-align: right;
		font-family: var(--font-heading);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--blue-150);
	}

	@media (min-width: 900px) {
		.hero-inner {
			grid-template-columns: 1.1fr 0.9fr;
		}

		.intro-card {
			grid-template-columns: 0.95fr 1.05fr;
			align-items: start;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-content {
			animation: rise-in 600ms ease-out both;
		}

		.hero-image {
			animation: float-in 700ms ease-out 120ms both;
		}

		.intro-card {
			animation: rise-in 700ms ease-out 160ms both;
		}

		.callout-card {
			animation: rise-in 700ms ease-out 220ms both;
		}
	}

	@keyframes rise-in {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes float-in {
		from {
			opacity: 0;
			transform: translateY(18px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
