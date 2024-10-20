
///JF - https://playwright.dev/docs/intro going end to end testing  // boot your test - yarn playwright test
/// yarn playwright test - Runs the end-to-end tests.
/// yarn playwright test - --ui Starts the interactive UI mode.
/// yarn playwright test --project=chromium - Runs the tests only on Desktop Chrome.
/// yarn playwright test example -  Runs the tests in a specific file.

import { test, expect } from '@playwright/test';

test('should add a starship to the cart and display it', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Change this to your app URL when testing in my case localhost

  // starships load
  await page.waitForSelector('text=Starships in Stock');

  // Simulate adding a starship to the cart
  const firstStarshipBuyButton = page.locator('text=Buy').first();
  await firstStarshipBuyButton.click();

  // Open the cart (assuming you have a cart button)
  const cartButton = page.locator('text=Cart');
  await cartButton.click();

  // Verify the starship is in the cart
  const cartItem = await page.locator('text=X-Wing'); 
  expect(cartItem).toBeVisible();

  // Verify the quantity in the cart is correct
  const quantity = await page.locator('text=1'); 
  expect(quantity).toBeVisible();
});