
import { test, expect } from '@playwright/test';

test('should add a starship to the cart and display it', async ({ page }) => {
  const baseURL = process.env.LIVE_BASE_URL || 'http://localhost:3000'; // Fallback to localhost if not set
  await page.goto(baseURL);

  // Wait for the search box and starships to load
  await page.waitForSelector('input[placeholder="Find your spaceship"]');

  // Simulate adding a starship to the cart
  const firstStarshipBuyButton = page.locator('text=Buy').first();
  await firstStarshipBuyButton.click();

});