import { expect, test } from '@playwright/test'

test('smoke', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByTestId('hydrated')).toBeAttached()

  await expect(
    page.getByRole('heading', { name: 'PathMinifier' })
  ).toBeVisible()

  await page.getByRole('button', { name: 'Show Example' }).click()
  await expect(page.getByText('-24.0%')).toBeVisible()
})
