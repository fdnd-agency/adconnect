import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				'style-src': ['self', 'unsafe-inline'], // Required for Svelte transitions
				'img-src': ['self', 'data:', 'https://fdnd-agency.directus.app'],
				'font-src': ['self'],
				'connect-src': ['self', 'https://fdnd-agency.directus.app'],
				'frame-src': ['self', 'https://fdnd-agency.directus.app'], // PDF viewer iframes in publicaties
				'object-src': ['none'],
				'base-uri': ['self'],
				'form-action': ['self']
			}
		}
	}
}

export default config
