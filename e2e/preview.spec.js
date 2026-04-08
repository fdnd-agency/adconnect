import { expect, test } from '@playwright/test'

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

test.describe('preview route', () => {
	test('redirects to login without active admin session', async ({ page }) => {
		await page.goto('/preview/news/e2e-news-unauth')
		await expect(page).toHaveURL(/\/admin\/login/)
	})

	test('shows draft content for unpublished item', async ({ page, context }) => {
		await setAdminSession(context)

		await page.goto('/preview/news/e2e-news-draft')

		await expect(page.getByRole('status')).toContainText('Conceptweergave')
		await expect(page.getByRole('status')).toContainText('ongepubliceerde versie')
		await expect(page.getByText('E2E Draft Nieuws').first()).toBeVisible()
	})

	test('does not change publication status while previewing draft content', async ({ page, context }) => {
		await setAdminSession(context)

		await page.goto('/preview/news/e2e-news-draft')
		await expect(page.getByRole('status')).toContainText('ongepubliceerde versie')

		await page.reload()
		await expect(page.getByRole('status')).toContainText('ongepubliceerde versie')
	})

	test('handles expired session without crashing', async ({ page, context }) => {
		await context.addCookies([
			{
				name: 'access_token',
				value: 'expired-token',
				domain: 'localhost',
				path: '/'
			},
			{
				name: 'e2e_admin_session',
				value: 'expired',
				domain: 'localhost',
				path: '/'
			}
		])

		await page.goto('/preview/news/e2e-news-expired')
		await expect(page).toHaveURL(/\/admin\/login/)
	})

	test('shows clear message for content type without public detail route', async ({ page, context }) => {
		await setAdminSession(context)

		await page.goto('/preview/faqs/e2e-faq-no-public-route')
		await expect(page.getByText('Geen preview beschikbaar voor dit contenttype.')).toBeVisible()
	})

	test('shows preview banner for valid preview pages', async ({ page, context }) => {
		await setAdminSession(context)

		await page.goto('/preview/news/e2e-news-banner')
		await expect(page.getByRole('status')).toContainText('Conceptweergave')
	})
})
