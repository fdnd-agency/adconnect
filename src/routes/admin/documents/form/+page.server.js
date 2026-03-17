import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

export async function load({ cookies }) {
	const { data: content, errors } = await ContentService.fetchContent('categories', cookies.get('access_token'))
	const categories = content.categories ? [...content.categories.values()] : []
	categories.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? '', 'nl'))

	return {
		categories,
		loadError: errors.length ? 'Categorieen konden niet worden geladen.' : null
	}
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const title = String(data.get('title') ?? '').trim()
		const description = String(data.get('description') ?? '').trim()
		const date = String(data.get('date') ?? '').trim()
		const category = String(data.get('category') ?? '').trim()

		if (!title) {
			return fail(400, { error: 'Vul een titel in.' })
		}

		if (!description) {
			return fail(400, { error: 'Vul een omschrijving in.' })
		}

		if (!date) {
			return fail(400, { error: 'Vul een datum in.' })
		}

		if (!category) {
			return fail(400, { error: 'Kies een categorie.' })
		}

		return {
			success: true,
			message: 'Formulier succesvol opgeslagen.'
		}
	}
}
