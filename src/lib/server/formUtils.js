/**
 * Extracts form state from FormData, converting specified checkbox fields to boolean values
 * and collecting multi-value fields as arrays.
 *
 * @param {FormData} formData - The FormData object from which to extract state.
 * @param {Object} options - The options for extracting form state.
 * @param {string[]} options.checkboxFields - The names of the checkbox fields to convert to booleans.
 * @param {string[]} options.arrayFields - The names of fields that should be collected with getAll().
 * @returns {Object} The extracted form state.
 */
export function extractFormState(formData, options = {}) {
	const { checkboxFields = [], arrayFields = [] } = options
	const formState = Object.fromEntries(formData.entries())

	for (const fieldName of checkboxFields) {
		formState[fieldName] = formState[fieldName] === 'on'
	}

	for (const fieldName of arrayFields) {
		formState[fieldName] = formData
			.getAll(fieldName)
			.map((value) => String(value ?? '').trim())
			.filter(Boolean)
	}

	return formState
}
