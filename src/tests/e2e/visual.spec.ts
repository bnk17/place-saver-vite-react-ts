import { expect, test } from '@playwright/test';

test.describe('Visual Testing', () => {
  test('should see the app logo', async ({ page }) => {
    await page.goto('/');

    const logo = page.locator('h1').getByText('Rmnd.');
    await expect(logo).toBeVisible();
  });
});
