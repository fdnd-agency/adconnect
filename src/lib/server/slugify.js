// Class for slugifying strings and handling slug-related errors.
export class Slugify {
	// Creates a URL-safe slug from a title string.
	static slugify(value) {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
	}

	/**
	 * Checks if an API error is due to a duplicate slug.
	 * @param {object} result - The API response object to check.
	 * @returns {boolean} True if the error indicates a duplicate slug, false otherwise.
	 */
	static isDuplicateSlugError(result) {
		const message = String(result?.data?.error ?? '').toLowerCase()
		return Number(result?.status) === 400 && message.includes('slug') && message.includes('unique')
	}

	/**
	 * Generates a unique slug by appending a random suffix.
	 * @param {string} baseSlug - The base slug to modify.
	 * @returns {string} The unique slug.
	 */
	static slugWithRandomSuffix(baseSlug) {
		const randomSuffix = Math.floor(Math.random() * 9000) + 1000
		return `${baseSlug}-${randomSuffix}`
	}
}
