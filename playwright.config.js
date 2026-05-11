import { defineConfig } from '@playwright/test'

export default defineConfig({
	testDir: 'e2e',
	workers: 1,
	webServer: {
		command: 'npm run dev',
		port: 5173,
		reuseExistingServer: false,
		env: {
			E2E_TEST_MODE: '1'
		}
	},
	use: {
		baseURL: 'http://localhost:5173'
	}
})
