import { test, expect } from '@playwright/test';

test('should add a starship to the cart and display it', async ({ page }) => {
  const baseURL = process.env.LIVE_BASE_URL || 'http://localhost:3000'; // Fallback to localhost if not set
  await page.goto(baseURL);

  // Wait for the search box and starships to load
  await page.waitForSelector('input[placeholder="Find your spaceship"]');

  // Simulate adding a starship to the cart
  const firstStarshipBuyButton = page.locator('text=Buy').first();
  await firstStarshipBuyButton.click();

  // Wait for the cart to update (you may need to adjust the selector based on your implementation)
  await page.waitForTimeout(500); // Use this if the cart update takes a moment

  // Verify the starship is in the cart
  const cartItem = await page.locator('text=X-Wing');
  await expect(cartItem).toBeVisible();

  // Verify the quantity in the cart is correct
  const quantity = await page.locator('text=1');
  await expect(quantity).toBeVisible();
});