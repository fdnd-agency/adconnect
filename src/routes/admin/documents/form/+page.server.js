import { fail } from '@sveltejs/kit'

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const title = String(data.get('title') ?? '').trim()
		const description = String(data.get('description') ?? '').trim()
		const date = String(data.get('date') ?? '').trim()

		if (!title) {
			return fail(400, { error: 'Vul een titel in.' })
		}

		if (!description) {
			return fail(400, { error: 'Vul een omschrijving in.' })
		}

		if (!date) {
			return fail(400, { error: 'Vul een datum in.' })
		}

		return {
			success: true,
			message: 'Formulier succesvol opgeslagen.'
		}
	}
}
