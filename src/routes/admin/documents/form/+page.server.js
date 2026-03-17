import { ContentService } from '$lib/server/contentService.js'
import { fail } from '@sveltejs/kit'

const FILE_LIBRARY_FOLDER = 'Adconnect'

function slugify(value) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

async function rollbackUploadedFiles(fileIds, accessToken) {
	for (const fileId of fileIds) {
		const result = await ContentService.deleteFile(fileId, accessToken)
		if (!result?.success) {
			console.error(`Rollback failed for file ${fileId}`)
		}
	}
}

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
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const title = String(data.get('title') ?? '').trim()
		const description = String(data.get('description') ?? '').trim()
		const date = String(data.get('date') ?? '').trim()
		const category = String(data.get('category') ?? '').trim()
		const image = data.get('image')
		const sourceFile = data.get('source_file')
		const token = cookies.get('access_token')

		if (!token) {
			return fail(403, { error: 'Aanmaken mislukt: Unauthorized' })
		}

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

		if (!image || typeof image !== 'object' || image.size === 0) {
			return fail(400, { error: 'Upload een afbeelding.' })
		}

		if (!sourceFile || typeof sourceFile !== 'object' || sourceFile.size === 0) {
			return fail(400, { error: 'Upload een bronbestand.' })
		}

		const uploadedFileIds = []

		const imageUpload = await ContentService.postImage(image, token, {
			folderName: FILE_LIBRARY_FOLDER
		})
		if (!imageUpload?.success) {
			return imageUpload
		}
		uploadedFileIds.push(imageUpload.id)

		const sourceUpload = await ContentService.postFile(sourceFile, token, {
			folderName: FILE_LIBRARY_FOLDER
		})
		if (!sourceUpload?.success) {
			await rollbackUploadedFiles(uploadedFileIds, token)
			return sourceUpload
		}
		uploadedFileIds.push(sourceUpload.id)

		const payload = {
			title,
			description,
			date,
			category,
			hero_image: imageUpload.id,
			source_file: sourceUpload.id,
			slug: slugify(title),
			status: 'draft'
		}

		const createResult = await ContentService.postContent(payload, 'documents', token)
		if (!createResult?.success) {
			await rollbackUploadedFiles(uploadedFileIds, token)
			return createResult
		}

		return {
			success: true,
			message: 'Formulier succesvol opgeslagen.',
			documentId: createResult.id
		}
	}
}
