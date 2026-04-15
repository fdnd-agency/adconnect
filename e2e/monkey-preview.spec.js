import { expect, test } from '@playwright/test'

function createRng(seed) {
	let state = seed >>> 0
	return () => {
		state = (state * 1664525 + 1013904223) >>> 0
		return state / 4294967296
	}
}

function randomInt(rng, max) {
	return Math.floor(rng() * max)
}

function randomId(rng, prefix = 'e2e-monkey') {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
	let suffix = ''
	for (let i = 0; i < 8; i += 1) {
		suffix += alphabet[randomInt(rng, alphabet.length)]
	}
	return `${prefix}-${suffix}`
}

async function setAdminSession(context, state = 'active') {
	await context.addCookies([
		{
			name: 'e2e_admin_session',
			value: state,
			domain: 'localhost',
			path: '/'
		}
	])
}

test.describe('preview monkey tests', () => {
	test('authenticated randomized preview navigation does not crash client runtime', async ({ page, context }) => {
		await setAdminSession(context)

		const knownTypes = ['news', 'themes', 'documents', 'faqs']
		const rng = createRng(20260410)
		const clientErrors = []

		page.on('pageerror', (err) => clientErrors.push(err.message))

		for (let i = 0; i < 20; i += 1) {
			const type = knownTypes[randomInt(rng, knownTypes.length)]
			const id = randomId(rng)

			const response = await page.goto(`/preview/${type}/${id}`, { waitUntil: 'domcontentloaded' })
			expect(response).not.toBeNull()
			await expect(page.locator('body')).toBeVisible()

			await expect(page.getByRole('status')).toContainText('Conceptweergave')

			await page.mouse.move(randomInt(rng, 900), randomInt(rng, 700))
			await page.mouse.click(randomInt(rng, 900), randomInt(rng, 700))
			await page.keyboard.press('Tab')

			if (i % 5 === 4) {
				await page.reload({ waitUntil: 'domcontentloaded' })
			}
		}

		expect(clientErrors).toEqual([])
	})

	test('unauthenticated randomized preview requests always end on login', async ({ page }) => {
		const types = ['news', 'themes', 'documents', 'faqs', 'unknown-type']
		const rng = createRng(4102026)

		for (let i = 0; i < 12; i += 1) {
			const type = types[randomInt(rng, types.length)]
			const id = randomId(rng, 'e2e-unauth')

			await page.goto(`/preview/${type}/${id}`, { waitUntil: 'domcontentloaded' })
			await expect(page).toHaveURL(/\/admin\/login/)
			await expect(page.locator('body')).toBeVisible()
		}
	})
})
