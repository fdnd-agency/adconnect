import { test, expect } from '@playwright/test'

test('home page loads successfully', async ({ page }) => {
	await page.goto('/')
	await expect(page).toHaveTitle(/.+/) // asserts page has any title
})

test('home page has visible content', async ({ page }) => {
	await page.goto('/')
	await expect(page.locator('body')).toBeVisible()
})
