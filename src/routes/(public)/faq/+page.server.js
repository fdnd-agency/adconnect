import { ContentService } from '$lib/server/contentService'

export async function load() {
	const faqFields = 'id,question,answer,important'
	const faqResponse = await ContentService.fetchContent('faqs', null, faqFields, null, false)

	return {
		faqs: Array.from(faqResponse.data.faqs.values())
	}
}
