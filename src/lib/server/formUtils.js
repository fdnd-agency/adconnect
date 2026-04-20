/**
 * Extracts form state from FormData, converting specified checkbox fields to boolean values.
 *
 * @param {FormData} formData - The FormData object from which to extract state.
 * @param {Object} options - The options for extracting form state.
 * @param {string[]} options.checkboxFields - The names of the checkbox fields to convert.
 * @returns {Object} The extracted form state.
 */
export function extractFormState(formData, options = {}) {
	const { checkboxFields = [] } = options
	const formState = Object.fromEntries(formData.entries())

	for (const fieldName of checkboxFields) {
		formState[fieldName] = formState[fieldName] === 'on'
	}

	return formState
}
