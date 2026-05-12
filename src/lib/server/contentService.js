import { DirectusContentStrategy } from '$lib/server/strategies/directusContentStrategy.js'
import { E2EContentStrategy } from '$lib/server/strategies/e2eContentStrategy.js'

export { DirectusContentStrategy, E2EContentStrategy }

export class ContentService {
	static #strategy = ContentService.#createDefaultStrategy()

	static #createDefaultStrategy() {
		return process.env.E2E_TEST_MODE === '1' ? new E2EContentStrategy() : new DirectusContentStrategy()
	}

	static useStrategy(strategy) {
		this.#strategy = strategy
	}

	static resetE2EData() {
		if (!(this.#strategy instanceof E2EContentStrategy)) {
			throw new Error('ContentService.resetE2EData is only available when using E2EContentStrategy.')
		}
		return this.#strategy.resetE2EData()
	}

	static fetchContent(contentType = null, id = null, fields = null, filters = null, asMap = false, accessToken = null) {
		return this.#strategy.fetchContent(contentType, id, fields, filters, asMap, accessToken)
	}

	static publishContent(id, contentType, accessToken = null) {
		return this.#strategy.publishContent(id, contentType, accessToken)
	}

	static depublishContent(id, contentType, accessToken = null) {
		return this.#strategy.depublishContent(id, contentType, accessToken)
	}

	static deleteContent(id, contentType, accessToken = null) {
		return this.#strategy.deleteContent(id, contentType, accessToken)
	}

	static postContent(data, contentType, accessToken = null) {
		return this.#strategy.postContent(data, contentType, accessToken)
	}

	static updateContent(id, data, contentType, accessToken = null) {
		return this.#strategy.updateContent(id, data, contentType, accessToken)
	}

	static postContact(name, email, message) {
		return this.#strategy.postContact(name, email, message)
	}

	static postFile(file, accessToken = null, options = {}) {
		return this.#strategy.postFile(file, accessToken, options)
	}

	static deleteFile(id, accessToken = null) {
		return this.#strategy.deleteFile(id, accessToken)
	}
}
