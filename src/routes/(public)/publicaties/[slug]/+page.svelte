<script>
	import { RSectionHero, RDetailsPublicaties } from '$lib'

	import { DIRECTUS_URL } from '$lib/constants.js'
	const { data } = $props()

	const sourceFileId = data?.document?.source_file?.id ?? data?.document?.source_file ?? null
</script>

<svelte:head>
	<title>Documenten | Overlegplatform Associate Degrees</title>
</svelte:head>

<RSectionHero
	sectionInfo={{
		title: data.document.title
	}}
	picture={{
		isEnhanced: true,
		src: `${DIRECTUS_URL}/assets/${data.document.hero_image}`,
		alt: 'Een grote zaal vol mensen die op stoelen zitten en luisteren naar een spreker.',
		width: '300',
		height: '210',
		fetchpriority: 'high',
		loading: 'eager'
	}}
/>

<RDetailsPublicaties {data} />
