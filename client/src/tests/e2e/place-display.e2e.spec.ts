import { expect, test } from '@playwright/test';

test.describe('Tests display of the pages places-list and place-search-form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/places');
  });
  test('it should display the empty placeholder in the page list', async ({
    page,
  }) => {
    await expect(
      page.getByText("Aucun spot n'a été enregistré...")
    ).toBeVisible();
    await expect(page.getByText('Rechercher un spot')).toBeVisible();
  });
});
