import { test, expect } from '@playwright/test';

// Updated selector based on French placeholder
const TODO_INPUT_SELECTOR = 'input[placeholder*="Écrire une todo"]';
const MODAL_INPUT_SELECTOR = '.bg-white input[type="text"]';
// Since there's no save button, the modal submit will rely on "Enter" key press on the input

test.describe('Tests the display of the todo feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Todos').click();
  });
  test('should add a new todo, complete it, and check for delayed deletion using Enter key', async ({
    page,
  }) => {
    // 1. Add a new todo by typing and pressing Enter
    await page.fill(TODO_INPUT_SELECTOR, 'E2E Test Task');
    await page.press(TODO_INPUT_SELECTOR, 'Enter'); // Simulates pressing Enter

    const newTodoItem = page.getByText('E2E Test Task');
    await expect(newTodoItem).toBeVisible();

    // 2. Toggle the todo by clicking the text (triggers TOGGLE_TODO)
    await newTodoItem.click();

    // 3. Verify it is marked as completed
    await expect(newTodoItem).toHaveClass(/line-through/);

    // 4. Wait for the automatic deletion timeout
    await page.waitForTimeout(1000);

    // 5. Verify the item is removed from the DOM (triggers DELETE_TODO)
    await expect(newTodoItem).not.toBeVisible();
  });

  test('should edit an existing todo item and verify update using Enter key', async ({
    page,
  }) => {
    await page.fill(TODO_INPUT_SELECTOR, 'Pay Rent');

    // Setup: Locate an existing todo item's edit button
    await page.press(TODO_INPUT_SELECTOR, 'Enter'); // Simulates pressing Enter

    // 1. Click the edit button
    await page.click('li:has-text("Pay Rent") + button');

    // 2. Interact with the modal
    const modalInput = page.locator(MODAL_INPUT_SELECTOR);
    await expect(modalInput).toBeVisible();

    // Clear the existing value and type the new one
    await modalInput.fill('');
    await modalInput.type('Pay Rent and Bills');

    // 3. Save the changes by pressing Enter while focused on the input
    await page.press(MODAL_INPUT_SELECTOR, 'Enter');

    // 4. Verify the modal is closed (Assuming pressing Enter submits the form and closes the modal)
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // 5. Verify the text is updated on the main list
    await expect(page.getByText('Pay Rent and Bills')).toBeVisible();
    await expect(page.getByText('Pay Rent', { exact: true })).not.toBeVisible();
  });
});
