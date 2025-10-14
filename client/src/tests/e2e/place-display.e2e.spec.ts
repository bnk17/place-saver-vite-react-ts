import { expect, test } from '@playwright/test';

test.describe('Tests display of the pages places-list and place-search-form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('it should display the empty placeholder in the page list', async ({
    page,
  }) => {
    await expect(
      page.getByText("Aucun spot n'a été enregistré...")
    ).toBeVisible();
    await expect(page.getByText('Rechercher un spot')).toBeVisible();
  });

  test('it should display the place-search-form page', async ({ page }) => {
    page.getByText('Rechercher un spot').click();
    await expect(page.getByTestId('place-search-input')).toBeVisible();
  });
  test('it should display the place-search-form page and have the input focused', async ({
    page,
  }) => {
    page.getByText('Rechercher un spot').click();
    await expect(page.getByTestId('place-search-input')).toBeVisible();
    await expect(page.getByTestId('place-search-input')).toBeFocused();
  });
});
