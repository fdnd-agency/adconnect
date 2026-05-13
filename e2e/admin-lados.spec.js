import { expect, test } from '@playwright/test'

async function setAdminSession(context, state = 'active') {
	await context.addCookies([
		{
			name: 'e2e_admin_session',
			value: state,
			url: 'http://localhost:5173/'
		}
	])
}

async function resetLados(page) {
	await page.goto('/admin/lados?e2e_reset=1', { waitUntil: 'networkidle' })
	await expect(page).toHaveURL(/\/admin\/lados/)
	await expect(page.getByRole('heading', { name: /Lado's/ })).toBeVisible()
}

async function fillLadoForm(page, { title, contactPerson, nationalAdProfile, ladoStatus, boardId, courseName }) {
	await page.getByLabel('Titel').fill(title)
	await page.getByPlaceholder('Voer een contactpersoon in en druk Enter').fill(contactPerson)
	await expect(page.locator('input[name="contactPersons"]')).toHaveValue(JSON.stringify([contactPerson]))
	await page.getByLabel('Landelijk AD-profiel').fill(nationalAdProfile)
	await page.getByLabel('Lado-status').fill(ladoStatus)
	await page.locator('select[name="sectoralAdvisoryBoard"]').selectOption(String(boardId))
	await page.getByRole('checkbox', { name: courseName }).check()
}

test.describe.configure({ mode: 'serial' })

test('beheerpagina is niet toegankelijk zonder inloggen', async ({ page }) => {
	await page.goto('/admin/lados', { waitUntil: 'domcontentloaded' })
	await expect(page).toHaveURL(/\/admin\/login/)
	await expect(page.getByRole('heading', { name: 'Inloggen' })).toBeVisible()
})

test.describe('admin lados e2e flows', () => {
	test.beforeEach(async ({ context, page }) => {
		await setAdminSession(context)
		await resetLados(page)
	})

	test("alle LADO's worden getoond in het overzicht", async ({ page }) => {
		await expect(page.locator('.document-card')).toHaveCount(3)
		await expect(page.locator('.document-card').filter({ hasText: 'E2E Lado Concept' })).toContainText('Concept')
		await expect(page.locator('.document-card').filter({ hasText: 'E2E Lado Gepubliceerd' })).toContainText('Gepubliceerd')
		await expect(page.locator('.document-card').filter({ hasText: 'E2E Lado Verwijderen' })).toContainText('Concept')
	})

	test('beheerder kan een nieuw LADO aanmaken', async ({ page }) => {
		await page.goto('/admin/lados/create', { waitUntil: 'domcontentloaded' })
		await fillLadoForm(page, {
			title: 'E2E Nieuw Lado',
			contactPerson: 'Nieuwe Persoon',
			nationalAdProfile: 'Nieuw profiel',
			ladoStatus: 'Actief',
			boardId: 1,
			courseName: 'E2E Opleiding 2'
		})
		await page.getByRole('button', { name: 'Opslaan' }).click()

		await page.goto('/admin/lados', { waitUntil: 'domcontentloaded' })
		await expect(page.locator('.document-card').filter({ hasText: 'E2E Nieuw Lado' })).toContainText('Concept')
	})

	test('validatiefout bij ontbrekend verplicht veld', async ({ page }) => {
		await page.goto('/admin/lados/create', { waitUntil: 'domcontentloaded' })
		await page.locator('form').evaluate((form) => {
			form.noValidate = true
		})
		await page.getByPlaceholder('Voer een contactpersoon in en druk Enter').fill('Alleen persoon')
		await page.getByPlaceholder('Voer een contactpersoon in en druk Enter').press('Enter')
		await page.getByLabel('Landelijk AD-profiel').fill('Profiel')
		await page.getByLabel('Lado-status').fill('Actief')
		await page.locator('select[name="sectoralAdvisoryBoard"]').selectOption('1')

		await page.getByRole('button', { name: 'Opslaan' }).click()
		await expect(page.getByText('Vul een naam in.')).toBeVisible()

		await page.goto('/admin/lados', { waitUntil: 'domcontentloaded' })
		await expect(page.locator('.document-card')).toHaveCount(3)
	})

	test('beheerder kan een LADO bewerken', async ({ page }) => {
		await page.goto('/admin/lados/e2e-lado-1/edit', { waitUntil: 'domcontentloaded' })
		await expect(page.getByLabel('Titel')).toHaveValue('E2E Lado Concept')
		await expect(page.locator('select[name="sectoralAdvisoryBoard"]')).toHaveValue('1')
		await page.getByLabel('Titel').fill('E2E Lado Concept Gewijzigd')
		await page.getByRole('button', { name: 'Opslaan' }).click()
		await expect(page.getByText('Lado succesvol bijgewerkt.')).toBeVisible()

		await page.goto('/admin/lados', { waitUntil: 'domcontentloaded' })
		await expect(page.locator('.document-card').filter({ hasText: 'E2E Lado Concept Gewijzigd' })).toBeVisible()
	})

	test('beheerder kan een LADO publiceren', async ({ page }) => {
		const publishResponse = await page.request.post('/admin/lados?/publish', {
			form: { id: 'e2e-lado-1' }
		})
		expect(publishResponse.ok()).toBe(true)
		await page.goto('/admin/lados', { waitUntil: 'networkidle' })
		await expect(page.locator('.document-card').filter({ hasText: 'E2E Lado Concept' })).toContainText('Gepubliceerd')
	})

	test('beheerder kan een LADO depubliceren', async ({ page }) => {
		const depublishResponse = await page.request.post('/admin/lados?/depublish', {
			form: { id: 'e2e-lado-2' }
		})
		expect(depublishResponse.ok()).toBe(true)
		await page.goto('/admin/lados', { waitUntil: 'networkidle' })
		await expect(page.locator('.document-card').filter({ hasText: 'E2E Lado Gepubliceerd' })).toContainText('Concept')
	})

	test('verwijderen vraagt om bevestiging', async ({ page }) => {
		const deleteForm = page.locator('form[action="?/delete"]', {
			has: page.locator('input[name="id"][value="e2e-lado-3"]')
		})
		await expect(deleteForm).toHaveCount(1)

		let deleteDialogMessage = ''
		page.once('dialog', async (dialog) => {
			deleteDialogMessage = dialog.message()
			await dialog.dismiss()
		})

		await deleteForm.locator('.btn-delete').dispatchEvent('click')
		await expect.poll(() => deleteDialogMessage).toContain('verwijderen')
		await expect(page.locator('.document-card').filter({ hasText: 'E2E Lado Verwijderen' })).toHaveCount(1)
	})

	test('foutmelding bij mislukte opslag', async ({ page }) => {
		await page.goto('/admin/lados/create', { waitUntil: 'domcontentloaded' })
		await fillLadoForm(page, {
			title: 'E2E FORCE 500',
			contactPerson: 'Fout Persoon',
			nationalAdProfile: 'Fout profiel',
			ladoStatus: 'Actief',
			boardId: 1,
			courseName: 'E2E Opleiding 2'
		})

		await page.getByRole('button', { name: 'Opslaan' }).click()
		await expect(page.getByText('Er is iets misgegaan bij het opslaan van de Lado.')).toBeVisible()
		await expect(page.getByLabel('Titel')).toHaveValue('E2E FORCE 500')
		await expect(page.getByLabel('Landelijk AD-profiel')).toHaveValue('Fout profiel')
	})
})
