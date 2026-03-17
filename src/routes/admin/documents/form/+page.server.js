import { fail } from '@sveltejs/kit'

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const title = String(data.get('title') ?? '').trim()

		if (!title) {
			return fail(400, { error: 'Vul een titel in.' })
		}

		return {
			success: true,
			message: 'Titel is ontvangen. In de volgende stappen koppelen we de rest van het formulier.'
		}
	}
}
